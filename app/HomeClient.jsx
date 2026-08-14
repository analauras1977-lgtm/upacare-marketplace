'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from './components/Icon';
import NannyCard from './components/NannyCard';
import { getFeaturedNannies } from './lib/nannies';

const translations = {
  en: {
    hero_eyebrow: 'Miami · Trusted childcare marketplace',
    hero_title: 'Find the Perfect Nanny for Your Family',
    hero_subtitle: 'Connect with ID-verified, background-checked caregivers — verification is free, pricing is transparent, and there is no mandatory monthly membership.',
    browse_nannies: 'Browse Nannies',
    become_nanny: 'Become a Nanny',
    search_location: 'Search by neighborhood...',
    search_service: 'Select service...',
    search_btn: 'Search',
    stat1: 'Families served',
    stat2: 'Avg. nanny rating',
    stat3: 'Free verification',
    stat4: 'Support',
    featured: 'Featured Nannies',
    featured_sub: 'A sample of verified caregivers active in Miami right now',
    why_upacare: 'Why Families Choose UpaCare Over Other Platforms',
    diff1_title: 'Verification is free — not a paywall',
    diff1_desc: 'Many marketplaces charge nannies extra for background checks or charge families a monthly fee just to unlock contact info. Every UpaCare caregiver is ID-verified and background-checked at no extra cost.',
    diff2_title: 'No mandatory monthly membership',
    diff2_desc: 'Browse and message caregivers for free. You only pay when you actually book — unlike platforms that charge a recurring fee whether you hire someone or not.',
    diff3_title: 'Neighborhood social proof',
    diff3_desc: 'See how many families near you have already booked and recommended each nanny, so you are never choosing blind.',
    diff4_title: 'Corporate & event coverage',
    diff4_desc: 'Hotels, planners and offices can book on-demand childcare — not just families at home.',
    how_it_works: 'How It Works',
    step1: 'Search & compare',
    step1_desc: 'Filter by rating, certifications, languages and same-day availability.',
    step2: 'Message & interview',
    step2_desc: 'Chat directly with caregivers before you commit.',
    step3: 'Book & pay securely',
    step3_desc: 'Confirm the booking and pay through the platform — no cash needed.',
    testimonials: 'What Families & Nannies Say',
    cta_title: 'Ready to get started?',
    cta_desc: 'Join families and caregivers who trust UpaCare across Miami',
    signup_today: 'Sign Up Today',
  },
  es: {
    hero_eyebrow: 'Miami · Marketplace de cuidado infantil confiable',
    hero_title: 'Encuentra la Niñera Perfecta para tu Familia',
    hero_subtitle: 'Conecta con cuidadoras verificadas (ID y antecedentes) — la verificación es gratis, los precios son transparentes y no hay membresía mensual obligatoria.',
    browse_nannies: 'Ver Niñeras',
    become_nanny: 'Ser Niñera',
    search_location: 'Buscar por barrio...',
    search_service: 'Seleccionar servicio...',
    search_btn: 'Buscar',
    stat1: 'Familias atendidas',
    stat2: 'Calificación promedio',
    stat3: 'Verificación gratis',
    stat4: 'Soporte',
    featured: 'Niñeras Destacadas',
    featured_sub: 'Una muestra de cuidadoras verificadas activas hoy en Miami',
    why_upacare: 'Por Qué las Familias Eligen UpaCare',
    diff1_title: 'La verificación es gratis, no un cobro extra',
    diff1_desc: 'Muchas plataformas cobran a las niñeras por el chequeo de antecedentes o cobran a las familias una suscripción solo para desbloquear el contacto. En UpaCare toda cuidadora está verificada (ID y antecedentes) sin costo extra.',
    diff2_title: 'Sin membresía mensual obligatoria',
    diff2_desc: 'Busca y mensajea gratis. Solo pagas cuando realmente reservas — a diferencia de plataformas que cobran un cargo recurrente aunque no contrates a nadie.',
    diff3_title: 'Confianza del vecindario',
    diff3_desc: 'Ve cuántas familias cerca de ti ya reservaron y recomendaron a cada niñera, para que nunca elijas a ciegas.',
    diff4_title: 'Cobertura corporativa y eventos',
    diff4_desc: 'Hoteles, planificadores de eventos y oficinas pueden reservar cuidado infantil bajo demanda, no solo familias en casa.',
    how_it_works: 'Cómo Funciona',
    step1: 'Busca y compara',
    step1_desc: 'Filtra por calificación, certificaciones, idiomas y disponibilidad el mismo día.',
    step2: 'Mensajea y entrevista',
    step2_desc: 'Habla directamente con las cuidadoras antes de comprometerte.',
    step3: 'Reserva y paga seguro',
    step3_desc: 'Confirma la reserva y paga dentro de la plataforma — sin efectivo.',
    testimonials: 'Lo Que Dicen Familias y Niñeras',
    cta_title: '¿Listo para comenzar?',
    cta_desc: 'Únete a familias y cuidadoras que confían en UpaCare en Miami',
    signup_today: 'Regístrate Hoy',
  },
  he: {
    hero_eyebrow: 'מיאמי · פלטפורמת טיפול בילדים מהימנה',
    hero_title: 'מצאו את הבייביסיטרית המושלמת למשפחה שלכם',
    hero_subtitle: 'התחברו למטפלות מאומתות (תעודת זהות ובדיקת רקע) — האימות חינם, המחירים שקופים ואין חובת מנוי חודשי.',
    browse_nannies: 'חיפוש בייביסיטריות',
    become_nanny: 'הצטרפו כבייביסיטרית',
    search_location: 'חיפוש לפי שכונה...',
    search_service: 'בחרו שירות...',
    search_btn: 'חיפוש',
    stat1: 'משפחות שקיבלו שירות',
    stat2: 'דירוג ממוצע',
    stat3: 'אימות חינם',
    stat4: 'תמיכה',
    featured: 'בייביסיטריות מומלצות',
    featured_sub: 'מדגם של מטפלות מאומתות שפעילות כרגע במיאמי',
    why_upacare: 'למה משפחות בוחרות ב-UpaCare על פני פלטפורמות אחרות',
    diff1_title: 'האימות חינם — לא מאחורי תשלום',
    diff1_desc: 'הרבה פלטפורמות גובות תשלום נוסף מהבייביסיטריות עבור בדיקת רקע, או גובות מהמשפחות מנוי חודשי רק כדי לפתוח פרטי קשר. כל מטפלת ב-UpaCare מאומתת (תעודת זהות ובדיקת רקע) ללא עלות נוספת.',
    diff2_title: 'ללא חובת מנוי חודשי',
    diff2_desc: 'חפשו ושלחו הודעות בחינם. אתם משלמים רק כשאתם בפועל מזמינים — בניגוד לפלטפורמות שגובות תשלום קבוע גם אם לא שכרתם אף אחת.',
    diff3_title: 'אמון השכונה',
    diff3_desc: 'ראו כמה משפחות בקרבתכם כבר הזמינו והמליצו על כל מטפלת, כדי שלעולם לא תבחרו בעיניים עצומות.',
    diff4_title: 'כיסוי לעסקים ואירועים',
    diff4_desc: 'מלונות, מארגני אירועים ומשרדים יכולים להזמין טיפול בילדים לפי דרישה — לא רק משפחות בבית.',
    how_it_works: 'איך זה עובד',
    step1: 'חפשו והשוו',
    step1_desc: 'סננו לפי דירוג, הסמכות, שפות וזמינות באותו יום.',
    step2: 'שלחו הודעה וראיינו',
    step2_desc: 'שוחחו ישירות עם המטפלות לפני שאתם מתחייבים.',
    step3: 'הזמינו ושלמו בבטחה',
    step3_desc: 'אשרו את ההזמנה ושלמו דרך הפלטפורמה — ללא מזומן.',
    testimonials: 'מה משפחות ובייביסיטריות אומרות',
    cta_title: 'מוכנים להתחיל?',
    cta_desc: 'הצטרפו למשפחות ולמטפלות שסומכות על UpaCare ברחבי מיאמי',
    signup_today: 'הירשמו היום',
  },
};

