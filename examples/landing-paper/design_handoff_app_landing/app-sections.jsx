// ============================================================
// DailyMood Paper Desk — APP edition sections
// Mobile-app landing: real phone screenshots, App Store + Google Play.
// Reuses primitives from pp-parts.jsx and unchanged sections from pp-sections.jsx.
// New/overriding components are named *App / *Shot to avoid collisions.
// ============================================================
const { MOODS, MoodFace, Logo, LogoLockup, Paperclip, Sticker, Folder, Check, FeatIcon, Arrow } = window;

/* =================== STORE BADGES =================== */
function AppleMark({ s=22 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 384 512" fill="currentColor" style={{ display:'block' }}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
    </svg>
  );
}
function PlayMark({ s=20 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 44" style={{ display:'block' }}>
      <path d="M3.4 1.9 22.6 21 3.4 40.1c-.5-.3-.84-.86-.84-1.6V3.5c0-.74.34-1.3.84-1.6z" fill="#00D2FF"/>
      <path d="M3.4 1.9c.18-.1.38-.16.6-.16.32 0 .65.1.95.28L28.3 15.6l-5.7 5.4z" fill="#00F076"/>
      <path d="M22.6 21l5.7 5.4-22.35 12.96c-.3.18-.63.28-.95.28-.22 0-.42-.06-.6-.16z" fill="#FF3A44"/>
      <path d="M28.3 15.6 35 19.5c.78.45 1.18 1.05 1.18 1.6 0 .55-.4 1.15-1.18 1.6l-6.7 3.7-5.7-5.4z" fill="#FFC900"/>
    </svg>
  );
}
function StoreBadges({ lang, size='lg' }) {
  const big = size==='lg';
  const h = big ? 58 : 52;
  const base = {
    display:'inline-flex', alignItems:'center', gap:11, height:h, padding: big?'0 20px 0 16px':'0 16px 0 13px',
    borderRadius:14, background:'var(--ink)', color:'#fff', textDecoration:'none',
    boxShadow:'0 8px 0 -2px #000, 0 16px 28px -16px rgba(0,0,0,.6)', transition:'transform .14s ease, box-shadow .2s ease',
  };
  const small = { fontSize:10.5, fontWeight:700, letterSpacing:'.04em', opacity:.78, lineHeight:1, textTransform:'uppercase' };
  const big2 = { fontSize: big?19:17, fontWeight:800, letterSpacing:'-.01em', lineHeight:1.05, marginTop:3 };
  return (
    <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
      <a href="#download" className="storebadge" style={base}>
        <AppleMark s={big?26:23}/>
        <span style={{ display:'flex', flexDirection:'column' }}>
          <span style={small}>{lang==='th'?'ดาวน์โหลดบน':'Download on the'}</span>
          <span style={big2}>App Store</span>
        </span>
      </a>
      <a href="#download" className="storebadge" style={base}>
        <PlayMark s={big?24:21}/>
        <span style={{ display:'flex', flexDirection:'column' }}>
          <span style={small}>{lang==='th'?'มีให้บน':'Get it on'}</span>
          <span style={big2}>Google Play</span>
        </span>
      </a>
    </div>
  );
}

/* =================== PHONE SHOT =================== */
function PhoneShot({ src, w=320, alt='DailyMood app', style, className }) {
  return (
    <img src={src} alt={alt} className={className}
      style={{ width:w, maxWidth:'100%', height:'auto', display:'block',
        filter:'drop-shadow(0 44px 64px rgba(40,20,10,.34)) drop-shadow(0 8px 16px rgba(40,20,10,.18))', ...style }}/>
  );
}

/* soft color blob behind a phone */
function Blob({ color, style }) {
  return <div aria-hidden="true" style={{ position:'absolute', borderRadius:'50%', filter:'blur(46px)', opacity:.55, background:color, ...style }}/>;
}

