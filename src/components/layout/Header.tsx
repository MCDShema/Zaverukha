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
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            
            {/* 1. Навчання (Dropdown: Екосистема PIPL / IMARIA Academia) */}
            <div 
              className="relative group"
              onMouseEnter={() => setEducationOpen(true)}
              onMouseLeave={() => setEducationOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 px-2.5 py-1.5 text-xs xl:text-sm font-light tracking-wide transition-colors ${
                  isActive('/education') 
                    ? 'text-white font-normal underline underline-offset-4 decoration-white/60' 
                    : 'text-white/90 hover:text-white'
                }`}
                aria-expanded={educationOpen}
              >
                <span>Навчання</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${educationOpen ? 'rotate-180 text-white' : 'text-white/70'}`} />
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute left-0 mt-1 w-64 rounded-xl bg-[#2E2B75] border border-white/20 shadow-2xl p-2 transition-all duration-200 origin-top-left ${
                  educationOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="px-3 py-1.5 text-[11px] font-medium text-white/60 tracking-wider uppercase border-b border-white/10 mb-1">
                  2 напрямки розвитку
                </div>
                
                <Link 
                  href="/education/pipl" 
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-colors group/item"
                >
                  <Compass className="w-4 h-4 text-white/80 mt-0.5" />
                  <div>
                    <div className="font-normal text-sm text-white">Екосистема PIPL</div>
                    <div className="text-xs text-white/60 font-light">Курси, марафони, клуб для новачків і практиків</div>
                  </div>
                </Link>

                <Link 
                  href="/education/academia" 
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-colors group/item"
                >
                  <GraduationCap className="w-4 h-4 text-white/80 mt-0.5" />
                  <div>
                    <div className="font-normal text-sm text-white">IMARIA Academia</div>
                    <div className="text-xs text-white/60 font-light">Сертифікація провідників, хілерів та менторів</div>
                  </div>
                </Link>
                
                <div className="mt-1 pt-1 border-t border-white/10">
                  <Link 
                    href="/education"
                    className="block text-center text-xs text-white/80 hover:text-white hover:underline py-1 font-light"
                  >
                    Огляд розділу «Навчання» →
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Моя творчість */}
            <Link 
              href="/creativity" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-light tracking-wide transition-colors ${
                isActive('/creativity') 
                  ? 'text-white font-normal underline underline-offset-4 decoration-white/60' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Моя творчість
            </Link>

            {/* 3. Сатсанги.DivineYoga (без бейджа УТП) */}
            <Link 
              href="/satsang-divine-yoga" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-light tracking-wide transition-colors ${
                isActive('/satsang-divine-yoga') 
                  ? 'text-white font-normal underline underline-offset-4 decoration-white/60' 
                  : 'text-white/90 hover:text-white'
              }`}
              title="Сатсанги та DivineYoga by IMARIA"
            >
              Сатсанги.DivineYoga
            </Link>

            {/* 4. Калькулятор (однаковий білий тонкий стиль) */}
            <Link 
              href="/calculator" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-light tracking-wide transition-colors ${
                isActive('/calculator')
                  ? 'text-white font-normal underline underline-offset-4 decoration-white/60'
                  : 'text-white/90 hover:text-white'
              }`}
              title="Калькулятор «Путь Душі» (Way of the Soul)"
            >
              Калькулятор
            </Link>

            {/* 5. Блог */}
            <Link 
              href="/blog" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-light tracking-wide transition-colors ${
                isActive('/blog') 
                  ? 'text-white font-normal underline underline-offset-4 decoration-white/60' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Блог
            </Link>

            {/* 6. Контакти і реквізити */}
            <Link 
              href="/contacts" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-light tracking-wide transition-colors ${
                isActive('/contacts') 
                  ? 'text-white font-normal underline underline-offset-4 decoration-white/60' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Контакти і реквізити
            </Link>

            {/* 7. Консультаційний центр (однаковий білий тонкий стиль як у всіх) */}
            <Link 
              href="/consultation-center" 
              className={`px-2.5 py-1.5 text-xs xl:text-sm font-light tracking-wide transition-colors ${
                isActive('/consultation-center')
                  ? 'text-white font-normal underline underline-offset-4 decoration-white/60'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Консультаційний центр
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
        <div className="lg:hidden bg-[#2E2B75] border-b border-white/15 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">

            {/* 1. Навчання (Mobile Accordion) */}
            <div className="border-b border-white/10 pb-2">
              <button
                onClick={() => setEducationOpen(!educationOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-light text-white hover:bg-white/5 rounded-lg"
              >
                <span>Навчання</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${educationOpen ? 'rotate-180 text-white' : 'text-white/60'}`} />
              </button>

              {educationOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-white/5 rounded-lg mt-1">
                  <Link
                    href="/education/pipl"
                    className="block py-2 px-3 text-sm text-white/90 hover:text-white font-light"
                  >
                    Екосистема PIPL (курси та клуб)
                  </Link>
                  <Link
                    href="/education/academia"
                    className="block py-2 px-3 text-sm text-white/90 hover:text-white font-light"
                  >
                    IMARIA Academia (сертифікація)
                  </Link>
                  <Link
                    href="/education"
                    className="block py-1.5 px-3 text-xs text-white/70 hover:text-white hover:underline font-light"
                  >
                    Огляд розділу Навчання →
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Моя творчість */}
            <Link
              href="/creativity"
              className="block px-3 py-2.5 text-base font-light text-white hover:bg-white/5 rounded-lg"
            >
              Моя творчість
            </Link>

            {/* 3. Сатсанги.DivineYoga (без УТП) */}
            <Link
              href="/satsang-divine-yoga"
              className="block px-3 py-2.5 text-base font-light text-white hover:bg-white/5 rounded-lg"
            >
              Сатсанги.DivineYoga
            </Link>

            {/* 4. Калькулятор (однаковий білий тонкий стиль) */}
            <Link
              href="/calculator"
              className="block px-3 py-2.5 text-base font-light text-white hover:bg-white/5 rounded-lg"
            >
              Калькулятор
            </Link>

            {/* 5. Блог */}
            <Link
              href="/blog"
              className="block px-3 py-2.5 text-base font-light text-white hover:bg-white/5 rounded-lg"
            >
              Блог
            </Link>

            {/* 6. Контакти і реквізити */}
            <Link
              href="/contacts"
              className="block px-3 py-2.5 text-base font-light text-white hover:bg-white/5 rounded-lg"
            >
              Контакти і реквізити
            </Link>

            {/* 7. Консультаційний центр (однаковий білий тонкий стиль) */}
            <Link
              href="/consultation-center"
              className="block px-3 py-2.5 text-base font-light text-white hover:bg-white/5 rounded-lg"
            >
              Консультаційний центр
            </Link>

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
