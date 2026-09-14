import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

export const metadata: Metadata = {
  title: 'Ірина Заверуха | Алхімія Живого Життя | IMARIA & PIPL',
  description: 'Персональний простір Ірини Заверухи. Сакральні знання, Екосистема PIPL, IMARIA Academia, безкоштовний калькулятор Путь Душі, Сатсанги та DivineYoga.',
  keywords: ['Ірина Заверуха', 'IMARIA', 'PIPL', 'Путь Душі', 'калькулятор', 'DivineYoga', 'сатсанги', 'цілительство', 'космоеніопсихологія', 'Алхімія живого життя'],
  openGraph: {
    title: 'Ірина Заверуха | Алхімія Живого Життя',
    description: 'Офіційний сайт-хаб Ірини Заверухи: навчання, калькулятор «Путь Душі», Сатсанги, DivineYoga, консультаційний центр.',
    url: 'https://zaverukha.com',
    siteName: 'Zaverukha.com',
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#28303d] font-sans antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
