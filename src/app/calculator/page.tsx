import React from 'react';
import Link from 'next/link';
import { Calculator, Sparkles, Compass, ShieldCheck, ArrowRight, BookOpen, Star } from 'lucide-react';
import SoulPathCalculator from '@/components/calculator/SoulPathCalculator';

export const metadata = {
  title: 'Калькулятор «Путь Душі» (Way of the Soul)® | Ірина Заверуха',
  description: 'Безкоштовний нумерологічний онлайн-калькулятор розрахунку призначення, кармічних завдань та енергій долі за авторською методикою Ірини Заверухи.',
};

export default function CalculatorPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* PAGE INTRO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
          <Calculator className="w-3.5 h-3.5 text-sacred-gold" />
          <span>Аналітично-нумерологічна методика діагностики долі</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
          Калькулятор <span className="gold-text-gradient">«Путь Душі»</span>
        </h1>
        <p className="text-xs font-serif text-sacred-goldLight uppercase tracking-widest -mt-1">
          Way of the Soul® by IMARIA
        </p>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          Авторський інструмент Ірини Заверухи для миттєвого зчитування архетипів свідомості, родових сценаріїв та ключового призначення людини за сакральною матрицею 22 Енергій Всесвіту.
        </p>
      </div>

      {/* INTERACTIVE CALCULATOR TOOL */}
      <SoulPathCalculator />

      {/* METHODOLOGY EXPLANATION */}
      <div className="sacred-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-8">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
            Як це працює
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold mt-1">
            Про метод «Путь Душі» (Way of the Soul)®
          </h2>
          <p className="text-sm text-white/80 leading-relaxed mt-2">
            Дата нашого народження — це не випадковий набір чисел. Це точний енергетичний паспорт душі, який вона обирає для втілення на Землі. 
            Кожна з 22 енергій має свій світлий потенціал («ресурс») та тіньовий прояв («виклик»).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sacred-gold/20 text-sacred-gold flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-serif text-white font-medium">Енергія народження</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Ваша візитна картка у соціумі. Те, як вас бачать люди при першій зустрічі, та ваш базовий характер проявлення.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sacred-gold/20 text-sacred-gold flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-serif text-white font-medium">Канал інтуїції та дарів</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Зв&apos;язок з вищими силами, духовні таланти та внутрішнє передчуття, яке направляє вас у поворотні моменти.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-sacred-gold/20 text-sacred-gold flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-serif text-white font-medium">Головне призначення</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Вища місія, заради якої ви прийшли в це життя. Відкривається у повній мірі після гармонізації стосунків з батьками.
            </p>
          </div>
        </div>

        {/* Callouts to other areas */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/70">
            Бажаєте навчитися самостійно консультувати за цим методом?
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/education/academia"
              className="sacred-blue-btn px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Тренерський курс в Академії
            </Link>
            <Link
              href="/consultation-center"
              className="sacred-gold-btn px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Замовити індивідуальний розбір
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
