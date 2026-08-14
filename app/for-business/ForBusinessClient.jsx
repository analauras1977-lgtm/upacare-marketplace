'use client';

import { useState, useEffect } from 'react';
import Icon from '../components/Icon';

const translations = {
  en: {
    eyebrow: 'For Business',
    headline: 'On-Demand Childcare for Hotels, Events & Offices',
    subtitle:
      'Hotels, event planners and corporate offices in Miami can book verified caregivers on demand — not just families at home.',
    cta: 'Request a Quote',
    who_title: 'Who We Work With',
    who1: 'Hotels & Resorts',
    who1_desc: 'On-site or in-room babysitting for guests, coordinated with your concierge team.',
    who2: 'Weddings & Events',
    who2_desc: 'Dedicated childcare stations so parents can enjoy the event.',
    who3: 'Corporate Offices',
    who3_desc: 'On-demand or scheduled childcare as an employee benefit.',
    who4: 'Conferences & Expos',
    who4_desc: 'Group childcare coverage for multi-day events.',
    diff_title: 'Why Businesses Choose UpaCare',
    diff1: 'Every caregiver assigned is ID-verified and background-checked — free, included by default.',
    diff2: 'Simple invoicing: one monthly bill instead of managing individual contractor payments.',
    diff3: 'A dedicated account contact for recurring or large-scale bookings.',
    diff4: 'Same-day and last-minute availability filtering built into the platform.',
    diff_note: 'Unlike traditional babysitting agencies that charge a large flat placement fee, UpaCare\'s self-serve marketplace model keeps corporate rates transparent and predictable.',
    form_title: 'Tell Us About Your Business',
    company: 'Company / Venue Name',
    contact_name: 'Contact Name',
    email: 'Email',
    event_type: 'What do you need?',
    opt1: 'Hotel / Resort partnership',
    opt2: 'One-time event',
    opt3: 'Recurring corporate childcare',
    opt4: 'Other',
    message: 'Tell us more',
    submit: 'Send Request',
    success: 'Thanks! Our team will reach out within one business day.',
  },
  es: {
    eyebrow: 'Empresas',
    headline: 'Cuidado Infantil Bajo Demanda para Hoteles, Eventos y Oficinas',
    subtitle:
      'Hoteles, organizadores de eventos y oficinas corporativas en Miami pueden reservar cuidadoras verificadas bajo demanda — no solo familias en casa.',
    cta: 'Solicitar Cotización',
    who_title: 'Con Quién Trabajamos',
    who1: 'Hoteles y Resorts',
    who1_desc: 'Cuidado en sitio o en la habitación para huéspedes, coordinado con tu equipo de concierge.',
    who2: 'Bodas y Eventos',
    who2_desc: 'Espacios de cuidado infantil dedicados para que los padres disfruten el evento.',
    who3: 'Oficinas Corporativas',
    who3_desc: 'Cuidado infantil bajo demanda o programado como beneficio para empleados.',
    who4: 'Conferencias y Ferias',
    who4_desc: 'Cobertura de cuidado grupal para eventos de varios días.',
    diff_title: 'Por Qué las Empresas Eligen UpaCare',
    diff1: 'Toda cuidadora asignada está verificada (ID y antecedentes) — gratis, incluido por defecto.',
    diff2: 'Facturación simple: una factura mensual en vez de gestionar pagos individuales a contratistas.',
    diff3: 'Un contacto de cuenta dedicado para reservas recurrentes o de gran escala.',
    diff4: 'Filtro de disponibilidad el mismo día y de último minuto integrado en la plataforma.',
    diff_note: 'A diferencia de las agencias tradicionales de babysitting que cobran una tarifa fija de colocación alta, el modelo de marketplace de autoservicio de UpaCare mantiene tarifas corporativas transparentes y predecibles.',
    form_title: 'Cuéntanos Sobre tu Negocio',
    company: 'Nombre de la Empresa / Lugar',
    contact_name: 'Nombre de Contacto',
    email: 'Correo',
    event_type: '¿Qué necesitas?',
    opt1: 'Alianza con hotel/resort',
    opt2: 'Evento único',
    opt3: 'Cuidado corporativo recurrente',
    opt4: 'Otro',
    message: 'Cuéntanos más',
    submit: 'Enviar Solicitud',
    success: '¡Gracias! Nuestro equipo te contactará dentro de un día hábil.',
  },
  he: {
    eyebrow: 'לעסקים',
    headline: 'טיפול בילדים לפי דרישה למלונות, אירועים ומשרדים',
    subtitle:
      'מלונות, מארגני אירועים ומשרדים עסקיים במיאמי יכולים להזמין מטפלות מאומתות לפי דרישה — לא רק משפחות בבית.',
    cta: 'בקשת הצעת מחיר',
    who_title: 'עם מי אנחנו עובדים',
    who1: 'מלונות ואתרי נופש',
    who1_desc: 'בייביסיטינג באתר או בחדר עבור אורחים, בתיאום עם צוות הקונסיירז\' שלכם.',
    who2: 'חתונות ואירועים',
    who2_desc: 'עמדות טיפול בילדים ייעודיות כדי שההורים ייהנו מהאירוע.',
    who3: 'משרדים עסקיים',
    who3_desc: 'טיפול בילדים לפי דרישה או מתוזמן כהטבה לעובדים.',
    who4: 'כנסים ותערוכות',
    who4_desc: 'כיסוי טיפול בילדים קבוצתי לאירועים רב-יומיים.',
    diff_title: 'למה עסקים בוחרים ב-UpaCare',
    diff1: 'כל מטפלת שמוקצית מאומתת (תעודת זהות ובדיקת רקע) — בחינם, כלול כברירת מחדל.',
    diff2: 'חשבונית פשוטה: חשבון חודשי אחד במקום ניהול תשלומים בודדים לקבלנים.',
    diff3: 'איש קשר ייעודי לחשבון עבור הזמנות חוזרות או בקנה מידה גדול.',
    diff4: 'סינון זמינות לאותו יום וברגע האחרון מובנה בפלטפורמה.',
    diff_note: 'בניגוד לסוכנויות בייביסיטינג מסורתיות שגובות דמי מיקום גבוהים וקבועים, מודל המרקטפלייס בשירות עצמי של UpaCare שומר על תעריפים עסקיים שקופים וצפויים.',
    form_title: 'ספרו לנו על העסק שלכם',
    company: 'שם החברה / המקום',
    contact_name: 'שם איש קשר',
    email: 'אימייל',
    event_type: 'מה אתם צריכים?',
    opt1: 'שותפות עם מלון/אתר נופש',
    opt2: 'אירוע חד פעמי',
    opt3: 'טיפול בילדים עסקי חוזר',
    opt4: 'אחר',
    message: 'ספרו לנו עוד',
    submit: 'שליחת בקשה',
    success: 'תודה! הצוות שלנו יצור איתכם קשר תוך יום עסקים אחד.',
  },
};

