'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import { Lock, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const { login } = useContent();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#070611] flex items-center justify-center p-4">
      <div className="w-full max-w-md sacred-card rounded-3xl p-8 border border-sacred-gold/40 shadow-2xl relative">
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-sacred-gold/20 text-sacred-gold flex items-center justify-center mx-auto border border-sacred-gold/30">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif text-white font-bold">
            Вхід в Адмін-панель
          </h1>
          <p className="text-xs text-white/60">
            Управління сторінками та статтями сайту <span className="text-sacred-goldLight font-medium">zaverukha.com</span>
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Невірний пароль доступу. Спробуйте ще раз.</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-sacred-goldLight uppercase tracking-wider mb-2">
              Пароль адміністратора
            </label>
            <input
              type="password"
              required
              autoFocus
              placeholder="Введіть пароль..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-3.5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sacred-gold/20 text-sm font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
          >
            <span>Увійти в кабінет</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-2">
          <p className="text-[11px] text-white/50">
            За замовчуванням пароль: <code className="text-sacred-gold bg-white/5 px-1.5 py-0.5 rounded">imaria2026</code>
          </p>
          <div>
            <Link href="/" className="text-xs text-white/60 hover:text-white underline">
              ← Повернутися на публічний сайт
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
