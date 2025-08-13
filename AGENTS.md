## 🎯 Project Objective
Static website for **LilArt.Studios** that:
- Displays work (gallery/carousel) and a hero section.
- Provides clear CTAs to **Book**.
- Allows **booking an appointment** by sending data via **WhatsApp** and adding event to **Google Calendar**.
- Maintains **responsive design** with Bootstrap 5.

**Language Note:** The **code** (CSS class names, IDs, variables, functions and internal comments) **must be in English**. The **visible content** of the page (texts, labels, placeholders) **must be in Spanish**.

---

## 📦 Current State (keep functional)
Main files (do not break their behavior):
- `index.html` — main page (hero, carousel, form, footer).
- `styleLilArt.css` — global stylesheet.
- `btnGoReservar.js` — buttons that smooth scroll to reservation section.
- `navBar.js` — responsive menu behavior (collapse/controlled scroll).
- `phoneOnlyNumber.js` — sanitizes phone input to numbers only.
- `reservarCitasWhatsapp.js` — populates dates/times, builds WhatsApp and Google Calendar messages and links.
- `images.img/…` — image and video resources.
- (Optional per repo) `carousel.js` — specific carousel logic if exists.

Current hard rules:
- Do not introduce **console errors**.
- Do not break existing image/video paths.
- Do not break compatibility with **Bootstrap 5.3.7** (CDN).

---

## 🧱 Target Architecture (hexagonal "lite")
Apply layer separation without unnecessarily complicating a static front-end:

```
/public
  index.html
  /styles
    main.css
  /assets
    /images.img
    /video

/src
  /domain                 # pure rules/validations (no DOM)
    validators.js
    reservation.js

  /application            # use cases (no DOM)
    createReservation.js
    listSlots.js

  /infrastructure         # adapters to services/environments
    whatsappGateway.js
    calendarGateway.js
    storageGateway.js     # (optional future)

  /ui                     # DOM/Bootstrap interaction
    main.js               # entry point (ESM)
    navBar.js
    scrollButtons.js
    phoneOnlyNumber.js
    reservationForm.js
    carousel.js
```

**Key Principles**
- `domain` and `application` **do not** touch DOM or `window`/`document`.
- `ui` only handles DOM and delegates logic to `application`/`domain`.
- `infrastructure` encapsulates external effects (WhatsApp, Calendar, storage/fetch).
- Dependency flows: `ui → application → domain`, and `application ↔ infrastructure` via functions. Never backwards.

---

## 🚦 Migration Policies (incremental, non-breaking)
1) Create `src/ui/main.js` and load it with `<script type="module">` in `index.html`. Import existing UI modules from there (nav, scroll, phoneOnlyNumber, reservationForm).
2) Extract link creation (WhatsApp and Google Calendar) to `infrastructure`.
3) Extract validations and formatting to `domain` (e.g.: `isValidPhone`, `formatDate`, `formatTime`).
4) Create use cases in `application` (e.g.: `createReservation(data)` that validates, builds links and returns results for `ui` to use).
5) Keep small PRs with clear titles: `[refactor]`, `[feat]`, `[fix]`, `[docs]` and brief description of *what* changed and *why*.

Each PR must confirm:
- ✅ Same visible functionality (no unexpected changes).
- ✅ No console errors (desktop and mobile).
- ✅ Asset paths intact or correctly updated.
- ✅ Bootstrap 5 working.

---

## 🛠️ Code Conventions
- **Language**: *code in English*, *UI copy in Spanish*.
- **JS**: ES Modules (use `type="module"`), `const`/`let`, arrow functions when it makes sense.
- **Strings**: use **template literals** (``${...}``) instead of concatenation with `+`.
- **CSS**: classes in **kebab-case** (`.submit-button`), IDs only if necessary and unique.
- **Files**: names in kebab-case (`reservation-form.js`, `whatsapp-gateway.js`).
- **Internal comments** in English, clear and concise.
- Avoid duplication: factor out utilities.
- No inline styles if it can go in CSS.

---

## 📋 Work Rules for Agents
- Maintain **separation**: HTML (structure), CSS (styles), JS (behavior).
- Do not add heavy libraries without justification (size, performance, accessibility).
- Before deleting or renaming functions, **explain in PR** the reason.
- Before restructuring, **describe** the plan and impact (brief).
- Maintain basic accessibility (labels, `aria-*`, navigable focus).

---

## ✅ Manual Verification Checklist
- `index.html` loads without errors (including Bootstrap CDN).
- Responsive menu works (open/close; scroll to sections).
- **Book** buttons smooth scroll to form section.
- Form: phone numbers only, correct date/time selection.
- WhatsApp opens with correct data (encoded URL).
- Google Calendar creates event (web and Android deep link if applicable).
- Carousel and video display and don't break layout.
- **Clean console** (no errors or critical warnings).

---

## ❌ Do Not (without explicit approval)
- Replace Bootstrap or add large frameworks.
- Rewrite entire structure in a single PR.
- Change image/video paths without updating references.
- Leave *console errors* or degrade perceptible performance.

---

## 🧪 Responsibility Examples (reference)
- `domain/validators.js`: `isValidPhone(value)`, `isValidDate(value)`, `isValidTime(value)`.
- `infrastructure/calendarGateway.js`: `createCalendarLink({ date, time, durationHours, title, description })`.
- `infrastructure/whatsappGateway.js`: `createWhatsAppLink({ phoneNumber, message })`.
- `application/createReservation.js`: orchestrates: validates data, builds links and returns `{ calendarUrl, whatsappUrl }`.
- `ui/reservationForm.js`: reads DOM, prevents submit, calls `createReservation(data)` and opens links.
- `ui/scrollButtons.js`: adds listeners to buttons to perform smooth `scrollIntoView`.
- `ui/navBar.js`: manages collapse and navigation on mobile.
- `ui/main.js`: entry point that imports UI modules.

---

## 📌 Implementation Notes
- Maintain compatibility with **Bootstrap 5.3.x**.
- If paths are migrated, update `<link rel="stylesheet">` and `<script type="module">` in `index.html`.
- Keep reasonable image sizes (optimize if necessary).
- Avoid *magic strings*: centralize repeated texts in constants when internal to code.