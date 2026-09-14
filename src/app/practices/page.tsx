'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ArrowRight, ExternalLink, Flame, BookOpen, ShieldCheck } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function PracticesPage() {
  const { content } = useContent();
  const { practices } = content;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
          <span>Оновлені актуальні програми</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
          Практикуми для <span className="gold-text-gradient">кожного дня</span>
        </h1>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          {practices.intro}
        </p>
      </div>

      {/* 2 MAIN PRACTICES PER TZ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. ПЛАП (ПРОГРАМА ЛОЯЛЬНОСТІ АКТИВНОГО ПРАКТИКА) */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border-2 border-sacred-gold/70 relative flex flex-col justify-between group shadow-xl bg-gradient-to-br from-sacred-night via-sacred-dark to-sacred-gold/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider bg-sacred-gold text-sacred-dark px-3 py-1 rounded-full shadow">
                ★ Доступний старт
              </span>
              <span className="text-xs font-semibold text-sacred-goldLight border border-sacred-gold/30 px-3 py-0.5 rounded-full">
                {practices.plapPrice}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
              {practices.plapTitle}
            </h2>
            <p className="text-xs sm:text-sm text-sacred-goldLight font-medium">
              {practices.plapSubtitle}
            </p>

            <p className="text-sm text-white/80 leading-relaxed">
              {practices.plapDesc}
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                <span>Зрозумілі щоденні дії по 10–15 хвилин на день</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                <span>Повний переклад та адаптація українською мовою</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                <span>Психологічно доступна ціна без фінансового навантаження</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-white/50 block">Вартість:</span>
              <span className="text-lg font-bold text-sacred-goldLight">Спеціальна доступна ціна</span>
            </div>
            <a
              href="https://t.me/pipl_platform_bot?start=plap"
              target="_blank"
              rel="noreferrer noopener"
              className="w-full sm:w-auto py-3.5 px-8 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
            >
              <span>Отримати практикум «ПЛАП»</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 2. КУРСИ В ЗАПИСІ */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-white/20 relative flex flex-col justify-between group shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70 bg-white/10 px-3 py-1 rounded-full">
                Відеотека
              </span>
              <span className="text-xs text-sacred-goldLight">
                Миттєвий доступ
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
              {practices.recordingsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-sacred-goldLight font-medium">
              Золота колекція вебінарів та лекцій Ірини Заверухи
            </p>

            <p className="text-sm text-white/80 leading-relaxed">
              {practices.recordingsDesc}
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                <span>Навчання у власному темпі 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                <span>Зручний перегляд на смартфоні чи комп&apos;ютері</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                <span>Супровід бота турботи Pipl</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-white/50 block">Каталог:</span>
              <span className="text-sm font-semibold text-white">Понад 20 записів</span>
            </div>
            <Link
              href="/education/pipl"
              className="w-full sm:w-auto py-3.5 px-8 rounded-full sacred-blue-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
            >
              <span>Переглянути каталог записів</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
