'use client';

import Link from 'next/link';
import Icon from './Icon';

const COPY = {
  en: {
    title: 'Invite & Earn',
    familyDesc: 'Invite a friend and you both get a $20 credit toward your next booking once they complete theirs.',
    nannyDesc: 'Refer another caregiver and you both earn a $25 bonus after their first completed job.',
    cta: 'Get my invite link',
  },
  es: {
    title: 'Invita y Gana',
    familyDesc: 'Invita a una amiga: ambas reciben $20 de crédito para su próxima reserva cuando ella complete la suya.',
    nannyDesc: 'Recomienda a otra cuidadora: ambas ganan un bono de $25 después de su primer trabajo completado.',
    cta: 'Obtener mi link de invitación',
  },
  he: {
    title: 'הזמינו וקבלו בונוס',
    familyDesc: 'הזמינו חברה ושתיכן תקבלו קרדיט של $20 להזמנה הבאה שלכן ברגע שהיא תשלים את ההזמנה שלה.',
    nannyDesc: 'הפנו מטפלת נוספת ושתיכן תרוויחו בונוס של $25 לאחר שתשלים את העבודה הראשונה שלה.',
    cta: 'קבלו את קישור ההזמנה שלי',
  },
};

// audience: 'family' | 'nanny'
export default function InviteBanner({ language = 'en', audience = 'family' }) {
  const t = COPY[language] || COPY.en;
  const desc = audience === 'nanny' ? t.nannyDesc : t.familyDesc;

  return (
    <div className="bg-gradient-to-r from-upa-pink to-upa-pinkdark rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6 justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <Icon name="users" className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{t.title}</h3>
          <p className="text-white/90 text-sm mt-1 max-w-md">{desc}</p>
        </div>
      </div>
      <Link href="/signup" className="bg-white text-upa-pink px-6 py-3 rounded-xl font-semibold whitespace-nowrap hover:bg-gray-50 transition">
        {t.cta}
      </Link>
    </div>
  );
}
