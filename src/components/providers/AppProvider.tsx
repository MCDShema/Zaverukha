'use client';

import React from 'react';
import { ContentProvider } from '@/context/ContentContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <ContentProvider>
      {!isAdmin && <Header />}
      <main className={`flex-grow ${!isAdmin ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isAdmin && <Footer />}
    </ContentProvider>
  );
}
