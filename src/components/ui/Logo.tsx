import React from 'react';
import Link from 'next/link';

export function LogoZaverukha({ className = "h-8 sm:h-9 md:h-10 w-auto" }: { className?: string; variant?: "light" | "gold" | "dark" }) {
  return (
    <Link href="/" className="flex items-center group focus:outline-none shrink-0" aria-label="Головна сторінка Ірина Заверуха">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/images/logos/logo_zaverukha_white.svg" 
        alt="Заверуха - Алхімія Живого Життя" 
        className={`${className} object-contain transition-transform group-hover:scale-[1.02]`}
      />
    </Link>
  );
}

export function LogoImaria({ className = "h-7 sm:h-8 md:h-9 w-auto" }: { className?: string }) {
  return (
    <Link href="/education/academia" className="flex items-center group focus:outline-none shrink-0 pl-2 sm:pl-3 border-l border-white/20" aria-label="IMARIA Academia">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/images/logos/logo_imaria_white.svg" 
        alt="IMARIA Academia" 
        className={`${className} object-contain transition-transform group-hover:scale-[1.02]`}
      />
    </Link>
  );
}
