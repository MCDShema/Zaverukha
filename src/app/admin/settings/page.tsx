'use client';

import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { 
  Settings, 
  Lock, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  Key
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { changePassword, exportJson, importJson, resetToDefaults } = useContent();

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Import state
  const [importText, setImportText] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword.length < 6) {
      setPasswordError('Пароль має містити щонайменше 6 символів.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Паролі не співпадають.');
      return;
    }

    changePassword(newPassword);
    setPasswordSuccess(true);
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

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

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    setImportError('');
    setImportSuccess(false);

    if (!importText.trim()) {
      setImportError('Вставте дійсний JSON вміст.');
      return;
    }

    const ok = importJson(importText);
    if (ok) {
      setImportSuccess(true);
      setImportText('');
      setTimeout(() => setImportSuccess(false), 3000);
    } else {
      setImportError('Некоректний формат JSON файлу.');
    }
  };

  const handleReset = () => {
    if (confirm('УВАГА: Це скине всі тексти та налаштування сайту до початкового стану за замовчуванням. Продовжити?')) {
      resetToDefaults();
      alert('Контент успішно скинуто до початкового стану.');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-sacred-gold" />
          <span>Налаштування та Резервне копіювання</span>
        </h1>
        <p className="text-xs text-white/60 mt-1">
          Керування безпекою доступу, експорт та імпорт повної бази даних сайту
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. CHANGE PASSWORD */}
        <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Key className="w-5 h-5 text-sacred-gold" />
            <h2 className="text-lg font-serif text-white font-semibold">Зміна пароля доступу</h2>
          </div>

          {passwordSuccess && (
            <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Пароль успішно оновлено!</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
              {passwordError}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Новий пароль</label>
              <input
                type="password"
                required
                placeholder="Мінімум 6 символів"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Підтвердіть пароль</label>
              <input
                type="password"
                required
                placeholder="Повторіть пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="sacred-gold-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow"
            >
              Оновити пароль
            </button>
          </form>
        </div>

        {/* 2. EXPORT BACKUP */}
        <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
              <Download className="w-5 h-5 text-sacred-gold" />
              <h2 className="text-lg font-serif text-white font-semibold">Експорт повного бекапу (JSON)</h2>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Завантажує файл <code className="text-sacred-gold">.json</code> з усіма актуальними текстами сторінок, статтями блогу та журналом заявок клієнтів. 
              Ви можете зберегти цей файл на комп&apos;ютері як резервну копію або передати розробнику для залиття в GitHub.
            </p>
          </div>

          <button
            onClick={handleDownloadBackup}
            className="w-full py-3.5 px-6 rounded-xl bg-sacred-blue hover:bg-sacred-indigo border border-sacred-gold/40 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
          >
            <Download className="w-4 h-4 text-sacred-gold" />
            <span>Завантажити повний бекап сайту</span>
          </button>
        </div>

        {/* 3. IMPORT BACKUP */}
        <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
            <Upload className="w-5 h-5 text-sacred-gold" />
            <h2 className="text-lg font-serif text-white font-semibold">Імпорт даних з бекапу</h2>
          </div>

          {importSuccess && (
            <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 text-xs flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Дані успішно імпортовано та оновлено на сайті!</span>
            </div>
          )}

          {importError && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
              {importError}
            </div>
          )}

          <form onSubmit={handleImport} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Вставте вміст JSON бекапу:</label>
              <textarea
                rows={4}
                required
                placeholder='{"content": { ... }}'
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full bg-black/40 border border-white/20 focus:border-sacred-gold rounded-xl p-3 text-xs text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="sacred-gold-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow"
            >
              Застосувати імпорт
            </button>
          </form>
        </div>

        {/* 4. RESET TO FACTORY DEFAULTS */}
        <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-red-500/30 bg-red-950/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-3 text-red-300">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-serif font-semibold">Скидання до початкових значень</h2>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Якщо ви випадково пошкодили тексти або бажаєте повернути сайт до початкового стану за ТЗ, натисніть кнопку нижче. 
              Усі редагування буде замінено заводськими значеннями.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 px-6 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Скинути контент до заводських налаштувань</span>
          </button>
        </div>

      </div>

    </div>
  );
}
