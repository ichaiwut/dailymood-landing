# Handoff: DailyMood — App Landing Page (Manila Desk)

## Overview
A marketing **landing page for the DailyMood mobile app** (iOS + Android). DailyMood is an AI mood-journal: users tap how they feel, optionally write/speak/photo a note, and the app reflects it back, recaps each month, charts trends, and summarizes the whole year. The page's job is to drive **App Store / Google Play downloads**, with a secondary link to the web app in the footer.

The visual direction is **"Manila Desk"** — a warm paper-desk aesthetic: manila folders with tabs, paperclips, washi tape, hand-stuck mood stickers, and layered paper sheets on a grainy desk surface. Bilingual **Thai (default) / English**, toggled live.

## About the Design Files
The files in this bundle are **design references created in HTML/React (via inline Babel JSX)** — a working prototype that shows the intended look, copy, and behavior. They are **not production code to copy directly**.

The task is to **recreate this design in the target codebase's existing environment** (React, Vue, Next.js, Astro, etc.) using its established components, styling approach, and i18n setup. If no front-end environment exists yet, pick the most appropriate framework for a marketing site (e.g. Astro or Next.js) and implement it there. Treat the HTML as the source of truth for layout, spacing, color, type, and copy.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all specified. Recreate pixel-accurately. The only placeholder is the store/web-app URLs (see Assets). The phone images are **real app screenshots** and should be reused as-is (or re-exported from the live app at equivalent crops).

---

## Screens / Views
This is a single long-scroll page. Max content width **1180px**, centered, `0 32px` side padding (`0 18px` ≤720px). Section vertical padding **100px** (64px ≤720px). Desk background `#F1E5CF` with a fixed radial-dot paper grain overlay (`rgba(120,90,50,.06)` dots, 7×7px, opacity .5).

Section order, top to bottom:

### 1. Sticky Nav
- **Purpose:** persistent brand + jump links + primary download CTA.
- **Layout:** sticky top, height **74px**, flex space-between. Transparent at top; on scroll >10px gains `rgba(247,240,228,.88)` background, `blur(12px) saturate(160%)` backdrop, 1px bottom hairline.
- **Components:** left = logo lockup (mark + "Dailymood", height 30px). Center nav links (Features, AI, Pricing, FAQ) → anchor scroll. Right = TH/EN pill toggle (`2px solid var(--ink)`, radius 100, active side opacity 1 / inactive .4) and a dark **Download** button (`btn-ink`, height 44, radius 12, padding 0 18px).

### 2. Hero
- **Purpose:** headline + value prop + primary store badges + hero phone.
- **Layout:** 2-col grid `1.04fr 1fr`, gap 54, vertically centered. `paddingTop:40`, `paddingBottom:90`. Collapses to 1 col ≤980px.
- **Left column:**
  - Eyebrow chip: "✦ แอปไดอารีอารมณ์ ด้วย AI" / "✦ AI mood-journal app" (`.eyebrow`).
  - H1 `.display`, `clamp(40px,6.2vw,80px)`, two lines, last word wrapped in `.mark` (peach highlighter swipe). TH: "บอกความรู้สึก / แค่ แตะเดียว" · EN: "Tell how you feel / in one tap".
  - Sub-paragraph, 19px, `var(--ink-2)`, max-width 500, weight 500.
  - **StoreBadges (lg)** — primary action.
  - Trust row: 3 items with check icon, 13.5px, weight 700, `var(--ink-2)`: "ฟรี · ไม่ต้องใส่บัตร / Free · no card", "ทดลอง Pro 14 วัน / 14-day Pro trial", "ไทย + อังกฤษ / TH + EN".
- **Right column:** hero phone `app-01-home.png` width 340, `rotate(1.4deg)`, drop-shadow. Behind it two blurred color blobs (peach + lavender, `blur(46px)`, opacity ~.55). Floating accents: a white "great" mood sticker (size 58, bottom-right) and a paper chip "✨ Streak +7" (top-left, rotated −8°), both with a gentle `floaty` bob.

### 3. By the Numbers
- **Purpose:** 4 quick stats.
- **Layout:** 4-col grid, gap 20. Each is a white sheet card (`.sheet`, radius 14, padding 24/22), slightly rotated alternating ±1.3°, with a `.stacked` layered-paper effect.
- **Card content:** big `.display` number in an accent color (48px), a mood sticker top-right (size 40, rotated −6°), then bold 16px label + 13px `var(--ink-3)` sub. Values: **10** moods to pick · **2** platforms (iPhone+Android) · **365** days in year view · **2** languages TH+EN. Accent colors per card: peach, mint, lavender, yellow.

