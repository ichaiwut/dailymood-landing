# PRD — Landing Page Redesign (DailyMood)

**Owner:** Design → Claude Code
**Source prototype:** `Landing.html` + `landing/*.jsx` (Babel-driven HTML mock)
**Target codebase:** Next.js App Router · TypeScript · Tailwind · next-intl (existing)
**Route:** `/` (locale-aware: `/th`, `/en`) — marketing page; **no auth check** (auth lives on the separate `my.dailymood.me` app domain, cookies are not shared — decision 2026-05-16)
**Languages:** TH (default) + EN
**Status:** Ready to implement

---

## Goals

1. Replace placeholder landing with a warm, clean, *desktop-first* marketing page (Vercel/Linear-style layout, mood-journal color palette).
2. Surface every shipped feature from `features.md` — no fake claims, no medical positioning.
3. Email-capture CTA pattern (no inline auth — just a styled email input that points to `/login?email=…`).
4. SEO-ready: structured data, OG image, canonical, bilingual locale alternates.
5. Server Components first — only the AI-toggle / FAQ accordion / lang switch need client interactivity.

## Out of scope

- Actual email-capture API wiring (the form should POST to `/api/landing/lead` — endpoint can be a stub returning 200).
- Auth flow changes.
- Pricing / Stripe wiring (CTAs link to `/login` then `/profile/subscription`).
- Blog / About / Contact pages — leave footer links pointing at `#` or `mailto:`.

---

## Information architecture (top → bottom)

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | **Sticky Nav** | `<LandingNav />` (client) | Logo · 4 anchor links · TH/EN toggle · "Sign in" · "Get started" CTA. Goes opaque on scroll. |
| 2 | **Hero** | `<LandingHero />` | Eyebrow pill · 78px display headline (gradient swash on one word) · paragraph · email pill input → CTA · 3 trust ticks · right-side browser mockup of the Today screen + floating mood/streak chips. |
| 3 | **AI Showcase** | `<LandingAI />` | Dark `--night` band. 3-card grid (1.2fr 1fr 1fr): NLP demo (text input → detected mood + tags), Vision demo (photo → suggested tags, Pro), Weekly Insights demo (sparkline + recap). |
| 4 | **How It Works** | `<LandingHowItWorks />` | 3 numbered tiles connected by a dashed SVG line. Tap a mood → Type/talk/shoot → See the big picture. |
| 5 | **Year in Pixels** | `<LandingYearInPixels />` | 2-col: copy + legend (left), 12×31 mood pixel grid (right). Real-shape pseudo-random demo data — feels like a real year, not empty. |
| 6 | **Features Grid** | `<LandingFeaturesGrid />` | 9 cards in a 3×3 grid, each with a custom inline-SVG icon (no emoji). |
| 7 | **Testimonials** | `<LandingTestimonials />` | 4-card grid. Quotes only — no ratings, no stars, no medical/clinical personas. Cards slightly offset vertically (i%2 ? 20px : 0) for rhythm. |
| 8 | **Pricing** | `<LandingPricing />` | 2 plans: Free + Pro. Free = white card; Pro = dark gradient card with peach "POPULAR" badge. |
| 9 | **FAQ** | `<LandingFAQ />` (client) | Sticky title on the left (sticky top: 100px), accordion on the right. 6 questions. |
| 10 | **CTA Banner** | `<LandingCTABanner />` | Full-width rounded peach→purple gradient panel with floating emoji decorations and a single white pill button. |
| 11 | **Footer** | `<LandingFooter />` | 3-col grid: brand+tagline / Product / Legal. **No social icons. No Company column.** Locale toggle pill on the bottom row. |

**Removed deliberately:** TrustStrip, StatsBand, aggregateRating schema, "used by X" social proof, per-card star ratings, social icons.

---

## Visual system

Reuse the app's existing tokens (`app/globals.css`). The landing only **adds** these extras to `landing.module.css`:

```css
--page: #FBF6EE;       /* warm cream canvas */
--page-2: #F7EFE2;     /* warm tint for alternating sections */
--ink: #1A1320;
--ink-2: #4A3F55;
--ink-3: #8C8497;
--rule: rgba(26,19,32,0.08);
--card: #FFFFFF;
--night: #1A1320;      /* AI showcase + footer bg */
--font-display: 'Urbanist', 'Noto Sans Thai', system-ui, sans-serif;
```

