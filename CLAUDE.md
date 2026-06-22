# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**dailymood.me landing page** — the public marketing / SEO surface for the DailyMood.me mood-tracking product. This repo is *not* the app; it sells the app and links users into it.

The landing is **app-download focused**: DailyMood ships as native **iOS + Android** apps, so the page's primary job is driving App Store / Google Play installs (store badges in the hero, the `#download` CTA, and the footer). The **web app** (`my.dailymood.me`) is a secondary option, surfaced as a footer callout. The whole page uses the **"Manila Desk"** paper aesthetic (folders, tabs, paperclips, washi tape, mood stickers) with real app screenshots in the hero + five phone "spotlight" sections.

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

**Primary CTAs are App Store / Google Play store badges** (`src/components/paper/StoreBadges.astro`), in the hero, the `#download` CTA banner, and the footer. The store URLs come from `src/lib/cta.ts` — `appStoreHref()` / `playStoreHref()`, backed by `PUBLIC_IOS_URL` / `PUBLIC_ANDROID_URL`. **Both apps are live, so each URL is hardcoded as the built-in default** in `cta.ts` — leaving the env vars empty still links to the real listings; set them only to override per-environment. (If a var is explicitly blanked, that badge falls back to the in-page `#download` anchor.) Pricing's Free/Pro buttons also scroll to `#download` (Pro's 14-day trial + IAP start in-app). The **web app** is a secondary footer link via `webAppHref()` (→ `PUBLIC_APP_URL`, default `https://my.dailymood.me`). The legacy `loginHref()` / `subscriptionHref()` helpers remain in `cta.ts` documenting the cross-domain surface but are no longer used by the landing sections. Store-badge clicks fire a GA4 `download_click` event (`platform` + `location`) via a delegated inline script in `LandingPage.astro`. That same script also fires: a Google Ads `conversion` on iOS clicks (when `PUBLIC_GADS_ID` + `PUBLIC_GADS_DOWNLOAD_LABEL` are set); and a `section_view` event (`section`) once per `section[id]` as it scrolls into view (a scroll-depth funnel). All are no-ops when GA is disabled.

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
- ~~Social icons in footer~~ — **re-added intentionally** (Facebook + TikTok, commit `cbac87c`); now an accepted exception. Read from `footer.social` in messages.
- Company / About / Blog columns in footer

## Project structure

