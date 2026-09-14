import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Політика конфіденційності | Ірина Заверуха',
  description: 'Політика конфіденційності та обробки персональних даних користувачів сайту zaverukha.com.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-sacred-goldLight hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>На головну</span>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
          <ShieldCheck className="w-4 h-4 text-sacred-gold" />
          <span>Захист персональних даних</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold">
          Політика конфіденційності
        </h1>
        <p className="text-xs text-white/50">
          Останнє оновлення: Вересень 2026 року
        </p>
      </div>

      <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-white/10 space-y-6 text-sm text-white/80 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="text-lg font-serif text-white font-semibold">1. Загальні положення</h2>
          <p>
            Ця Політика конфіденційності встановлює порядок отримання, зберігання, обробки та використання персональних даних користувачів веб-сайту zaverukha.com (ФОП Заверуха-Середа Ірина Леонідівна).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-white font-semibold">2. Збір та використання даних</h2>
          <p>
            Ми збираємо персональні дані (ім&apos;я, контактний телефон, email, дату та час народження), які користувач добровільно надає при заповненні форм запису на консультацію або користуванні онлайн-інструментами сайту. Ці дані використовуються виключно для надання консультаційних послуг, зворотного зв&apos;язку та розрахунку індивідуальних нумерологічних показників.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-white font-semibold">3. Захист та конфіденційність</h2>
          <p>
            Ми забезпечуємо конфіденційність отриманих відомостей та не передаємо персональні дані третім особам, за винятком випадків, передбачених чинним законодавством України.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif text-white font-semibold">4. Контактна інформація</h2>
          <p>
            З питань щодо обробки персональних даних ви можете звертатися через офіційні канали підтримки, зазначені в розділі «Контакти».
          </p>
        </section>
      </div>
    </div>
  );
}
