'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteContent, INITIAL_CONTENT } from '@/data/siteContent';
import { Article, ARTICLES as DEFAULT_ARTICLES } from '@/data/articles';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  skype?: string;
  birthDate: string;
  birthTime?: string;
  birthCity?: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'completed';
}

export type DbStatus = 'connected' | 'syncing' | 'offline';

interface ContentContextType {
  content: SiteContent;
  updateSection: <K extends keyof SiteContent>(section: K, values: Partial<SiteContent[K]>) => Promise<void>;
  addArticle: (article: Article) => Promise<void>;
  updateArticle: (slug: string, article: Partial<Article>) => Promise<void>;
  deleteArticle: (slug: string) => Promise<void>;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<void>;
  exportJson: () => string;
  importJson: (jsonString: string) => Promise<boolean>;
  resetToDefaults: () => void;
  dbStatus: DbStatus;
  refreshFromDb: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const CONTENT_STORAGE_KEY = 'zaverukha_site_content_v7';
const LEADS_STORAGE_KEY = 'zaverukha_leads_v1';
const AUTH_STORAGE_KEY = 'zaverukha_admin_auth_v1';
const PASSWORD_STORAGE_KEY = 'zaverukha_admin_password_v1';
const DEFAULT_PASSWORD = 'imaria2026';

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [dbStatus, setDbStatus] = useState<DbStatus>('syncing');

