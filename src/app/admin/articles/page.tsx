'use client';

import React, { useState, useRef } from 'react';
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
  Tag,
  Link2,
  Bold,
  Italic,
  Quote,
  List,
  Eye,
  Code,
  Image as ImageIcon
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

  // Rich text & Preview states
  const [previewMode, setPreviewMode] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkOpenNewTab, setLinkOpenNewTab] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openCreate = () => {
    setFormSlug('');
    setFormTitle('');
    setFormExcerpt('');
    setFormCategory(activeTab === 'news' ? 'Новини' : 'Блог');
    setFormDate(new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }));
    setFormReadTime('5 хв читання');
    setFormCoverImage('/images/posts/viva-interview.jpg');
    setFormTags(activeTab === 'news' ? 'Новини' : 'Мої блоги');
    setFormContentText('');
    setPreviewMode(false);
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
    // Prefer full rich HTML if available, otherwise paragraphs
    setFormContentText(article.contentHtml || article.content.join('\n\n'));
    setPreviewMode(false);
    setEditingArticle(article);
    setIsCreating(false);
  };

  // Helper to open link modal with selected text
  const openLinkModal = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.substring(start, end).trim();
      if (selected.startsWith('http://') || selected.startsWith('https://')) {
        setLinkUrl(selected);
        setLinkText(selected);
      } else {
        setLinkText(selected);
        setLinkUrl('');
      }
    } else {
      setLinkText('');
      setLinkUrl('');
    }
    setLinkOpenNewTab(true);
    setLinkModalOpen(true);
  };

  // Insert link into textarea
  const insertLink = () => {
    if (!linkUrl.trim()) {
      alert('Будь ласка, введіть URL адресу посилання');
      return;
    }

    const textarea = textareaRef.current;
    const cleanUrl = linkUrl.trim();
    const cleanText = linkText.trim() || cleanUrl;
    const targetAttr = linkOpenNewTab ? ' target="_blank" rel="noopener"' : '';
    const linkHtml = `<a href="${cleanUrl}"${targetAttr}>${cleanText}</a>`;

    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const updated = val.substring(0, start) + linkHtml + val.substring(end);
      setFormContentText(updated);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + linkHtml.length, start + linkHtml.length);
      }, 0);
    } else {
      setFormContentText((prev) => prev + '\n' + linkHtml);
    }

    setLinkModalOpen(false);
  };

  // Wrap selected text helper
  const applyWrap = (before: string, after: string, defaultPlaceholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    const selected = val.substring(start, end);
    const content = selected || defaultPlaceholder;
    const wrapped = before + content + after;

    const updated = val.substring(0, start) + wrapped + val.substring(end);
    setFormContentText(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + content.length);
    }, 0);
  };

  // Insert list helper
  const insertList = () => {
    const textarea = textareaRef.current;
    const listHtml = '\n<ul>\n  <li>Пункт 1</li>\n  <li>Пункт 2</li>\n</ul>\n';
    if (!textarea) {
      setFormContentText((prev) => prev + listHtml);
      return;
    }
    const start = textarea.selectionStart;
    const val = textarea.value;
    const updated = val.substring(0, start) + listHtml + val.substring(start);
    setFormContentText(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + listHtml.length, start + listHtml.length);
    }, 0);
  };

  // Insert inline image
  const insertImage = () => {
    const url = prompt('Введіть посилання на зображення (наприклад, /images/posts/... або https://...):');
    if (!url || !url.trim()) return;
    const imgHtml = `\n<figure class="wp-block-image"><img src="${url.trim()}" alt="" /></figure>\n`;
    setFormContentText((prev) => prev + imgHtml);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if formContentText has HTML tags
    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(formContentText);
    const finalHtml = hasHtmlTags
      ? formContentText
      : formContentText
          .split('\n\n')
          .filter((p) => p.trim().length > 0)
          .map((p) => `<p>${p.trim()}</p>`)
          .join('\n\n');

    // Extract plain text paragraphs for card excerpt / search
    const plainText = formContentText.replace(/<[^>]+>/g, ' ');
    const paragraphs = plainText
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const parsedTags = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const generatedExcerpt =
      formExcerpt.trim() ||
      (paragraphs.length > 0 ? paragraphs[0].slice(0, 180) + '...' : formTitle);

    const articleData: Article = {
      slug:
        formSlug ||
        formTitle
          .toLowerCase()
          .replace(/[^a-z0-9а-яіїєґ]+/gi, '-')
          .replace(/^-|-$/g, ''),
      title: formTitle,
      excerpt: generatedExcerpt,
      category: formCategory,
      date: formDate || new Date().toLocaleDateString('uk-UA'),
      readTime: formReadTime || '5 хв читання',
      contentHtml: finalHtml,
      content: paragraphs.length > 0 ? paragraphs : [generatedExcerpt],
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
      const monthName = parts[1];
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(year) && monthName in UK_MONTHS) {
        return new Date(year, UK_MONTHS[monthName], day).getTime();
      }
    }
    return 0;
  };

  // Filter articles based on active tab and search query
  const filtered = content.articles
    .filter((a) => {
      const isNews = a.category === 'Новини';
      if (activeTab === 'news') return isNews;
      return !isNews;
    })
    .filter((a) => {
      const q = search.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))) ||
        (a.content && a.content.some((c) => c.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => getArticleTime(b) - getArticleTime(a));

  const totalNewsCount = content.articles.filter((a) => a.category === 'Новини').length;
  const totalBlogCount = content.articles.filter((a) => a.category !== 'Новини').length;

  return (
    <div className="space-y-6">
      
      {/* HEADER WITH TABS & CREATE BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-white font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-sacred-gold" />
            <span>Керування статтями та новинами</span>
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Створюйте та редагуйте публікації з посиланнями, форматуванням тексту та обкладинками.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="sacred-gold-btn px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Створити {activeTab === 'news' ? 'новину' : 'статтю блогу'}</span>
        </button>
      </div>

      {/* TABS: БЛОГ vs НОВИНИ */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('blog')}
          className={`pb-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${
            activeTab === 'blog'
              ? 'text-sacred-gold font-semibold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <span>Мої блоги</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-white/10 text-white">
            {totalBlogCount}
          </span>
          {activeTab === 'blog' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-sacred-gold rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`pb-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${
            activeTab === 'news'
              ? 'text-sacred-gold font-semibold'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <span>Новини</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] bg-white/10 text-white">
            {totalNewsCount}
          </span>
          {activeTab === 'news' && (
            <span className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-sacred-gold rounded-full" />
          )}
        </button>
      </div>

      {/* CREATE / EDIT FORM */}
      {(isCreating || editingArticle) && (
        <div className="sacred-card rounded-2xl p-6 border border-sacred-gold/40 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-serif text-white font-bold flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-sacred-gold" />
              <span>{isCreating ? 'Створення нової публікації' : `Редагування: ${editingArticle?.title}`}</span>
            </h2>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingArticle(null);
              }}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Назва публікації *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Введіть заголовок..."
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  URL-адреса (Slug) *
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="Автоматично або наприклад: media-premiere"
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Категорія
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full bg-[#181635] border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Блог">Блог</option>
                  <option value="Новини">Новини</option>
                  <option value="Творчість">Творчість</option>
                  <option value="Екологія">Екологія</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Дата публікації
                </label>
                <input
                  type="text"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  placeholder="Наприклад: 4 вересня 2026"
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
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
                Короткий опис (анонс для картки)
              </label>
              <textarea
                rows={2}
                value={formExcerpt}
                onChange={(e) => setFormExcerpt(e.target.value)}
                placeholder="Короткий зміст у 2-3 реченнях..."
                className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
              />
            </div>

            {/* RICH CONTENT EDITOR WITH FORMATTING & LINK TOOLBAR */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase">
                  Повний текст статті та форматування *
                </label>
                <div className="text-[11px] text-white/50">
                  Підтримуються посилання, абзаци та HTML-теги
                </div>
              </div>

              {/* TOOLBAR */}
              <div className="bg-[#1C1A3A] border border-white/15 rounded-t-xl px-3 py-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {/* LINK BUTTON */}
                  <button
                    type="button"
                    onClick={openLinkModal}
                    className="px-3 py-1.5 rounded-lg bg-[#3833BA] hover:bg-[#4E48D6] text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    title="Зробити виділений текст посиланням або вставити посилання"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>🔗 Зробити посиланням</span>
                  </button>

                  <div className="w-[1px] h-4 bg-white/20 mx-1" />

                  {/* BOLD */}
                  <button
                    type="button"
                    onClick={() => applyWrap('<strong>', '</strong>', 'жирний текст')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs font-bold transition"
                    title="Жирний (strong)"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>

                  {/* ITALIC */}
                  <button
                    type="button"
                    onClick={() => applyWrap('<em>', '</em>', 'курсивний текст')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs italic transition"
                    title="Курсив (em)"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>

                  {/* QUOTE */}
                  <button
                    type="button"
                    onClick={() => applyWrap('\n<blockquote>', '</blockquote>\n', 'Цитата')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
                    title="Цитата"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>

                  {/* LIST */}
                  <button
                    type="button"
                    onClick={insertList}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
                    title="Маркований список"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>

                  {/* IMAGE */}
                  <button
                    type="button"
                    onClick={insertImage}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
                    title="Вставити фото в текст"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* EDITOR / PREVIEW SWITCHER */}
                <div className="flex items-center gap-1 bg-black/30 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(false)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      !previewMode
                        ? 'bg-white/20 text-white font-semibold shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Code className="w-3 h-3" />
                    <span>Редактор</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(true)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition flex items-center gap-1 ${
                      previewMode
                        ? 'bg-[#C99A2C] text-[#1a1836] font-bold shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Попередній перегляд</span>
                  </button>
                </div>
              </div>

              {/* TEXTAREA OR PREVIEW BOX */}
              {!previewMode ? (
                <textarea
                  ref={textareaRef}
                  required
                  rows={12}
                  value={formContentText}
                  onChange={(e) => setFormContentText(e.target.value)}
                  placeholder="Введіть повний текст публікації. Виділіть потрібний текст та натисніть «🔗 Зробити посиланням», щоб додати клікабельне посилання..."
                  className="w-full bg-white/5 border border-t-0 border-white/15 focus:border-sacred-gold rounded-b-xl px-4 py-3 text-sm text-white focus:outline-none font-sans leading-relaxed"
                />
              ) : (
                <div className="bg-white rounded-b-xl p-6 text-[#28303D] min-h-[250px] max-h-[500px] overflow-y-auto border border-t-0 border-white/15">
                  <div className="mb-4 pb-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-[#2E2B75]">Попередній перегляд того, як стаття виглядає для читача:</span>
                    <span>{formCategory} • {formDate || 'сьогодні'}</span>
                  </div>
                  <div
                    className="prose prose-slate max-w-none text-[#28303D] leading-relaxed
                      [&_p]:mb-4 [&_p]:text-[16px] [&_p]:leading-[1.75]
                      [&_strong]:font-semibold [&_strong]:text-[#1e1b4b]
                      [&_em]:italic [&_em]:text-slate-700
                      [&_a]:text-[#3833ba] [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-medium hover:[&_a]:text-[#2b2670]
                      [&_blockquote]:border-l-4 [&_blockquote]:border-[#3833ba] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:my-4
                      [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-4 [&_img]:mx-auto [&_img]:max-w-full
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:mb-4"
                    dangerouslySetInnerHTML={{
                      __html: formContentText || '<p className="text-slate-400 italic">Текст відсутній...</p>',
                    }}
                  />
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingArticle(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
              >
                Скасувати
              </button>
              <button
                type="submit"
                className="sacred-gold-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>Зберегти публікацію</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: INSERT / EDIT LINK */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1E1B38] border border-sacred-gold/40 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-sacred-goldLight font-serif font-bold text-base">
                <Link2 className="w-5 h-5 text-sacred-gold" />
                <span>Додати посилання в текст</span>
              </div>
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Текст посилання (що бачить читач)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Наприклад: Читати повне інтерв'ю на сайті Viva!"
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  URL-адреса посилання *
                </label>
                <input
                  type="url"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://viva.ua/... або https://t.me/..."
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="newTabCheckbox"
                  type="checkbox"
                  checked={linkOpenNewTab}
                  onChange={(e) => setLinkOpenNewTab(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-sacred-gold focus:ring-sacred-gold w-4 h-4 cursor-pointer"
                />
                <label htmlFor="newTabCheckbox" className="text-xs text-white/80 cursor-pointer select-none">
                  Відкривати у новій вкладці (рекомендовано для зовнішніх сайтів)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setLinkModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
              >
                Скасувати
              </button>
              <button
                type="button"
                onClick={insertLink}
                className="sacred-gold-btn px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Check className="w-4 h-4" />
                <span>Вставити посилання</span>
              </button>
            </div>
          </div>
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

        <div className="divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-white/40">
              Публікацій не знайдено
            </div>
          ) : (
            filtered.map((article) => {
              const cover = article.cover_image || article.image || '/images/posts/viva-interview.jpg';
              const articleUrl = `/${article.category === 'Новини' ? 'news' : 'blog'}/${article.slug}`;

              return (
                <div
                  key={article.slug}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition"
                >
                  <div className="flex items-start gap-3.5 max-w-2xl">
                    <img
                      src={cover}
                      alt=""
                      className="w-16 h-12 rounded-lg object-cover bg-white/5 border border-white/10 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/posts/viva-interview.jpg';
                      }}
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sacred-gold/15 text-sacred-goldLight border border-sacred-gold/30">
                          {article.category}
                        </span>
                        <span className="text-[11px] text-white/50 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.date}</span>
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-white group-hover:text-sacred-gold transition line-clamp-1">
                        {article.title}
                      </h3>

                      <p className="text-xs text-white/60 line-clamp-1">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <Link
                      href={articleUrl}
                      target="_blank"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition"
                      title="Відкрити на сайті"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openEdit(article)}
                      className="p-2 rounded-lg bg-sacred-gold/10 hover:bg-sacred-gold/20 text-sacred-goldLight hover:text-white transition flex items-center gap-1 text-xs font-semibold"
                      title="Редагувати статтю"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Редагувати</span>
                    </button>

                    <button
                      onClick={() => handleDelete(article.slug, article.title)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 hover:text-red-300 transition"
                      title="Видалити статтю"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
