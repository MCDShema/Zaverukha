'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Music, Sparkles, ShoppingBag, ExternalLink, Heart, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function CreativityPage() {
  const { content } = useContent();
  const { creativity } = content;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* PAGE BANNER */}
      <div className="sacred-card rounded-3xl p-8 sm:p-14 border border-sacred-gold/30 text-center relative overflow-hidden bg-gradient-to-r from-sacred-night via-sacred-dark to-purple-950/20">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Матеріалізація сакрального світла</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
            Моя <span className="gold-text-gradient">творчість</span>
          </h1>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            {creativity.intro}
          </p>
        </div>
      </div>


      {/* 1. КНИГИ-ЦІЛИТЕЛІ */}
      <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-sacred-gold/30 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-white font-semibold">Книги-цілителі</h2>
              <p className="text-xs text-sacred-goldLight">Слово, що трансформує свідомість</p>
            </div>
          </div>
          <span className="text-xs bg-white/5 text-white/70 px-3 py-1 rounded-full">
            Друковані видання
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-serif text-white font-semibold">
                {creativity.book1Title}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {creativity.book1Desc}
              </p>
            </div>
            <a
              href={creativity.instagramShopUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="sacred-gold-btn py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
            >
              <span>Замовити книгу через Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-serif text-white font-semibold">
                {creativity.book2Title}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {creativity.book2Desc}
              </p>
            </div>
            <a
              href={creativity.instagramShopUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="sacred-gold-btn py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
            >
              <span>Замовити видання</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>


      {/* 2. МУЗИКА & АЛЬБОМ */}
      <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-sacred-gold/30 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sacred-blue text-sacred-goldLight flex items-center justify-center border border-sacred-gold/30">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-white font-semibold">Пісенний альбом та кліпи</h2>
              <p className="text-xs text-sacred-goldLight">Музика, що пробуджує родову пам&apos;ять</p>
            </div>
          </div>
          <span className="text-xs bg-white/5 text-white/70 px-3 py-1 rounded-full">
            Аудіо & Відео
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-sacred-gold uppercase tracking-wider">Знакова прем&apos;єра</span>
              <h3 className="text-xl font-serif text-white font-semibold">
                «Балада Берегині»
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {creativity.musicBaladaDesc}
              </p>
            </div>
            <a
              href="https://www.youtube.com/channel/UCz9oI1MnVkUTH_MCchtZDuA"
              target="_blank"
              rel="noreferrer noopener"
              className="sacred-blue-btn py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
            >
              <span>Дивитися кліп на YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-sacred-gold uppercase tracking-wider">Ремікс & Енергія</span>
              <h3 className="text-xl font-serif text-white font-semibold">
                SHAMANKA by IMARIA
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {creativity.musicShamankaDesc}
              </p>
            </div>
            <a
              href="https://linktr.ee/Zaverukha"
              target="_blank"
              rel="noreferrer noopener"
              className="sacred-blue-btn py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
            >
              <span>Слухати на музичних платформах</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>


      {/* 3. САКРАЛЬНІ АРТЕФАКТИ (СУКНЯ «СПОРІДНЕНІ», КУЛОН «АВАТАР») */}
      <div className="sacred-card rounded-2xl p-8 sm:p-10 border-2 border-sacred-gold/40 relative overflow-hidden bg-gradient-to-br from-sacred-dark via-sacred-night to-sacred-gold/10">
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/20 text-sacred-goldLight text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Обереги та предмети сили</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif text-white font-semibold">
            Сакральні артефакти сили
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Кожен артефакт створюється за законами сакральної геометрії, намолюється та ініціюється для захисту, гармонізації жіночої природи та розкриття поля достатку.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-48 flex items-center justify-center bg-sacred-night/50 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/dress.png" alt="Сукня Споріднені" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h3 className="text-lg font-serif text-sacred-goldLight font-semibold">
                Сукня Берегині «Споріднені»
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {creativity.dressDesc}
              </p>
            </div>
            <a
              href={creativity.instagramShopUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold text-sacred-goldLight underline block pt-2"
            >
              Переглянути в Instagram →
            </a>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-48 flex items-center justify-center bg-sacred-night/50 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/amulet.png" alt="Кулон АВАТАР" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h3 className="text-lg font-serif text-sacred-goldLight font-semibold">
                Кулон-оберіг «АВАТАР»
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {creativity.avatarDesc}
              </p>
            </div>
            <a
              href={creativity.instagramShopUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold text-sacred-goldLight underline block pt-2"
            >
              Переглянути в Instagram →
            </a>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-48 flex items-center justify-center bg-sacred-night/50 rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/book.png" alt="Бесіди з Ангелами" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h3 className="text-lg font-serif text-sacred-goldLight font-semibold">
                Книга «Бесіди з Ангелами»
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                {creativity.book1Desc}
              </p>
            </div>
            <a
              href={creativity.instagramShopUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-semibold text-sacred-goldLight underline block pt-2"
            >
              Переглянути в Instagram →
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <a
            href={creativity.instagramShopUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider shadow-lg"
          >
            <ShoppingBag className="w-4 h-4 text-sacred-dark" />
            <span>Перейти до простору артефактів @imaria_space</span>
          </a>
        </div>
      </div>

    </div>
  );
}
