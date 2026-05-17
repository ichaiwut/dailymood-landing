// DailyMood — middle sections: AI showcase, How it works, Year-in-pixels, Features grid

/* ---------------- AI SHOWCASE ---------------- */
function AIShowcase() {
  const { t, lang } = useLang();
  return (
    <section id="ai" className="section" style={{ background: 'var(--night)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* aurora */}
      <div className="blob" style={{ background: 'var(--purple)', width: 600, height: 600, top: -200, left: -100, opacity: .35 }}/>
      <div className="blob" style={{ background: 'var(--peach)', width: 500, height: 500, bottom: -200, right: -150, opacity: .25 }}/>

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 760, marginBottom: 64 }}>
          <span className="eyebrow" style={{ background: 'rgba(166,115,241,.18)', color: '#D9C2FF' }}>
            <span className="dot" style={{ background: '#D9C2FF', boxShadow: '0 0 0 4px rgba(217,194,255,.18)' }}/> <T>{t.ai.eyebrow}</T>
          </span>
          <h2 className="h-display" style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 64px)', margin: '24px 0 18px' }}>
            <T>{t.ai.h2a}</T>{' '}
            <span style={{ background: 'linear-gradient(135deg, #FCA45B, #A673F1)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontStyle: 'italic', fontWeight: 700 }}>
              <T>{t.ai.h2b}</T>
            </span>{' '}
            <T>{t.ai.h2c}</T>
          </h2>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,.7)', maxWidth: 580 }}>
            <T>{t.ai.sub}</T>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 18 }}>
          {/* Feature 1: NLP — biggest card with example */}
          <AICard f={t.ai.f1} bg="linear-gradient(160deg, rgba(166,115,241,.15), rgba(252,164,91,.06))" big>
            <NLPDemo lang={lang}/>
          </AICard>

          {/* Feature 2: Vision */}
          <AICard f={t.ai.f2} bg="linear-gradient(160deg, rgba(133,236,203,.12), rgba(154,205,226,.05))">
            <VisionDemo lang={lang}/>
          </AICard>

          {/* Feature 3: Insights */}
          <AICard f={t.ai.f3} bg="linear-gradient(160deg, rgba(252,164,91,.15), rgba(253,203,86,.05))">
            <InsightsDemo lang={lang}/>
          </AICard>
        </div>
      </div>
    </section>
  );
}

function AICard({ f, children, bg, big }) {
  return (
    <div style={{
      padding: 28, borderRadius: 22,
      background: bg,
      border: '1px solid rgba(255,255,255,.08)',
      display: 'flex', flexDirection: 'column', gap: 18,
      gridColumn: big ? 'span 1' : 'auto',
      gridRow: big ? 'span 1' : 'auto',
    }}>
      <span style={{
        alignSelf: 'flex-start',
        fontSize: 11, fontWeight: 800, letterSpacing: '.08em',
        color: '#FFC899', textTransform: 'uppercase',
        padding: '5px 10px', borderRadius: 100, background: 'rgba(252,164,91,.15)',
      }}>{f.tag}</span>
      <div style={{ flex: 1, minHeight: 180 }}>{children}</div>
      <div>
        <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
          <T>{f.title}</T>
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.65)', margin: '8px 0 0', lineHeight: 1.5 }}>
          <T>{f.desc}</T>
        </p>
      </div>
    </div>
  );
}

