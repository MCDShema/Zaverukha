'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export default function BlogPage() {
  const { content } = useContent();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* BANNER */}
      <div className="sacred-card rounded-3xl p-8 sm:p-14 border border-sacred-gold/30 text-center relative overflow-hidden bg-gradient-to-r from-sacred-night via-sacred-dark to-sacred-blue/20">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Думки, новини та одкровення</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
            Блог та <span className="gold-text-gradient">Новини</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Діалоги про духовну логіку, розбори життєвих ситуацій, хроніки посадки лісів та офіційні події простору IMARIA & PIPL.
          </p>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.articles.map((article) => (
          <article 
            key={article.slug}
            className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-sacred-gold/50 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="px-2.5 py-1 rounded bg-sacred-gold/20 text-sacred-goldLight font-medium border border-sacred-gold/30">
                  {article.category}
                </span>
                <div className="flex items-center gap-3">
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
              </div>

              <h2 className="text-xl sm:text-2xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors leading-snug">
                <Link href={`/blog/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-sm text-white/70 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <Link
                href={`/blog/${article.slug}`}
                className="text-xs font-semibold text-sacred-goldLight group-hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Читати статтю повністю</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