**Mood palette** is the same as the app: peach `#FCA45B`, mint `#85ECCB`, yellow `#FDCB56`, blue `#9ACDE2`, lavender `#D4BEE4`, purple `#A673F1`.

### Type

- All headings: **Urbanist** 800, `letter-spacing: -0.025em`, line-height 1.02.
- Body: Urbanist 400–600.
- Thai text gets `.thai` class → `font-family: 'Noto Sans Thai'` fallback.
- Hero h1: `clamp(40px, 6vw, 78px)`. Section h2: `clamp(32px, 4.5vw, 52px)`.
- Eyebrow pill: 11px / 800 / uppercase / .04em / rounded 100px / `rgba(166,115,241,.10)` bg.

### Buttons

- `.btn` base: 52px tall, rounded 100px, weight 700, 16px.
- `.btn-peach` — primary CTA. `#FCA45B`, white text, peach drop shadow.
- `.btn-ink` — secondary. `#1A1320`, white text.
- `.btn-ghost` — outline. transparent, `1.5px solid var(--rule)`.

### Cards

- `border-radius: 24px`, `background: #FFFFFF`, `border: 1px solid var(--rule)`. No heavy shadows — depth comes from the section background contrast (`--page` ↔ `--page-2`).

### Animations

- `float-y` (chips bobbing 12px, 6s infinite).
- `fade-up` (.8s entry on hero h1 and section headings via IntersectionObserver — not autoplay-on-load).
- FAQ accordion: `max-height` transition (no library).

---

## Components — implementation notes

### 1. `<LandingNav />` (client)

```tsx
'use client';
- 72px sticky top, full-bleed.
- background: 'transparent' when scrollY ≤ 12, 'rgba(251,246,238,.85)' + backdrop-blur + 1px hairline below when > 12.
- Left: <Logo/> + "DailyMood" wordmark.
- Center: 4 anchor links (Features / AI / Pricing / FAQ). Hidden < 640px.
- Right: TH/EN toggle pill · "Sign in" text link (hidden < 640px) · "Get started" peach CTA (links to /login).
- Logo: 32px rounded-rect with the smiley face, gradient fill (peach → pink → purple).
```

### 2. `<LandingHero />` (server)

```tsx
- Two-column grid (1fr 1.05fr), 64px gap, ≥980px desktop. Stacks on mobile.
- LEFT:
  - Eyebrow: "AI-POWERED MOOD JOURNAL"
  - H1 with gradient italic swash on the third line ("ใน 10 วินาที" / "in 10 seconds.")
  - Sub paragraph (max 540px)
  - Email pill: rounded 100px, white bg, 1px border, peach button on the right
  - Sub-copy: "ฟรี ตลอดไป · ไม่ต้องใส่บัตรเครดิต" / "Free forever · No credit card"
  - 3 trust ticks (Encrypted · No ads · TH+EN) — each is a mint check + label.
- RIGHT:
  - <BrowserMockup /> — fake browser chrome (3 traffic lights + addressbar "dailymood.me/today") wrapping a hand-built compressed version of the Today screen (mood picker hero, AI summary card with sparkline, mini calendar).
  - 4 absolutely-positioned floating chips around the mockup, each with class .float-y and a unique animation-delay. Chip copy: tag #work, "✨ Streak +7", "😄 Great", weekly recap snippet.
- Decorative <div className="blob"> peach + lavender blurs behind the right column (filter: blur(60px)).
```

### 3. `<LandingAI />` (server)

```tsx
- Section bg = --night. Two blur blobs (purple + peach) at low opacity for aurora.
- Title block max 760px with eyebrow "GEMINI AI" → **change to "AI · POWERS EVERYTHING"** (no vendor name).
- H2: "AI ที่ {{ peach-purple gradient italic: เข้าใจคุณ }} จริง ๆ" / "AI that {{ actually understands }} you."
- 3-card grid: 1.2fr 1fr 1fr, 18px gap.
  - Card 1: "AI · TEXT" — NLP demo. Inline mock entry text → detected mood (calm) + 3 hash-tag chips.
  - Card 2: "AI · VISION" — Pro tag. Mock photo (CSS gradient with grain repeating-linear), AI-suggested tags below.
  - Card 3: "WEEKLY INSIGHTS" — Mock recap copy with sparkline-ish bar chart, last 3 bars peach-coloured.
- Each card body min-height 180, padded 28px, 22px radius, 1px white-alpha border.
```

