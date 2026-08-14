'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '../components/Icon';

const translations = {
  en: {
    eyebrow: 'Trust & Safety',
    headline: 'Verification Is Included — Not an Upsell',
    subtitle:
      'Many babysitting platforms make you pay extra for background checks, or lock ID verification behind a premium tier. At UpaCare, every caregiver goes through the same three-step screening at no extra cost to anyone.',
    step1: 'Identity Verification',
    step1_desc: 'Every caregiver confirms their legal identity with a government-issued ID before their profile goes live.',
    step2: 'Background Check',
    step2_desc: 'We run a criminal background screening for every caregiver — included free, paid for by UpaCare, not the nanny.',
    step3: 'Reference & Interview Screening',
    step3_desc: 'Caregivers submit references and complete a short screening call. CPR/First Aid certification is displayed on the profile when verified.',
    compare_title: 'UpaCare vs. Other Platforms',
    compare_upa: 'UpaCare',
    compare_other: 'Typical Marketplace',
    c1: 'Who pays for the background check',
    u1: 'UpaCare (free to both sides)',
    o1: 'Often the caregiver, $20–$60',
    c2: 'Required to browse & message',
    u2: 'Free, no account fee',
    o2: 'Monthly membership, ~$35–$39',
    c3: 'Reviews',
    u3: 'From confirmed bookings only',
    o3: 'Varies by platform',
    c4: 'Re-verification',
    u4: 'Annual refresh',
    o4: 'Varies by platform',
    faq_title: 'Safety FAQ',
    faq1_q: 'Do families pay for verification?',
    faq1_a: 'No. Identity verification and background checks are included in every UpaCare account, for families and caregivers alike, with no separate fee.',
    faq2_q: 'How often are caregivers re-checked?',
    faq2_a: 'Background checks and CPR certifications are refreshed annually to keep every active profile current.',
    faq3_q: 'What happens if a caregiver fails a background check?',
    faq3_a: 'Their application is declined and they cannot create a public profile on UpaCare.',
    faq4_q: 'Can I message a caregiver before booking?',
    faq4_a: 'Yes — messaging is free and unlimited before you commit to a booking.',
    cta_title: 'Book with confidence',
    cta_desc: 'Browse verified caregivers in Miami today.',
    cta_btn: 'Browse Nannies',
  },
  es: {
    eyebrow: 'Confianza y Seguridad',
    headline: 'La Verificación Está Incluida — No es un Cobro Extra',
    subtitle:
      'Muchas plataformas de babysitting te hacen pagar extra por el chequeo de antecedentes, o esconden la verificación de ID detrás de un plan premium. En UpaCare, toda cuidadora pasa por el mismo proceso de tres pasos sin costo extra para nadie.',
    step1: 'Verificación de Identidad',
    step1_desc: 'Cada cuidadora confirma su identidad legal con una identificación oficial antes de que su perfil sea público.',
    step2: 'Chequeo de Antecedentes',
    step2_desc: 'Realizamos una revisión de antecedentes penales para cada cuidadora — incluida gratis, pagada por UpaCare, no por la niñera.',
    step3: 'Referencias y Entrevista',
    step3_desc: 'Las cuidadoras envían referencias y completan una breve llamada de evaluación. La certificación de RCP/Primeros Auxilios se muestra en el perfil cuando está verificada.',
    compare_title: 'UpaCare vs. Otras Plataformas',
    compare_upa: 'UpaCare',
    compare_other: 'Marketplace Típico',
    c1: 'Quién paga el chequeo de antecedentes',
    u1: 'UpaCare (gratis para ambos lados)',
    o1: 'A menudo la cuidadora, $20–$60',
    c2: 'Requisito para buscar y mensajear',
    u2: 'Gratis, sin cuota de cuenta',
    o2: 'Membresía mensual, ~$35–$39',
    c3: 'Reseñas',
    u3: 'Solo de reservas confirmadas',
    o3: 'Varía según la plataforma',
    c4: 'Re-verificación',
    u4: 'Renovación anual',
    o4: 'Varía según la plataforma',
    faq_title: 'Preguntas Frecuentes de Seguridad',
    faq1_q: '¿Las familias pagan por la verificación?',
    faq1_a: 'No. La verificación de identidad y el chequeo de antecedentes están incluidos en toda cuenta de UpaCare, tanto para familias como cuidadoras, sin cargo adicional.',
    faq2_q: '¿Cada cuánto se revisa a las cuidadoras?',
    faq2_a: 'El chequeo de antecedentes y la certificación de RCP se renuevan anualmente para mantener cada perfil activo actualizado.',
    faq3_q: '¿Qué pasa si una cuidadora no pasa el chequeo de antecedentes?',
    faq3_a: 'Su solicitud es rechazada y no puede crear un perfil público en UpaCare.',
    faq4_q: '¿Puedo mensajear a una cuidadora antes de reservar?',
    faq4_a: 'Sí — mensajear es gratis e ilimitado antes de comprometerte con una reserva.',
    cta_title: 'Reserva con confianza',
    cta_desc: 'Explora cuidadoras verificadas en Miami hoy mismo.',
    cta_btn: 'Ver Niñeras',
  },
  he: {
    eyebrow: 'אמון ובטיחות',
    headline: 'האימות כלול — לא תוספת בתשלום',
    subtitle:
      'הרבה פלטפורמות של בייביסיטינג גורמות לכם לשלם תוספת עבור בדיקת רקע, או נועלות את אימות הזהות מאחורי מסלול פרימיום. ב-UpaCare, כל מטפלת עוברת את אותו תהליך בדיקה בן שלושה שלבים, ללא עלות נוספת לאף אחד.',
    step1: 'אימות זהות',
    step1_desc: 'כל מטפלת מאשרת את זהותה החוקית באמצעות תעודה ממשלתית לפני שהפרופיל שלה עולה לאוויר.',
    step2: 'בדיקת רקע',
    step2_desc: 'אנחנו מבצעים בדיקת רקע פלילית לכל מטפלת — כלולה בחינם, בתשלום UpaCare, לא הבייביסיטרית.',
    step3: 'המלצות וראיון סינון',
    step3_desc: 'המטפלות שולחות המלצות ומשלימות שיחת סינון קצרה. הסמכת החייאה/עזרה ראשונה מוצגת בפרופיל כשהיא מאומתת.',
    compare_title: 'UpaCare מול פלטפורמות אחרות',
    compare_upa: 'UpaCare',
    compare_other: 'פלטפורמה טיפוסית',
    c1: 'מי משלם עבור בדיקת הרקע',
    u1: 'UpaCare (בחינם לשני הצדדים)',
    o1: 'לרוב המטפלת, $20–$60',
    c2: 'נדרש כדי לחפש ולשלוח הודעות',
    u2: 'חינם, ללא עמלת חשבון',
    o2: 'מנוי חודשי, ~$35–$39',
    c3: 'ביקורות',
    u3: 'רק מהזמנות מאושרות',
    o3: 'משתנה לפי הפלטפורמה',
    c4: 'אימות מחדש',
    u4: 'רענון שנתי',
    o4: 'משתנה לפי הפלטפורמה',
    faq_title: 'שאלות נפוצות על בטיחות',
    faq1_q: 'האם משפחות משלמות עבור האימות?',
    faq1_a: 'לא. אימות זהות ובדיקת רקע כלולים בכל חשבון UpaCare, גם למשפחות וגם למטפלות, ללא עמלה נפרדת.',
    faq2_q: 'באיזו תדירות נבדקות המטפלות מחדש?',
    faq2_a: 'בדיקות הרקע והסמכות ההחייאה מתרעננות מדי שנה כדי לשמור על כל פרופיל פעיל מעודכן.',
    faq3_q: 'מה קורה אם מטפלת לא עוברת בדיקת רקע?',
    faq3_a: 'הבקשה שלה נדחית והיא לא יכולה ליצור פרופיל ציבורי ב-UpaCare.',
    faq4_q: 'האם אני יכולה לשלוח הודעה למטפלת לפני ההזמנה?',
    faq4_a: 'כן — שליחת הודעות חינמית וללא הגבלה לפני שאתם מתחייבים להזמנה.',
    cta_title: 'הזמינו בביטחון מלא',
    cta_desc: 'חפשו מטפלות מאומתות במיאמי עוד היום.',
    cta_btn: 'חיפוש בייביסיטריות',
  },
};

