'use client';

import { useState } from 'react';
import Link from 'next/link';

const translations = {
  en: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    sign_in: 'Sign In',
    forgot_password: 'Forgot password?',
    no_account: "Don't have an account?",
    sign_up_here: 'Sign up here',
    success: 'Logged in successfully!',
    error: 'Invalid email or password',
  },
  es: {
    login: 'Iniciar Sesión',
    email: 'Correo',
    password: 'Contraseña',
    sign_in: 'Iniciar Sesión',
    forgot_password: '¿Olvidaste la contraseña?',
    no_account: '¿No tienes cuenta?',
    sign_up_here: 'Regístrate aquí',
    success: '¡Sesión iniciada exitosamente!',
    error: 'Correo o contraseña inválidos',
  },
  he: {
    login: 'התחברות',
    email: 'אימייל',
    password: 'סיסמה',
    sign_in: 'התחברות',
    forgot_password: 'שכחתם סיסמה?',
    no_account: 'אין לכם חשבון?',
    sign_up_here: 'הירשמו כאן',
    success: 'התחברתם בהצלחה!',
    error: 'אימייל או סיסמה לא תקינים',
  },
};

export default function LoginClient() {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    if (!formData.email || !formData.password) {
      setMessage(t.error);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setMessage(t.success);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-upa-ink py-16 px-4 flex items-center">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 w-full">
        <h2 className="text-3xl font-extrabold text-center text-upa-ink mb-6">{t.login}</h2>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-center text-sm ${message === t.success ? 'bg-upa-mint/10 text-upa-mintdark' : 'bg-red-50 text-red-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.email}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">{t.password}</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder="••••••••" />
          </div>

          <div className="text-right rtl:text-left">
            <Link href="#" className="text-upa-pink hover:underline text-sm font-semibold">
              {t.forgot_password}
            </Link>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2">
            {isLoading ? '...' : t.sign_in}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          {t.no_account}{' '}
          <Link href="/signup" className="text-upa-pink font-semibold hover:underline">
            {t.sign_up_here}
          </Link>
        </p>
      </div>
    </div>
  );
}
