[AGENTS.md](https://github.com/user-attachments/files/21714564/AGENTS.md)
# AGENTS.md — LilArt.Studios (arquitectura hexagonal front‑end “lite”)

## 🎯 Objetivo del proyecto
Sitio estático para **LilArt.Studios** que:
- Muestra trabajos (galería/carrusel) y una sección hero.
- Ofrece CTA claros para **Reservar**.
- Permite **reservar una cita** enviando datos por **WhatsApp** y añadiendo evento a **Google Calendar**.
- Mantiene **diseño responsive** con Bootstrap 5.

**Nota de idioma:** El **código** (nombres de clases CSS, IDs, variables, funciones y comentarios internos) **debe estar en inglés**. El **contenido visible** de la página (textos, labels, placeholders) **debe estar en español**.

---

## 📦 Estado actual (mantener funcional)
Archivos principales (no romper su comportamiento):
- `index.html` — página principal (hero, carrusel, formulario, footer).
- `styleLilArt.css` — hoja de estilos global.
- `btnGoReservar.js` — botones que hacen scroll suave a la sección de reservas.
- `navBar.js` — comportamiento del menú responsive (colapso/scroll controlado).
- `phoneOnlyNumber.js` — sanitiza el input de teléfono a solo números.
- `reservarCitasWhatsapp.js` — llena fechas/horas, arma mensajes y enlaces de WhatsApp y Google Calendar.
- `images.img/…` — recursos de imágenes y video.
- (Opcional según repo) `carousel.js` — lógica específica de carrusel si existe.

Reglas duras actuales:
- No introducir **errores en consola**.
- No romper rutas existentes de imágenes/videos.
- No romper compatibilidad con **Bootstrap 5.3.7** (CDN).

---

## 🧱 Arquitectura objetivo (hexagonal “lite”)
Aplicar separación por capas sin complicar innecesariamente un front‑end estático:

```
/public
  index.html
  /styles
    main.css
  /assets
    /images.img
    /video

/src
  /domain                 # reglas/validaciones puras (sin DOM)
    validators.js
    reservation.js

  /application            # casos de uso (sin DOM)
    createReservation.js
    listSlots.js

  /infrastructure         # adaptadores a servicios/entornos
    whatsappGateway.js
    calendarGateway.js
    storageGateway.js     # (opcional futuro)

  /ui                     # interacción con el DOM/Bootstrap
    main.js               # punto de entrada (ESM)
    navBar.js
    scrollButtons.js
    phoneOnlyNumber.js
    reservationForm.js
    carousel.js
```

**Principios clave**
- `domain` y `application` **no** tocan el DOM ni `window`/`document`.
- `ui` solo maneja DOM y delega lógica a `application`/`domain`.
- `infrastructure` encapsula efectos externos (WhatsApp, Calendar, storage/fetch).
- Flujos de dependencia: `ui → application → domain`, y `application ↔ infrastructure` mediante funciones. Nunca al revés.

---

## 🚦 Políticas de migración (incremental, sin romper)
1) Crear `src/ui/main.js` y cargarlo con `<script type="module">` en `index.html`. Importar desde ahí los módulos UI existentes (nav, scroll, phoneOnlyNumber, reservationForm).
2) Extraer a `infrastructure` la creación de enlaces (WhatsApp y Google Calendar).
3) Extraer validaciones y formateos a `domain` (ej.: `isValidPhone`, `formatDate`, `formatTime`).
4) Crear casos de uso en `application` (ej.: `createReservation(data)` que valida, arma enlaces y devuelve resultados para que `ui` los use).
5) Mantener PRs pequeños con títulos claros: `[refactor]`, `[feat]`, `[fix]`, `[docs]` y descripción breve de *qué* cambió y *por qué*.

Cada PR debe confirmar:
- ✅ Misma funcionalidad visible (no cambios inesperados).
- ✅ Sin errores en consola (desktop y móvil).
- ✅ Rutas de assets intactas o actualizadas correctamente.
- ✅ Bootstrap 5 funcionando.

---

## 🛠️ Convenciones de código
- **Idioma**: *code in English*, *UI copy in Spanish*.
- **JS**: ES Modules (usar `type="module"`), `const`/`let`, arrow functions cuando tenga sentido.
- **Strings**: usar **template strings** (``${...}``) en lugar de concatenación con `+`.
- **CSS**: clases en **kebab-case** (`.submit-button`), IDs solo si son necesarios y únicos.
- **Ficheros**: nombres en kebab-case (`reservation-form.js`, `whatsapp-gateway.js`).
- **Comentarios internos** en inglés, claros y concisos.
- Evitar duplicación: factorizar utilidades.
- Nada de estilos inline si puede ir en CSS.

---

## 📋 Reglas de trabajo para agentes
- Mantener **separación**: HTML (estructura), CSS (estilos), JS (comportamiento).
- No añadir librerías pesadas sin justificar (tamaño, rendimiento, accesibilidad).
- Antes de borrar o renombrar funciones, **explicar en el PR** el motivo.
- Antes de reestructurar, **describir** el plan y el impacto (breve).
- Mantener accesibilidad básica (labels, `aria-*`, foco navegable).

---

## ✅ Checklist de verificación manual
- `index.html` carga sin errores (incluyendo CDN de Bootstrap).
- Menú responsive funciona (abrir/cerrar; scroll a secciones).
- Botones **Reservar** hacen scroll suave a la sección del formulario.
- Formulario: teléfono solo números, selección de fecha/hora correcta.
- WhatsApp se abre con los datos correctos (URL codificado).
- Google Calendar crea evento (web y deep link Android si aplica).
- Carrusel y video se muestran y no rompen el layout.
- **Consola limpia** (sin errores ni warnings críticos).

---

## ❌ No hacer (sin aprobación explícita)
- Sustituir Bootstrap o añadir frameworks grandes.
- Reescribir toda la estructura en un solo PR.
- Cambiar rutas de imágenes/videos sin actualizar referencias.
- Dejar *console errors* o degradar rendimiento perceptible.

---

## 🧪 Ejemplos de responsabilidades (referencia)
- `domain/validators.js`: `isValidPhone(value)`, `isValidDate(value)`, `isValidTime(value)`.
- `infrastructure/calendarGateway.js`: `createCalendarLink({ date, time, durationHours, title, description })`.
- `infrastructure/whatsappGateway.js`: `createWhatsAppLink({ phoneNumber, message })`.
- `application/createReservation.js`: orquesta: valida datos, arma enlaces y devuelve `{ calendarUrl, whatsappUrl }`.
- `ui/reservationForm.js`: lee el DOM, previene submit, llama `createReservation(data)` y abre los enlaces.
- `ui/scrollButtons.js`: añade listeners a botones para hacer `scrollIntoView` suave.
- `ui/navBar.js`: gestiona collapse y navegación en móviles.
- `ui/main.js`: punto de entrada que importa los módulos UI.

---

## 📌 Notas de implementación
- Mantener compatibilidad con **Bootstrap 5.3.x**.
- Si se migran rutas, actualizar `<link rel="stylesheet">` y `<script type="module">` en `index.html`.
- Mantener tamaños de imágenes razonables (optimizar si es necesario).
- Evitar *magic strings*: centralizar textos repetidos en constantes cuando sean internos al código.
