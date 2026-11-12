(function () {
  "use strict";
  var KEY = "checklist-restaurante-v1";
  var LISTS = window.CHECKLISTS;

  // state: { items: {id: {done, flag, note}}, custom: {"list/sec": [text]}, tab, filter }
  var state = load();
  var filter = "todo";
  var openSecs = {};

  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === "object") {
        s.items = s.items || {};
        s.custom = s.custom || {};
        return s;
      }
    } catch (e) {}
    return { items: {}, custom: {}, tab: LISTS[0].id };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
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

  function currentList() {
    for (var i = 0; i < LISTS.length; i++) if (LISTS[i].id === state.tab) return LISTS[i];
    state.tab = LISTS[0].id;
    return LISTS[0];
  }
  function itemsOf(list, sec) {
    var key = list.id + "/" + sec.id;
    var base = sec.items.map(function (t) { return { id: key + "/" + hash(t), text: t, custom: false }; });
    var extra = (state.custom[key] || []).map(function (t) { return { id: key + "/c" + hash(t), text: t, custom: true }; });
    return base.concat(extra);
  }
  function st(id) { return state.items[id] || {}; }
  function setSt(id, patch) {
    var cur = state.items[id] || {};
    for (var k in patch) cur[k] = patch[k];
    if (!cur.done && !cur.flag && !cur.note) delete state.items[id];
    else state.items[id] = cur;
    save();
  }
  function listStats(list) {
    var total = 0, done = 0, flags = [];
    list.sections.forEach(function (sec) {
      itemsOf(list, sec).forEach(function (it) {
        total++;
        var s = st(it.id);
        if (s.done) done++;
        if (s.flag) flags.push({ sec: sec.title, text: it.text, note: s.note });
      });
    });
    return { total: total, done: done, flags: flags };
  }

  function renderTabs() {
    var nav = $("tabs");
    nav.textContent = "";
    LISTS.forEach(function (list) {
      var s = listStats(list);
      nav.appendChild(el("button", {
        class: "tab", type: "button", role: "tab",
        "aria-selected": String(list.id === state.tab),
        onclick: function () { state.tab = list.id; filter = "todo"; save(); render(); window.scrollTo(0, 0); }
      }, [
        document.createTextNode(list.name),
        el("small", { text: s.done + "/" + s.total })
      ]));
    });
  }

  function renderSummary(list) {
    var s = listStats(list);
    var pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
    $("listDesc").textContent = list.desc;
    $("pct").textContent = pct + "%";
    $("countText").textContent = s.done + " de " + s.total + " listos";
    $("barFill").style.width = pct + "%";
    $("resetBtn").hidden = false;
    $("resetBtn").textContent = list.reset ? "Nuevo turno (reiniciar)" : "Reiniciar lista";

    var chips = $("filters");
    chips.textContent = "";
    [["todo", "Todo"], ["pend", "Pendientes (" + (s.total - s.done) + ")"], ["flag", "Fallas (" + s.flags.length + ")"]].forEach(function (f) {
      chips.appendChild(el("button", {
        class: "chip", type: "button", "aria-pressed": String(filter === f[0]), text: f[1],
        onclick: function () { filter = f[0]; render(); }
      }));
    });

    var box = $("problems"), ul = $("problemList");
    ul.textContent = "";
    box.hidden = s.flags.length === 0;
    s.flags.forEach(function (f) {
      var li = el("li", {}, [document.createTextNode(f.text + " ")]);
      li.appendChild(el("em", { text: "· " + f.sec + (f.note ? " — " + f.note : "") }));
      ul.appendChild(li);
    });
  }

  function renderItem(list, sec, it) {
    var s = st(it.id);
    var cbId = "cb-" + it.id.replace(/[^a-z0-9]/gi, "-");
    var li = el("li", { class: "item" + (s.done ? " is-done" : "") + (s.flag ? " is-flag" : "") });
    li.appendChild(el("input", {
      type: "checkbox", id: cbId, checked: s.done ? "" : null,
      onchange: function (e) {
        setSt(it.id, e.target.checked ? { done: true, flag: false } : { done: false });
        render();
      }
    }));
    li.appendChild(el("label", { for: cbId, text: it.text }));
    var btns = el("span", {});
    btns.appendChild(el("button", {
      class: "icon-btn flag-btn", type: "button", "aria-pressed": String(!!s.flag),
      title: "Marcar que esto no funciona o tiene un problema",
      onclick: function () {
        setSt(it.id, s.flag ? { flag: false } : { flag: true, done: false });
        render();
        if (!s.flag) { var n = document.getElementById("note-" + cbId); if (n) n.focus(); }
      }
    }, [document.createTextNode("⚠"), el("span", { text: " Falla" })]));
    if (it.custom) {
      btns.appendChild(el("button", {
        class: "icon-btn", type: "button", title: "Quitar este punto", "aria-label": "Quitar: " + it.text, text: "✕",
        onclick: function () {
          var key = list.id + "/" + sec.id;
          state.custom[key] = (state.custom[key] || []).filter(function (t) { return t !== it.text; });
          delete state.items[it.id];
          save(); render();
        }
      }));
    }
    li.appendChild(btns);
    if (s.flag || s.note) {
      var note = el("input", {
        class: "note", id: "note-" + cbId, type: "text", value: s.note || "",
        placeholder: s.flag ? "¿Qué pasa? ¿Quién lo resuelve?" : "Nota",
        "aria-label": "Nota para: " + it.text
      });
      note.addEventListener("change", function () { setSt(it.id, { note: note.value.trim() }); render(); });
      li.appendChild(note);
    }
    return li;
  }

  function renderSections(list) {
    var root = $("sections");
    root.textContent = "";
    list.sections.forEach(function (sec) {
      var key = list.id + "/" + sec.id;
      var all = itemsOf(list, sec);
      var done = 0, flags = 0;
      all.forEach(function (it) { var s = st(it.id); if (s.done) done++; if (s.flag) flags++; });
      var shown = all.filter(function (it) {
        var s = st(it.id);
        return filter === "todo" || (filter === "pend" && !s.done) || (filter === "flag" && s.flag);
      });
      if (filter !== "todo" && shown.length === 0) return;

      var isOpen = filter !== "todo" || (key in openSecs ? openSecs[key] : false);
      var det = el("details", { class: "sec" + (done === all.length ? " done" : "") + (flags ? " bad" : ""), open: isOpen ? "" : null });
      det.addEventListener("toggle", function () { if (filter === "todo") openSecs[key] = det.open; });
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
        var t = input.value.trim();
        if (!t) return;
        var arr = state.custom[key] || (state.custom[key] = []);
        if (arr.indexOf(t) === -1 && sec.items.indexOf(t) === -1) arr.push(t);
        openSecs[key] = true;
        save(); render();
      });
      det.appendChild(form);
      root.appendChild(det);
    });
    if (!root.children.length) {
      root.appendChild(el("p", { class: "empty", text: filter === "flag" ? "Sin fallas marcadas. 👍" : "Todo listo en esta lista. 🎉" }));
    }
  }

  function render() {
    var list = currentList();
    renderTabs();
    renderSummary(list);
    renderSections(list);
  }

  $("resetBtn").addEventListener("click", function () {
    var list = currentList();
    var msg = list.reset
      ? "¿Empezar un turno nuevo? Se desmarcan todos los puntos de «" + list.name + "»."
      : "¿Desmarcar TODOS los puntos de «" + list.name + "»? No se puede deshacer.";
    if (!confirm(msg)) return;
    Object.keys(state.items).forEach(function (id) {
      if (id.indexOf(list.id + "/") === 0) delete state.items[id];
    });
    filter = "todo";
    save(); render();
  });
  $("printBtn").addEventListener("click", function () {
    document.querySelectorAll("details.sec").forEach(function (d) { d.open = true; });
    window.print();
  });
  $("exportBtn").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
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
        if (!s || typeof s.items !== "object") throw new Error();
        if (!confirm("¿Reemplazar lo marcado en este dispositivo con el archivo importado?")) return;
        state = { items: s.items || {}, custom: s.custom || {}, tab: s.tab || LISTS[0].id };
        save(); render();
      } catch (err) { alert("Ese archivo no es una exportación válida de este checklist."); }
    };
    r.readAsText(f);
    e.target.value = "";
  });

  render();
})();