### 4. Capture Spotlight (`#capture`)
- Generic **Spotlight** layout (see below), **reversed** (text right, phone left), phone `rotate(-1.6deg)`.
- Phone: `app-02-ai-journal.png`. Accent = lavender/purple. Sticker "good" top-right; chip "🎙️ พูดได้เลย / 🎙️ Just speak" bottom-left.
- Eyebrow "บันทึกง่าย / QUICK CAPTURE". Title "เขียนสั้น ๆ ให้ AI เข้าใจที่เหลือ / Write a little. AI gets the rest."
- 3 bullets (icon-chip + text): type/voice · attach photo + location pin · tag activities.

### 5. AI Reflect Showcase (`#ai`) — dark folder
- **Purpose:** the AI reflection feature, given a premium dark treatment.
- **Layout:** a **Folder** with tab "✦ AI · สะท้อนบันทึก / ✦ AI · reflection" (peach tab) and a **dark plum** body (`sheetClass="plum"`), radius `4px 26px 26px 26px`, padding 52/48. Paperclip accent top-right. Inside: 2-col grid `1fr 1fr`, gap 48 (1 col ≤980px).
- **Left:** white H2 `.display` with the word "สะท้อน / reflect" in an italic peach→purple gradient text fill (`linear-gradient(135deg,#FCA45B,#A673F1)`). Sub-paragraph `rgba(255,255,255,.72)`. Then **3 mode cards** (`rgba(255,255,255,.06)` bg, `rgba(255,255,255,.12)` border, radius 14, padding 16/18): each a colored tag (peach / mint / lavender) + description. Disclaimer line `rgba(255,255,255,.5)` 13px: "เป็นแค่มุมมองจาก AI… / Just an AI perspective…".
- **Right:** phone `app-03-ai-reflect.png` width 310, `rotate(1.6deg)`, stronger shadow, purple blob behind.

### 6. Calendar Spotlight (`#calendar`)
- Spotlight (text left, phone right), phone `rotate(-1.5deg)`, `app-04-calendar.png`. Accent peach. Sticker "great" top-left; chip "⭐ วันที่ดีที่สุด / ⭐ Best day" bottom-right.
- Eyebrow "ปฏิทิน · AI สรุป / CALENDAR · AI RECAP". Title "AI สรุปอารมณ์ ให้ทุกเดือน / A monthly mood recap from AI". Bullets: switch calendar/timeline/year · AI highlights best & hardest days · detected patterns with a short why.

### 7. Stats Spotlight (`#stats`) — tinted band
- Spotlight **reversed**, phone `rotate(1.5deg)`, background `var(--desk-2)`. Phone `app-05-stats.png`. Accent mint. Sticker "okay" bottom-left; chip "📈 มีความสุข 30% / 📈 Happy 30%" top-right.
- Eyebrow "สถิติอารมณ์ / MOOD STATS". Title "เห็นแนวโน้ม อารมณ์ชัดเจน / See your mood trends clearly". Bullets: weekly/monthly trend lines · full mood mix by % · activity impact ±.

### 8. Year Spotlight (`#year`)
- Spotlight (text left, phone right), phone `rotate(-1.4deg)`, `app-06-year.png`. Accent lavender/purple. Sticker "great" top-right; chip "🔥 Streak 12 วัน / 🔥 12-day streak" bottom-left.
- Eyebrow "ภาพรวมทั้งปี / YEAR IN REVIEW". Title "ภาพรวมทั้งปี ในหน้าเดียว / Your whole year, on one screen". Bullets: full-year AI story · standout mood + longest streak · download AI report as PDF (Pro).

### 9–12. Reused marketing sections
These come unchanged from the original landing system (`pp-sections.jsx`): **FeaturesGrid**, **Articles**, **Testimonials**, **Pricing**. Recreate them from that file; they are not app-specific. Pricing is Free / Pro.

### 13. FAQ (`#faq`)
- **Layout:** 2-col `1fr 1.5fr`, gap 56. Left = sticky (`top:100`) eyebrow "FAQ" + H2 "คำถามที่พบบ่อย / Frequently asked" + a mint "calm" sticker. Right = accordion of 6 white sheet cards (radius 14, `var(--shadow-sm)`).
- **Accordion item:** full-width button, padding 20/22, bold 17px question + a 32px circular +/– toggle (open = filled `var(--ink)` bg, white "–"; closed = 2px `var(--line)` border, "+"). Body animates `max-height 0→320px` over .35s ease; answer 15px `var(--ink-2)`, line-height 1.6. First item open by default.
- **Questions are app-correct** (devices iPhone/Android + cross-device sync, data security, no AI training on entries, free forever + Pro, cancel via App Store/Play, TH+EN). Full copy in `app-sections.jsx → FAQApp`.

