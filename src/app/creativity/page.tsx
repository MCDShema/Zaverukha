'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Music, 
  Sparkles, 
  ShoppingBag, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Disc,
  Feather
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { CreativityItem, INITIAL_CONTENT } from '@/data/siteContent';

export default function CreativityPage() {
  const { content } = useContent();
  const { creativity } = content;
  const items: CreativityItem[] = (creativity?.items && creativity.items.length > 0) 
    ? creativity.items 
    : INITIAL_CONTENT.creativity.items;

  // Track expanded state for each item card
  const [expandedItemIds, setExpandedItemIds] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const booksItems = items
    .filter((i) => i.category === 'books')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const musicItems = items
    .filter((i) => i.category === 'music')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const artifactsItems = items
    .filter((i) => i.category === 'artifacts')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 selection:bg-[#3833BA]/10 selection:text-[#2E2B75]">
      
      {/* 1. HERO PAGE BANNER */}
      <div className="rounded-3xl p-8 sm:p-14 border border-[#3833BA]/20 text-center relative overflow-hidden bg-[rgba(56,51,186,0.06)] shadow-sm">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#3833BA]/20 text-[#2E2B75] text-xs font-semibold uppercase tracking-widest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B37E11]" />
            <span>Матеріалізація сакрального світла</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#2E2B75] font-bold tracking-tight">
            Моя <span className="gold-text-gradient">творчість</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {creativity?.intro || 'Творчість Ірини Заверухи — це живий потік сакрального світла, втілений у книгах, музиці та оберегах. Кожен твір створений для зцілення душі, пробудження родової сили та гармонізації свідомості.'}
          </p>

          {/* Quick anchor nav */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#books"
              className="px-4 py-2 rounded-full bg-white text-[#2E2B75] border border-[#3833BA]/20 text-xs font-semibold hover:border-[#3833BA] hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#B37E11]" />
              <span>📚 Книги-цілителі ({booksItems.length})</span>
            </a>
            <a
              href="#music"
              className="px-4 py-2 rounded-full bg-white text-[#2E2B75] border border-[#3833BA]/20 text-xs font-semibold hover:border-[#3833BA] hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <Music className="w-3.5 h-3.5 text-[#3833BA]" />
              <span>🎵 Музика та кліпи ({musicItems.length})</span>
            </a>
            <a
              href="#artifacts"
              className="px-4 py-2 rounded-full bg-white text-[#2E2B75] border border-[#3833BA]/20 text-xs font-semibold hover:border-[#3833BA] hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B37E11]" />
              <span>🔮 Сакральні артефакти ({artifactsItems.length})</span>
            </a>
          </div>
        </div>
      </div>


      {/* 2. КНИГИ-ЦІЛИТЕЛІ */}
      <section id="books" className="scroll-mt-24 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3833BA]/10 text-[#2E2B75] text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#B37E11]" />
              <span>Блок 1 • Література Нового Часу</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2E2B75] font-bold">
              Книги-цілителі
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Слово, що трансформує свідомість. Книги прямої передачі, створені для зцілення внутрішнього світу та пробудження божественної природи людини.
            </p>
          </div>

          <span className="self-start md:self-auto text-xs bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full font-medium border border-slate-200">
            Друковані та цифрові видання
          </span>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {booksItems.map((item) => {
            const isExpanded = !!expandedItemIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(56,51,186,0.08)] transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="w-full h-64 sm:h-72 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden flex items-center justify-center p-6 border-b border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                    />
                    {item.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#2E2B75] border border-[#3833BA]/20 shadow-sm backdrop-blur-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-serif text-[#2E2B75] font-bold leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.shortDesc}
                    </p>

                    {/* Expandable Rich Content */}
                    {isExpanded && item.contentHtml && (
                      <div
                        className="pt-5 mt-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed font-sans space-y-3
                          [&_p]:leading-[1.75] [&_p]:mb-3
                          [&_strong]:font-semibold [&_strong]:text-[#2E2B75]
                          [&_a]:text-[#3833BA] [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-semibold hover:[&_a]:text-[#221e75] [&_a]:cursor-pointer [&_a]:transition-colors
                          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-3
                          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-3 animate-fadeIn"
                        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                      />
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100/60 mt-4">
                  {item.buttonUrl ? (
                    <a
                      href={item.buttonUrl}
                      target={item.buttonUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer noopener"
                      className="btn-primary-dark px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm text-center"
                    >
                      <span>{item.buttonText || 'Детальніше'}</span>
                      {item.buttonUrl.startsWith('http') && <ExternalLink className="w-3.5 h-3.5" />}
                    </a>
                  ) : (
                    <div />
                  )}

                  {item.contentHtml && (
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="btn-outline-blue px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span>{isExpanded ? 'Згорнути опис' : 'Розгорнути опис'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. МУЗИКА & АЛЬБОМ */}
      <section id="music" className="scroll-mt-24 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3833BA]/10 text-[#2E2B75] text-xs font-semibold uppercase tracking-wider">
              <Music className="w-3.5 h-3.5 text-[#3833BA]" />
              <span>Блок 2 • Аудіо & Відео простір</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2E2B75] font-bold">
              Пісенний альбом та кліпи
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Музика, що пробуджує родову пам&apos;ять. Цілительні вібрації, етно-електронні мотиви та високовібраційні мантрійні тексти.
            </p>
          </div>

          <span className="self-start md:self-auto text-xs bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full font-medium border border-slate-200">
            #IMARIACODE • Spotify • YouTube
          </span>
        </div>

        {/* Music Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {musicItems.map((item) => {
            const isExpanded = !!expandedItemIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(56,51,186,0.08)] transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Cover */}
                  <div className="w-full h-56 sm:h-64 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {item.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#2E2B75] shadow-sm backdrop-blur-sm">
                        {item.badge}
                      </span>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Disc className="w-4 h-4 text-[#F5DF7E] animate-spin-slow" />
                        <span className="text-xs font-medium text-white/90">IMARIA MUSIC</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-serif text-[#2E2B75] font-bold leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.shortDesc}
                    </p>

                    {/* Expandable Rich Content */}
                    {isExpanded && item.contentHtml && (
                      <div
                        className="pt-5 mt-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed font-sans space-y-3
                          [&_p]:leading-[1.75] [&_p]:mb-3
                          [&_strong]:font-semibold [&_strong]:text-[#2E2B75]
                          [&_a]:text-[#3833BA] [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-semibold hover:[&_a]:text-[#221e75] [&_a]:cursor-pointer [&_a]:transition-colors
                          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-3
                          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-3 animate-fadeIn"
                        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                      />
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100/60 mt-4">
                  {item.buttonUrl ? (
                    <a
                      href={item.buttonUrl}
                      target={item.buttonUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer noopener"
                      className="btn-primary-dark px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm text-center"
                    >
                      <span>{item.buttonText || 'Слухати трек'}</span>
                      {item.buttonUrl.startsWith('http') && <ExternalLink className="w-3.5 h-3.5" />}
                    </a>
                  ) : (
                    <div />
                  )}

                  {item.contentHtml && (
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="btn-outline-blue px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span>{isExpanded ? 'Згорнути опис' : 'Розгорнути опис'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 4. САКРАЛЬНІ АРТЕФАКТИ СИЛИ */}
      <section id="artifacts" className="scroll-mt-24 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B37E11]/10 text-[#B37E11] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#B37E11]" />
              <span>Блок 3 • Обереги та предмети сили</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2E2B75] font-bold">
              Сакральні артефакти сили
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Кожен артефакт створюється за законами сакральної геометрії, намолюється та ініціюється для захисту, гармонізації жіночої природи та розкриття поля достатку.
            </p>
          </div>

          <a
            href="https://www.instagram.com/imaria_space/"
            target="_blank"
            rel="noreferrer noopener"
            className="self-start md:self-auto text-xs bg-[#2E2B75] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#3833BA] transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#F5DF7E]" />
            <span>@imaria_space в Instagram</span>
          </a>
        </div>

        {/* Artifacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {artifactsItems.map((item) => {
            const isExpanded = !!expandedItemIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(179,126,17,0.12)] transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo container */}
                  <div className="w-full h-72 sm:h-80 bg-gradient-to-b from-[#f8f7f4] to-[#f0efe9] relative overflow-hidden flex items-center justify-center p-6 border-b border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                    />
                    {item.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-[#2E2B75] border border-[#B37E11]/30 shadow-sm backdrop-blur-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-serif text-[#2E2B75] font-bold leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.shortDesc}
                    </p>

                    {/* Expandable Rich Content (Authentic long description with links) */}
                    {isExpanded && item.contentHtml && (
                      <div
                        className="pt-5 mt-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed font-sans space-y-3
                          [&_p]:leading-[1.75] [&_p]:mb-3
                          [&_strong]:font-semibold [&_strong]:text-[#2E2B75]
                          [&_a]:text-[#3833BA] [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-semibold hover:[&_a]:text-[#221e75] [&_a]:cursor-pointer [&_a]:transition-colors
                          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:my-3
                          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:my-3 animate-fadeIn"
                        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                      />
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 sm:p-8 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100/60 mt-4">
                  <a
                    href={item.buttonUrl || "https://www.instagram.com/imaria_space/"}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-primary-dark px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm text-center"
                  >
                    <span>{item.buttonText || 'Замовити в Instagram'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {item.contentHtml && (
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="btn-outline-blue px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span>{isExpanded ? 'Згорнути опис' : 'Розгорнути опис'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 5. INSTAGRAM SPACE FOOTER BANNER */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#18153f] via-[#2E2B75] to-[#18153f] text-white text-center relative overflow-hidden shadow-xl">
        <div className="max-w-2xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F5DF7E] text-xs font-semibold uppercase tracking-widest border border-white/15">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>@imaria_space</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Простір артефактів та сакральних творінь
          </h3>

          <p className="text-sm text-white/80 leading-relaxed">
            Переходьте до офіційної Instagram-сторінки простору, щоб переглянути живі фотографії, замовити консультацію щодо підбору артефакту та відчути енергетику творінь.
          </p>

          <div className="pt-2">
            <a
              href="https://www.instagram.com/imaria_space/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F5DF7E] text-[#1e1b4b] hover:bg-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
            >
              <span>Відвідати @imaria_space в Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
