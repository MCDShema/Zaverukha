// functions/api/articles.ts
// Cloudflare Pages Function for managing articles in D1

interface Env {
  DB: D1Database;
}

export interface DbArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  cover_image: string;
  tags: string;
  published: number;
  created_at: string;
  updated_at: string;
}

function rowToArticle(row: DbArticleRow) {
  let parsedContent: string[] = [];
  try {
    parsedContent = JSON.parse(row.content);
    if (!Array.isArray(parsedContent)) {
      parsedContent = [row.content];
    }
  } catch {
    parsedContent = [row.content];
  }

  let parsedTags: string[] = [];
  try {
    parsedTags = JSON.parse(row.tags || '[]');
    if (!Array.isArray(parsedTags)) {
      parsedTags = [];
    }
  } catch {
    parsedTags = [];
  }

  const cover = row.cover_image || '/images/posts/viva-interview.jpg';

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: row.date,
    readTime: row.read_time,
    image: cover,
    cover_image: cover,
    tags: parsedTags,
    author: row.author || 'Ірина Заверуха',
    content: parsedContent,
    published: Boolean(row.published),
  };
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({ success: false, error: 'Database binding missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(context.request.url);
    const slug = url.searchParams.get('slug');

    if (slug) {
      const row = await db.prepare('SELECT * FROM articles WHERE slug = ?').bind(slug).first<DbArticleRow>();
      if (!row) {
        return new Response(JSON.stringify({ success: false, error: 'Article not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ success: true, article: rowToArticle(row) }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { results } = await db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all<DbArticleRow>();
    const articles = (results || []).map(rowToArticle);

    return new Response(JSON.stringify({ success: true, articles }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({ success: false, error: 'Database binding missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const article = await context.request.json() as any;
    if (!article.slug || !article.title) {
      return new Response(JSON.stringify({ success: false, error: 'Title and slug are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const id = article.id || `art_${Date.now()}`;
    const contentStr = Array.isArray(article.content) ? JSON.stringify(article.content) : JSON.stringify([article.content || '']);
    const tagsStr = JSON.stringify(article.tags || []);
    const published = article.published !== false ? 1 : 0;

    await db.prepare(`
      INSERT INTO articles (
        id, slug, title, excerpt, content, category, author, date, read_time, cover_image, tags, published, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        excerpt = excluded.excerpt,
        content = excluded.content,
        category = excluded.category,
        author = excluded.author,
        date = excluded.date,
        read_time = excluded.read_time,
        cover_image = excluded.cover_image,
        tags = excluded.tags,
        published = excluded.published,
        updated_at = CURRENT_TIMESTAMP
    `).bind(
      id,
      article.slug,
      article.title,
      article.excerpt || '',
      contentStr,
      article.category || 'Блог',
      article.author || 'Ірина Заверуха',
      article.date || new Date().toLocaleDateString('uk-UA'),
      article.readTime || '5 хв',
      article.cover_image || article.image || '/images/posts/viva-interview.jpg',
      tagsStr,
      published
    ).run();

    return new Response(JSON.stringify({ success: true, slug: article.slug }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  return onRequestPost(context);
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({ success: false, error: 'Database binding missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(context.request.url);
    let slug = url.searchParams.get('slug');

    if (!slug) {
      try {
        const body = await context.request.json() as { slug?: string };
        slug = body.slug || null;
      } catch {
        // ignore
      }
    }

    if (!slug) {
      return new Response(JSON.stringify({ success: false, error: 'Slug is required for deletion' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.prepare('DELETE FROM articles WHERE slug = ?').bind(slug).run();

    return new Response(JSON.stringify({ success: true, deleted: slug }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
