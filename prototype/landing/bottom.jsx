// DailyMood — bottom sections: testimonials, pricing, FAQ, CTA, footer

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const { t, lang } = useLang();
  return (
    <section className="section" style={{ background: 'var(--page-2)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 600 }}>
            <span className="eyebrow"><span className="dot"/> <T>{t.testimonials.eyebrow}</T></span>
            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', marginTop: 22 }}>
              <T>{t.testimonials.title}</T>
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }} className="t-grid">
          {t.testimonials.items.map((it, i) => (
            <figure key={i} style={{
              margin: 0, padding: 26, borderRadius: 20, background: '#fff',
              border: '1px solid var(--rule)',
              display: 'flex', flexDirection: 'column', gap: 18,
              transform: i % 2 ? 'translateY(20px)' : 'translateY(0)',
            }}>
              <blockquote style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--ink)', fontWeight: 500, flex: 1 }}>
                <T>"{it.q}"</T>
              </blockquote>
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 50,
                  background: `linear-gradient(135deg, ${['var(--peach)','var(--purple)','var(--mint)','var(--yellow)'][i]}, var(--lavender))`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: 14,
                }}>{it.n.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}><T>{it.n}</T></div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)' }}><T>{it.r}</T></div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
function Pricing() {
  const { t, lang } = useLang();
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
          <span className="eyebrow"><span className="dot"/> <T>{t.pricing.eyebrow}</T></span>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', margin: '22px 0 14px' }}>
            <T>{t.pricing.title}</T>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-2)' }}><T>{t.pricing.sub}</T></p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 920, margin: '0 auto' }}>
          {/* Free */}
          <div style={{
            padding: 36, borderRadius: 24, background: '#fff',
            border: '1.5px solid var(--rule)', display: 'flex', flexDirection: 'column', gap: 22,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                <T>{t.pricing.free.name}</T>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span className="h-display" style={{ fontSize: 56 }}>{t.pricing.free.price}</span>
                <span style={{ color: 'var(--ink-3)', fontSize: 15 }}><T>{t.pricing.free.per}</T></span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {t.pricing.free.feats.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15 }}>
                  <Check/><span><T>{f}</T></span>
                </li>
              ))}
            </ul>
            <a href="#cta" className="btn btn-ghost" style={{ width: '100%' }}><T>{t.pricing.free.cta}</T></a>
          </div>

          {/* Pro */}
          <div style={{
            padding: 36, borderRadius: 24, position: 'relative',
            background: 'linear-gradient(155deg, #2A1F33 0%, #1A1320 100%)',
            color: '#fff', display: 'flex', flexDirection: 'column', gap: 22,
            boxShadow: '0 30px 60px -20px rgba(166,115,241,.35)',
          }}>
            <div style={{
              position: 'absolute', top: -12, right: 32,
              padding: '6px 14px', borderRadius: 100,
              background: 'var(--peach)', color: '#fff',
              fontSize: 12, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase',
            }}><T>{t.pricing.pro.badge}</T></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#D9C2FF', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                <T>{t.pricing.pro.name}</T>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span className="h-display" style={{ fontSize: 56, color: '#fff' }}>{t.pricing.pro.price}</span>
                <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 14 }}><T>{t.pricing.pro.per}</T></span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {t.pricing.pro.feats.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: 'rgba(255,255,255,.92)' }}>
                  <span style={{ flexShrink: 0, marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="8" fill="var(--peach)"/>
                      <path d="M 4.5 8.5 L 7 11 L 11.5 5.5" stroke="#1A1320" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span><T>{f}</T></span>
                </li>
              ))}
            </ul>
            <a href="#cta" className="btn btn-peach" style={{ width: '100%' }}><T>{t.pricing.pro.cta}</T></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'flex-start' }}>
        <div style={{ position: 'sticky', top: 100 }}>
          <span className="eyebrow"><span className="dot"/> <T>{t.faq.eyebrow}</T></span>
          <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginTop: 22 }}>
            <T>{t.faq.title}</T>
          </h2>
        </div>
        <div>
          {t.faq.items.map((it, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--rule)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--font)', fontWeight: 700, fontSize: 18, color: 'var(--ink)',
              }}>
                <span style={{ paddingRight: 24 }}><T>{it.q}</T></span>
                <span style={{
                  flexShrink: 0, width: 32, height: 32, borderRadius: 50,
                  background: open === i ? 'var(--ink)' : 'transparent',
                  color: open === i ? '#fff' : 'var(--ink)',
                  border: open === i ? 'none' : '1.5px solid var(--rule)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 400,
                  transition: 'all .2s',
                }}>{open === i ? '–' : '+'}</span>
              </button>
              <div style={{
                maxHeight: open === i ? 300 : 0, overflow: 'hidden',
                transition: 'max-height .35s ease, padding .25s',
                paddingBottom: open === i ? 24 : 0,
              }}>
                <p style={{ margin: 0, fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 620 }}>
                  <T>{it.a}</T>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA BANNER ---------------- */
