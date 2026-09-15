'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  Calculator, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  Award
} from 'lucide-react';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { useContent } from '@/context/ContentContext';

export default function ConsultationCenterPage() {
  const { content } = useContent();
  const { consultationCenter } = content;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
          <CalendarCheck className="w-3.5 h-3.5 text-sacred-gold" />
          <span>Офіційний комерційний проєкт</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
          {consultationCenter.title.split(' ')[0]} <span className="gold-text-gradient">{consultationCenter.title.split(' ').slice(1).join(' ') || 'центр'}</span>
        </h1>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {consultationCenter.intro}
        </p>

        {/* Authentic Consultation Banner Image */}
        <div className="pt-2 max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-sacred-gold/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/consultations-banner.jpg" 
            alt="Консультації Ірини Заверухи" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>


      {/* ========================================================= */}
      {/* БЛОК 1: БЕЗКОШТОВНИЙ КАЛЬКУЛЯТОР ПУТЬ ДУШІ */}
      {/* ========================================================= */}
      <div className="rounded-3xl p-8 sm:p-12 border border-[#3833BA]/20 relative overflow-hidden bg-[rgba(56,51,186,0.1)] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#3833BA]/25 text-[#2E2B75] text-xs font-bold uppercase shadow-xs">
              <Calculator className="w-3.5 h-3.5 text-[#3833BA]" />
              <span>Експрес-діагностика перед консультацією</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif text-[#2E2B75] font-bold tracking-wide">
              {consultationCenter.calculatorBannerTitle}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
              {consultationCenter.calculatorBannerDesc}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-[#B37E11] font-semibold pt-1 justify-center lg:justify-start">
              <span>✦ Миттєвий розрахунок за датою</span>
              <span>✦ 22 енергії свідомості</span>
              <span>✦ 100% безкоштовно онлайн</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3">
            <Link
              href="/calculator"
              className="w-full py-4 px-8 rounded-full sacred-gold-btn text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl hover:scale-105 transition-all text-center"
            >
              <Calculator className="w-4 h-4 text-sacred-dark" />
              <span>Розрахувати свій шлях →</span>
            </Link>
            <span className="text-[11px] text-white/50 text-center">
              Перехід на сторінку інтерактивного калькулятора
            </span>
          </div>
        </div>
      </div>


      {/* ========================================================= */}
      {/* БЛОК 2: ОПИС ЦЕНТРУ ЯК СЕРЙОЗНОГО КОМЕРЦІЙНОГО ПРОЄКТУ */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Col: Description of the Center & Specialists */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
              Про Центр та підхід
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
              Сертифіковані майстри та квантові технології
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Консультаційний центр — це не просто разові бесіди, а комплексний проєкт з командою сертифікованих спеціалістів, які пройшли ієрархічне навчання в <strong className="text-sacred-goldLight">IMARIA Academia</strong>. 
              Кожен майстер має допуск до роботи з тонкопольовими структурами та володіє методологією родокорекції.
            </p>
          </div>

          {/* Formats of consultations */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-white font-medium">
              Напрямки індивідуальної роботи:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-sm font-serif text-sacred-gold font-semibold">
                  {consultationCenter.service1Title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {consultationCenter.service1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-sm font-serif text-sacred-gold font-semibold">
                  {consultationCenter.service2Title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {consultationCenter.service2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-sm font-serif text-sacred-gold font-semibold">
                  {consultationCenter.service3Title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {consultationCenter.service3Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="text-sm font-serif text-sacred-gold font-semibold">
                  {consultationCenter.service4Title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {consultationCenter.service4Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Certified Masters Info */}
          <div className="p-6 rounded-2xl bg-sacred-blue/20 border border-sacred-gold/30 space-y-3">
            <div className="flex items-center gap-2 text-sacred-gold font-semibold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Високий стандарт сертифікації</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              До роботи в центрі допускаються виключно майстри, які успішно захистили кваліфікацію в системі IMARIA Academia та склали етичний кодекс духовного провідника.
            </p>
            <div className="text-xs text-sacred-goldLight pt-1">
              ✦ Індивідуальні консультації безпосередньо з Іриною Заверухою проводяться за попереднім узгодженням запиту.
            </div>
          </div>

          {/* Cross links */}
          <div className="pt-2 flex items-center gap-4 text-xs text-white/60">
            <span>Пов&apos;язані розділи:</span>
            <Link href="/calculator" className="text-sacred-goldLight underline">Калькулятор</Link>
            <span>•</span>
            <Link href="/education/academia" className="text-sacred-goldLight underline">IMARIA Academia</Link>
            <span>•</span>
            <Link href="/contacts" className="text-sacred-goldLight underline">Реквізити та оплата</Link>
          </div>

        </div>

        {/* Right Col: Consultation Booking Form */}
        <div className="lg:col-span-5">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-sacred-gold/40 shadow-xl sticky top-28">
            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-serif text-white font-semibold">
                Замовити консультацію
              </h3>
              <p className="text-xs text-white/70">
                Залиште свої дані, і координатор центру зв&apos;яжеться з вами для вибору зручного дня та майстра.
              </p>
            </div>

            <ConsultationForm />
          </div>
        </div>

      </div>

    </div>
  );
}
