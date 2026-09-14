'use client';

import React from 'react';
import Link from 'next/link';
import { 
  PhoneCall, 
  Send, 
  CreditCard, 
  Heart, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, TelegramIcon } from '@/components/ui/Icons';
import ConsultationForm from '@/components/forms/ConsultationForm';
import { useContent } from '@/context/ContentContext';

export default function ContactsPage() {
  const { content } = useContent();
  const { contacts } = content;
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest">
          <PhoneCall className="w-3.5 h-3.5 text-sacred-gold" />
          <span>Зв&apos;язок та реквізити</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold">
          Контакти і <span className="gold-text-gradient">реквізити</span>
        </h1>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          Офіційні канали комунікації з Іриною Заверухою та командою турботи простору IMARIA® & PIPL®.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Channels & Requisites */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* SOCIAL CHANNELS */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-sacred-gold/30 space-y-6">
            <h2 className="text-xl font-serif text-white font-semibold">
              Офіційні канали комунікації:
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <a
                href={contacts.telegramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-sacred-goldLight">Telegram IMARIA & PIPL</div>
                  <div className="text-xs text-white/60">@ZaverukhaIrina</div>
                </div>
              </a>

              <a
                href={contacts.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-sacred-goldLight">Instagram IMARIA</div>
                  <div className="text-xs text-white/60">@imaria_space</div>
                </div>
              </a>

              <a
                href={contacts.youtubeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <YoutubeIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-sacred-goldLight">YouTube канал</div>
                  <div className="text-xs text-white/60">Практики та лекції</div>
                </div>
              </a>

              <a
                href={contacts.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <FacebookIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-sacred-goldLight">Facebook сторінка</div>
                  <div className="text-xs text-white/60">Офіційна спільнота</div>
                </div>
              </a>

            </div>

            {/* Care Team Bot */}
            <div className="p-4 rounded-xl bg-sacred-blue/30 border border-sacred-gold/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-sacred-gold shrink-0" />
                <div className="text-xs text-white/80">
                  Виникли запитання щодо курсів або оплат? Напишіть у нашу Службу турботи.
                </div>
              </div>
              <a
                href={contacts.telegramBotSupportUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="sacred-gold-btn px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1"
              >
                <span>Чат-бот</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* OFFICIAL REQUISITES */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/15 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-white font-semibold">Офіційні реквізити для оплати</h2>
                <p className="text-xs text-white/60">Безготівковий розрахунок в Україні та світі</p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3 text-xs sm:text-sm font-mono text-white/90">
              <div>
                <span className="text-white/50 block font-sans text-xs">Отримувач:</span>
                <span className="font-semibold text-sacred-goldLight">{contacts.recipientName}</span>
              </div>
              <div>
                <span className="text-white/50 block font-sans text-xs">IBAN:</span>
                <span className="font-bold tracking-wider text-white">{contacts.iban}</span>
              </div>
              <div>
                <span className="text-white/50 block font-sans text-xs">ЄДРПОУ:</span>
                <span className="text-white">{contacts.edrpou}</span>
              </div>
              <div>
                <span className="text-white/50 block font-sans text-xs">Призначення платежу:</span>
                <span className="text-white/80">{contacts.purpose}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sacred-gold/15 border border-sacred-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-white/90">
                Оплата з будь-якої країни світу банківською карткою через систему <strong>WayForPay</strong>
              </div>
              <a
                href={contacts.wayForPayUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="sacred-gold-btn px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow"
              >
                <span>Перейти до оплати</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* СКАРБНИЧКА ЩЕДРОСТІ ТА ДОБРА */}
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-sacred-gold/30 bg-gradient-to-br from-sacred-night to-sacred-dark space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
                <Heart className="w-5 h-5 text-sacred-gold fill-sacred-gold/30" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-white font-semibold">«Скарбничка щедрості та добра»</h2>
                <p className="text-xs text-sacred-goldLight">Засіваємо кармічні зерна взаємодопомоги</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Скарбничка створена для того, щоб допомогти отримати сакральні знання кожній людині, яка цього щиро бажає, але наразі не має фінансової можливості оплатити повну вартість. 
              Будь-хто може поповнити банку довільною сумою, допомагаючи іншим розвиватися.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={contacts.monobankJarUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="sacred-gold-btn px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Поповнити Скарбничку в Monobank</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={contacts.monobankProjectUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="sacred-blue-btn px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>На розвиток проєкту PIPL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Feedback / Contact Form */}
        <div className="lg:col-span-5">
          <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-sacred-gold/40 shadow-xl sticky top-28">
            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-serif text-white font-semibold">
                Написати повідомлення
              </h3>
              <p className="text-xs text-white/70">
                Залиште ваші контакти для зв&apos;язку щодо будь-яких запитань або замовлення консультації.
              </p>
            </div>

            <ConsultationForm />
          </div>
        </div>

      </div>

    </div>
  );
}