export default function ForBusinessClient() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLanguage(localStorage.getItem('language') || 'en');
  }, []);

  if (!mounted) return null;
  const t = translations[language] || translations.en;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <section className="bg-upa-ink text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow bg-white/10 text-white mb-6">
            <Icon name="building" className="w-4 h-4" /> {t.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{t.headline}</h1>
          <p className="text-lg text-gray-300 mb-8">{t.subtitle}</p>
          <a href="#quote" className="btn-primary inline-flex">
            {t.cta}
          </a>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section container-page">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.who_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: 'building', title: t.who1, desc: t.who1_desc },
            { icon: 'heartPulse', title: t.who2, desc: t.who2_desc },
            { icon: 'briefcase', title: t.who3, desc: t.who3_desc },
            { icon: 'users', title: t.who4, desc: t.who4_desc },
          ].map((item) => (
            <div key={item.title} className="bg-upa-cream rounded-2xl p-6 text-center">
              <Icon name={item.icon} className="w-8 h-8 mx-auto mb-4 text-upa-pink" />
              <h3 className="font-bold text-upa-ink mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="section bg-upa-cream">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-upa-ink">{t.diff_title}</h2>
          <ul className="space-y-4 bg-white rounded-2xl card-shadow p-8">
            {[t.diff1, t.diff2, t.diff3, t.diff4].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <Icon name="check" className="w-5 h-5 text-upa-mintdark mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-6 text-center italic">{t.diff_note}</p>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="section container-page max-w-xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-upa-ink">{t.form_title}</h2>
        {submitted ? (
          <div className="bg-upa-mint/10 text-upa-mintdark rounded-2xl p-8 text-center font-semibold">{t.success}</div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl card-shadow p-8 space-y-4 border border-gray-50">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.company}</label>
              <input required className="input-field" placeholder="Fontainebleau Miami Beach" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.contact_name}</label>
              <input required className="input-field" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.email}</label>
              <input required type="email" className="input-field" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.event_type}</label>
              <select className="input-field">
                <option>{t.opt1}</option>
                <option>{t.opt2}</option>
                <option>{t.opt3}</option>
                <option>{t.opt4}</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.message}</label>
              <textarea className="input-field" rows={4} placeholder="..." />
            </div>
            <button type="submit" className="btn-primary w-full">
              {t.submit}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
