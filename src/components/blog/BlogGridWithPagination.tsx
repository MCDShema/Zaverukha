'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Article } from '@/data/articles';
import { ChevronLeft, ChevronRight, ArrowRight, Tag } from 'lucide-react';

interface BlogGridWithPaginationProps {
  articles: Article[];
  itemsPerPage?: number;
  initialTag?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  showAllLink?: boolean;
  baseRoutePrefix?: 'auto' | '/blog' | '/news';
}

const DEFAULT_FALLBACK_IMAGE = '/images/posts/viva-interview.jpg';

const UK_MONTH_MAP: Record<string, number> = {
  'січня': 0, 'лютого': 1, 'березня': 2, 'квітня': 3, 'травня': 4, 'червня': 5,
  'липня': 6, 'серпня': 7, 'вересня': 8, 'жовтня': 9, 'листопада': 10, 'грудня': 11,
  'січень': 0, 'лютий': 1, 'березень': 2, 'квітень': 3, 'травень': 4, 'червень': 5,
  'липень': 6, 'серпень': 7, 'вересень': 8, 'жовтень': 9, 'листопад': 10, 'грудень': 11,
};

function parseArticleTimestamp(article: Article): number {
  if (article.created_at) {
    const t = new Date(article.created_at).getTime();
    if (!isNaN(t) && t > 0) return t;
  }
  if (!article.date) return 0;
  
  const directTime = new Date(article.date).getTime();
  if (!isNaN(directTime) && directTime > 0) return directTime;

  const clean = article.date.replace(/,/g, '').trim().toLowerCase();
  const parts = clean.split(/\s+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const monthName = parts[1];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(year) && monthName in UK_MONTH_MAP) {
      return new Date(year, UK_MONTH_MAP[monthName], day).getTime();
    }
  }

  return 0;
}

