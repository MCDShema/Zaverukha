'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, Calendar, Clock, ArrowRight, PenLine, Search } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function NewsPage() {
  const { content } = useContent();
  const [search, setSearch] = useState('');

  // News = only Новини category
  const newsArticles = content.articles.filter(
    (a) => a.category === 'Новини'
  );

  const filtered = search.trim()
    ? newsArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(search.toLowerCase())
      )
    : newsArticles;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* BANNER */}
      <div className="sacred-card rounded-3xl p-8 sm:p-14 border border-sacred-gold/30 text-center relative overflow-hidden bg-gradient-to-r from-sacred-night via-sacred-dark to-[#1a3a6b]/20">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Офіційні новини та анонси</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
            <span className="gold-text-gradient">Новини</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Офіційні події, анонси заходів, оголошення від простору IMARIA & PIPL.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-sacred-goldLight transition-colors">
              <PenLine className="w-3.5 h-3.5" />
              <span>Перейти до Блогу →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Пошук по новинах..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none"
        />
      </div>

      {/* NEWS GRID */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/50 text-sm">
          {search ? 'Нічого не знайдено за вашим запитом.' : 'Новин ще немає.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article
              key={article.slug}
              className="sacred-card rounded-2xl border border-white/10 hover:border-sacred-gold/50 transition-all flex flex-col group shadow-lg overflow-hidden"
            >
              {/* Cover image */}
              {article.cover_image && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date}</span>
                    </span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors leading-snug">
                  <Link href={`/news/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-sm text-white/70 leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt}
                </p>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-xs font-semibold text-sacred-goldLight group-hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Читати повністю</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