/* =================== NAV =================== */
function NavApp() {
  const { t, lang, setLang } = useLang();
  const [sc,setSc]=React.useState(false);
  React.useEffect(()=>{ const on=()=>setSc(window.scrollY>10); window.addEventListener('scroll',on); on(); return ()=>window.removeEventListener('scroll',on); },[]);
  return (
    <nav style={{ position:'sticky', top:0, zIndex:50, transition:'all .25s',
      background: sc?'rgba(247,240,228,.88)':'transparent', backdropFilter: sc?'saturate(160%) blur(12px)':'none',
      borderBottom: sc?'1px solid var(--line)':'1px solid transparent' }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:74 }}>
        <a href="#top" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', color:'var(--ink)' }}>
          <LogoLockup h={30}/>
        </a>
        <div className="nav-links" style={{ display:'flex', alignItems:'center', gap:28 }}>
          {[['features','#features'],['ai','#ai'],['pricing','#pricing'],['faq','#faq']].map(([k,h])=>(
            <a key={k} href={h} className="navlink"><T>{t.nav[k]}</T></a>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={()=>setLang(lang==='th'?'en':'th')} style={{ padding:'7px 12px', borderRadius:100, border:'2px solid var(--ink)', background:'transparent', fontFamily:'var(--font)', fontWeight:800, fontSize:13, cursor:'pointer', color:'var(--ink)' }}>
            <span style={{ opacity:lang==='th'?1:.4 }}>TH</span><span style={{ opacity:.3 }}> / </span><span style={{ opacity:lang==='en'?1:.4 }}>EN</span>
          </button>
          <a href="#download" className="btn btn-ink" style={{ height:44, fontSize:14, padding:'0 18px', borderRadius:12 }}>
            <T>{lang==='th'?'ดาวน์โหลด':'Download'}</T>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* =================== HERO =================== */
function HeroApp() {
  const { lang } = useLang();
  return (
    <section id="top" style={{ position:'relative', overflow:'hidden', paddingTop:40, paddingBottom:90 }}>
      <div className="container hero-grid" style={{ display:'grid', gridTemplateColumns:'1.04fr 1fr', gap:54, alignItems:'center' }}>
        <div>
          <span className="eyebrow">{lang==='th'?'✦ แอปไดอารีอารมณ์ ด้วย AI':'✦ AI mood-journal app'}</span>
          <h1 className="display" style={{ fontSize:'clamp(40px,6.2vw,80px)', margin:'22px 0 22px', color:'var(--ink)' }} >
            <span className={lang==='th'?'thai':''}>
              {lang==='th' ? <>บอกความรู้สึก<br/>แค่ <span className="mark"><span style={{ position:'relative' }}>แตะเดียว</span></span></>
                           : <>Tell how you feel<br/>in <span className="mark"><span style={{ position:'relative' }}>one tap</span></span></>}
            </span>
          </h1>
          <p className={lang==='th'?'thai':''} style={{ fontSize:19, color:'var(--ink-2)', maxWidth:500, marginBottom:28, fontWeight:500 }}>
            {lang==='th'
              ? 'แอปบันทึกอารมณ์บน iPhone และ Android ที่ให้ AI ช่วยสะท้อนบันทึก สรุปทุกเดือน และเห็นภาพรวมทั้งปี — ใช้แค่ไม่กี่วินาทีต่อวัน'
              : 'A mood journal for iPhone and Android. AI reflects your notes, recaps every month, and shows your whole year — in just seconds a day.'}
          </p>

          {/* store badges — primary action */}
          <StoreBadges lang={lang} size="lg"/>

          {/* trust + trial */}
          <div style={{ display:'flex', gap:18, marginTop:24, flexWrap:'wrap', alignItems:'center' }}>
            {[
              lang==='th'?'ฟรี · ไม่ต้องใส่บัตร':'Free · no card',
              lang==='th'?'ทดลอง Pro 14 วัน':'14-day Pro trial',
              lang==='th'?'ไทย + อังกฤษ':'TH + EN',
            ].map((tx,i)=>(
              <span key={i} className={lang==='th'?'thai':''} style={{ display:'flex', alignItems:'center', gap:7, fontSize:13.5, fontWeight:700, color:'var(--ink-2)' }}><Check/>{tx}</span>
            ))}
          </div>
        </div>

        {/* hero phone */}
        <div style={{ position:'relative', display:'grid', placeItems:'center' }}>
          <Blob color="var(--peach)" style={{ width:330, height:330, top:-10, right:30 }}/>
          <Blob color="var(--lavender)" style={{ width:300, height:300, bottom:0, left:10, opacity:.6 }}/>
          <Sticker face="great" color="#fff" size={58} className="floaty" style={{ bottom:64, right:'4%', '--r':'10deg', animationDelay:'.4s', zIndex:9 }}/>
          <div className="chip floaty" style={{ position:'absolute', top:90, left:'2%', zIndex:9, '--r':'-8deg', transform:'rotate(-8deg)', animationDelay:'.9s' }}>✨ Streak +7</div>
          <PhoneShot src="app-01-home.png" w={340} style={{ position:'relative', zIndex:5, transform:'rotate(1.4deg)' }}/>
        </div>
      </div>
    </section>
  );
}

/* =================== BY THE NUMBERS =================== */
function ByNumbersApp() {
  const { lang } = useLang();
  const items = lang==='th' ? [
    { n:'10', l:'อารมณ์ให้เลือก', s:'แตะเดียว บันทึกได้ทันที', c:'var(--peach)', f:'great' },
    { n:'2', l:'แพลตฟอร์ม', s:'iPhone และ Android', c:'var(--mint)', f:'okay' },
    { n:'365', l:'วันในภาพรวมทั้งปี', s:'เห็นทั้งปีในจอเดียว', c:'var(--lavender)', f:'calm' },
    { n:'2', l:'ภาษา ไทย + อังกฤษ', s:'ทั้งแอป และ AI สรุป', c:'var(--yellow)', f:'good' },
  ] : [
    { n:'10', l:'moods to pick', s:'one tap to log', c:'var(--peach)', f:'great' },
    { n:'2', l:'platforms', s:'iPhone and Android', c:'var(--mint)', f:'okay' },
    { n:'365', l:'days in your year view', s:'whole year on one screen', c:'var(--lavender)', f:'calm' },
    { n:'2', l:'languages · TH + EN', s:'both app and AI summaries', c:'var(--yellow)', f:'good' },
  ];
  return (
    <section style={{ padding:'56px 0 26px', position:'relative' }}>
      <div className="container">
        <div className="grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {items.map((it,i)=>(
            <div key={i} className="stacked" style={{ transform:`rotate(${(i%2?1:-1)*1.3}deg)` }}>
              <div className="sheet" style={{ padding:'24px 22px', borderRadius:14, background:'#fff' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span className="display" style={{ fontSize:48, color:it.c, lineHeight:1 }}>{it.n}</span>
                  <Sticker face={it.f} color={it.c} size={40} style={{ position:'relative', top:0, transform:'rotate(-6deg)' }}/>
                </div>
                <div className={lang==='th'?'thai':''} style={{ marginTop:12 }}>
                  <div style={{ fontWeight:800, fontSize:16 }}>{it.l}</div>
                  <div style={{ fontSize:13, color:'var(--ink-3)', marginTop:3 }}>{it.s}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== GENERIC SPOTLIGHT =================== */
function Spotlight({ id, reverse, eyebrow, ebClass, title, sub, bullets, src, accent, rot=-1.5, sticker, chip, bg }) {
  const { lang } = useLang();
  return (
    <section id={id} className="section" style={{ background:bg||'transparent', position:'relative', overflow:'hidden' }}>
      <div className="container grid-2 spotlight" style={{ display:'grid', gridTemplateColumns: reverse?'1fr 1.05fr':'1.05fr 1fr', gap:64, alignItems:'center' }}>
        {/* text */}
        <div style={{ order: reverse?2:1 }}>
          <span className={`eyebrow ${ebClass||''}`}>{eyebrow}</span>
          <h2 className={`display ${lang==='th'?'thai':''}`} style={{ fontSize:'clamp(30px,4.2vw,52px)', margin:'18px 0 16px' }}>{title}</h2>
          <p className={lang==='th'?'thai':''} style={{ fontSize:18, color:'var(--ink-2)', maxWidth:460, margin:0 }}>{sub}</p>
          {bullets && (
            <ul style={{ listStyle:'none', padding:0, margin:'24px 0 0', display:'flex', flexDirection:'column', gap:13 }}>
              {bullets.map((b,i)=>(
                <li key={i} className={lang==='th'?'thai':''} style={{ display:'flex', gap:12, alignItems:'flex-start', fontSize:16, fontWeight:600, color:'var(--ink)' }}>
                  <span style={{ flexShrink:0, width:26, height:26, borderRadius:9, background:accent.bg, color:accent.fg, display:'grid', placeItems:'center', fontSize:15 }}>{b.ic}</span>
                  <span>{b.t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* phone */}
        <div style={{ order: reverse?1:2, position:'relative', display:'grid', placeItems:'center' }}>
          <Blob color={accent.blob} style={{ width:340, height:340, inset:0, margin:'auto' }}/>
          {sticker && <Sticker face={sticker.f} color={sticker.c||'#fff'} size={54} className="floaty" style={{ ...sticker.pos, zIndex:9 }}/>}
          {chip && <div className="chip floaty" style={{ position:'absolute', zIndex:9, '--r':chip.r||'-6deg', transform:`rotate(${chip.r||'-6deg'})`, animationDelay:'.7s', ...chip.pos }}>{chip.txt}</div>}
          <PhoneShot src={src} w={318} style={{ position:'relative', zIndex:5, transform:`rotate(${rot}deg)` }}/>
        </div>
      </div>
    </section>
  );
}

/* =================== 1 · CAPTURE =================== */
function CaptureSpotlight() {
  const { lang } = useLang();
  return (
    <Spotlight id="capture" reverse rot={-1.6}
      eyebrow={lang==='th'?'บันทึกง่าย':'QUICK CAPTURE'}
      title={lang==='th'?<>เขียนสั้น ๆ<br/>ให้ AI เข้าใจที่เหลือ</>:<>Write a little.<br/>AI gets the rest.</>}
      sub={lang==='th'?'พิมพ์ พูด ถ่ายรูป หรือปักหมุดสถานที่ แล้วเลือกกิจกรรมของวัน — แตะ "วิเคราะห์" ให้ AI สรุปให้':'Type, talk, snap a photo, or drop a pin, then tag the day’s activities — tap Analyse and AI does the rest.'}
      src="app-02-ai-journal.png"
      accent={{ bg:'rgba(166,115,241,.16)', fg:'var(--purple)', blob:'var(--lavender)' }}
      sticker={{ f:'good', c:'#fff', pos:{ top:40, right:'6%', '--r':'8deg' } }}
      chip={{ txt: lang==='th'?'🎙️ พูดได้เลย':'🎙️ Just speak', r:'-7deg', pos:{ bottom:80, left:'2%' } }}
      bullets={lang==='th'?[
        { ic:'⌨️', t:'พิมพ์โน้ตสั้น ๆ หรือพูดด้วยเสียง' },
        { ic:'📷', t:'แนบรูปและปักหมุดสถานที่' },
        { ic:'🏷️', t:'เลือกกิจกรรม เช่น ทำงาน ออกกำลังกาย เจอเพื่อน' },
      ]:[
        { ic:'⌨️', t:'Type a short note or dictate by voice' },
        { ic:'📷', t:'Attach a photo and drop a location pin' },
        { ic:'🏷️', t:'Tag activities — work, exercise, friends' },
      ]}
    />
  );
}

/* =================== 2 · AI REFLECT (dark plum) =================== */
function AIReflectShowcase() {
  const { lang } = useLang();
  const modes = lang==='th' ? [
    { tag:'รับรู้อารมณ์', d:'AI สะท้อนสิ่งที่คุณรู้สึก ด้วยน้ำเสียงที่เข้าใจ ไม่ตัดสิน', c:'var(--peach)' },
    { tag:'มองหาสิ่งสำคัญ', d:'ดึงประเด็นและสิ่งที่ส่งผลต่ออารมณ์ในวันนั้นออกมาให้เห็น', c:'var(--mint)' },
    { tag:'เขียนสรุปสั้น ๆ', d:'สรุปบันทึกเป็นไม่กี่ประโยค อ่านย้อนได้ง่ายในภายหลัง', c:'var(--lavender)' },
  ] : [
    { tag:'Acknowledge', d:'AI reflects what you felt — warm, understanding, never judging.', c:'var(--peach)' },
    { tag:'Find what matters', d:'It surfaces the themes and triggers that shaped your day.', c:'var(--mint)' },
    { tag:'Short summary', d:'Your entry condensed to a few lines, easy to revisit later.', c:'var(--lavender)' },
  ];
  return (
    <section id="ai" className="section">
      <div className="container">
        <Folder
          tab={lang==='th'?'✦ AI · สะท้อนบันทึก':'✦ AI · reflection'} tabClass="peach"
          sheetClass="plum"
          bodyStyle={{ padding:'52px 48px', borderRadius:'4px 26px 26px 26px', overflow:'hidden', position:'relative' }}>
          <Paperclip color="#6b6275" style={{ top:-16, right:40, left:'auto', transform:'rotate(8deg)' }}/>
          <div className="grid-2 reflect-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center' }}>
            <div>
              <h2 className={`display ${lang==='th'?'thai':''}`} style={{ color:'#fff', fontSize:'clamp(30px,4.2vw,52px)', margin:0 }}>
                {lang==='th'?<>ให้ AI <span style={{ background:'linear-gradient(135deg,#FCA45B,#A673F1)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', fontStyle:'italic' }}>สะท้อน</span><br/>บันทึกของคุณ</>
                            :<>Let AI <span style={{ background:'linear-gradient(135deg,#FCA45B,#A673F1)', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent', fontStyle:'italic' }}>reflect</span><br/>your journal</>}
              </h2>
              <p className={lang==='th'?'thai':''} style={{ fontSize:18, color:'rgba(255,255,255,.72)', maxWidth:480, marginTop:16 }}>
                {lang==='th'?'หลังบันทึก AI จะอ่านสิ่งที่คุณเขียนแล้วสะท้อนกลับใน 3 มุม':'After you log, AI reads your entry and reflects it back in three ways.'}
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:28 }}>
                {modes.map((m,i)=>(
                  <div key={i} style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', borderRadius:14, padding:'16px 18px' }}>
                    <span style={{ display:'inline-block', fontSize:13, fontWeight:800, color:m.c, marginBottom:5 }} className={lang==='th'?'thai':''}>{m.tag}</span>
                    <p className={lang==='th'?'thai':''} style={{ margin:0, fontSize:14.5, color:'rgba(255,255,255,.78)', lineHeight:1.5 }}>{m.d}</p>
                  </div>
                ))}
              </div>
              <p className={lang==='th'?'thai':''} style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginTop:20 }}>
                {lang==='th'?'เป็นแค่มุมมองจาก AI ไว้ประกอบการตัดสินใจ':'Just an AI perspective, to support your own reflection.'}
              </p>
            </div>
            <div style={{ position:'relative', display:'grid', placeItems:'center' }}>
              <Blob color="#A673F1" style={{ width:330, height:330, inset:0, margin:'auto', opacity:.4 }}/>
              <PhoneShot src="app-03-ai-reflect.png" w={310} style={{ position:'relative', zIndex:5, transform:'rotate(1.6deg)', filter:'drop-shadow(0 44px 70px rgba(0,0,0,.5))' }}/>
            </div>
          </div>
        </Folder>
      </div>
    </section>
  );
}

/* =================== 3 · CALENDAR =================== */
function CalendarSpotlight() {
  const { lang } = useLang();
  return (
    <Spotlight id="calendar" rot={-1.5}
      eyebrow={lang==='th'?'ปฏิทิน · AI สรุป':'CALENDAR · AI RECAP'}
      title={lang==='th'?<>AI สรุปอารมณ์<br/>ให้ทุกเดือน</>:<>A monthly mood<br/>recap from AI</>}
      sub={lang==='th'?'มุมมองรายเดือน ไทม์ไลน์ และรายปี พร้อมสรุปที่บอกวันที่ดีที่สุด วันที่หนัก และสิ่งที่ส่งผล':'Month, timeline, and year views — with a recap of your best day, your hardest day, and what shaped them.'}
      src="app-04-calendar.png"
      accent={{ bg:'rgba(252,164,91,.18)', fg:'#C8742E', blob:'var(--peach)' }}
      sticker={{ f:'great', c:'#fff', pos:{ top:30, left:'2%', '--r':'-10deg' } }}
      chip={{ txt: lang==='th'?'⭐ วันที่ดีที่สุด':'⭐ Best day', r:'7deg', pos:{ bottom:70, right:'2%' } }}
      bullets={lang==='th'?[
        { ic:'🗓️', t:'สลับมุมมอง ปฏิทิน · ไทม์ไลน์ · รายปี' },
        { ic:'🔆', t:'AI ไฮไลต์วันที่ดีและวันที่หนัก' },
        { ic:'🔍', t:'แพทเทิร์นที่พบ พร้อมเหตุผลสั้น ๆ' },
      ]:[
        { ic:'🗓️', t:'Switch between calendar, timeline, and year' },
        { ic:'🔆', t:'AI highlights your best and hardest days' },
        { ic:'🔍', t:'Detected patterns, each with a short why' },
      ]}
    />
  );
}

/* =================== 4 · STATS =================== */
function StatsSpotlight() {
  const { lang } = useLang();
  return (
    <Spotlight id="stats" reverse rot={1.5} bg="var(--desk-2)"
      eyebrow={lang==='th'?'สถิติอารมณ์':'MOOD STATS'}
      title={lang==='th'?<>เห็นแนวโน้ม<br/>อารมณ์ชัดเจน</>:<>See your mood<br/>trends clearly</>}
      sub={lang==='th'?'กราฟแนวโน้มรายสัปดาห์ และสัดส่วนอารมณ์แบบเปอร์เซ็นต์ รู้ว่าช่วงไหนขึ้น ช่วงไหนลง':'A weekly trend line and a mood-mix breakdown by percentage — so you can see what lifts you and what drags.'}
      src="app-05-stats.png"
      accent={{ bg:'rgba(133,236,203,.28)', fg:'#2E9C76', blob:'var(--mint)' }}
      sticker={{ f:'okay', c:'#fff', pos:{ bottom:70, left:'4%', '--r':'9deg' } }}
      chip={{ txt: lang==='th'?'📈 มีความสุข 30%':'📈 Happy 30%', r:'-6deg', pos:{ top:50, right:'2%' } }}
      bullets={lang==='th'?[
        { ic:'📉', t:'กราฟแนวโน้มรายสัปดาห์/เดือน' },
        { ic:'🍩', t:'สัดส่วนอารมณ์ทั้งหมดแบบเปอร์เซ็นต์' },
        { ic:'⚡', t:'ผลของกิจกรรมต่ออารมณ์ บวกหรือลบ' },
      ]:[
        { ic:'📉', t:'Weekly and monthly trend lines' },
        { ic:'🍩', t:'Full mood mix, broken down by percentage' },
        { ic:'⚡', t:'How activities push your mood up or down' },
      ]}
    />
  );
}

/* =================== 5 · YEAR =================== */
function YearSpotlight() {
  const { lang } = useLang();
  return (
    <Spotlight id="year" rot={-1.4}
      eyebrow={lang==='th'?'ภาพรวมทั้งปี':'YEAR IN REVIEW'}
      title={lang==='th'?<>ภาพรวมทั้งปี<br/>ในหน้าเดียว</>:<>Your whole year,<br/>on one screen</>}
      sub={lang==='th'?'AI สรุปทั้งปี อารมณ์เด่น Streak สูงสุด และดาวน์โหลดรายงานเป็น PDF ได้':'A full-year AI recap with your standout mood, longest streak, and a downloadable PDF report.'}
      src="app-06-year.png"
      accent={{ bg:'rgba(212,190,228,.45)', fg:'var(--purple)', blob:'var(--lavender)' }}
      sticker={{ f:'great', c:'#fff', pos:{ top:36, right:'4%', '--r':'10deg' } }}
      chip={{ txt: lang==='th'?'🔥 Streak 12 วัน':'🔥 12-day streak', r:'-7deg', pos:{ bottom:80, left:'2%' } }}
      bullets={lang==='th'?[
        { ic:'✨', t:'AI สรุปทั้งปีเป็นเรื่องราวสั้น ๆ' },
        { ic:'😊', t:'อารมณ์เด่น และ Streak สูงสุด' },
        { ic:'📄', t:'ดาวน์โหลด AI report เป็น PDF (Pro)' },
      ]:[
        { ic:'✨', t:'A short AI story of your whole year' },
        { ic:'😊', t:'Your standout mood and longest streak' },
        { ic:'📄', t:'Download the AI report as a PDF (Pro)' },
      ]}
    />
  );
}

/* =================== FAQ (app-correct) =================== */
function FAQApp() {
  const { lang } = useLang();
  const [open,setOpen]=React.useState(0);
  const items = lang==='th' ? [
    { q:'ใช้ได้บนเครื่องอะไรบ้าง?', a:'DailyMood มีให้ดาวน์โหลดทั้งบน iPhone (App Store) และ Android (Google Play) ข้อมูลซิงก์ข้ามเครื่องผ่านบัญชีเดียวกัน' },
    { q:'แอปเก็บข้อมูลปลอดภัยแค่ไหน?', a:'ข้อมูลเข้ารหัสระหว่างส่ง รูปภาพใช้ลิงก์ที่หมดอายุใน 1 ชั่วโมง เราไม่ขายหรือแบ่งปันข้อมูลของคุณ' },
    { q:'AI ใช้บันทึกของฉันไป train โมเดลไหม?', a:'ไม่ DailyMood เรียกใช้ AI แบบ stateless บันทึกของคุณไม่ถูกเก็บไว้หรือถูกใช้ฝึกโมเดลใด ๆ' },
    { q:'ใช้ฟรีได้จริงไหม?', a:'ได้ — แผน Free ใช้ได้ตลอดไป บันทึกไม่จำกัด พร้อม AI วิเคราะห์ในจำนวนต่อวัน อัปเกรด Pro เมื่อต้องการ AI ไม่จำกัดและรายงาน PDF' },
    { q:'ยกเลิก Pro ได้ตอนไหน?', a:'ยกเลิกได้ตลอดผ่านการตั้งค่าของ App Store หรือ Google Play หลังยกเลิกใช้ฟีเจอร์ Pro ได้จนสิ้นรอบบิล' },
    { q:'มีภาษาอะไรบ้าง?', a:'รองรับภาษาไทยและอังกฤษทั้งในแอปและ AI สรุป สลับได้ทันทีในหน้าตั้งค่า' },
  ] : [
    { q:'Which devices does it run on?', a:'DailyMood is available on iPhone (App Store) and Android (Google Play). Your data syncs across devices with one account.' },
    { q:'How secure is my data?', a:'Data is encrypted in transit and image links expire in 1 hour. We never sell or share your data.' },
    { q:'Do you train AI on my entries?', a:'No. DailyMood calls AI statelessly — your entries are never stored externally or used to train any model.' },
    { q:'Is it really free?', a:'Yes — the Free plan is forever, with unlimited entries and a daily amount of AI analysis. Upgrade to Pro for unlimited AI and PDF reports.' },
    { q:'Can I cancel Pro any time?', a:'Yes — manage it from your App Store or Google Play settings. You keep Pro features until the period ends.' },
    { q:'Which languages are supported?', a:'Thai and English for both the app and AI summaries. Switch in settings any time.' },
  ];
  return (
    <section id="faq" className="section" style={{ background:'var(--desk-2)' }}>
      <div className="container grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:56, alignItems:'flex-start' }}>
        <div style={{ position:'sticky', top:100 }}>
          <span className="eyebrow">FAQ</span>
          <h2 className={`display ${lang==='th'?'thai':''}`} style={{ fontSize:'clamp(30px,4vw,48px)', marginTop:18 }}>{lang==='th'?'คำถามที่พบบ่อย':'Frequently asked'}</h2>
          <Sticker face="calm" color="var(--mint)" size={64} style={{ position:'relative', top:24, transform:'rotate(-8deg)' }}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {items.map((it,i)=>{
            const o=open===i;
            return (
              <div key={i} className="sheet" style={{ background:'#fff', borderRadius:14, boxShadow:'var(--shadow-sm)', overflow:'hidden' }}>
                <button onClick={()=>setOpen(o?-1:i)} className={lang==='th'?'thai':''} style={{ width:'100%', padding:'20px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, background:'transparent', border:'none', cursor:'pointer', textAlign:'left', fontFamily:'var(--font)', fontWeight:800, fontSize:17, color:'var(--ink)' }}>
                  <span>{it.q}</span>
                  <span style={{ flexShrink:0, width:32, height:32, borderRadius:50, background:o?'var(--ink)':'transparent', color:o?'#fff':'var(--ink)', border:o?'none':'2px solid var(--line)', display:'grid', placeItems:'center', fontSize:20, transition:'all .2s' }}>{o?'–':'+'}</span>
                </button>
                <div style={{ maxHeight:o?320:0, overflow:'hidden', transition:'max-height .35s ease' }}>
                  <p className={lang==='th'?'thai':''} style={{ margin:0, padding:'0 22px 22px', fontSize:15, color:'var(--ink-2)', lineHeight:1.6 }}>{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =================== CTA / DOWNLOAD =================== */
function CTAApp() {
  const { lang } = useLang();
  return (
    <section id="download" className="section" style={{ paddingBottom:80 }}>
      <div className="container">
        <Folder tab={lang==='th'?'ดาวน์โหลด':'Get the app'} tabClass="ink" style={{ transform:'rotate(-.4deg)' }}
          bodyStyle={{ borderRadius:'4px 26px 26px 26px', padding:'60px 40px', textAlign:'center', background:'linear-gradient(135deg,var(--peach) 0%,#F49EAB 48%,var(--purple) 100%)', color:'#fff', position:'relative', overflow:'hidden' }}>
          <Sticker face="great" color="#fff" size={58} className="floaty" style={{ top:28, left:'10%', '--r':'-12deg' }}/>
          <Sticker face="good" color="#fff" size={48} className="floaty" style={{ bottom:34, right:'12%', '--r':'10deg', animationDelay:'.6s' }}/>
          <Sticker face="calm" color="#fff" size={42} className="floaty" style={{ top:50, right:'18%', '--r':'6deg', animationDelay:'1s' }}/>
          <h2 className={`display ${lang==='th'?'thai':''}`} style={{ fontSize:'clamp(32px,5vw,60px)', color:'#fff', maxWidth:740, margin:'0 auto 14px' }}>
            {lang==='th'?'เริ่มรู้จักตัวเองดีขึ้นวันนี้':'Start knowing yourself better today'}
          </h2>
          <p className={lang==='th'?'thai':''} style={{ fontSize:19, color:'rgba(255,255,255,.92)', maxWidth:520, margin:'0 auto 30px', fontWeight:500 }}>
            {lang==='th'?'ดาวน์โหลดฟรีบน iPhone และ Android · ไม่ต้องใส่บัตรเครดิต':'Free on iPhone and Android · no credit card required'}
          </p>
          <div style={{ display:'flex', justifyContent:'center' }}>
            <StoreBadges lang={lang} size="lg"/>
          </div>
        </Folder>
      </div>
    </section>
  );
}

/* =================== FOOTER (app + web-app link) =================== */
function FooterApp() {
  const { t, lang, setLang } = useLang();
  return (
    <footer style={{ background:'var(--plum)', color:'#fff', paddingTop:64, paddingBottom:30, position:'relative', zIndex:1 }}>
      <div className="container">
        {/* web app callout row */}
        <a href="https://app.dailymood.app" target="_blank" rel="noopener"
          style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:20, flexWrap:'wrap',
            textDecoration:'none', color:'#fff', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.14)',
            borderRadius:18, padding:'22px 26px', marginBottom:44 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <span style={{ width:46, height:46, borderRadius:12, background:'rgba(255,255,255,.1)', display:'grid', placeItems:'center', fontSize:24, flexShrink:0 }}>💻</span>
            <div>
              <div className={lang==='th'?'thai':''} style={{ fontWeight:800, fontSize:18 }}>{lang==='th'?'อยากใช้บนคอมพิวเตอร์?':'Prefer the desktop?'}</div>
              <div className={lang==='th'?'thai':''} style={{ fontSize:14, color:'rgba(255,255,255,.62)', marginTop:2 }}>{lang==='th'?'เปิด DailyMood เวอร์ชันเว็บได้จากเบราว์เซอร์ ไม่ต้องติดตั้ง':'Open the DailyMood web app in your browser — no install needed.'}</div>
            </div>
          </div>
          <span className={lang==='th'?'thai':''} style={{ display:'inline-flex', alignItems:'center', gap:8, fontWeight:800, fontSize:15, padding:'11px 18px', borderRadius:11, background:'#fff', color:'var(--plum)', flexShrink:0 }}>
            {lang==='th'?'เปิดเว็บแอป':'Open web app'} <Arrow/>
          </span>
        </a>

        <div className="grid-3" style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr', gap:40, marginBottom:48 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:14 }}><Logo size={36}/><span style={{ fontWeight:800, fontSize:22 }}>Dailymood</span></div>
            <p className={lang==='th'?'thai':''} style={{ color:'rgba(255,255,255,.6)', fontSize:15, maxWidth:300, margin:'0 0 18px' }}>{t.footer.tag}</p>
            <StoreBadges lang={lang} size="sm"/>
          </div>
          {[['product',t.footer.product],['legal',t.footer.legal]].map(([k,label])=>(
            <div key={k}>
              <div style={{ fontSize:13, fontWeight:800, color:'rgba(255,255,255,.55)', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:16 }}><T>{label}</T></div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:11 }}>
                {t.footer.links[k].map(([n,h],i)=>(<li key={i}><a href={h} className={lang==='th'?'thai':''} style={{ color:'rgba(255,255,255,.85)', textDecoration:'none', fontSize:15 }}>{n}</a></li>))}
                {k==='product' && (
                  <li><a href="https://app.dailymood.app" target="_blank" rel="noopener" className={lang==='th'?'thai':''} style={{ color:'rgba(255,255,255,.85)', textDecoration:'none', fontSize:15 }}>{lang==='th'?'เว็บแอป':'Web app'}</a></li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop:26, borderTop:'1px solid rgba(255,255,255,.1)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
          <div className={lang==='th'?'thai':''} style={{ color:'rgba(255,255,255,.5)', fontSize:13 }}>{t.footer.copy}</div>
          <button onClick={()=>setLang(lang==='th'?'en':'th')} style={{ padding:'7px 14px', borderRadius:100, border:'1px solid rgba(255,255,255,.18)', background:'transparent', color:'#fff', fontFamily:'var(--font)', fontWeight:800, fontSize:13, cursor:'pointer' }}>
            🌐 {lang==='th'?'ภาษาไทย':'English'} ↔
          </button>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  NavApp, HeroApp, ByNumbersApp, StoreBadges, PhoneShot, Spotlight,
  CaptureSpotlight, AIReflectShowcase, CalendarSpotlight, StatsSpotlight, YearSpotlight,
  FAQApp, CTAApp, FooterApp,
});