function NLPDemo({ lang }) {
  const text = lang === 'th'
    ? 'วันนี้พรีเซนต์งานผ่านไปแล้ว เหนื่อยแต่โล่งใจ ขอกาแฟร้านโปรดเป็นรางวัล ☕'
    : 'Got through the big presentation. Tired but relieved. Treated myself to coffee from the usual spot ☕';
  const tags = lang === 'th'
    ? [['งาน', 'var(--peach)'], ['โล่งใจ', 'var(--mint)'], ['กาแฟ', 'var(--lavender)']]
    : [['work', 'var(--peach)'], ['relieved', 'var(--mint)'], ['coffee', 'var(--lavender)']];

  return (
    <div className={lang === 'th' ? 'thai' : ''} style={{
      background: 'rgba(255,255,255,.06)', padding: 16, borderRadius: 14,
      border: '1px solid rgba(255,255,255,.08)', fontSize: 14, lineHeight: 1.5,
    }}>
      <div style={{ color: 'rgba(255,255,255,.85)', marginBottom: 14 }}>
        "{text}"
      </div>
      <div style={{ borderTop: '1px dashed rgba(255,255,255,.15)', paddingTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: '#FFC899', fontWeight: 700 }}>✨ AI</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>{lang === 'th' ? 'อารมณ์ที่ตรวจพบ' : 'detected mood'}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--peach)' }}>{lang === 'th' ? '· ดี' : '· Good'}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tags.map(([txt, c]) => (
            <span key={txt} className={lang === 'th' ? 'thai' : ''} style={{
              padding: '4px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600,
              background: 'rgba(255,255,255,.08)', color: '#fff', border: `1px solid ${c}66`,
            }}>#{txt}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisionDemo({ lang }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        height: 110, borderRadius: 12, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #6B8FAE 0%, #C99FB1 40%, #F1C09A 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: .35,
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,.15) 0 6px, transparent 6px 14px)',
        }}/>
        <div style={{
          position: 'absolute', top: 8, right: 8, padding: '4px 8px',
          background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(8px)', borderRadius: 100,
          fontSize: 10, fontWeight: 700, color: '#fff',
        }}>📷 IMG_0394</div>
      </div>
      <div style={{
        background: 'rgba(255,255,255,.06)', padding: 12, borderRadius: 10,
        border: '1px solid rgba(255,255,255,.08)',
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', marginBottom: 6 }}>{lang === 'th' ? 'AI แนะนำแท็ก' : 'AI suggests'}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(lang === 'th' ? ['ทะเล', 'เย็น', 'พระอาทิตย์ตก'] : ['beach', 'evening', 'sunset']).map(t => (
            <span key={t} className={lang === 'th' ? 'thai' : ''} style={{
              padding: '3px 8px', borderRadius: 100, fontSize: 11, fontWeight: 600,
              background: 'rgba(252,164,91,.18)', color: '#FFC899',
            }}>#{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightsDemo({ lang }) {
  return (
    <div className={lang === 'th' ? 'thai' : ''} style={{
      background: 'rgba(255,255,255,.06)', padding: 14, borderRadius: 12,
      border: '1px solid rgba(255,255,255,.08)',
    }}>
      <div style={{ fontSize: 10, color: 'var(--peach)', fontWeight: 700, marginBottom: 6 }}>
        ✨ {lang === 'th' ? 'สรุปสัปดาห์ที่ 19' : 'Week 19 recap'}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,.85)' }}>
        {lang === 'th'
          ? <>คุณรู้สึก <b style={{ color: '#fff' }}>ดีขึ้น 18%</b> มี <b style={{ color: '#fff' }}>3 วัน</b> ที่คะแนนสูงตรงกับ <b style={{ color: 'var(--peach)' }}>ออกกำลังกาย</b></>
          : <>You felt <b style={{ color: '#fff' }}>18% better</b>. <b style={{ color: '#fff' }}>3 days</b> with high scores matched <b style={{ color: 'var(--peach)' }}>exercise</b></>}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
        {[6, 4, 7, 8, 6, 9, 7].map((h, i) => (
          <div key={i} style={{
            flex: 1, height: h * 4, borderRadius: 3,
            background: i >= 4 ? 'var(--peach)' : 'rgba(255,255,255,.2)',
          }}/>
        ))}
      </div>
    </div>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const { t } = useLang();
  const steps = [
    { t: t.how.s1t, d: t.how.s1d, color: 'var(--peach)' },
    { t: t.how.s2t, d: t.how.s2d, color: 'var(--purple)' },
    { t: t.how.s3t, d: t.how.s3d, color: 'var(--mint)' },
  ];
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}>
          <span className="eyebrow"><span className="dot"/> <T>{t.how.eyebrow}</T></span>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginTop: 22 }}>
            <T>{t.how.title}</T>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
          {/* dashed line through steps */}
          <svg style={{ position: 'absolute', top: 50, left: '8%', right: '8%', width: '84%', height: 2, zIndex: 0 }} preserveAspectRatio="none" viewBox="0 0 100 2">
            <line x1="0" y1="1" x2="100" y2="1" stroke="var(--rule)" strokeWidth="2" strokeDasharray="4 4"/>
          </svg>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 100, height: 100, borderRadius: 28,
                background: '#fff', boxShadow: '0 18px 36px -16px rgba(70,32,100,.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: 36, fontWeight: 800,
                color: s.color, transform: `rotate(${(i - 1) * 4}deg)`,
                fontFamily: 'var(--font-display)',
              }}>0{i + 1}</div>
              <h3 className="h-display" style={{ fontSize: 24, marginBottom: 10 }}><T>{s.t}</T></h3>
              <p style={{ color: 'var(--ink-2)', fontSize: 16, maxWidth: 280, margin: '0 auto' }}><T>{s.d}</T></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- YEAR IN PIXELS ---------------- */