const TESTIMONIALS = {
  en: [
    { quote: 'I found a bilingual nanny in two days, and the background check was already done — no extra fees.', name: 'Jennifer R.', role: 'Parent · Brickell' },
    { quote: 'I keep more of what I earn here than on other apps, and families can see my real reviews.', name: 'Rosa L.', role: 'Nanny · Doral' },
    { quote: 'We used UpaCare for on-demand babysitting at a corporate event — smooth and professional.', name: 'Daniel M.', role: 'Event Planner · Miami Beach' },
  ],
  es: [
    { quote: 'Encontré una niñera bilingüe en dos días, y el chequeo de antecedentes ya estaba hecho — sin cargos extra.', name: 'Jennifer R.', role: 'Mamá · Brickell' },
    { quote: 'Me quedo con más de lo que gano aquí que en otras apps, y las familias ven mis reseñas reales.', name: 'Rosa L.', role: 'Niñera · Doral' },
    { quote: 'Usamos UpaCare para cuidado infantil en un evento corporativo — todo muy profesional.', name: 'Daniel M.', role: 'Organizador de Eventos · Miami Beach' },
  ],
  he: [
    { quote: 'מצאתי בייביסיטרית דוברת שתי שפות תוך יומיים, ובדיקת הרקע כבר הייתה מוכנה — בלי עלויות נוספות.', name: 'Jennifer R.', role: 'הורה · Brickell' },
    { quote: 'אני שומרת יותר ממה שאני מרוויחה כאן לעומת אפליקציות אחרות, והמשפחות רואות את הביקורות האמיתיות שלי.', name: 'Rosa L.', role: 'בייביסיטרית · Doral' },
    { quote: 'השתמשנו ב-UpaCare לטיפול בילדים לפי דרישה באירוע עסקי — הכל היה חלק ומקצועי.', name: 'Daniel M.', role: 'מארגן אירועים · Miami Beach' },
  ],
};

