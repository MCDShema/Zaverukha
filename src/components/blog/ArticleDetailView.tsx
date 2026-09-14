'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Send } from 'lucide-react';
import { Article } from '@/data/articles';
import { useContent } from '@/context/ContentContext';

interface ArticleDetailViewProps {
  initialArticle: Article;
}

export default function ArticleDetailView({ initialArticle }: ArticleDetailViewProps) {
  const { content } = useContent();
  const article = content.articles.find((a) => a.slug === initialArticle.slug) || initialArticle;

  return (
    <article className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* BACK BUTTON */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-sacred-goldLight hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до всіх статей</span>
        </Link>
      </div>

      {/* HEADER */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-white/60">
          <span className="px-2.5 py-1 rounded bg-sacred-gold/20 text-sacred-goldLight font-medium border border-sacred-gold/30">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
          {article.title}
        </h1>
      </div>

      {/* CONTENT */}
      <div className="sacred-card rounded-2xl p-8 sm:p-12 border border-white/10 space-y-6 text-base sm:text-lg text-white/80 leading-relaxed font-sans font-light">
        {article.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* SHARE & TELEGRAM CALLOUT */}
      <div className="p-6 rounded-2xl bg-sacred-blue/20 border border-sacred-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-base font-serif text-white font-semibold">
            Бажаєте першими читати нові публікації?
          </h3>
          <p className="text-xs text-white/70">
            Підписуйтесь на офіційний канал Ірини Заверухи в Telegram
          </p>
        </div>
        <a
          href="https://t.me/ZaverukhaIrina"
          target="_blank"
          rel="noreferrer noopener"
          className="sacred-gold-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow shrink-0"
        >
          <Send className="w-4 h-4 text-sacred-dark" />
          <span>Підписатися на Telegram</span>
        </a>
      </div>

    </article>
  );
}
