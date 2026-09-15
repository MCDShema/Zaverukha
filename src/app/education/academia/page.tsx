'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Users, 
  BookOpen,
  CalendarCheck
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function ImariaAcademiaPage() {
  const { content } = useContent();
  const { education } = content;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-6 sm:p-12 border border-[#3833BA]/20 relative overflow-hidden bg-[rgba(56,51,186,0.1)] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3833BA]/25 text-[#2E2B75] text-xs font-semibold uppercase tracking-widest shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-[#3833BA]" />
              <span>Напрямок №2 • Професійне служіння</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif text-[#2E2B75] font-bold">
              IMARIA <span className="gold-text-gradient">Academia®</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {education.academiaIntro}
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-sacred-gold/40 group max-w-md w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/banners/academia-banner.jpg" 
                alt="IMARIA Academia" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FLEXIBLE BLOCK ARCHITECTURE */}
      <div className="space-y-12">
        
        {/* BLOCK 1: MISSION & QUALIFICATION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white font-semibold">Міжнародна кваліфікація</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Офіційний диплом сертифікованого спеціаліста системи IMARIA з правом ведення індивідуальної консультаційної практики.
            </p>
          </div>

          <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white font-semibold">Родова передача протоколів</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Понад 3000 авторських перевірених протоколів квантової родокорекції та спіральних PSY-I технологій.
            </p>
          </div>

          <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif text-white font-semibold">Команда Консульт-центру</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Найкращі випускники отримують можливість стати сертифікованими майстрами Консультаційного центру zaverukha.com.
            </p>
          </div>
        </div>

        {/* BLOCK 2: СТУПЕНІ НАВЧАННЯ (СТУПІНЬ 1 / СТУПІНЬ 2) */}
        <div className="sacred-card rounded-3xl p-8 sm:p-12 border-2 border-sacred-gold/40 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
              Ієрархія знань
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-white font-semibold mt-1">
              Ступені професійного сходження
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-2">
              Гнучка ступенева структура, що дозволяє поступово нарощувати пропускну здатність майстра.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Ступінь 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sacred-gold bg-sacred-gold/20 px-3 py-1 rounded-full">
                  Ступінь 1: Донавчання & Фундамент
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  «Основи квантової вібраціології»
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {education.degree1Desc}
                </p>
                <ul className="space-y-1.5 text-xs text-white/70 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sacred-gold" />
                    <span>Чистота сприйняття без переносу проекцій</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sacred-gold" />
                    <span>Робота з ментальними вірусами та енергопаразитами</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-sacred-goldLight font-medium">Тривалість: 3 місяці</span>
              </div>
            </div>

            {/* Ступінь 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-sacred-gold/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-sacred-goldLight bg-white/15 px-3 py-1 rounded-full">
                  Ступінь 2: Майстерня Хілерів
                </span>
                <h3 className="text-xl font-serif text-white font-semibold">
                  «Вища алхімія цілительства»
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {education.degree2Desc}
                </p>
                <ul className="space-y-1.5 text-xs text-white/70 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sacred-goldLight" />
                    <span>Пряме супровід та менторство Ірини Заверухи</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sacred-goldLight" />
                    <span>Офіційна сертифікація та акредитація майстра</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-sacred-goldLight font-medium">Тривалість: 6 місяців</span>
              </div>
            </div>

          </div>
        </div>

        {/* BLOCK 3: ТРЕНЕРСЬКИЙ КУРС «ПУТЬ ДУШІ» (WAY OF THE SOUL) */}
        <div className="sacred-card rounded-3xl p-8 sm:p-12 border-2 border-sacred-gold relative overflow-hidden bg-gradient-to-r from-sacred-night via-sacred-blue/30 to-sacred-dark">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/20 text-sacred-goldLight text-xs font-bold uppercase">
                <Calculator className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Авторська методика Ірини Заверухи</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif text-white font-semibold">
                Тренерський курс «Путь Душі» (Way of the Soul)®
              </h2>

              <p className="text-sm text-white/80 leading-relaxed">
                {education.trainerDesc}
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-white/70 pt-2">
                <span className="flex items-center gap-1.5">✦ Повний алгоритм розрахунку 22 енергій</span>
                <span className="flex items-center gap-1.5">✦ Робота з клієнтськими запитами</span>
                <span className="flex items-center gap-1.5">✦ Сертифікат тренера-діагноста</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-sacred-dark/90 rounded-2xl border border-sacred-gold/50 space-y-4 text-center">
              <Link
                href="/calculator"
                className="w-full py-3 px-6 rounded-full bg-sacred-gold/20 hover:bg-sacred-gold/30 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Спробувати калькулятор</span>
              </Link>
              <Link
                href="/consultation-center"
                className="w-full py-3.5 px-6 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg"
              >
                <span>Подати заявку на курс</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* BLOCK 4: МАЙСТЕРНЯ ЖІНОЧИХ ТАЇНСТВ (Вимога до вступу за ТЗ) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-sacred-blue/20 border border-sacred-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sacred-gold uppercase tracking-wider">
              Обов&apos;язкова умова вступу
            </span>
            <h3 className="text-xl font-serif text-white font-semibold">
              Участь у «Майстерні жіночих таїнств»
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
              Для зарахування на сертифікаційні ступені IMARIA Academia вимагається проходження щонайменше 1 сакральної ініціації або семінару в рамках Майстерні жіночих таїнств (Алхімікум, родова ініціація чи кемп).
            </p>
          </div>
          <Link
            href="/education/pipl#mysteries"
            className="sacred-blue-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0"
          >
            Переглянути таїнства →
          </Link>
        </div>

      </div>

    </div>
  );
}