### 4. `<LandingHowItWorks />` (server)

```tsx
- 3-column grid. Above each tile is a 100px white rounded square showing "01", "02", "03" in display font, each rotated ±4° for warmth.
- SVG dashed line behind the row connects the three. Hide on mobile (single column).
- Title + 1-paragraph description below each.
```

### 5. `<LandingYearInPixels />` (server)

```tsx
- bg: --page-2.
- Two-col: 1fr 1.4fr.
- LEFT: eyebrow + title + paragraph + 6-color legend (peach/yellow/mint/lavender/blue/purple).
- RIGHT: white card, "2026" display number + "298 days logged" microcopy, then 12 rows of 31 cells each (auto-fit pseudo-random colors). Cells: aspect-ratio:1, radius:3, gap:3.
- Demo data: deterministic seed (e.g. `(m*31 + d*7) % 100` mapped to mood buckets). Empty days = #F0EAE0.
```

### 6. `<LandingFeaturesGrid />` (server)

```tsx
- 3×3 grid (9 cards).
- Each card: 28px padding, 20px radius, white bg, 1px hairline.
- Top: 48×48 rounded-14 tile in a soft tint of the card's accent color, with the inline-SVG icon stroked in the accent's solid color.
- Title (20px/800) + 1-line desc (15px/500).
```

**The 9 features (in this order, color tag in parens):**

1. **Quick Icons** (peach) — 7 default moods + custom moods (Pro) · multi-entry per day.
2. **Smart Log + Voice** (purple) — short notes or speak it; Web Speech TH+EN.
3. **Smart Calendar** (mint) — monthly grid + swipe-up day sheet.
4. **Calendar AI Patterns** (lavender) — best day / pattern / anomaly rings on the calendar (Pro).
5. **Ask AI** (yellow) — natural-language search with date chips (Pro).
6. **Weekly AI Insights** (peach) — summary + patterns + suggestion + sparkline + share.
7. **Mood Stats** (blue) — trend line, mood-mix donut, activity impact.
8. **Achievements + Streak** (purple) — 12 auto-earned badges + streak ring.
9. **Mood Icon Packs** (mint) — restyle the 7 moods · custom avatar + bio in Profile.

Icon palette per feature is in the prototype (`landing/middle.jsx` → `FeatIcon`). Either reuse those SVGs directly or commission proper Lucide / custom equivalents — but **no emoji** in this grid.

### 7. `<LandingTestimonials />` (server)

```tsx
- bg: --page-2.
- 4-card grid (responsive: 2 cols ≤980, 1 col ≤640).
- Each card: white, 1px hairline, 20px radius, 26px padding.
- Layout per card: blockquote (15px/500) → 1px divider → avatar disc (38px gradient) + name + role.
- Cards 1,3 sit flush. Cards 2,4 translateY(20px) for rhythm.
- NO star icons. NO rating widget.
- 4 quotes (copy below).
```

### 8. `<LandingPricing />` (client — only because of optional period toggle, otherwise server)

```tsx
- 2 columns, max-width 920, 20px gap.
- Free card: white, 1.5px hairline, 36px padding, 24px radius.
- Pro card: dark gradient (#2A1F33 → #1A1320), white text, peach "POPULAR" badge floating at top-right (-12px, padding 6/14, rotated 0°).
- Each card: tier label (eyebrow), giant price (56px display) + period, feature ul with mint check circles, full-width pill CTA at the bottom.
- Free CTA = ghost outline. Pro CTA = peach.
```

### 9. `<LandingFAQ />` (client)

```tsx
'use client';
- 2-col: 1fr 1.6fr, 64px gap. Title side sticky top:100.
- Right: list of 6 expandable items, each is a button toggling a max-height transition on the answer block.
- Closed: thin 1.5px outline circle "+" on the right; Open: solid ink circle "–".
- Only one open at a time (state: open = index | -1).
```

### 10. `<LandingCTABanner />` (server)

