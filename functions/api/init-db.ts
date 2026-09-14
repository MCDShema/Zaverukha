// functions/api/init-db.ts
// Cloudflare Pages Function to initialize D1 tables and seed default data

interface Env {
  DB: D1Database;
}

const DEFAULT_ARTICLES = [
  {
    slug: 'viva-interview',
    title: '«Неможливо знайти те, що ніколи не губилося»: велике інтерв’ю Ірини Заверухи для журналу Viva!',
    excerpt: 'Раді поділитися знаковою подією! Відоме медіавидання Viva! опублікувало ексклюзивне інтерв\'ю з духовною майстринею та засновницею простору IMARIA & PIPL.',
    category: 'Новини',
    date: '4 вересня, 2026',
    readTime: '6 хв читання',
    image: '/images/posts/viva-interview.jpg',
    content: [
      'У новому великому інтерв\'ю для глянцевого журналу Viva! Ірина Заверуха ділиться власним шляхом становлення як цілителя у родовій традиції прямої передачі, роздумами про квантовий перехід та роль жінки-Берегині у Нову епоху.',
      '«Люди часто шукають себе роками на різноманітних курсах, намагаючись знайти щось зовні. Але насправді неможливо знайти те, що ніколи не губилося — це ваша божественна іскра, яка завжди чекає у серці», — зазначає Ірина.',
      'У бесіді також розкриваються теми родових взаємин, прощення батьків через авторський курс «Від гордині до гідності» та проєкти відновлення природи України, які впроваджуються спільнотою PIPL.'
    ]
  },
  {
    slug: 'media-premiere',
    title: 'Медійна прем’єра: шлях служіння мудрості',
    excerpt: 'Знаєте, що для мене в становленні на шлях місії душі було найскладнішим? Йти дорогою служіння мудрості, створюючи щоденні причини для світла...',
    category: 'Новини',
    date: '29 червня, 2026',
    readTime: '5 хв читання',
    image: '/images/posts/media-premiere.jpg',
    content: [
      'Вихід у відкритий медійний простір для провідника духовних знань — це завжди виклик та велика відповідальність. Кожне слово має резонувати з чистотою та правдою серця.',
      'Ми відкриваємо нову серію публічних виступів та ефірів, присвячених практичному застосуванню законів квантової психології у повсякденному житті сучасної людини.'
    ]
  },
  {
    slug: 'forest-planting',
    title: '«…Іншої планети у нас немає…»: висаджуємо черговий ліс',
    excerpt: 'Ніби й кожен це знає. Але чомусь не хочеться брати відповідальність за таку глобальну дальність… Друзі, ми саджатимемо черговий ліс! Вкорінюватимемо життя…',
    category: 'Екологія',
    date: '8 жовтня, 2025',
    readTime: '4 хв читання',
    image: '/images/posts/forest-planting.jpg',
    content: [
      'Висаджування дерев — це не просто екологічна акція, це повернення боргу рідній Землі, встановлення зв\'язку з першоелементами природи та створення живої спадщини для майбутніх поколінь.',
      'Разом зі спільнотою PIPL ми засадили понад 5 гектарів молодого лісу на Київщині та Черкащині. Долучайтеся до наступних виїздів!'
    ]
  },
  {
    slug: 'creativity-presentation',
    title: 'Презентація творчості «На межі світів»',
    excerpt: 'Презентація моєї творчості «На межі світів» вже на YouTube каналі. Творчість — це молитва душі, яка звучить у кожній пісні та вірші...',
    category: 'Творчість',
    date: '15 серпня, 2025',
    readTime: '3 хв читання',
    image: '/images/posts/creativity-presentation.jpg',
    content: [
      'Сакральна поезія, мантри та пісні — це пряма передача вищих вібрацій, яка зцілює серце та надихає на внутрішнє пробудження.',
      'Дивіться повний запис презентації на нашому офіційному каналі та відкривайте нові грані своєї чуттєвості.'
    ]
  }
];

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({ success: false, error: 'Database binding missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Ensure tables exist
    await db.batch([
      db.prepare(`
        CREATE TABLE IF NOT EXISTS articles (
          id TEXT PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT,
          content TEXT NOT NULL,
          category TEXT NOT NULL,
          author TEXT NOT NULL DEFAULT 'Ірина Заверуха',
          date TEXT NOT NULL,
          read_time TEXT NOT NULL DEFAULT '5 хв',
          cover_image TEXT NOT NULL,
          tags TEXT NOT NULL DEFAULT '[]',
          published INTEGER NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `),
      db.prepare(`
        CREATE TABLE IF NOT EXISTS site_sections (
          id TEXT PRIMARY KEY,
          data TEXT NOT NULL,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `),
      db.prepare(`
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          skype TEXT,
          birth_date TEXT NOT NULL,
          birth_time TEXT,
          birth_city TEXT,
          message TEXT,
          status TEXT NOT NULL DEFAULT 'new',
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `),
      db.prepare(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `),
    ]);

    // 2. Check if articles exist
    const articleCount = await db.prepare('SELECT COUNT(*) as count FROM articles').first<{ count: number }>();
    let seededArticles = 0;
    if (!articleCount || articleCount.count === 0) {
      const inserts = DEFAULT_ARTICLES.map((art, idx) =>
        db.prepare(`
          INSERT INTO articles (
            id, slug, title, excerpt, content, category, author, date, read_time, cover_image, tags, published, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '[]', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `).bind(
          `art_${idx + 1}`,
          art.slug,
          art.title,
          art.excerpt,
          JSON.stringify(art.content),
          art.category,
          'Ірина Заверуха',
          art.date,
          art.readTime,
          art.image
        )
      );
      await db.batch(inserts);
      seededArticles = inserts.length;
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Database schema initialized successfully',
      seededArticles,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
