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
  Trees, 
  CalendarCheck,
  Star,
  Award
} from 'lucide-react';
import SoulPathCalculator from '@/components/calculator/SoulPathCalculator';
import { useContent } from '@/context/ContentContext';

export default function HomePage() {
  const { content } = useContent();
  const { homepage } = content;
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION & ПРО МЕНЕ */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 sacred-gradient-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Main Presentation */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Простір Алхімії Живого Життя</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {homepage.heroTitle}
              </h1>

              <p className="text-lg sm:text-xl font-serif text-sacred-goldLight font-medium">
                {homepage.heroSubtitle}
              </p>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {homepage.heroDescription}
              </p>

              {/* Quick Regalia Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sacred-gold font-bold text-base sm:text-lg">{homepage.statConsultations}</div>
                  <div className="text-[11px] text-white/60">Проконсультованих осіб</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sacred-gold font-bold text-base sm:text-lg">{homepage.statProtocols}</div>
                  <div className="text-[11px] text-white/60">Трансформаційних протоколів</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <div className="text-sacred-gold font-bold text-base sm:text-lg">{homepage.statYears}</div>
                  <div className="text-[11px] text-white/60">Прямої родової передачі</div>
                </div>
              </div>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <Link 
                  href="/consultation-center"
                  className="w-full sm:w-auto px-8 py-4 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
                >
                  <CalendarCheck className="w-4 h-4 text-sacred-dark" />
                  <span>Консультаційний центр</span>
                </Link>

                <Link 
                  href="/calculator"
                  className="w-full sm:w-auto px-8 py-4 rounded-full sacred-blue-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-sacred-gold" />
                  <span>Безкоштовний калькулятор</span>
                </Link>
              </div>

            </div>

            {/* Right Col: Portrait Card & Awards */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-sacred-gold/30 to-sacred-blue/40 rounded-3xl blur-2xl -z-10" />
                
                <div className="sacred-card rounded-3xl p-6 border-2 border-sacred-gold/40 relative text-center space-y-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-tr from-sacred-gold to-sacred-blue p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-sacred-dark flex items-center justify-center overflow-hidden relative">
                      <div className="text-4xl sm:text-5xl font-serif text-sacred-gold">ІЗ</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-serif text-white font-semibold">Ірина Заверуха</h3>
                    <p className="text-xs text-sacred-goldLight mt-0.5">Вчитель Йоги Свідомості (#Divineyoga)</p>
                  </div>

                  <p className="text-xs text-white/70 italic leading-relaxed">
                    {homepage.quote}
                  </p>

                  <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-sacred-gold shrink-0" />
                      <span>Орден Королеви Анни</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-sacred-gold shrink-0" />
                      <span>Орден Святої Софії</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. ХОЛОДНА ВОРОНКА ДЛЯ НОВАЧКІВ (КРИТИЧНО ЗА ТЗ: ПУНКТИ 1 ТА 2 НА ПЕРШОМУ ПЛАНІ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Вперше тут? З чого розпочати</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold">
            Прості та потужні кроки для <span className="gold-text-gradient">вашого зцілення</span>
          </h2>
          <p className="text-sm text-white/70 mt-2">
            Якщо ви тільки зайшли з відео чи марафону — вам не потрібна складна теорія. Оберіть одну з двох ключових точок входу, яка дає відчутний результат з першого дня.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Пункт №1: Родовий сеанс з ціленням */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border-2 border-sacred-gold/60 relative overflow-hidden flex flex-col justify-between group hover:border-sacred-gold transition-all shadow-xl bg-gradient-to-br from-sacred-night/80 via-sacred-dark to-sacred-blue/20">
            <div className="absolute top-4 right-4">
              <span className="bg-sacred-gold text-sacred-dark text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                ★ Точка входу №1
              </span>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-white font-semibold">
                  {homepage.coldPoint1Title}
                </h3>
                <p className="text-xs text-sacred-goldLight mt-1 font-medium">
                  {homepage.coldPoint1Subtitle}
                </p>
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                {homepage.coldPoint1Desc}
              </p>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold shrink-0" />
                  <span>Відчуття захисту та родинної підтримки</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold shrink-0" />
                  <span>Квантова трансформація заземлена в матерії</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-white/50 block">Формат:</span>
                <span className="text-sm font-semibold text-white">Індивідуально / Онлайн</span>
              </div>
              <Link
                href="/consultation-center"
                className="sacred-gold-btn px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
              >
                <span>Записатися на сеанс</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Пункт №2: Стосунки з мамою / Стосунки з татом */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border-2 border-sacred-gold/60 relative overflow-hidden flex flex-col justify-between group hover:border-sacred-gold transition-all shadow-xl bg-gradient-to-br from-sacred-night/80 via-sacred-dark to-sacred-blue/20">
            <div className="absolute top-4 right-4">
              <span className="bg-sacred-gold text-sacred-dark text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                ★ Точка входу №2
              </span>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sacred-blue text-sacred-goldLight flex items-center justify-center border border-sacred-gold/30">
                <Heart className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-serif text-white font-semibold">
                  {homepage.coldPoint2Title}
                </h3>
                <p className="text-xs text-sacred-goldLight mt-1 font-medium">
                  {homepage.coldPoint2Subtitle}
                </p>
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                {homepage.coldPoint2Desc}
              </p>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold shrink-0" />
                  <span>Відкриття фінансового потоку через маму</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold shrink-0" />
                  <span>Відновлення опори та впевненості через тата</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-white/50 block">Доступність:</span>
                <span className="text-sm font-semibold text-sacred-goldLight">Курс у записі</span>
              </div>
              <Link
                href="/education/pipl#hordyni"
                className="sacred-gold-btn px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
              >
                <span>Пройти курс</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Бейджі доступних продуктів (ПЛАП, Сам собі цілитель) */}
        <div className="mt-8 p-4 rounded-xl bg-sacred-gold/10 border border-sacred-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-sacred-gold text-sacred-dark text-xs font-bold uppercase">
              Доступно кожному
            </span>
            <span className="text-xs sm:text-sm text-white/90">
              Почніть з доступних практикумів: <strong className="text-sacred-goldLight">«ПЛАП»</strong> або <strong className="text-sacred-goldLight">«Сам собі цілитель»</strong> (3 фундаментальні лекції)
            </span>
          </div>
          <Link
            href="/practices"
            className="text-xs font-semibold text-sacred-goldLight hover:text-white underline flex items-center gap-1 shrink-0"
          >
            <span>Переглянути практикуми</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>


      {/* 3. ДВА НАПРЯМКИ НАВЧАННЯ (ЕКОСИСТЕМА PIPL vs IMARIA ACADEMIA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Нова структура навчання</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold">
            Оберіть свій рівень у <span className="gold-text-gradient">2 напрямках</span>
          </h2>
          <p className="text-sm text-white/70 mt-2">
            Ми спростили структуру навчання, щоб ви за один клік знайшли саме ту програму, яка відповідає вашому етапу.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. Екосистема PIPL */}
          <div className="sacred-card rounded-2xl p-8 border border-sacred-gold/30 hover:border-sacred-gold transition-all relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-sacred-blue/50 border border-sacred-gold/30 flex items-center justify-center text-sacred-gold">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider bg-sacred-gold/15 px-3 py-1 rounded-full">
                  Для новачків & практиків
                </span>
              </div>

              <h3 className="text-2xl font-serif text-white font-semibold">
                Екосистема PIPL®
              </h3>
              
              <p className="text-sm text-white/80 leading-relaxed">
                Простір самопізнання, духовного зростання та якісного живого життя. Базові та поглиблені курси для гармонізації долі, здоров&apos;я, стосунків і фінансів.
              </p>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold" />
                  <span>«Сам собі цілитель» — перші кроки самовідновлення</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold" />
                  <span>Курс «Від гордині до гідності» (Мама/Тато)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold" />
                  <span>Річна трансформаційна жіноча програма «КРИЛА®»</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold" />
                  <span>Майстерня жіночих таїнств (Алхімікум, ініціації)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-gold" />
                  <span>PIPL Club — щотижневі підтримуючі ефіри</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <Link
                href="/education/pipl"
                className="w-full py-3.5 rounded-xl sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
              >
                <span>Увійти в Екосистему PIPL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. IMARIA Academia */}
          <div className="sacred-card rounded-2xl p-8 border border-sacred-gold/30 hover:border-sacred-gold transition-all relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-sacred-blue/50 border border-sacred-gold/30 flex items-center justify-center text-sacred-goldLight">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-sacred-goldLight uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                  Професійна кваліфікація
                </span>
              </div>

              <h3 className="text-2xl font-serif text-white font-semibold">
                IMARIA Academia®
              </h3>
              
              <p className="text-sm text-white/80 leading-relaxed">
                Сертифікаційний простір для тих, хто обрав шлях служіння: професійних хілерів, духовних менторів, вібраціологів та організаторів ретритів Нового часу.
              </p>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-goldLight" />
                  <span>Ступінь 1 та Ступінь 2 академічного навчання</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-goldLight" />
                  <span>Тренерський курс «Путь Душі» (Way of the Soul)®</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-goldLight" />
                  <span>Пряма передача цілительських родових протоколів</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sacred-goldLight" />
                  <span>Сертифікація та вхід у команду Консультаційного центру</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <Link
                href="/education/academia"
                className="w-full py-3.5 rounded-xl sacred-blue-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Дізнатися про IMARIA Academia</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>


      {/* 4. ІНТЕРАКТИВНИЙ КАЛЬКУЛЯТОР «ПУТЬ ДУШІ» */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SoulPathCalculator />
      </section>


      {/* 5. САКРАЛЬНИЙ РОЗДІЛ «САТСАНГИ & DIVINEYOGA» (УТП) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-card rounded-3xl p-8 sm:p-12 border-2 border-sacred-gold/40 relative overflow-hidden bg-gradient-to-r from-sacred-night via-sacred-dark to-sacred-blue/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/20 text-sacred-goldLight text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Унікальна пропозиція (УТП)</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-white font-semibold">
                Сатсанги та <span className="gold-text-gradient">DivineYoga</span>
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Практики служіння та чистого потоку. Сатсанг — це прямий канал, через який ви чуєте себе істинну без шуму соціуму. Дивань-йога (DivineYoga) — унікальна технологія відновлення енергоструктури тіла та свідомості, доступна абсолютно безкоштовно.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sacred-gold font-bold text-sm">Безкоштовний доступ</div>
                  <div className="text-xs text-white/60">До відкритих занять йоги</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sacred-gold font-bold text-sm">Живі Сатсанги</div>
                  <div className="text-xs text-white/60">Прямі ефіри відповідей</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sacred-gold font-bold text-sm">Медитації сили</div>
                  <div className="text-xs text-white/60">Зцілення нервової системи</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
              <Link
                href="/satsang-divine-yoga"
                className="w-full sm:w-auto px-8 py-4 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all text-center"
              >
                <Play className="w-4 h-4 text-sacred-dark fill-sacred-dark" />
                <span>Перейти до практик та відео</span>
              </Link>
              <p className="text-[11px] text-white/50 text-center">
                Відкритий доступ до YouTube плейлистів та найближчих марафонів
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* 6. КОНСУЛЬТАЦІЙНИЙ ЦЕНТР */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sacred-card rounded-2xl p-8 sm:p-10 border border-sacred-gold/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-semibold text-sacred-gold uppercase tracking-wider">
                Сертифікований комерційний напрямок
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
                Консультаційний центр Ірини Заверухи
              </h2>
              <p className="text-sm text-white/80 leading-relaxed">
                Індивідуальна робота з сертифікованими майстрами: космоеніопсихологами, бацзи-діагностами, цілителями долі та духовними наставниками. 
                Квантові технології гармонізації для здоров&apos;я, сім&apos;ї та бізнесу.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/consultation-center"
                className="w-full py-3.5 px-6 rounded-full sacred-gold-btn text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow"
              >
                <CalendarCheck className="w-4 h-4 text-sacred-dark" />
                <span>Замовити консультацію</span>
              </Link>
              <Link
                href="/calculator"
                className="w-full py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5 text-sacred-gold" />
                <span>Калькулятор «Путь Душі»</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 7. ОСТАННІ НОВИНИ ТА ПУБЛІКАЦІЇ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
              Блог та актуальні події
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Діалоги про духовну логіку, новини та медійні прем&apos;єри
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold text-sacred-goldLight hover:underline flex items-center gap-1"
          >
            <span>Всі публікації</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Article 1: Viva! */}
          <div className="sacred-card rounded-xl p-5 border border-white/10 flex flex-col justify-between hover:border-sacred-gold/40 transition-all">
            <div className="space-y-3">
              <span className="text-[11px] text-sacred-gold font-medium">Новини • Вересень 2026</span>
              <h3 className="text-base font-serif text-white font-medium leading-snug">
                «Неможливо знайти те, що ніколи не губилося»: велике інтерв’ю Ірини Заверухи для Viva!
              </h3>
              <p className="text-xs text-white/70 line-clamp-3">
                Ексклюзивна розмова з духовною майстринею про квантовий перехід, жіночу силу Берегині та місію в Нову епоху.
              </p>
            </div>
            <Link href="/blog/viva-interview" className="pt-4 text-xs font-semibold text-sacred-goldLight hover:underline inline-block">
              Читати далі →
            </Link>
          </div>

          {/* Article 2: Ліси */}
          <div className="sacred-card rounded-xl p-5 border border-white/10 flex flex-col justify-between hover:border-sacred-gold/40 transition-all">
            <div className="space-y-3">
              <span className="text-[11px] text-sacred-gold font-medium">Соціальна місія</span>
              <h3 className="text-base font-serif text-white font-medium leading-snug">
                «…Іншої планети у нас немає…»: висаджуємо черговий ліс
              </h3>
              <p className="text-xs text-white/70 line-clamp-3">
                Вкорінюємо життя на рідній землі! Спільна висадка дерев командою PIPL Club та збереження екосистеми України.
              </p>
            </div>
            <Link href="/blog/forest-planting" className="pt-4 text-xs font-semibold text-sacred-goldLight hover:underline inline-block">
              Читати далі →
            </Link>
          </div>

          {/* Article 3: SHAMANKA */}
          <div className="sacred-card rounded-xl p-5 border border-white/10 flex flex-col justify-between hover:border-sacred-gold/40 transition-all">
            <div className="space-y-3">
              <span className="text-[11px] text-sacred-gold font-medium">Творчість & Музика</span>
              <h3 className="text-base font-serif text-white font-medium leading-snug">
                Нова версія «Балади Берегині» — SHAMANKA by IMARIA
              </h3>
              <p className="text-xs text-white/70 line-clamp-3">
                Танцюй. Відчувай. Зцілюйся. Реміксова версія пробуджує родову силу в ритмі космічно-земного імпульсу.
              </p>
            </div>
            <Link href="/creativity" className="pt-4 text-xs font-semibold text-sacred-goldLight hover:underline inline-block">
              Слухати трек →
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
