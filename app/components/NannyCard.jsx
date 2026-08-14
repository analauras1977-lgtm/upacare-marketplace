'use client';

import Link from 'next/link';
import Icon from './Icon';
import TrustBadges from './TrustBadges';
import { LANGUAGE_LABELS } from '../lib/nannies';

const COPY = {
  en: { perHour: '/hr', reviews: 'reviews', yrsExp: 'yrs experience', viewProfile: 'View Profile', sameDay: 'Available today', recommended: 'recommended by', familiesNearby: 'families nearby' },
  es: { perHour: '/hr', reviews: 'reseñas', yrsExp: 'años de experiencia', viewProfile: 'Ver Perfil', sameDay: 'Disponible hoy', recommended: 'recomendada por', familiesNearby: 'familias' },
  he: { perHour: 'לשעה', reviews: 'ביקורות', yrsExp: 'שנות ניסיון', viewProfile: 'צפייה בפרופיל', sameDay: 'זמינה היום', recommended: 'מומלצת על ידי', familiesNearby: 'משפחות בקרבת מקום' },
};

export default function NannyCard({ nanny, language = 'en' }) {
  const t = COPY[language] || COPY.en;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-6 pb-4 flex items-start gap-4">
        <div
          className={`shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${nanny.color} flex items-center justify-center text-white text-xl font-bold shadow-sm`}
        >
          {nanny.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-upa-ink truncate">{nanny.name}</h3>
            {nanny.sameDayAvailable && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-upa-mintdark bg-upa-mint/10 rounded-full px-2 py-0.5">
                <Icon name="bolt" className="w-3 h-3" /> {t.sameDay}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-sm">
            <Icon name="star" className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-upa-ink">{nanny.rating}</span>
            <span className="text-gray-400">({nanny.reviews} {t.reviews})</span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
            <Icon name="mapPin" className="w-3.5 h-3.5" /> {nanny.neighborhood} · {nanny.experience} {t.yrsExp}
          </p>
        </div>
      </div>

      <div className="px-6">
        <TrustBadges badges={nanny.badges} language={language} />
      </div>

      <div className="px-6 mt-4 flex flex-wrap gap-2">
        {nanny.services.map((service) => (
          <span key={service} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {service}
          </span>
        ))}
      </div>

      {nanny.languages?.length > 0 && (
        <p className="px-6 mt-3 text-xs text-gray-500">
          {nanny.languages.map((l) => LANGUAGE_LABELS[l]).join(' · ')}
        </p>
      )}

      {nanny.familiesRecommended > 0 && (
        <p className="px-6 mt-2 text-xs text-gray-500 flex items-center gap-1">
          <Icon name="users" className="w-3.5 h-3.5 text-upa-pink" />
          {nanny.familiesRecommended}+ {t.recommended} {t.familiesNearby}
        </p>
      )}

      <div className="mt-auto p-6 pt-5 flex items-center justify-between border-t border-gray-50 mt-5">
        <span className="text-2xl font-extrabold text-upa-ink">
          ${nanny.hourlyRate}
          <span className="text-sm font-medium text-gray-500">{t.perHour}</span>
        </span>
        <Link href={`/nanny/${nanny.id}`} className="btn-primary text-sm px-5 py-2.5">
          {t.viewProfile}
        </Link>
      </div>
    </div>
  );
}
