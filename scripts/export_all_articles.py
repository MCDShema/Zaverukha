#!/usr/bin/env python3
import xml.etree.ElementTree as ET
import os, re, shutil, json, urllib.parse, html
from datetime import datetime

XML_PATH = "/Users/shema/Desktop/projects/Zaverukha/zaverukha.com/zaverukha-wp-export.xml"
UPLOADS_DIR = "/Users/shema/Desktop/projects/Zaverukha/zaverukha.com/www/wp-content/uploads"
PUBLIC_UPLOADS_DIR = "/Users/shema/Desktop/projects/Zaverukha/zaverukha.com/public/wp-content/uploads"
PUBLIC_POSTS_DIR = "/Users/shema/Desktop/projects/Zaverukha/zaverukha.com/public/images/posts"
JSON_OUT = "/Users/shema/Desktop/projects/Zaverukha/zaverukha.com/src/data/allArticles.json"
SQL_OUT = "/Users/shema/Desktop/projects/Zaverukha/zaverukha.com/migrations/0005_full_articles_update.sql"

os.makedirs(PUBLIC_UPLOADS_DIR, exist_ok=True)
os.makedirs(PUBLIC_POSTS_DIR, exist_ok=True)

tree = ET.parse(XML_PATH)
root = tree.getroot()
channel = root.find("channel")

# 1. Attachment map: post_id -> url
attachments = {}
for item in channel.findall("item"):
    pt = item.find("{http://wordpress.org/export/1.2/}post_type")
    if pt is None: continue
    raw_pt = ET.tostring(pt, encoding="unicode")
    m = re.search(r"\[CDATA\[(.*?)\]\]", raw_pt)
    val_pt = m.group(1).strip() if m else (pt.text or "").strip()

    if val_pt == "attachment":
        pid_el = item.find("{http://wordpress.org/export/1.2/}post_id")
        pid = pid_el.text.strip() if pid_el is not None else ""
        url_el = item.find("{http://wordpress.org/export/1.2/}attachment_url")
        url = (url_el.text.strip() if url_el is not None else "") or (item.find("guid").text.strip() if item.find("guid") is not None else "")
        if pid and url:
            attachments[pid] = url

def clean_tag(t):
    t = t.strip()
    if t in ("Мои блоги", "Мої блоги", "My blog"): return "Мої блоги"
    if t in ("Новости", "News", "Новини"): return "Новини"
    if t in ("Творчество", "Art", "Творчість"): return "Творчість"
    if t in ("Про мене", "Про меня", "About me"): return "Про мене"
    if t in ("Подорожі зі смислом", "Путешествия со смыслом", "Travel with meaning"): return "Подорожі зі смислом"
    if t in ("Рецепти для Свідомого життя", "Recipes for Conscious Life"): return "Рецепти"
    if t in ("Голос Душі", "Voice of the Soul"): return "Голос Душі"
    if t in ("Цілісний розвиток особистості", "Holistic personality development"): return "Розвиток"
    if t in ("Події", "Events"): return "Події"
    if t in ("Екологія", "Ліс"): return "Екологія"
    return t

def format_date_uk(date_str):
    months = ["", "січня", "лютого", "березня", "квітня", "травня", "червня",
              "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"]
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d"):
        try:
            dt = datetime.strptime(date_str.strip()[:19], fmt[:len(fmt)])
            return f"{dt.day} {months[dt.month]} {dt.year}"
        except: pass
    return date_str

def copy_upload_file(rel_path):
    src = os.path.join(UPLOADS_DIR, rel_path)
    if not os.path.exists(src):
        # try unquoting
        src = os.path.join(UPLOADS_DIR, urllib.parse.unquote(rel_path))
    if os.path.exists(src) and os.path.isfile(src):
        dst = os.path.join(PUBLIC_UPLOADS_DIR, rel_path)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if not os.path.exists(dst):
            try:
                shutil.copy2(src, dst)
            except Exception as e:
                pass
        return True
    return False

def clean_html_content(raw_html):
    if not raw_html: return ""
    text = raw_html

    # Replace absolute upload URLs with relative /wp-content/uploads/
    text = re.sub(r'https?://(?:i[0-3]\.wp\.com/)?(?:www\.)?zaverukha\.com/wp-content/uploads/', '/wp-content/uploads/', text)
    
    # Strip query parameters from upload images (?resize=... etc)
    text = re.sub(r'(/wp-content/uploads/[^"\'\s\?]+)\?[^"\'\s>]+', r'\1', text)

    # Copy referenced images into public/wp-content/uploads
    for m in re.finditer(r'/wp-content/uploads/([^\s"\'<>]+)', text):
        copy_upload_file(m.group(1))

    # Remove Gutenberg comments: <!-- wp:... --> and <!-- /wp:... -->
    text = re.sub(r'<!--\s*/?wp:[^>]*-->', '', text)

    # Remove trailing copyright paragraphs (rendered cleanly by component)
    text = re.sub(r'<p[^>]*>\s*©\s*Ірина Заверуха.*?</p>', '', text, flags=re.DOTALL | re.IGNORECASE)

    # Remove empty areoi divs or containers if empty
    text = re.sub(r'<div[^>]*class="[^"]*areoi-[^"]*"[^>]*>\s*</div>', '', text)

    # Remove empty paragraphs
    text = re.sub(r'<p>\s*(?:&nbsp;|\s)*</p>', '', text)

    # Normalise newlines
    text = re.sub(r'\n\s*\n+', '\n\n', text).strip()
    return text

