'use client';

import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Article } from '@/data/articles';
import { Calendar, Clock, ArrowLeft, ArrowRight, Newspaper, MessageSquareHeart, GraduationCap } from 'lucide-react';
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
      <div className="rounded-3xl p-8 sm:p-12 border border-[#3833BA]/20 relative overflow-hidden bg-[rgba(56,51,186,0.1)] shadow-sm space-y-6">
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

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
          <span className="px-2.5 py-1 rounded bg-[#3833BA]/15 text-[#2E2B75] font-semibold border border-[#3833BA]/25 flex items-center gap-1">
            <Newspaper className="w-3 h-3 text-[#3833BA]" />
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-[#B37E11] font-semibold">
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

        <h1 className="text-2xl sm:text-4xl font-serif text-[#2E2B75] font-bold leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-base text-slate-700 leading-relaxed border-l-2 border-[#C99A2C] pl-4">
            {article.excerpt}
          </p>
        )}

        <div className="text-xs text-slate-500 font-medium">
          Автор: <span className="text-[#2E2B75] font-semibold">{article.author || 'Ірина Заверуха'}</span>
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

      {/* FOOTER CTA & NAV */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://t.me/pipl_platform_bot?start=consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-primary-dark text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span>Замовити консультацію</span>
        </a>

        <Link
          href="/education"
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-outline-blue text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Запрошуємо на навчання</span>
        </Link>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/news"
          className="w-full sm:w-auto px-6 py-3 rounded-xl btn-outline-blue text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Всі новини</span>
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl btn-outline-blue text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
        >
          <span>На головну сторінку</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
