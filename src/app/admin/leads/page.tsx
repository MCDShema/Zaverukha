'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { 
  Users, 
  Search, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare,
  Filter
} from 'lucide-react';

export default function AdminLeadsPage() {
  const { leads, updateLeadStatus, deleteLead } = useContent();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted'>('all');

  const exportLeadsCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Ім\'я', 'Телефон', 'Email', 'Skype', 'Дата народження', 'Час', 'Місто', 'Повідомлення', 'Дата заявки', 'Статус'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.skype || ''}"`,
      `"${l.birthDate}"`,
      `"${l.birthTime || ''}"`,
      `"${l.birthCity || ''}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.createdAt}"`,
      `"${l.status}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zaverukha_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'all' ? true : lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-sacred-gold" />
            <span>Заявки на консультацію</span>
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Журнал відвідувачів, які надіслали запит через форми сайту
          </p>
        </div>

        {leads.length > 0 && (
          <button
            onClick={exportLeadsCsv}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-sacred-gold" />
            <span>Експортувати в Excel (CSV)</span>
          </button>
        )}
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Пошук за ім'ям, телефоном..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-sacred-gold rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-white/50 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Фільтр:</span>
          </span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === 'all' ? 'bg-white/20 text-white font-bold' : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            Всі ({leads.length})
          </button>
          <button
            onClick={() => setFilterStatus('new')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === 'new' ? 'bg-red-500/30 text-red-200 font-bold border border-red-500/40' : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            Нові ({leads.filter((l) => l.status === 'new').length})
          </button>
          <button
            onClick={() => setFilterStatus('contacted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterStatus === 'contacted' ? 'bg-green-500/30 text-green-200 font-bold border border-green-500/40' : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            Опрацьовані
          </button>
        </div>
      </div>

      {/* LEADS LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="sacred-card rounded-2xl p-12 text-center text-xs text-white/50 border border-white/10">
            Заявок не знайдено.
          </div>
        ) : (
          filtered.map((lead) => (
            <div
              key={lead.id}
              className={`sacred-card rounded-2xl p-6 border transition-all ${
                lead.status === 'new'
                  ? 'border-red-500/50 bg-red-950/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    lead.status === 'new' ? 'bg-red-500 text-white' : 'bg-sacred-blue text-sacred-goldLight'
                  }`}>
                    {lead.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-base font-serif font-semibold text-white">{lead.name}</div>
                    <div className="text-[11px] text-white/50 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{lead.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => updateLeadStatus(lead.id, lead.status === 'new' ? 'contacted' : 'new')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      lead.status === 'new'
                        ? 'bg-green-600/30 hover:bg-green-600/50 text-green-300 border border-green-500/40'
                        : 'bg-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{lead.status === 'new' ? 'Позначити як опрацьовано' : 'Повернути в нові'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Видалити заявку від ${lead.name}?`)) {
                        deleteLead(lead.id);
                      }
                    }}
                    title="Видалити"
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lead Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div className="space-y-1">
                  <div className="text-white/50 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sacred-gold" />
                    <span>Телефон:</span>
                  </div>
                  <a href={`tel:${lead.phone}`} className="font-semibold text-white hover:text-sacred-goldLight underline">
                    {lead.phone}
                  </a>
                </div>

                <div className="space-y-1">
                  <div className="text-white/50 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sacred-gold" />
                    <span>Email:</span>
                  </div>
                  <a href={`mailto:${lead.email}`} className="font-semibold text-white hover:text-sacred-goldLight underline">
                    {lead.email}
                  </a>
                </div>

                <div className="space-y-1">
                  <div className="text-white/50 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sacred-gold" />
                    <span>Дата народження:</span>
                  </div>
                  <div className="font-semibold text-white">
                    {lead.birthDate} {lead.birthTime ? `(${lead.birthTime})` : ''} {lead.birthCity ? `• ${lead.birthCity}` : ''}
                  </div>
                </div>
              </div>

              {lead.message && (
                <div className="mt-4 pt-3 border-t border-white/10 text-xs bg-black/20 p-3 rounded-xl">
                  <div className="text-white/50 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-sacred-gold" />
                    <span>Коментар або запит клієнта:</span>
                  </div>
                  <div className="text-white/90 leading-relaxed font-light">{lead.message}</div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
