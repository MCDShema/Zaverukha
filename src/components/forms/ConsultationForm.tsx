'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function ConsultationForm({ isModal = false }: { isModal?: boolean }) {
  const { addLead } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skype: '',
    birthDate: '',
    birthTime: '',
    birthCity: '',
    message: '',
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send to Google Apps Script endpoint
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbzk4df1LS2KNyQ5S9vwpWOOsOG_L8vgpNWB4b86FJEq5OqUnJ4gWUMPTAhK4cIALX71yw/exec';
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, String(v)));

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      // Save lead to internal admin store
      addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skype: formData.skype,
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthCity: formData.birthCity,
        message: formData.message,
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Виникла помилка при відправці. Будь ласка, спробуйте ще раз або напишіть нам у Telegram.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4 space-y-4 bg-sacred-dark/80 rounded-2xl border border-sacred-gold/40">
        <div className="w-16 h-16 rounded-full bg-sacred-gold/20 text-sacred-gold flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-serif text-white font-semibold">
          Дякуємо! Ваш запит прийнято
        </h3>
        <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
          Я дуже рада, що ми з вами знайшли один одного. Наша команда зв&apos;яжеться з вами найближчим часом для узгодження зручного дня та часу.
        </p>
        <div className="pt-4">
          <a
            href="https://t.me/pipl_platform_bot?start=consultation"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider"
          >
            <Send className="w-4 h-4" />
            <span>Написати у Telegram-бот зараз</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-900/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Ваше Ім&apos;я *</label>
          <input
            type="text"
            required
            placeholder="Олена"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Email *</label>
          <input
            type="email"
            required
            placeholder="olena@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Телефон (з кодом) *</label>
          <input
            type="tel"
            required
            placeholder="+38 (0__) ___-__-__"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Skype / Telegram (нік)</label>
          <input
            type="text"
            placeholder="@username або Skype"
            value={formData.skype}
            onChange={(e) => setFormData({ ...formData, skype: e.target.value })}
            className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Дата народження *</label>
          <input
            type="text"
            required
            placeholder="ДД.ММ.РРРР"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/80 mb-1">Час народження</label>
          <input
            type="text"
            placeholder="Наприклад: 14:30 (або невідомо)"
            value={formData.birthTime}
            onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
            className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-white/80 mb-1">Місто народження</label>
        <input
          type="text"
          placeholder="Наприклад: Київ, Україна"
          value={formData.birthCity}
          onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
          className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-white/80 mb-1">Коментар або запит</label>
        <textarea
          rows={3}
          placeholder="Опишіть коротко ваш запит (стосунки, призначення, родове зцілення, здоров'я тощо)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          id="consent"
          type="checkbox"
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="rounded border-white/20 text-sacred-gold focus:ring-sacred-gold"
        />
        <label htmlFor="consent" className="text-xs text-white/70">
          Я погоджуюся з обробкою персональних даних та політикою конфіденційності
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-sacred-dark" />
            <span>Відправка запиту...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-sacred-dark" />
            <span>Замовити консультацію</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-white/50 pt-1">
        Або напишіть нам безпосередньо у{' '}
        <a
          href="https://t.me/pipl_platform_bot?start=consultation"
          target="_blank"
          rel="noreferrer noopener"
          className="text-sacred-goldLight underline"
        >
          Telegram-бот консультацій
        </a>
      </p>
    </form>
  );
}
