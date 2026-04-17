# Navisworks MCP Toolkit — Landing Page Spec

## 1. Concept & Vision

A professional, engineering-grade landing page for BIM coordinators and technical leads at engineering firms. The page communicates precision, reliability, and technical depth — it should feel like the documentation of a serious tool, not a SaaS startup. Think: Autodesk ADN meets open-source clarity.

**URL:** `https://decarrm.github.io/navisworks-mcp-toolkit/`
**Canonical:** `https://decarrm.github.io/navisworks-mcp-toolkit/`

---

## 2. Design Language

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--navy` | `#0F172A` | Primary background, dark sections |
| `--blue` | `#3B82F6` | Primary accent, links, CTAs |
| `--cyan` | `#06B6D4` | Secondary accent, highlights |
| `--white` | `#FFFFFF` | Primary text on dark |
| `--slate-300` | `#CBD5E1` | Secondary text |
| `--slate-500` | `#64748B` | Muted text, borders |
| `--slate-800` | `#1E293B` | Light section backgrounds |
| `--slate-900` | `#0F172A` | Dark section backgrounds |

### Typography
- **Headings:** Inter (Google Fonts) — weight 700/600, fallback system-ui
- **Body:** Inter — weight 400/500, 16px base, 1.6 line-height
- **Code:** JetBrains Mono — monospace, syntax-highlighted code blocks
- **Scale:** 14 / 16 / 18 / 24 / 32 / 48 / 64px

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Container max-width: 1120px, padding 24px
- Card border-radius: 12px
- Button border-radius: 8px

### Motion
- Scroll-triggered fade-up (opacity 0→1, translateY 20px→0, 500ms ease-out)
- Hover transitions: 200ms ease on buttons, cards, links
- No gratuitous animation — motion serves clarity

### Visual Assets
- **Logo:** SVG at `/logo.svg` (geometric N + clash symbol)
- **Icons:** Inline SVG only, no external icon library
- **No photography** — product is technical, use code blocks and diagrams

---

## 3. Layout & Structure

### Page Sections (top to bottom)

1. **Navbar** — Logo left, nav links center, GitHub star button right (sticky on scroll)
2. **Hero** — Dark navy bg, logo + tagline + headline + subheadline + dual CTA + trust badges (Autodesk Compatible, 48 tests passing)
3. **Features** — 3-column grid, icon + title + description per feature (white bg)
4. **Demo** — Syntax-highlighted code block showing CLI usage (slate-800 bg)
5. **How It Works** — 3-step flow: Configure → Connect → Query (slate-900 bg)
6. **Pricing** — Free tier + Pay-as-you-go card (white bg)
7. **Footer** — Logo, links, license, disclaimer (navy bg)

### Responsive Strategy
- **Desktop (1024px+):** Full 3-column grids, horizontal nav
- **Tablet (768–1023px):** 2-column grids, condensed nav
- **Mobile (<768px):** Single column, hamburger nav hidden (links collapse)

---

## 4. Features & Interactions

### Navbar
- Logo links to `/` (anchor top)
- Links: Features, Demo, Pricing, GitHub
- GitHub button: opens repo in new tab
- On scroll >50px: navbar adds subtle backdrop-blur + shadow

### Hero Section
- Headline: "Run Clash Queries in Natural Language"
- Subheadline: "Navisworks MCP Toolkit brings natural language interfaces to your BIM coordination workflow — query clash results directly from Claude Code or any MCP-compatible AI client."
- Dual CTA: "Get Started" (blue fill) + "View on GitHub" (outline)
- Trust badges: small pills below CTAs

### Features Section (6 features, 3×2 grid)
1. **Natural Language Queries** — "Ask clash questions in plain English. No more manually filtering rulesets."
2. **MCP Protocol Compatible** — "Works with Claude Code, Cursor, Windsurf, and any MCP-compatible AI assistant."
3. **Autodesk Navisworks Native** — "Leverages the official Clash Detective and Model Review APIs via APS."
4. **Python MCP Server** — "Simple `pip install`, run locally, connect instantly."
5. **48 Tests Passing** — "Battle-tested with 48 integration tests across clash and model review workflows."
6. **Pay-as-You-Go Pricing** — "No subscriptions. Pay €0.01 per tool call. Start free."

### Demo Section
- Code block showing:
  - Installation: `pip install navisworks-mcp`
  - Configuration in Claude Code (MCP JSON)
  - Natural language query: "Show me all hard clashes between HVAC and Structure"
  - JSON response from the API
