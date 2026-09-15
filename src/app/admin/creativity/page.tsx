'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { CreativityItem, INITIAL_CONTENT } from '@/data/siteContent';
import { 
  Palette, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  BookOpen, 
  Music, 
  Sparkles,
  ChevronDown,
  Eye,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import ImageInputWithPreview from '@/components/admin/ImageInputWithPreview';
import RichTextVisualEditor from '@/components/admin/RichTextVisualEditor';

const CREATIVITY_IMAGE_PRESETS = [
  '/images/creativity/banner-books.png',
  '/images/creativity/book-besidy-photo.jpg',
  '/images/creativity/book.png',
  '/images/creativity/banner-music.png',
  '/images/creativity/music-shamanka.jpg',
  '/images/creativity/music-instrumental.jpg',
  '/images/creativity/music-clip.jpg',
  '/images/creativity/banner-artifacts.png',
  '/images/creativity/dress-photo.png',
  '/images/creativity/bag-photo.png',
  '/images/creativity/avatar-photo.png',
  '/images/creativity/cards-photo.png',
];

export default function AdminCreativityPage() {
  const { content, addCreativityItem, updateCreativityItem, deleteCreativityItem } = useContent();
  const [activeTab, setActiveTab] = useState<'books' | 'music' | 'artifacts'>('books');
  const [editingItem, setEditingItem] = useState<CreativityItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewItemId, setPreviewItemId] = useState<string | null>(null);

  // Form State
  const [formCategory, setFormCategory] = useState<'books' | 'music' | 'artifacts'>('books');
  const [formTitle, setFormTitle] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formContentHtml, setFormContentHtml] = useState('');
  const [formButtonText, setFormButtonText] = useState('');
  const [formButtonUrl, setFormButtonUrl] = useState('');
  const [formOrder, setFormOrder] = useState<number>(1);

  const items: CreativityItem[] = content.creativity?.items || INITIAL_CONTENT.creativity.items;

  const currentTabItems = items.filter((it) => it.category === activeTab);

  const openCreate = () => {
    setFormCategory(activeTab);
    setFormTitle('');
    setFormImage(
      activeTab === 'books'
        ? '/images/creativity/book-besidy-photo.jpg'
        : activeTab === 'music'
        ? '/images/creativity/music-shamanka.jpg'
        : '/images/creativity/dress-photo.png'
    );
    setFormBadge(
      activeTab === 'books' ? 'Бестселер' : activeTab === 'music' ? "Прем'єра" : 'Сакральний артефакт'
    );
    setFormShortDesc('');
    setFormContentHtml('');
    setFormButtonText(
      activeTab === 'books'
        ? 'Придбати книгу'
        : activeTab === 'music'
        ? 'Слухати на платформах'
        : 'Замовити в Instagram'
    );
    setFormButtonUrl(
      activeTab === 'artifacts'
        ? 'https://www.instagram.com/imaria_space/'
        : activeTab === 'music'
        ? 'https://linktr.ee/Zaverukha'
        : 'https://pipl.net.ua/knyha-besidy-z-anhelamy'
    );
    setFormOrder(currentTabItems.length + 1);
    setIsCreating(true);
    setEditingItem(null);
  };

  const openEdit = (item: CreativityItem) => {
    setFormCategory(item.category);
    setFormTitle(item.title);
    setFormImage(item.image || '');
    setFormBadge(item.badge || '');
    setFormShortDesc(item.shortDesc || '');
    setFormContentHtml(item.contentHtml || '');
    setFormButtonText(item.buttonText || '');
    setFormButtonUrl(item.buttonUrl || '');
    setFormOrder(item.order || 1);
    setEditingItem(item);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      alert('Будь ласка, введіть назву');
      return;
    }

    const itemData: CreativityItem = {
      id: editingItem ? editingItem.id : `${formCategory}-${Date.now()}`,
      category: formCategory,
      title: formTitle.trim(),
      image: formImage.trim() || '/images/creativity/book.png',
      badge: formBadge.trim() || undefined,
      shortDesc: formShortDesc.trim(),
      contentHtml: formContentHtml.trim(),
      buttonText: formButtonText.trim() || undefined,
      buttonUrl: formButtonUrl.trim() || undefined,
      order: Number(formOrder) || 1,
    };

    if (editingItem) {
      await updateCreativityItem(editingItem.id, itemData);
    } else {
      await addCreativityItem(itemData);
    }

    closeModal();
  };

  const handleDelete = async (item: CreativityItem) => {
    if (window.confirm(`Ви дійсно бажаєте видалити "${item.title}"?`)) {
      await deleteCreativityItem(item.id);
    }
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingItem(null);
  };

  const tabCounts = {
    books: items.filter((i) => i.category === 'books').length,
    music: items.filter((i) => i.category === 'music').length,
    artifacts: items.filter((i) => i.category === 'artifacts').length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0c24] p-6 rounded-2xl border border-sacred-gold/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2.5 text-sacred-gold">
            <Palette className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">Розділ творчості</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white font-bold mt-1">
            Моя Творчість
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Керування 3 основними блоками сайту: Книги, Музика, Сакральні артефакти. Додавайте експонати, редагуйте розгорнутий зміст з посиланнями та фото.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/creativity"
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Переглянути на сайті</span>
          </Link>
          <button
            onClick={openCreate}
            className="px-5 py-2.5 rounded-xl bg-sacred-gold text-sacred-dark hover:bg-sacred-goldLight font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:shadow-sacred-gold/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Додати оновлення</span>
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('books')}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'books'
              ? 'bg-sacred-gold text-sacred-dark shadow-md'
              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>📚 Книги ({tabCounts.books})</span>
        </button>

        <button
          onClick={() => setActiveTab('music')}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'music'
              ? 'bg-sacred-gold text-sacred-dark shadow-md'
              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>🎵 Музика ({tabCounts.music})</span>
        </button>

        <button
          onClick={() => setActiveTab('artifacts')}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'artifacts'
              ? 'bg-sacred-gold text-sacred-dark shadow-md'
              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>🔮 Сакральні артефакти ({tabCounts.artifacts})</span>
        </button>
      </div>

      {/* ITEMS LIST */}
      <div className="space-y-4">
        {currentTabItems.length === 0 ? (
          <div className="bg-[#0e0c24] rounded-2xl p-12 text-center border border-white/10">
            <Layers className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <h3 className="text-base font-serif text-white">Немає елементів у цьому розділі</h3>
            <p className="text-xs text-white/50 mt-1 mb-4">Натисніть кнопку вище, щоб додати перший експонат.</p>
            <button
              onClick={openCreate}
              className="px-4 py-2 rounded-xl bg-sacred-gold text-sacred-dark text-xs font-bold"
            >
              + Додати оновлення
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {currentTabItems.map((item) => {
              const isExpanded = previewItemId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-[#0e0c24] rounded-2xl border border-white/10 p-5 hover:border-sacred-gold/40 transition-all shadow-md flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-sacred-night/80 border border-white/10 shrink-0 flex items-center justify-center p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.badge && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sacred-gold/20 text-sacred-goldLight border border-sacred-gold/30">
                              {item.badge}
                            </span>
                          )}
                          <span className="text-[11px] text-white/40">Порядок: #{item.order}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                          {item.title}
                        </h3>
                        {item.shortDesc && (
                          <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl">
                            {item.shortDesc}
                          </p>
                        )}
                        {item.buttonUrl && (
                          <div className="pt-1 flex items-center gap-2">
                            <a
                              href={item.buttonUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-[11px] text-sacred-gold hover:underline inline-flex items-center gap-1"
                            >
                              <span>{item.buttonText || 'Посилання'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => setPreviewItemId(isExpanded ? null : item.id)}
                        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-semibold transition-all flex items-center gap-1.5"
                        title="Попередній перегляд повного тексту"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isExpanded ? 'Сховати опис' : 'Повний текст'}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 sm:px-3 sm:py-2 rounded-xl bg-sacred-gold/10 hover:bg-sacred-gold/20 text-sacred-goldLight border border-sacred-gold/30 text-xs font-semibold transition-all flex items-center gap-1.5"
                        title="Редагувати"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Редагувати</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                        title="Видалити"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* PREVIEW EXPANDED CONTENT */}
                  {isExpanded && (
                    <div className="mt-2 pt-4 border-t border-white/10 bg-black/20 rounded-xl p-4 space-y-3">
                      <div className="text-xs font-bold text-sacred-gold uppercase tracking-wider">
                        Повний розгорнутий текст картки:
                      </div>
                      <div
                        className="article-rich-content text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 [&_a]:text-sacred-gold [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5"
                        dangerouslySetInnerHTML={{ __html: item.contentHtml || '<p className="text-white/40 italic">Повний опис ще не заповнено.</p>' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0e0c24] border border-sacred-gold/40 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-sacred-night/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                    {isCreating ? 'Новий експонат / оновлення' : `Редагувати: ${editingItem?.title}`}
                  </h2>
                  <p className="text-xs text-sacred-goldLight">
                    {formCategory === 'books' ? 'Розділ «Книги»' : formCategory === 'music' ? 'Розділ «Музика»' : 'Розділ «Сакральні артефакти»'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Розділ (Блок) *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as 'books' | 'music' | 'artifacts')}
                    className="w-full bg-[#161338] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-sacred-gold"
                  >
                    <option value="books">📚 Книги-цілителі</option>
                    <option value="music">🎵 Музика та кліпи</option>
                    <option value="artifacts">🔮 Сакральні артефакти</option>
                  </select>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Мітка / Бейдж
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="Бестселер, Прем'єра, Оберіг..."
                    className="w-full bg-[#161338] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-sacred-gold"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Порядковий номер
                  </label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    min={1}
                    className="w-full bg-[#161338] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-sacred-gold"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Назва експонату / книги / треку *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="наприклад: Книга-цілитель “Бесіди з Ангелами”"
                  className="w-full bg-[#161338] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sacred-gold font-medium"
                  required
                />
              </div>

              {/* Image Input with Preview */}
              <ImageInputWithPreview
                label="Зображення експонату (обкладинка, фото книги чи артефакту)"
                value={formImage}
                onChange={setFormImage}
                placeholder="/images/creativity/your-photo.jpg"
                recommendedPresets={CREATIVITY_IMAGE_PRESETS}
              />

              {/* Short Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Короткий опис (відображається на картці в згорнутому стані)
                </label>
                <textarea
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  rows={2}
                  placeholder="Коротке резюме або суть..."
                  className="w-full bg-[#161338] border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-sacred-gold leading-relaxed"
                />
              </div>

              {/* Buttons link & text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Текст кнопки
                  </label>
                  <input
                    type="text"
                    value={formButtonText}
                    onChange={(e) => setFormButtonText(e.target.value)}
                    placeholder="Придбати книгу / Слухати / Замовити в Instagram"
                    className="w-full bg-[#161338] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-sacred-gold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Посилання для кнопки (URL)
                  </label>
                  <input
                    type="text"
                    value={formButtonUrl}
                    onChange={(e) => setFormButtonUrl(e.target.value)}
                    placeholder="https://... або /news/..."
                    className="w-full bg-[#161338] border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-sacred-gold"
                  />
                </div>
              </div>

              {/* Rich Content Visual Editor */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Повний розгорнутий текст (з посиланнями, списками та форматуванням)
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Використовуйте візуальний редактор: виділіть слово та натисніть «Посилання» щоб додати посилання. Текст відображатиметься при натисканні «Розгорнути опис ↓».
                </p>
                <RichTextVisualEditor
                  value={formContentHtml}
                  onChange={setFormContentHtml}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-semibold text-xs transition-all"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sacred-gold text-sacred-dark hover:bg-sacred-goldLight font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Зберегти зміни</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
