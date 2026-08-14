'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import InviteBanner from '../components/InviteBanner';

const translations = {
  en: {
    headline: 'Professional Childcare, Just a Click Away',
    subtitle: 'Find ID-verified, background-checked nannies in your Miami neighborhood — verification is included at no extra cost.',
    get_started: 'Get Started',
    how_it_works: 'How It Works',
    step1: 'Create Your Account',
    step1_desc: 'Sign up and tell us about your childcare needs',
    step2: 'Browse Nannies',
    step2_desc: 'Filter by rating, certifications, languages and availability',
    step3: 'Connect & Hire',
    step3_desc: 'Message nannies and arrange interviews',
    step4: 'Pay Securely',
    step4_desc: 'Use our secure in-app payment system',
    benefits: 'Why Families Love UpaCare',
    verified: 'Verified Nannies, Free',
    verified_desc: 'ID and background checks are included for every caregiver — not an optional paid add-on.',
    flexible: 'Flexible Scheduling',
    flexible_desc: 'Filter by same-day availability when you need a sitter fast.',
    transparent: 'Transparent Pricing',
    transparent_desc: 'Each nanny sets a clear hourly rate. No hidden booking surcharges.',
    support: 'Customer Support',
    support_desc: 'Our team is here 24/7 in English and Spanish.',
    pricing: 'Pricing Plans',
    pricing_sub: 'No platform charges you a monthly fee just to browse — you only pay when you book.',
    basic: 'Free',
    basic_price: '$0',
    basic_period: 'forever',
    basic_features: 'Browse all nannies, View full profiles, Message caregivers, Book & pay per session',
    premium: 'Premium',
    premium_price: '$9.99',
    premium_period: '/month',
    premium_features: 'Everything in Free, Same-day booking priority, Waived service fee, Priority support',
    compare_title: 'How UpaCare Compares',
    compare_upa: 'UpaCare',
    compare_others: 'Typical Marketplace',
    row1: 'Monthly fee to browse & message',
    upa1: 'Not required',
    other1: '$35–$39/mo',
    row2: 'Background check for families',
    upa2: 'Included, free',
    other2: 'Often optional / paid',
    row3: 'Corporate & event bookings',
    upa3: 'Yes',
    other3: 'Rarely',
    row4: 'Neighborhood social proof',
    upa4: 'Yes',
    other4: 'Sometimes',
    cta_title: 'Ready to Find the Perfect Nanny?',
    cta_desc: 'Join families across Miami finding trusted care',
  },
  es: {
    headline: 'Cuidado Infantil Profesional, A un Click',
    subtitle: 'Encuentra niñeras verificadas (ID y antecedentes) en tu barrio de Miami — la verificación está incluida sin costo extra.',
    get_started: 'Comenzar',
    how_it_works: 'Cómo Funciona',
    step1: 'Crea tu Cuenta',
    step1_desc: 'Regístrate y cuéntanos tus necesidades',
    step2: 'Busca Niñeras',
    step2_desc: 'Filtra por calificación, certificaciones, idiomas y disponibilidad',
    step3: 'Conecta y Contrata',
    step3_desc: 'Mensajea con niñeras y realiza entrevistas',
    step4: 'Paga de Forma Segura',
    step4_desc: 'Usa nuestro sistema de pagos seguro dentro de la app',
    benefits: 'Por Qué las Familias Aman UpaCare',
    verified: 'Niñeras Verificadas, Gratis',
    verified_desc: 'La verificación de ID y antecedentes está incluida para toda cuidadora — no es un extra opcional que se paga.',
    flexible: 'Horarios Flexibles',
    flexible_desc: 'Filtra por disponibilidad el mismo día cuando necesites una niñera rápido.',
    transparent: 'Precios Transparentes',
    transparent_desc: 'Cada niñera define una tarifa clara por hora. Sin cargos ocultos.',
    support: 'Soporte al Cliente',
    support_desc: 'Nuestro equipo está disponible 24/7 en inglés y español.',
    pricing: 'Planes de Precios',
    pricing_sub: 'Ninguna membresía es obligatoria para buscar — solo pagas cuando reservas.',
    basic: 'Gratis',
    basic_price: '$0',
    basic_period: 'siempre',
    basic_features: 'Ver todas las niñeras, Perfiles completos, Mensajear cuidadoras, Reservar y pagar por sesión',
    premium: 'Premium',
    premium_price: '$9.99',
    premium_period: '/mes',
    premium_features: 'Todo lo de Gratis, Prioridad en reservas same-day, Sin cargo por servicio, Soporte prioritario',
    compare_title: 'Cómo se Compara UpaCare',
    compare_upa: 'UpaCare',
    compare_others: 'Marketplace Típico',
    row1: 'Cuota mensual para buscar y mensajear',
    upa1: 'No es necesaria',
    other1: '$35–$39/mes',
    row2: 'Chequeo de antecedentes para familias',
    upa2: 'Incluido, gratis',
    other2: 'A menudo opcional / pago',
    row3: 'Reservas corporativas y eventos',
    upa3: 'Sí',
    other3: 'Raramente',
    row4: 'Confianza del vecindario',
    upa4: 'Sí',
    other4: 'A veces',
    cta_title: '¿Listo para Encontrar la Niñera Perfecta?',
    cta_desc: 'Únete a familias en todo Miami que encontraron cuidado de confianza',
  },
  he: {
    headline: 'טיפול מקצועי בילדים, במרחק קליק אחד',
    subtitle: 'מצאו בייביסיטריות מאומתות (תעודת זהות ובדיקת רקע) בשכונה שלכם במיאמי — האימות כלול ללא עלות נוספת.',
    get_started: 'התחילו עכשיו',
    how_it_works: 'איך זה עובד',
    step1: 'צרו חשבון',
    step1_desc: 'הירשמו וספרו לנו על הצרכים שלכם בטיפול בילדים',
    step2: 'חפשו בייביסיטריות',
    step2_desc: 'סננו לפי דירוג, הסמכות, שפות וזמינות',
    step3: 'התחברו ושכרו',
    step3_desc: 'שלחו הודעות למטפלות וקבעו ראיונות',
    step4: 'שלמו בבטחה',
    step4_desc: 'השתמשו במערכת התשלומים המאובטחת שלנו בתוך האפליקציה',
    benefits: 'למה משפחות אוהבות את UpaCare',
    verified: 'בייביסיטריות מאומתות, בחינם',
    verified_desc: 'בדיקת תעודת זהות ובדיקת רקע כלולות עבור כל מטפלת — לא תוספת בתשלום.',
    flexible: 'לוח זמנים גמיש',
    flexible_desc: 'סננו לפי זמינות באותו יום כשאתם צריכים מטפלת במהירות.',
    transparent: 'מחירים שקופים',
    transparent_desc: 'כל מטפלת קובעת תעריף שעתי ברור. ללא עמלות נסתרות.',
    support: 'שירות לקוחות',
    support_desc: 'הצוות שלנו זמין 24/7 באנגלית ובספרדית.',
    pricing: 'תוכניות מחירים',
    pricing_sub: 'אף פלטפורמה לא גובה מכם מנוי חודשי רק כדי לחפש — אתם משלמים רק כשאתם מזמינים.',
    basic: 'חינם',
    basic_price: '$0',
    basic_period: 'לתמיד',
    basic_features: 'חיפוש בכל הבייביסיטריות, צפייה בפרופילים מלאים, שליחת הודעות למטפלות, הזמנה ותשלום לפי מפגש',
    premium: 'פרימיום',
    premium_price: '$9.99',
    premium_period: '/חודש',
    premium_features: 'כל מה שבחינם, עדיפות בהזמנות לאותו יום, ללא עמלת שירות, תמיכה בעדיפות',
    compare_title: 'איך UpaCare משתווה',
    compare_upa: 'UpaCare',
    compare_others: 'פלטפורמה טיפוסית',
    row1: 'עמלה חודשית לחיפוש ולשליחת הודעות',
    upa1: 'לא נדרשת',
    other1: '$35–$39/חודש',
    row2: 'בדיקת רקע עבור משפחות',
    upa2: 'כלולה, בחינם',
    other2: 'לרוב אופציונלי / בתשלום',
    row3: 'הזמנות לעסקים ולאירועים',
    upa3: 'כן',
    other3: 'לעיתים רחוקות',
    row4: 'אמון השכונה',
    upa4: 'כן',
    other4: 'לפעמים',
    cta_title: 'מוכנים למצוא את הבייביסיטרית המושלמת?',
    cta_desc: 'הצטרפו למשפחות ברחבי מיאמי שמצאו טיפול מהימן',
  },
};

