'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  link: string;
  isExternal?: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/banners/kryla-banner.jpg',
    title: 'КРИЛА® — Річна жіноча програма трансформації',
    link: '/education/pipl'
  },
  {
    id: 2,
    image: '/images/banners/slide-upravlinnya.jpg',
    title: 'Управління простором 2026',
    link: '/education/pipl'
  },
  {
    id: 3,
    image: '/images/banners/slide-besidy.jpg',
    title: 'Книга «Бесіди з Ангелами»',
    link: '/creativity'
  },
  {
    id: 4,
    image: '/images/banners/alhimicum-banner.jpg',
    title: 'Алхімікум — Згадування',
    link: '/education/pipl'
  },
  {
    id: 5,
    image: '/images/banners/slide-course1.jpg',
    title: 'Сам собі цілитель',
    link: '/education/pipl'
  },
  {
    id: 6,
    image: '/images/banners/slide-course2.jpg',
    title: 'Від гордині до гідності',
    link: '/education/pipl'
  },
  {
    id: 7,
    image: '/images/banners/slide-pipl.jpg',
    title: 'Екосистема PIPL — Простір еволюції',
    link: '/education/pipl'
  },
  {
    id: 8,
    image: '/images/banners/slide-youtube.jpg',
    title: 'DivineYoga by IMARIA — YouTube канал',
    link: '/satsang-divine-yoga'
  }
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [paused]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 flex justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full max-w-[860px] mx-auto overflow-hidden rounded-2xl shadow-2xl border border-[#C99A2C]/40 aspect-[1024/694] max-h-[520px] bg-[rgba(56,51,186,0.1)]">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Link href={slide.link} className="block w-full h-full group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sacred-night via-sacred-night/60 to-transparent p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                <span className="text-sm sm:text-base font-serif text-sacred-goldLight font-medium">
                  {slide.title}
                </span>
                <span className="text-xs bg-sacred-gold text-sacred-dark font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Дізнатись більше →
                </span>
              </div>
            </Link>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-sacred-dark/70 hover:bg-sacred-dark text-white/80 hover:text-white border border-white/20 transition-all hover:scale-110"
          aria-label="Попередній слайд"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-sacred-dark/70 hover:bg-sacred-dark text-white/80 hover:text-white border border-white/20 transition-all hover:scale-110"
          aria-label="Наступний слайд"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-sacred-dark/60 backdrop-blur-sm border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === current 
                  ? 'w-6 bg-sacred-gold' 
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Перейти до слайду ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
