'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Bold, 
  Italic, 
  Underline,
  Link2, 
  Unlink, 
  Quote, 
  List, 
  ListOrdered, 
  Heading2, 
  Heading3, 
  Image as ImageIcon,
  RotateCcw, 
  RotateCw, 
  RemoveFormatting,
  Eye, 
  Code, 
  Check, 
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface RichTextVisualEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextVisualEditor({
  value,
  onChange,
  placeholder = 'Введіть або вставте текст публікації сюди. Виділіть потрібні слова та натисніть на іконку «🔗», щоб додати посилання...'
}: RichTextVisualEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<'visual' | 'code' | 'preview'>('visual');
  const [rawHtml, setRawHtml] = useState<string>(value || '');
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  // Link Dialog Modal state
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkOpenNewTab, setLinkOpenNewTab] = useState(true);

  // Image Dialog Modal state
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  // Sync external value when editor is not currently focused or when changing articles
  useEffect(() => {
    setRawHtml(value || '');
    if (editorRef.current && activeMode === 'visual') {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value, activeMode]);

  // Handle content changes from visual editable div
  const handleVisualInput = useCallback(() => {
    if (!editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    setRawHtml(currentHtml);
    onChange(currentHtml);
  }, [onChange]);

  // Handle changes from raw HTML textarea
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setRawHtml(newHtml);
    onChange(newHtml);
  };

  // Switch between Visual, Code, and Preview modes
  const handleModeSwitch = (newMode: 'visual' | 'code' | 'preview') => {
    if (newMode === 'visual' && activeMode === 'code') {
      // Sync rawHtml back into contentEditable
      if (editorRef.current) {
        editorRef.current.innerHTML = rawHtml;
      }
    } else if (newMode === 'code' && activeMode === 'visual') {
      if (editorRef.current) {
        setRawHtml(editorRef.current.innerHTML);
      }
    }
    setActiveMode(newMode);
  };

  // Save selection before opening modal
  const saveCurrentSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedRange(sel.getRangeAt(0).cloneRange());
    }
  };

  // Restore saved selection
  const restoreSelection = () => {
    if (savedRange) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRange);
      }
    }
  };

  // Execute standard formatting command
  const execCmd = (command: string, arg?: string) => {
    if (activeMode !== 'visual') return;
    editorRef.current?.focus();
    try {
      document.execCommand(command, false, arg);
    } catch (e) {
      console.error('execCommand error:', e);
    }
    handleVisualInput();
  };

  // Format blocks (p, h2, h3, blockquote)
  const formatBlock = (tag: string) => {
    if (activeMode !== 'visual') return;
    editorRef.current?.focus();
    try {
      document.execCommand('formatBlock', false, tag);
    } catch (e) {
      console.error('formatBlock error:', e);
    }
    handleVisualInput();
  };

  // Open Link Dialog
  const openLinkDialog = () => {
    saveCurrentSelection();
    const sel = window.getSelection();
    let selectedText = '';
    let existingHref = '';

    if (sel && sel.rangeCount > 0) {
      selectedText = sel.toString().trim();
      // Check if clicked element or parent is already a link
      let node: Node | null = sel.anchorNode;
      while (node && node !== editorRef.current) {
        if (node instanceof HTMLAnchorElement) {
          existingHref = node.getAttribute('href') || '';
          if (!selectedText) {
            selectedText = node.textContent || '';
          }
          break;
        }
        node = node.parentNode;
      }
    }

    setLinkText(selectedText);
    setLinkUrl(existingHref || (selectedText.startsWith('http') ? selectedText : ''));
    setLinkOpenNewTab(true);
    setIsLinkDialogOpen(true);
  };

  // Apply Link
  const applyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    restoreSelection();
    editorRef.current?.focus();

    const cleanUrl = linkUrl.trim();
    const targetAttr = linkOpenNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
    const textToUse = linkText.trim() || cleanUrl;

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      // Wrap existing selection
      document.execCommand('insertHTML', false, `<a href="${cleanUrl}"${targetAttr}>${textToUse}</a>`);
    } else {
      // Insert new link at cursor
      document.execCommand('insertHTML', false, `<a href="${cleanUrl}"${targetAttr}>${textToUse}</a>`);
    }

    handleVisualInput();
    setIsLinkDialogOpen(false);
    setSavedRange(null);
  };

  // Remove Link from selection
  const removeLink = () => {
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand('unlink', false);
    handleVisualInput();
    setIsLinkDialogOpen(false);
  };

  // Open Image Dialog
  const openImageDialog = () => {
    saveCurrentSelection();
    setImageUrl('');
    setImageCaption('');
    setIsImageDialogOpen(true);
  };

  // Apply Image
  const applyImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    restoreSelection();
    editorRef.current?.focus();

    const cleanUrl = imageUrl.trim();
    const captionHtml = imageCaption.trim() 
      ? `<figcaption class="text-center text-xs text-slate-500 mt-2">${imageCaption.trim()}</figcaption>` 
      : '';
    
    const imageBlock = `<figure class="wp-block-image my-6"><img src="${cleanUrl}" alt="${imageCaption.trim()}" class="rounded-2xl max-w-full mx-auto shadow-sm" />${captionHtml}</figure><p><br></p>`;

    document.execCommand('insertHTML', false, imageBlock);
    handleVisualInput();
    setIsImageDialogOpen(false);
    setSavedRange(null);
  };

  // Handle clean pasting of text
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData('text/plain');
    if (!text) return;

    // If it's a multiline plain text, insert paragraphs cleanly
    if (text.includes('\n\n')) {
      e.preventDefault();
      const paragraphs = text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
        .map((p) => `<p>${p.replace(/\n/g, '<br />')}</p>`)
        .join('');
      document.execCommand('insertHTML', false, paragraphs);
      handleVisualInput();
    }
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-[#16142E] overflow-hidden shadow-lg transition-all">
      {/* TOOLBAR */}
      <div className="bg-[#1C1A3A] border-b border-white/15 px-3 py-2 flex flex-wrap items-center justify-between gap-2 select-none">
        
        {/* FORMATTING ICONS */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
          {/* LINK (THE STAR OF THE SHOW) */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={openLinkDialog}
            className="px-3 py-1.5 rounded-lg bg-[#3833BA] hover:bg-[#4E48D6] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
            title="Виділіть слово або речення та натисніть, щоб зробити посиланням"
          >
            <Link2 className="w-3.5 h-3.5 text-yellow-300" />
            <span>🔗 Зробити посиланням</span>
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1 hidden sm:block" />

          {/* BOLD */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('bold')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs font-bold transition"
            title="Жирний (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>

          {/* ITALIC */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('italic')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs italic transition"
            title="Курсив (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>

          {/* UNDERLINE */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('underline')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
            title="Підкреслений (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* HEADINGS */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatBlock('<h2>')}
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs font-serif font-bold transition"
            title="Заголовок H2"
          >
            H2
          </button>

          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatBlock('<h3>')}
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs font-serif font-bold transition"
            title="Підзаголовок H3"
          >
            H3
          </button>

          {/* PARAGRAPH / NORMAL */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatBlock('<p>')}
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 text-xs font-medium transition"
            title="Звичайний абзац"
          >
            Текст
          </button>

          <div className="w-[1px] h-4 bg-white/20 mx-1" />

          {/* QUOTE */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatBlock('<blockquote>')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
            title="Цитата"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>

          {/* BULLET LIST */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('insertUnorderedList')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
            title="Список з маркерами"
          >
            <List className="w-4 h-4" />
          </button>

          {/* NUMBERED LIST */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('insertOrderedList')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
            title="Нумерований список"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          {/* IMAGE */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={openImageDialog}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/90 text-xs transition"
            title="Вставити зображення в статтю"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* REMOVE FORMATTING */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => execCmd('removeFormat')}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white text-xs transition ml-1"
            title="Очистити форматування виділеного тексту"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MODE SWITCHER (VISUAL / CODE / PREVIEW) */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => handleModeSwitch('visual')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              activeMode === 'visual'
                ? 'bg-white text-[#1a1836] shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#3833BA]" />
            <span>Візуальний редактор</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeSwitch('code')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeMode === 'code'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
            title="Переглянути та редагувати HTML код напряму (для технічних правок)"
          >
            <Code className="w-3 h-3" />
            <span>HTML</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeSwitch('preview')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
              activeMode === 'preview'
                ? 'bg-[#C99A2C] text-[#1a1836] font-bold shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
            title="Попередній перегляд статті так, як її побачить читач на сайті"
          >
            <Eye className="w-3 h-3" />
            <span>Перегляд</span>
          </button>
        </div>
      </div>

      {/* HELPFUL QUICK TIP BANNER */}
      {activeMode === 'visual' && (
        <div className="bg-[#211E48] px-4 py-1.5 text-[11px] text-white/70 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sacred-gold">💡 Підказка:</span>
            <span>Виділіть мишкою будь-яке слово або фразу і натисніть <b>«🔗 Зробити посиланням»</b> у верхній панелі.</span>
          </div>
          <span className="text-white/40 hidden md:inline">Enter — новий абзац • Shift+Enter — перенесення рядка</span>
        </div>
      )}

      {/* 1. VISUAL WYSIWYG CANVAS */}
      <div className={activeMode === 'visual' ? 'block' : 'hidden'}>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleVisualInput}
          onPaste={handlePaste}
          className="w-full min-h-[350px] max-h-[650px] overflow-y-auto bg-white text-[#28303D] px-6 sm:px-10 py-6 focus:outline-none selection:bg-[#3833BA]/15 selection:text-[#1e1b4b]
            prose prose-slate max-w-none font-sans leading-relaxed
            [&_p]:mb-4 [&_p]:text-[16px] [&_p]:leading-[1.8] [&_p]:font-normal
            [&_strong]:font-bold [&_strong]:text-[#1e1b4b]
            [&_em]:italic [&_em]:text-slate-800
            [&_u]:underline [&_u]:underline-offset-2
            [&_a]:text-[#3833BA] [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-semibold [&_a]:decoration-[#3833BA] hover:[&_a]:text-[#221e75]
            [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-[#2b2670] [&_h2]:mt-6 [&_h2]:mb-3
            [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-[#2b2670] [&_h3]:mt-5 [&_h3]:mb-2
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#3833ba] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:my-4 [&_blockquote]:bg-slate-50 [&_blockquote]:py-2 [&_blockquote]:rounded-r-lg
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ol]:mb-4
            [&_figure]:my-4 [&_figure]:mx-auto [&_figure]:text-center
            [&_img]:rounded-xl [&_img]:shadow-sm [&_img]:mx-auto [&_img]:max-w-full
            empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
          data-placeholder={placeholder}
        />
      </div>

      {/* 2. RAW HTML CODE EDITOR */}
      {activeMode === 'code' && (
        <div className="p-4 bg-[#0F0E20]">
          <div className="text-xs text-white/50 mb-2 flex items-center justify-between">
            <span>Режим прямого редагування вихідного HTML коду:</span>
            <span>Підтримуються теги &lt;p&gt;, &lt;a&gt;, &lt;strong&gt;, &lt;figure&gt; тощо</span>
          </div>
          <textarea
            value={rawHtml}
            onChange={handleCodeChange}
            rows={15}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-300 focus:outline-none focus:border-sacred-gold leading-relaxed"
          />
        </div>
      )}

      {/* 3. PUBLIC PREVIEW MODE */}
      {activeMode === 'preview' && (
        <div className="p-6 sm:p-10 bg-[#FCFBF8] min-h-[350px] max-h-[600px] overflow-y-auto">
          <div className="mb-6 pb-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-[#2b2670] flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#3833ba]" />
              <span>Точний попередній перегляд статті для відвідувачів:</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">Публічний вигляд</span>
          </div>
          <div
            className="prose prose-slate max-w-none text-[#28303D] leading-relaxed font-sans
              [&_p]:mb-5 [&_p]:text-[17px] [&_p]:leading-[1.8] [&_p]:font-normal
              [&_strong]:font-semibold [&_strong]:text-[#1e1b4b]
              [&_em]:italic [&_em]:text-slate-700
              [&_a]:text-[#3833BA] [&_a]:underline [&_a]:underline-offset-4 [&_a]:font-semibold [&_a]:decoration-[#3833BA] hover:[&_a]:text-[#221e75]
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#3833ba] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:my-6
              [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_img]:mx-auto [&_img]:max-w-full
              [&_figure]:my-6 [&_figure]:mx-auto
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-5
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mb-5
              [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-[#2b2670] [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-[#2b2670] [&_h3]:mt-6 [&_h3]:mb-3"
            dangerouslySetInnerHTML={{
              __html: rawHtml || '<p class="text-slate-400 italic">Текст статті порожній. Введіть текст у візуальному редакторі.</p>',
            }}
          />
        </div>
      )}

      {/* LINK INSERTION MODAL DIALOG */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1C1A3A] border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#3833BA] flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Присвоїти посилання слову або фразі</h3>
                  <p className="text-[11px] text-white/60">Клікабельне посилання у статті</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkDialogOpen(false)}
                className="text-white/50 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={applyLink} className="space-y-4">
              {/* LINK TEXT */}
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Текст посилання (слово або фраза)
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="наприклад: Слухати на YouTube"
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Адреса посилання (URL) *
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://... або /education або t.me/..."
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                />
              </div>

              {/* QUICK URL PRESETS */}
              <div>
                <span className="block text-[11px] text-white/50 mb-1.5">Швидкі посилання:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Telegram Бот', url: 'https://t.me/pipl_platform_bot?start=consultation' },
                    { label: 'Навчання', url: '/education' },
                    { label: 'Академія IMARIA', url: '/education/academia' },
                    { label: 'Центр', url: '/consultation-center' },
                    { label: 'Контакти', url: '/contacts' },
                  ].map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setLinkUrl(preset.url)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-[11px] text-sacred-goldLight transition border border-white/10"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TARGET BLANK CHECKBOX */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={linkOpenNewTab}
                  onChange={(e) => setLinkOpenNewTab(e.target.checked)}
                  className="rounded border-white/20 text-[#3833BA] focus:ring-[#3833BA] bg-white/10"
                />
                <span className="text-xs text-white/80">Відкривати у новій вкладці (target="_blank")</span>
              </label>

              {/* MODAL ACTIONS */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                {linkUrl ? (
                  <button
                    type="button"
                    onClick={removeLink}
                    className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 transition"
                  >
                    <Unlink className="w-3.5 h-3.5" />
                    <span>Зняти посилання</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLinkDialogOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white transition"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#3833BA] hover:bg-[#4E48D6] text-xs font-bold text-white shadow-md transition flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Застосувати</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMAGE INSERTION MODAL DIALOG */}
      {isImageDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#1C1A3A] border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#3833BA] flex items-center justify-center">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Вставити зображення в текст</h3>
                  <p className="text-[11px] text-white/60">Фото всередині статті</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsImageDialogOpen(false)}
                className="text-white/50 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={applyImage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Адреса фотографії (URL) *
                </label>
                <input
                  type="text"
                  autoFocus
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/posts/... або https://..."
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-sm text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-sacred-goldLight uppercase mb-1">
                  Підпис під фото (необовʼязково)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Опис фотографії для читачів..."
                  className="w-full bg-white/5 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsImageDialogOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white transition"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#3833BA] hover:bg-[#4E48D6] text-xs font-bold text-white shadow-md transition flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Вставити фото</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
