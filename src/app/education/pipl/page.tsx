'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Trees, 
  GraduationCap, 
  ExternalLink, 
  Flame, 
  Star 
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function PiplEcosystemPage() {
  const { content } = useContent();
  const { education } = content;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl p-8 sm:p-12 border border-[#3833BA]/20 relative overflow-hidden bg-[rgba(56,51,186,0.1)] shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3833BA]/25 text-[#2E2B75] text-xs font-semibold uppercase tracking-widest shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#3833BA]" />
            <span>Напрямок №1 • Для себе і життя</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#2E2B75] font-bold">
            Екосистема <span className="gold-text-gradient">PIPL®</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {education.piplIntro}
          </p>
        </div>
      </div>

      {/* CARDS LIST PER TECHNICAL SPECIFICATION */}
      <div className="space-y-10">

        {/* 1. МАМИНА ІСТОРІЯ / ТАТОВА ІСТОРІЯ («ВІД ГОРДИНІ ДО ГІДНОСТІ») */}
        <div id="hordyni" className="sacred-card rounded-2xl p-6 sm:p-10 border-2 border-sacred-gold/70 shadow-2xl relative overflow-hidden bg-gradient-to-br from-sacred-night via-sacred-dark to-sacred-gold/10">
          <div className="absolute top-4 right-4">
            <span className="bg-sacred-gold text-sacred-dark text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow">
              ★ Піднято в топ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                Базовий фундаментальний курс
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-semibold">
                «Мамина історія / Татова історія»
              </h2>
              <p className="text-sm sm:text-base text-sacred-goldLight font-medium">
                Курс «Від гордині до гідності» — шлях до безумовного прийняття
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                {education.hordyniDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                  <span>Пропрацювання фінансового затиску через матір</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sacred-gold shrink-0" />
                  <span>Відновлення захисту та масштабу через батька</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 text-center">
              <div className="text-xs text-white/60">Формат: Доступ у записі з куратором</div>
              <div className="text-2xl font-serif text-sacred-goldLight font-bold">Відкрито набір</div>
              <a
                href="https://pipl.net.ua/vid-hordyni-record"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-3.5 px-6 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
              >
                <span>Приєднатися до курсу</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>


        {/* 2. САМ СОБІ ЦІЛИТЕЛЬ */}
        <div id="healer" className="sacred-card rounded-2xl p-6 sm:p-10 border border-sacred-gold/40 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                  Рекомендований старт
                </span>
                <span className="text-[10px] bg-sacred-gold/20 text-sacred-goldLight px-2 py-0.5 rounded border border-sacred-gold/30">
                  Доступна ціна
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                «Сам собі цілитель»
              </h2>
              <p className="text-sm text-sacred-goldLight font-medium">
                3 фундаментальні україномовні лекції прямої передачі
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                {education.healerDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 text-center">
              <div className="text-xs text-white/60">3 відео-лекції + протоколи практик</div>
              <div className="text-xl font-serif text-white font-bold">Окремий доступ</div>
              <a
                href="https://pipl.net.ua/school"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-3 px-6 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
              >
                <span>Отримати лекції</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>


        {/* 3. КРИЛА® (ОКРЕМИЙ БРЕНД-БАНЕР ТА САМОСТІЙНИЙ БРЕНД) */}
        <div id="kryla" className="sacred-card rounded-2xl p-6 sm:p-10 border-2 border-sacred-gold relative overflow-hidden bg-gradient-to-r from-sacred-dark via-sacred-blue/40 to-sacred-night shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/20 text-sacred-goldLight text-xs font-bold uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Самостійний бренд-проєкт</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif text-white font-bold tracking-wide">
                Річна програма «КРИЛА®»
              </h2>
              <p className="text-sm sm:text-base text-sacred-goldLight font-medium">
                Ієрархічні академічні знання для повної квантової трансформації жінки
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                {education.krylaDesc}
              </p>

              <div className="pt-2">
                <a
                  href="https://pipl.net.ua/kryla"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider shadow-xl"
                >
                  <span>Перейти на сайт «КРИЛА»</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-sacred-gold/50 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={education.krylaBannerImage || "/images/banners/kryla-banner.jpg"} 
                  alt="Крила Ірини Заверухи" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>


        {/* 4. МАЙСТЕРНЯ ЖІНОЧИХ ТАЇНСТВ (НОВИЙ БЛОК: АЛХІМІКУМ, ІНІЦІАЦІЇ, СЕМІНАРИ) */}
        <div id="mysteries" className="sacred-card rounded-2xl p-6 sm:p-10 border-2 border-sacred-gold/50 relative bg-gradient-to-br from-sacred-night via-sacred-dark to-purple-950/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                  Сакральний простір
                </span>
                <span className="text-[10px] bg-sacred-gold/20 text-white px-2.5 py-0.5 rounded-full border border-sacred-gold/30">
                  Новий розділ сайту
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif text-white font-semibold">
                Майстерня жіночих таїнств
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {education.mysteriesDesc}
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-sacred-gold/50 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={education.alhimicumBannerImage || "/images/banners/alhimicum-banner.jpg"} 
                  alt="Алхімікум" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-sm font-serif text-sacred-gold font-semibold">Алхімікум</div>
                <p className="text-xs text-white/60">Мистецтво управління енергетичними процесами життя</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-sm font-serif text-sacred-gold font-semibold">Ініціації Сили</div>
                <p className="text-xs text-white/60">Пряма передача каналу Берегині (вимога для вступу в Академію)</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-sm font-serif text-sacred-gold font-semibold">Виїзні Кемпи</div>
                <p className="text-xs text-white/60">Ретрити перезавантаження в місцях сили та на природі</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-sm font-serif text-sacred-gold font-semibold">Magic Woman Day</div>
                <p className="text-xs text-white/60">Свято жіночого кола, практик краси, голосу і танцю</p>
              </div>
            </div>

            {/* Cross-links note per TZ */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 border-t border-white/10">
              <p>
                ✦ Проходження мінімум 1 ініціації є обов&apos;язковою умовою для сертифікації в <Link href="/education/academia" className="text-sacred-goldLight underline">IMARIA Academia</Link>.
              </p>
              <Link
                href="/consultation-center"
                className="sacred-gold-btn px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0"
              >
                Дізнатися дати найближчих таїнств
              </Link>
            </div>
          </div>


        {/* 5. PIPL CLUB (КЛУБ ПРАКТИКІВ) */}
        <div id="club" className="sacred-card rounded-2xl p-6 sm:p-10 border border-white/20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                Закрите коло однодумців
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                #PiplClub — Спільнота практиків
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                {education.clubDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 text-center">
              <div className="text-xs text-white/60">Щотижневі ефіри та розбори</div>
              <a
                href="https://t.me/pipl_platform_bot?start=club"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-3.5 px-6 rounded-full sacred-blue-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <span>Дізнатися про PIPL Club</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>


        {/* 6. СОЦІАЛЬНА МІСІЯ (ЛІСИ & AURUM SOUL CLUB) */}
        <div id="social" className="sacred-card rounded-2xl p-6 sm:p-10 border border-green-500/30 bg-gradient-to-br from-sacred-dark to-emerald-950/20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Trees className="w-4 h-4 text-emerald-400" />
                <span>Суспільна діяльність з 2001 року</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Соціальна місія та «Саджаємо ліси»
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                {education.socialDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 text-center">
              <div className="text-xs text-white/60">Екологічні та благодійні проєкти</div>
              <Link
                href="/contacts"
                className="w-full py-3 px-6 rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Підтримати місію</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
