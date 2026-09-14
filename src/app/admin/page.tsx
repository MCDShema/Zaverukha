'use client';

import React from 'react';
import Link from 'next/link';
import { useContent } from '@/context/ContentContext';
import { 
  FileText, 
  Layers, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Download, 
  CheckCircle2, 
  Clock, 
  Settings,
  CalendarCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { content, leads, exportJson } = useContent();

  const handleDownloadBackup = () => {
    const jsonStr = exportJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zaverukha_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="space-y-8">
      
      {/* WELCOME HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Вітаємо в системі керування сайтом
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Платформа <span className="text-sacred-goldLight font-medium">zaverukha.com</span> (IMARIA & PIPL)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadBackup}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-sacred-gold" />
            <span>Завантажити бекап (JSON)</span>
          </button>
          
          <Link
            href="/admin/articles"
            className="sacred-gold-btn px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Нова стаття</span>
          </Link>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1: Articles */}
        <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">Статті блогу</span>
            <div className="w-8 h-8 rounded-lg bg-sacred-gold/20 text-sacred-gold flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-white">
            {content.articles.length}
          </div>
          <p className="text-[11px] text-sacred-goldLight">Опубліковано та доступно на сайті</p>
        </div>

        {/* Card 2: Pages */}
        <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">Розділи сайту</span>
            <div className="w-8 h-8 rounded-lg bg-sacred-blue text-sacred-goldLight flex items-center justify-center border border-sacred-gold/30">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-white">
            7 сторінок
          </div>
          <p className="text-[11px] text-white/60">Головна, Навчання, Консульт, Творчість...</p>
        </div>

        {/* Card 3: Leads */}
        <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60 uppercase tracking-wider font-semibold">Заявки клієнтів</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-white flex items-center gap-2">
            <span>{leads.length}</span>
            {newLeadsCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-sans font-bold">
                +{newLeadsCount} нових
              </span>
            )}
          </div>
          <p className="text-[11px] text-emerald-300">Отримано через форми консультацій</p>
        </div>

      </div>

      {/* QUICK ACTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quick Page Editor */}
        <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-sacred-gold" />
            <span>Швидке редагування сторінок</span>
          </h2>
          <p className="text-xs text-white/70">
            Оновлюйте контент, ціни, банери, реквізити та посилання на соцмережі без програмування:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link href="/admin/pages?tab=homepage" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between">
              <span>Головна сторінка</span>
              <span>→</span>
            </Link>
            <Link href="/admin/pages?tab=education" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between">
              <span>Навчання (PIPL/IMARIA)</span>
              <span>→</span>
            </Link>
            <Link href="/admin/pages?tab=consultation" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between">
              <span>Консультаційний центр</span>
              <span>→</span>
            </Link>
            <Link href="/admin/pages?tab=contacts" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between">
              <span>Реквізити та Оплата</span>
              <span>→</span>
            </Link>
          </div>
          <div className="pt-2">
            <Link href="/admin/pages" className="text-xs font-semibold text-sacred-goldLight hover:underline">
              Відкрити повний редактор усіх сторінок →
            </Link>
          </div>
        </div>

        {/* Recent Inquiries Preview */}
        <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-sacred-gold" />
              <span>Останні заявки</span>
            </h2>
            <Link href="/admin/leads" className="text-xs text-sacred-goldLight hover:underline">
              Всі заявки ({leads.length})
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-8 text-xs text-white/50 bg-white/5 rounded-xl">
              Нових заявок наразі немає. Коли відвідувач заповнить форму консультації, вона з&apos;явиться тут.
            </div>
          ) : (
            <div className="space-y-2">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-3 rounded-xl bg-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{lead.name}</div>
                    <div className="text-white/60">{lead.phone} • {lead.email}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                      lead.status === 'new' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'
                    }`}>
                      {lead.status === 'new' ? 'Нова' : 'Оброблено'}
                    </span>
                    <div className="text-[10px] text-white/40 mt-0.5">{lead.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* RECENT ARTICLES */}
      <div className="sacred-card rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sacred-gold" />
            <span>Статті та публікації блогу</span>
          </h2>
          <Link href="/admin/articles" className="text-xs text-sacred-goldLight hover:underline">
            Керувати статтями →
          </Link>
        </div>

        <div className="divide-y divide-white/10">
          {content.articles.map((article) => (
            <div key={article.slug} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-[10px] text-sacred-gold font-semibold uppercase mr-2">{article.category}</span>
                <span className="text-white font-medium">{article.title}</span>
              </div>
              <div className="flex items-center gap-4 text-white/50 shrink-0">
                <span>{article.date}</span>
                <Link href="/admin/articles" className="text-sacred-goldLight hover:underline">
                  Редагувати
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
