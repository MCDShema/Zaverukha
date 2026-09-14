// functions/api/auth.ts
// Cloudflare Pages Function for Admin authentication

interface Env {
  DB: D1Database;
}

const DEFAULT_PASSWORD = 'imaria2026';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const db = context.env.DB;
    const body = await context.request.json() as { password?: string };

    if (!body.password) {
      return new Response(JSON.stringify({ success: false, error: 'Password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let storedPassword = DEFAULT_PASSWORD;
    if (db) {
      try {
        const row = await db.prepare('SELECT value FROM admin_settings WHERE key = ?').bind('admin_password').first<{ value: string }>();
        if (row && row.value) {
          storedPassword = row.value;
        }
      } catch {
        // Table might not exist yet, fallback to default
      }
    }

    if (body.password === storedPassword) {
      const token = `adm_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      return new Response(JSON.stringify({ success: true, token }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Невірний пароль' }), {
      status: 401,
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

    const body = await context.request.json() as { currentPassword?: string; newPassword?: string };
    if (!body.newPassword || body.newPassword.length < 6) {
      return new Response(JSON.stringify({ success: false, error: 'Новий пароль має містити щонайменше 6 символів' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await db.prepare(`
      INSERT INTO admin_settings (key, value, updated_at) VALUES ('admin_password', ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `).bind(body.newPassword).run();

    return new Response(JSON.stringify({ success: true, message: 'Пароль успішно оновлено' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
