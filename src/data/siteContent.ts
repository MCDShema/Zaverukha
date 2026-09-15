import { Article, ARTICLES } from './articles';

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
    book1Title: string;
    book1Desc: string;
    book1Image?: string;
    book2Title: string;
    book2Desc: string;
    musicBaladaDesc: string;
    musicShamankaDesc: string;
    dressDesc: string;
    dressImage?: string;
    avatarDesc: string;
    avatarImage?: string;
    cardsDesc: string;
    instagramShopUrl: string;
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
    intro: 'Мистецтво, народжене в стані чистого цілительного потоку. Книги, музика та фізичні артефакти сили, які зберігають високу вібрацію.',
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