```tsx
- Full-bleed banner inside .container.
- Radius 32, padding 72×48.
- background: linear-gradient(135deg, var(--peach) 0%, #F49EAB 45%, var(--purple) 100%).
- 4 absolutely-positioned emoji decorations (✨ 🌿 ☕ 📓) rotated and offset.
- White display H2 + 19px white-alpha paragraph + single white pill CTA "Get DailyMood free →".
```

### 11. `<LandingFooter />` (server, with client lang switch)

```tsx
- Dark bg (--night). 72px top, 32px bottom.
- 3-col grid (1.4fr 1fr 1fr): brand+tagline · Product · Legal.
- NO social icons. NO Company column.
- Bottom row: copyright (left) + locale toggle pill + "dailymood.me" wordmark (right).
- Product links: Features (#features), AI (#ai), Pricing (#pricing), What's new (#).
- Legal links: Privacy (/privacy), Terms (/terms), Cookies (#).
```

---

## Copy (truth source — TH + EN)

> **Do not translate. Use these strings verbatim. They live in `messages/th.json` and `messages/en.json` under `landing.*`.**

### Nav

| Key | TH | EN |
|---|---|---|
| nav.features | ฟีเจอร์ | Features |
| nav.ai | AI | AI |
| nav.pricing | ราคา | Pricing |
| nav.faq | คำถาม | FAQ |
| nav.signin | เข้าสู่ระบบ | Sign in |
| nav.cta | เริ่มฟรี | Get started |

### Hero

| Key | TH | EN |
|---|---|---|
| hero.eyebrow | AI-POWERED MOOD JOURNAL | AI-POWERED MOOD JOURNAL |
| hero.h1a | บันทึกอารมณ์ของคุณ | Track how you feel, |
| hero.h1b | ทุกวัน | every day, |
| hero.h1c (gradient) | ใน 10 วินาที | in 10 seconds. |
| hero.sub | DailyMood ใช้ AI ช่วยเข้าใจอารมณ์คุณจากข้อความ เสียง และรูปภาพ ค้นพบแพทเทิร์น แล้วเห็นภาพรวมทั้งปีในที่เดียว — ฟรี ไม่ต้องใส่บัตรเครดิต | DailyMood uses AI to understand your mood from text, voice, and photos — surface patterns and see your whole year on one screen. Free, no credit card. |
| hero.emailPh | อีเมลของคุณ | Your email |
| hero.ctaMain | เริ่มใช้ฟรี | Get started free |
| hero.ctaSub | ฟรี ตลอดไป · ไม่ต้องใส่บัตรเครดิต | Free forever · No credit card required |
| hero.trust1 | เข้ารหัสข้อมูล | Encrypted |
| hero.trust2 | ไม่มีโฆษณา | No ads |
| hero.trust3 | ภาษาไทย + อังกฤษ | TH + EN |

### AI section

| Key | TH | EN |
|---|---|---|
| ai.eyebrow | AI · ขับเคลื่อนทุกอย่าง | AI · POWERS EVERYTHING |
| ai.h2a | AI ที่ | AI that |
| ai.h2b (gradient) | เข้าใจคุณ | actually understands |
| ai.h2c | จริง ๆ | you. |
| ai.sub | ไม่ใช่แค่กรอกตัวเลข แต่ DailyMood ใช้ AI สรุปอารมณ์ ดึงประเด็นสำคัญ ค้นพบแพทเทิร์น แล้วถามได้เป็นภาษาธรรมชาติ | Not just numbers. DailyMood reads your entries, pulls key phrases, finds patterns, and lets you ask in plain language. |
| ai.f1.tag | AI · TEXT | AI · TEXT |
| ai.f1.title | พิมพ์อย่างไรก็เข้าใจ | Type however you want |
| ai.f1.desc | เขียนเป็นภาษามนุษย์ AI จะดึงอารมณ์ แท็ก และสรุปประโยคสำคัญให้ทันที — ปรับ/ยืนยันก่อนบันทึก | Write naturally. AI extracts mood, tags, and a one-sentence summary — review and confirm before saving. |
| ai.f2.tag | AI · VISION | AI · VISION |
| ai.f2.title | ถ่ายรูปสิ่งที่เห็น | Snap what you see |
| ai.f2.desc | อัปโหลดรูปวันนี้ AI วิเคราะห์บริบทและแนะนำแท็กที่เกี่ยวกับช่วงเวลานั้น (Pro) | Upload a photo. AI reads context and suggests tags about the moment (Pro). |
| ai.f3.tag | WEEKLY INSIGHTS | WEEKLY INSIGHTS |
| ai.f3.title | สรุปสัปดาห์ที่อ่านแล้วเข้าใจตัวเอง | A weekly recap that actually lands |
| ai.f3.desc | ทุกสัปดาห์: สรุป + แพทเทิร์น + คำแนะนำเฉพาะคุณ พร้อม sparkline และโหวต thumbs up/down | Summary, patterns, and one tailored suggestion each week — with sparklines and thumbs up/down feedback. |