  // Save content changes to localStorage (immediate local fallback cache)
  const saveContentLocal = useCallback((newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Error saving content locally:', e);
    }
  }, []);

  // Save leads to localStorage (immediate local fallback cache)
  const saveLeadsLocal = useCallback((newLeads: Lead[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error('Error saving leads locally:', e);
    }
  }, []);

  // Function to sync latest data from Cloudflare D1
  const refreshFromDb = useCallback(async () => {
    try {
      setDbStatus('syncing');

      // Fetch site content & articles in parallel
      const [contentRes, articlesRes, leadsRes] = await Promise.allSettled([
        fetch('/api/content'),
        fetch('/api/articles'),
        fetch('/api/leads'),
      ]);

      let hasDbConnection = false;
      let updatedContent = { ...content };

      if (contentRes.status === 'fulfilled' && contentRes.value.ok) {
        const json = await contentRes.value.json();
        if (json.success && json.content && Object.keys(json.content).length > 0) {
          updatedContent = {
            ...updatedContent,
            ...json.content,
          };
          hasDbConnection = true;
        }
      }

      if (articlesRes.status === 'fulfilled' && articlesRes.value.ok) {
        const json = await articlesRes.value.json();
        if (json.success && Array.isArray(json.articles) && json.articles.length > 0) {
          // Merge D1 articles with DEFAULT_ARTICLES, ensuring contentHtml is preserved
          const d1ArticlesMap = new Map<string, Article>();
          for (const a of json.articles) {
            if (a.slug) d1ArticlesMap.set(a.slug, a);
            if (a.id) d1ArticlesMap.set(a.id, a);
          }

          const mergedArticles = DEFAULT_ARTICLES.map((defArt) => {
            const fromD1 = d1ArticlesMap.get(defArt.slug) || (defArt.id && d1ArticlesMap.get(defArt.id));
            if (fromD1) {
              return {
                ...defArt,
                ...fromD1,
                // Ensure contentHtml from defArt is never lost if D1 sent an empty string
                contentHtml: fromD1.contentHtml || defArt.contentHtml,
              };
            }
            return defArt;
          });

          // Add any newly created articles from D1 not in DEFAULT_ARTICLES
          for (const a of json.articles) {
            const exists = mergedArticles.some((m) => m.slug === a.slug || (a.id && m.id === a.id));
            if (!exists) {
              mergedArticles.push(a);
            }
          }

          updatedContent.articles = mergedArticles;
          hasDbConnection = true;
        }
      }

      if (leadsRes.status === 'fulfilled' && leadsRes.value.ok) {
        const json = await leadsRes.value.json();
        if (json.success && Array.isArray(json.leads)) {
          setLeads(json.leads);
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(json.leads));
          hasDbConnection = true;
        }
      }

      if (hasDbConnection) {
        saveContentLocal(updatedContent);
        setDbStatus('connected');
      } else {
        setDbStatus('offline');
      }
    } catch (e) {
      console.warn('API/D1 unavailable, running in local cached mode:', e);
      setDbStatus('offline');
    }
  }, [content, saveContentLocal]);

  // Initial client hydration: purge obsolete caches and ensure full 123 articles
  useEffect(() => {
    try {
      // Purge obsolete cache keys that stored incomplete/dummy articles
      ['zaverukha_site_content_v1', 'zaverukha_site_content_v2', 'zaverukha_site_content_v3', 'zaverukha_site_content_v4', 'zaverukha_site_content_v5', 'zaverukha_site_content_v6'].forEach((k) => {
        try { localStorage.removeItem(k); } catch {}
      });

      const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        // Guarantee all 123 articles with contentHtml are present
        if (Array.isArray(parsed.articles)) {
          const validArticles = DEFAULT_ARTICLES.map((defArt) => {
            const cached = parsed.articles.find(
              (c: Article) =>
                c.slug === defArt.slug ||
                (defArt.id && c.id === defArt.id) ||
                (defArt.raw_slug && c.slug === defArt.raw_slug) ||
                (defArt.aliases && defArt.aliases.includes(c.slug))
            );
            if (cached) {
              return {
                ...defArt,
                ...cached,
                contentHtml: cached.contentHtml && cached.contentHtml.length > 50 ? cached.contentHtml : defArt.contentHtml,
              };
            }
            return defArt;
          });
          parsed.articles = validArticles;
        } else {
          parsed.articles = DEFAULT_ARTICLES;
        }
        setContent(parsed);
      } else {
        setContent(INITIAL_CONTENT);
      }

      const savedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      }

      const authStatus = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error('Error hydrating from localStorage:', e);
    }

    // Attempt D1 database sync
    refreshFromDb();
  }, []);

  // Update section: immediate optimistic update + D1 sync
  const updateSection = async <K extends keyof SiteContent>(section: K, values: Partial<SiteContent[K]>) => {
    const updated = {
      ...content,
      [section]: {
        ...content[section],
        ...values,
      },
    };
    saveContentLocal(updated);

    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: updated[section] }),
      });
      setDbStatus('connected');
    } catch (e) {
      console.warn('Failed to sync section to D1, preserved locally:', e);
    }
  };

  // Add article: immediate optimistic update + D1 sync
  const addArticle = async (article: Article) => {
    const updated = {
      ...content,
      articles: [article, ...content.articles],
    };
    saveContentLocal(updated);

    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      setDbStatus('connected');
    } catch (e) {
      console.warn('Failed to sync new article to D1, preserved locally:', e);
    }
  };

  // Update article: immediate optimistic update + D1 sync
  const updateArticle = async (slug: string, values: Partial<Article>) => {
    const existing = content.articles.find((a) => a.slug === slug);
    const updatedArticles = content.articles.map((a) =>
      a.slug === slug ? { ...a, ...values } : a
    );
    saveContentLocal({ ...content, articles: updatedArticles });

    try {
      const mergedArticle = existing ? { ...existing, ...values } : { slug, ...values };
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mergedArticle),
      });
      setDbStatus('connected');
    } catch (e) {
      console.warn('Failed to sync updated article to D1, preserved locally:', e);
    }
  };

  // Delete article: immediate optimistic update + D1 sync
  const deleteArticle = async (slug: string) => {
    const updatedArticles = content.articles.filter((a) => a.slug !== slug);
    saveContentLocal({ ...content, articles: updatedArticles });

    try {
      await fetch('/api/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      setDbStatus('connected');
    } catch (e) {
      console.warn('Failed to sync article deletion to D1, preserved locally:', e);
    }
  };

  // Add lead: immediate optimistic update + D1 sync
  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      ...leadData,
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toLocaleString('uk-UA'),
      status: 'new',
    };
    saveLeadsLocal([newLead, ...leads]);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      setDbStatus('connected');
    } catch (e) {
      console.warn('Failed to sync lead to D1, preserved locally:', e);
    }
  };

  // Update lead status: immediate optimistic update + D1 sync
  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    saveLeadsLocal(updated);

    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      setDbStatus('connected');
    } catch (e) {
      console.warn('Failed to sync lead status to D1, preserved locally:', e);
    }
  };

  // Delete lead: immediate optimistic update + D1 sync
  const deleteLead = async (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveLeadsLocal(updated);

    try {
      await fetch(`/api/leads?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      setDbStatus('connected');
    } catch (e) {
      console.warn('Failed to sync lead deletion to D1, preserved locally:', e);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    // Attempt backend authentication
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        return true;
      }
    } catch {
      // Fallback to local authentication
    }

    const currentPassword = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD;
    if (password === currentPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const changePassword = async (newPassword: string) => {
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
    try {
      await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
    } catch (e) {
      console.warn('Failed to sync password to D1:', e);
    }
  };

  const exportJson = (): string => {
    return JSON.stringify({ content, leads }, null, 2);
  };

  const importJson = async (jsonString: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.content) {
        saveContentLocal(parsed.content);
        // Sync imported content to D1
        try {
          await fetch('/api/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullContent: parsed.content }),
          });
        } catch {
          // ignore
        }
      }
      if (parsed.leads && Array.isArray(parsed.leads)) {
        saveLeadsLocal(parsed.leads);
      }
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    saveContentLocal(INITIAL_CONTENT);
    setLeads([]);
    localStorage.removeItem(LEADS_STORAGE_KEY);
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    localStorage.removeItem(PASSWORD_STORAGE_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateSection,
        addArticle,
        updateArticle,
        deleteArticle,
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        isAuthenticated,
        login,
        logout,
        changePassword,
        exportJson,
        importJson,
        resetToDefaults,
        dbStatus,
        refreshFromDb,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
