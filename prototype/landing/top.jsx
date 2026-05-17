// DailyMood — Landing Page sections
// All components live in this file so they share Babel scope.

const { useLang, T } = window;

/* ---------------- Mood emoji set (consistent across all sections) ---------------- */
const MOODS = [
  { id: 'great',   label: 'ดีมาก',  en: 'Great',   color: 'var(--peach)', face: 'great' },
  { id: 'good',    label: 'ดี',     en: 'Good',    color: 'var(--yellow)', face: 'good' },
  { id: 'okay',    label: 'เฉย ๆ',  en: 'Okay',    color: 'var(--mint)', face: 'okay' },
  { id: 'meh',     label: 'เหนื่อย', en: 'Meh',     color: 'var(--lavender)', face: 'meh' },
  { id: 'bad',     label: 'แย่',    en: 'Bad',     color: 'var(--blue)', face: 'bad' },
  { id: 'awful',   label: 'แย่มาก',  en: 'Awful',   color: 'var(--purple)', face: 'awful' },
  { id: 'calm',    label: 'สงบ',    en: 'Calm',    color: '#B9D6F2', face: 'calm' },
];

function MoodFace({ face, size = 48, bg }) {
  const w = size;
  const eye = (cx, cy) => <circle cx={cx} cy={cy} r={size*0.06} fill="#1A1320" />;
  let mouth;
  if (face === 'great') mouth = <path d={`M ${w*0.32} ${w*0.62} Q ${w*0.5} ${w*0.82} ${w*0.68} ${w*0.62}`} stroke="#1A1320" strokeWidth={size*0.05} fill="none" strokeLinecap="round" />;
  else if (face === 'good') mouth = <path d={`M ${w*0.34} ${w*0.62} Q ${w*0.5} ${w*0.74} ${w*0.66} ${w*0.62}`} stroke="#1A1320" strokeWidth={size*0.05} fill="none" strokeLinecap="round" />;
  else if (face === 'okay') mouth = <line x1={w*0.36} y1={w*0.66} x2={w*0.64} y2={w*0.66} stroke="#1A1320" strokeWidth={size*0.05} strokeLinecap="round" />;
  else if (face === 'meh') mouth = <path d={`M ${w*0.34} ${w*0.68} Q ${w*0.5} ${w*0.62} ${w*0.66} ${w*0.68}`} stroke="#1A1320" strokeWidth={size*0.05} fill="none" strokeLinecap="round" />;
  else if (face === 'bad') mouth = <path d={`M ${w*0.34} ${w*0.72} Q ${w*0.5} ${w*0.58} ${w*0.66} ${w*0.72}`} stroke="#1A1320" strokeWidth={size*0.05} fill="none" strokeLinecap="round" />;
  else if (face === 'awful') mouth = <path d={`M ${w*0.32} ${w*0.74} Q ${w*0.5} ${w*0.54} ${w*0.68} ${w*0.74}`} stroke="#1A1320" strokeWidth={size*0.05} fill="none" strokeLinecap="round" />;
  else mouth = <circle cx={w*0.5} cy={w*0.66} r={size*0.05} fill="#1A1320" />;
  return (
    <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`}>
      <circle cx={w*0.5} cy={w*0.5} r={w*0.48} fill={bg || '#fff'} />
      {eye(w*0.36, w*0.42)}
      {eye(w*0.64, w*0.42)}
      {mouth}
    </svg>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', on); on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'saturate(180%) blur(14px)',
      background: scrolled ? 'rgba(251, 246, 238, 0.85)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'all .25s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--ink)' }}>
          <Logo size={32} />
          <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.01em' }}>DailyMood</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }} className="nav-links">
          {[['features', '#features'], ['ai', '#ai'], ['pricing', '#pricing'], ['faq', '#faq']].map(([k, h]) => (
            <a key={k} href={h} style={{ color: 'var(--ink-2)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
              <T>{t.nav[k]}</T>
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 100, border: '1.5px solid var(--rule)',
              background: 'transparent', fontFamily: 'var(--font)', fontWeight: 700, fontSize: 13,
              cursor: 'pointer', color: 'var(--ink-2)',
            }}>
            <span style={{ opacity: lang === 'th' ? 1 : 0.4 }}>TH</span>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ opacity: lang === 'en' ? 1 : 0.4 }}>EN</span>
          </button>
          <a href="#" className="hide-sm" style={{ color: 'var(--ink-2)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            <T>{t.nav.signin}</T>
          </a>
          <a href="#cta" className="btn btn-ink" style={{ height: 42, fontSize: 14 }}><T>{t.nav.cta}</T></a>
        </div>
      </div>
    </nav>
  );
}

function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FCA45B"/>
          <stop offset=".5" stopColor="#FBA0A0"/>
          <stop offset="1" stopColor="#A673F1"/>
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#lg1)"/>
      <circle cx="12" cy="14" r="1.6" fill="#1A1320"/>
      <circle cx="20" cy="14" r="1.6" fill="#1A1320"/>
      <path d="M 11 20 Q 16 24 21 20" stroke="#1A1320" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ---------------- BROWSER MOCKUP showing web app ---------------- */
function BrowserMockup() {
  return (
    <div style={{
      borderRadius: 18, background: '#fff',
      boxShadow: '0 40px 80px -20px rgba(70, 32, 100, 0.25), 0 20px 40px -20px rgba(0,0,0,.15)',
      overflow: 'hidden', border: '1px solid rgba(0,0,0,.05)',
    }}>
      {/* chrome */}
      <div style={{
        height: 38, background: '#F4EEE6',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
        borderBottom: '1px solid rgba(0,0,0,.05)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: 50, background: '#FF6058' }}/>
          <span style={{ width: 11, height: 11, borderRadius: 50, background: '#FEBC2E' }}/>
          <span style={{ width: 11, height: 11, borderRadius: 50, background: '#29C840' }}/>
        </div>
        <div style={{
          flex: 1, height: 22, background: '#fff', borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: 'var(--ink-3)', fontWeight: 600,
          maxWidth: 280, margin: '0 auto',
        }}>
          <span style={{ marginRight: 6, fontSize: 9 }}>🔒</span>
          dailymood.me/today
        </div>
        <div style={{ width: 50 }}/>
      </div>
      {/* app body */}
      <AppDashboard />
    </div>
  );
}

function AppDashboard() {
  const { lang } = useLang();
  return (
    <div style={{ background: 'var(--bg)', padding: 22, fontFamily: 'var(--font)' }} className={lang === 'th' ? 'thai' : ''}>
      {/* topbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={22}/>
          <span style={{ fontWeight: 800, fontSize: 14 }}>DailyMood</span>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 12, fontWeight: 600, color: 'var(--ink-2)' }}>
          <span style={{ color: 'var(--ink)' }}>{lang === 'th' ? 'วันนี้' : 'Today'}</span>
          <span>{lang === 'th' ? 'ปฏิทิน' : 'Calendar'}</span>
          <span>{lang === 'th' ? 'สถิติ' : 'Stats'}</span>
          <span>{lang === 'th' ? 'AI' : 'Insights'}</span>
        </div>
        <div style={{ width: 28, height: 28, borderRadius: 50, background: 'linear-gradient(135deg, var(--peach), var(--purple))' }}/>
      </div>

      {/* hero greeting card */}
      <div style={{
        borderRadius: 18, padding: '18px 20px',
        background: 'linear-gradient(135deg, #F8EDEB 0%, #E9DEF6 100%)',
        marginBottom: 14, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--purple-strong)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
          {lang === 'th' ? 'สวัสดีตอนเช้า · จันทร์ 12 พ.ค.' : 'Good morning · Mon May 12'}
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, marginTop: 6, lineHeight: 1.15 }}>
          {lang === 'th' ? 'วันนี้คุณรู้สึกยังไง?' : 'How are you feeling today?'}
        </div>
        <div style={{ display: 'flex', gap: 7, marginTop: 12 }}>
          {MOODS.slice(0, 7).map((m, i) => (
            <div key={m.id} style={{ flex: 1 }}>
              <div style={{
                width: '100%', aspectRatio: '1', borderRadius: 50,
                background: i === 0 ? m.color : '#fff',
                border: i === 0 ? 'none' : '1px solid rgba(0,0,0,.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: i === 0 ? '0 6px 14px -2px rgba(252,164,91,.55)' : 'none',
              }}>
                <MoodFace face={m.face} size={28} bg="transparent"/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* two-col: AI summary + mini cal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
        {/* AI summary card */}
        <div className="card" style={{ padding: 16, borderRadius: 16, boxShadow: 'none', border: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--purple-strong)', letterSpacing: '.06em' }}>✨ AI SUMMARY</span>
            <span style={{ fontSize: 9, color: 'var(--ink-3)' }}>· {lang === 'th' ? 'สัปดาห์นี้' : 'This week'}</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            {lang === 'th' ? (
              <>คุณรู้สึก <b style={{ color: 'var(--ink)' }}>ดีขึ้น 18%</b> เทียบกับสัปดาห์ก่อน
              วันที่ออกกำลังกายมัก <b style={{ color: 'var(--ink)' }}>คะแนนสูงกว่า</b>
              ลองรักษาสามครั้งต่อสัปดาห์</>
            ) : (
              <>You felt <b style={{ color: 'var(--ink)' }}>18% better</b> than last week.
              Days with exercise scored <b style={{ color: 'var(--ink)' }}>higher</b>.
              Try keeping it at 3×/week.</>
            )}
          </div>
          {/* sparkline */}
          <svg viewBox="0 0 200 36" style={{ width: '100%', height: 32, marginTop: 10 }}>
            <defs>
              <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#A673F1" stopOpacity=".3"/>
                <stop offset="1" stopColor="#A673F1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M 0 26 L 28 22 L 56 25 L 84 18 L 112 20 L 140 14 L 168 10 L 200 6 L 200 36 L 0 36 Z" fill="url(#spark)"/>
            <path d="M 0 26 L 28 22 L 56 25 L 84 18 L 112 20 L 140 14 L 168 10 L 200 6" stroke="#A673F1" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            {[0,28,56,84,112,140,168,200].map((x, i) => {
              const y = [26,22,25,18,20,14,10,6][i];
              return <circle key={i} cx={x} cy={y} r="2.2" fill="#fff" stroke="#A673F1" strokeWidth="1.4"/>;
            })}
          </svg>
        </div>

        {/* mini calendar */}
        <div className="card" style={{ padding: 12, borderRadius: 16, boxShadow: 'none', border: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800 }}>{lang === 'th' ? 'พ.ค.' : 'May'}</span>
            <span style={{ fontSize: 9, color: 'var(--ink-3)' }}>12 / 31</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
            {Array.from({ length: 31 }).map((_, i) => {
              const filled = i < 12;
              const colors = ['var(--peach)', 'var(--yellow)', 'var(--mint)', 'var(--lavender)', 'var(--blue)', 'var(--purple)'];
              const c = filled ? colors[(i * 3) % colors.length] : 'transparent';
              return (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 4,
                  background: filled ? c : '#F5F1EB',
                  border: i === 11 ? '1.5px solid var(--ink)' : 'none',
                }}/>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { t } = useLang();
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', paddingTop: 50, paddingBottom: 100 }}>
      {/* blobs */}
      <div className="blob" style={{ background: 'var(--peach)', width: 480, height: 480, top: -120, right: -120 }}/>
      <div className="blob" style={{ background: 'var(--lavender)', width: 520, height: 520, top: 100, left: -200, opacity: .45 }}/>

      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 64, alignItems: 'center' }}>
        <div className="hero-left">
          <span className="eyebrow"><span className="dot"/> <T>{t.hero.eyebrow}</T></span>
          <h1 className="h-display fade-up" style={{ fontSize: 'clamp(40px, 6vw, 78px)', margin: '24px 0 22px' }}>
            <T>{t.hero.h1a}</T><br/>
            <T>{t.hero.h1b}</T>{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--peach) 0%, var(--purple) 80%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              fontStyle: 'italic', fontWeight: 700,
            }}><T>{t.hero.h1c}</T></span>
          </h1>
          <p style={{ fontSize: 19, color: 'var(--ink-2)', maxWidth: 540, marginBottom: 28 }}>
            <T>{t.hero.sub}</T>
          </p>

          {/* email signup */}
          <form onSubmit={(e) => e.preventDefault()} style={{
            display: 'flex', gap: 8, alignItems: 'center', maxWidth: 480, marginBottom: 14,
            background: '#fff', padding: 6, borderRadius: 100, boxShadow: '0 14px 32px -16px rgba(70,32,100,.25)',
            border: '1px solid var(--rule)',
          }}>
            <input type="email" placeholder={t.hero.emailPh} aria-label={t.hero.emailPh} style={{
              flex: 1, height: 48, border: 'none', outline: 'none', padding: '0 18px',
              fontFamily: 'var(--font)', fontSize: 15, background: 'transparent', color: 'var(--ink)',
            }}/>
            <button type="submit" className="btn btn-peach" style={{ height: 48 }}>
              <T>{t.hero.ctaMain}</T> →
            </button>
          </form>

          <div style={{ fontSize: 13, color: 'var(--ink-3)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span><T>{t.hero.ctaSub}</T></span>
          </div>

          {/* trust ticks */}
          <div style={{ display: 'flex', gap: 22, marginTop: 26, flexWrap: 'wrap' }}>
            {[t.hero.trust1, t.hero.trust2, t.hero.trust3].map((tx, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
                <Check/> <T>{tx}</T>
              </span>
            ))}
          </div>
        </div>

        <div className="hero-right" style={{ position: 'relative' }}>
          {/* Floating mood chips */}
          <FloatingChip text={t.ai.f1.tag} top="-18px" right="60px" rot="-6deg" delay="0s" bg="#fff"/>
          <FloatingChip text="✨ Streak +7" top="120px" left="-32px" rot="-10deg" delay=".5s" bg="var(--mint)"/>
          <FloatingChip text="😄 Great" bottom="80px" right="-24px" rot="8deg" delay="1s" bg="var(--peach)" color="#fff"/>
          <FloatingChip text={t.ai.f3.tag} bottom="-12px" left="80px" rot="-4deg" delay="1.5s" bg="var(--purple)" color="#fff"/>
          <BrowserMockup/>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ text, top, right, bottom, left, rot, bg, color, delay }) {
  return (
    <div className="float-y" style={{
      position: 'absolute', top, right, bottom, left,
      padding: '8px 14px', borderRadius: 100, background: bg,
      fontSize: 13, fontWeight: 700, color: color || 'var(--ink)',
      boxShadow: '0 8px 24px -6px rgba(0,0,0,.18)',
      zIndex: 5, '--r': rot, transform: `rotate(${rot})`,
      animationDelay: delay,
    }}>{text}</div>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" fill="var(--mint)"/>
      <path d="M 4.5 8.5 L 7 11 L 11.5 5.5" stroke="#1A1320" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ---------------- TRUST STRIP ---------------- */
function TrustStrip() {
  const { t } = useLang();
  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 18 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '.04em', textTransform: 'uppercase', marginRight: 16 }}>
          <T>{t.trustStrip}</T>
        </span>
        {['Chula', 'Mahidol', 'KX', 'WildType', 'SCB 10X', 'TCDC'].map((n, i) => (
          <span key={n} style={{
            fontFamily: i % 2 ? 'serif' : 'var(--font-display)',
            fontWeight: 700, fontSize: 18,
            color: 'var(--ink-2)', opacity: .55,
            fontStyle: i === 1 || i === 3 ? 'italic' : 'normal',
          }}>{n}</span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- STATS BAND ---------------- */
function StatsBand() {
  const { t } = useLang();
  const items = [
    { v: '120K+', l: t.stats.e1 },
    { v: '4,800+', l: t.stats.e2 },
    { v: 'TH · EN', l: t.stats.e4 },
  ];
  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {items.map((it, i) => (
          <div key={i} style={{ padding: '0 0 0 22px', borderLeft: '2px solid var(--purple)' }}>
            <div className="h-display" style={{ fontSize: 44, lineHeight: 1 }}>{it.v}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 8, fontWeight: 600 }}><T>{it.l}</T></div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Nav = Nav;
window.Hero = Hero;
window.TrustStrip = TrustStrip;
window.StatsBand = StatsBand;
window.MoodFace = MoodFace;
window.MOODS = MOODS;
window.Logo = Logo;
window.Check = Check;