### How it works

| Key | TH | EN |
|---|---|---|
| how.eyebrow | HOW IT WORKS | HOW IT WORKS |
| how.title | เริ่มต้นใน 3 ขั้นตอน | Three steps to start |
| how.s1t | แตะอารมณ์ | Tap a mood |
| how.s1d | เลือก 1 ใน 7 อารมณ์ default หรือสร้างของคุณเอง (Pro) | Pick one of 7 default moods or design your own (Pro) |
| how.s2t | พิมพ์ พูด หรือถ่าย | Type, talk, or shoot |
| how.s2d | เพิ่ม note สั้น ๆ ใช้เสียง หรืออัปโหลดรูป AI สรุปและแท็กให้ | Add a short note, use voice, or attach a photo. AI summarises and tags. |
| how.s3t | ดูภาพรวม | See the big picture |
| how.s3d | แคเลนเดอร์ year-in-pixels และ insights รายสัปดาห์ พร้อมแพทเทิร์น | Year-in-pixels calendar and weekly insights — patterns included. |

### Year in Pixels

| Key | TH | EN |
|---|---|---|
| year.eyebrow | YEAR IN PIXELS | YEAR IN PIXELS |
| year.title | ทั้งปีของคุณ ในจอเดียว | Your whole year, one screen |
| year.sub | แต่ละจุดคือหนึ่งวัน สีคืออารมณ์เด่น มองเห็นช่วงดี ช่วงแย่ และจังหวะของชีวิตทันที | One dot per day, coloured by your dominant mood. Spot the good stretches, the rough patches, and your rhythm — instantly. |

### Features grid (TH / EN pairs, in order)

```ts
const list = [
  { c: 'peach',
    th: { t: 'Quick Icons', d: '7 อารมณ์เริ่มต้น + custom moods สำหรับ Pro · บันทึกได้หลายครั้งต่อวัน' },
    en: { t: 'Quick Icons', d: '7 default moods + custom moods (Pro) · log multiple times per day' } },
  { c: 'purple',
    th: { t: 'Smart Log + Voice', d: 'พิมพ์ note สั้น ๆ หรือพูดเลย — Web Speech รองรับทั้งไทยและอังกฤษ' },
    en: { t: 'Smart Log + Voice', d: 'Short notes or speak it. Web Speech supports TH + EN.' } },
  { c: 'mint',
    th: { t: 'Smart Calendar', d: 'มุมมองรายเดือนพร้อม day sheet แตะวันไหนก็เลื่อนขึ้นดูบันทึกทันที' },
    en: { t: 'Smart Calendar', d: 'Monthly grid with a swipe-up day sheet — tap any day for entries.' } },
  { c: 'lav',
    th: { t: 'Calendar AI Patterns', d: '★ best day · ◌ pattern · ◌ anomaly — AI ตรวจจับและไฮไลต์บนปฏิทินให้ (Pro)' },
    en: { t: 'Calendar AI Patterns', d: '★ best day · ◌ pattern · ◌ anomaly — AI surfaces patterns on the grid (Pro)' } },
  { c: 'yellow',
    th: { t: 'Ask AI', d: 'ถามเป็นภาษาธรรมชาติ "ฉันรู้สึกแย่ตอนไหนบ้างเดือนนี้?" — AI ตอบพร้อมวันที่ (Pro)' },
    en: { t: 'Ask AI', d: 'Ask anything in plain English: "when did I feel anxious this month?" — answers with date chips (Pro)' } },
  { c: 'peach',
    th: { t: 'AI Insights รายสัปดาห์', d: 'สรุป + patterns + คำแนะนำเฉพาะคุณ + sparkline · share ออกได้ทันที' },
    en: { t: 'Weekly AI Insights', d: 'Summary + patterns + one tailored suggestion + sparkline · share to clipboard or socials.' } },
  { c: 'blue',
    th: { t: 'Mood Stats', d: 'กราฟแนวโน้ม · mood mix donut · activity impact จาก tag-mood correlation จริง' },
    en: { t: 'Mood Stats', d: 'Trend line, mood-mix donut, real activity impact from tag-mood correlation.' } },
  { c: 'purple',
    th: { t: 'Achievements + Streak', d: '12 badges อัตโนมัติ · streak ring · highlight ของแต่ละสัปดาห์' },
    en: { t: 'Achievements + Streak', d: '12 auto-earned badges, streak ring, weekly highlights — never streak shame.' } },
  { c: 'mint',
    th: { t: 'Mood Icon Packs', d: 'เปลี่ยนหน้าตา 7 อารมณ์ตามใจ · เพิ่ม avatar + bio ใน Profile' },
    en: { t: 'Mood Icon Packs', d: 'Restyle your 7 moods. Profile gets custom avatar + bio too.' } },
];
```

