'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Play, 
  Calendar, 
  Heart, 
  Compass, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Flame 
} from 'lucide-react';
import { YoutubeIcon } from '@/components/ui/Icons';
import { useContent } from '@/context/ContentContext';

export default function SatsangDivineYogaPage() {
  const { content } = useContent();
  const { satsangYoga } = content;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* HERO BANNER */}
      <div className="rounded-3xl p-6 sm:p-12 border border-[#3833BA]/20 relative overflow-hidden bg-[rgba(56,51,186,0.1)] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3833BA]/25 text-[#2E2B75] text-xs font-semibold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B37E11]" />
              <span>УТП проєкту • Практики служіння</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-[#2E2B75] font-bold tracking-tight">
              Сатсанги.<span className="gold-text-gradient">DivineYoga</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {satsangYoga.intro}
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-sacred-gold/40 group max-w-md w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/satsang-banner.jpg" 
                alt="Сатсанги та DivineYoga" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>


      {/* 4 MAIN CONTENT BLOCKS PER TECHNICAL SPECIFICATION */}
      <div className="space-y-12">

        {/* 1. БЕЗКОШТОВНИЙ ВІДКРИТИЙ ДОСТУП ДО ДИВАНЬ-ЙОГИ */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-sacred-gold/40 bg-gradient-to-br from-sacred-night to-sacred-blue/20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                Постійно діючий дар світові
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Безкоштовний відкритий доступ до DivineYoga
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                {satsangYoga.divineYogaDesc}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-sacred-goldLight pt-1">
                <span>✦ Відновлення нервової системи</span>
                <span>✦ Зняття затисків у спині та шиї</span>
                <span>✦ 100% вільний доступ на YouTube</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-sacred-dark/90 rounded-2xl border border-sacred-gold/30 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center">
                <YoutubeIcon className="w-6 h-6" />
              </div>
              <div className="text-sm font-serif text-white font-semibold">Плейлист занять DivineYoga</div>
              <a
                href={satsangYoga.youtubeYogaPlaylistUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-3.5 px-6 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <Play className="w-4 h-4 fill-sacred-dark" />
                <span>Дивитися та займатися</span>
              </a>
            </div>
          </div>
        </div>


        {/* 2. НАЙБЛИЖЧІ МАРАФОНИ */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                Живий контакт
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold mt-1">
                Найближчі онлайн-марафони
              </h2>
            </div>
            <span className="text-xs text-sacred-goldLight bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
              Оновлюється щомісяця
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] text-sacred-gold font-semibold uppercase tracking-wider">
                  Сезонний марафон очищення
                </span>
                <h3 className="text-lg font-serif text-white font-medium">
                  «Перезавантаження тіла і духу»
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  7 днів щоденних ранкових налаштувань, йогічного дихання та вечірнього звільнення від ментального напруження.
                </p>
              </div>
              <a
                href="https://t.me/PIPL_AnnounceBot"
                target="_blank"
                rel="noreferrer noopener"
                className="pt-2 text-xs font-semibold text-sacred-goldLight hover:underline flex items-center gap-1"
              >
                <span>Дізнатися дати в Telegram-боті</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] text-sacred-gold font-semibold uppercase tracking-wider">
                  Родовий інтенсив
                </span>
                <h3 className="text-lg font-serif text-white font-medium">
                  «Сила Берегині: Родове зцілення»
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  3 живі вебінари з Іриною Заверухою, пряма передача молитовних та квантових протоколів благословення роду.
                </p>
              </div>
              <a
                href="https://t.me/PIPL_AnnounceBot"
                target="_blank"
                rel="noreferrer noopener"
                className="pt-2 text-xs font-semibold text-sacred-goldLight hover:underline flex items-center gap-1"
              >
                <span>Підписатися на анонс</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>


        {/* 3. МАРАФОНИ ТА ЛЕКЦІЇ В ЗАПИСІ */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-white/10 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
              Для самостійного проходження
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
              Марафони та лекції в записі
            </h2>
            <p className="text-xs sm:text-sm text-white/70">
              Отримуйте доступ миттєво та займайтеся у зручному для вас темпі.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-sacred-dark/80 border border-white/10 space-y-2">
              <h3 className="text-base font-serif text-white font-medium">«Кінець — це початок!»</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Знакова лекція про те, як виходити з особистих криз та перетворювати втрати на портал росту.
              </p>
              <Link href="/blog" className="text-xs text-sacred-goldLight underline block pt-2">
                Детальніше про запис →
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-sacred-dark/80 border border-white/10 space-y-2">
              <h3 className="text-base font-serif text-white font-medium">«Стосунки Нового Часу»</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Запис 3-денного марафону про духовну логіку союзу душ, без маніпуляцій та взаємних докорів.
              </p>
              <Link href="/education/pipl" className="text-xs text-sacred-goldLight underline block pt-2">
                Перейти до курсу →
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-sacred-dark/80 border border-white/10 space-y-2">
              <h3 className="text-base font-serif text-white font-medium">«Гроші та Енергія Роду»</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Практикум розблокування фінансового потоку через зняття заборон предків.
              </p>
              <Link href="/practices" className="text-xs text-sacred-goldLight underline block pt-2">
                Переглянути в Практиках →
              </Link>
            </div>
          </div>
        </div>


        {/* 4. ВІДКРИТІ МЕДИТАЦІЇ ТА САТСАНГИ (YouTube) */}
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-sacred-gold/30 bg-gradient-to-r from-sacred-night to-sacred-dark">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center sm:text-left">
              <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                Каталог аудіо- та відео-медитацій
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Медитації спокою та зцілення серця
              </h2>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
                {satsangYoga.meditationDesc}
              </p>
            </div>

            <a
              href={satsangYoga.youtubeMeditationsPlaylistUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="sacred-gold-btn px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-105 transition-all shrink-0"
            >
              <YoutubeIcon className="w-4 h-4 text-sacred-dark" />
              <span>Відкрити плейлист медитацій</span>
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
