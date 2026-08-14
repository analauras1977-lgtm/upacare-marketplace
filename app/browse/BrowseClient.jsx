'use client';

import { useState, useEffect, useMemo } from 'react';
import NannyCard from '../components/NannyCard';
import NanniesMap from '../components/NanniesMap';
import { NANNIES, LANGUAGE_LABELS } from '../lib/nannies';

const translations = {
  en: {
    browse_nannies: 'Browse Nannies',
    subtitle: 'Every caregiver below is ID-verified and background-checked, at no extra cost to you.',
    filters: 'Filters',
    rating: 'Minimum Rating',
    hourly_rate: 'Maximum Hourly Rate',
    certifications: 'Certifications',
    cpr: 'CPR Certified',
    sameDay: 'Available today',
    languages: 'Languages',
    reset: 'Reset',
    no_results: 'No nannies found matching your criteria.',
    results: 'caregivers found',
  },
  es: {
    browse_nannies: 'Buscar Niñeras',
    subtitle: 'Todas las cuidadoras listadas están verificadas (ID y antecedentes) sin costo extra para ti.',
    filters: 'Filtros',
    rating: 'Calificación Mínima',
    hourly_rate: 'Tarifa Máxima por Hora',
    certifications: 'Certificaciones',
    cpr: 'Certificación RCP',
    sameDay: 'Disponible hoy',
    languages: 'Idiomas',
    reset: 'Limpiar',
    no_results: 'No se encontraron niñeras que cumplan tus criterios.',
    results: 'cuidadoras encontradas',
  },
  he: {
    browse_nannies: 'חיפוש בייביסיטריות',
    subtitle: 'כל מטפלת ברשימה למטה מאומתת (תעודת זהות ובדיקת רקע) ללא עלות נוספת עבורכם.',
    filters: 'סינון',
    rating: 'דירוג מינימלי',
    hourly_rate: 'תעריף שעתי מקסימלי',
    certifications: 'הסמכות',
    cpr: 'הסמכת החייאה (CPR)',
    sameDay: 'זמינה היום',
    languages: 'שפות',
    reset: 'איפוס',
    no_results: 'לא נמצאו בייביסיטריות התואמות את הקריטריונים שלכם.',
    results: 'מטפלות נמצאו',
  },
};

export default function BrowseClient() {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxRate, setMaxRate] = useState(50);
  const [cprOnly, setCprOnly] = useState(false);
  const [sameDayOnly, setSameDayOnly] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    setMounted(true);
    setLanguage(localStorage.getItem('language') || 'en');
  }, []);

  const t = translations[language] || translations.en;

  const filteredNannies = useMemo(() => {
    return NANNIES.filter((nanny) => {
      if (nanny.rating < minRating) return false;
      if (nanny.hourlyRate > maxRate) return false;
      if (cprOnly && !nanny.badges.cprCertified) return false;
      if (sameDayOnly && !nanny.sameDayAvailable) return false;
      if (selectedLanguages.length > 0 && !selectedLanguages.some((l) => nanny.languages.includes(l))) return false;
      return true;
    });
  }, [minRating, maxRate, cprOnly, sameDayOnly, selectedLanguages]);

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) => (prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]));
  };

  const handleReset = () => {
    setMinRating(0);
    setMaxRate(50);
    setCprOnly(false);
    setSameDayOnly(false);
    setSelectedLanguages([]);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-upa-ink mb-3">{t.browse_nannies}</h1>
          <p className="text-gray-500">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-6 sticky top-24">
              <h3 className="text-lg font-bold text-upa-ink mb-6">{t.filters}</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.rating}: {minRating}+
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg accent-upa-pink"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.hourly_rate}: ${maxRate}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={maxRate}
                    onChange={(e) => setMaxRate(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-200 rounded-lg accent-upa-pink"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{t.certifications}</p>
                  <label className="flex items-center gap-2 text-sm text-gray-700 mb-2 cursor-pointer">
                    <input type="checkbox" checked={cprOnly} onChange={(e) => setCprOnly(e.target.checked)} className="accent-upa-pink w-4 h-4" />
                    {t.cpr}
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={sameDayOnly} onChange={(e) => setSameDayOnly(e.target.checked)} className="accent-upa-pink w-4 h-4" />
                    {t.sameDay}
                  </label>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{t.languages}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => toggleLanguage(code)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                          selectedLanguages.includes(code)
                            ? 'bg-upa-pink text-white border-upa-pink'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-upa-pink'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleReset} className="btn-outline w-full text-sm">
                  {t.reset}
                </button>
              </div>
            </div>
          </div>

          {/* Nannies Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <NanniesMap nannies={filteredNannies} language={language} />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {filteredNannies.length} {t.results}
            </p>
            {filteredNannies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredNannies.map((nanny) => (
                  <NannyCard key={nanny.id} nanny={nanny} language={language} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">{t.no_results}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