### Testimonials (4 only, no ratings, no medical/clinical roles)

```ts
[
  { th: { q: 'เป็นแอปแรกที่ทำให้รู้สึกว่าจดอารมณ์แล้วเข้าใจตัวเองจริง ๆ AI insights มันจี้ใจดำมาก',
          n: 'ภัทรา ส.', r: 'นักศึกษาปริญญาโท · กรุงเทพ' },
    en: { q: 'First mood app that made me actually understand myself. The AI insights cut deep.',
          n: 'Patra S.', r: 'Grad student · Bangkok' } },
  { th: { q: 'ใช้ทุกเช้า ไม่ถึง 30 วิ ดู year-in-pixels แล้วเห็นเลยว่าช่วง deadline งานคืออะไร',
          n: 'Daniel C.', r: 'Product Designer · Bangkok' },
    en: { q: 'Use it every morning, under 30 seconds. Year-in-pixels showed me exactly which deadlines wreck me.',
          n: 'Daniel C.', r: 'Product Designer · Bangkok' } },
  { th: { q: 'เริ่มเห็นแพทเทิร์นของตัวเอง วันไหนทำงานได้ดี วันไหนต้องพัก ปรับชีวิตตามนี้เลย',
          n: 'ปริญญา ม.', r: 'ฟรีแลนซ์ · เชียงราย' },
    en: { q: 'Started seeing my own patterns — which days I work well, when I need to rest. I plan my week around it now.',
          n: 'Prinya M.', r: 'Freelancer · Chiang Rai' } },
  { th: { q: 'ชอบที่ไม่มีโฆษณา ไม่มี streak shame ใช้เมื่อพร้อม',
          n: 'Mint K.', r: 'นักเขียน · เชียงใหม่' },
    en: { q: 'Love that there are no ads and no streak shame. I use it when I want to.',
          n: 'Mint K.', r: 'Writer · Chiang Mai' } },
]
```

### Pricing

```ts
free: {
  name: { th: 'Free', en: 'Free' },
  price: '฿0',
  per:   { th: 'ตลอดไป', en: 'forever' },
  cta:   { th: 'เริ่มฟรี', en: 'Get started' },
  feats_th: [
    'บันทึกไม่จำกัด + Quick icons + journal',
    'Voice input (TH + EN)',
    'Mood calendar + timeline + stats',
    'AI วิเคราะห์ข้อความ 5 ครั้ง/วัน',
    'Weekly insights (preview)',
    'Achievements + 12 badges',
  ],
  feats_en: [
    'Unlimited entries + quick icons + journal',
    'Voice input (TH + EN)',
    'Mood calendar + timeline + stats',
    'AI text analysis · 5/day',
    'Weekly insights (preview)',
    'Achievements + 12 badges',
  ],
},
pro: {
  name: 'Pro',
  price: '฿99',
  per: { th: '/ เดือน หรือ ฿949/ปี', en: '/mo or ฿949/yr' },
  badge: { th: 'ยอดนิยม', en: 'Popular' },
  cta:   { th: 'อัปเกรด Pro', en: 'Upgrade to Pro' },
  feats_th: [
    'ทุกอย่างใน Free',
    'AI วิเคราะห์ข้อความไม่จำกัด',
    'AI Vision สำหรับรูปภาพ',
    'Weekly insights แบบเต็ม + share',
    'Calendar AI patterns + Ask AI',
    'Custom moods + Pro icon packs',
    'Custom avatar + bio',
    'Stats รายปี + activity impact เต็ม',
  ],
  feats_en: [
    'Everything in Free',
    'Unlimited AI text analysis',
    'AI Vision for photos',
    'Full weekly insights + share',
    'Calendar AI patterns + Ask AI',
    'Custom moods + Pro icon packs',
    'Custom avatar + bio',
    'Yearly stats + full activity impact',
  ],
},
```

