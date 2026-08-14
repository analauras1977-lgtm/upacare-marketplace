import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '../../components/Icon';
import TrustBadges from '../../components/TrustBadges';
import { NANNIES, LANGUAGE_LABELS } from '../../lib/nannies';

export function generateStaticParams() {
  return NANNIES.map((nanny) => ({ id: String(nanny.id) }));
}

function getNanny(id) {
  return NANNIES.find((n) => String(n.id) === String(id));
}

export function generateMetadata({ params }) {
  const nanny = getNanny(params.id);
  if (!nanny) return {};
  const title = `${nanny.name} — Verified Nanny in ${nanny.neighborhood}, Miami`;
  const description = `${nanny.name} is an ID-verified, background-checked nanny in ${nanny.neighborhood}, Miami with ${nanny.experience} years of experience. $${nanny.hourlyRate}/hr · ${nanny.rating}★ (${nanny.reviews} reviews).`;
  return {
    title,
    description,
    alternates: { canonical: `/nanny/${nanny.id}` },
  };
}

export default function NannyProfilePage({ params }) {
  const nanny = getNanny(params.id);
  if (!nanny) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: nanny.name,
    jobTitle: 'Nanny / Babysitter',
    knowsLanguage: nanny.languages,
    address: { '@type': 'PostalAddress', addressLocality: nanny.neighborhood, addressRegion: 'FL', addressCountry: 'US' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: nanny.rating,
      reviewCount: nanny.reviews,
    },
  };

  return (
    <div className="bg-white py-12 px-4 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <Link href="/browse" className="text-sm font-semibold text-gray-500 hover:text-upa-pink inline-flex items-center gap-1 mb-8">
          ← Back to all nannies
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 card-shadow p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${nanny.color} flex items-center justify-center text-white text-3xl font-bold shrink-0`}>
              {nanny.initials}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-upa-ink">{nanny.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Icon name="star" className="w-5 h-5 text-amber-400" />
                <span className="font-semibold text-upa-ink">{nanny.rating}</span>
                <span className="text-gray-400">({nanny.reviews} reviews)</span>
              </div>
              <p className="text-gray-500 mt-1 flex items-center gap-1">
                <Icon name="mapPin" className="w-4 h-4" /> {nanny.neighborhood}, Miami · {nanny.experience} yrs experience
              </p>
              <div className="mt-4">
                <TrustBadges badges={nanny.badges} size="md" />
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-extrabold text-upa-ink">
                ${nanny.hourlyRate}
                <span className="text-sm font-medium text-gray-500">/hr</span>
              </p>
              <Link href="/signup" className="btn-primary mt-3 inline-flex">
                Book Now
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
            <div>
              <h2 className="font-bold text-upa-ink mb-2">Services</h2>
              <div className="flex flex-wrap gap-2">
                {nanny.services.map((s) => (
                  <span key={s} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-upa-ink mb-2">Languages</h2>
              <p className="text-gray-600 text-sm">{nanny.languages.map((l) => LANGUAGE_LABELS[l]).join(' · ')}</p>
            </div>
            <div>
              <h2 className="font-bold text-upa-ink mb-2">Availability</h2>
              <p className="text-gray-600 text-sm">{nanny.sameDayAvailable ? 'Available for same-day bookings' : 'Book in advance'}</p>
            </div>
            <div>
              <h2 className="font-bold text-upa-ink mb-2">Community trust</h2>
              <p className="text-gray-600 text-sm">Recommended by {nanny.familiesRecommended}+ families nearby</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
