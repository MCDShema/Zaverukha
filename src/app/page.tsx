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
import { FacebookIcon, InstagramIcon, TelegramIcon, YoutubeIcon } from '@/components/ui/Icons';
import { useContent } from '@/context/ContentContext';

export default function HomePage() {
  const { content } = useContent();
  const { homepage, articles } = content;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden bg-white text-[#28303D]">
      
      {/* 1. HERO SECTION: Автентичний блок «Про мене» з реальним фото Ірини Заверухи */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F2F4FB] via-[#F8F9FD] to-white border-b border-slate-150">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Real Portrait of Irina Zaverukha */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2E2B75]/15 via-[#C99A2C]/20 to-transparent rounded-3xl blur-xl -z-10" />
                
                <div className="relative rounded-3xl overflow-hidden border-2 border-[#C99A2C]/40 shadow-2xl bg-white group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/hero-irina.jpg" 
                    alt="Ірина Заверуха - IMARIA MASTER" 
                    className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2E2B75] via-[#2E2B75]/85 to-transparent p-5 sm:p-6 text-center text-white">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                      Ірина Заверуха
                    </h2>
                    <p className="text-xs sm:text-sm text-[#F5DF7E] font-medium mt-0.5">
                      IMARIA MASTER • Провідник Нового Часу
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-[10px] bg-white/15 text-[#F5DF7E] px-2 py-0.5 rounded-full border border-white/20">
                        Орден Королеви Анни
                      </span>
                      <span className="text-[10px] bg-white/15 text-[#F5DF7E] px-2 py-0.5 rounded-full border border-white/20">
                        Орден Св. Софії
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Authentic Bio Presentation & Regalia */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E2B75]/10 border border-[#2E2B75]/20 text-[#2E2B75] text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#B37E11]" />
                <span>Вітаю Вас, любий Гість!</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2E2B75] tracking-tight leading-snug">
                Я — Ірина Заверуха <br />
                <span className="gold-text-gradient">(IMARIA MASTER)</span>
              </h1>

              <p className="text-base sm:text-lg font-serif text-[#2E2B75]/90 font-medium leading-relaxed">
                Засновниця та пульсар проєктів IMARIA® & PIPL® — простору багатовимірного розвитку та Алхімії Живого Життя
              </p>

              {/* Authentic Regalia Bullet List from zaverukha.com */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 text-left border-l-2 border-[#C99A2C] pl-4 my-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#B37E11] text-base leading-none">✦</span>
                  <span><strong className="text-[#2E2B75]">Майстер трансформації свідомості</strong>, космоеніопсихолог і містик, цілитель в родовій традиції прямої передачі. За 17 років проконсультувала понад 50 000 осіб.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B37E11] text-base leading-none">✦</span>
                  <span><strong className="text-[#2E2B75]">Вчитель Йоги Свідомості</strong> і провідник традиції <strong className="text-[#B37E11]">#Divineyoga by IMARIA</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B37E11] text-base leading-none">✦</span>
                  <span><strong className="text-[#2E2B75]">Авторка книги-цілителя</strong> &laquo;Бесіди з Ангелами&raquo; та &laquo;Пір&apos;я до твоїх крил&raquo;, сукні Берегині &laquo;Споріднені&raquo;, кулона оберега &laquo;АВАТАР&raquo;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B37E11] text-base leading-none">✦</span>
                  <span><strong className="text-[#2E2B75]">Авторка аналітично-нумерологічної методики</strong> діагностики долі &laquo;Путь Душі&raquo; (Way of the Soul)&reg;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B37E11] text-base leading-none">✦</span>
                  <span><strong className="text-[#2E2B75]">Засновниця IMARIA ACADEMIA</strong> — сертифікаційного простору для професійних хілерів, менторів та вібраціологів.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B37E11] text-base leading-none">✦</span>
                  <span><strong className="text-[#2E2B75]">Реалізатор понад 3000 трансформаційних протоколів</strong>, марафонів, курсів та річної програми <strong className="text-[#B37E11]">КРИЛА&reg;</strong>.</span>
                </li>
              </ul>

              {/* Social Icons (Authentic SVGs from zaverukha.com) */}
              <div className="flex items-center gap-4 pt-2 justify-center lg:justify-start">
                <a 
                  id="facebook_icon"
                  href="https://www.facebook.com/zaverukhairyna" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="text-[#2E2B75] hover:text-[#B37E11] transition-all duration-300 hover:scale-110 flex items-center justify-center p-1"
                  aria-label="Офіційний Facebook Ірини Заверухи"
                  title="Facebook Ірина Заверуха"
                >
                  <FacebookIcon className="w-8 h-8 fill-current" />
                </a>
                <a 
                  id="Instagram_icon"
                  href="https://www.instagram.com/irynazaverukha_imaria?igsh=MXI5bmVuOG5sNWd4bw==" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="text-[#2E2B75] hover:text-[#B37E11] transition-all duration-300 hover:scale-110 flex items-center justify-center p-1"
                  aria-label="Офіційний Instagram Ірини Заверухи"
                  title="Instagram Ірина Заверуха"
                >
                  <InstagramIcon className="w-8 h-8 fill-current" />
                </a>
                <a 
                  id="telegram_icon"
                  href="https://t.me/ZaverukhaIrina" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="text-[#2E2B75] hover:text-[#B37E11] transition-all duration-300 hover:scale-110 flex items-center justify-center p-1"
                  aria-label="Telegram Ірина Заверуха"
                  title="Telegram Ірина Заверуха"
                >
                  <TelegramIcon className="w-8 h-8 fill-current" />
                </a>
                <a 
                  id="youtube_icon"
                  href="https://www.youtube.com/channel/UCz9oI1MnVkUTH_MCchtZDuA" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="text-[#2E2B75] hover:text-[#B37E11] transition-all duration-300 hover:scale-110 flex items-center justify-center p-1"
                  aria-label="YouTube канал DivineYoga"
                  title="YouTube канал DivineYoga"
                >
                  <YoutubeIcon className="w-8 h-8 fill-current" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 justify-center lg:justify-start">
                <Link 
                  href="/consultation-center"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl btn-primary-dark text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Консультаційний центр</span>
                </Link>

                <Link 
                  href="/calculator"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl btn-gold text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Калькулятор «Путь Душі»</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 2. TOP BANNER CAROUSEL: Всі автентичні банери курсів і програм з сайту zaverukha.com */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <BannerSlider />
      </section>


      {/* 3. ХОЛОДНА ВОРОНКА ДЛЯ НОВАЧКІВ (КРИТИЧНО ЗА ТЗ: ПУНКТИ 1 ТА 2 НА ПЕРШОМУ ПЛАНІ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[#996B08] text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 text-[#B37E11]" />
            <span>Вперше тут? З чого розпочати</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2E2B75] font-bold">
            Прості та потужні кроки для <span className="gold-text-gradient">вашого зцілення</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Якщо ви тільки зайшли з відео чи марафону — вам не потрібна складна теорія. Оберіть одну з двох ключових точок входу, яка дає відчутний результат з першого дня.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Пункт №1: Родовий сеанс з ціленням */}
          <div className="card-zaverukha p-6 sm:p-8 flex flex-col justify-between border-2 border-[#C99A2C]/60 relative overflow-hidden group hover:border-[#C99A2C] transition-all shadow-lg hover:shadow-xl">
            <div className="absolute top-0 right-0 bg-[#C99A2C] text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider shadow">
              ★ Рекомендовано №1
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#B37E11] border border-amber-200">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#2E2B75] font-bold group-hover:text-[#3833BA] transition-colors">
                  {homepage.coldPoint1Title}
                </h3>
                <p className="text-xs text-[#B37E11] font-semibold mt-1">
                  {homepage.coldPoint1Subtitle}
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {homepage.coldPoint1Desc}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Не вимагає попередніх практик чи спеціальних знань</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Швидке зняття родових блоків та емоційної напруги</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-150 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Формат участі:</div>
                <div className="text-sm font-bold text-[#2E2B75]">Онлайн / запис</div>
              </div>
              <Link 
                href="/education/pipl"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                <span>Обрати сеанс</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Пункт №2: Мамина/Татова історія («Від гордині до гідності») */}
          <div className="card-zaverukha p-6 sm:p-8 flex flex-col justify-between border-2 border-[#2E2B75]/40 relative overflow-hidden group hover:border-[#2E2B75] transition-all shadow-lg hover:shadow-xl">
            <div className="absolute top-0 right-0 bg-[#2E2B75] text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider shadow">
              ★ Базовий крок №2
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#2E2B75] border border-indigo-200">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-[#2E2B75] font-bold group-hover:text-[#3833BA] transition-colors">
                  {homepage.coldPoint2Title}
                </h3>
                <p className="text-xs text-[#2E2B75] font-semibold mt-1">
                  {homepage.coldPoint2Subtitle}
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {homepage.coldPoint2Desc}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Трансформація дитячих образ та претензій до батьків</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Відкриття фінансового та ресурсного потоку</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-150 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Доступність:</div>
                <div className="text-sm font-bold text-[#B37E11]">Рекомендовано для старту</div>
              </div>
              <Link 
                href="/education/pipl"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-dark text-xs font-semibold uppercase tracking-wider shadow-md"
              >
                <span>Розпочати курс</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 4. РОЗДІЛ «ПРО МЕНЕ»: Автентичний блок із zaverukha.com з фото about-irina.png */}
      <section className="bg-[#F8F9FD] py-14 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2E2B75]/15 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white max-w-sm w-full group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/about-irina.png" 
                    alt="Ірина Заверуха - Про мене" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E2B75]/10 text-[#2E2B75] text-xs font-semibold uppercase tracking-wider">
                  <span>Сакральна біографія</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#2E2B75] font-bold">
                  Про мене
                </h2>
                <p className="text-base text-[#B37E11] font-serif font-medium">
                  З вами Провідник Нового часу, цілитель простору і енергій, голос душі Великої МА, метафізик, вчитель алхімії живого життя, наставниця для лідерів і наставників.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Працюю на квантовому рівні через інтеграцію простору серця та найчистішого цілительного потоку інтуїції, заземленого в матерії! Володію техніками родокорекції та спіральними PSY-I технологіями квантового переходу для гармонізації долі.
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link 
                    href="/satsang-divine-yoga"
                    className="px-6 py-2.5 rounded-xl btn-primary-dark text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md"
                  >
                    <span>Детальніше про місію</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link 
                    href="/creativity"
                    className="px-6 py-2.5 rounded-xl btn-outline-blue text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Моя творчість
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* 5. МОЇ КОНСУЛЬТАЦІЇ ТА КОНСУЛЬТАЦІЙНИЙ ЦЕНТР */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-zaverukha rounded-3xl p-6 sm:p-10 border border-[#2E2B75]/15 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[#996B08] text-xs font-semibold uppercase tracking-widest">
                <CalendarCheck className="w-3.5 h-3.5 text-[#B37E11]" />
                <span>Новий пункт меню</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2E2B75] font-bold">
                Консультаційний центр
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Працюю на квантовому рівні через інтеграцію простору серця та найчистішого цілительного потоку інтуїції. Надаю різні види консультацій під запити людей: космоеніопсихолога, бацзи діагноста, цілителя долі та духовного ментора.
              </p>

              {/* ДВА БЛОКИ ЗА ТЗ: Блок 1 - Калькулятор, Блок 2 - Опис центру */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center gap-2 text-[#B37E11] font-bold text-sm">
                    <Calculator className="w-4 h-4" />
                    <span>Блок 1: Калькулятор «Путь Душі»</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Миттєвий безкоштовний експрес-розрахунок вашого призначення та арканів сили.
                  </p>
                  <Link 
                    href="/calculator"
                    className="inline-block text-xs text-[#2E2B75] hover:text-[#B37E11] font-bold mt-2"
                  >
                    Розрахувати безкоштовно →
                  </Link>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200">
                  <div className="flex items-center gap-2 text-[#2E2B75] font-bold text-sm">
                    <Users className="w-4 h-4 text-[#2E2B75]" />
                    <span>Блок 2: Сертифіковані майстри</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Команда перевірених спеціалістів, випускників IMARIA Academia.
                  </p>
                  <Link 
                    href="/consultation-center"
                    className="inline-block text-xs text-[#2E2B75] hover:text-[#B37E11] font-bold mt-2"
                  >
                    Замовити консультацію →
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href="/consultation-center"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-primary-dark text-xs font-semibold uppercase tracking-wider shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Перейти до Консультаційного центру</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 max-w-sm w-full group">
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


      {/* 6. РОЗДІЛ «НАВЧАННЯ» — 2 НАПРЯМКИ РОЗВИТКУ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E2B75]/10 text-[#2E2B75] text-xs font-semibold uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#B37E11]" />
            <span>Архітектура входу за ТЗ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2E2B75] font-bold">
            Мої програми. <span className="gold-text-gradient">Навчання</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Замість нескінченного списку — рівно два зрозумілі напрямки. Оберіть свій шлях за 1 клік.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Напрямок 1: Екосистема PIPL */}
          <div className="card-zaverukha rounded-2xl overflow-hidden border border-slate-200 hover:border-[#C99A2C] transition-all flex flex-col justify-between shadow-lg group">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#B37E11] border border-amber-200">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#B37E11] font-bold px-2.5 py-1 rounded bg-amber-50 border border-amber-200">
                  Напрямок №1
                </span>
              </div>

              <h3 className="text-2xl font-serif text-[#2E2B75] font-bold group-hover:text-[#3833BA] transition-colors">
                Екосистема PIPL
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Програми для новачків та практиків. Робота над собою, гармонізація родових зв’язків, відновлення життєвого ресурсу та розвиток свідомості.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#B37E11] shrink-0" />
                  <span>Курс &laquo;Мамина історія / Татова історія&raquo; (Від гордині до гідності)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#B37E11] shrink-0" />
                  <span>&laquo;Сам собі цілитель&raquo; (3 фундаментальні лекції)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#B37E11] shrink-0" />
                  <span>Річна програма &laquo;КРИЛА&reg;&raquo; (самостійний бренд)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#B37E11] shrink-0" />
                  <span>Майстерня жіночих таїнств (Алхімікум, ініціації, кемпи)</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Для кожного, хто прагне змін</span>
              <Link 
                href="/education/pipl"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold text-xs font-semibold uppercase tracking-wider shadow"
              >
                <span>Увійти в PIPL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Напрямок 2: IMARIA Academia */}
          <div className="card-zaverukha rounded-2xl overflow-hidden border border-slate-200 hover:border-[#2E2B75] transition-all flex flex-col justify-between shadow-lg group">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#2E2B75] border border-indigo-200">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#2E2B75] font-bold px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200">
                  Напрямок №2
                </span>
              </div>

              <h3 className="text-2xl font-serif text-[#2E2B75] font-bold group-hover:text-[#3833BA] transition-colors">
                IMARIA Academia
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                Сертифікаційний простір для тих, хто обирає шлях професійного провідника, духовного ментора, вібраціолога або цілителя нового часу.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2E2B75] shrink-0" />
                  <span>Ступінь 1 / Ступінь 2 професійної підготовки</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2E2B75] shrink-0" />
                  <span>Методологія діагностики долі &laquo;Путь Душі&raquo; (Way of the Soul)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2E2B75] shrink-0" />
                  <span>Міжнародна сертифікація та акредитація практики</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2E2B75] shrink-0" />
                  <span>Вступ до реєстру майстрів Консультаційного центру</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-150 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Для майстрів та провідників</span>
              <Link 
                href="/education/academia"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary-dark text-xs font-semibold uppercase tracking-wider shadow"
              >
                <span>Вступити в Академію</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 7. ВІДКРИТІ ПРАКТИКУМИ СЛУЖІННЯ ТА МЕДИТАЦІЇ */}
      <section className="bg-[#F8F9FD] py-14 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Сатсанги.DivineYoga */}
            <div className="card-zaverukha rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-slate-200 mb-4 shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/satsang-banner.jpg" 
                    alt="Відкриті практикуми служіння" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif text-[#2E2B75] font-bold">
                  Відкриті практикуми служіння (Сатсанги)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Сатсанг — прямий канал, через який передається або приймається інформація. Це чистота потоку і можливість почути себе істинну. Унікальне УТП проєкту, відкрите для кожного.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-150 flex items-center justify-between">
                <span className="text-xs text-[#B37E11] font-bold">Безкоштовний доступ</span>
                <Link 
                  href="/satsang-divine-yoga"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl btn-gold text-xs font-semibold uppercase tracking-wider shadow"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Дивитись записи</span>
                </Link>
              </div>
            </div>

            {/* Медитації */}
            <div className="card-zaverukha rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-slate-200 mb-4 shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/meditations-banner.jpg" 
                    alt="Медитації Ірини Заверухи" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif text-[#2E2B75] font-bold">
                  Медитації та сакральні практики
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Майстерність медитації — це не лише напрацювання концентрації уваги. Це ще й розслаблення нервової системи, вміння бути стресостійким і жити в моменті. Обирай свою медитацію серцем!
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-150 flex items-center justify-between">
                <span className="text-xs text-[#2E2B75] font-bold">Аудіо & Відео</span>
                <Link 
                  href="/practices"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl btn-primary-dark text-xs font-semibold uppercase tracking-wider shadow"
                >
                  <span>Обрати медитацію</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 8. МОЯ ТВОРЧІСТЬ: БЕСІДИ З АНГЕЛАМИ ТА АРТЕФАКТИ СИЛИ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-zaverukha rounded-3xl p-6 sm:p-10 border border-[#2E2B75]/15 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[#996B08] text-xs font-semibold uppercase tracking-widest mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#B37E11]" />
              <span>Сакральні артефакти</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2E2B75] font-bold">
              Моя творчість
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Книга-цілитель &laquo;Бесіди з Ангелами&raquo;, сукня Берегині &laquo;Споріднені&raquo;, кулон &laquo;АВАТАР&raquo; та пісенний альбом.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 hover:border-[#C99A2C] transition-all hover:shadow-md">
              <div className="h-44 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/book.png" alt="Бесіди з Ангелами" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h4 className="font-serif text-base text-[#2E2B75] font-bold">Книга &laquo;Бесіди з Ангелами&raquo;</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Книга-цілитель прямого зв&apos;язку з духовними наставниками</p>
              <Link href="/creativity" className="inline-block text-xs text-[#2E2B75] hover:text-[#B37E11] font-bold">
                Детальніше →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 hover:border-[#C99A2C] transition-all hover:shadow-md">
              <div className="h-44 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/dress.png" alt="Сукня Споріднені" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h4 className="font-serif text-base text-[#2E2B75] font-bold">Сукня Берегині &laquo;Споріднені&raquo;</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Сакральний одяг-оберіг з натуральних тканин та вишивки</p>
              <Link href="/creativity" className="inline-block text-xs text-[#2E2B75] hover:text-[#B37E11] font-bold">
                Детальніше →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 hover:border-[#C99A2C] transition-all hover:shadow-md">
              <div className="h-44 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/creativity/amulet.png" alt="Кулон АВАТАР" className="max-h-full object-contain drop-shadow-xl" />
              </div>
              <h4 className="font-serif text-base text-[#2E2B75] font-bold">Кулон-оберіг &laquo;АВАТАР&raquo;</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Срібний сакральний знак для захисту та заземлення</p>
              <Link href="/creativity" className="inline-block text-xs text-[#2E2B75] hover:text-[#B37E11] font-bold">
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


      {/* 10. БЛОГ ТА НОВИНИ: З реальними статтями та зображеннями з zaverukha.com */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2E2B75] font-bold">
              Блог та Новини
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Свіжі роздуми, медійні інтерв&apos;ю та події простору IMARIA & PIPL
            </p>
          </div>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl btn-outline-blue text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <span>Всі публікації</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((article) => (
            <div key={article.slug} className="card-zaverukha rounded-2xl overflow-hidden border border-slate-200 hover:border-[#C99A2C] transition-all flex flex-col justify-between shadow-md hover:shadow-lg group">
              {article.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#2E2B75] text-[#F5DF7E] text-[10px] font-bold px-2.5 py-0.5 rounded shadow uppercase">
                    {article.category}
                  </span>
                </div>
              )}
              <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[11px] text-[#B37E11] font-bold">{article.date}</div>
                  <h3 className="font-serif text-base text-[#2E2B75] font-bold line-clamp-2 group-hover:text-[#3833BA] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-150">
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2E2B75] hover:text-[#B37E11] uppercase tracking-wider"
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