function CTABanner() {
  const { t } = useLang();
  return (
    <section id="cta" className="section" style={{ paddingBottom: 80 }}>
      <div className="container">
        <div style={{
          borderRadius: 32, padding: '72px 48px',
          background: 'linear-gradient(135deg, var(--peach) 0%, #F49EAB 45%, var(--purple) 100%)',
          color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* deco emojis */}
          <div style={{ position: 'absolute', top: 30, left: 60, fontSize: 32, opacity: .85, transform: 'rotate(-12deg)' }}>✨</div>
          <div style={{ position: 'absolute', bottom: 40, right: 70, fontSize: 36, opacity: .85, transform: 'rotate(15deg)' }}>🌿</div>
          <div style={{ position: 'absolute', top: 50, right: 90, fontSize: 26, opacity: .8, transform: 'rotate(8deg)' }}>☕</div>
          <div style={{ position: 'absolute', bottom: 50, left: 100, fontSize: 30, opacity: .8, transform: 'rotate(-8deg)' }}>📓</div>

          <h2 className="h-display" style={{ fontSize: 'clamp(34px, 5vw, 64px)', color: '#fff', maxWidth: 760, margin: '0 auto 18px' }}>
            <T>{t.cta.title}</T>
          </h2>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,.9)', maxWidth: 540, margin: '0 auto 32px' }}>
            <T>{t.cta.sub}</T>
          </p>
          <a href="#" className="btn" style={{
            background: '#fff', color: 'var(--ink)', height: 60, padding: '0 32px', fontSize: 17,
            boxShadow: '0 16px 40px -12px rgba(0,0,0,.3)',
          }}><T>{t.cta.btn}</T> →</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  const { t, lang, setLang } = useLang();
  return (
    <footer style={{ background: 'var(--night)', color: '#fff', paddingTop: 72, paddingBottom: 32 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: 40, marginBottom: 56 }}>
          <div>
            <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#fff', marginBottom: 16 }}>
              <Logo size={32}/>
              <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.01em' }}>DailyMood</span>
            </a>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 15, maxWidth: 320, margin: 0 }}>
              <T>{t.footer.tag}</T>
            </p>
          </div>
          {[['product', t.footer.product], ['legal', t.footer.legal]].map(([k, label]) => (
            <div key={k}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 18 }}>
                <T>{label}</T>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {t.footer.links[k].map(([n, h], i) => (
                  <li key={i}>
                    <a href={h} style={{ color: 'rgba(255,255,255,.85)', textDecoration: 'none', fontSize: 15 }}>
                      <T>{n}</T>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ color: 'rgba(255,255,255,.55)', fontSize: 13 }}>
            <T>{t.footer.copy}</T>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              style={{
                padding: '7px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,.15)',
                background: 'transparent', color: '#fff', fontFamily: 'var(--font)',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>
              🌐 {lang === 'th' ? 'ภาษาไทย' : 'English'} ↔
            </button>
            <span style={{ color: 'rgba(255,255,255,.45)', fontSize: 13 }}>dailymood.me</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Testimonials = Testimonials;
window.Pricing = Pricing;
window.FAQ = FAQ;
window.CTABanner = CTABanner;
window.Footer = Footer;
