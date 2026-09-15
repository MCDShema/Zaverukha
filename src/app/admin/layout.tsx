'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContent } from '@/context/ContentContext';
import { 
  LayoutDashboard, 
  FileText, 
  Palette,
  Layers, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink,
  Sparkles,
  ShieldAlert,
  Download
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, leads, dbStatus, refreshFromDb } = useContent();

  const isLoginPage = pathname === '/admin/login';

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoginPage && !isAuthenticated) {
      // Check session
      const auth = sessionStorage.getItem('zaverukha_admin_auth_v1');
      if (auth !== 'true') {
        router.push('/admin/login');
      }
    }
  }, [isAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Панель приладів', href: '/admin', icon: LayoutDashboard },
    { label: 'Статті блогу', href: '/admin/articles', icon: FileText },
    { label: 'Моя Творчість', href: '/admin/creativity', icon: Palette },
    { label: 'Редактор сторінок', href: '/admin/pages', icon: Layers },
    { 
      label: 'Заявки на консультацію', 
      href: '/admin/leads', 
      icon: Users,
      badge: leads.filter(l => l.status === 'new').length > 0 ? leads.filter(l => l.status === 'new').length : undefined
    },
    { label: 'Налаштування & Бекап', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="admin-layout min-h-screen bg-[#070611] text-slate-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#0e0c24] border-r border-sacred-gold/20 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sacred-gold text-sacred-dark flex items-center justify-center font-bold text-sm">
                ІЗ
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-white">Адмін-панель</div>
                <div className="text-[10px] text-sacred-gold uppercase tracking-wider">zaverukha.com</div>
              </div>
            </div>
            <Link 
              href="/" 
              target="_blank"
              title="Переглянути сайт"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active 
                      ? 'bg-sacred-gold text-sacred-dark font-bold shadow-md' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="text-[11px] text-white/60 px-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  dbStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 
                  dbStatus === 'syncing' ? 'bg-amber-400 animate-ping' : 
                  'bg-slate-400'
                }`} />
                <span className="text-white font-medium">
                  {dbStatus === 'connected' ? 'D1: Підключено' : dbStatus === 'syncing' ? 'D1: Синхронізація...' : 'D1: Автономний режим'}
                </span>
              </div>
              <button 
                onClick={() => refreshFromDb()} 
                title="Оновити з бази даних"
                className="text-[10px] text-sacred-gold hover:underline cursor-pointer"
              >
                Оновити
              </button>
            </div>
            <div>База даних: Cloudflare D1</div>
            <div>Хостинг: Cloudflare Pages</div>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/admin/login');
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Вийти з панелі</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-4 sm:p-8 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
