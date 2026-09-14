import React from 'react';
import Link from 'next/link';

export function LogoZaverukha({ className = "h-8 w-auto text-white", variant = "light" }: { className?: string; variant?: "light" | "gold" | "dark" }) {
  // Brand color: Gold/Dark Blue
  const goldGradientId = `goldGrad_${variant}`;
  return (
    <Link href="/" className="flex items-center gap-2 group focus:outline-none" aria-label="Головна сторінка Ірина Заверуха">
      <div className="flex flex-col">
        <span className="font-serif tracking-wider font-semibold text-lg md:text-xl text-sacred-gold uppercase group-hover:text-sacred-goldLight transition-colors">
          Заверуха Ірина
        </span>
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/80 font-light -mt-1 group-hover:text-white transition-colors">
          Алхімія Живого Життя
        </span>
      </div>
    </Link>
  );
}

export function LogoImaria({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <Link href="/education/academia" className="flex items-center gap-2 group focus:outline-none" aria-label="IMARIA Academia">
      <div className="flex items-center gap-1.5 pl-2 border-l border-white/20">
        <span className="font-serif tracking-widest text-sm md:text-base font-medium text-sacred-goldLight uppercase group-hover:text-white transition-colors">
          IMARIA
        </span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-widest bg-sacred-gold/20 text-sacred-goldLight px-1.5 py-0.5 rounded border border-sacred-gold/30">
          Academia
        </span>
      </div>
    </Link>
  );
}
