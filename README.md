# Checklist de apertura del restaurante

App sencilla (sitio estático, sin instalar nada) para abrir un restaurante de ahumados y pasta de 200–300 personas sin que se quede nada por fuera.

**Abrirla:** https://ebarboza96-cmyk.github.io/checklist-restaurante/

Tiene tres listas:

- **Antes de abrir** — permisos, local, equipo, ahumados, pasta, menú, salón, bar, personal, proveedores, caja, higiene, mercadeo y ensayos.
- **Apertura del turno** — vuelta de revisión antes de abrir las puertas ("esto funciona, esto también…"). Se reinicia cada turno.
- **Cierre** — para dejar todo listo y seguro para el día siguiente.

En cada punto se puede:

- marcarlo como **listo**,
- ponerle **⚠ Falla** con una nota de qué pasa,
- asignarle un **encargado** (y después filtrar "las tareas de Emanuel"),
- agregar puntos propios en cada sección.

## Que todo el equipo vea lo mismo (sincronización)

Sin configurar nada, lo marcado se guarda solo en cada teléfono. Para que sea compartido y en vivo hay que conectar una base de datos gratuita de Firebase (una sola vez):

1. Entrar a https://console.firebase.google.com con una cuenta de Google y crear un proyecto (Analytics no hace falta).
2. En el menú: **Build → Realtime Database → Create Database** (cualquier región, "locked mode").
3. En la pestaña **Rules**, pegar esto y darle **Publish**:

   ```json
   {
     "rules": {
       ".read": false,
       ".write": false,
       "equipos": {
         "$equipo": { ".read": true, ".write": true }
       }
     }
   }
   ```

4. Copiar la URL que aparece arriba en la pestaña **Data** (algo como `https://mi-proyecto-default-rtdb.firebaseio.com`) y pegarla en `config.js`.

Después, en la app: **Crear equipo nuevo → Compartir enlace**, y mandar ese enlace por WhatsApp. Solo quien tenga el enlace puede ver y cambiar la lista, así que no hay que publicarlo.

## Cambiar el contenido

Todas las listas están en `data.js`, en texto corriente.
