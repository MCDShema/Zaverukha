'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  Send, 
  GraduationCap, 
  MessageSquareHeart,
  ChevronRight
} from 'lucide-react';
import { Article, ARTICLES, findArticleBySlug } from '@/data/articles';
import { useContent } from '@/context/ContentContext';

interface ArticleDetailViewProps {
  initialArticle?: Article;
  slug?: string;
}

export default function ArticleDetailView({ initialArticle, slug: propSlug }: ArticleDetailViewProps) {
  const { content } = useContent();
  const [copied, setCopied] = useState(false);
  const [fetchedArticle, setFetchedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  const targetSlug = initialArticle?.slug || propSlug || '';

  // Look up article using robust normalized slug matching
  const matchedInitial = initialArticle || findArticleBySlug(targetSlug, ARTICLES);
  const matchedContext = findArticleBySlug(targetSlug, content.articles);

  // ALWAYS prioritize the version that has full contentHtml with links!
  const article =
    (matchedInitial?.contentHtml ? matchedInitial : null) ||
    (matchedContext?.contentHtml ? matchedContext : null) ||
    (fetchedArticle?.contentHtml ? fetchedArticle : null) ||
    matchedInitial ||
    matchedContext ||
    fetchedArticle;

  // Fallback client-side fetch from D1 API if not pre-rendered
  useEffect(() => {
    if (!article && targetSlug) {
      setLoading(true);
      fetch(`/api/articles?slug=${encodeURIComponent(targetSlug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.article) {
            setFetchedArticle(data.article);
          }
        })
        .catch((err) => console.error('Error fetching article:', err))
        .finally(() => setLoading(false));
    }
  }, [article, targetSlug]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const isNews = article?.category === 'Новини';
  const categoryLink = isNews ? '/news' : '/blog';
  const categoryLabel = isNews ? 'Новини' : 'Мої блоги';

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = (platform: 'telegram' | 'facebook' | 'viber') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article?.title || 'Заверуха Ірина');
    let shareUrl = '';

    if (platform === 'telegram') {
      shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'viber') {
      shareUrl = `viber://forward?text=${title}%20${url}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=450');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2b2670] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-serif text-[#2b2670]">Завантаження статті...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFBF7] px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-serif font-bold text-[#2b2670] mb-2">Статтю не знайдено</h2>
          <p className="text-sm text-slate-600 mb-6">
            Можливо, публікацію було переміщено або посилання застаріло.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2b2670] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3833ba] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>До всіх публікацій</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasImgPostInHtml = article.contentHtml && article.contentHtml.includes('img_post');
  const coverImg = article.cover_image || article.image;

  return (
    <div className="bg-[#FCFBF8] min-h-screen text-[#28303D] pt-8 pb-20 selection:bg-[#3833ba]/10 selection:text-[#2b2670]">
      {/* ARTICLE WRAPPER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BACK BUTTON */}
        <div className="mb-6">
          <Link
            href={categoryLink}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2b2670]/70 hover:text-[#3833ba] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад до {isNews ? 'новин' : 'блогу'}</span>
          </Link>
        </div>

        {/* BREADCRUMBS (Matching exact WordPress structure) */}
        <nav aria-label="Хлібні крихти" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-[#2b2670] transition-colors font-medium">
                Головна
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li>
              <Link href={categoryLink} className="hover:text-[#2b2670] transition-colors font-medium">
                {categoryLabel}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </li>
            <li className="text-slate-700 font-medium truncate max-w-[280px] sm:max-w-md">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* HEADER: TITLE & META */}
        <header className="mb-8 space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-serif text-[#2b2670] font-bold leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
            <span className="px-3 py-1 rounded-full bg-[#3833ba]/10 text-[#2b2670] font-semibold tracking-wide">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </header>

        {/* COVER IMAGE (if not already included as img_post inside contentHtml) */}
        {!hasImgPostInHtml && coverImg && (
          <div className="my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-white">
            <img
              src={coverImg}
              alt={article.title}
              className="w-full h-auto max-h-[520px] object-cover mx-auto"
            />
          </div>
        )}

        {/* ARTICLE BODY */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100">
          {article.contentHtml ? (
            <div
              className="prose prose-slate max-w-none text-[#28303D] leading-relaxed font-sans
                [&_p]:mb-5 [&_p]:text-[17px] [&_p]:leading-[1.8] [&_p]:font-normal
                [&_strong]:font-semibold [&_strong]:text-[#1e1b4b]
                [&_a]:text-[#3833BA] [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-semibold [&_a]:decoration-[#3833BA] hover:[&_a]:text-[#221e75] hover:[&_a]:decoration-[#221e75] [&_a]:cursor-pointer [&_a]:transition-colors
                [&_blockquote]:border-l-4 [&_blockquote]:border-[#3833ba] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:my-6
                [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_img]:mx-auto [&_img]:max-w-full
                [&_figure]:my-6 [&_figure]:mx-auto [&_figure.img_post]:my-2
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-5
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-5
                [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-[#2b2670] [&_h2]:mt-8 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-[#2b2670] [&_h3]:mt-6 [&_h3]:mb-3
                [&_h4]:text-lg [&_h4]:font-serif [&_h4]:font-semibold [&_h4]:text-[#2b2670] [&_h4]:mt-4 [&_h4]:mb-2"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <div className="space-y-5 text-[17px] leading-[1.8] text-[#28303D]">
              {article.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* AUTHENTIC ACTION BUTTONS AT BOTTOM (Exact WordPress CTA) */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/pipl_platform_bot?start=consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2b2670] hover:bg-[#3833ba] text-white text-xs font-bold uppercase tracking-wider text-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <MessageSquareHeart className="w-4 h-4" />
              <span>Замовити консультацію</span>
            </a>

            <Link
              href="/education"
              className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-[#2b2670] text-[#2b2670] hover:bg-[#2b2670] hover:text-white text-xs font-bold uppercase tracking-wider text-center shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Запрошуємо на навчання</span>
            </Link>
          </div>

          {/* COPYRIGHT NOTICE (Exact WordPress text) */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-slate-500 text-[11px] leading-relaxed text-center sm:text-left">
            <p className="font-semibold text-slate-700">© Ірина Заверуха, 2025–2026</p>
            <p>
              Всі матеріали даного сайту є обʼєктами авторського права. Копіювання та розповсюдження матеріалів можливе лише за попереднього погодження з автором та вказанням активного посилання на цей сайт.
            </p>
          </div>
        </article>

        {/* SHARE & SOCIAL BAR (Matching authentic modal/bar) */}
        <div className="mt-8 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#2b2670]">
            <Share2 className="w-4 h-4 text-[#3833ba]" />
            <span>Поділитися публікацією:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleShare('telegram')}
              className="px-4 py-2 rounded-full bg-[#24A1DE]/10 text-[#24A1DE] hover:bg-[#24A1DE] hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="px-4 py-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white text-xs font-semibold transition"
            >
              <span>Facebook</span>
            </button>

            <button
              onClick={() => handleShare('viber')}
              className="px-4 py-2 rounded-full bg-[#7360F2]/10 text-[#7360F2] hover:bg-[#7360F2] hover:text-white text-xs font-semibold transition"
            >
              <span>Viber</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Скопійовано!' : 'Копіювати'}</span>
            </button>
          </div>
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="mt-8 flex justify-between items-center text-xs font-medium text-slate-600">
          <Link
            href={categoryLink}
            className="inline-flex items-center gap-1.5 hover:text-[#2b2670] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>До списку {isNews ? 'новин' : 'статей'}</span>
          </Link>

          <Link
            href="/"
            className="hover:text-[#2b2670] transition"
          >
            На головну сторінку
          </Link>
        </div>

      </div>
    </div>
  );
}
