// functions/api/leads.ts
// Cloudflare Pages Function for consultation leads stored in D1

interface Env {
  DB: D1Database;
}

export interface DbLeadRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  skype: string | null;
  birth_date: string;
  birth_time: string | null;
  birth_city: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'completed';
  created_at: string;
}

function rowToLead(row: DbLeadRow) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    skype: row.skype || undefined,
    birthDate: row.birth_date,
    birthTime: row.birth_time || undefined,
    birthCity: row.birth_city || undefined,
    message: row.message || undefined,
    status: row.status,
    createdAt: row.created_at,
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

    const { results } = await db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all<DbLeadRow>();
    const leads = (results || []).map(rowToLead);

    return new Response(JSON.stringify({ success: true, leads }), {
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

    const body = await context.request.json() as any;
    if (!body.name || !body.phone) {
      return new Response(JSON.stringify({ success: false, error: "Ім'я та телефон обов'язкові" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const id = body.id || `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const status = body.status || 'new';

    await db.prepare(`
      INSERT INTO leads (
        id, name, email, phone, skype, birth_date, birth_time, birth_city, message, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      id,
      body.name,
      body.email || '',
      body.phone,
      body.skype || null,
      body.birthDate || '',
      body.birthTime || null,
      body.birthCity || null,
      body.message || null,
      status
    ).run();

    return new Response(JSON.stringify({ success: true, id }), {
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
  try {
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({ success: false, error: 'Database binding missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await context.request.json() as { id?: string; status?: string };
    if (!body.id || !body.status) {
      return new Response(JSON.stringify({ success: false, error: 'Lead ID and status required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.prepare('UPDATE leads SET status = ? WHERE id = ?').bind(body.status, body.id).run();

    return new Response(JSON.stringify({ success: true, updated: body.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
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
    let id = url.searchParams.get('id');

    if (!id) {
      try {
        const body = await context.request.json() as { id?: string };
        id = body.id || null;
      } catch {
        // ignore
      }
    }

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.prepare('DELETE FROM leads WHERE id = ?').bind(id).run();

    return new Response(JSON.stringify({ success: true, deleted: id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
