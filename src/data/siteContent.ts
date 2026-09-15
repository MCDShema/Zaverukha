import { Article, ARTICLES } from './articles';

export interface CreativityItem {
  id: string;
  category: 'books' | 'music' | 'artifacts';
  title: string;
  image: string;
  badge?: string;
  shortDesc?: string;
  contentHtml?: string;
  buttonText?: string;
  buttonUrl?: string;
  order?: number;
}

export interface SiteContent {
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroImage?: string;
    aboutImage?: string;
    statConsultations: string;
    statProtocols: string;
    statYears: string;
    quote: string;
    coldPoint1Title: string;
    coldPoint1Subtitle: string;
    coldPoint1Desc: string;
    coldPoint2Title: string;
    coldPoint2Subtitle: string;
    coldPoint2Desc: string;
  };
  education: {
    piplIntro: string;
    krylaBannerImage?: string;
    alhimicumBannerImage?: string;
    academiaBannerImage?: string;
    hordyniDesc: string;
    healerDesc: string;
    krylaDesc: string;
    mysteriesDesc: string;
    clubDesc: string;
    socialDesc: string;
    academiaIntro: string;
    degree1Desc: string;
    degree2Desc: string;
    trainerDesc: string;
  };
  consultationCenter: {
    title: string;
    intro: string;
    bannerImage?: string;
    calculatorBannerTitle: string;
    calculatorBannerDesc: string;
    service1Title: string;
    service1Desc: string;
    service2Title: string;
    service2Desc: string;
    service3Title: string;
    service3Desc: string;
    service4Title: string;
    service4Desc: string;
  };
  satsangYoga: {
    intro: string;
    bannerImage?: string;
    meditationsBannerImage?: string;
    divineYogaDesc: string;
    marathonsDesc: string;
    recordedDesc: string;
    meditationDesc: string;
    youtubeYogaPlaylistUrl: string;
    youtubeMeditationsPlaylistUrl: string;
  };
  creativity: {
    intro: string;
    booksBannerImage?: string;
    musicBannerImage?: string;
    artifactsBannerImage?: string;
    items: CreativityItem[];
    // Legacy fields preserved
    book1Title?: string;
    book1Desc?: string;
    book1Image?: string;
    book2Title?: string;
    book2Desc?: string;
    musicBaladaDesc?: string;
    musicShamankaDesc?: string;
    dressDesc?: string;
    dressImage?: string;
    avatarDesc?: string;
    avatarImage?: string;
    cardsDesc?: string;
    instagramShopUrl?: string;
  };
  practices: {
    intro: string;
    plapTitle: string;
    plapSubtitle: string;
    plapPrice: string;
    plapDesc: string;
    recordingsTitle: string;
    recordingsDesc: string;
  };
  contacts: {
    recipientName: string;
    iban: string;
    edrpou: string;
    purpose: string;
    wayForPayUrl: string;
    monobankJarUrl: string;
    monobankProjectUrl: string;
    telegramUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
    facebookUrl: string;
    telegramBotSupportUrl: string;
    telegramBotConsultationUrl: string;
  };
  articles: Article[];
}

