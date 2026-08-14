'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const COPY = {
  en: {
    title: 'Nannies Near You',
    noKey: 'Map view needs a Google Maps API key. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your Vercel project settings to enable it.',
    loading: 'Loading map...',
    perHour: '/hr',
  },
  es: {
    title: 'Niñeras Cerca de Ti',
    noKey: 'La vista de mapa necesita una API key de Google Maps. Agrega NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en la configuración de tu proyecto en Vercel para activarla.',
    loading: 'Cargando mapa...',
    perHour: '/hr',
  },
  he: {
    title: 'בייביסיטריות בקרבתכם',
    noKey: 'תצוגת המפה דורשת מפתח API של Google Maps. הוסיפו NEXT_PUBLIC_GOOGLE_MAPS_API_KEY בהגדרות פרויקט Vercel שלכם כדי להפעיל אותה.',
    loading: 'טוען מפה...',
    perHour: '/hr',
  },
};

const MIAMI_CENTER = { lat: 25.79, lng: -80.22 };
let mapsScriptPromise = null;

function loadGoogleMapsScript(apiKey) {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.google?.maps) return Promise.resolve();
  if (mapsScriptPromise) return mapsScriptPromise;

  mapsScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return mapsScriptPromise;
}

// Plots every (filtered) nanny with a location on an embedded Google Map.
// Degrades gracefully to a message when no API key is configured, so the
// rest of the browse page keeps working without it.
export default function NanniesMap({ nannies, language = 'en' }) {
  const t = COPY[language] || COPY.en;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [status, setStatus] = useState(apiKey ? 'loading' : 'no-key');

  useEffect(() => {
    if (!apiKey) return;
    let cancelled = false;

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (cancelled || !mapRef.current) return;
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: MIAMI_CENTER,
          zoom: 11,
          mapId: 'UPACARE_BROWSE_MAP',
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        });
        setStatus('ready');
      })
      .catch(() => setStatus('error'));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  useEffect(() => {
    if (status !== 'ready' || !mapInstance.current) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const infoWindow = new window.google.maps.InfoWindow();

    nannies
      .filter((n) => n.location)
      .forEach((nanny) => {
        const marker = new window.google.maps.Marker({
          position: nanny.location,
          map: mapInstance.current,
          title: nanny.name,
        });
        marker.addListener('click', () => {
          infoWindow.setContent(
            `<div style="font-family:Inter,sans-serif;padding:2px 4px;">
              <strong>${nanny.name}</strong><br/>
              ★ ${nanny.rating} · $${nanny.hourlyRate}${t.perHour}<br/>
              <span style="color:#6b7280;font-size:12px;">${nanny.neighborhood}</span>
            </div>`
          );
          infoWindow.open(mapInstance.current, marker);
        });
        markersRef.current.push(marker);
      });
  }, [nannies, status, t.perHour]);

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 card-shadow bg-white">
      <div className="p-4 border-b border-gray-50 flex items-center gap-2">
        <Icon name="mapPin" className="w-5 h-5 text-upa-pink" />
        <h3 className="font-bold text-upa-ink">{t.title}</h3>
      </div>

      {status === 'no-key' && (
        <div className="p-8 text-center text-sm text-gray-500 bg-upa-cream">{t.noKey}</div>
      )}
      {status === 'error' && (
        <div className="p-8 text-center text-sm text-gray-500 bg-upa-cream">{t.noKey}</div>
      )}
      {status === 'loading' && apiKey && (
        <div className="p-8 text-center text-sm text-gray-500">{t.loading}</div>
      )}
      <div ref={mapRef} className={`w-full h-80 ${status === 'ready' ? 'block' : 'hidden'}`} />
    </div>
  );
}
