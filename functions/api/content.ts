// functions/api/content.ts
// Cloudflare Pages Function for managing site section content in D1

interface Env {
  DB: D1Database;
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

    const { results } = await db.prepare('SELECT id, data FROM site_sections').all<{ id: string; data: string }>();

    const content: Record<string, any> = {};
    if (results && results.length > 0) {
      for (const row of results) {
        try {
          content[row.id] = JSON.parse(row.data);
        } catch {
          content[row.id] = row.data;
        }
      }
    }

    return new Response(JSON.stringify({ success: true, content }), {
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

    const body = await context.request.json() as { section?: string; data?: any; fullContent?: Record<string, any> };

    if (body.section && body.data) {
      // Upsert single section
      const dataStr = typeof body.data === 'string' ? body.data : JSON.stringify(body.data);
      await db.prepare(
        'INSERT INTO site_sections (id, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP'
      ).bind(body.section, dataStr).run();

      return new Response(JSON.stringify({ success: true, updated: body.section }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (body.fullContent) {
      // Batch upsert full content
      const statements = [];
      for (const [section, data] of Object.entries(body.fullContent)) {
        if (section === 'articles') continue; // Articles managed separately
        const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
        statements.push(
          db.prepare(
            'INSERT INTO site_sections (id, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP'
          ).bind(section, dataStr)
        );
      }
      if (statements.length > 0) {
        await db.batch(statements);
      }
      return new Response(JSON.stringify({ success: true, count: statements.length }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Invalid payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
