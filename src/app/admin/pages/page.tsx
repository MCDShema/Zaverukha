'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { 
  Layers, 
  Save, 
  Check, 
  Home, 
  GraduationCap, 
  CalendarCheck, 
  Sparkles, 
  BookOpen, 
  Flame, 
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import ImageInputWithPreview from '@/components/admin/ImageInputWithPreview';

export default function AdminPagesEditorPage() {
  const { content, updateSection } = useContent();
  const [activeTab, setActiveTab] = useState<
    'homepage' | 'education' | 'consultation' | 'satsang' | 'creativity' | 'practices' | 'contacts'
  >('homepage');

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local form states initialized with current content
  const [homepageState, setHomepageState] = useState(content.homepage);
  const [educationState, setEducationState] = useState(content.education);
  const [consultationState, setConsultationState] = useState(content.consultationCenter);
  const [satsangState, setSatsangState] = useState(content.satsangYoga);
  const [creativityState, setCreativityState] = useState(content.creativity);
  const [practicesState, setPracticesState] = useState(content.practices);
  const [contactsState, setContactsState] = useState(content.contacts);

  // Keep local form states in sync when remote D1 data arrives
  React.useEffect(() => {
    setHomepageState(content.homepage);
    setEducationState(content.education);
    setConsultationState(content.consultationCenter);
    setSatsangState(content.satsangYoga);
    setCreativityState(content.creativity);
    setPracticesState(content.practices);
    setContactsState(content.contacts);
  }, [content]);

  const showNotification = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const saveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('homepage', homepageState);
    showNotification();
  };

  const saveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('education', educationState);
    showNotification();
  };

  const saveConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('consultationCenter', consultationState);
    showNotification();
  };

  const saveSatsang = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('satsangYoga', satsangState);
    showNotification();
  };

  const saveCreativity = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('creativity', creativityState);
    showNotification();
  };

  const savePractices = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('practices', practicesState);
    showNotification();
  };

  const saveContacts = (e: React.FormEvent) => {
    e.preventDefault();
    updateSection('contacts', contactsState);
    showNotification();
  };

  const tabs = [
    { id: 'homepage', label: 'Головна', icon: Home, viewUrl: '/' },
    { id: 'education', label: 'Навчання (PIPL / IMARIA)', icon: GraduationCap, viewUrl: '/education' },
    { id: 'consultation', label: 'Консультаційний центр', icon: CalendarCheck, viewUrl: '/consultation-center' },
    { id: 'satsang', label: 'Сатсанги.DivineYoga', icon: Sparkles, viewUrl: '/satsang-divine-yoga' },
    { id: 'creativity', label: 'Моя творчість', icon: BookOpen, viewUrl: '/creativity' },
    { id: 'practices', label: 'Практики (ПЛАП)', icon: Flame, viewUrl: '/practices' },
    { id: 'contacts', label: 'Контакти & Реквізити', icon: PhoneCall, viewUrl: '/contacts' },
  ];

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-sacred-gold" />
            <span>Редактор сторінок сайту</span>
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Змінюйте тексти, описи курсів, реквізити та посилання на всіх сторінках
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4" />
            <span>Зміни успішно збережено на сайті!</span>
          </div>
        )}
      </div>

      {/* TABS SELECTOR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                active
                  ? 'bg-sacred-gold text-sacred-dark shadow-md font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>


      {/* 1. TAB: HOMEPAGE */}
      {activeTab === 'homepage' && (
        <form onSubmit={saveHomepage} className="space-y-6">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-serif text-white font-semibold">Головний екран (Hero)</h2>
              <Link href="/" target="_blank" className="text-xs text-sacred-goldLight hover:underline flex items-center gap-1">
                <span>Переглянути сторінку</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Головний заголовок</label>
                <input
                  type="text"
                  value={homepageState.heroTitle}
                  onChange={(e) => setHomepageState({ ...homepageState, heroTitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sacred-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Підзаголовок / Статус</label>
                <input
                  type="text"
                  value={homepageState.heroSubtitle}
                  onChange={(e) => setHomepageState({ ...homepageState, heroSubtitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sacred-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Опис / Біографія</label>
              <textarea
                rows={3}
                value={homepageState.heroDescription}
                onChange={(e) => setHomepageState({ ...homepageState, heroDescription: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sacred-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Регалія 1 (Консультації)</label>
                <input
                  type="text"
                  value={homepageState.statConsultations}
                  onChange={(e) => setHomepageState({ ...homepageState, statConsultations: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Регалія 2 (Протоколи)</label>
                <input
                  type="text"
                  value={homepageState.statProtocols}
                  onChange={(e) => setHomepageState({ ...homepageState, statProtocols: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Регалія 3 (Досвід)</label>
                <input
                  type="text"
                  value={homepageState.statYears}
                  onChange={(e) => setHomepageState({ ...homepageState, statYears: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Ключова цитата Ірини Заверухи</label>
              <input
                type="text"
                value={homepageState.quote}
                onChange={(e) => setHomepageState({ ...homepageState, quote: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sacred-gold italic"
              />
            </div>

            {/* Homepage Images */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="text-xs font-semibold text-sacred-goldLight uppercase tracking-wider">
                Фотографії Головної Сторінки
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ImageInputWithPreview
                  label="Головне фото Ірини (Hero)"
                  value={homepageState.heroImage || '/images/hero-irina.jpg'}
                  onChange={(val) => setHomepageState({ ...homepageState, heroImage: val })}
                  placeholder="/images/hero-irina.jpg"
                />
                <ImageInputWithPreview
                  label="Фото у секції «Про Ірину Заверуху»"
                  value={homepageState.aboutImage || '/images/about-irina.png'}
                  onChange={(val) => setHomepageState({ ...homepageState, aboutImage: val })}
                  placeholder="/images/about-irina.png"
                />
              </div>
            </div>
          </div>

          {/* Cold Funnel Settings */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              Холодна воронка (Точки входу для новачків)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-sacred-gold">Точка входу №1</span>
                <input
                  type="text"
                  value={homepageState.coldPoint1Title}
                  onChange={(e) => setHomepageState({ ...homepageState, coldPoint1Title: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white font-semibold"
                />
                <textarea
                  rows={4}
                  value={homepageState.coldPoint1Desc}
                  onChange={(e) => setHomepageState({ ...homepageState, coldPoint1Desc: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white/80"
                />
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-sacred-gold">Точка входу №2</span>
                <input
                  type="text"
                  value={homepageState.coldPoint2Title}
                  onChange={(e) => setHomepageState({ ...homepageState, coldPoint2Title: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white font-semibold"
                />
                <textarea
                  rows={4}
                  value={homepageState.coldPoint2Desc}
                  onChange={(e) => setHomepageState({ ...homepageState, coldPoint2Desc: e.target.value })}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white/80"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sacred-gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Зберегти Головну сторінку</span>
            </button>
          </div>
        </form>
      )}


      {/* 2. TAB: EDUCATION */}
      {activeTab === 'education' && (
        <form onSubmit={saveEducation} className="space-y-6">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              Екосистема PIPL®
            </h2>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Вступний опис розділу PIPL</label>
              <textarea
                rows={3}
                value={educationState.piplIntro}
                onChange={(e) => setEducationState({ ...educationState, piplIntro: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Опис курсу «Від гордині до гідності»</label>
                <textarea
                  rows={2}
                  value={educationState.hordyniDesc}
                  onChange={(e) => setEducationState({ ...educationState, hordyniDesc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Опис курсу «Сам собі цілитель»</label>
                <textarea
                  rows={2}
                  value={educationState.healerDesc}
                  onChange={(e) => setEducationState({ ...educationState, healerDesc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Опис програми «КРИЛА®»</label>
                <textarea
                  rows={2}
                  value={educationState.krylaDesc}
                  onChange={(e) => setEducationState({ ...educationState, krylaDesc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Опис блоку «Майстерня жіночих таїнств» (Алхімікум)</label>
                <textarea
                  rows={2}
                  value={educationState.mysteriesDesc}
                  onChange={(e) => setEducationState({ ...educationState, mysteriesDesc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              IMARIA Academia®
            </h2>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Вступний опис Академії</label>
              <textarea
                rows={3}
                value={educationState.academiaIntro}
                onChange={(e) => setEducationState({ ...educationState, academiaIntro: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Ступінь 1 (Опис)</label>
                <textarea
                  rows={3}
                  value={educationState.degree1Desc}
                  onChange={(e) => setEducationState({ ...educationState, degree1Desc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Ступінь 2 (Опис)</label>
                <textarea
                  rows={3}
                  value={educationState.degree2Desc}
                  onChange={(e) => setEducationState({ ...educationState, degree2Desc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Тренерський курс «Путь Душі»</label>
              <textarea
                rows={2}
                value={educationState.trainerDesc}
                onChange={(e) => setEducationState({ ...educationState, trainerDesc: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Education Banners */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="text-xs font-semibold text-sacred-goldLight uppercase tracking-wider">
                Банери освітніх програм
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ImageInputWithPreview
                  label="Банер програми «КРИЛА®»"
                  value={educationState.krylaBannerImage || '/images/banners/kryla-banner.jpg'}
                  onChange={(val) => setEducationState({ ...educationState, krylaBannerImage: val })}
                  placeholder="/images/banners/kryla-banner.jpg"
                />
                <ImageInputWithPreview
                  label="Банер «Алхімікум»"
                  value={educationState.alhimicumBannerImage || '/images/banners/alhimicum-banner.jpg'}
                  onChange={(val) => setEducationState({ ...educationState, alhimicumBannerImage: val })}
                  placeholder="/images/banners/alhimicum-banner.jpg"
                />
                <ImageInputWithPreview
                  label="Банер «IMARIA Academia»"
                  value={educationState.academiaBannerImage || '/images/banners/academia-banner.jpg'}
                  onChange={(val) => setEducationState({ ...educationState, academiaBannerImage: val })}
                  placeholder="/images/banners/academia-banner.jpg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sacred-gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Зберегти розділ Навчання</span>
            </button>
          </div>
        </form>
      )}


      {/* 3. TAB: CONSULTATION CENTER */}
      {activeTab === 'consultation' && (
        <form onSubmit={saveConsultation} className="space-y-6">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              Консультаційний центр
            </h2>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Заголовок та опис центру</label>
              <textarea
                rows={3}
                value={consultationState.intro}
                onChange={(e) => setConsultationState({ ...consultationState, intro: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            {/* Consultation Banner Image */}
            <div className="pt-2">
              <ImageInputWithPreview
                label="Головний банер сторінки консультацій"
                value={consultationState.bannerImage || '/images/consultations-banner.jpg'}
                onChange={(val) => setConsultationState({ ...consultationState, bannerImage: val })}
                placeholder="/images/consultations-banner.jpg"
              />
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-sacred-gold">Блок 1: Банер Калькулятора</span>
              <input
                type="text"
                value={consultationState.calculatorBannerTitle}
                onChange={(e) => setConsultationState({ ...consultationState, calculatorBannerTitle: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white font-semibold"
              />
              <textarea
                rows={2}
                value={consultationState.calculatorBannerDesc}
                onChange={(e) => setConsultationState({ ...consultationState, calculatorBannerDesc: e.target.value })}
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-xs text-white/80"
              />
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-white/80">Блок 2: Опис послуг майстрів</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={consultationState.service1Title}
                    onChange={(e) => setConsultationState({ ...consultationState, service1Title: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-sacred-goldLight font-semibold mb-1"
                  />
                  <textarea
                    rows={2}
                    value={consultationState.service1Desc}
                    onChange={(e) => setConsultationState({ ...consultationState, service1Desc: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={consultationState.service2Title}
                    onChange={(e) => setConsultationState({ ...consultationState, service2Title: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-sacred-goldLight font-semibold mb-1"
                  />
                  <textarea
                    rows={2}
                    value={consultationState.service2Desc}
                    onChange={(e) => setConsultationState({ ...consultationState, service2Desc: e.target.value })}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sacred-gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Зберегти Консультаційний центр</span>
            </button>
          </div>
        </form>
      )}


      {/* 4. TAB: SATSANG & DIVINEYOGA */}
      {activeTab === 'satsang' && (
        <form onSubmit={saveSatsang} className="space-y-6">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              Сатсанги.DivineYoga (УТП)
            </h2>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Вступний текст</label>
              <textarea
                rows={3}
                value={satsangState.intro}
                onChange={(e) => setSatsangState({ ...satsangState, intro: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Опис Дивань-йоги (DivineYoga)</label>
              <textarea
                rows={3}
                value={satsangState.divineYogaDesc}
                onChange={(e) => setSatsangState({ ...satsangState, divineYogaDesc: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Посилання на YouTube плейлист йоги</label>
                <input
                  type="text"
                  value={satsangState.youtubeYogaPlaylistUrl}
                  onChange={(e) => setSatsangState({ ...satsangState, youtubeYogaPlaylistUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Посилання на YouTube плейлист медитацій</label>
                <input
                  type="text"
                  value={satsangState.youtubeMeditationsPlaylistUrl}
                  onChange={(e) => setSatsangState({ ...satsangState, youtubeMeditationsPlaylistUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Satsang Banners */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="text-xs font-semibold text-sacred-goldLight uppercase tracking-wider">
                Банери сторінки
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ImageInputWithPreview
                  label="Банер Сатсангів та йоги"
                  value={satsangState.bannerImage || '/images/satsang-banner.jpg'}
                  onChange={(val) => setSatsangState({ ...satsangState, bannerImage: val })}
                  placeholder="/images/satsang-banner.jpg"
                />
                <ImageInputWithPreview
                  label="Банер Медитацій"
                  value={satsangState.meditationsBannerImage || '/images/meditations-banner.jpg'}
                  onChange={(val) => setSatsangState({ ...satsangState, meditationsBannerImage: val })}
                  placeholder="/images/meditations-banner.jpg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sacred-gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Зберегти Сатсанги & Йогу</span>
            </button>
          </div>
        </form>
      )}


      {/* 5. TAB: CREATIVITY */}
      {activeTab === 'creativity' && (
        <form onSubmit={saveCreativity} className="space-y-6">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              Моя творчість
            </h2>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Вступне слово</label>
              <textarea
                rows={2}
                value={creativityState.intro}
                onChange={(e) => setCreativityState({ ...creativityState, intro: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Опис книги «Бесіди з Ангелами»</label>
                <textarea
                  rows={3}
                  value={creativityState.book1Desc}
                  onChange={(e) => setCreativityState({ ...creativityState, book1Desc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Опис «Балади Берегині»</label>
                <textarea
                  rows={3}
                  value={creativityState.musicBaladaDesc}
                  onChange={(e) => setCreativityState({ ...creativityState, musicBaladaDesc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Сукня «Споріднені»</label>
                <textarea
                  rows={2}
                  value={creativityState.dressDesc}
                  onChange={(e) => setCreativityState({ ...creativityState, dressDesc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Кулон «АВАТАР»</label>
                <textarea
                  rows={2}
                  value={creativityState.avatarDesc}
                  onChange={(e) => setCreativityState({ ...creativityState, avatarDesc: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Посилання на Instagram магазин артефактів</label>
              <input
                type="text"
                value={creativityState.instagramShopUrl}
                onChange={(e) => setCreativityState({ ...creativityState, instagramShopUrl: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Creativity Photos */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <h3 className="text-xs font-semibold text-sacred-goldLight uppercase tracking-wider">
                Фотографії артефактів та творчості
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <ImageInputWithPreview
                  label="Фото книги «Бесіди з Ангелами»"
                  value={creativityState.book1Image || '/images/creativity/book.png'}
                  onChange={(val) => setCreativityState({ ...creativityState, book1Image: val })}
                  placeholder="/images/creativity/book.png"
                />
                <ImageInputWithPreview
                  label="Фото сукні «Споріднені»"
                  value={creativityState.dressImage || '/images/creativity/dress.png'}
                  onChange={(val) => setCreativityState({ ...creativityState, dressImage: val })}
                  placeholder="/images/creativity/dress.png"
                />
                <ImageInputWithPreview
                  label="Фото кулона «АВАТАР»"
                  value={creativityState.avatarImage || '/images/creativity/amulet.png'}
                  onChange={(val) => setCreativityState({ ...creativityState, avatarImage: val })}
                  placeholder="/images/creativity/amulet.png"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sacred-gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Зберегти Творчість</span>
            </button>
          </div>
        </form>
      )}


      {/* 6. TAB: PRACTICES */}
      {activeTab === 'practices' && (
        <form onSubmit={savePractices} className="space-y-6">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              Практики (ПЛАП & Курси в записі)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Назва практикуму</label>
                <input
                  type="text"
                  value={practicesState.plapTitle}
                  onChange={(e) => setPracticesState({ ...practicesState, plapTitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Ціновий акцент</label>
                <input
                  type="text"
                  value={practicesState.plapPrice}
                  onChange={(e) => setPracticesState({ ...practicesState, plapPrice: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Опис практикуму ПЛАП (українською)</label>
              <textarea
                rows={3}
                value={practicesState.plapDesc}
                onChange={(e) => setPracticesState({ ...practicesState, plapDesc: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Опис курсів у записі</label>
              <textarea
                rows={2}
                value={practicesState.recordingsDesc}
                onChange={(e) => setPracticesState({ ...practicesState, recordingsDesc: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sacred-gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Зберегти Практики</span>
            </button>
          </div>
        </form>
      )}


      {/* 7. TAB: CONTACTS & REQUISITES */}
      {activeTab === 'contacts' && (
        <form onSubmit={saveContacts} className="space-y-6">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-lg font-serif text-white font-semibold border-b border-white/10 pb-3">
              Офіційні реквізити ФОП
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight mb-1">Отримувач (ПІБ)</label>
                <input
                  type="text"
                  value={contactsState.recipientName}
                  onChange={(e) => setContactsState({ ...contactsState, recipientName: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight mb-1">ЄДРПОУ</label>
                <input
                  type="text"
                  value={contactsState.edrpou}
                  onChange={(e) => setContactsState({ ...contactsState, edrpou: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-sacred-goldLight mb-1">IBAN (ПриватБанк)</label>
              <input
                type="text"
                value={contactsState.iban}
                onChange={(e) => setContactsState({ ...contactsState, iban: e.target.value })}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2 text-sm text-white font-mono font-bold tracking-wider"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Посилання на оплату WayForPay</label>
                <input
                  type="text"
                  value={contactsState.wayForPayUrl}
                  onChange={(e) => setContactsState({ ...contactsState, wayForPayUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Посилання на банку Monobank (Скарбничка)</label>
                <input
                  type="text"
                  value={contactsState.monobankJarUrl}
                  onChange={(e) => setContactsState({ ...contactsState, monobankJarUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Telegram канал</label>
                <input
                  type="text"
                  value={contactsState.telegramUrl}
                  onChange={(e) => setContactsState({ ...contactsState, telegramUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">Instagram профіль</label>
                <input
                  type="text"
                  value={contactsState.instagramUrl}
                  onChange={(e) => setContactsState({ ...contactsState, instagramUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="sacred-gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Зберегти Контакти & Реквізити</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