Pricing section header:
- title TH: `เริ่มฟรี อัปเกรดเมื่อพร้อม` / EN: `Start free. Upgrade when ready.`
- sub TH: `ไม่มี trial หลอก — Free ใช้ได้ตลอดไป Pro เปิดใช้ AI ไม่จำกัด` / EN: `No fake trial — Free is forever. Pro unlocks unlimited AI.`

### FAQ (6 items — no medical claims, no vendor name)

| TH question / answer | EN question / answer |
|---|---|
| **DailyMood เก็บข้อมูลปลอดภัยแค่ไหน?** — ข้อมูลเก็บใน Cloudflare D1 และ R2 เข้ารหัสระหว่างส่ง รูปภาพใช้ signed URL หมดอายุใน 1 ชั่วโมง เราไม่ขายหรือแบ่งปันข้อมูลของคุณ | **How secure is my data?** — Stored on Cloudflare D1 + R2 with TLS in transit; image URLs are signed and expire in 1 hour. We never sell or share your data. |
| **AI ใช้บันทึกของฉันไป train โมเดลไหม?** — ไม่ DailyMood เรียกใช้ AI แบบ stateless บันทึกของคุณไม่ถูกเก็บไว้หรือถูกใช้ฝึกโมเดลใด ๆ | **Do you train AI on my entries?** — No. DailyMood calls AI statelessly — your entries are never stored externally or used to train any model. |
| **ใช้บนมือถือได้ไหม?** — ได้ DailyMood เป็น web app เปิดได้ทันทีบนเบราว์เซอร์ทุกขนาดจอ Add to Home Screen ได้เหมือนแอปจริง | **Does it work on mobile?** — Yes — DailyMood is a web app that works on every browser size. Add to Home Screen for an app-like feel. |
| **ต่างจาก mood tracker ทั่วไปยังไง?** — ออกแบบให้ใช้เวลาน้อย (≤ 10 วินาที/วัน) แต่ได้ insights ที่ลึกขึ้นด้วย AI — สรุปอัตโนมัติ ตรวจ pattern บนปฏิทิน ถามเป็นภาษาธรรมชาติ และวิเคราะห์รูปภาพได้ | **How is it different from other mood trackers?** — Designed for under 10 seconds a day but produces deeper insights with AI — auto summaries, calendar pattern detection, Ask AI in natural language, and photo analysis. |
| **ยกเลิก Pro ได้ตอนไหน?** — ยกเลิกได้ตลอดผ่านหน้า Subscription ใน Profile หลังยกเลิกใช้ฟีเจอร์ Pro ได้จนสิ้นรอบบิล | **Can I cancel Pro any time?** — Yes — cancel from your Subscription page any time. You keep Pro features until the period ends. |
| **มีภาษาอะไรบ้าง?** — ภาษาไทยและอังกฤษทั้งใน UI และ AI สรุป สลับได้ทันทีในหน้า settings | **Which languages are supported?** — Thai and English for both UI and AI summaries. Switch in settings any time. |

### CTA Banner

| Key | TH | EN |
|---|---|---|
| cta.title | พร้อมรู้จักตัวเองดีขึ้นไหม? | Ready to know yourself better? |
| cta.sub | 10 วินาทีต่อวัน เริ่มได้เลย ไม่ต้องใส่บัตรเครดิต | 10 seconds a day. Start now — no credit card. |
| cta.btn | เริ่มใช้ DailyMood ฟรี | Get DailyMood free |

### Footer

