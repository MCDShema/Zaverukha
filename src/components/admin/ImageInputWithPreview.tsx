'use client';

import React, { useRef, useState } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check } from 'lucide-react';

interface ImageInputWithPreviewProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  recommendedPresets?: string[];
}

const DEFAULT_PRESETS = [
  '/images/posts/viva-interview.jpg',
  '/images/posts/media-premiere.jpg',
  '/images/posts/forest-planting.jpg',
  '/images/posts/creativity-presentation.jpg',
  '/images/hero-irina.jpg',
  '/images/satsang-banner.jpg',
];

export default function ImageInputWithPreview({
  label = 'Головне фото / Обкладинка',
  value,
  onChange,
  placeholder = '/images/posts/your-photo.jpg або https://...',
  recommendedPresets = DEFAULT_PRESETS,
}: ImageInputWithPreviewProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [isReadingFile, setIsReadingFile] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 3MB for base64
    if (file.size > 3 * 1024 * 1024) {
      alert('Розмір зображення не повинен перевищувати 3 МБ. Будь ласка, оберіть менший файл.');
      return;
    }

    setIsReadingFile(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
      setIsReadingFile(false);
    };
    reader.onerror = () => {
      alert('Помилка під час зчитування файлу');
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-sacred-goldLight uppercase tracking-wide">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Видалити фото</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* URL Input */}
        <div className="sm:col-span-8 relative">
          <LinkIcon className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none font-mono"
          />
        </div>

        {/* Upload Button */}
        <div className="sm:col-span-4 flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isReadingFile}
            className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-sacred-gold" />
            <span>{isReadingFile ? 'Завантаження...' : 'Завантажити фото'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            title="Швидкий вибір з готових фото"
            className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 text-sacred-gold rounded-xl transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Presets Picker */}
      {showPresets && (
        <div className="p-3 bg-white/5 border border-white/15 rounded-xl space-y-2">
          <div className="text-[11px] text-white/60 font-medium">Швидкий вибір із наявних фото сайту:</div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {recommendedPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  onChange(preset);
                  setShowPresets(false);
                }}
                className={`group relative rounded-lg overflow-hidden border aspect-[16/10] bg-black/40 ${
                  value === preset ? 'border-sacred-gold ring-2 ring-sacred-gold/50' : 'border-white/20 hover:border-white/50'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preset} alt="preset" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                {value === preset && (
                  <div className="absolute inset-0 bg-sacred-gold/30 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview */}
      {value && (
        <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-xl">
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-black/40 shrink-0 border border-white/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/posts/viva-interview.jpg';
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs text-white font-medium truncate">{value.substring(0, 70)}...</div>
            <div className="text-[10px] text-emerald-400">✓ Фото додано та готове до збереження</div>
          </div>
        </div>
      )}
    </div>
  );
}
