'use client';

import React from 'react';
import Link from 'next/link';
import { LogoZaverukha, LogoImaria } from '@/components/ui/Logo';
import { Heart, Send, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, TelegramIcon } from '@/components/ui/Icons';
import { useContent } from '@/context/ContentContext';

export default function Footer() {
  const { content } = useContent();
  const { contacts } = content;

  return (
    <footer className="bg-sacred-dark text-white/80 border-t border-sacred-gold/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Pulsar */}
          <div className="lg:col-span-2 space-y-4">
            <LogoZaverukha />
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Простір багатовимірного розвитку та Алхімії Живого Життя. 
              Проєкти <strong className="text-white">IMARIA®</strong> та <strong className="text-white">PIPL®</strong> — простір квантового зцілення, еволюції свідомості та пізнання законів Всесвіту.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-sacred-gold font-semibold block mb-2">
                Стежте в соцмережах:
              </span>
              <div className="flex items-center gap-3">
                <a 
                  href={contacts.telegramUrl} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-sacred-blue text-white flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                  aria-label="Telegram"
                >
                  <TelegramIcon className="w-4 h-4 text-sacred-gold" />
                </a>
                <a 
                  href={contacts.instagramUrl} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-600/40 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-sacred-gold" />
                </a>
                <a 
                  href={contacts.youtubeUrl} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600/40 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4 text-sacred-gold" />
                </a>
                <a 
                  href={contacts.facebookUrl} 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600/40 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/10"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 text-sacred-gold" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Навчання */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-sacred-gold uppercase tracking-wider">
              Навчання
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/education/pipl" className="hover:text-sacred-goldLight transition-colors">
                  Екосистема PIPL
                </Link>
              </li>
              <li>
                <Link href="/education/academia" className="hover:text-sacred-goldLight transition-colors">
                  IMARIA Academia
                </Link>
              </li>
              <li>
                <Link href="/education/pipl#hordyni" className="hover:text-sacred-goldLight transition-colors">
                  «Від гордині до гідності»
                </Link>
              </li>
              <li>
                <Link href="/education/pipl#healer" className="hover:text-sacred-goldLight transition-colors">
                  «Сам собі цілитель»
                </Link>
              </li>
              <li>
                <Link href="/education/pipl#kryla" className="hover:text-sacred-goldLight transition-colors">
                  Річна програма «КРИЛА®»
                </Link>
              </li>
              <li>
                <Link href="/education/pipl#mysteries" className="hover:text-sacred-goldLight transition-colors">
                  Майстерня жіночих таїнств
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Проєкти та Сервіси */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-sacred-gold uppercase tracking-wider">
              Сервіси & Творчість
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculator" className="hover:text-sacred-goldLight transition-colors flex items-center gap-1">
                  <span>Калькулятор «Путь Душі»</span>
                  <span className="text-[10px] bg-sacred-gold/20 text-sacred-gold px-1 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/consultation-center" className="hover:text-sacred-goldLight transition-colors">
                  Консультаційний центр
                </Link>
              </li>
              <li>
                <Link href="/satsang-divine-yoga" className="hover:text-sacred-goldLight transition-colors">
                  Сатсанги & DivineYoga
                </Link>
              </li>
              <li>
                <Link href="/creativity" className="hover:text-sacred-goldLight transition-colors">
                  Книги та Артефакти
                </Link>
              </li>
              <li>
                <Link href="/practices" className="hover:text-sacred-goldLight transition-colors">
                  Практикуми & ПЛАП
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-sacred-goldLight transition-colors">
                  Блог та Новини
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Скарбничка & Підтримка */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-sacred-gold uppercase tracking-wider">
              Добро & Турбота
            </h3>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sacred-goldLight">
                <Heart className="w-4 h-4 text-sacred-gold fill-sacred-gold/20" />
                <span>Скарбничка щедрості</span>
              </div>
              <p className="text-xs text-white/60">
                Допомога тим, хто потребує знань, але не має повної фінансової можливості.
              </p>
              <a 
                href={contacts.monobankJarUrl} 
                target="_blank" 
                rel="noreferrer noopener"
                className="inline-block text-xs text-sacred-gold font-medium hover:underline"
              >
                Поповнити банку Monobank →
              </a>
            </div>

            <div className="pt-1">
              <a 
                href={contacts.telegramBotSupportUrl} 
                target="_blank" 
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-xs text-white/80 hover:text-white bg-sacred-blue/30 px-3 py-2 rounded-lg border border-sacred-blue/50 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-sacred-gold" />
                <span>Команда турботи Pipl (Бот)</span>
              </a>
            </div>
          </div>

        </div>

        {/* REQUISITES & COPYRIGHT */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            <p>
              {contacts.recipientName} | ЄДРПОУ: {contacts.edrpou}
            </p>
            <p className="mt-0.5">
              Рахунок: {contacts.iban}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={contacts.wayForPayUrl} 
              target="_blank" 
              rel="noreferrer noopener"
              className="text-sacred-goldLight hover:underline"
            >
              Оплата через WayForPay (Світ)
            </a>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:underline">
              Політика конфіденційності
            </Link>
            <span>•</span>
            <span>© {new Date().getFullYear()} Zaverukha.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