```
src/
  components/                  All .astro components (server-rendered at build time)
    LandingPage.astro            composes the 15 sections + scroll-reveal & analytics scripts (download_click, conversion, section_view)
    LandingNav.astro             anchor links + Download button; inline <script> for sticky scroll state
    LandingHero.astro            store badges + trust row + hero phone (app-01-home)
    LandingByNumbers.astro       4 stacked stat sheets (10 moods · 2 platforms · 365 · 2 langs)
    LandingCapture.astro         #capture spotlight (app-02-ai-journal)
    LandingAI.astro              #ai dark-plum "AI reflects" folder + phone (app-03-ai-reflect)
    LandingCalendar.astro        #calendar spotlight (app-04-calendar)
    LandingStats.astro           #stats spotlight, tinted band (app-05-stats)
    LandingYear.astro            #year spotlight (app-06-year)
    LandingFeaturesGrid.astro    9 feature cards, each with a custom inline-SVG icon
    LandingArticles.astro        client-fetched latest articles from the app API
    LandingTestimonials.astro
    LandingPricing.astro         Free/Pro folders; both CTAs scroll to #download
    LandingFAQ.astro             uses native <details>; inline <script> enforces one-open-at-a-time
    LandingCTABanner.astro       #download — gradient folder + store badges
    LandingFooter.astro          web-app callout + store badges + social + legal
    paper/                       Manila Desk primitives
      Folder.astro / Sticker.astro / Paperclip.astro / Arrow.astro
      StoreBadges.astro            App Store + Google Play badges (data-store/-loc for GA)
      Spotlight.astro              generic text↔phone section (powers Capture/Calendar/Stats/Year)
      PhoneShot.astro              astro:assets <Image> wrapper (WebP, lazy; hero is eager)
    Logo.astro / MoodFace.astro / FeatIcon.astro / CheckCircle.astro
  assets/app/                  the 6 real phone screenshots (optimized to WebP by astro:assets at build)
  layouts/
    Layout.astro                 <html>, <head> (meta, OG, canonical, hreflang, JSON-LD), <body>
  pages/
    index.astro                  TH landing at /
    en/index.astro               EN landing at /en/
  lib/
    i18n.ts                      getMessages(locale), otherLocale, localeHref
    cta.ts                       appStoreHref()/playStoreHref()/webAppHref() (+ legacy login helpers)
  styles/
    globals.css                  tokens (--ink, --peach, etc) + .container/.btn/.eyebrow + responsive collapses
messages/
  th.json / en.json              all landing copy under `landing.*`
prototype/                       reference HTML/JSX bundle from Claude Design (do not import from src)
examples/landing-paper/          the app-landing design handoff (HTML/JSX/CSS + screenshots; reference only)
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
- `PUBLIC_APP_URL` — defaults to `https://my.dailymood.me`. The web-app link (`webAppHref()`) + legacy CTAs in `src/lib/cta.ts`.
- `PUBLIC_IOS_URL` / `PUBLIC_ANDROID_URL` — App Store / Google Play listing URLs for the download badges (`appStoreHref()` / `playStoreHref()`). Both apps are live and their real listing URLs are the built-in defaults, so leaving these empty still links to the stores. Set them only to override (e.g. a staging listing). Explicitly blanking one makes that badge fall back to the in-page `#download` anchor.
- `PUBLIC_SITE_URL` — defaults to `https://dailymood.me`. Used for canonical + OG URLs.
- `PUBLIC_GA_ID` — Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). When set, the layout loads `gtag.js` on every page load (PDPA informed-notice model) with `anonymize_ip: true`. Leave empty to disable GA entirely.
- `PUBLIC_GADS_ID` — Google Ads conversion / remarketing tag ID (`AW-XXXXXXXXX`). When set, configured alongside GA via the same `gtag.js` bootstrap. Disclosed in `/cookies`. Leave empty to disable Google Ads.
- `PUBLIC_GADS_DOWNLOAD_LABEL` — Google Ads conversion *label* (the part after the slash in `AW-XXXXXXXXX/AbC-D_efGh`). When set together with `PUBLIC_GADS_ID`, an App Store (iOS) badge click fires a Google Ads `conversion`. Leave either empty and no conversion is sent (the GA4 `download_click` still fires).
- `PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key. **Currently unused** — the interactive "try the AI" hero widget was removed in the app-download redesign (the hero now shows store badges). The var is kept for if/when the widget returns; safe to leave empty.

## Deployment (Railway)

This repo deploys to Railway as a Docker container — `node:20-alpine` builds the static site, `caddy:2-alpine` serves `dist/`.

### Files involved

- `Dockerfile` — multi-stage build (Astro build → Caddy)
- `Caddyfile` — listens on `$PORT`, sets cache headers + standard security headers, has `/healthz` for Railway's healthcheck
- `.dockerignore` — keeps `node_modules`, `dist`, `.git`, `prototype/`, etc. out of the build context
- `railway.toml` — pins `builder = "DOCKERFILE"`, healthcheck path, restart policy

### Project link

Project ID: `20e55920-ab03-41d5-a854-d67cc3f343f1` ("Dailymood Landing"), environment `production`.

```bash
# One-time, in this repo:
railway link -p 20e55920-ab03-41d5-a854-d67cc3f343f1
railway status   # confirm
```

### Env vars to set in the Railway dashboard

All are `PUBLIC_*` so Astro inlines them into the static output. They must be set on the **service** in Railway (Settings → Variables), not just locally:

| Var | Value | What it does |
|---|---|---|
| `PUBLIC_SITE_URL` | `https://dailymood.me` | Canonical/OG/hreflang URLs |
| `PUBLIC_APP_URL` | `https://my.dailymood.me` | Web-app footer link + legacy CTAs via `src/lib/cta.ts` |
| `PUBLIC_IOS_URL` | `https://apps.apple.com/…/idXXXXXXXXX` | App Store badge target. Optional — real URL is the built-in default in `cta.ts` |
| `PUBLIC_ANDROID_URL` | `https://play.google.com/store/apps/details?id=…` | Google Play badge target. Optional — real URL is the built-in default in `cta.ts` |
| `PUBLIC_GA_ID` | `G-XXXXXXXXXX` (production GA4) | Loaded on every page load with `anonymize_ip`; also receives the `download_click` event |
| `PUBLIC_GADS_ID` | `AW-XXXXXXXXX` (Google Ads conversion tag) | Loaded alongside GA via same gtag.js |
| `PUBLIC_GADS_DOWNLOAD_LABEL` | `AbC-D_efGh1234` (conversion label) | With `PUBLIC_GADS_ID`, fires a Google Ads `conversion` on an iOS badge click. Empty → no conversion |
| `PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAA…` (Cloudflare Turnstile site key) | Currently unused — the AI hero widget was removed. Safe to leave empty |

If you change any of these, **the container must be rebuilt** — Astro bakes them in at build time.

### Deploying

**This project deploys MANUALLY via `railway up`. GitHub auto-deploy is NOT connected — pushing to `main` does NOT deploy.** Commit + push `main` for history, then run `railway up` separately to actually ship:

```bash
railway up --detach
railway logs -d   # tail
```

(Auto-deploy — connecting the GitHub repo in the Railway dashboard so every `main` push builds — could be enabled later, but is intentionally not on today. Until then, a `git push` alone changes nothing in production.)

### Custom domain

In the Railway dashboard → Settings → Networking → Custom Domains, add `dailymood.me`. Railway issues a Let's Encrypt cert automatically. Point the DNS `CNAME` at the Railway-provided target. **Do not also point `my.dailymood.me` here** — that's the separate app service.

### Rolling back

Railway keeps every deployment. To roll back: dashboard → Deployments → click an older one → Rollback. Or via CLI: `railway redeploy --from <deployment-id>`.

### Local smoke test of the production container

```bash
docker build -t dailymood-landing .
docker run --rm -p 8080:8080 \
  -e PORT=8080 \
  dailymood-landing
# Open http://localhost:8080
```

## Cookie consent flow

Thailand PDPA's **informed-notice** model. The banner notifies first-time visitors; analytics + ad-conversion tags load on every page load with privacy-conservative defaults (`anonymize_ip` on GA). Implementation:

- `src/components/CookieConsent.astro` — bottom-bar banner shown on first visit when `localStorage.dm-consent-seen` is unset. Single dismiss button; clicking it records that the notice was seen.
- `src/layouts/Layout.astro` — when `PUBLIC_GA_ID` or `PUBLIC_GADS_ID` is set, emits a single inline `gtag.js` bootstrap that configures both products. GA uses `anonymize_ip: true`.
- Users withdraw consent by clearing browser localStorage + cookies, or by using Google's per-product opt-out tools (documented on `/cookies`).

Do not add new client-side trackers without (a) adding a section to both `src/pages/cookies.astro` and `src/pages/en/cookies.astro` disclosing the new cookies and the opt-out path, and (b) running the forbidden-string grep to make sure no jargon leaks into UI copy.

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
