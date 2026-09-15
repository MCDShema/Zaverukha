'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Article } from '@/data/articles';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  Tag 
} from 'lucide-react';
import Link from 'next/link';
import ImageInputWithPreview from '@/components/admin/ImageInputWithPreview';

export default function AdminArticlesPage() {
  const { content, addArticle, updateArticle, deleteArticle } = useContent();
  const [search, setSearch] = useState('');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'blog' | 'news'>('blog');

  // Form State
  const [formSlug, setFormSlug] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formCategory, setFormCategory] = useState<'Новини' | 'Блог' | 'Творчість' | 'Екологія'>('Блог');
  const [formDate, setFormDate] = useState('');
  const [formReadTime, setFormReadTime] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formContentText, setFormContentText] = useState('');

  const openCreate = () => {
    setFormSlug('');
    setFormTitle('');
    setFormExcerpt('');
    // Default category based on active tab
    setFormCategory(activeTab === 'news' ? 'Новини' : 'Блог');
    setFormDate(new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }));
    setFormReadTime('5 хв читання');
    setFormCoverImage('');
    setFormTags('');
    setFormContentText('');
    setIsCreating(true);
    setEditingArticle(null);
  };

  const openEdit = (article: Article) => {
    setFormSlug(article.slug);
    setFormTitle(article.title);
    setFormExcerpt(article.excerpt);
    setFormCategory(article.category);
    setFormDate(article.date);
    setFormReadTime(article.readTime);
    setFormCoverImage(article.cover_image || article.image || '');
    setFormTags(article.tags ? article.tags.join(', ') : '');
    setFormContentText(article.content.join('\n\n'));
    setEditingArticle(article);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const paragraphs = formContentText
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const parsedTags = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const articleData: Article = {
      slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9а-яіїєґ]+/gi, '-').replace(/^-|-$/g, ''),
      title: formTitle,
      excerpt: formExcerpt,
      category: formCategory,
      date: formDate,
      readTime: formReadTime,
      content: paragraphs.length > 0 ? paragraphs : [formExcerpt],
      image: formCoverImage || undefined,
      cover_image: formCoverImage || undefined,
      tags: parsedTags.length > 0 ? parsedTags : undefined,
    };

    if (isCreating) {
      addArticle(articleData);
    } else if (editingArticle) {
      updateArticle(editingArticle.slug, articleData);
    }

    setIsCreating(false);
    setEditingArticle(null);
  };

  const handleDelete = (slug: string, title: string) => {
    if (confirm(`Ви впевнені, що бажаєте видалити статтю «${title}»?`)) {
      deleteArticle(slug);
    }
  };

  const UK_MONTHS: Record<string, number> = {
    'січня': 0, 'лютого': 1, 'березня': 2, 'квітня': 3, 'травня': 4, 'червня': 5,
    'липня': 6, 'серпня': 7, 'вересня': 8, 'жовтня': 9, 'листопада': 10, 'грудня': 11,
    'січень': 0, 'лютий': 1, 'березень': 2, 'квітень': 3, 'травень': 4, 'червень': 5,
    'липень': 6, 'серпень': 7, 'вересень': 8, 'жовтень': 9, 'листопад': 10, 'грудень': 11,
  };

  const getArticleTime = (art: Article) => {
    if (art.created_at) {
      const t = new Date(art.created_at).getTime();
      if (!isNaN(t) && t > 0) return t;
    }
    if (!art.date) return 0;
    const direct = new Date(art.date).getTime();
    if (!isNaN(direct) && direct > 0) return direct;
    const clean = art.date.replace(/,/g, '').trim().toLowerCase();
    const parts = clean.split(/\s+/);
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const m = parts[1];
      const y = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(y) && m in UK_MONTHS) {
        return new Date(y, UK_MONTHS[m], day).getTime();
      }
    }
    return 0;
  };

  // Filter by tab first (blog tab = not Новини, news tab = Новини only) and sort by date descending
  const tabArticles = content.articles
    .filter((a) => (activeTab === 'news' ? a.category === 'Новини' : a.category !== 'Новини'))
    .sort((a, b) => getArticleTime(b) - getArticleTime(a));

  const filtered = tabArticles.filter((a) =>
    !search.trim() ||
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-sacred-gold" />
            <span>Керування публікаціями</span>
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Блог — статті, роздуми, творчість. Новини — події, анонси, оголошення.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="sacred-gold-btn px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>{activeTab === 'news' ? 'Додати новину' : 'Додати статтю'}</span>
        </button>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
        <button
          onClick={() => { setActiveTab('blog'); setSearch(''); setIsCreating(false); setEditingArticle(null); }}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'blog'
              ? 'bg-sacred-gold text-sacred-dark shadow'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          Блог ({content.articles.filter(a => a.category !== 'Новини').length})
        </button>
        <button
          onClick={() => { setActiveTab('news'); setSearch(''); setIsCreating(false); setEditingArticle(null); }}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'news'
              ? 'bg-sacred-gold text-sacred-dark shadow'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          Новини ({content.articles.filter(a => a.category === 'Новини').length})
        </button>
      </div>

      {/* MODAL / DRAWER FOR CREATE & EDIT */}
      {(isCreating || editingArticle) && (
        <div className="sacred-card rounded-2xl p-6 sm:p-8 border-2 border-sacred-gold/60 shadow-2xl relative bg-sacred-night">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xl font-serif text-white font-semibold">
              {isCreating ? 'Створення нової статті' : `Редагування: ${editingArticle?.title}`}
            </h2>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingArticle(null);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Заголовок статті *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Введіть заголовок..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Категорія
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full bg-[#161338] border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                >
                  <option value="Блог">Блог</option>
                  <option value="Новини">Новини</option>
                  <option value="Творчість">Творчість</option>
                  <option value="Екологія">Екологія</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  URL-ідентифікатор (Slug)
                </label>
                <input
                  type="text"
                  placeholder="viva-interview (латиницею)"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Дата публікації
                </label>
                <input
                  type="text"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  placeholder="Наприклад: 14 вересня, 2026"
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Час читання
                </label>
                <input
                  type="text"
                  value={formReadTime}
                  onChange={(e) => setFormReadTime(e.target.value)}
                  placeholder="Наприклад: 5 хв читання"
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Image Input with Upload / URL / Presets */}
            <ImageInputWithPreview
              label="Головне фото / Обкладинка статті"
              value={formCoverImage}
              onChange={setFormCoverImage}
              placeholder="/images/posts/your-photo.jpg або https://..."
            />

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Теги (через кому)</span>
              </label>
              <input
                type="text"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder="Психологія, Стосунки, Духовність, Карми..."
                className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                Короткий опис (анонс для списку) *
              </label>
              <textarea
                required
                rows={2}
                value={formExcerpt}
                onChange={(e) => setFormExcerpt(e.target.value)}
                placeholder="Короткий зміст у 2-3 реченнях..."
                className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                Повний текст статті (відокремлюйте абзаци порожнім рядком) *
              </label>
              <textarea
                required
                rows={8}
                value={formContentText}
                onChange={(e) => setFormContentText(e.target.value)}
                placeholder="Введіть повний текст публікації..."
                className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingArticle(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
              >
                Скасувати
              </button>
              <button
                type="submit"
                className="sacred-gold-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>Зберегти статтю</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Пошук статті за назвою або категорією..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none"
        />
      </div>

      {/* ARTICLES TABLE / LIST */}
      <div className="sacred-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10 text-xs font-semibold text-sacred-goldLight uppercase tracking-wider flex items-center justify-between">
          <span>{activeTab === 'news' ? 'Новини' : 'Блог'} ({filtered.length})</span>
        </div>

        <div className="divide-y divide-white/10">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-white/50">
              {search ? 'Нічого не знайдено за вашим запитом.' : `Публікацій ще немає. Натисніть «${activeTab === 'news' ? 'Додати новину' : 'Додати статтю'}».`}
            </div>
          ) : (
            filtered.map((article) => (
              <div
                key={article.slug}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-3.5 max-w-2xl">
                  {/* Thumbnail Preview */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-sacred-blue/30 border border-white/10 relative">
                    <img
                      src={article.cover_image || article.image || '/images/posts/viva-interview.jpg'}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/posts/viva-interview.jpg';
                      }}
                    />
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/60">
                      <span className="px-2 py-0.5 rounded bg-sacred-gold/20 text-sacred-gold font-semibold uppercase text-[10px]">
                        {article.category}
                      </span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-base font-serif font-medium text-white leading-snug truncate sm:whitespace-normal">
                      {article.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {article.excerpt}
                    </p>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {article.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link
                    href={`/${article.category === 'Новини' ? 'news' : 'blog'}/${article.slug}`}
                    target="_blank"
                    title="Переглянути на сайті"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openEdit(article)}
                    title="Редагувати"
                    className="p-2 rounded-lg bg-sacred-blue/40 hover:bg-sacred-blue text-sacred-goldLight hover:text-white"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(article.slug, article.title)}
                    title="Видалити"
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