export default function ForFamiliesClient() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLanguage(localStorage.getItem('language') || 'en');
  }, []);

  if (!mounted) return null;
  const t = translations[language] || translations.en;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-upa-ink text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">{t.headline}</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">{t.subtitle}</p>
          <Link href="/signup" className="bg-upa-pink text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-upa-pinkdark transition">
            {t.get_started}
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-upa-cream">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.how_it_works}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: 'idCard', title: t.step1, desc: t.step1_desc },
              { icon: 'users', title: t.step2, desc: t.step2_desc },
              { icon: 'chat', title: t.step3, desc: t.step3_desc },
              { icon: 'wallet', title: t.step4, desc: t.step4_desc },
            ].map((step) => (
              <div key={step.title} className="text-center bg-white rounded-2xl p-6 card-shadow">
                <Icon name={step.icon} className="w-8 h-8 mx-auto mb-4 text-upa-pink" />
                <h3 className="text-lg font-bold mb-2 text-upa-ink">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section container-page">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.benefits}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: 'shieldCheck', title: t.verified, desc: t.verified_desc },
            { icon: 'bolt', title: t.flexible, desc: t.flexible_desc },
            { icon: 'wallet', title: t.transparent, desc: t.transparent_desc },
            { icon: 'chat', title: t.support, desc: t.support_desc },
          ].map((benefit) => (
            <div key={benefit.title} className="flex gap-4 p-6 bg-upa-lightpink/40 rounded-2xl">
              <Icon name={benefit.icon} className="w-8 h-8 text-upa-pink shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-1.5 text-upa-ink">{benefit.title}</h3>
                <p className="text-gray-700 text-sm">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-upa-cream">
        <div className="container-page">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-upa-ink">{t.pricing}</h2>
            <p className="text-gray-500 mt-2">{t.pricing_sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-10">
            {[
              { name: t.basic, price: t.basic_price, period: t.basic_period, features: t.basic_features, highlight: false },
              { name: t.premium, price: t.premium_price, period: t.premium_period, features: t.premium_features, highlight: true },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl overflow-hidden card-shadow bg-white ${plan.highlight ? 'ring-2 ring-upa-pink' : ''}`}
              >
                <div className={`p-6 ${plan.highlight ? 'bg-upa-pink text-white' : 'bg-upa-ink text-white'}`}>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-3xl font-extrabold mt-3">
                    {plan.price} <span className="text-sm font-medium opacity-80">{plan.period}</span>
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {plan.features.split(',').map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-gray-700 text-sm">
                        <Icon name="check" className="w-4 h-4 text-upa-mintdark mt-0.5 shrink-0" />
                        {feature.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6 text-upa-ink">{t.compare_title}</h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-upa-ink text-white">
                    <th className="text-left font-semibold p-4"></th>
                    <th className="text-left font-semibold p-4">{t.compare_upa}</th>
                    <th className="text-left font-semibold p-4">{t.compare_others}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [t.row1, t.upa1, t.other1],
                    [t.row2, t.upa2, t.other2],
                    [t.row3, t.upa3, t.other3],
                    [t.row4, t.upa4, t.other4],
                  ].map(([label, upa, other], idx) => (
                    <tr key={label} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 font-medium text-gray-700">{label}</td>
                      <td className="p-4 font-semibold text-upa-mintdark">{upa}</td>
                      <td className="p-4 text-gray-500">{other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Referral */}
      <section className="section container-page max-w-4xl">
        <InviteBanner language={language} audience="family" />
      </section>

      {/* CTA */}
      <section className="section bg-upa-pink text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t.cta_title}</h2>
          <p className="text-lg mb-8 text-white/90">{t.cta_desc}</p>
          <Link href="/signup" className="bg-white text-upa-pink px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
            {t.get_started}
          </Link>
        </div>
      </section>
    </div>
  );
}
