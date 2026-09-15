'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, PenLine, Search } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import BlogGridWithPagination from '@/components/blog/BlogGridWithPagination';

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
          a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          (Array.isArray(a.tags) && a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())))
      )
    : newsArticles;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* BANNER */}
      <div className="rounded-3xl p-8 sm:p-14 border border-[#3833BA]/20 text-center relative overflow-hidden bg-[rgba(56,51,186,0.1)] shadow-sm">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#3833BA]/25 text-[#2E2B75] text-xs font-semibold uppercase tracking-widest shadow-xs">
            <Newspaper className="w-3.5 h-3.5 text-[#3833BA]" />
            <span>Офіційні новини та анонси</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#2E2B75] font-bold">
            <span className="gold-text-gradient">Новини</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Офіційні події, анонси заходів, медійні виступи та оголошення від простору IMARIA & PIPL.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-[#2E2B75] hover:text-[#B37E11] font-semibold transition-colors">
              <PenLine className="w-3.5 h-3.5 text-[#3833BA]" />
              <span>Перейти до розділу «Блог» →</span>
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

      {/* ARTICLES WITH 9 PER PAGE & TAGS */}
      <BlogGridWithPagination
        articles={filtered}
        itemsPerPage={9}
        baseRoutePrefix="/news"
      />

    </div>
  );
}