export const INITIAL_CONTENT: SiteContent = {
  homepage: {
    heroTitle: 'Ірина Заверуха',
    heroSubtitle: 'Засновниця та пульсар проєктів IMARIA® & PIPL®',
    heroDescription: 'Провідник Нового часу, майстер трансформації свідомості, космоеніопсихолог і містик, цілитель у родовій традиції прямої передачі. Понад 17 років практики та більше 50 000 осіб, які віднайшли свій істинний шлях душі.',
    heroImage: '/images/hero-irina.jpg',
    aboutImage: '/images/about-irina.png',
    statConsultations: '50 000+',
    statProtocols: '3 000+',
    statYears: '17 років',
    quote: '«Кожна людина має побачити на цьому сайті себе, свою етапність та своє священне місце у Всесвіті.»',
    coldPoint1Title: 'Родовий сеанс з ціленням',
    coldPoint1Subtitle: 'Найефективніша точка дотику для нової аудиторії',
    coldPoint1Desc: 'Не вимагає жодних попередніх знань чи підготовки. Безпечний, потужний цілительний процес відновлення енергетичного зв\'язку з джерелом сили роду. Зняття хронічної втоми, блоків у долі та відчуття самотності.',
    coldPoint2Title: 'Мамина і Татова історія',
    coldPoint2Subtitle: 'Курс «Від гордині до гідності» — Базовий крок №1',
    coldPoint2Desc: 'Мама — це гроші, проявленість та любов до себе. Тато — це захист, масштаб та впевненість у світі. Прощення, прийняття та перехід від внутрішньої гордині до істинної гідності.',
  },
  education: {
    piplIntro: 'Це не просто клуб, а цілісна система прикладного духовного навчання та зцілення. Тут зібрані знання для новачків і аматорів, які хочуть налагодити життя, гармонізувати рід та розкрити ресурс, а також програми глибинної трансформації для досвідчених практиків.',
    krylaBannerImage: '/images/banners/kryla-banner.jpg',
    alhimicumBannerImage: '/images/banners/alhimicum-banner.jpg',
    academiaBannerImage: '/images/banners/academia-banner.jpg',
    hordyniDesc: 'Найчастіша причина блоків у грошах, здоров\'ї та коханні — це невирішені конфлікти з першоджерелами нашого життя: мамою і татом. Пройдіть шлях від претензії до благословення.',
    healerDesc: '3 фундаментальні україномовні лекції прямої передачі. Мінімальний рекомендований обсяг знань перед доступом до «ПроРесурсу» та глибоких практик. Продається і окремо.',
    krylaDesc: 'Ієрархічні академічні знання для повної квантової трансформації жінки. Самостійний бренд: річний супровід, прямі ефіри з Іриною Заверухою та глибинна ініціація.',
    mysteriesDesc: 'Об\'єднує сакральні формати: Алхімікум, прямі сакральні Ініціації, виїзні жіночі Кемпи, Родові сеанси та фестивалі Magic Woman Day.',
    clubDesc: 'Регулярний ресурсний простір для підтримки свідомості. Щотижневі прямі ефіри з розбором ситуацій, відповіді на запитання та налаштування на тиждень.',
    socialDesc: '«Іншої планети у нас немає». Простір «Aurum Soul Club» та екосистема PIPL з 2001 року щорічно висаджують гектари лісу, вкорінюючи життя на рідній землі.',
    academiaIntro: 'Сертифікаційний простір вищого рівня для підготовки професійних хілерів, духовних менторів, вібраціологів та організаторів трансформаційних заходів Нового часу.',
    degree1Desc: 'Опанування базових законів тонкого плану, налаштування чистоти власного каналу, техніка безпеки при роботі з клієнтами та діагностика польових структур.',
    degree2Desc: 'Глибокі протоколи родокорекції, читання хронік призначень, квантові спіралі PSY-I та ведення великих трансформаційних груп і ретритів.',
    trainerDesc: 'Навчання аналітично-нумерологічній методиці повної діагностики долі за датою народження (Way of the Soul)®.',
  },
  consultationCenter: {
    title: 'Консультаційний центр',
    intro: 'Простір глибинної трансформації вашої реальності на квантовому рівні. Інтеграція серця, найчистішого цілительного потоку інтуїції та практичного заземлення в матерії.',
    bannerImage: '/images/consultations-banner.jpg',
    calculatorBannerTitle: 'Безкоштовний калькулятор «Путь Душі»',
    calculatorBannerDesc: 'Розрахуйте свої сакральні енергії народження прямо зараз. Це допоможе визначити ключові точки призначення, кармічні завдання та фінансові вузли.',
    service1Title: 'Космоеніопсихологія',
    service1Desc: 'Діагностика енергоінформаційного поля, зняття блоків свідомості та перехід на новий вібраційний рівень.',
    service2Title: 'Діагностика «Путь Душі»',
    service2Desc: 'Аналітичний розбір арканів, призначення душі, родових каналів та кармічних вузлів.',
    service3Title: 'Родокорекція та Цілительство',
    service3Desc: 'Гармонізація ліній роду (мати/батько), зцілення родових сценаріїв та відкриття фінансового потоку.',
    service4Title: 'Йогічна терапія та Бацзи',
    service4Desc: 'Аналіз природного балансу стихій, відновлення життєвих сил тіла та масштабування лідерів.',
  },
  satsangYoga: {
    intro: 'Сакральний простір, де кожен може торкнутися чистоти потоку абсолютно безоплатно. Йога Свідомості (#Divineyoga by IMARIA) та щирі Сатсанги.',
    bannerImage: '/images/satsang-banner.jpg',
    meditationsBannerImage: '/images/meditations-banner.jpg',
    divineYogaDesc: 'Дивань-йога — це адаптована м\'яка йога свідомості, яка підходить кожній людині незалежно від фізичної форми та віку. Робота з мікрорухами, увагою та диханням.',
    marathonsDesc: 'Регулярні онлайн-інтенсиви та сезонні марафони перезавантаження тіла і духу.',
    recordedDesc: 'Золота колекція тематичних вебінарів для самостійного проходження у власному темпі.',
    meditationDesc: 'Медитації спокою, гармонізації та зцілення нервової системи.',
    youtubeYogaPlaylistUrl: 'https://www.youtube.com/playlist?list=PLgH2UWXHbuPEMukG_5LLD-tZAEuvCoVOY',
    youtubeMeditationsPlaylistUrl: 'https://www.youtube.com/playlist?list=PLgH2UWXHbuPH01_nx-GzYHCk6WgY94RJP',
  },
  creativity: {
    intro: 'Мистецтво, народжене в стані чистого цілительного потоку. Книги, музика та фізичні артефакти сили, які зберігають високу вібрацію та допомагають у практиці єднання з Душею.',
    booksBannerImage: '/images/creativity/banner-books.png',
    musicBannerImage: '/images/creativity/banner-music.png',
    artifactsBannerImage: '/images/creativity/banner-artifacts.png',
    items: [
      {
        id: 'book-1',
        category: 'books',
        title: 'Книга «Алхімія живого життя. Пір’я до твоїх крил»',
        image: '/images/creativity/banner-books.png',
        badge: 'В розробці',
        shortDesc: 'Нове сакральне видання про алхімію перетворень, квантові коди долі та розкриття внутрішньої сили жінки-Берегині.',
        contentHtml: '<p>Книга присвячена пробудженню сакральної жіночої природи, поверненню до витоків родової сили та практичній алхімії повсякденного життя.</p><p>Видання знаходиться в процесі активного написання та підготовки до друку.</p>',
        buttonText: 'В розробці',
        buttonUrl: 'https://zaverukha.com/моя-творчість/',
        order: 1,
      },
      {
        id: 'book-2',
        category: 'books',
        title: 'Книга-цілитель “Бесіди з Ангелами”',
        image: '/images/creativity/book-besidy-photo.jpg',
        badge: 'Бестселер',
        shortDesc: 'Це терапевтичні есе та практикуми для Душі, які знайомлять з собою та своїми ресурсами, здібностями, можливостями та божественною безсмертною природою душі.',
        contentHtml: '<p>Це терапевтичні есе та практикуми для Душі, які знайомлять з собою та своїми ресурсами, здібностями, можливостями та божественною безсмертною природою душі.</p><p>Кожна історія може стати для тебе натхненням і містком до змін, якщо ти хочеш:</p><ul><li>навчитися жити “тут і зараз”</li><li>розкрити в собі безумовну любов</li><li>знайти свої потаємні двері у щастя</li><li>з’єднатися з мудрістю серця і насолоджуватися життям</li></ul><p>Кожне слово книги присвячене творенню живого життя і пробудженню душі на Землі.</p>',
        buttonText: 'Придбати книгу',
        buttonUrl: 'https://pipl.net.ua/knyha-besidy-z-anhelamy',
        order: 2,
      },
      {
        id: 'music-1',
        category: 'music',
        title: 'Медійна прем’єра #IMARIACODE',
        image: '/images/posts/2026-06-29-11.34.28.jpg',
        badge: 'Прем\'єра',
        shortDesc: 'Прем\'єра треку, що відкриває гілку реальності для втілення та проявлення цілого альбому #IMARIACODE.',
        contentHtml: '<p>29 червня о 14:14 за київським часом відбулася прем\'єра треку, що відкриває гілку реальності для втілення та проявлення цілого альбому <a href="https://linktr.ee/Zaverukha?utm_source=linktree_admin_share" target="_blank" rel="noopener">#IMARIACODE</a> 🎶.</p><p>Щоб прослухати пісню — вводьте на музичних платформах YouTube Music, Apple Music, Spotify, Instagram — «IMARIA CODE».</p><p>🌳 У день прем’єри пісні IMARIA CODE відкрито збір разом із БФ DEREVOROD на висадку лісу в Україні. Соціальна місія творчості IMARIA — створювати ліси в Україні.</p>',
        buttonText: 'Детальніше про трек',
        buttonUrl: '/news/медійна-премєра',
        order: 1,
      },
      {
        id: 'music-2',
        category: 'music',
        title: 'Нова версія «Балади Берегині» — SHAMANKA by IMARIA',
        image: '/images/creativity/music-shamanka.jpg',
        badge: 'Етно-денс',
        shortDesc: 'Потужна реміксова версія славнозвісної «Балади Берегині» у сучасному електронно-етнічному звучанні.',
        contentHtml: '<p>Нова версія «Балади Берегині» — <b>SHAMANKA by IMARIA</b> відкриває нову грань звучання української пісні-оберегу.</p><p>Це сплав архаїчного цілительного співу, глибинних вібрацій та сучасної електронної ритміки, що пробуджує внутрішній дух незламності.</p><p>Доступно на всіх світових музичних стрімінгах: Apple Music, Spotify, YouTube Music.</p>',
        buttonText: 'Слухати на платформах',
        buttonUrl: 'https://linktr.ee/Zaverukha',
        order: 2,
      },
      {
        id: 'music-3',
        category: 'music',
        title: 'Інструментальна версія Балади Берегині',
        image: '/images/creativity/music-instrumental.jpg',
        badge: 'Медитація',
        shortDesc: 'Чистий інструментальний звуковий потік для глибоких практик, медитацій та зцілення простору.',
        contentHtml: '<p>Інструментальна версія «Балади Берегині» створена спеціально для проведення індивідуальних та групових медитацій, сеансів енергетичного зцілення, йоги та розслаблення нервової системи.</p><p>Звучання живих інструментів у поєднанні з гармонійною частотою звуку дарує стан чистоти, рівноваги та глибокого спокою.</p>',
        buttonText: 'Слухати на YouTube',
        buttonUrl: 'https://www.youtube.com/channel/UCz9oI1MnVkUTH_MCchtZDuA',
        order: 3,
      },
      {
        id: 'music-4',
        category: 'music',
        title: 'Премʼєра кліпу до Балади Берегині',
        image: '/images/creativity/music-clip.jpg',
        badge: 'Відеокліп',
        shortDesc: 'Офіційний відеокліп — візуальне втілення сили української землі, материнської молитви та священного жіночого кола.',
        contentHtml: '<p>Офіційний кліп до «Балади Берегині» — це художня та містична кіно-розповідь про жіноче покликання берегти життя, рід та мир.</p><p>Зйомки проходили в сакральних місцях сили України. Перегляньте відео на офіційному YouTube-каналі та відчуйте вібраційну силу образу.</p>',
        buttonText: 'Дивитися відеокліп',
        buttonUrl: 'https://www.youtube.com/channel/UCz9oI1MnVkUTH_MCchtZDuA',
        order: 4,
      },
      {
        id: 'artifact-1',
        category: 'artifacts',
        title: 'Сукня-Берегиня «Споріднені»',
        image: '/images/creativity/dress-photo.png',
        badge: 'Сакральний одяг',
        shortDesc: 'Квантовий паспорт Берегині богореалізованого роду. Створена в потоці благословення Великої МА у співавторстві з брендом GaEva.',
        contentHtml: '<p>Сукня-кейп для НеоБерегині Землі «Споріднені» створена мною в потоці благословення Великої МА, в співавторстві з майстрами своєї справи, засновницями бренду GaEva – Аліною <a href="https://t.me/alina" target="_blank" rel="noopener">@alina.haieva</a> та Каріною <a href="https://t.me/by_karina_gaeva" target="_blank" rel="noopener">@by_karina_gaeva</a> Гаєвими.</p><p>Її мають у гардеробі та одягають пробуджені жінки задля підсилення торжества живого життя… Бо це не просто одяг, а квантовий паспорт Берегині богореалізованого роду.</p><p><b>В чому її особливість?</b><br />Вона активує в твоєму енерго-інформаційному полі спадщину предків і поєднує її з унікальними кодами твоєї душі. Одягаючи на себе цю форму – ти відроджуєш свою автентичну формулу Суті.</p><p>Сукню «Споріднені» одягає жінка, що прагне пробудити свій Аватар, видихаючи безумовну любов у вимір матерії. Така свідомість, торкаючись простору, запускає процеси живої алхімії.</p><p>Сукня «Споріднені» є прекрасним святковим вбранням для жінки, що створює сімʼю, і для жінки при надії, коли носить під серцем дитину і таким чином активує щасливу долю майбутньої людини через себе як БогоРодицю.</p><p><b>Які послання приховує сукня-кейп "Споріднені"?</b></p><p><b>«Втілення Берегині»</b> — Стріла, що рухається вниз, символізує занурення в глибину сенсів, де проростає зерно потенціалу живого життя крізь матерію і окриляє ту, яка носить сукню, як сакральний спадок...</p><p><b>«Аватар»</b> — Символ єднання усіх стихій, що проявляє цілісність ядра внутрішньої сімʼї, де в точку синергії сходяться потоки мудрості та юності, чоловіча і жіноча божественність...</p><p><b>«Споріднені»</b> — Спори єдиної нені через тло гілки папороті, являють собою безмежну кількість насінин із виміру космічного зоряного пилку...</p><p>Придбати сукню-кейп «Споріднені» можливо під час живих подій IMARIA MASTER або забронювати під свій намір на сторінці <a href="https://www.instagram.com/imaria_space/" target="_blank" rel="noopener">IMARIA SPACE</a>.</p>',
        buttonText: 'Замовити в Instagram',
        buttonUrl: 'https://www.instagram.com/imaria_space/',
        order: 1,
      },
      {
        id: 'artifact-2',
        category: 'artifacts',
        title: 'Обереговий мішечок',
        image: '/images/creativity/bag-photo.png',
        badge: 'Виріб-цілитель',
        shortDesc: 'Виріб-цілитель, створений для тих, хто прагне гармонії та чистоти. Завдяки сакральній геометрії структурує енергію предметів.',
        contentHtml: '<p>Обереговий мішечок – виріб-цілитель, створений для тих, хто прагне гармонії та чистоти.</p><p><b>Як це працює?</b><br />Всередині мішечка, завдяки сакральній геометрії, відбувається квантова робота. Все, що ви туди кладете, стає структурованим, а вібрація символу, втіленого у предметі, діє на зцілення.</p><p>Зберігайте тут усе, що є для вас цінністю: від предметів самовираження до продовження вашого діалогу зі світом. Цей мішечок допоможе зберегти їхню обереговість та силу!</p><p>Створений з природних матеріалів і наповнений абсолютною божественною мотивацією, він ідеально пасує тим, хто цінує екологічне, сакральне та естетичне, поєднуючи духовне з матеріальним.</p><p><b>Оберіть свій розмір:</b><br />🔹️ Маленький (13×26 см)<br />🔸️ Середній (23×26 см)<br />🔹️ Великий (26×30 см)</p><p>Щоб замовити оберегові мішечки переходьте на сторінку <a href="https://www.instagram.com/imaria_space/" target="_blank" rel="noopener">IMARIA SPACE</a>.</p>',
        buttonText: 'Замовити мішечок',
        buttonUrl: 'https://www.instagram.com/imaria_space/',
        order: 2,
      },
      {
        id: 'artifact-3',
        category: 'artifacts',
        title: 'Кулон «Аватар»',
        image: '/images/creativity/avatar-photo.png',
        badge: 'Срібло / Бронза',
        shortDesc: 'Символ взаємодії усіх стихій, що проявляє цілісність ядра внутрішньої сімʼї. Оберіг і ключ доступу до місії галактичної Душі.',
        contentHtml: '<p>Кулон «Аватар» — це символ взаємодії усіх стихій, що проявляє цілісність ядра внутрішньої сімʼї, де в точку синергії сходяться потоки мудрості та юності, чоловіча і жіноча божественність, …єднаючись й пульсуючи крізь простір та в унісон з координатою часу.</p><p>Це і оберіг, і ключ доступу до інформаційного ДНК, що містить в собі памʼять про місію галактичної Душі. Тому символ відчувається на тілі як щит і активує СИЛУ наміру та готовність до дії.</p><p>Коло, в яке вписаний Аватар, це вінок із заповітних бажань твого серця, що і є сонцеворотом (воротами світла!). Живе сонце – це завжди дія! Бо світло любить рух…</p><p><b>Характеристики:</b><br />🔹 Висота: 3,3 см<br />🔸 Ширина: 2,3 см<br />🔹 Вага: 4,9 г<br />🔸 Матеріал: Італійська ювелірна бронза / Срібло<br />🔹 Ручна робота<br />🔸 Не втрачає колір, не деформується, універсальний дизайн<br />🔹 Зроблено в Україні 🇺🇦</p><p>Замовити кулон можна на сторінці <a href="https://www.instagram.com/imaria_space/" target="_blank" rel="noopener">IMARIA SPACE</a>.</p>',
        buttonText: 'Замовити кулон',
        buttonUrl: 'https://www.instagram.com/imaria_space/',
        order: 3,
      },
      {
        id: 'artifact-4',
        category: 'artifacts',
        title: 'Колода “Ключі від живого життя”',
        image: '/images/creativity/cards-photo.png',
        badge: 'Метафоричні карти',
        shortDesc: 'Повноцінний трансформаційний інструмент роботи з собою, інформацією та енергією. Взаємодіє з полем душі.',
        contentHtml: '<p>Колода “Ключі від живого життя” – це повноцінний трансформаційний інструмент роботи з собою, з інформацією, з енергією. Її можна використовувати як для себе, так і як інструмент роботи з іншими людьми.</p><p>З колодою рекомендовано працювати людям допомагаючих професій, які хочуть занурити своїх клієнтів у вимір душі.</p><p>Колода працює з ключами. Ключі – це енергії, коди, шифри до нашої структури. Робота відбувається в полі душі. Рекомендується мати колоду разом з книгою <b><a href="https://pipl.net.ua/knyha-besidy-z-anhelamy" target="_blank" rel="noopener">“Бесіди з Ангелами”</a></b>.</p><p>Колода – один з предметів-цілителів, які взаємодіють з аурою душі, чиста свідомість, де ми всі творці.</p><p>Замовити колоду можна на сторінці <a href="https://www.instagram.com/imaria_space/" target="_blank" rel="noopener">IMARIA SPACE</a>.</p>',
        buttonText: 'Замовити колоду',
        buttonUrl: 'https://www.instagram.com/imaria_space/',
        order: 4,
      },
    ],
    // Legacy fields preserved
    book1Title: '«Бесіди з Ангелами»',
    book1Desc: 'Книга-ініціація, створена в каналі вищих духовних наставників. Відкривається саме на тій сторінці, яка містить точну відповідь на ваш запит.',
    book1Image: '/images/creativity/book.png',
    book2Title: '«Пір\'я до твоїх крил»',
    book2Desc: 'Збірка сакральних віршів, притч та одкровень для кожної жінки, яка розправляє крила своєї внутрішньої Берегині.',
    musicBaladaDesc: '«Балада Берегині» — мистецький інструмент для трансформації свідомості та ініціації сакрального зв\'язку з родом.',
    musicShamankaDesc: 'SHAMANKA by IMARIA — реміксова версія пробуджує родову силу в ритмі космічно-земного імпульсу.',
    dressDesc: 'Сукня Берегині «Споріднені» — вібраційне полотно, що збирає жіночу енергію, не розсіюючи її назовні.',
    dressImage: '/images/creativity/dress.png',
    avatarDesc: 'Кулон-оберіг «АВАТАР» — ювелірний сакральний знак захисту тонких полів.',
    avatarImage: '/images/creativity/amulet.png',
    cardsDesc: 'Метафоричні колоди — інструмент для щоденного інтуїтивного діалогу з підсвідомістю.',
    instagramShopUrl: 'https://www.instagram.com/imaria_space?igsh=MWNrdjJ0dGtsd29jNA==',
  },
  practices: {
    intro: 'Ми прибрали всі застарілі акції та залишили рівно 2 перевірені часом формати з максимальним швидким ефектом.',
    plapTitle: 'Практикум «ПЛАП»',
    plapSubtitle: 'Програма Лояльності Активного Практика (українською мовою)',
    plapPrice: 'до 1000 грн',
    plapDesc: 'Ідеальний крок для тих, хто тільки знайомиться з методикою Ірини Заверухи. Концентрована практична програма щоденних психо-енергетичних протоколів по 10–15 хвилин.',
    recordingsTitle: 'Курси в записі',
    recordingsDesc: 'Тематичні записи занять за всі роки викладання: родова корекція, фінансовий потік, захист простору.',
  },
  contacts: {
    recipientName: 'ФОП Заверуха-Середа Ірина Леонідівна',
    iban: 'UA36 3052 9900 0002 6007 0162 2140 4',
    edrpou: '3041903540',
    purpose: 'Надання інших індивідуальних послуг',
    wayForPayUrl: 'https://secure.wayforpay.com/button/b0f282acd24f0',
    monobankJarUrl: 'https://send.monobank.ua/jar/9bfj5JMRJr',
    monobankProjectUrl: 'https://send.monobank.ua/jar/7BHHP4Tgzd',
    telegramUrl: 'https://t.me/ZaverukhaIrina',
    instagramUrl: 'https://www.instagram.com/imaria_space?igsh=MWNrdjJ0dGtsd29jNA==',
    youtubeUrl: 'https://www.youtube.com/channel/UCz9oI1MnVkUTH_MCchtZDuA',
    facebookUrl: 'https://www.facebook.com/zaverukhairyna.imaria.pipl/',
    telegramBotSupportUrl: 'https://t.me/pipl_platform_bot?start=support',
    telegramBotConsultationUrl: 'https://t.me/pipl_platform_bot?start=consultation',
  },
  articles: ARTICLES,
};
