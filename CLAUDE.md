# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LilArt.Studios is a static website for a manicure salon built with vanilla HTML, CSS, and JavaScript. The site features a modern design with Bootstrap 5 framework, image galleries, appointment booking, and dark/light theme functionality.

## Project Structure

### Core Architecture
- **Static HTML Site**: Single-page application with `index.html` as the main entry point
- **Modular JavaScript**: Feature-based JS modules in `/javascript/` and `/src/ui/` directories
- **CSS Theming**: CSS custom properties for dynamic light/dark mode switching
- **Bootstrap Integration**: Uses Bootstrap 5 for responsive layout and components

### Key Directories
- `public/styles/`: Main CSS file with theme variables and responsive design
- `javascript/`: Core functionality modules (form handling, navigation, validation)
- `src/ui/`: Modern ES6 modules (theme toggle, main entry point)
- `images.img/`: All website media assets organized by category

### Component System
The site uses a component-based approach with separate JavaScript modules:

- **Theme System** (`src/ui/themeToggle.js`): Handles light/dark mode with localStorage persistence
- **Form Handler** (`javascript/reservarCitasWhatsapp.js`): WhatsApp integration and Google Calendar links
- **Navigation** (`javascript/navBar.js`): Bootstrap collapse menu with smooth scrolling
- **UI Controls** (`javascript/btnGoReservar.js`): Scroll-to-section functionality

## Development Commands

This is a static website with no build process. Serve directly:

### Local Development
```bash
# Simple HTTP server (Python)
python3 -m http.server 8000

# Or Node.js http-server
npx http-server

# Or PHP built-in server
php -S localhost:8000
```

### File Structure
- Entry point: `index.html`
- Styles: `public/styles/main.css`
- Main JS module: `src/ui/main.js` (imports theme toggle)
- Legacy JS: Files in `javascript/` directory loaded via script tags

## Key Features

### Theme System
- CSS custom properties for dynamic theming
- Light/dark mode toggle persists in localStorage
- Theme classes: `.light-mode` and `.dark-mode` on body element

### Form Integration
- WhatsApp reservation system with pre-formatted messages
- Dynamic date/time selection with hardcoded available slots
- Google Calendar integration with automatic event creation
- Phone number validation (digits only)

### Responsive Design
- Mobile-first approach with Bootstrap breakpoints
- Dual carousel system (desktop/mobile variants)
- Accordion footer for mobile navigation

## Code Conventions

### CSS
- Uses CSS custom properties for theming: `var(--background-color)`, `var(--text-color)`
- Mobile-first responsive design with `@media (min-width: 768px)`
- Bootstrap utility classes combined with custom styles

### JavaScript
- ES6 modules in `src/ui/` directory
- Traditional script loading for `javascript/` files
- Event-driven architecture with DOMContentLoaded listeners
- No external dependencies beyond Bootstrap

### HTML
- Semantic HTML5 structure
- Bootstrap 5 component classes
- Accessibility attributes (aria-labels, roles)

## Business Logic

### Appointment System
Available dates and times are hardcoded in `reservarCitasWhatsapp.js`:
```javascript
const fechasDisponibles = {
  "2025-06-15": ["10:00", "12:00", "15:30"],
  "2025-06-18": ["09:00", "11:30", "17:00"],
  "2025-06-20": ["13:00", "16:00", "18:30"]
};
```

### Contact Integration
- WhatsApp number: 34624643500
- Automatic message formatting with booking details
- Social media links: Instagram, Facebook, TikTok

## Asset Management
- All images stored in `images.img/` with descriptive subdirectories
- Video files for background/hero sections
- Logo and branding assets in dedicated folders

## Maintenance Notes
- Update available appointment dates in `reservarCitasWhatsapp.js`
- Social media links are hardcoded in HTML
- No database or server-side components - all client-side functionality