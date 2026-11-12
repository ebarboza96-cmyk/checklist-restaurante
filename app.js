(function () {
  "use strict";
  var KEY = "checklist-restaurante-v2";
  var OLD_KEY = "checklist-restaurante-v1";
  var NEW_PERSON = "__nueva__";
  var LISTS = window.CHECKLISTS;
  var CFG = window.CHECKLIST_CONFIG || {};
  var isLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var DB = ((isLocal && new URLSearchParams(location.search).get("db")) || CFG.databaseURL || "").replace(/\/+$/, "");

  // Datos compartidos por el equipo:
  //   items/{lista}/{seccion}/{id}  -> { done, flag, note, owner }
  //   custom/{lista}/{seccion}/{id} -> texto del punto agregado
  //   people/{id}                   -> nombre
  var data = { items: {}, custom: {}, people: {} };
  var ui = { tab: LISTS[0].id };   // solo de este dispositivo
  var team = "";                   // código del equipo (va en el enlace)
  var queue = [];                  // cambios hechos sin conexión
  var filter = "avance";
  var who = "";                    // "" todos · "-" sin responsable · nombre
  var openSecs = {};
  var online = false;
  var pendingRender = false;
  var es = null;

  /* ---------- utilidades ---------- */
  function hash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function $(id) { return document.getElementById(id); }

  function getAt(parts) {
    var node = data;
    for (var i = 0; i < parts.length; i++) {
      if (node == null || typeof node !== "object") return undefined;
      node = node[parts[i]];
    }
    return node;
  }
  function setAt(parts, v) {
    if (!parts.length) {
      v = v || {};
      data = { items: v.items || {}, custom: v.custom || {}, people: v.people || {} };
      return;
    }
    var empty = v == null || (typeof v === "object" && !Object.keys(v).length);
    var node = data, stack = [], i;
    for (i = 0; i < parts.length - 1; i++) {
      var k = parts[i];
      if (node[k] == null || typeof node[k] !== "object") {
        if (empty) return;
        node[k] = {};
      }
      stack.push([node, k]);
      node = node[k];
    }
    var last = parts[parts.length - 1];
    if (empty) {
      delete node[last];
      for (i = stack.length - 1; i >= 0; i--) {
        if (Object.keys(stack[i][0][stack[i][1]]).length) break;
        delete stack[i][0][stack[i][1]];
      }
    } else node[last] = v;
    ["items", "custom", "people"].forEach(function (key) { if (!data[key]) data[key] = {}; });
  }
  function hasData() {
    return !!(Object.keys(data.items).length || Object.keys(data.custom).length || Object.keys(data.people).length);
  }

  /* ---------- guardado local ---------- */
  function saveLocal() {
    try { localStorage.setItem(KEY, JSON.stringify({ data: data, ui: ui, team: team, queue: queue })); } catch (e) {}
  }
  function loadLocal() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.data) {
        setAt([], s.data);
        ui = s.ui || ui;
        team = s.team || "";
        queue = s.queue || [];
        return;
      }
      var old = JSON.parse(localStorage.getItem(OLD_KEY));   // versión anterior
      if (old && old.items) {
        Object.keys(old.custom || {}).forEach(function (key) {
          (old.custom[key] || []).forEach(function (t) { setAt(["custom"].concat(key.split("/"), "c" + hash(t)), t); });
        });
        Object.keys(old.items).forEach(function (id) {
          var p = id.split("/");
          if (p.length !== 3) return;
          var isCustom = getAt(["custom", p[0], p[1], p[2]]) != null;
          setAt(["items", p[0], p[1], isCustom ? p[2] : "i" + p[2]], old.items[id]);
        });
        if (old.tab) ui.tab = old.tab;
      }
    } catch (e) {}
  }

  /* ---------- sincronización (Firebase Realtime Database por REST) ---------- */
  function url(parts) {
    return DB + "/equipos/" + team + (parts.length ? "/" + parts.map(encodeURIComponent).join("/") : "") + ".json";
  }
  /* ---------- guardado compartido con JSONBin (un solo archivo en la nube) ---------- */
  // No es en vivo: se baja al abrir, al tocar "Actualizar" y cada vez que se guarda un cambio.
  // Antes de guardar se baja la última versión y se le aplican encima solo los cambios de este
  // dispositivo, para no borrar lo que marcaron los demás.
  var JB = (isLocal && new URLSearchParams(location.search).get("jb"))
    ? { binId: "prueba", accessKey: "x", base: "/jb" }
    : (CFG.jsonbin && CFG.jsonbin.binId && CFG.jsonbin.accessKey ? CFG.jsonbin : null);
  var jbBusy = false, jbTimer = null, jbLast = 0, jbError = false;
  function shared() { return !!(JB || (DB && team)); }
  function jbUrl() { return (JB.base || "https://api.jsonbin.io/v3") + "/b/" + JB.binId; }
  function jbSchedule() {
    clearTimeout(jbTimer);
    jbTimer = setTimeout(jbSync, 2500);
    renderSync();
  }
  function jbSync() {
    if (!JB) return;
    clearTimeout(jbTimer);
    if (jbBusy) { jbTimer = setTimeout(jbSync, 1500); return; }
    jbBusy = true;
    renderSync();
    var sent = 0;
    fetch(jbUrl() + "/latest", { headers: { "X-Access-Key": JB.accessKey, "X-Bin-Meta": "false" }, cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (remote) {
        var first = ui.jb !== JB.binId;
        var remoteEmpty = !remote || !(remote.items || remote.custom || remote.people);
        if (first && remoteEmpty && hasData()) queue = [{ p: [], v: JSON.parse(JSON.stringify(data)) }];   // sube lo que ya había aquí
        else if (first) queue = [];
        ui.jb = JB.binId;
        setAt([], remote);
        queue.forEach(function (x) { setAt(x.p, x.v); });
        if (!queue.length) return;
        sent = queue.length;
        return fetch(jbUrl(), {
          method: "PUT",
          headers: { "Content-Type": "application/json", "X-Access-Key": JB.accessKey, "X-Bin-Versioning": "false" },
          body: JSON.stringify({ v: 1, items: data.items, custom: data.custom, people: data.people })
        }).then(function (r) { if (!r.ok) throw new Error(r.status); queue = queue.slice(sent); });
      })
      .then(function () { jbError = false; jbLast = Date.now(); }, function () { jbError = true; })
      .then(function () {
        jbBusy = false;
        saveLocal();
        renderSync();
        requestRender();
        if (!jbError && queue.length) jbSchedule();
      });
  }
  document.addEventListener("visibilitychange", function () {
    if (JB && !document.hidden && Date.now() - jbLast > 120000) jbSync();
  });

  function push(parts, v) {
    if (JB) {
      queue.push({ p: parts, v: v == null ? null : v });
      saveLocal();
      jbSchedule();
      return;
    }
    if (!DB || !team) return;
    fetch(url(parts), { method: "PUT", body: JSON.stringify(v == null ? null : v) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); })
      .catch(function () {
        queue.push({ p: parts, v: v == null ? null : v });
        saveLocal();
        setOnline(false);
      });
  }
  function write(parts, v) {
    setAt(parts, v);
    saveLocal();
    push(parts, v);
  }
  function flushQueue() {
    var q = queue;
    queue = [];
    q.forEach(function (x) { setAt(x.p, x.v); push(x.p, x.v); });
  }
  function onRemote(e) {
    var m;
    try { m = JSON.parse(e.data); } catch (err) { return; }
    if (!m) return;
    var parts = m.path.split("/").filter(Boolean);
    if (e.type === "put") {
      if (!parts.length) {
        if (m.data == null) { if (hasData()) push([], data); }   // equipo nuevo: sube lo que ya había aquí
        else setAt([], m.data);
        flushQueue();
      } else setAt(parts, m.data);
    } else {
      Object.keys(m.data || {}).forEach(function (k) { setAt(parts.concat(k.split("/")), m.data[k]); });
    }
    saveLocal();
    requestRender();
  }
  function connect() {
    if (JB) { jbSync(); return; }
    if (es) es.close();
    if (!DB || !team || !window.EventSource) return;
    es = new EventSource(url([]));
    es.addEventListener("put", onRemote);
    es.addEventListener("patch", onRemote);
    es.onopen = function () { setOnline(true); };
    es.onerror = function () { setOnline(false); };
  }
  function setOnline(v) {
    if (online === v) return;
    online = v;
    renderSync();
  }
  function teamLink() { return location.origin + location.pathname + location.search + "#equipo=" + team; }
  function readHashTeam() {
    var m = /equipo=([A-Za-z0-9]+)/.exec(location.hash);
    return m ? m[1] : "";
  }
  function newTeamCode() {
    var abc = "abcdefghijkmnpqrstuvwxyz23456789", out = "", buf = new Uint8Array(14);
    crypto.getRandomValues(buf);
    for (var i = 0; i < buf.length; i++) out += abc[buf[i] % abc.length];
    return out;
  }
  function renderSync() {
    var box = $("sync");
    box.textContent = "";
    box.className = "sync";
    if (JB) {
      var waiting = queue.length > 0;
      box.className = "sync " + (jbError ? "off" : "on");
      var hora = jbLast ? new Date(jbLast).toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" }) : "";
      box.appendChild(el("span", {
        text: jbError ? "● No se pudo conectar con la nube. Lo suyo queda guardado aquí y se manda al reintentar."
          : jbBusy || waiting ? "● Guardando para todo el equipo…"
          : "● Compartido con el equipo" + (hora ? " · actualizado a las " + hora : "") + " · Toque Actualizar para ver lo que marcaron los demás."
      }));
      box.appendChild(el("button", { class: "btn", type: "button", text: jbError ? "Reintentar" : "Actualizar", onclick: jbSync }));
      return;
    }
    if (!DB) {
      box.appendChild(el("span", { text: "💾 Guardado solo en este dispositivo (todavía sin sincronización)." }));
      return;
    }
    if (!team) {
      box.appendChild(el("span", { text: "Sin equipo en este dispositivo. Si ya le pasaron un enlace, ábralo desde ese mensaje." }));
      box.appendChild(el("button", {
        class: "btn", type: "button", text: "Crear equipo nuevo",
        onclick: function () {
          team = newTeamCode();
          history.replaceState(null, "", "#equipo=" + team);
          saveLocal(); connect(); renderSync();
        }
      }));
      return;
    }
    box.className = "sync " + (online ? "on" : "off");
    box.appendChild(el("span", { text: online ? "● En vivo: todos los que tengan el enlace ven lo mismo." : "● Sin conexión: los cambios se envían al reconectar." }));
    box.appendChild(el("button", {
      class: "btn", type: "button", text: "Compartir enlace",
      onclick: function (e) {
        var link = teamLink(), btn = e.currentTarget;
        if (navigator.share) { navigator.share({ title: document.title, url: link }).catch(function () {}); return; }
        var done = function () { btn.textContent = "Enlace copiado ✓"; setTimeout(function () { btn.textContent = "Compartir enlace"; }, 2000); };
        if (navigator.clipboard) navigator.clipboard.writeText(link).then(done, function () { prompt("Copie este enlace:", link); });
        else prompt("Copie este enlace:", link);
      }
    }));
  }

  /* ---------- modelo ---------- */
  function currentList() {
    for (var i = 0; i < LISTS.length; i++) if (LISTS[i].id === ui.tab) return LISTS[i];
    ui.tab = LISTS[0].id;
    return LISTS[0];
  }
  function itemsOf(list, sec) {
    var base = sec.items.map(function (t) { return { path: [list.id, sec.id, "i" + hash(t)], text: t, custom: false }; });
    var c = getAt(["custom", list.id, sec.id]) || {};
    var extra = Object.keys(c).map(function (k) { return { path: [list.id, sec.id, k], text: String(c[k]), custom: true }; });
    return base.concat(extra);
  }
  function st(it) { return getAt(["items"].concat(it.path)) || {}; }
  function setSt(it, patch) {
    var cur = {}, old = st(it), k;
    for (k in old) cur[k] = old[k];
    for (k in patch) cur[k] = patch[k];
    for (k in cur) if (!cur[k]) delete cur[k];
    write(["items"].concat(it.path), Object.keys(cur).length ? cur : null);
  }
  function matchWho(s) { return who === "" || (who === "-" ? !s.owner : s.owner === who); }
  function listStats(list, onlyWho) {
    var total = 0, done = 0, flags = [];
    list.sections.forEach(function (sec) {
      itemsOf(list, sec).forEach(function (it) {
        var s = st(it);
        if (onlyWho && !matchWho(s)) return;
        total++;
        if (s.done) done++;
        if (s.flag) flags.push({ sec: sec.title, text: it.text, note: s.note, owner: s.owner });
      });
    });
    return { total: total, done: done, flags: flags };
  }
  function names(extra) {
    var out = Object.keys(data.people).map(function (k) { return String(data.people[k]); });
    if (extra && out.indexOf(extra) === -1) out.push(extra);
    return out.sort(function (a, b) { return a.localeCompare(b, "es"); });
  }
  function addPerson(raw) {
    var n = String(raw || "").replace(/\s+/g, " ").trim().slice(0, 40);
    if (!n) return "";
    var key = "p" + hash(n.toLowerCase());
    if (data.people[key]) return data.people[key];
    write(["people", key], n);
    return n;
  }

  /* ---------- render ---------- */
  function requestRender() {
    var a = document.activeElement;
    if (a && a.matches && a.matches("input[type=text], select")) { pendingRender = true; return; }
    render();
  }
  document.addEventListener("focusout", function () {
    if (pendingRender) { pendingRender = false; setTimeout(requestRender, 0); }
  });

  var avTab = "pend";   // qué se ve en la vista de avance: "pend" o "hecho"
  var toastTimer = null;
  function toast(msg, undo) {
    var t = $("toast");
    if (!t) { t = el("div", { id: "toast", class: "toast", role: "status" }); document.body.appendChild(t); }
    t.textContent = "";
    t.appendChild(el("span", { text: msg }));
    t.appendChild(el("button", { type: "button", text: "Deshacer", onclick: function () { t.hidden = true; undo(); } }));
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 6000);
  }

  function renderTabs() {
    var nav = $("tabs");
    nav.textContent = "";
    LISTS.forEach(function (list) {
      var s = listStats(list, false);
      nav.appendChild(el("button", {
        class: "tab", type: "button", role: "tab",
        "aria-selected": String(list.id === ui.tab),
        onclick: function () { ui.tab = list.id; saveLocal(); render(); window.scrollTo(0, 0); }
      }, [
        document.createTextNode(list.name),
        el("small", { text: s.done + "/" + s.total })
      ]));
    });
  }

  function renderSummary(list) {
    if (who && who !== "-" && names().indexOf(who) === -1) who = "";
    var s = listStats(list, true);
    var pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
    $("listDesc").textContent = list.desc;
    $("pct").textContent = pct + "%";
    $("countText").textContent = s.done + " de " + s.total + " listos" + (who === "-" ? " · sin encargado" : who ? " · " + who : "");
    $("barFill").style.width = pct + "%";
    $("resetBtn").textContent = list.reset ? "Nuevo turno (reiniciar)" : "Reiniciar lista";

    var chips = $("filters");
    chips.textContent = "";
    [["avance", "Pendiente y hecho"], ["todo", "Por sección"], ["flag", "Fallas (" + s.flags.length + ")"]].forEach(function (f) {
      chips.appendChild(el("button", {
        class: "chip", type: "button", "aria-pressed": String(filter === f[0]), text: f[1],
        onclick: function () { filter = f[0]; render(); }
      }));
    });

    // filtro por responsable, con avance de cada persona en esta lista
    var per = {}, none = 0;
    list.sections.forEach(function (sec) {
      itemsOf(list, sec).forEach(function (it) {
        var x = st(it);
        if (!x.owner) { none++; return; }
        var p = per[x.owner] || (per[x.owner] = { t: 0, d: 0 });
        p.t++; if (x.done) p.d++;
      });
    });
    var sel = $("whoSel");
    sel.textContent = "";
    sel.appendChild(el("option", { value: "", text: "Todas las personas" }));
    names().forEach(function (n) {
      var p = per[n] || { t: 0, d: 0 };
      sel.appendChild(el("option", { value: n, text: n + " (" + p.d + "/" + p.t + ")" }));
    });
    sel.appendChild(el("option", { value: "-", text: "Sin encargado (" + none + ")" }));
    sel.value = who;
    sel.className = "who" + (who ? " has" : "");

    var box = $("problems"), ul = $("problemList");
    ul.textContent = "";
    box.hidden = s.flags.length === 0;
    s.flags.forEach(function (f) {
      var li = el("li", {}, [document.createTextNode(f.text + " ")]);
      li.appendChild(el("em", { text: "· " + f.sec + (f.owner ? " · " + f.owner : "") + (f.note ? " — " + f.note : "") }));
      ul.appendChild(li);
    });
  }

  function renderItem(list, sec, it) {
    var s = st(it);
    var cbId = "cb-" + it.path.join("-");
    var li = el("li", { class: "item" + (s.done ? " is-done" : "") + (s.flag ? " is-flag" : "") });
    li.appendChild(el("input", {
      type: "checkbox", id: cbId, checked: s.done ? "" : null,
      onchange: function (e) {
        var on = e.target.checked;
        setSt(it, on ? { done: true, flag: false } : { done: false });
        render();
        if (filter === "avance") {
          toast(on ? "✓ Pasó a «Ya está hecho»" : "Volvió a «Pendiente»", function () { setSt(it, { done: !on }); render(); });
        }
      }
    }));
    li.appendChild(el("label", { for: cbId, text: it.text }));

    var ctl = el("div", { class: "ctl" });
    var sel = el("select", { class: "owner" + (s.owner ? " has" : ""), "aria-label": "Responsable de: " + it.text });
    sel.appendChild(el("option", { value: "", text: "Sin encargado" }));
    names(s.owner).forEach(function (n) { sel.appendChild(el("option", { value: n, text: n })); });
    sel.appendChild(el("option", { value: NEW_PERSON, text: "＋ Nueva persona…" }));
    sel.value = s.owner || "";
    sel.addEventListener("change", function () {
      var v = sel.value;
      if (v === NEW_PERSON) {
        v = addPerson(prompt("Nombre de la persona encargada:"));
        if (!v) { sel.value = s.owner || ""; return; }
      }
      setSt(it, { owner: v });
      pendingRender = false;
      render();
    });
    ctl.appendChild(sel);
    ctl.appendChild(el("button", {
      class: "icon-btn flag-btn", type: "button", "aria-pressed": String(!!s.flag),
      title: "Marcar que esto no funciona o tiene un problema",
      onclick: function () {
        setSt(it, s.flag ? { flag: false } : { flag: true, done: false });
        render();
        if (!s.flag) { var n = document.getElementById("note-" + cbId); if (n) n.focus(); }
      }
    }, [document.createTextNode("⚠"), el("span", { text: " Falla" })]));
    if (it.custom) {
      ctl.appendChild(el("button", {
        class: "icon-btn", type: "button", title: "Quitar este punto", "aria-label": "Quitar: " + it.text, text: "✕",
        onclick: function () {
          if (!confirm("¿Quitar «" + it.text + "» para todo el equipo?")) return;
          write(["custom"].concat(it.path), null);
          write(["items"].concat(it.path), null);
          render();
        }
      }));
    }
    li.appendChild(ctl);
    if (s.flag || s.note) {
      var note = el("input", {
        class: "note", id: "note-" + cbId, type: "text", value: s.note || "", maxlength: "300",
        placeholder: s.flag ? "¿Qué pasa? ¿Qué falta para resolverlo?" : "Nota",
        "aria-label": "Nota para: " + it.text
      });
      note.addEventListener("change", function () { setSt(it, { note: note.value.trim() }); });
      li.appendChild(note);
    }
    return li;
  }

  // Vista de avance: un bloque con lo pendiente y otro con lo que ya está hecho
  function renderAvance(list) {
    var root = $("sections");
    root.textContent = "";
    var counts = { pend: 0, hecho: 0 };
    list.sections.forEach(function (sec) {
      itemsOf(list, sec).forEach(function (it) { var s = st(it); if (matchWho(s)) counts[s.done ? "hecho" : "pend"]++; });
    });
    var sw = el("div", { class: "switch", role: "tablist" });
    [["pend", "Pendiente"], ["hecho", "Ya está hecho"]].forEach(function (t) {
      sw.appendChild(el("button", {
        class: "sw " + t[0], type: "button", role: "tab", "aria-selected": String(avTab === t[0]),
        onclick: function () { avTab = t[0]; render(); }
      }, [el("b", { text: String(counts[t[0]]) }), document.createTextNode(t[1])]));
    });
    root.appendChild(sw);
    [["pend", "Pendiente", false], ["hecho", "Ya está hecho", true]].forEach(function (g) {
      if (g[0] !== avTab) return;
      var count = 0, body = el("div", {});
      list.sections.forEach(function (sec) {
        var its = itemsOf(list, sec).filter(function (it) { var s = st(it); return matchWho(s) && !!s.done === g[2]; });
        if (!its.length) return;
        count += its.length;
        body.appendChild(el("h3", { class: "sub", text: sec.title + " (" + its.length + ")" }));
        var ul = el("ul", { class: "items" });
        its.forEach(function (it) { ul.appendChild(renderItem(list, sec, it)); });
        body.appendChild(ul);
      });
      if (!count) body.appendChild(el("p", { class: "empty", text: g[2] ? "Todavía no hay nada marcado como hecho." : "No queda nada pendiente. 🎉" }));
      var det = el("div", { class: "sec grp " + g[0] });
      det.appendChild(body);
      root.appendChild(det);
    });
  }

  function renderSections(list) {
    if (filter === "avance") return renderAvance(list);
    var root = $("sections");
    root.textContent = "";
    list.sections.forEach(function (sec) {
      var key = list.id + "/" + sec.id;
      var all = itemsOf(list, sec).filter(function (it) { return matchWho(st(it)); });
      var done = 0, flags = 0;
      all.forEach(function (it) { var s = st(it); if (s.done) done++; if (s.flag) flags++; });
      var shown = all.filter(function (it) {
        var s = st(it);
        return filter === "todo" || (filter === "pend" && !s.done) || (filter === "flag" && s.flag);
      });
      var filtering = filter !== "todo" || who !== "";
      if (filtering && shown.length === 0) return;

      var isOpen = filtering || (key in openSecs ? openSecs[key] : false);
      var det = el("details", { class: "sec" + (all.length && done === all.length ? " done" : "") + (flags ? " bad" : ""), open: isOpen ? "" : null });
      det.addEventListener("toggle", function () { if (!filtering) openSecs[key] = det.open; });
      det.appendChild(el("summary", {}, [
        el("span", { class: "sec-title", text: sec.title }),
        el("span", { class: "sec-count", text: (flags ? "⚠ " + flags + " · " : "") + done + "/" + all.length })
      ]));
      if (sec.hint) det.appendChild(el("p", { class: "sec-hint", text: sec.hint }));
      var ul = el("ul", { class: "items" });
      shown.forEach(function (it) { ul.appendChild(renderItem(list, sec, it)); });
      det.appendChild(ul);

      var input = el("input", { type: "text", placeholder: "Agregar otro punto…", "aria-label": "Agregar punto a " + sec.title, maxlength: "200" });
      var form = el("form", { class: "add" }, [input, el("button", { type: "submit", text: "Agregar" })]);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var t = input.value.replace(/\s+/g, " ").trim();
        if (!t) return;
        if (sec.items.indexOf(t) === -1) {
          var path = [list.id, sec.id, "c" + hash(t)];
          write(["custom"].concat(path), t);
          if (who && who !== "-") write(["items"].concat(path), { owner: who });
        }
        openSecs[key] = true;
        pendingRender = false;
        render();
      });
      det.appendChild(form);
      root.appendChild(det);
    });
    if (!root.children.length) {
      var msg = filter === "flag" ? "Sin fallas marcadas. 👍" : filter === "pend" ? "Nada pendiente aquí. 🎉" : "No hay tareas asignadas a esta persona en esta lista.";
      root.appendChild(el("p", { class: "empty", text: msg }));
    }
  }

  function renderPeople() {
    var box = $("peopleList");
    box.textContent = "";
    var keys = Object.keys(data.people).sort(function (a, b) { return String(data.people[a]).localeCompare(String(data.people[b]), "es"); });
    if (!keys.length) box.appendChild(el("span", { class: "muted", text: "Todavía no hay personas. Agregue a los encargados aquí o desde cualquier tarea." }));
    keys.forEach(function (k) {
      var n = String(data.people[k]);
      box.appendChild(el("span", { class: "person" }, [
        document.createTextNode(n),
        el("button", {
          type: "button", "aria-label": "Quitar a " + n, text: "✕",
          onclick: function () {
            if (!confirm("¿Quitar a " + n + " de la lista de personas? Sus tareas asignadas conservan el nombre hasta que se las pase a otra persona.")) return;
            write(["people", k], null);
            render();
          }
        })
      ]));
    });
  }

  function render() {
    var list = currentList();
    renderTabs();
    renderSummary(list);
    renderSections(list);
    renderPeople();
  }

  /* ---------- acciones ---------- */
  $("whoSel").addEventListener("change", function (e) { who = e.target.value; pendingRender = false; render(); });
  $("personForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("personInput");
    if (addPerson(input.value)) { input.value = ""; pendingRender = false; render(); }
  });
  $("resetBtn").addEventListener("click", function () {
    var list = currentList();
    var msg = (list.reset
      ? "¿Empezar un turno nuevo? Se desmarcan todos los puntos de «" + list.name + "»"
      : "¿Desmarcar TODOS los puntos de «" + list.name + "»")
      + (shared() ? " para todo el equipo" : "") + ". Los encargados de cada tarea se mantienen.";
    if (!confirm(msg)) return;
    var keep = {};
    var cur = getAt(["items", list.id]) || {};
    Object.keys(cur).forEach(function (sec) {
      Object.keys(cur[sec] || {}).forEach(function (id) {
        if (cur[sec][id] && cur[sec][id].owner) (keep[sec] || (keep[sec] = {}))[id] = { owner: cur[sec][id].owner };
      });
    });
    write(["items", list.id], Object.keys(keep).length ? keep : null);
    filter = "avance";
    render();
  });
  $("printBtn").addEventListener("click", function () {
    document.querySelectorAll("details.sec").forEach(function (d) { d.open = true; });
    window.print();
  });
  $("exportBtn").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify({ data: data }, null, 2)], { type: "application/json" });
    var a = el("a", { href: URL.createObjectURL(blob), download: "checklist-restaurante.json" });
    document.body.appendChild(a); a.click(); a.remove();
  });
  $("importBtn").addEventListener("click", function () { $("importFile").click(); });
  $("importFile").addEventListener("change", function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var s = JSON.parse(r.result);
        if (!s || !s.data || typeof s.data.items !== "object") throw new Error();
        if (!confirm("¿Reemplazar todo lo marcado" + (shared() ? " (para todo el equipo)" : "") + " con el archivo importado?")) return;
        setAt([], s.data);
        write([], data);
        render();
      } catch (err) { alert("Ese archivo no es una copia válida de este checklist."); }
    };
    r.readAsText(f);
    e.target.value = "";
  });
  window.addEventListener("hashchange", function () {
    var t = readHashTeam();
    if (t && t !== team) { team = t; queue = []; saveLocal(); location.reload(); }
  });
  window.addEventListener("online", connect);

  /* ---------- inicio ---------- */
  loadLocal();
  var fromLink = readHashTeam();
  if (fromLink && fromLink !== team) { team = fromLink; queue = []; saveLocal(); }
  if (DB && team && !fromLink) history.replaceState(null, "", "#equipo=" + team);
  renderSync();
  render();
  connect();
})();
