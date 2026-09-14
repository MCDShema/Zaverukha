'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoZaverukha, LogoImaria } from '@/components/ui/Logo';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Calculator, 
  Send, 
  BookOpen, 
  Compass,
  GraduationCap,
  CalendarCheck,
  PhoneCall,
  Search,
  Globe
} from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsOpen(false);
    setEducationOpen(false);
    setLangOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#2E2B75] shadow-lg border-b border-[#3833BA] py-2.5' 
        : 'bg-[#2E2B75] border-b border-[#3833BA]/50 py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* LOGOS (Exact authentic pair: Zaverukha + IMARIA) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <LogoZaverukha className="h-7 sm:h-8 md:h-9 w-auto" />
            <div className="hidden sm:block">
              <LogoImaria className="h-6 sm:h-7 md:h-8 w-auto" />
            </div>
          </div>

          {/* DESKTOP NAV (From left to right per TZ & Drawing:
              1. Навчання (з випадаючим: Екосистема PIPL, IMARIA Academia)
              2. Моя творчість
              3. Сатсанги.DivineYoga (Про мене)
              4. Калькулятор («Way of the Soul»)
              5. Блог
              6. Контакти і реквізити
              7. Консультаційний центр (CTA)
          ) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            
            {/* 1. Навчання (Dropdown: Екосистема PIPL / IMARIA Academia) */}
            <div 
              className="relative group"
              onMouseEnter={() => setEducationOpen(true)}
              onMouseLeave={() => setEducationOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-lg ${
                  isActive('/education') 
                    ? 'text-sacred-goldLight bg-white/10' 
                    : 'text-white/90 hover:text-white hover:bg-white/5'
                }`}
                aria-expanded={educationOpen}
              >
                <span>Навчання</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${educationOpen ? 'rotate-180 text-sacred-gold' : 'text-white/60'}`} />
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute left-0 mt-1 w-64 rounded-xl bg-sacred-night/95 backdrop-blur-xl border border-sacred-gold/30 shadow-2xl p-2 transition-all duration-200 origin-top-left ${
                  educationOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-sacred-gold tracking-wider uppercase border-b border-white/10 mb-1">
                  2 напрямки розвитку
                </div>
                
                <Link 
                  href="/education/pipl" 
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-sacred-blue/40 text-white/90 hover:text-white transition-colors group/item"
                >
                  <Compass className="w-5 h-5 text-sacred-gold mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <div>
                    <div className="font-medium text-sm text-white">Екосистема PIPL</div>
                    <div className="text-xs text-white/60">Курси, марафони, клуб для новачків і практиків</div>
                  </div>
                </Link>

                <Link 
                  href="/education/academia" 
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-sacred-blue/40 text-white/90 hover:text-white transition-colors group/item"
                >
                  <GraduationCap className="w-5 h-5 text-sacred-goldLight mt-0.5 group-hover/item:scale-110 transition-transform" />
                  <div>
                    <div className="font-medium text-sm text-white">IMARIA Academia</div>
                    <div className="text-xs text-white/60">Сертифікація провідників, хілерів та менторів</div>
                  </div>
                </Link>
                
                <div className="mt-1 pt-1 border-t border-white/10">
                  <Link 
                    href="/education"
                    className="block text-center text-xs text-sacred-goldLight hover:underline py-1"
                  >
                    Огляд розділу «Навчання» →
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Моя творчість */}
            <Link 
              href="/creativity" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-lg ${
                isActive('/creativity') 
                  ? 'text-sacred-goldLight bg-white/10' 
                  : 'text-white/90 hover:text-white hover:bg-white/5'
              }`}
            >
              Моя творчість
            </Link>

            {/* 3. Про мене (Сатсанги.DivineYoga) */}
            <Link 
              href="/satsang-divine-yoga" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${
                isActive('/satsang-divine-yoga') 
                  ? 'text-sacred-goldLight bg-white/10' 
                  : 'text-white/90 hover:text-white hover:bg-white/5'
              }`}
              title="Сатсанги та DivineYoga by IMARIA"
            >
              <span>Сатсанги.DivineYoga</span>
              <span className="text-[9px] bg-sacred-gold/20 text-sacred-goldLight px-1 rounded font-normal border border-sacred-gold/30">
                УТП
              </span>
            </Link>

            {/* 4. Калькулятор («Way of the Soul» / «Путь Душі») — Accent Badge */}
            <Link 
              href="/calculator" 
              className={`relative px-3 py-1.5 text-xs xl:text-sm font-semibold transition-all rounded-lg flex items-center gap-1.5 ${
                isActive('/calculator')
                  ? 'bg-gradient-to-r from-sacred-gold to-sacred-goldHover text-sacred-dark shadow-md shadow-sacred-gold/25 font-bold'
                  : 'text-sacred-goldLight bg-sacred-gold/20 hover:bg-sacred-gold/30 border border-sacred-gold/50 hover:border-sacred-gold shadow-sm'
              }`}
              title="Калькулятор «Путь Душі» (Way of the Soul)"
            >
              <Calculator className="w-3.5 h-3.5 text-sacred-goldLight" />
              <span>Калькулятор</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sacred-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sacred-goldLight"></span>
              </span>
            </Link>

            {/* 5. Блог */}
            <Link 
              href="/blog" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-lg ${
                isActive('/blog') 
                  ? 'text-sacred-goldLight bg-white/10' 
                  : 'text-white/90 hover:text-white hover:bg-white/5'
              }`}
            >
              Блог
            </Link>

            {/* 6. Контакти і реквізити */}
            <Link 
              href="/contacts" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-lg ${
                isActive('/contacts') 
                  ? 'text-sacred-goldLight bg-white/10' 
                  : 'text-white/90 hover:text-white hover:bg-white/5'
              }`}
            >
              Контакти і реквізити
            </Link>

            {/* 7. Консультаційний центр (CTA Button) */}
            <Link 
              href="/consultation-center" 
              className="ml-1 xl:ml-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider btn-gold shadow-md hover:scale-105 transition-all"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#0E0C24]" />
              <span>Консультаційний центр</span>
            </Link>

          </nav>

          {/* RIGHT UTILITIES: Search + Language switcher */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-white/15">
            {/* Search Toggle */}
            <div className="relative">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Пошук по сайту"
                aria-label="Пошук"
              >
                <Search className="w-4 h-4" />
              </button>
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-72 p-2 bg-sacred-night/95 backdrop-blur-xl border border-sacred-gold/30 rounded-xl shadow-2xl">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      window.location.href = `/blog?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }} className="flex items-center gap-1.5">
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Пошук статей, курсів..."
                      className="w-full px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sacred-gold"
                      autoFocus
                    />
                    <button type="submit" className="p-1.5 bg-sacred-gold text-sacred-dark rounded-lg font-medium text-xs hover:bg-sacred-goldLight">
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg border border-white/20"
                aria-label="Мова сайту"
              >
                <Globe className="w-3.5 h-3.5 text-sacred-gold" />
                <span>UA</span>
                <ChevronDown className="w-3 h-3 text-white/60" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-24 py-1 bg-sacred-night/95 backdrop-blur-xl border border-sacred-gold/30 rounded-lg shadow-xl text-xs">
                  <button className="w-full text-left px-3 py-1.5 text-sacred-gold font-bold hover:bg-white/10 flex items-center justify-between">
                    <span>UA</span>
                    <span className="text-[10px]">✓</span>
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-white/70 hover:text-white hover:bg-white/10">
                    EN
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link 
              href="/calculator" 
              className="p-1.5 bg-sacred-gold/25 text-sacred-goldLight border border-sacred-gold/50 rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="text-[11px]">Калькулятор</span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Перемикач меню"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden bg-sacred-dark/98 backdrop-blur-2xl border-b border-sacred-gold/30 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">

            {/* 1. Навчання (Mobile Accordion) */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => setEducationOpen(!educationOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-white hover:bg-white/5 rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-sacred-gold" />
                  <span>Навчання</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${educationOpen ? 'rotate-180 text-sacred-gold' : 'text-white/60'}`} />
              </button>

              {educationOpen && (
                <div className="pl-6 pr-2 py-1 space-y-1 bg-white/5 rounded-lg mt-1">
                  <Link
                    href="/education/pipl"
                    className="block py-2 px-3 text-sm text-white/90 hover:text-sacred-goldLight font-medium"
                  >
                    ✦ Екосистема PIPL (курси та клуб)
                  </Link>
                  <Link
                    href="/education/academia"
                    className="block py-2 px-3 text-sm text-white/90 hover:text-sacred-goldLight font-medium"
                  >
                    ✦ IMARIA Academia (сертифікація)
                  </Link>
                  <Link
                    href="/education"
                    className="block py-1.5 px-3 text-xs text-sacred-gold hover:underline"
                  >
                    Огляд розділу Навчання →
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Моя творчість */}
            <Link
              href="/creativity"
              className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-white hover:bg-white/5 rounded-lg"
            >
              <BookOpen className="w-5 h-5 text-sacred-gold" />
              <span>Моя творчість</span>
            </Link>

            {/* 3. Про мене (Сатсанги.DivineYoga) */}
            <Link
              href="/satsang-divine-yoga"
              className="flex items-center justify-between px-3 py-2.5 text-base font-medium text-white hover:bg-white/5 rounded-lg"
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-sacred-gold" />
                <span>Сатсанги.DivineYoga</span>
              </span>
              <span className="text-[10px] bg-sacred-gold/20 text-sacred-goldLight px-2 py-0.5 rounded border border-sacred-gold/30">
                УТП
              </span>
            </Link>

            {/* 4. Калькулятор «Путь Душі» */}
            <Link
              href="/calculator"
              className="flex items-center justify-between px-3 py-2.5 text-base font-semibold bg-sacred-gold/20 text-sacred-goldLight border border-sacred-gold/50 rounded-lg"
            >
              <span className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-sacred-gold" />
                <span>Калькулятор «Путь Душі»</span>
              </span>
              <span className="text-xs bg-sacred-gold text-sacred-dark font-bold px-2 py-0.5 rounded">
                FREE
              </span>
            </Link>

            {/* 5. Блог */}
            <Link
              href="/blog"
              className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-white hover:bg-white/5 rounded-lg"
            >
              <Send className="w-5 h-5 text-sacred-gold" />
              <span>Блог</span>
            </Link>

            {/* 6. Контакти і реквізити */}
            <Link
              href="/contacts"
              className="flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-white hover:bg-white/5 rounded-lg"
            >
              <PhoneCall className="w-5 h-5 text-sacred-gold" />
              <span>Контакти і реквізити</span>
            </Link>

            {/* 7. Консультаційний центр */}
            <div className="pt-3">
              <Link
                href="/consultation-center"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-sacred-blue via-sacred-indigo to-sacred-blue border border-sacred-gold/50 shadow-lg"
              >
                <CalendarCheck className="w-4 h-4 text-sacred-gold" />
                <span>Консультаційний центр</span>
              </Link>
            </div>

            {/* Language Switcher Mobile */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between px-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sacred-gold" />
                <span>Мова:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-sacred-gold text-sacred-dark font-bold text-xs">UA</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/60 text-xs">EN</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