| Key | TH | EN |
|---|---|---|
| footer.tag | บันทึกอารมณ์ ค้นพบตัวเอง | Track how you feel. Discover yourself. |
| footer.product | สินค้า | Product |
| footer.legal | กฎหมาย | Legal |
| footer.copy | © 2026 DailyMood · ทำที่กรุงเทพฯ ด้วย ☕ + 🌿 | © 2026 DailyMood · Made in Bangkok with ☕ + 🌿 |

Product links: `Features → #features`, `AI → #ai`, `Pricing → #pricing`, `What's new → #`.
Legal links: `Privacy → /privacy`, `Terms → /terms`, `Cookies → #`.

---

## SEO + Head tags

```html
<title>DailyMood — บันทึกอารมณ์ทุกวัน ด้วย AI · Free Mood Journal</title>
<meta name="description" content="DailyMood เป็น mood journal เว็บแอปที่ใช้ AI ช่วยเข้าใจอารมณ์คุณจากข้อความ เสียง และรูปภาพ ค้นพบแพทเทิร์น เห็นทั้งปีใน year-in-pixels เริ่มฟรี ไม่ต้องใส่บัตรเครดิต">
<link rel="canonical" href="https://dailymood.me/">
<meta property="og:type" content="website">
<meta property="og:title" content="DailyMood — บันทึกอารมณ์ทุกวัน ด้วย AI">
<meta property="og:image" content="https://dailymood.me/og.png">
<meta property="og:locale" content="th_TH">
<meta property="og:locale:alternate" content="en_US">
<meta name="theme-color" content="#FBF6EE">
```

JSON-LD (no `aggregateRating`):
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DailyMood",
  "operatingSystem": "Web",
  "applicationCategory": "LifestyleApplication",
  "url": "https://dailymood.me/",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "THB" },
  "inLanguage": ["th", "en"]
}
```

---

## File layout (suggested)

```
src/
  app/
    [locale]/
      (marketing)/
        page.tsx              # composes the 11 sections
        layout.tsx            # marketing-only layout (no TopBar/BottomNav)
    api/
      landing/
        lead/route.ts         # stub POST → 200 OK
  components/
    landing/
      LandingNav.tsx          'use client'
      LandingHero.tsx
      LandingBrowserMockup.tsx
      LandingAI.tsx
      LandingHowItWorks.tsx
      LandingYearInPixels.tsx
      LandingFeaturesGrid.tsx
      LandingTestimonials.tsx
      LandingPricing.tsx
      LandingFAQ.tsx          'use client'
      LandingCTABanner.tsx
      LandingFooter.tsx
      icons/
        FeatIcon.tsx          # 9 inline-SVG icons indexed by position
        Logo.tsx
        CheckCircle.tsx
      landing.module.css      # the tokens block above + animations
  messages/
    th.json                   # add `landing: { … }` namespace
    en.json
```

Each section is a self-contained Server Component except the three marked `'use client'`. No need for Framer Motion — the only animations are CSS keyframes (`float-y`, `fade-up`) and the FAQ accordion's `max-height` transition.

---

## Acceptance checks

- [ ] All 11 sections render in order on `/th` and `/en`.
- [ ] No "Premium" string anywhere on the page — only "Pro".
- [ ] No mention of "Gemini" or any specific AI vendor.
- [ ] No medical/clinical role in testimonials.
- [ ] No social icons / Company column in footer.
- [ ] No star ratings or aggregateRating schema.
- [ ] Lighthouse: ≥ 95 perf, ≥ 95 a11y on desktop.
- [ ] Layout holds at 1440 / 1280 / 980 / 720 / 390 breakpoints.
- [ ] TH/EN toggle persists across refresh (localStorage `dm-lang` or `cookie:NEXT_LOCALE`).
- [x] ~~Authenticated user hitting `/` redirects to `/today` server-side.~~ — **dropped 2026-05-16**: landing and app are separate domains with separate cookies; no shared session.

---

## Reference

- Working prototype: `Landing.html` + `landing/i18n.jsx` / `landing/top.jsx` / `landing/middle.jsx` / `landing/bottom.jsx` in this project.
- Treat the prototype as the **visual** source of truth; this PRD is the **copy + behaviour** source of truth.
- When the two disagree (e.g. the prototype still says "DailyMood" in the hero copy and you want to localise), trust this PRD.
