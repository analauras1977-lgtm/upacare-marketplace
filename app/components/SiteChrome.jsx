'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { dirFor } from '../lib/languages';

const VALID_LANGUAGES = ['en', 'es', 'he'];

// Client-side chrome (header/footer + EN/ES/HE language state) wrapped
// around every route. Kept separate from layout.jsx so layout.jsx can stay
// a Server Component and export real per-page metadata for SEO/AIO.
export default function SiteChrome({ children }) {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language');
    setLanguage(VALID_LANGUAGES.includes(saved) ? saved : 'en');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = language;
    document.documentElement.dir = dirFor(language);
  }, [language, mounted]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-upa-pink" />
      </div>
    );
  }

  return (
    <>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main className="min-h-screen">{children}</main>
      <Footer language={language} />
    </>
  );
}
