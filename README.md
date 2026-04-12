# FOSSEE Workshop Booking — React UI/UX Redesign

A complete React redesign of the [FOSSEE Workshop Booking](https://github.com/FOSSEE/workshop_booking) Django portal, targeting mobile-first students accessing workshops from college campuses across India.

## Getting Started

```bash
npm install
npm start        # Dev server at http://localhost:3000
npm run build    # Production build
```

Demo credentials: `coordinator` / `demo123` or `instructor` / `demo123`

---

## Design Principles

### 1. Mobile-First, Content-First
Every layout decision starts from 375px width and scales up. Key choices:
- `clamp()` for fluid typography — no separate font-size breakpoints needed
- CSS Grid with `auto-fill / minmax()` — layouts reflow naturally without custom breakpoints
- `flex-wrap` on all action rows — buttons, filters, headers never overflow

### 2. Consistent Design System via CSS Variables
A purpose-built token system replaces Bootstrap overrides:
```css
--bg-primary / --bg-card           /* layered surface depth */
--accent-blue / --accent-cyan      /* brand gradient pair */
--text-primary / --secondary / --muted  /* type hierarchy */
--border-subtle / --border-active  /* interactive state */
```

### 3. Visual Hierarchy through Restraint
- **Headings**: Sora 700 — warm geometric, distinctive, highly legible
- **Mono labels**: JetBrains Mono for numbers, dates, codes
- **Color**: Blue-cyan gradient reserved for primary actions only
- **Depth**: Three background layers create perceived depth without images

### 4. Accessible Interaction
- All interactive elements have `:focus-visible` outlines — full keyboard navigation
- `aria-required`, `aria-invalid`, `aria-label`, `aria-current="page"` throughout
- Color is never the only differentiator — badges always include text
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<form>`

### 5. Purposeful Motion
- `fadeInDown` on hero badge: establishes hierarchy order
- `fadeInUp` on hero content: guides eye downward  
- Card `translateY(-3px)` on hover: confirms interactivity
- CSS transitions only — zero JS animation runtime overhead

---

## Responsiveness Strategy

| Breakpoint | Strategy |
|------------|----------|
| < 480px    | Stats grid: 2 columns; typography tightened |
| < 768px    | Navbar → hamburger drawer; tables → card stacks |
| ≥ 768px    | Full horizontal nav; side-by-side form grids |
| ≥ 1024px   | Workshop grid: 3-column auto-fill |

### Responsive Tables (biggest win)
The original tables overflowed on mobile. The redesign uses the `data-label` CSS pattern — zero extra HTML, pure CSS, zero JS:
```css
.table thead { display: none; }
.table td { display: flex; justify-content: space-between; }
.table td::before { content: attr(data-label); }
```

---

## Trade-offs: Design vs Performance

| Decision | Design Benefit | Performance Cost | Mitigation |
|----------|---------------|-----------------|------------|
| Google Fonts (Sora + JetBrains Mono) | Distinctive brand typography | ~40KB | `display=swap`; cached after first visit |
| `backdrop-filter` on navbar | Glassmorphism depth | GPU layer | Limited to navbar only |
| CSS gradient hero | Atmospheric, premium | Extra paint | Pure CSS — no images |
| Emoji icons instead of icon library | On all devices, accessible | Rendering varies slightly | Acceptable for this use case |
| No animation library | Bundle stays 71KB gzip | Simpler easing only | CSS `cubic-bezier` covers all cases |

**Final bundle: 71.76 KB gzip** — fast even on 3G (~0.6s at 1Mbps).

---

## Before & After

### Before — Original Bootstrap Site

```
┌─────────────────────────────────────────────┐
│ [FOSSEE Workshops]  Home  Workshop Stats    │  ← Dark navbar
├─────────────────────────────────────────────┤
│                                             │
│  WHITE BACKGROUND — visual disconnect       │
│                                             │
│  Workshop Types                             │
│  ┌──┬──────────────┬──────────┬──────────┐ │
│  │# │ Name         │ Duration │ Action   │ │  ← Table overflows
│  │1 │ Python...    │ 2 Days   │ [View]   │ │    on mobile
│  │2 │ Scilab...    │ 3 Days   │ [View]   │ │
│  └──┴──────────────┴──────────┴──────────┘ │
│                                             │
└─────────────────────────────────────────────┘
  Developed by FOSSEE group, IIT Bombay
```

**Issues:** Plain white body clashes with dark nav. Tables overflow on mobile. No search or filter. No visual hierarchy. No empty states. No feedback animations. Low contrast text.

### After — React Redesign

```
┌─────────────────────────────────────────────┐
│ 🎓 FOSSEE  Home  Types  Status  Statistics │  ← Frosted glass nav
├─────────────────────────────────────────────┤
│ ·  ·  ·  grid background  ·  ·  ·  ·  ·   │
│                                             │
│       ● IIT Bombay · Open Source           │  ← Animated badge
│                                             │
│      Workshops that Empower Students        │  ← Gradient heading
│                                             │
│      FOSSEE brings free, high-quality...    │
│                                             │
│    [🚀 Get Started Free]  [Browse →]       │
├─────────────────────────────────────────────┤
│  500+     200+     15K+     20+            │  ← Stat cards
│  Workshops Colleges Students Instructors   │
├─────────────────────────────────────────────┤
│  [🎯 Targeted] [🏛️ Institute] [👩‍🏫 Expert] │  ← Feature cards
│                                             │
└─────────────────────────────────────────────┘
```

**Improvements:** Cohesive dark system. Animated hero with CSS grid background. Filterable workshop grid with search + category chips. Tables that stack elegantly on mobile. Visual status badges. Inline validation. Accessible focus states.

---

## Architecture

```
src/
├── components/
│   ├── Navbar.js               # Responsive nav + mobile drawer + user dropdown
│   └── Footer.js
├── pages/
│   ├── HomePage.js             # Hero, stats, features, CTA
│   ├── LoginPage.js            # Auth form with validation + demo credentials
│   ├── RegisterPage.js         # Multi-field registration with success state
│   ├── WorkshopTypesPage.js    # Grid/list toggle, search, filter, pagination
│   ├── WorkshopDetailsPage.js  # Detail table + live comment thread
│   ├── ProposeWorkshopPage.js  # Workshop proposal form with inline TnC
│   ├── WorkshopStatusPage.js   # Accept/review dashboard with tab filters
│   ├── StatisticsPage.js       # CSS bar + column charts, ranked state table
│   └── ProfilePage.js          # User profile with inline edit mode
├── App.js                      # SPA router (state-based, no react-router)
└── index.css                   # Full design system (1 file, ~350 lines)
```

---

## Django Backend Integration

This React SPA replaces only the template layer — Django REST endpoints remain unchanged:

```javascript
// Replace mock login with real API call
const response = await fetch('/api/auth/login/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRFToken': getCookie('csrftoken')
  },
  body: JSON.stringify({ username, password })
});
```

---

## Hardest Part: Responsive Tables

The most challenging aspect was transforming dense workshop status tables into mobile-friendly card stacks without JavaScript. The `data-label` CSS pseudo-element pattern requires careful coordination: every `<td>` needs a `data-label` attribute matching the column header it replaces, and the CSS must correctly toggle between table and flex layout. Edge cases — empty rows from conditional Django template rendering, multi-badge status cells, long institute names — required multiple passes to handle cleanly at every breakpoint.
