# StaffIntra marketing landing page

Conversion-focused marketing landing page for StaffIntra, built with **Next.js 15 + React 19** (static export). Design inspired by [miter.com](https://www.miter.com/); visual language driven by the StaffIntra brand guidelines v1.0 (`../StaffIntra_Brand_Guidelines.html`).

## Run it

```bash
npm install
npm run dev        # dev server on http://localhost:3000
npm run build      # static export → ./out (deploy that folder anywhere)
```

The build is a fully prerendered static export — no server needed. Drop `out/` on any static host (Vercel, Netlify, S3, nginx).

## Structure

- `app/layout.jsx` — fonts (Plus Jakarta Sans / Inter / JetBrains Mono via `next/font`, self-hosted), metadata, favicon
- `app/globals.css` — the whole design system, built on the canonical brand tokens (`--accent: #4024C0` etc.)
- `components/` — one component per section: `Nav`, `Hero`, `Logos`, `Splits`, `FeatureGrid`, `Stats`, `Quotes`, `Cta`/`DemoForm`, `Footer`
- `components/Reveal.jsx` — scroll-in animation wrapper (IntersectionObserver, respects `prefers-reduced-motion`)
- `components/CountUp.jsx` — odometer-style counters (Miter-inspired social proof)
- `public/assets/` — brand SVG/PNG assets from the brand kit

## Wiring the lead form

`components/DemoForm.jsx` is front-end only. Point `handleSubmit` at your form endpoint (HubSpot, Formspree, your API) where marked. Client-side validation and the success state are already in place.

## Deliberate choices

- **British English** throughout (`rota`, `colours`, `Help centre`), `lang="en-GB"`.
- Sentence case everywhere including buttons; no exclamation marks — per brand voice.
- Headlines end in periods (Miter's declarative style).
- All testimonials, customer names, and stats are **placeholder fiction** — replace before public launch.
- "Sign in" in the nav is a placeholder link — point it at the app's login when available.