function YearInPixels() {
  const { t, lang } = useLang();
  const months = lang === 'th'
    ? ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const palette = ['var(--peach)', 'var(--yellow)', 'var(--mint)', 'var(--lavender)', 'var(--blue)', 'var(--purple)'];
  // generate deterministic pseudo-random pattern
  const cell = (m, d) => {
    const key = (m * 31 + d * 7) % 100;
    if (key < 8) return null; // empty
    if (key < 22) return palette[0];
    if (key < 38) return palette[1];
    if (key < 58) return palette[2];
    if (key < 72) return palette[3];
    if (key < 86) return palette[4];
    return palette[5];
  };

  return (
    <section className="section" style={{ background: 'var(--page-2)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
        <div>
          <span className="eyebrow"><span className="dot"/> <T>{t.year.eyebrow}</T></span>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '22px 0 18px' }}>
            <T>{t.year.title}</T>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: 460 }}>
            <T>{t.year.sub}</T>
          </p>
          {/* legend */}
          <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
            {MOODS.slice(0, 6).map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: m.color }}/>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
                  <T>{lang === 'th' ? m.label : m.en}</T>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 32, borderRadius: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)' }}>2026</span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>
              <T>{lang === 'th' ? '298 วันที่บันทึก' : '298 days logged'}</T>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 8 }}>
            {months.map((m, mi) => (
              <React.Fragment key={mi}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', alignSelf: 'center', paddingRight: 4, textAlign: 'right' }}>
                  <T>{m}</T>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(31, 1fr)', gap: 3 }}>
                  {Array.from({ length: 31 }).map((_, di) => {
                    const c = cell(mi, di);
                    return (
                      <div key={di} style={{
                        aspectRatio: '1', borderRadius: 3,
                        background: c || '#F0EAE0',
                      }}/>
                    );
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES GRID ---------------- */
function FeaturesGrid() {
  const { t } = useLang();
  const colorMap = {
    peach: { bg: 'rgba(252,164,91,.12)', stroke: 'var(--peach)' },
    purple: { bg: 'rgba(166,115,241,.12)', stroke: 'var(--purple)' },
    mint: { bg: 'rgba(133,236,203,.18)', stroke: '#39B58A' },
    yellow: { bg: 'rgba(253,203,86,.18)', stroke: '#D9A41A' },
    lav: { bg: 'rgba(212,190,228,.30)', stroke: 'var(--purple)' },
    blue: { bg: 'rgba(154,205,226,.30)', stroke: '#5A9CB7' },
  };
  return (
    <section id="features" className="section">
      <div className="container">
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <span className="eyebrow"><span className="dot"/> <T>{t.features.eyebrow}</T></span>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginTop: 22 }}>
            <T>{t.features.title}</T>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {t.features.list.map((f, i) => (
            <div key={i} style={{
              padding: 28, borderRadius: 20, background: '#fff',
              border: '1px solid var(--rule)',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: colorMap[f.c].bg, color: colorMap[f.c].stroke,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FeatIcon i={i} stroke={colorMap[f.c].stroke}/>
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}><T>{f.t}</T></h3>
                <p style={{ color: 'var(--ink-2)', fontSize: 15, margin: 0, lineHeight: 1.55 }}><T>{f.d}</T></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatIcon({ i, stroke }) {
  const s = stroke; const sw = 1.8;
  const c = { stroke: s, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg width="26" height="26" viewBox="0 0 26 26">
      {/* 0: Quick Icons — smiley */}
      {i === 0 && <><circle cx="13" cy="13" r="8" {...c}/><circle cx="10" cy="11" r=".8" fill={s}/><circle cx="16" cy="11" r=".8" fill={s}/><path d="M 9 15 Q 13 18 17 15" {...c}/></>}
      {/* 1: Smart Log + Voice — mic */}
      {i === 1 && <><rect x="11" y="3" width="4" height="11" rx="2" {...c}/><path d="M 7 11 V 12 A 6 6 0 0 0 19 12 V 11" {...c}/><line x1="13" y1="18" x2="13" y2="22" {...c}/><line x1="10" y1="22" x2="16" y2="22" {...c}/></>}
      {/* 2: Smart Calendar */}
      {i === 2 && <><rect x="5" y="6" width="16" height="15" rx="2.5" {...c}/><line x1="5" y1="11" x2="21" y2="11" {...c}/><line x1="9" y1="4" x2="9" y2="8" {...c}/><line x1="17" y1="4" x2="17" y2="8" {...c}/><circle cx="13" cy="16" r="1.6" fill={s}/></>}
      {/* 3: Calendar AI Patterns — calendar with sparkle/star */}
      {i === 3 && <><rect x="3" y="6" width="14" height="13" rx="2" {...c}/><line x1="3" y1="10" x2="17" y2="10" {...c}/><line x1="7" y1="4" x2="7" y2="7" {...c}/><line x1="13" y1="4" x2="13" y2="7" {...c}/><path d="M 19 13 L 20 16 L 23 17 L 20 18 L 19 21 L 18 18 L 15 17 L 18 16 Z" fill={s} stroke="none"/></>}
      {/* 4: Ask AI — speech bubble with sparkle */}
      {i === 4 && <><path d="M 4 7 H 19 V 17 L 15 17 L 12 20 L 9 17 H 4 Z" {...c}/><path d="M 11.5 12 L 12 13 L 13 13.5 L 12 14 L 11.5 15 L 11 14 L 10 13.5 L 11 13 Z" fill={s} stroke="none"/><path d="M 15 9 L 15.3 10 L 16 10.3 L 15.3 10.6 L 15 11.5 L 14.7 10.6 L 14 10.3 L 14.7 10 Z" fill={s} stroke="none"/></>}
      {/* 5: Weekly Insights — sparkle + chart */}
      {i === 5 && <><polyline points="3,19 8,14 12,16 17,9" {...c}/><circle cx="3" cy="19" r="1.4" fill={s}/><circle cx="8" cy="14" r="1.4" fill={s}/><circle cx="12" cy="16" r="1.4" fill={s}/><circle cx="17" cy="9" r="1.4" fill={s}/><path d="M 21 5 L 21.6 6.6 L 23 7.2 L 21.6 7.8 L 21 9.4 L 20.4 7.8 L 19 7.2 L 20.4 6.6 Z" fill={s} stroke="none"/></>}
      {/* 6: Mood Stats — bars */}
      {i === 6 && <><rect x="4" y="14" width="3.5" height="8" rx="1" {...c}/><rect x="10" y="9" width="3.5" height="13" rx="1" {...c}/><rect x="16" y="5" width="3.5" height="17" rx="1" {...c}/></>}
      {/* 7: Achievements — trophy/medal */}
      {i === 7 && <><path d="M 8 4 H 18 V 9 A 5 5 0 0 1 8 9 Z" {...c}/><path d="M 8 6 H 5 V 8 A 3 3 0 0 0 8 11" {...c}/><path d="M 18 6 H 21 V 8 A 3 3 0 0 1 18 11" {...c}/><line x1="13" y1="14" x2="13" y2="18" {...c}/><rect x="9" y="18" width="8" height="3" rx="1" {...c}/></>}
      {/* 8: Mood Icon Packs — 2x2 grid */}
      {i === 8 && <><rect x="4" y="4" width="8" height="8" rx="2" {...c}/><rect x="14" y="4" width="8" height="8" rx="2" {...c}/><rect x="4" y="14" width="8" height="8" rx="2" {...c}/><rect x="14" y="14" width="8" height="8" rx="2" {...c}/></>}
    </svg>
  );
}

window.AIShowcase = AIShowcase;
window.HowItWorks = HowItWorks;
window.YearInPixels = YearInPixels;
window.FeaturesGrid = FeaturesGrid;