export default function BlogGridWithPagination({
  articles,
  itemsPerPage = 9,
  initialTag = 'Всі',
  sectionTitle,
  sectionSubtitle,
  showAllLink = false,
  baseRoutePrefix = 'auto',
}: BlogGridWithPaginationProps) {
  const [selectedTag, setSelectedTag] = useState<string>(initialTag);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 1. Sort articles chronologically descending (newest articles first)
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const tb = parseArticleTimestamp(b);
      const ta = parseArticleTimestamp(a);
      return tb - ta;
    });
  }, [articles]);

  // 2. Collect available tags across sorted articles
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    sortedArticles.forEach((a) => {
      if (a.category) {
        tagSet.add(a.category);
      }
      if (Array.isArray(a.tags)) {
        a.tags.forEach((t) => {
          if (t && !['UA', 'RU', 'EN', 'Без категорії'].includes(t)) {
            tagSet.add(t);
          }
        });
      }
    });

    // Preferred sort order matching old site
    const priority = [
      'Мої блоги',
      'Блог',
      'Новини',
      'Голос Душі',
      'Подорожі зі смислом',
      'Рецепти',
      'Розвиток',
      'Творчість',
      'Про мене',
      'Події',
      'Екологія',
    ];

    const sorted = Array.from(tagSet).sort((a, b) => {
      const ia = priority.indexOf(a);
      const ib = priority.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b, 'uk');
    });

    return ['Всі', ...sorted];
  }, [sortedArticles]);

  // 3. Filter sorted articles by selected tag
  const filteredArticles = useMemo(() => {
    if (selectedTag === 'Всі') return sortedArticles;
    return sortedArticles.filter((a) => {
      if (a.category === selectedTag) return true;
      if (Array.isArray(a.tags) && a.tags.includes(selectedTag)) return true;
      return false;
    });
  }, [sortedArticles, selectedTag]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedArticles = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, validCurrentPage, itemsPerPage]);

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById('articles-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getArticleUrl = (article: Article) => {
    if (baseRoutePrefix === 'auto') {
      return `/${article.category === 'Новини' ? 'news' : 'blog'}/${article.slug}`;
    }
    return `${baseRoutePrefix}/${article.slug}`;
  };

  return (
    <div id="articles-section" className="space-y-8 scroll-mt-24">
      {/* SECTION HEADER (if provided) */}
      {(sectionTitle || showAllLink) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            {sectionTitle && (
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2E2B75] font-bold">
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {sectionSubtitle}
              </p>
            )}
          </div>
          {showAllLink && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-outline-blue text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              <span>Всі публікації</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}

      {/* TAGS FILTER (Exact replica of old site categories) */}
      {availableTags.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-[#2E2B75] uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Tag className="w-3.5 h-3.5 text-[#B37E11]" />
            <span>Теги:</span>
          </span>
          {availableTags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagChange(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-[#2E2B75] text-[#F5DF7E] font-semibold ring-2 ring-[#C99A2C]/50 shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-[#2E2B75] border border-slate-200'
                }`}
              >
                {tag}
                {tag !== 'Всі' && (
                  <span className="ml-1.5 text-[10px] opacity-70">
                    (
                    {
                      articles.filter(
                        (a) => a.category === tag || (Array.isArray(a.tags) && a.tags.includes(tag))
                      ).length
                    }
                    )
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ARTICLES GRID (9 cards per page, exactly as old site card_blog) */}
      {paginatedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
          <p className="text-sm">Публікацій за обраним тегом не знайдено.</p>
          <button
            onClick={() => handleTagChange('Всі')}
            className="mt-3 text-xs text-[#2E2B75] underline font-semibold"
          >
            Показати всі статті
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedArticles.map((article) => {
            const coverUrl = article.cover_image || article.image || DEFAULT_FALLBACK_IMAGE;
            const articleLink = getArticleUrl(article);

            return (
              <div
                key={article.slug}
                className="bg-white rounded-[15px] overflow-hidden border border-slate-200/90 shadow-[2px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[2px_6px_16px_rgba(46,43,117,0.14)] hover:border-[#C99A2C]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Cover (Exactly 200px fit-cover like on old zaverukha.com) */}
                <Link href={articleLink} className="relative block h-[200px] w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverUrl}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== DEFAULT_FALLBACK_IMAGE) {
                        target.src = DEFAULT_FALLBACK_IMAGE;
                      }
                    }}
                  />
                  {article.category && (
                    <span className="absolute top-3 left-3 bg-[#2E2B75] text-[#F5DF7E] text-[10px] font-bold px-2.5 py-0.5 rounded shadow uppercase tracking-wide">
                      {article.category}
                    </span>
                  )}
                </Link>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    {/* Date in gold color */}
                    <div className="text-[11px] font-bold text-[#B37E11] tracking-wide">
                      {article.date}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2E2B75] leading-snug line-clamp-2 min-h-[48px] group-hover:text-[#3833BA] transition-colors">
                      <Link href={articleLink}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed min-h-[54px]">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Button at bottom with authentic zaverukha glare effect */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={articleLink}
                      className="btn-primary-dark w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                    >
                      <span>Читати повністю</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION (1, 2, 3...) */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <div className="text-xs text-slate-500 font-medium">
            Показано {(validCurrentPage - 1) * itemsPerPage + 1}–
            {Math.min(validCurrentPage * itemsPerPage, filteredArticles.length)} із{' '}
            {filteredArticles.length} публікацій
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {/* Prev Page Button */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, validCurrentPage - 1))}
              disabled={validCurrentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Попередня сторінка"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Numeric Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - validCurrentPage) <= 2
                );
              })
              .map((page, idx, arr) => {
                const prevPage = arr[idx - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="px-2 text-xs text-slate-400 select-none">…</span>
                    )}
                    <button
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[36px] h-9 px-3 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                        validCurrentPage === page
                          ? 'bg-[#2E2B75] text-[#F5DF7E] font-bold shadow-md scale-105 ring-1 ring-[#C99A2C]'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

            {/* Next Page Button */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.min(totalPages, validCurrentPage + 1))}
              disabled={validCurrentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Наступна сторінка"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