export default function TrustSafetyClient() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLanguage(localStorage.getItem('language') || 'en');
  }, []);

  if (!mounted) return null;
  const t = translations[language] || translations.en;

  const faqs = [
    { q: t.faq1_q, a: t.faq1_a },
    { q: t.faq2_q, a: t.faq2_a },
    { q: t.faq3_q, a: t.faq3_a },
    { q: t.faq4_q, a: t.faq4_a },
  ];

  return (
    <div className="bg-white">
      <section className="bg-upa-ink text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow bg-white/10 text-white mb-6">{t.eyebrow}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{t.headline}</h1>
          <p className="text-lg text-gray-300">{t.subtitle}</p>
        </div>
      </section>

      {/* 3-step verification */}
      <section className="section container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'idCard', title: t.step1, desc: t.step1_desc },
            { icon: 'shieldCheck', title: t.step2, desc: t.step2_desc },
            { icon: 'heartPulse', title: t.step3, desc: t.step3_desc },
          ].map((step, idx) => (
            <div key={step.title} className="bg-white rounded-2xl card-shadow border border-gray-50 p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-upa-mint/10 text-upa-mintdark flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <Icon name={step.icon} className="w-8 h-8 mx-auto mb-4 text-upa-pink" />
              <h3 className="text-lg font-bold mb-2 text-upa-ink">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="section bg-upa-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-upa-ink">{t.compare_title}</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-upa-ink text-white">
                  <th className="text-left font-semibold p-4"></th>
                  <th className="text-left font-semibold p-4">{t.compare_upa}</th>
                  <th className="text-left font-semibold p-4">{t.compare_other}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [t.c1, t.u1, t.o1],
                  [t.c2, t.u2, t.o2],
                  [t.c3, t.u3, t.o3],
                  [t.c4, t.u4, t.o4],
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
      </section>

      {/* FAQ — also exposed as FAQPage JSON-LD via the server page for AIO */}
      <section className="section container-page max-w-3xl">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-upa-ink">{t.faq_title}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-upa-cream rounded-xl p-5 open:bg-upa-lightpink/50 transition">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-upa-ink">
                {faq.q}
                <Icon name="check" className="w-4 h-4 opacity-0 group-open:opacity-100 text-upa-pink transition" />
              </summary>
              <p className="text-sm text-gray-600 mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section bg-upa-pink text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">{t.cta_title}</h2>
          <p className="text-lg mb-8 text-white/90">{t.cta_desc}</p>
          <Link href="/browse" className="bg-white text-upa-pink px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition">
            {t.cta_btn}
          </Link>
        </div>
      </section>
    </div>
  );
}
