'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Article } from '@/data/articles';
import { Calendar, Clock, ArrowLeft, Newspaper } from 'lucide-react';
import Link from 'next/link';

interface NewsDetailViewProps {
  initialArticle: Article;
}

export default function NewsDetailView({ initialArticle }: NewsDetailViewProps) {
  const { content } = useContent();
  const article = content.articles.find((a) => a.slug === initialArticle.slug) || initialArticle;

  return (
    <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* BACK */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-semibold text-sacred-goldLight hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до всіх новин</span>
        </Link>
      </div>

      {/* HEADER */}
      <div className="sacred-card rounded-3xl p-8 sm:p-12 border border-sacred-gold/30 relative overflow-hidden bg-gradient-to-br from-sacred-night via-sacred-dark to-[#1a3a6b]/20 space-y-6">
        {/* Cover image */}
        {(article.cover_image || article.image) && (
          <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6">
            <img
              src={article.cover_image || article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
          <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30 flex items-center gap-1">
            <Newspaper className="w-3 h-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          {article.readTime && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif text-white font-bold leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-base text-white/70 leading-relaxed border-l-2 border-sacred-gold/50 pl-4">
            {article.excerpt}
          </p>
        )}

        <div className="text-xs text-white/50">
          Автор: <span className="text-white/80">{article.author || 'Ірина Заверуха'}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="sacred-card rounded-2xl p-6 sm:p-10 border border-white/10 space-y-6">
        {(Array.isArray(article.content) ? article.content : [article.content]).map((para, i) => (
          <p key={i} className="text-sm sm:text-base text-white/85 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-center pt-4">
        <Link
          href="/news"
          className="btn-outline-blue px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Всі новини
        </Link>
      </div>
    </article>
  );
}
