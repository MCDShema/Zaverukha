import allArticlesData from './allArticles.json';

export interface Article {
  id?: string;
  slug: string;
  raw_slug?: string;
  aliases?: string[];
  title: string;
  excerpt: string;
  category: 'Новини' | 'Блог' | 'Творчість' | 'Екологія';
  date: string;
  readTime: string;
  content: string[];
  contentHtml?: string;
  image?: string;
  cover_image?: string;
  author?: string;
  tags?: string[];
  published?: number;
  created_at?: string;
}

export const ARTICLES: Article[] = allArticlesData as Article[];

function normalizeSlug(s: string): string {
  try {
    return decodeURIComponent(s).toLowerCase().replace(/['’ʼ`]/g, '').trim();
  } catch {
    return s.toLowerCase().replace(/['’ʼ`]/g, '').trim();
  }
}

export function findArticleBySlug(slug: string): Article | undefined {
  if (!slug) return undefined;
  const targetNorm = normalizeSlug(slug);
  const targetRaw = slug.toLowerCase().trim();

  return ARTICLES.find((a) => {
    // 1. Direct slug or normalized slug match
    if (a.slug === slug || normalizeSlug(a.slug) === targetNorm) return true;

    // 2. Raw slug match (%d0...)
    if (a.raw_slug && (a.raw_slug.toLowerCase() === targetRaw || normalizeSlug(a.raw_slug) === targetNorm)) {
      return true;
    }

    // 3. Aliases match
    if (a.aliases && a.aliases.some((alias) => alias.toLowerCase() === targetRaw || normalizeSlug(alias) === targetNorm)) {
      return true;
    }

    // 4. ID match (e.g. wp-3244 or 3244)
    if (a.id && (a.id.toLowerCase() === targetRaw || a.id.replace(/^wp-/, '') === targetRaw)) {
      return true;
    }

    return false;
  });
}

export function getAllArticleSlugs(): string[] {
  const slugSet = new Set<string>();
  for (const a of ARTICLES) {
    if (a.slug) slugSet.add(a.slug);
    if (a.aliases) {
      for (const alias of a.aliases) {
        if (alias) slugSet.add(alias);
      }
    }
  }
  return Array.from(slugSet);
}
