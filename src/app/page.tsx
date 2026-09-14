'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Shield, 
  Calculator, 
  Compass, 
  GraduationCap, 
  CheckCircle, 
  Flame, 
  Users, 
  BookOpen, 
  Play, 
  CalendarCheck,
  Award,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import BannerSlider from '@/components/home/BannerSlider';
import SoulPathCalculator from '@/components/calculator/SoulPathCalculator';
import { useContent } from '@/context/ContentContext';

export default function HomePage() {
  const { content } = useContent();
  const { homepage, articles } = content;

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION (Автентичний блок «Про мене» з реальним фото Ірини Заверухи) */}
      <section className="relative pt-8 sm:pt-12 pb-16 px-4 sm:px-6 lg:px-8 sacred-gradient-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Real Portrait of Irina Zaverukha */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-sacred-gold/40 via-sacred-blue/50 to-transparent rounded-3xl blur-2xl -z-10" />
                
                <div className="relative rounded-3xl overflow-hidden border-2 border-sacred-gold/40 shadow-2xl bg-sacred-dark/80 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/hero-irina.jpg" 
                    alt="Ірина Заверуха - IMARIA MASTER" 
                    className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sacred-night via-sacred-night/70 to-transparent p-6 text-center">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                      Ірина Заверуха
                    </h2>
                    <p className="text-xs sm:text-sm text-sacred-goldLight font-medium mt-0.5">
                      IMARIA MASTER • Провідник Нового Часу
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-[10px] bg-sacred-gold/20 text-sacred-goldLight px-2 py-0.5 rounded-full border border-sacred-gold/30">
                        Орден Королеви Анни
                      </span>
                      <span className="text-[10px] bg-sacred-gold/20 text-sacred-goldLight px-2 py-0.5 rounded-full border border-sacred-gold/30">
                        Орден Св. Софії
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Authentic Bio Presentation & Regalia */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Вітаю Вас, любий Гість!</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-snug">
                Я — Ірина Заверуха <br />
                <span className="gold-text-gradient">(IMARIA MASTER)</span>
              </h1>

              <p className="text-base sm:text-lg font-serif text-sacred-goldLight font-medium leading-relaxed">
                Засновниця та пульсар проєктів IMARIA® & PIPL® — простору багатовимірного розвитку та Алхімії Живого Життя
              </p>

              {/* Authentic Regalia Bullet List from zaverukha.com */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/85 text-left border-l-2 border-sacred-gold/40 pl-4 my-4">
                <li className="flex items-start gap-2">
                  <span className="text-sacred-gold text-base leading-none">✦</span>
                  <span><strong>Майстер трансформації свідомості</strong>, космоеніопсихолог і містик, цілитель в родовій традиції прямої передачі. За 17 років проконсультувала понад 50 000 осіб.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sacred-gold text-base leading-none">✦</span>
                  <span><strong>Вчитель Йоги Свідомості</strong> і провідник традиції <strong className="text-sacred-goldLight">#Divineyoga by IMARIA</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sacred-gold text-base leading-none">✦</span>
                  <span><strong>Авторка книги-цілителя</strong> &laquo;Бесіди з Ангелами&raquo; та &laquo;Пір&apos;я до твоїх крил&raquo;, сукні Берегині &laquo;Споріднені&raquo;, кулона оберега &laquo;АВАТАР&raquo;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sacred-gold text-base leading-none">✦</span>
                  <span><strong>Авторка аналітично-нумерологічної методики</strong> діагностики долі &laquo;Путь Душі&raquo; (Way of the Soul)&reg;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sacred-gold text-base leading-none">✦</span>
                  <span><strong>Засновниця IMARIA ACADEMIA</strong> — сертифікаційного простору для професійних хілерів, менторів та вібраціологів.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sacred-gold text-base leading-none">✦</span>
                  <span><strong>Реалізатор понад 3000 трансформаційних протоколів</strong>, марафонів, курсів та річної програми <strong className="text-sacred-goldLight">КРИЛА&reg;</strong>.</span>
                </li>
              </ul>

              {/* Social Icons (Facebook, Instagram, Telegram, YouTube) */}
              <div className="flex items-center gap-3 pt-2 justify-center lg:justify-start">
                <a 
                  href="https://www.facebook.com/zaverukhairyna" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2] border border-[#1877F2]/40 text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook Ірина Заверуха"
                >
                  <span className="font-bold text-sm">f</span>
                </a>
                <a 
                  href="https://www.instagram.com/irynazaverukha_imaria?igsh=MXI5bmVuOG5sNWd4bw==" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center transition-all hover:scale-110 shadow-md"
                  aria-label="Instagram Ірина Заверуха"
                >
                  <span className="font-bold text-xs">IG</span>
                </a>
                <a 
                  href="https://t.me/ZaverukhaIrina" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-[#229ED9]/20 hover:bg-[#229ED9] border border-[#229ED9]/40 text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Telegram Ірина Заверуха"
                >
                  <span className="font-bold text-xs">TG</span>
                </a>
                <a 
                  href="https://www.youtube.com/channel/UCz9oI1MnVkUTH_MCchtZDuA" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-[#FF0000]/20 hover:bg-[#FF0000] border border-[#FF0000]/40 text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="YouTube канал DivineYoga"
                >
                  <Play className="w-4 h-4 fill-current" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 justify-center lg:justify-start">
                <Link 
                  href="/consultation-center"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
                >
                  <CalendarCheck className="w-4 h-4 text-sacred-dark" />
                  <span>Консультаційний центр</span>
                </Link>

                <Link 
                  href="/calculator"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full sacred-blue-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-sacred-gold" />
                  <span>Калькулятор «Путь Душі»</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 2. TOP BANNER CAROUSEL (Всі автентичні банери курсів і програм з сайту zaverukha.com) */}
      <section className="relative">
        <BannerSlider />
      </section>


      {/* 3. ХОЛОДНА ВОРОНКА ДЛЯ НОВАЧКІВ (КРИТИЧНО ЗА ТЗ: ПУНКТИ 1 ТА 2 НА ПЕРШОМУ ПЛАНІ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Вперше тут? З чого розпочати</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-semibold">
            Прості та потужні кроки для <span className="gold-text-gradient">вашого зцілення</span>
          </h2>
          <p className="text-sm text-white/75 mt-2">
            Якщо ви тільки зайшли з відео чи марафону — вам не потрібна складна теорія. Оберіть одну з двох ключових точок входу, яка дає відчутний результат з першого дня.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Пункт №1: Родовий сеанс з ціленням */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-sacred-gold/50 relative overflow-hidden group hover:border-sacred-gold transition-all">
            <div className="absolute top-0 right-0 bg-sacred-gold text-sacred-dark text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              ★ Рекомендовано №1
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sacred-gold/20 flex items-center justify-center text-sacred-gold border border-sacred-gold/40">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors">
                  {homepage.coldPoint1Title}
                </h3>
                <p className="text-xs text-sacred-goldLight font-medium mt-1">
                  {homepage.coldPoint1Subtitle}
                </p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {homepage.coldPoint1Desc}
              </p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70 space-y-1">
                <div className="flex items-center gap-2 text-sacred-goldLight font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Не вимагає попередніх практик чи спеціальних знань</span>
                </div>
                <div className="flex items-center gap-2 text-sacred-goldLight font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Швидке зняття родових блоків та емоційної напруги</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-white/60">Формат участі:</div>
                <div className="text-sm font-semibold text-white">Онлайн / запис</div>
              </div>
              <Link 
                href="/education/pipl"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                <span>Обрати сеанс</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Пункт №2: Мамина/Татова історія («Від гордині до гідності») */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-sacred-gold/50 relative overflow-hidden group hover:border-sacred-gold transition-all">
            <div className="absolute top-0 right-0 bg-sacred-gold text-sacred-dark text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              ★ Базовий крок №2
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sacred-gold/20 flex items-center justify-center text-sacred-gold border border-sacred-gold/40">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors">
                  {homepage.coldPoint2Title}
                </h3>
                <p className="text-xs text-sacred-goldLight font-medium mt-1">
                  {homepage.coldPoint2Subtitle}
                </p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                {homepage.coldPoint2Desc}
              </p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70 space-y-1">
                <div className="flex items-center gap-2 text-sacred-goldLight font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Трансформація дитячих образ та претензій до батьків</span>
                </div>
                <div className="flex items-center gap-2 text-sacred-goldLight font-medium">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Відкриття фінансового та ресурсного потоку</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-white/60">Доступність:</div>
                <div className="text-sm font-semibold text-sacred-goldLight">Рекомендовано для старту</div>
              </div>
              <Link 
                href="/education/pipl"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                <span>Розпочати курс</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 4. РОЗДІЛ «ПРО МЕНЕ» (Автентичний блок із zaverukha.com з фото about-irina.png) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-card rounded-3xl p-6 sm:p-10 border border-sacred-gold/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-sacred-gold/30 max-w-sm w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/about-irina.png" 
                  alt="Ірина Заверуха - Про мене" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4 text-left">
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Про мене
              </h2>
              <p className="text-base text-sacred-goldLight font-serif">
                З вами Провідник Нового часу, цілитель простору і енергій, голос душі Великої МА, метафізик, вчитель алхімії живого життя, наставниця для лідерів і наставників.
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Працюю на квантовому рівні через інтеграцію простору серця та найчистішого цілительного потоку інтуїції, заземленого в матерії! Володію техніками родокорекції та спіральними PSY-I технологіями квантового переходу для гармонізації долі.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link 
                  href="/satsang-divine-yoga"
                  className="px-6 py-2.5 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Детальніше про місію</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link 
                  href="/creativity"
                  className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Моя творчість
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. МОЇ КОНСУЛЬТАЦІЇ ТА КОНСУЛЬТАЦІЙНИЙ ЦЕНТР (З автентичним фото consultations-banner.jpg) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-card rounded-3xl p-6 sm:p-10 border border-sacred-gold/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
                <CalendarCheck className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Новий пункт меню</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-semibold">
                Консультаційний центр
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Працюю на квантовому рівні через інтеграцію простору серця та найчистішого цілительного потоку інтуїції. Надаю різні види консультацій під запити людей: космоеніопсихолога, бацзи діагноста, цілителя долі та духовного ментора.
              </p>

              {/* ДВА БЛОКИ ЗА ТЗ (3.2): Блок 1 - Калькулятор, Блок 2 - Опис центру */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-sacred-gold/15 border border-sacred-gold/40">
                  <div className="flex items-center gap-2 text-sacred-gold font-bold text-sm">
                    <Calculator className="w-4 h-4" />
                    <span>Блок 1: Калькулятор «Путь Душі»</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    Миттєвий безкоштовний експрес-розрахунок вашого призначення та арканів сили.
                  </p>
                  <Link 
                    href="/calculator"
                    className="inline-block text-xs text-sacred-goldLight hover:underline font-semibold mt-2"
                  >
                    Розрахувати безкоштовно →
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Users className="w-4 h-4 text-sacred-gold" />
                    <span>Блок 2: Сертифіковані майстри</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    Команда перевірених спеціалістів, випускників IMARIA Academia.
                  </p>
                  <Link 
                    href="/consultation-center"
                    className="inline-block text-xs text-sacred-goldLight hover:underline font-semibold mt-2"
                  >
                    Замовити консультацію →
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href="/consultation-center"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4 text-sacred-dark" />
                  <span>Перейти до Консультаційного центру</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-sacred-gold/30 max-w-sm w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/consultations-banner.jpg" 
                  alt="Мої консультації" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 6. РОЗДІЛ «НАВЧАННЯ» — 2 НАПРЯМКИ РОЗВИТКУ (З автентичним фото education-banner.jpg) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Архітектура входу за ТЗ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-semibold">
            Мої програми. <span className="gold-text-gradient">Навчання</span>
          </h2>
          <p className="text-sm text-white/75 mt-2">
            Замість нескінченного списку — рівно два зрозумілі напрямки. Оберіть свій шлях за 1 клік.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Напрямок 1: Екосистема PIPL */}
          <div className="sacred-card rounded-2xl overflow-hidden border border-sacred-gold/30 flex flex-col justify-between group">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-sacred-gold/20 flex items-center justify-center text-sacred-gold border border-sacred-gold/30">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-sacred-goldLight font-semibold px-2.5 py-1 rounded bg-sacred-gold/10 border border-sacred-gold/30">
                  Напрямок №1
                </span>
              </div>

              <h3 className="text-2xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors">
                Екосистема PIPL
              </h3>

              <p className="text-sm text-white/80 leading-relaxed">
                Програми для новачків та практиків. Робота над собою, гармонізація родових зв’язків, відновлення життєвого ресурсу та розвиток свідомості.
              </p>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>Курс &laquo;Мамина історія / Татова історія&raquo; (Від гордині до гідності)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>&laquo;Сам собі цілитель&raquo; (3 фундаментальні лекції)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>Річна програма &laquo;КРИЛА&reg;&raquo; (самостійний бренд)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>Майстерня жіночих таїнств (Алхімікум, ініціації, кемпи)</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/60">Для кожного, хто прагне змін</span>
              <Link 
                href="/education/pipl"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider"
              >
                <span>Увійти в PIPL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Напрямок 2: IMARIA Academia */}
          <div className="sacred-card rounded-2xl overflow-hidden border border-sacred-gold/30 flex flex-col justify-between group">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-sacred-blue/40 flex items-center justify-center text-sacred-gold border border-sacred-gold/30">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-sacred-goldLight font-semibold px-2.5 py-1 rounded bg-sacred-gold/10 border border-sacred-gold/30">
                  Напрямок №2
                </span>
              </div>

              <h3 className="text-2xl font-serif text-white font-semibold group-hover:text-sacred-goldLight transition-colors">
                IMARIA Academia
              </h3>

              <p className="text-sm text-white/80 leading-relaxed">
                Сертифікаційний простір для тих, хто обирає шлях професійного провідника, духовного ментора, вібраціолога або цілителя нового часу.
              </p>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>Ступінь 1 / Ступінь 2 професійної підготовки</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>Методологія діагностики долі &laquo;Путь Душі&raquo; (Way of the Soul)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>Міжнародна сертифікація та акредитація практики</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sacred-gold" />
                  <span>Вступ до реєстру майстрів Консультаційного центру</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/60">Для майстрів та провідників</span>
              <Link 
                href="/education/academia"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full sacred-blue-btn text-xs font-semibold uppercase tracking-wider border border-sacred-gold/50"
              >
                <span>Вступити в Академію</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 7. ВІДКРИТІ ПРАКТИКУМИ СЛУЖІННЯ ТА МЕДИТАЦІЇ (Сатсанги.DivineYoga) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Сатсанги.DivineYoga */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-sacred-gold/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-white/10 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/satsang-banner.jpg" 
                  alt="Відкриті практикуми служіння" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif text-white font-semibold">
                Відкриті практикуми служіння (Сатсанги)
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Сатсанг — прямий канал, через який передається або приймається інформація. Це чистота потоку і можливість почути себе істинну. Унікальне УТП проєкту, відкрите для кожного.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-sacred-goldLight font-medium">Безкоштовний доступ</span>
              <Link 
                href="/satsang-divine-yoga"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Дивитись записи</span>
              </Link>
            </div>
          </div>

          {/* Медитації */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-sacred-gold/30 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-white/10 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/meditations-banner.jpg" 
                  alt="Медитації Ірини Заверухи" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif text-white font-semibold">
                Медитації та сакральні практики
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Майстерність медитації — це не лише напрацювання концентрації уваги. Це ще й розслаблення нервової системи, вміння бути стресостійким і жити в моменті. Обирай свою медитацію серцем!
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-sacred-goldLight font-medium">Аудіо & Відео</span>
              <Link 
                href="/practices"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full sacred-blue-btn text-xs font-semibold uppercase tracking-wider border border-sacred-gold/40"
              >
                <span>Обрати медитацію</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 8. МОЯ ТВОРЧІСТЬ: БЕСІДИ З АНГЕЛАМИ ТА АРТЕФАКТИ СИЛИ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-card rounded-3xl p-6 sm:p-10 border border-sacred-gold/30">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest mb-2">
              <BookOpen className="w-3.5 h-3.5 text-sacred-gold" />
              <span>Сакральні артефакти</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
              Моя творчість
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Книга-цілитель &laquo;Бесіди з Ангелами&raquo;, сукня Берегині &laquo;Споріднені&raquo;, кулон &laquo;АВАТАР&raquo; та пісенний альбом.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 hover:border-sacred-gold/50 transition-colors">
              <div className="h-44 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/book.png" alt="Бесіди з Ангелами" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h4 className="font-serif text-base text-white font-semibold">Книга &laquo;Бесіди з Ангелами&raquo;</h4>
              <p className="text-xs text-white/60">Книга-цілитель прямого зв&apos;язку з духовними наставниками</p>
              <Link href="/creativity" className="inline-block text-xs text-sacred-goldLight hover:underline font-semibold">
                Детальніше →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 hover:border-sacred-gold/50 transition-colors">
              <div className="h-44 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/dress.png" alt="Сукня Споріднені" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h4 className="font-serif text-base text-white font-semibold">Сукня Берегині &laquo;Споріднені&raquo;</h4>
              <p className="text-xs text-white/60">Сакральний одяг-оберіг з натуральних тканин та вишивки</p>
              <Link href="/creativity" className="inline-block text-xs text-sacred-goldLight hover:underline font-semibold">
                Детальніше →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 hover:border-sacred-gold/50 transition-colors">
              <div className="h-44 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/amulet.png" alt="Кулон АВАТАР" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h4 className="font-serif text-base text-white font-semibold">Кулон-оберіг &laquo;АВАТАР&raquo;</h4>
              <p className="text-xs text-white/60">Срібний сакральний знак для захисту та заземлення</p>
              <Link href="/creativity" className="inline-block text-xs text-sacred-goldLight hover:underline font-semibold">
                Детальніше →
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* 9. ІНТЕРАКТИВНИЙ КАЛЬКУЛЯТОР «ПУТЬ ДУШІ» (WAY OF THE SOUL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SoulPathCalculator />
      </section>


      {/* 10. БЛОГ ТА НОВИНИ (З реальними статтями та зображеннями з zaverukha.com) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
              Блог та Новини
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Свіжі роздуми, медійні інтерв&apos;ю та події простору IMARIA & PIPL
            </p>
          </div>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <span>Всі публікації</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div key={article.slug} className="sacred-card rounded-2xl overflow-hidden border border-white/10 hover:border-sacred-gold/50 transition-all flex flex-col justify-between group">
              {article.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-sacred-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-sacred-night/80 backdrop-blur-sm text-sacred-gold text-[10px] font-bold px-2.5 py-0.5 rounded border border-sacred-gold/30 uppercase">
                    {article.category}
                  </span>
                </div>
              )}
              <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[11px] text-sacred-gold font-medium">{article.date}</div>
                  <h3 className="font-serif text-base text-white font-semibold line-clamp-2 group-hover:text-sacred-goldLight transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-sacred-gold hover:text-sacred-goldLight uppercase tracking-wider"
                  >
                    <span>Читати далі</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
