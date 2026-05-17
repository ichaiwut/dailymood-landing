# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**dailymood.me landing page** — the public marketing / SEO surface for the DailyMood.me mood-tracking product. This repo is *not* the app; it sells the app and links users into it.

**Spec lives in `PRD.md`** at the repo root. **Prototype reference lives in `prototype/`** (the original Babel-rendered HTML + JSX from Claude Design). PRD wins on copy and behaviour, prototype wins on visuals — read them before touching landing sections.

## Stack

- **Astro 5** (static site generator) + **TypeScript**
- Pure CSS with CSS variables in `src/styles/globals.css` — **no Tailwind, no CSS framework**
- Built-in Astro i18n routing (`defaultLocale: 'th'`, `routing.prefixDefaultLocale: false`)
- Two interactive scripts (Nav scroll-state, FAQ accordion) inlined as vanilla `<script>` blocks inside their `.astro` files — Astro inlines them since they're tiny
- **Total shipped JS per page: ~450 bytes** (two inlined modules). No external JS bundles.

Why this stack: 11-section marketing page with TH/EN + two tiny interactive bits. Next.js + React was ~104 kB of JS for what is essentially a brochure. Astro renders to static HTML at build time and only ships JS for the explicitly interactive parts.

**Deploy target:** Railway (static or Node adapter). Images live in **Cloudflare R2**.

## Two-repo layout

The product is split across two repos and two domains:

| Domain | Repo | Role |
|---|---|---|
| `dailymood.me` | **this repo** (`~/Sites/dailymood-landing`) | Marketing landing, SEO, sign-up funnel |
| `my.dailymood.me` | `~/Sites/dailymood.me` | The actual app — login required, `noindex` |

The app repo is indexing-disabled by design. SEO lives **here**. Any "what does DailyMood do" content belongs in this repo, not the app.

OAuth callbacks, NextAuth config, Stripe webhooks, Drizzle/Postgres, R2 from the app side, Gemini, etc. all live in the app repo — do not touch them from here.

**CTAs go to `https://my.dailymood.me/login`** (or `/login?email=…` for the hero email-pill pattern). Pricing CTA → app login → `/profile/subscription`. The cross-domain URLs come from `src/lib/cta.ts` — change there if the app domain moves.

## Source-of-truth docs (read before writing)

In this repo:
- `PRD.md` — the spec (IA, copy verbatim TH+EN, tokens, acceptance checks).
- `prototype/` — visual reference (do not import from `src/`).

In the app repo (`~/Sites/dailymood.me`):
- `features.md` — full feature inventory, Free/Pro tier matrix. **Landing must not claim anything that's not shipped here.**
- `design.md` — design system, colors, components — match this so landing → app feels continuous.

If a product fact contradicts `features.md`, **the app's `features.md` wins** — update the landing copy.

## Copy & tone rules

Mandatory, from PRD and the app's tone rules:

- **Plain language.** No "NLP", "sentiment", "Gemini", "rate-limited", "D1", "R2", "stateless", "signed URL", "TLS", "Web Speech", "correlation" in user-facing copy. Use human equivalents.
- **No vendor names.** PRD bans "Gemini" or any specific AI provider in copy. Say "AI" only.
- **"Pro", not "Premium".** Acceptance check explicitly forbids the word "Premium" anywhere on the page.
- **No medical / clinical framing.** Testimonials must not use therapist / psychologist / patient roles. No mental-health claims.
- **No fake social proof.** No "used by X" strips, no star ratings, no `aggregateRating` in JSON-LD.
- **Gentle, low-pressure tone.** This is a mood journal, not a chatbot.

### Voice: human speaking, easy to understand

Copy should read like a person explaining the app to a friend, not a marketing page. If a sentence wouldn't survive being read aloud, rewrite it. Two specific patterns, derived from the user's edits:

- **Channel-first, not register-talk.** When describing what the user can do, name the **input channel** they actually use — `พิมพ์`, `พูด`, `ถ่ายรูป`, `แตะ` / `type`, `speak`, `snap a photo`, `tap`. Do NOT describe how the language *feels* — phrases like "naturally", "in your own words", "in plain language", "in natural language", "เขียนเป็นภาษามนุษย์", "ภาษาธรรมชาติ", "คำพูดของคุณ" are all banned. The user wants to know which button they press, not the linguistic register.
- **Verbs over nouns.** Prefer `พิมพ์ หรือพูด` over `คำพูดของคุณ`. Prefer `แตะอารมณ์` over `การเลือกอารมณ์`. Action words tell the reader what they'll do.
- **No fake claims.** If the product needs a credit card for Pro (because Stripe), don't say "no credit card." If the product doesn't use numeric input, don't frame it as "more than numbers." Copy must match product reality.
- **Don't translate Western SaaS tropes literally into Thai.** "Powered by AI", "seamless experience", "unleash your potential" → all map to embarrassing Thai. Use natural Thai phrasing or drop the idea.

### Use copy verbatim from `messages/*.json`

TH and EN strings live in `messages/th.json` and `messages/en.json` under `landing.*` — do not retranslate, do not paraphrase. Only change copy when the user explicitly asks.

### Legal pages are an exception to the no-vendor-names rule

`/privacy`, `/terms`, `/cookies` (and their EN twins under `/en/`) **must name the third-party data processors** by their actual product names — Google (OAuth + AI), Stripe (payments), Cloudflare R2 (image hosting), Resend (transactional email), Railway (app hosting), LINE (admin-only notifications). Thailand's PDPA requires disclosure of data processors, so this isn't optional.

