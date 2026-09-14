import React from 'react';
import Link from 'next/link';
import { Compass, GraduationCap, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const metadata = {
  title: 'Навчання | Екосистема PIPL та IMARIA Academia | Ірина Заверуха',
  description: 'Два зрозумілі напрямки навчання: Екосистема PIPL для саморозвитку та зцілення, IMARIA Academia для професійних хілерів та майстрів.',
};

export default function EducationHubPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* SECTION BANNER (Without old sign, modern clean sacred style per TZ) */}
      <div className="sacred-card rounded-3xl p-8 sm:p-14 border border-sacred-gold/30 text-center relative overflow-hidden bg-gradient-to-b from-sacred-night via-sacred-dark to-sacred-blue/20">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Нова архітектура навчання</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
            Оберіть свій вектор у <span className="gold-text-gradient">Навчанні</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Ми розділили всі навчальні програми на 2 зрозумілі напрямки, щоб кожна людина одразу побачила своє місце: чи ви новачок, який шукає гармонії у житті, чи досвідчений практик, який прагне сертифікації провідника.
          </p>
        </div>
      </div>

      {/* 2 MAIN DIRECTIONS (PIPL vs IMARIA ACADEMIA) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* DIRECTION 1: PIPL ECOSYSTEM */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border-2 border-sacred-gold/40 hover:border-sacred-gold transition-all flex flex-col justify-between group shadow-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-sacred-blue/60 border border-sacred-gold/40 flex items-center justify-center text-sacred-gold">
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-sacred-gold/20 text-sacred-goldLight px-3.5 py-1 rounded-full border border-sacred-gold/30">
                Напрямок №1
              </span>
            </div>

            <div>
              <h2 className="text-3xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors">
                Екосистема PIPL®
              </h2>
              <p className="text-xs text-sacred-goldLight font-medium mt-1">
                Для себе • Для життя • Для зцілення стосунків і долі
              </p>
            </div>

            <p className="text-sm text-white/80 leading-relaxed">
              Простір багатовимірного розвитку ментально зрілих людей. Тут зібрані програми як для тих, хто робить перші кроки, так і для досвідчених практиків:
            </p>

            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0 mt-0.5" />
                <span><strong>«Сам собі цілитель»</strong> — 3 лекції, базовий фундамент для новачків</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0 mt-0.5" />
                <span><strong>«Від гордині до гідності»</strong> — Мамина і Татова історія</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0 mt-0.5" />
                <span><strong>Річна програма «КРИЛА®»</strong> — академічні знання для жінок</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0 mt-0.5" />
                <span><strong>Майстерня жіночих таїнств</strong> — Алхімікум, ініціації, родові сеанси</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0 mt-0.5" />
                <span><strong>PIPL Club & Соціальна місія</strong> — живі ефіри та висадка лісів</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8">
            <Link
              href="/education/pipl"
              className="w-full py-4 rounded-xl sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-transform"
            >
              <span>Перейти в Екосистему PIPL</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* DIRECTION 2: IMARIA ACADEMIA */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border-2 border-sacred-gold/40 hover:border-sacred-gold transition-all flex flex-col justify-between group shadow-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-sacred-blue/60 border border-sacred-gold/40 flex items-center justify-center text-sacred-goldLight">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/15 text-white px-3.5 py-1 rounded-full border border-white/20">
                Напрямок №2
              </span>
            </div>

            <div>
              <h2 className="text-3xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors">
                IMARIA Academia®
              </h2>
              <p className="text-xs text-sacred-goldLight font-medium mt-1">
                Для провідників • Хілерів • Менторів • Вібраціологів
              </p>
            </div>

            <p className="text-sm text-white/80 leading-relaxed">
              Сертифікаційний простір вищого рівня для підготовки фахівців квантової трансформації свідомості та передачі ієрархічних знань:
            </p>

            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-goldLight shrink-0 mt-0.5" />
                <span><strong>Ступінь 1 та Ступінь 2</strong> — професійна ієрархія навчання</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-goldLight shrink-0 mt-0.5" />
                <span><strong>Тренерський курс «Путь Душі»</strong> — сертифікація діагностів долі</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-goldLight shrink-0 mt-0.5" />
                <span><strong>Робота з родовими протоколами</strong> прямої традиції передачі</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-goldLight shrink-0 mt-0.5" />
                <span><strong>Вимога до вступу</strong>: мінімум 1 сакральна ініціація</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sacred-goldLight shrink-0 mt-0.5" />
                <span><strong>Участь у Консультаційному центрі</strong> як сертифікований майстер</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8">
            <Link
              href="/education/academia"
              className="w-full py-4 rounded-xl sacred-blue-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
            >
              <span>Дізнатися про IMARIA Academia</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* QUICK CROSS-LINKS */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-base font-serif text-white font-medium">Не знаєте, який курс обрати першим?</h3>
          <p className="text-xs text-white/70">
            Зробіть безкоштовний розрахунок у калькуляторі або проконсультуйтеся з Командою турботи Pipl.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/calculator"
            className="sacred-gold-btn px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            Калькулятор долі
          </Link>
          <a
            href="https://t.me/pipl_platform_bot?start=support"
            target="_blank"
            rel="noreferrer noopener"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider"
          >
            Telegram підтримка
          </a>
        </div>
      </div>

    </div>
  );
}
