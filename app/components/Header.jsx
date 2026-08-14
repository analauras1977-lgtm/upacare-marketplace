'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LANGUAGES } from '../lib/languages';

const translations = {
  en: {
    home: 'Home',
    forFamilies: 'For Families',
    forNannies: 'For Nannies',
    trustSafety: 'Trust & Safety',
    forBusiness: 'For Business',
    login: 'Login',
    signup: 'Sign Up',
    browse: 'Browse Nannies',
  },
  es: {
    home: 'Inicio',
    forFamilies: 'Para Familias',
    forNannies: 'Para Niñeras',
    trustSafety: 'Confianza y Seguridad',
    forBusiness: 'Empresas',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    browse: 'Buscar Niñeras',
  },
  he: {
    home: 'בית',
    forFamilies: 'למשפחות',
    forNannies: 'לבייביסיטריות',
    trustSafety: 'אמון ובטיחות',
    forBusiness: 'לעסקים',
    login: 'התחברות',
    signup: 'הרשמה',
    browse: 'חיפוש בייביסיטריות',
  },
};

export default function Header({ language, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language] || translations.en;

  const navLinks = [
    { href: '/browse', label: t.browse },
    { href: '/for-families', label: t.forFamilies },
    { href: '/for-nannies', label: t.forNannies },
    { href: '/trust-safety', label: t.trustSafety },
    { href: '/for-business', label: t.forBusiness },
  ];

  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 bg-upa-pink rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-xl font-extrabold text-upa-ink tracking-tight">UpaCare</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-7 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-600 hover:text-upa-pink transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language Selector & Auth */}
        <div className="flex gap-3 items-center">
          <div className="hidden sm:flex gap-1 border border-gray-200 rounded-lg p-0.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => onLanguageChange(l.code)}
                aria-label={l.label}
                aria-pressed={language === l.code}
                title={l.label}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold transition ${
                  language === l.code ? 'bg-upa-ink text-white' : 'text-gray-500 hover:text-upa-ink'
                }`}
              >
                <span className="text-sm leading-none">{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>

          <Link
            href="/login"
            className="hidden sm:inline-block text-sm font-semibold text-upa-ink hover:text-upa-pink transition"
          >
            {t.login}
          </Link>
          <Link href="/signup" className="btn-primary text-sm px-4 py-2.5 hidden sm:inline-flex">
            {t.signup}
          </Link>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-upa-ink" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 font-semibold hover:text-upa-pink">
                {link.label}
              </Link>
            ))}
            <div className="flex gap-1 border border-gray-200 rounded-lg p-0.5 w-fit sm:hidden">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  aria-label={l.label}
                  aria-pressed={language === l.code}
                  className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold ${
                    language === l.code ? 'bg-upa-ink text-white' : 'text-gray-500'
                  }`}
                >
                  <span className="text-sm leading-none">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </div>
            <Link href="/login" className="text-upa-pink font-semibold">
              {t.login}
            </Link>
            <Link href="/signup" className="btn-primary text-center">
              {t.signup}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
