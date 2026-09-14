'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, INITIAL_CONTENT } from '@/data/siteContent';
import { Article } from '@/data/articles';

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

interface ContentContextType {
  content: SiteContent;
  updateSection: <K extends keyof SiteContent>(section: K, values: Partial<SiteContent[K]>) => void;
  addArticle: (article: Article) => void;
  updateArticle: (slug: string, article: Partial<Article>) => void;
  deleteArticle: (slug: string) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPassword: string) => void;
  exportJson: () => string;
  importJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const CONTENT_STORAGE_KEY = 'zaverukha_site_content_v1';
const LEADS_STORAGE_KEY = 'zaverukha_leads_v1';
const AUTH_STORAGE_KEY = 'zaverukha_admin_auth_v1';
const PASSWORD_STORAGE_KEY = 'zaverukha_admin_password_v1';
const DEFAULT_PASSWORD = 'imaria2026';

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (savedContent) {
        setContent(JSON.parse(savedContent));
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
      console.error('Error hydrating content from localStorage:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save content changes to localStorage
  const saveContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Error saving content:', e);
    }
  };

  // Save leads to localStorage
  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error('Error saving leads:', e);
    }
  };

  const updateSection = <K extends keyof SiteContent>(section: K, values: Partial<SiteContent[K]>) => {
    const updated = {
      ...content,
      [section]: {
        ...content[section],
        ...values,
      },
    };
    saveContent(updated);
  };

  const addArticle = (article: Article) => {
    const updated = {
      ...content,
      articles: [article, ...content.articles],
    };
    saveContent(updated);
  };

  const updateArticle = (slug: string, values: Partial<Article>) => {
    const updatedArticles = content.articles.map((a) =>
      a.slug === slug ? { ...a, ...values } : a
    );
    saveContent({ ...content, articles: updatedArticles });
  };

  const deleteArticle = (slug: string) => {
    const updatedArticles = content.articles.filter((a) => a.slug !== slug);
    saveContent({ ...content, articles: updatedArticles });
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      ...leadData,
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toLocaleString('uk-UA'),
      status: 'new',
    };
    saveLeads([newLead, ...leads]);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    saveLeads(updated);
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveLeads(updated);
  };

  const login = (password: string): boolean => {
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

  const changePassword = (newPassword: string) => {
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
  };

  const exportJson = (): string => {
    return JSON.stringify({ content, leads }, null, 2);
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.content) {
        saveContent(parsed.content);
      }
      if (parsed.leads) {
        saveLeads(parsed.leads);
      }
      return true;
    } catch (e) {
      console.error('Failed to parse import JSON:', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    saveContent(INITIAL_CONTENT);
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