The `Cookies` page follows Thailand PDPA framing — categorize cookies as strictly-necessary / preferences / analytics / advertising, disclose what each does, and note consent withdrawal mechanics.

## Deliberately removed (don't re-add)

Cut by the PRD. Do not propose adding back without a PRD update:

- TrustStrip / "used by N users"
- StatsBand
- `aggregateRating` schema
- Per-card star ratings
- Social icons in footer
- Company / About / Blog columns in footer

## Project structure

```
src/
  components/                  All .astro components (server-rendered at build time)
    LandingPage.astro            composes the 11 sections
    LandingNav.astro             includes inline <script> for sticky scroll state
    LandingHero.astro
    LandingBrowserMockup.astro   the Today-screen browser mock in the hero
    LandingAI.astro
    LandingHowItWorks.astro
    LandingYearInPixels.astro    deterministic 12×31 mood-pixel grid
    LandingFeaturesGrid.astro    9 feature cards, each with a custom inline-SVG icon
    LandingTestimonials.astro
    LandingPricing.astro
    LandingFAQ.astro             uses native <details>; inline <script> enforces one-open-at-a-time
    LandingCTABanner.astro
    LandingFooter.astro
    Logo.astro / MoodFace.astro / FeatIcon.astro / CheckCircle.astro
  layouts/
    Layout.astro                 <html>, <head> (meta, OG, canonical, hreflang, JSON-LD), <body>
  pages/
    index.astro                  TH landing at /
    en/index.astro               EN landing at /en/
  lib/
    i18n.ts                      getMessages(locale), otherLocale, localeHref
    cta.ts                       loginHref() / subscriptionHref() — single source of truth for CTAs
  styles/
    globals.css                  tokens (--ink, --peach, etc) + .container/.btn/.eyebrow + responsive collapses
messages/
  th.json / en.json              all landing copy under `landing.*`
prototype/                       reference HTML/JSX bundle from Claude Design (do not import from src)
astro.config.mjs                 i18n: locales ['th','en'], defaultLocale 'th', prefixDefaultLocale: false
```

Routing: with `prefixDefaultLocale: false`, **TH lives at `/`** (not `/th`), **EN lives at `/en/`**. The language switcher links to `/` or `/en/` to flip.

## Commands

```bash
npm install               # one-time
npm run dev               # dev server on http://localhost:4321
npm run build             # static build → dist/
npm run preview           # serve the built dist/
npm run preview -- --port 3088   # if 4321 is taken
npm run typecheck         # astro check (TS + Astro types)
```

Note: Astro ignores the `PORT` env var. Use `--port` on the CLI.

Required env vars (see `.env.example`) — all prefixed `PUBLIC_` so Astro exposes them to the build:
- `PUBLIC_APP_URL` — defaults to `https://my.dailymood.me`. Used by `src/lib/cta.ts`.
- `PUBLIC_SITE_URL` — defaults to `https://dailymood.me`. Used for canonical + OG URLs.
- `PUBLIC_GA_ID` — Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). When set, the layout injects a consent-gated GA loader that fires **only after the user clicks "Accept all"** on the cookie banner. Leave empty to disable GA entirely.

## Cookie consent flow

PDPA requires opt-in consent for non-essential cookies. Implementation:

- `src/components/CookieConsent.astro` — bottom-bar banner shown on first visit when `localStorage.dm-consent` is unset. Two buttons: `Accept all` (stores `'all'`) / `Only necessary` (stores `'necessary'`). On click, dispatches a `dm:consent` CustomEvent.
- `src/layouts/Layout.astro` — when `PUBLIC_GA_ID` is set, emits a tiny inline loader. On page load, the loader checks `localStorage.dm-consent === 'all'` and either loads `gtag.js` immediately or waits for the `dm:consent` event with `detail.choice === 'all'`.
- **Strict mode**: no `gtag.js` request, no GA cookies, no Google network calls happen until consent is explicit. Chosen over Google Consent Mode v2 for PDPA-clean defaults.
- Users withdraw consent by clearing browser localStorage + cookies (documented on `/cookies`).

Do not add new client-side trackers without (a) adding a category to `/cookies`, (b) gating them through the same `dm:consent` event, and (c) running the forbidden-string grep to make sure no jargon leaks into UI copy.

## Acceptance grep (do before declaring landing work done)

```bash
grep -rin "premium" src/ messages/   # expect 0 matches
grep -rin "gemini"  src/ messages/   # expect 0 matches
```

These two words are forbidden by the PRD. Run them before any landing PR.

## Locale switcher

The TH/EN pill in `LandingNav` and the bottom-of-footer toggle both do `<a href="/{other-locale}">`. The switch happens at the URL boundary — no client state, no localStorage. Keep it that way.

## Adding a new section

1. Read the PRD's IA table to make sure the section is on it (and where).
2. Add a new `.astro` component under `src/components/`.
3. Add the section's copy to **both** `messages/th.json` and `messages/en.json` under `landing.*`.
4. Mount it in `src/components/LandingPage.astro` in the correct position.
5. If the section needs a new responsive collapse, add a rule in `src/styles/globals.css` under the existing `@media (max-width: 980px)` and `(max-width: 640px)` blocks (use a `l-*` class on the grid container).
6. Run the acceptance grep before committing.
