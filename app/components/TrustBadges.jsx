'use client';

import Icon from './Icon';

const LABELS = {
  en: {
    idVerified: 'ID Verified',
    backgroundCheck: 'Background Checked',
    cprCertified: 'CPR Certified',
  },
  es: {
    idVerified: 'ID Verificada',
    backgroundCheck: 'Antecedentes',
    cprCertified: 'RCP',
  },
  he: {
    idVerified: 'תעודת זהות מאומתת',
    backgroundCheck: 'בדיקת רקע',
    cprCertified: 'הסמכת החייאה',
  },
};

const ICONS = {
  idVerified: 'idCard',
  backgroundCheck: 'shieldCheck',
  cprCertified: 'heartPulse',
};

// Compact row of trust badges shown on nanny cards / profiles.
export default function TrustBadges({ badges, language = 'en', size = 'sm' }) {
  const t = LABELS[language] || LABELS.en;
  const active = Object.entries(badges || {}).filter(([, on]) => on);
  if (active.length === 0) return null;

  const pad = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <div className="flex flex-wrap gap-1.5">
      {active.map(([key]) => (
        <span
          key={key}
          className={`inline-flex items-center gap-1 rounded-full bg-upa-mint/10 text-upa-mintdark font-medium ${pad}`}
        >
          <Icon name={ICONS[key] || 'check'} className="w-3.5 h-3.5" />
          {t[key]}
        </span>
      ))}
    </div>
  );
}
