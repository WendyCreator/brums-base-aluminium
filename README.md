# Brum's Base Aluminium — website

Frontend-only marketing site. React 19 + Vite + TypeScript + Tailwind CSS 4 + Framer Motion. No backend.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build
```

## Replacing placeholder content

Everything editable lives in `src/data/`. Components read from these files, so real content drops in without touching layout code.

| File | What it holds | Status |
| --- | --- | --- |
| `company.ts` | Phone, WhatsApp, founder, workshop hours, email, address, socials, verified stats | Founder, WhatsApp (+234 916 262 4051) and hours confirmed by the team (Oct 2026); phone + workshop address from the client's existing site. **Email, socials, founding year and project count are empty — the UI hides them until filled.** |
| `images.ts` | Every photo on the site (one registry) | **All stock (Unsplash) placeholders.** Swap for real project photography here. Accepts `unsplash:<id>` or any URL / imported local file. |
| `projects.ts` | Portfolio entries | **Descriptive placeholders, not real projects.** Replace each entry and set `representative: false`; the "imagery is representative" note disappears once none are flagged. |
| `solutions.ts` | The six solution families | Copy is general; review with the client. |
| `testimonials.ts` | Client quotes | Empty → section hidden. Add only real, permitted quotes. |
| `content.ts` | Before/after pairs, aluminium + glass finishes, glass types, process steps, nav, quote terms, form options | Finishes and glass types confirmed by the team (Oct 2026). Before/after empty → section hidden. |

## Brand assets

`src/assets/brand/` holds the real logo (`logo-mark.png`, `logo-full.png`, recovered from the client's company profile — only ~270px wide, so swap in a vector/high-res original when the client has one) and the team photo (`team.jpg`, the only real photograph so far). The nav uses the mark on a cream disc beside a typeset wordmark (`Logo.tsx`); favicon, apple-touch icon and `public/og.jpg` were generated from the same logo.

Never commit the client's source PDFs or customer paperwork — `src/assets/*.pdf` is gitignored.

## Palette

Neutrals (ink / bone / brushed-aluminium greys) are unchanged. The single accent is **brand copper**, taken from the logo's rust and tan: `--color-champagne` (`#a64d1d`, accent on light sections, rules, dots, focus ring) and `--color-champagne-2` (`#e0a077`, accent text on dark sections). The token names are historical — "Champagne Gold" the aluminium *finish* is separate data in `data/content.ts`. Edit both in `src/index.css` to retune.

## Finishes → quote form

The finishes section links to `/contact?frame=<option>&glass=<option>[&treatment=Anodized]#quote`. `QuoteForm` pre-selects the matching dropdowns, accepting only values from the option lists in `data/content.ts` (anything else is ignored).

## Structured data

`useBusinessSchema` injects schema.org LocalBusiness JSON-LD (address, hours, phone, email, founder) from `data/company.ts`. `url` and `logo` are added only when `VITE_SITE_URL` is set.

## Quote form

Without configuration the form never pretends to send: it opens WhatsApp with the enquiry pre-written, and the visitor presses send. To deliver enquiries to an inbox instead, create a Formspree form (or any JSON endpoint) and set:

```
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

## SEO

Set `VITE_SITE_URL` (e.g. `https://brumsbase.com`, no trailing slash) before building. Canonical and `og:url` tags are only emitted when it is set, so a build never points at the wrong domain. The OG image is `public/og.jpg`.

`robots.txt` is generated on every build. `sitemap.xml` (home, About, Solutions, Projects, Contact) is generated **only when `VITE_SITE_URL` is set** — a sitemap needs absolute URLs, and the domain is never guessed. Until then `/sitemap.xml` falls through to the SPA rewrite. Project detail pages stay out of the sitemap while their content is placeholder (see `seoFiles` in `vite.config.ts`).

## Deploy

`vercel.json` includes the SPA rewrite so direct links like `/projects/modern-residence` don't 404.

## Notes for developers

- **Scroll-linked transforms:** Framer Motion 13 hands `useTransform(scrollYProgress, range, …)` input ranges to WAAPI as keyframe offsets. Keep every range inside `[0, 1]`, or the page crashes on mount ("Offsets must be monotonically non-decreasing").
- **Page transitions** use `AnimatePresence mode="wait"`, which waits for *every* descendant with an `exit` prop. Wrap any in-page exit animation in its own `<AnimatePresence>`, or navigation away from that page stalls for the length of its animation.
- **Navbar tone:** add `data-nav-tone="light"` to any light-background section so the floating bar switches to its light glass style over it (`"dark"` overrides a light ancestor).
- **Reduced motion** is respected globally (`MotionConfig reducedMotion="user"`); pinned and horizontal scroll sections fall back to static stacked layouts.