### 14. CTA / Download (`#download`)
- **Layout:** a **Folder** with tab "ดาวน์โหลด / Get the app" (ink tab), folder slightly rotated −0.4°. Body radius `4px 26px 26px 26px`, padding 60/40, centered text, **gradient background** `linear-gradient(135deg, var(--peach) 0%, #F49EAB 48%, var(--purple) 100%)`, white text. 3 floating white mood stickers (great/good/calm) with `floaty` bob.
- H2 `.display` `clamp(32px,5vw,60px)` "เริ่มรู้จักตัวเองดีขึ้นวันนี้ / Start knowing yourself better today". Sub 19px. **StoreBadges (lg)** centered.

### 15. Footer
- Dark plum (`var(--plum)`), `paddingTop:64`, `paddingBottom:30`.
- **Web-app callout banner** (top of footer): full-width row, `rgba(255,255,255,.06)` bg, `rgba(255,255,255,.14)` border, radius 18, padding 22/26. Left: 💻 icon tile (46×46, radius 12) + bold 18px "อยากใช้บนคอมพิวเตอร์? / Prefer the desktop?" + 14px `rgba(255,255,255,.62)` sub. Right: white pill button "เปิดเว็บแอป / Open web app" + arrow. Links to the web app URL.
- 3-col grid `1.6fr 1fr 1fr`: brand col (logo + tagline + **StoreBadges sm**), Product col (+ a "เว็บแอป / Web app" link), Legal col.
- Bottom bar: copyright + 🌐 TH/EN toggle, separated by `rgba(255,255,255,.1)` top hairline.

---

## The generic Spotlight component
Sections 4/6/7/8 share one component. Props: `id, reverse, eyebrow, ebClass, title, sub, bullets[], src, accent{bg,fg,blob}, rot, sticker{f,c,pos}, chip{txt,r,pos}, bg`.
- Container: `.section`, 2-col grid (`1.05fr 1fr`, or `1fr 1.05fr` when reversed), gap 64, centered. ≤980px → 1 col, gap 40, order reset.
- Text side: eyebrow → H2 `.display` `clamp(30px,4.2vw,52px)` → 18px sub (`var(--ink-2)`, max-width 460) → bullet list (gap 13; each = 26×26 rounded accent icon-chip + 16px/600 text).
- Phone side: centered phone image width **318**, rotated by `rot`, drop-shadow; a blurred accent blob behind (340×340); optional floating sticker + chip.

## StoreBadges component
Two anchor "badges" side by side (flex, gap 14, wrap), linking to `#download` (replace with real store URLs).
- Each badge: dark (`var(--ink)`) pill, radius 14, height **58 (lg) / 52 (sm)**, padding `0 20px 0 16px` (lg). A chunky stacked shadow `0 8px 0 -2px #000, 0 16px 28px -16px rgba(0,0,0,.6)`. Hover: `translateY(-2px)` + deeper shadow.
- Contents: brand glyph + 2 stacked lines — small uppercase label (10.5px/700, opacity .78, "ดาวน์โหลดบน / Download on the" · "มีให้บน / Get it on") and big name (19px lg /800, "App Store" · "Google Play").
- **Apple glyph:** official Apple mark, `viewBox="0 0 384 512"`, `fill:currentColor` (white). **Google Play glyph:** 4-color triangle (`#00D2FF` / `#00F076` / `#FF3A44` / `#FFC900`). Exact SVG paths are in `app-sections.jsx → AppleMark / PlayMark`.

---

## Interactions & Behavior
- **Language toggle:** TH ↔ EN, swaps every string live; persists in React context (`LangProvider` / `useLang`). TH is default. Thai text uses the `.thai` class (Noto Sans Thai) with looser line-height (`1.22` on display headings).
- **Sticky nav:** transparent → frosted on scroll past 10px (see Nav).
- **Anchor nav:** nav links + badges scroll to section ids (`#features`, `#ai`, `#pricing`, `#faq`, `#download`). `html { scroll-behavior: smooth }`.
- **FAQ accordion:** single-open; clicking the open item closes it (`max-height` transition .35s ease).
- **Hover:** store badges lift; nav links and standard `.btn` per `paper.css`.
- **Floaty animation:** stickers/chips bob via the `floaty` keyframe with staggered `animationDelay`. Respect `prefers-reduced-motion`.
- **Responsive:** ≤980px hero, spotlight, and reflect grids collapse to single column; ≤720px container padding shrinks to 18px and section padding to 64px.

## State Management
- `lang` (`'th' | 'en'`) in a React context provider, default `'th'`.
- `scrolled` boolean in Nav (scroll listener, threshold 10px).
- `open` index in FAQ accordion (default 0; `-1` = all closed).
- No data fetching — fully static marketing page.

## Design Tokens
**Brand colors** (`tokens.css`):
- `--purple #A673F1`, `--purple-strong #9747FF`, `--lavender #D4BEE4`, `--mint #85ECCB`, `--peach #FCA45B`, `--peach-light #FEAD8D`, `--blue #9ACDE2`, `--yellow #FDCB56`.

