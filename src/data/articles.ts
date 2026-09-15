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

export function fullyDecode(s: string): string {
  let prev = s;
  let decoded = s;
  try {
    for (let i = 0; i < 4; i++) {
      decoded = decodeURIComponent(prev);
      if (decoded === prev) break;
      prev = decoded;
    }
  } catch {
    // keep as is
  }
  return decoded;
}

export function normalizeSlug(s: string): string {
  try {
    const decoded = fullyDecode(s);
    return decoded
      .toLowerCase()
      .replace(/['’ʼ`]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
  } catch {
    return s.toLowerCase().trim();
  }
}

export function findArticleBySlug(slug: string, articleList: Article[] = ARTICLES): Article | undefined {
  if (!slug) return undefined;
  const targetNorm = normalizeSlug(slug);
  const targetRaw = slug.toLowerCase().trim();
  const targetDecoded = fullyDecode(slug).toLowerCase().trim();

  return articleList.find((a) => {
    // 1. Direct slug or normalized slug match
    if (a.slug === slug || normalizeSlug(a.slug) === targetNorm || a.slug.toLowerCase().trim() === targetDecoded) return true;

    // 2. Raw slug match (%d0...)
    if (a.raw_slug && (
      a.raw_slug.toLowerCase() === targetRaw || 
      normalizeSlug(a.raw_slug) === targetNorm ||
      fullyDecode(a.raw_slug).toLowerCase().trim() === targetDecoded
    )) {
      return true;
    }

    // 3. Aliases match
    if (a.aliases && a.aliases.some((alias) => 
      alias.toLowerCase() === targetRaw || 
      normalizeSlug(alias) === targetNorm ||
      fullyDecode(alias).toLowerCase().trim() === targetDecoded
    )) {
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
    if (a.slug) {
      slugSet.add(a.slug);
      slugSet.add(fullyDecode(a.slug));
    }
    if (a.raw_slug) {
      slugSet.add(a.raw_slug);
      slugSet.add(fullyDecode(a.raw_slug));
    }
    if (a.aliases) {
      for (const alias of a.aliases) {
        if (alias) {
          slugSet.add(alias);
          slugSet.add(fullyDecode(alias));
        }
      }
    }
    if (a.id) {
      slugSet.add(a.id);
      const numId = a.id.replace(/^wp-/, '');
      if (numId) slugSet.add(numId);
    }
  }
  return Array.from(slugSet);
}