- Syntax highlighting via highlight.js (github theme)
- Copy button on code block

### How It Works Section (3 steps)
1. **Configure** — Add the MCP server to your AI client's config
2. **Connect** — Authenticate with your APS credentials
3. **Query** — Ask clash questions in natural language

### Pricing Section
- **Free Tier:** 100 calls/month free. No credit card.
- **Pay-as-You-Go:** €0.01 per tool call. Billed monthly.
- CTA: "Start Free" + "Check Pricing Details"

### Footer
- © 2026 decarrm
- Links: GitHub, Issues, License (MIT)
- Disclaimer: "Navisworks® is an Autodesk product. This project is not affiliated with Autodesk."

---

## 5. Component Inventory

### Button — Primary
- Background: `#3B82F6`, text: white, padding: 12px 24px
- Hover: darken 10%, translateY -1px
- Active: darken 15%, translateY 0
- Border-radius: 8px, font-weight 600

### Button — Outline
- Background: transparent, border: 2px solid `#3B82F6`, text: `#3B82F6`
- Hover: fill `#3B82F6` at 10% opacity
- Border-radius: 8px, font-weight 600

### Button — Ghost (nav links)
- Background: transparent, text: `#CBD5E1`
- Hover: text: white

### Feature Card
- Background: `#1E293B`, border: 1px solid `#334155`, padding: 32px, border-radius: 12px
- Icon: 48px SVG in `#3B82F6`, title: 18px white, description: 16px `#CBD5E1`
- Hover: border-color `#3B82F6`, subtle translateY -2px

### Code Block
- Background: `#0F172A`, padding: 24px, border-radius: 12px
- Font: JetBrains Mono 14px
- Syntax: highlight.js github theme (dark)
- Copy button: top-right, icon-only, tooltip "Copy"

### Pricing Card
- Standard: `#1E293B` bg, `#334155` border
- Featured (Paid): `#3B82F6` border, "Recommended" badge
- Price: 48px bold white, period: 16px slate-300

### Navbar
- Height: 72px, background: `#0F172A` with 80% opacity + backdrop-blur on scroll
- Logo: 40px height, SVG
- Links: 16px, gap 32px

---

## 6. Technical Approach

### Stack
- **Single HTML file** (`index.html`) — no framework needed for a static landing
- **Inline CSS** in `<style>` tag — no external stylesheet, simplifies GitHub Pages deployment
- **Vanilla JS** for: scroll effects, copy button, mobile nav toggle
- **highlight.js** via CDN — code syntax highlighting
- **Google Fonts** via CDN — Inter + JetBrains Mono

### File Structure
```
/
├── index.html          ← single page landing
├── sitemap.xml         ← XML sitemap
├── robots.txt          ← crawling directives
└── docs/               ← GitHub Pages target (copied from root)
    └── superpowers/
        └── specs/
            └── SPEC.md ← this file
```

**GitHub Pages:** Source served from `docs/` branch or `docs/` folder on main.
The `index.html`, `sitemap.xml`, and `robots.txt` live at repo root. GitHub Pages is configured to serve from root `/.

### SEO Implementation
- `<title>`: "Navisworks MCP Toolkit — Natural Language Clash Queries for BIM"
- `<meta name="description">`: 155-char description
- `<link rel="canonical">`: https://decarrm.github.io/navisworks-mcp-toolkit/
- **OG tags:** og:title, og:description, og:image (logo URL), og:url, og:type
- **Twitter Card:** summary_large_image
- **Schema.org:** SoftwareApplication JSON-LD (name, description, url, applicationCategory, operatingSystem, offers)
- **sitemap.xml:** single URL entry
- **robots.txt:** allow all, sitemap reference

### External Resources
- highlight.js: `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css`
- Inter: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap`
- GitHub Buttons CDN: `https://ghbtns.com/github.js` (for star button)

---

## 7. SEO Checklist

- [ ] `<title>` with keyword "Navisworks MCP"
- [ ] `<meta name="description">` ≤ 160 chars, includes value prop
- [ ] Canonical URL tag
- [ ] OG:title, OG:description, OG:url, OG:image, OG:type=website
- [ ] Twitter Card meta
- [ ] Schema.org JSON-LD (SoftwareApplication)
- [ ] `sitemap.xml` with HTTPS URL
- [ ] `robots.txt` with sitemap directive
- [ ] Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- [ ] Heading hierarchy: single `<h1>`, logical `<h2>` per section
- [ ] Alt text on all `<img>`/SVG
- [ ] Mobile-friendly viewport meta
