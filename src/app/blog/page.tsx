'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Newspaper, Search } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import BlogGridWithPagination from '@/components/blog/BlogGridWithPagination';

export default function BlogPage() {
  const { content } = useContent();
  const [search, setSearch] = useState('');

  // Blog = everything EXCEPT Новини
  const blogArticles = content.articles.filter(
    (a) => a.category !== 'Новини'
  );

  const filtered = search.trim()
    ? blogArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.category.toLowerCase().includes(search.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          (Array.isArray(a.tags) && a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())))
      )
    : blogArticles;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* BANNER */}
      <div className="sacred-card rounded-3xl p-8 sm:p-14 border border-sacred-gold/30 text-center relative overflow-hidden bg-gradient-to-r from-sacred-night via-sacred-dark to-sacred-blue/20">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Статті, роздуми, творчість</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
            <span className="gold-text-gradient">Блог</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
            Діалоги про духовну логіку, розбори життєвих ситуацій, хроніки посадки лісів та творчі роздуми.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/news" className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-sacred-goldLight transition-colors">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Перейти до розділу «Новини» →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-lg mx-auto">
        <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Пошук по статтях та темах..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none"
        />
      </div>

      {/* ARTICLES WITH 9 PER PAGE & TAGS */}
      <BlogGridWithPagination
        articles={filtered}
        itemsPerPage={9}
        baseRoutePrefix="/blog"
      />

    </div>
  );
}
