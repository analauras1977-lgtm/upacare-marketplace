'use client';

import Link from 'next/link';

const translations = {
  en: {
    tagline: 'Verified, background-checked childcare for Miami families.',
    company: 'Company',
    about: 'For Families',
    nannies: 'For Nannies',
    business: 'For Business',
    trust: 'Trust & Safety',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© 2026 UpaCare, a UPA Entertainment company. All rights reserved.',
    address: '3300 NE 191 St, Suite 1907, Aventura, FL 33180',
    phone: '+1 (561) 367-5662',
    email: 'info@upaentertainment.com',
    followUs: 'Follow Us',
  },
  es: {
    tagline: 'Cuidado infantil verificado y con antecedentes revisados para familias de Miami.',
    company: 'Compañía',
    about: 'Para Familias',
    nannies: 'Para Niñeras',
    business: 'Empresas',
    trust: 'Confianza y Seguridad',
    contact: 'Contacto',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    copyright: '© 2026 UpaCare, una compañía de UPA Entertainment. Todos los derechos reservados.',
    address: '3300 NE 191 St, Suite 1907, Aventura, FL 33180',
    phone: '+1 (561) 367-5662',
    email: 'info@upaentertainment.com',
    followUs: 'Síguenos',
  },
  he: {
    tagline: 'טיפול בילדים מאומת ובדוק לרקע פלילי למשפחות במיאמי.',
    company: 'החברה',
    about: 'למשפחות',
    nannies: 'לבייביסיטריות',
    business: 'לעסקים',
    trust: 'אמון ובטיחות',
    contact: 'צור קשר',
    privacy: 'מדיניות פרטיות',
    terms: 'תנאי שימוש',
    copyright: '© 2026 UpaCare, חברה של UPA Entertainment. כל הזכויות שמורות.',
    address: '3300 NE 191 St, Suite 1907, Aventura, FL 33180',
    phone: '+1 (561) 367-5662',
    email: 'info@upaentertainment.com',
    followUs: 'עקבו אחרינו',
  },
};

export default function Footer({ language }) {
  const t = translations[language] || translations.en;

  return (
    <footer className="bg-upa-ink text-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-upa-pink rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
              <span className="text-xl font-extrabold">UpaCare</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{t.tagline}</p>
            <p className="text-gray-400 text-sm mb-1">{t.address}</p>
            <p className="text-gray-400 text-sm mb-1">{t.phone}</p>
            <p className="text-gray-400 text-sm">{t.email}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-300">{t.company}</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/for-families" className="text-gray-400 hover:text-upa-pink transition">{t.about}</Link></li>
              <li><Link href="/for-nannies" className="text-gray-400 hover:text-upa-pink transition">{t.nannies}</Link></li>
              <li><Link href="/for-business" className="text-gray-400 hover:text-upa-pink transition">{t.business}</Link></li>
              <li><Link href="/trust-safety" className="text-gray-400 hover:text-upa-pink transition">{t.trust}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-300">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-upa-pink transition">{t.privacy}</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-upa-pink transition">{t.terms}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-300">{t.followUs}</h3>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-upa-pink transition">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-upa-pink transition">Instagram</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-gray-500 text-sm">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
