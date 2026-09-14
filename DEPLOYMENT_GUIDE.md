# Інструкція з розгортання сайту zaverukha.com на Cloudflare Pages через GitHub

Цей проєкт повністю трансформовано з WordPress на надсучасне ядро **Next.js 15 (React 19, Tailwind CSS, TypeScript)** у режимі статичної генерації (`output: 'export'`).

---

## Варіант 1: Пряме підключення через панель Cloudflare Pages (Рекомендовано, найпростіше)

Cloudflare Pages має пряму автоматичну інтеграцію з репозиторіями GitHub. Кожного разу, коли ви робите `git push`, Cloudflare самостійно збирає та миттєво оновлює сайт по всьому світу.

### Крок 1. Ініціалізація Git та завантаження на GitHub
Відкрийте термінал у папці проєкту (`/Users/shema/Desktop/projects/Zaverukha/zaverukha.com`):

```bash
# 1. Ініціалізувати git (якщо ще не ініціалізовано)
git init

# 2. Додати файли (старі папки www та tilda автоматично проігноруються завдяки .gitignore)
git add .

# 3. Зробити перший коміт
git commit -m "feat: complete rewrite of zaverukha.com to Next.js for Cloudflare Pages"

# 4. Перейменувати гілку в main
git branch -M main

# 5. Створити порожній репозиторій на GitHub (наприклад, zaverukha-com) та підв'язати його:
git remote add origin https://github.com/ВАШ_ЛОГІН/zaverukha-com.git

# 6. Запушити код
git push -u origin main
```

---

### Крок 2. Підключення в панелі Cloudflare Dashboard
1. Увійдіть у свій акаунт [dash.cloudflare.com](https://dash.cloudflare.com/).
2. У лівому меню оберіть **Compute (Workers & Pages)** → натисніть **Create application** → оберіть вкладку **Pages**.
3. Натисніть **Connect to Git** та виберіть свій репозиторій `zaverukha-com`.
4. Вкажіть налаштування збірки:
   - **Project name**: `zaverukha-com`
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: залишіть порожнім (або `/`)
5. У розділі **Environment variables** додайте змінну для сумісності з Node 22:
   - `NODE_VERSION` = `22`
6. Натисніть **Save and Deploy**.

Через 60 секунд ваш сайт буде доступний за безкоштовною адресою вигляду `zaverukha-com.pages.dev`!

---

### Крок 3. Підключення власного домену zaverukha.com
1. У налаштуваннях вашого проєкту Cloudflare Pages перейдіть у вкладку **Custom domains**.
2. Натисніть **Set up a custom domain**.
3. Введіть `zaverukha.com` (та за бажанням `www.zaverukha.com`).
4. Cloudflare автоматично налаштує безкоштовний SSL-сертифікат та DNS-записи.

---

## Варіант 2: Деплой через Wrangler CLI (командний рядок)

Якщо ви бажаєте розгорнути сайт безпосередньо з вашого комп'ютера без використання веб-панелі:

```bash
# 1. Зібрати проєкт
npm run build

# 2. Опублікувати папку out за допомогою wrangler
npx wrangler pages deploy out --project-name zaverukha-com
```

---

## Локальна перевірка та тестування на комп'ютері

```bash
# Режим розробки з гарячим перезавантаженням (dev):
npm run dev

# Збірка фінальної версії:
npm run build
```
Після команди `npm run dev` відкрийте у браузері [http://localhost:3000](http://localhost:3000).