export default function HomeClient() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLanguage(localStorage.getItem('language') || 'en');
  }, []);

  if (!mounted) return null;

  const t = translations[language] || translations.en;
  const nannies = getFeaturedNannies(3);
  const testimonials = TESTIMONIALS[language] || TESTIMONIALS.en;

  const stats = [
    { value: '500+', label: t.stat1 },
    { value: '4.8★', label: t.stat2 },
    { value: '100%', label: t.stat3 },
    { value: '24/7', label: t.stat4 },
  ];

  const diffs = [
    { icon: 'shieldCheck', title: t.diff1_title, desc: t.diff1_desc },
    { icon: 'wallet', title: t.diff2_title, desc: t.diff2_desc },
    { icon: 'users', title: t.diff3_title, desc: t.diff3_desc },
    { icon: 'briefcase', title: t.diff4_title, desc: t.diff4_desc },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-upa-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#E91E8C,transparent_45%),radial-gradient(circle_at_80%_0%,#00B894,transparent_40%)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <span className="eyebrow bg-white/10 text-white mb-6">{t.hero_eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">{t.hero_title}</h1>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto">{t.hero_subtitle}</p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-3xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input type="text" placeholder={t.search_location} className="input-field text-gray-800 md:col-span-2" />
              <select className="input-field text-gray-800">
                <option>{t.search_service}</option>
                <option>Babysitting</option>
                <option>Tutoring</option>
                <option>Cooking</option>
              </select>
              <Link href="/browse" className="btn-primary w-full">
                {t.search_btn}
              </Link>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/browse" className="btn-primary">
              {t.browse_nannies}
            </Link>
            <Link href="/for-nannies" className="btn-outline-inverse">
              {t.become_nanny}
            </Link>
          </div>
        </div>
      </section>

      {/* Trust stat bar */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-upa-ink">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Nannies */}
      <section className="section container-page">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-upa-ink">{t.featured}</h2>
          <p className="text-gray-500 mt-2">{t.featured_sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nannies.map((nanny) => (
            <NannyCard key={nanny.id} nanny={nanny} language={language} />
          ))}
        </div>
      </section>

      {/* Why UpaCare / competitive differentiation */}
      <section className="section bg-upa-cream">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-upa-ink">{t.why_upacare}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {diffs.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 card-shadow flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-upa-pink/10 text-upa-pink flex items-center justify-center">
                  <Icon name={item.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-upa-ink mb-1.5">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section container-page">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.how_it_works}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'chat', title: t.step1, desc: t.step1_desc },
            { icon: 'users', title: t.step2, desc: t.step2_desc },
            { icon: 'wallet', title: t.step3, desc: t.step3_desc },
          ].map((step, idx) => (
            <div key={step.title} className="text-center bg-white rounded-2xl p-8 card-shadow border border-gray-50">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-upa-pink text-white flex items-center justify-center font-bold text-lg">
                {idx + 1}
              </div>
              <Icon name={step.icon} className="w-6 h-6 mx-auto mb-3 text-upa-pink" />
              <h3 className="text-lg font-bold text-upa-ink mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-upa-ink text-white">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">{t.testimonials}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div key={item.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Icon name="star" className="w-5 h-5 text-amber-400 fill-amber-400 mb-3" />
                <p className="text-gray-200 mb-4 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-gray-400 text-xs">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-upa-pink text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t.cta_title}</h2>
          <p className="text-lg mb-8 text-white/90">{t.cta_desc}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup" className="bg-white text-upa-pink px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
              {t.signup_today}
            </Link>
            <Link href="/browse" className="btn-outline-inverse">
              {t.browse_nannies}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
