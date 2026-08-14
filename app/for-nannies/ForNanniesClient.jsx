'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';
import InviteBanner from '../components/InviteBanner';

const translations = {
  en: {
    headline: 'Grow Your Childcare Business',
    subtitle: 'Join our platform and connect with Miami families looking for professional care',
    get_started: 'Join Now',
    why_join: 'Why Join UpaCare?',
    reach: 'Reach More Families',
    reach_desc: 'Access hundreds of families across Miami seeking childcare services',
    control: 'Set Your Own Schedule',
    control_desc: 'Work when you want and set your own rates',
    secure: 'Secure Payments',
    secure_desc: 'Get paid safely through our platform',
    reputation: 'Build Your Reputation',
    reputation_desc: 'Earn real ratings and reviews from verified families',
    requirements: 'Join Requirements',
    req1: '18+ years old',
    req2: 'Background check clearance — free, we cover the cost',
    req3: 'Valid ID or passport',
    req4: 'Professional experience or references',
    requirements_desc: 'We ensure safety and quality for all families. Unlike many platforms, your background check is on us.',
    earnings: 'Earnings Potential',
    earn_desc: 'Keep up to 90% of your rates',
    commission: 'Platform commission: 10%',
    example: 'Example: Earn $18/hour? You keep $16.20',
    compare_title: 'What You Keep, Compared',
    compare_row1: 'UpaCare: 10% commission, no listing fee',
    compare_row2: 'Typical agency: fixed hourly rate set by the agency, you don\'t set your own price',
    compare_row3: 'Typical app: annual or monthly fee just to see job postings',
    features: 'Platform Features',
    profile: 'Professional Profile',
    profile_desc: 'Showcase your experience, certifications and languages',
    messaging: 'Direct Messaging',
    messaging_desc: 'Communicate with families directly',
    calendar: 'Smart Calendar',
    calendar_desc: 'Manage your availability easily, including same-day slots',
    ratings: 'Ratings System',
    ratings_desc: 'Build your reputation with verified reviews',
    cta_title: 'Ready to Join UpaCare?',
    cta_desc: 'Start earning money doing what you love',
  },
  es: {
    headline: 'Crece tu Negocio de Cuidado Infantil',
    subtitle: 'Únete a nuestra plataforma y conecta con familias de Miami que buscan profesionales',
    get_started: 'Únete Ahora',
    why_join: '¿Por Qué Unirse a UpaCare?',
    reach: 'Llega a Más Familias',
    reach_desc: 'Accede a cientos de familias en todo Miami buscando servicios de cuidado',
    control: 'Define tu Horario',
    control_desc: 'Trabaja cuando quieras y establece tus tarifas',
    secure: 'Pagos Seguros',
    secure_desc: 'Recibe pagos de forma segura en nuestra plataforma',
    reputation: 'Construye tu Reputación',
    reputation_desc: 'Gana calificaciones y reseñas reales de familias verificadas',
    requirements: 'Requisitos',
    req1: '18+ años de edad',
    req2: 'Verificación de antecedentes — gratis, nosotros cubrimos el costo',
    req3: 'ID válido o pasaporte',
    req4: 'Experiencia profesional o referencias',
    requirements_desc: 'Garantizamos seguridad y calidad para todas las familias. A diferencia de muchas plataformas, tu chequeo de antecedentes corre por nuestra cuenta.',
    earnings: 'Potencial de Ganancias',
    earn_desc: 'Mantén hasta el 90% de tus tarifas',
    commission: 'Comisión de plataforma: 10%',
    example: 'Ejemplo: ¿Ganas $18/hora? Te quedas con $16.20',
    compare_title: 'Lo Que Te Quedas, Comparado',
    compare_row1: 'UpaCare: 10% de comisión, sin cuota por publicar',
    compare_row2: 'Agencia típica: tarifa fija que define la agencia, tú no pones tu propio precio',
    compare_row3: 'App típica: cuota anual o mensual solo para ver las ofertas de trabajo',
    features: 'Características de Plataforma',
    profile: 'Perfil Profesional',
    profile_desc: 'Muestra tu experiencia, certificaciones e idiomas',
    messaging: 'Mensajería Directa',
    messaging_desc: 'Comunícate directamente con familias',
    calendar: 'Calendario Inteligente',
    calendar_desc: 'Gestiona tu disponibilidad fácilmente, incluyendo turnos el mismo día',
    ratings: 'Sistema de Calificaciones',
    ratings_desc: 'Construye tu reputación con reseñas verificadas',
    cta_title: '¿Listo para Unirte a UpaCare?',
    cta_desc: 'Comienza a ganar dinero haciendo lo que amas',
  },
  he: {
    headline: 'פתחו את עסק הטיפול בילדים שלכם',
    subtitle: 'הצטרפו לפלטפורמה שלנו והתחברו עם משפחות במיאמי המחפשות טיפול מקצועי',
    get_started: 'הצטרפו עכשיו',
    why_join: 'למה להצטרף ל-UpaCare?',
    reach: 'הגיעו ליותר משפחות',
    reach_desc: 'גישה למאות משפחות ברחבי מיאמי המחפשות שירותי טיפול בילדים',
    control: 'קבעו את לוח הזמנים שלכם',
    control_desc: 'עבדו מתי שאתם רוצים וקבעו את התעריפים שלכם',
    secure: 'תשלומים מאובטחים',
    secure_desc: 'קבלו תשלום בבטחה דרך הפלטפורמה שלנו',
    reputation: 'בנו את המוניטין שלכם',
    reputation_desc: 'צברו דירוגים וביקורות אמיתיים ממשפחות מאומתות',
    requirements: 'תנאי הצטרפות',
    req1: 'גיל 18 ומעלה',
    req2: 'אישור בדיקת רקע — בחינם, אנחנו מכסים את העלות',
    req3: 'תעודת זהות או דרכון בתוקף',
    req4: 'ניסיון מקצועי או המלצות',
    requirements_desc: 'אנחנו מבטיחים בטיחות ואיכות עבור כל המשפחות. בניגוד לפלטפורמות רבות, בדיקת הרקע שלכם עלינו.',
    earnings: 'פוטנציאל הרווחים',
    earn_desc: 'שמרו עד 90% מהתעריפים שלכם',
    commission: 'עמלת פלטפורמה: 10%',
    example: 'לדוגמה: מרוויחות $18 לשעה? נשאר לכן $16.20',
    compare_title: 'מה נשאר לכן, בהשוואה',
    compare_row1: 'UpaCare: עמלה של 10%, ללא דמי פרסום',
    compare_row2: 'סוכנות טיפוסית: תעריף שעתי קבוע שנקבע על ידי הסוכנות, אתן לא קובעות את המחיר שלכן',
    compare_row3: 'אפליקציה טיפוסית: עמלה שנתית או חודשית רק כדי לראות משרות',
    features: 'תכונות הפלטפורמה',
    profile: 'פרופיל מקצועי',
    profile_desc: 'הציגו את הניסיון, ההסמכות והשפות שלכם',
    messaging: 'הודעות ישירות',
    messaging_desc: 'תקשרו ישירות עם משפחות',
    calendar: 'לוח שנה חכם',
    calendar_desc: 'נהלו את הזמינות שלכם בקלות, כולל משבצות לאותו יום',
    ratings: 'מערכת דירוגים',
    ratings_desc: 'בנו את המוניטין שלכם עם ביקורות מאומתות',
    cta_title: 'מוכנות להצטרף ל-UpaCare?',
    cta_desc: 'התחילו להרוויח כסף עושות את מה שאתן אוהבות',
  },
};