def extract_paragraphs(clean_html):
    # Strip html to create plaintext paragraphs
    paras = re.split(r'</p>|<br\s*/?>|</div>', clean_html)
    result = []
    for p in paras:
        plain = re.sub(r'<[^>]+>', ' ', p)
        plain = html.unescape(plain)
        plain = re.sub(r'\s+', ' ', plain).strip()
        if len(plain) > 25 and not plain.startswith('©'):
            result.append(plain)
    return result

# Known aliases mapping for key posts
CUSTOM_ALIASES = {
    "3244": ["media-premiere", "%d0%bc%d0%b5%d0%b4%d1%96%d0%b9%d0%bd%d0%b0-%d0%bf%d1%80%d0%b5%d0%bc%d1%94%d1%80%d0%b0"],
    "3298": ["viva-interview", "%d0%bd%d0%b5%d0%bc%d0%be%d0%b6%d0%bb%d0%b8%d0%b2%d0%be-%d0%b7%d0%bd%d0%b0%d0%b9%d1%82%d0%b8-%d1%82%d0%b5-%d1%89%d0%be-%d0%bd%d1%96%d0%ba%d0%be%d0%bb%d0%b8-%d0%bd%d0%b5-%d0%b3%d1%83%d0%b1%d0%b8"],
}

articles = []
sql_statements = []