**Paper Desk palette** (`paper.css`):
- Surfaces: `--desk #F1E5CF`, `--desk-2 #E8DABF`, `--paper #FFFFFF`, `--paper-2 #FCF7EE`, `--kraft #E9D6B4`.
- Ink/text: `--ink #1A1320`, `--ink-2 #5A4E62`, `--ink-3 #8C8497`. `--plum #1A1320`, `--plum-2 #2A1F33`.
- Lines/accents: `--line rgba(26,19,32,.10)`, `--tape rgba(252,164,91,.45)`, `--clip #B7B2BC`.
- Hero CTA gradient: `linear-gradient(135deg, var(--peach) 0%, #F49EAB 48%, var(--purple) 100%)`.
- AI gradient text: `linear-gradient(135deg, #FCA45B, #A673F1)`.

**Shadows:** `--shadow-sm 0 6px 16px -8px rgba(60,40,20,.30)`, `--shadow-md 0 18px 40px -18px rgba(60,40,20,.40)`, `--shadow-lg 0 36px 70px -30px rgba(40,20,10,.45)`. Phone drop-shadow: `drop-shadow(0 44px 64px rgba(40,20,10,.34)) drop-shadow(0 8px 16px rgba(40,20,10,.18))`. Store badge: `0 8px 0 -2px #000, 0 16px 28px -16px rgba(0,0,0,.6)`.

**Typography:**
- Font: `--font: 'Urbanist', 'Noto Sans Thai', system-ui, sans-serif` (Google Fonts: Urbanist 400–800, Noto Sans Thai 400/500/700).
- Display: weight 800, `letter-spacing -0.03em`, `line-height .98` (Thai display `1.05`, and `1.22` on the app page override), `text-wrap: balance`.
- Body base 17px / line-height 1.55. Sub-paragraphs 18–19px. Bullets 16px/600. Eyebrow, trust row 13–13.5px/700.

**Radii:** badges 14 · sheet/FAQ cards 14 · mode cards 14 · folder body `4px 26px 26px 26px` · nav download button 12 · pills 100. **Spacing:** section 100/64px; container max 1180, pad 32/18; grid gaps 20–64.

## Assets
- **Phone screenshots** (real app captures, rounded-corner masked, transparent PNG, 915×1932): `app-01-home.png`, `app-02-ai-journal.png`, `app-03-ai-reflect.png`, `app-04-calendar.png`, `app-05-stats.png`, `app-06-year.png`. Reuse these or re-export equivalents from the live app.
- **Logo:** `dailymood-logo.png`, `dailymood-mark.png` (also drawn as `<Logo>` / `<LogoLockup>` SVG in `pp-parts.jsx`).
- **Mood stickers / paperclip / folder / icons:** all SVG, drawn in `pp-parts.jsx` (`MoodFace`, `Sticker`, `Paperclip`, `Folder`, `Check`, `Arrow`, `FeatIcon`).
- **Store / web-app URLs are placeholders** — App Store & Google Play badges link to `#download`; footer web-app links to `https://app.dailymood.app`. Replace all three with real URLs.
- Fonts: Google Fonts (Urbanist, Noto Sans Thai) — swap for the codebase's font-loading approach if it has one.

## Files
In this bundle (`landing-paper/` in the project):
- `Landing-Manila-Desk.html` — the page entry: loads fonts/CSS, mounts `<Landing>` composing all sections, holds the `.thai` line-height + store-badge hover overrides in a `<style>` block.
- `app-sections.jsx` — **all app-specific components** (this redesign): `NavApp, HeroApp, ByNumbersApp, StoreBadges, AppleMark, PlayMark, PhoneShot, Blob, Spotlight, CaptureSpotlight, AIReflectShowcase, CalendarSpotlight, StatsSpotlight, YearSpotlight, FAQApp, CTAApp, FooterApp`.
- `pp-parts.jsx` — shared primitives & i18n context (`LangProvider`, `useLang`, `T`, `MoodFace`, `Sticker`, `Folder`, `Paperclip`, `Logo`, `LogoLockup`, `Check`, `Arrow`, `FeatIcon`, `MOODS`).
- `pp-sections.jsx` — reused marketing sections (`FeaturesGrid, Articles, Testimonials, Pricing`) + the original (now superseded) web-app sections.
- `paper.css` — Manila Desk aesthetic (folders, tabs, tape, sheets, `.display`, `.mark`, `.eyebrow`, `.btn`, `.floaty`, `.chip`, responsive).
- `tokens.css` — brand color + font tokens, base resets, animation keyframes.

> Note: the app page deliberately reuses the shared footer-less structure but swaps in `FooterApp`, `NavApp`, and the spotlight sections. The other three `Landing-*.html` variants in the folder are alternate web-app directions and are **not** part of this handoff.