export default function ForNanniesClient() {
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

      {/* Why Join */}
      <section className="section container-page">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.why_join}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: 'users', title: t.reach, desc: t.reach_desc },
            { icon: 'bolt', title: t.control, desc: t.control_desc },
            { icon: 'wallet', title: t.secure, desc: t.secure_desc },
            { icon: 'star', title: t.reputation, desc: t.reputation_desc },
          ].map((benefit) => (
            <div key={benefit.title} className="flex gap-4 p-6 bg-upa-cream rounded-2xl">
              <Icon name={benefit.icon} className="w-8 h-8 text-upa-pink shrink-0" />
              <div>
                <h3 className="text-lg font-bold mb-1.5 text-upa-ink">{benefit.title}</h3>
                <p className="text-gray-700 text-sm">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="section bg-upa-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.requirements}</h2>
          <div className="bg-white rounded-2xl card-shadow p-8">
            <p className="text-gray-700 mb-6">{t.requirements_desc}</p>
            <ul className="space-y-4">
              {[t.req1, t.req2, t.req3, t.req4].map((req) => (
                <li key={req} className="flex items-center gap-4 text-base">
                  <Icon name="shieldCheck" className="w-6 h-6 text-upa-mintdark shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="section container-page max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.earnings}</h2>
        <div className="bg-upa-ink text-white rounded-2xl p-10 md:p-12 text-center">
          <p className="text-lg mb-3 text-gray-300">{t.earn_desc}</p>
          <p className="text-5xl font-extrabold mb-4 text-upa-pink">90%</p>
          <p className="text-base mb-6 text-gray-300">{t.commission}</p>
          <div className="bg-white/10 rounded-xl p-5 mb-8">
            <p className="font-semibold">{t.example}</p>
          </div>
          <div className="grid gap-3 max-w-xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-wide text-upa-mint mb-1">{t.compare_title}</p>
            {[t.compare_row1, t.compare_row2, t.compare_row3].map((row) => (
              <div key={row} className="flex items-start gap-2 text-sm text-gray-300">
                <Icon name="check" className="w-4 h-4 text-upa-mint mt-0.5 shrink-0" />
                {row}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-upa-cream">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-upa-ink">{t.features}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: 'idCard', title: t.profile, desc: t.profile_desc },
              { icon: 'chat', title: t.messaging, desc: t.messaging_desc },
              { icon: 'calendar', title: t.calendar, desc: t.calendar_desc },
              { icon: 'star', title: t.ratings, desc: t.ratings_desc },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl card-shadow p-6">
                <Icon name={feature.icon} className="w-8 h-8 mb-4 text-upa-pink" />
                <h3 className="text-lg font-bold mb-2 text-upa-ink">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral */}
      <section className="section container-page max-w-4xl">
        <InviteBanner language={language} audience="nanny" />
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