for item in channel.findall("item"):
    pt = item.find("{http://wordpress.org/export/1.2/}post_type")
    if pt is None: continue
    raw_pt = ET.tostring(pt, encoding="unicode")
    m = re.search(r"\[CDATA\[(.*?)\]\]", raw_pt)
    val_pt = m.group(1).strip() if m else (pt.text or "").strip()
    if val_pt != "post": continue

    st = item.find("{http://wordpress.org/export/1.2/}status")
    raw_st = ET.tostring(st, encoding="unicode")
    m_st = re.search(r"\[CDATA\[(.*?)\]\]", raw_st)
    val_st = m_st.group(1).strip() if m_st else (st.text or "").strip()
    if val_st != "publish": continue

    pid_el = item.find("{http://wordpress.org/export/1.2/}post_id")
    pid = pid_el.text.strip() if pid_el is not None else ""

    title = (item.find("title").text or "").strip()
    if not title: continue

    pn_el = item.find("{http://wordpress.org/export/1.2/}post_name")
    raw_pn = ET.tostring(pn_el, encoding="unicode") if pn_el is not None else ""
    m_pn = re.search(r"\[CDATA\[(.*?)\]\]", raw_pn)
    raw_slug = (m_pn.group(1).strip() if m_pn else (pn_el.text or "")).strip()

    decoded_slug = urllib.parse.unquote(raw_slug).strip().lower()
    if not decoded_slug:
        decoded_slug = f"post-{pid}"

    date_el = item.find("{http://wordpress.org/export/1.2/}post_date")
    created_at = (date_el.text.strip() if date_el is not None else "").replace(" ", "T")
    date_formatted = format_date_uk(created_at)

    # Categories & tags
    tags = []
    for c in item.findall("category"):
        raw_c = ET.tostring(c, encoding="unicode")
        mc = re.search(r"\[CDATA\[(.*?)\]\]", raw_c)
        v = mc.group(1).strip() if mc else (c.text or "").strip()
        if not v or v in ("Без категорії", "Без рубрики", "Uncategorized", "UA", "RU", "EN"):
            continue
        ct = clean_tag(v)
        if ct and ct not in tags:
            tags.append(ct)

    # Categorization
    if "Новини" in tags or "Події" in tags:
        category = "Новини"
    elif "Творчість" in tags:
        category = "Творчість"
    elif "Екологія" in tags:
        category = "Екологія"
    else:
        category = "Блог"

    if not tags:
        tags = [category]

    # Thumbnail
    thumb_id = None
    for meta in item.findall("{http://wordpress.org/export/1.2/}postmeta"):
        k = meta.find("{http://wordpress.org/export/1.2/}meta_key")
        if k is not None and "_thumbnail_id" in ET.tostring(k, encoding="unicode"):
            v = meta.find("{http://wordpress.org/export/1.2/}meta_value")
            if v is not None:
                raw_v = ET.tostring(v, encoding="unicode")
                mv = re.search(r"\[CDATA\[(.*?)\]\]", raw_v)
                thumb_id = mv.group(1).strip() if mv else (v.text or "").strip()

    cover_image = None
    if thumb_id and thumb_id in attachments:
        raw_url = attachments[thumb_id]
        m = re.search(r"/wp-content/uploads/(.+)$", raw_url)
        if m:
            rel = urllib.parse.unquote(m.group(1))
            copy_upload_file(rel)
            # Check if copy in public/images/posts exists
            local_src = os.path.join(UPLOADS_DIR, rel)
            if not os.path.exists(local_src):
                local_src = os.path.join(UPLOADS_DIR, m.group(1))
            if os.path.exists(local_src):
                base_name = os.path.basename(local_src)
                dest_file = f"wp_{pid}_{base_name}"
                dest_path = os.path.join(PUBLIC_POSTS_DIR, dest_file)
                if not os.path.exists(dest_path):
                    shutil.copy2(local_src, dest_path)
                cover_image = f"/images/posts/{dest_file}"
            else:
                cover_image = f"/wp-content/uploads/{rel}"

    if not cover_image:
        if pid == "3244":
            cover_image = "/images/posts/media-premiere.jpg"
        elif pid == "3298":
            cover_image = "/images/posts/viva-interview.jpg"
        else:
            cover_image = "/images/posts/viva-interview.jpg"

    # Content
    content_el = item.find("{http://purl.org/rss/1.0/modules/content/}encoded")
    raw_c = ET.tostring(content_el, encoding="unicode") if content_el is not None else ""
    mc = re.search(r"\[CDATA\[(.*?)\]\]", raw_c, re.DOTALL)
    raw_content = mc.group(1) if mc else (content_el.text or "")

    content_html = clean_html_content(raw_content)
    paragraphs = extract_paragraphs(content_html)
    if not paragraphs:
        paragraphs = [title]

    excerpt = paragraphs[0][:200] + "..." if len(paragraphs[0]) > 200 else paragraphs[0]

    # Read time
    word_count = len(re.sub(r'<[^>]+>', ' ', content_html).split())
    read_time = f"{max(3, round(word_count / 180))} хв читання"

    # Build aliases
    aliases = list(CUSTOM_ALIASES.get(pid, []))
    if raw_slug and raw_slug not in aliases and raw_slug != decoded_slug:
        aliases.append(raw_slug)
    aliases.append(pid)
    aliases.append(f"wp-{pid}")

    article_obj = {
        "id": f"wp-{pid}",
        "slug": decoded_slug,
        "raw_slug": raw_slug,
        "aliases": aliases,
        "title": title,
        "excerpt": excerpt,
        "category": category,
        "date": date_formatted,
        "created_at": created_at,
        "readTime": read_time,
        "cover_image": cover_image,
        "image": cover_image,
        "tags": tags,
        "contentHtml": content_html,
        "content": paragraphs,
        "published": 1,
        "author": "Ірина Заверуха"
    }
    articles.append(article_obj)

    # Prepare SQL for D1
    title_esc = title.replace("'", "''")
    slug_esc = decoded_slug.replace("'", "''")
    excerpt_esc = excerpt.replace("'", "''")
    cat_esc = category.replace("'", "''")
    date_esc = date_formatted.replace("'", "''")
    created_at_esc = created_at.replace("'", "''")
    cover_esc = cover_image.replace("'", "''")
    tags_esc = json.dumps(tags, ensure_ascii=False).replace("'", "''")
    content_json_esc = json.dumps(paragraphs, ensure_ascii=False).replace("'", "''")
    content_html_esc = content_html.replace("'", "''")
    aliases_esc = json.dumps(aliases, ensure_ascii=False).replace("'", "''")

    sql = f"""INSERT INTO articles (id, slug, title, excerpt, category, date, read_time, cover_image, author, tags, content, content_html, aliases, published, created_at)
VALUES ('wp-{pid}', '{slug_esc}', '{title_esc}', '{excerpt_esc}', '{cat_esc}', '{date_esc}', '{read_time}', '{cover_esc}', 'Ірина Заверуха', '{tags_esc}', '{content_json_esc}', '{content_html_esc}', '{aliases_esc}', 1, '{created_at_esc}')
ON CONFLICT(id) DO UPDATE SET
  slug = '{slug_esc}',
  title = '{title_esc}',
  excerpt = '{excerpt_esc}',
  category = '{cat_esc}',
  date = '{date_esc}',
  read_time = '{read_time}',
  cover_image = '{cover_esc}',
  tags = '{tags_esc}',
  content = '{content_json_esc}',
  content_html = '{content_html_esc}',
  aliases = '{aliases_esc}',
  created_at = '{created_at_esc}';"""
    sql_statements.append(sql)

# Sort articles by created_at DESC
articles.sort(key=lambda x: x["created_at"], reverse=True)

with open(JSON_OUT, "w", encoding="utf-8") as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

with open(SQL_OUT, "w", encoding="utf-8") as f:
    f.write("-- Full articles update from WordPress XML export\n")
    f.write("\n\n".join(sql_statements))
    f.write("\n")

print(f"Exported {len(articles)} articles to {JSON_OUT}")
print(f"Generated SQL to {SQL_OUT}")
