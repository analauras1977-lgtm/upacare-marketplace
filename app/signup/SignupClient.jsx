'use client';

import { useState } from 'react';
import Link from 'next/link';

const translations = {
  en: {
    signup: 'Sign Up',
    user_type: 'I am a...',
    family: 'Family',
    nanny: 'Nanny',
    email: 'Email',
    password: 'Password',
    confirm_password: 'Confirm Password',
    full_name: 'Full Name',
    phone: 'Phone Number',
    create_account: 'Create Account',
    already_member: 'Already a member?',
    login_here: 'Login here',
    success: 'Account created successfully! Verification is free — we\'ll email you next steps.',
    error: 'Please fill all fields correctly',
  },
  es: {
    signup: 'Registrarse',
    user_type: 'Soy un/a...',
    family: 'Familia',
    nanny: 'Niñera',
    email: 'Correo',
    password: 'Contraseña',
    confirm_password: 'Confirmar Contraseña',
    full_name: 'Nombre Completo',
    phone: 'Teléfono',
    create_account: 'Crear Cuenta',
    already_member: '¿Ya eres miembro?',
    login_here: 'Inicia sesión aquí',
    success: '¡Cuenta creada exitosamente! La verificación es gratis — te enviaremos los siguientes pasos por correo.',
    error: 'Por favor completa todos los campos correctamente',
  },
  he: {
    signup: 'הרשמה',
    user_type: 'אני...',
    family: 'משפחה',
    nanny: 'בייביסיטרית',
    email: 'אימייל',
    password: 'סיסמה',
    confirm_password: 'אימות סיסמה',
    full_name: 'שם מלא',
    phone: 'מספר טלפון',
    create_account: 'יצירת חשבון',
    already_member: 'כבר יש לכם חשבון?',
    login_here: 'התחברו כאן',
    success: 'החשבון נוצר בהצלחה! האימות חינם — נשלח לכם את השלבים הבאים באימייל.',
    error: 'אנא מלאו את כל השדות כראוי',
  },
};

export default function SignupClient() {
  const [language, setLanguage] = useState('en');
  const [userType, setUserType] = useState('family');
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', fullName: '', phone: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[language] || translations.en;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password || !formData.fullName) {
      setMessage(t.error);
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage(t.error);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setMessage(t.success);
      setIsLoading(false);
      setFormData({ email: '', password: '', confirmPassword: '', fullName: '', phone: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-upa-ink py-16 px-4 flex items-center">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 w-full">
        <h2 className="text-3xl font-extrabold text-center text-upa-ink mb-6">{t.signup}</h2>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-center text-sm ${message === t.error ? 'bg-red-50 text-red-600' : 'bg-upa-mint/10 text-upa-mintdark'}`}>
            {message}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3 text-sm">{t.user_type}</label>
          <div className="flex gap-3">
            <button
              onClick={() => setUserType('family')}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${
                userType === 'family' ? 'bg-upa-pink text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.family}
            </button>
            <button
              onClick={() => setUserType('nanny')}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${
                userType === 'nanny' ? 'bg-upa-pink text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.nanny}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.full_name}</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input-field" placeholder="Jane Doe" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.email}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.phone}</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" placeholder="+1 (555) 000-0000" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.password}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="••••••••" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.confirm_password}</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2">
            {isLoading ? '...' : t.create_account}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          {t.already_member}{' '}
          <Link href="/login" className="text-upa-pink font-semibold hover:underline">
            {t.login_here}
          </Link>
        </p>
      </div>
    </div>
  );
}
