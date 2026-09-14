'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, Sparkles, ArrowRight, ShieldCheck, UserCheck, Star, Heart, Compass, RotateCcw } from 'lucide-react';

interface ArcanaInfo {
  number: number;
  name: string;
  archetype: string;
  light: string;
  shadow: string;
  guidance: string;
}

const ARCANA_DATA: Record<number, ArcanaInfo> = {
  1: {
    number: 1,
    name: "Маг і Чарівник",
    archetype: "Першовідкривач & Новатор",
    light: "Яскравий інтелект, здатність матеріалізувати думки, лідерство, новаторські ідеї.",
    shadow: "Егоїзм, маніпуляції, невпевненість у своїх силах або гординя.",
    guidance: "Ваше слово має цілительну силу. Творіть свою реальність усвідомлено."
  },
  2: {
    number: 2,
    name: "Єдність і Таїнство (Жриця)",
    archetype: "Хранителька Мудрості & Інтуїція",
    light: "Глибинна інтуїція, зв'язок з тонким світом, дипломатичність, чутливість до людей.",
    shadow: "Плітки, пасивність, скритність, сумніви у власних передчуттях.",
    guidance: "Довіряйте внутрішньому голосу. Ви відчуваєте приховану суть речей."
  },
  3: {
    number: 3,
    name: "Імператриця",
    archetype: "Велика Мати & Процвітання",
    light: "Жіноча сила, достаток, плодючість, краса, вміння створити затишок і статус.",
    shadow: "Контроль, тиск, образи на матір або жінок, надмірна зацикленість на матеріальному.",
    guidance: "Розкривайте безумовне прийняття та дозвольте світу піклуватися про вас."
  },
  4: {
    number: 4,
    name: "Імператор",
    archetype: "Господар & Стабільність",
    light: "Сила волі, організаторський талант, відповідальність, побудова надійних систем.",
    shadow: "Деспотизм, жорсткість, тиск, страх втратити контроль або проблеми з батьком.",
    guidance: "Справжня влада майстра — це мудрість і безпека для тих, хто поруч."
  },
  5: {
    number: 5,
    name: "Верховний Жрець / Учитель",
    archetype: "Провідник Знань & Традицій",
    light: "Прагнення до знань, дар учительства, духовна мораль, авторитет у сім'ї.",
    shadow: "Повчання, фанатизм, гординя інтелекту, неприйняття інших поглядів.",
    guidance: "Передавайте знання з чистого серця, не нав'язуючи власну правоту."
  },
  6: {
    number: 6,
    name: "Закохані (Вибір Серця)",
    archetype: "Безумовна Любов & Краса",
    light: "Вміння любити, естетичний смак, дипломатичність, магнетизм і відкрите серце.",
    shadow: "Залежність від чужої думки, ідеалізм, страх зробити хибний вибір.",
    guidance: "Полюбіть спершу себе цілісно — тоді весь Всесвіт відповість взаємністю."
  },
  7: {
    number: 7,
    name: "Колісниця (Переможець)",
    archetype: "Лідер Шляху & Рух Вперед",
    light: "Цілеспрямованість, активність, вміння керувати командою, подорожі та прорив.",
    shadow: "Агресивність, «хід по головах», лінь або страх рухатися вперед.",
    guidance: "Спрямуйте свою міць на благо людей, тоді кожен рух принесе перемогу."
  },
  8: {
    number: 8,
    name: "Справедливість (Кармічний Закон)",
    archetype: "Рівновага & Причина-Наслідок",
    light: "Розуміння кармічних законів, чесність, надійність, бачення причин будь-яких подій.",
    shadow: "Боротьба за «справедливість», осуд, образливість на долю.",
    guidance: "Усе в житті закономірно. Прийміть уроки Всесвіту з вдячністю."
  },
  9: {
    number: 9,
    name: "Мудрець (Відлюдник)",
    archetype: "Глибинна Мудрість & Зрілість",
    light: "Глибина мислення, самодостатність, філософський погляд, цілительство душі.",
    shadow: "Замкнутість, самотність, інтелектуальна гординя, страх бідності.",
    guidance: "Діліться світлом своєї мудрості зі світом, не ховаючи його в собі."
  },
  10: {
    number: 10,
    name: "Колесо Фортуни (Потік Долі)",
    archetype: "Щасливий Випадок & Легкість",
    light: "Життя в потоці, довіра до Всесвіту, легкість на підйом, інтуїтивні синхронії.",
    shadow: "Пасивність, лінь, страх змін, невміння чути знаки Всесвіту.",
    guidance: "Розслабтеся і довіртеся течії життя — вона несе вас до найкращого призначення."
  },
  11: {
    number: 11,
    name: "Сила і Потенціал",
    archetype: "Цілитель Енергій & Воїн Світла",
    light: "Колосальний енергетичний потенціал, працелюбність, здатність надихати тисячі.",
    shadow: "Перевтома, тиск на інших, спалахи гніву або знецінення свого тіла.",
    guidance: "Чергуйте великі звершення зі спокоєм і відновленням у практиках."
  },
  12: {
    number: 12,
    name: "Служіння та Нове Бачення",
    archetype: "Безумовне Служіння & Емпатія",
    light: "Новаторський нестандартний погляд, чуйність, дар підтримки і зцілення через любов.",
    shadow: "Синдром жертви, невміння казати «ні», застрягання в жалю до себе.",
    guidance: "Служіть світові з надлишку власної любові, а не ціною власної жертви."
  },
  13: {
    number: 13,
    name: "Трансформація та Переродження",
    archetype: "Алхімік & Оновлення Свідомості",
    light: "Здатність легко відпускати старе, оновлювати процеси, виводити людей з кризи.",
    shadow: "Страх смерті/змін, застій, тримання за минуле, руйнівний ризик.",
    guidance: "Кінець — це завжди початок. Відпускаючи старе, ви відкриваєте портал дивам."
  },
  14: {
    number: 14,
    name: "Поміркованість і Душа",
    archetype: "Цілитель Душ & Золотий Перетин",
    light: "Терплячість, тонка душевна організація, зв'язок з Ангелами, відчуття міри.",
    shadow: "Нетерплячість, крайнощі, невіра в талант, закритість від людей.",
    guidance: "Слухайте тишу своєї душі. Ваша гармонія зцілює простір навколо."
  },
  15: {
    number: 15,
    name: "Проявлення Тіні (Харизма)",
    archetype: "Майстер Енергії & Бачення Наскрізь",
    light: "Шалений магнетизм, вміння бачити приховану правду, управління великими фінансами.",
    shadow: "Маніпуляції, ревнощі, залежності, жага влади або саморуйнування.",
    guidance: "Освятіть свою тіньову сторону любов'ю — і вона стане вашим найбільшим джерелом сили."
  },
  16: {
    number: 16,
    name: "Духовне Пробудження (Вежа)",
    archetype: "Трансформатор Форм & Будівничий",
    light: "Вміння руйнувати застарілі ілюзії, будувати заново, духовна стійкість, лідерство змін.",
    shadow: "Раптові кризи, агресія, руйнація стосунків через небажання духовно рости.",
    guidance: "Будуйте своє життя на непорушному фундаменті істинних духовних цінностей."
  },
  17: {
    number: 17,
    name: "Зірка (Проявлена Творчість)",
    archetype: "Митець & Проявлений Талант",
    light: "Яскравий творчий дар, інтуїтивна чистота, популярність, натхнення для інших.",
    shadow: "«Зіркова хвороба», сірість, невпевненість у своїй унікальності.",
    guidance: "Сяйте яскраво і не бійтеся бути на видноті — ваше світло потрібне планеті."
  },
  18: {
    number: 18,
    name: "Місяць (Таємниці Підсвідомості)",
    archetype: "Магічна Уява & Провідник Снів",
    light: "Колосальна сила матеріалізації думок, містичні здібності, психологічний дар.",
    shadow: "Ілюзії, страхи, сумніви, тривожність, чорна магія або самообман.",
    guidance: "Фокусуйте думки тільки на світлому і бажанному — те, про що ви думаєте, миттєво збувається."
  },
  19: {
    number: 19,
    name: "Сонце (Радість і Процвітання)",
    archetype: "Сонцесяйний Лідер & Щедрість",
    light: "Оптимізм, лідерство масштабних проєктів, фінансовий добробут, тепло душі.",
    shadow: "Самоїдство, агресія, спалювання оточуючих своєю владною енергією.",
    guidance: "Зігрівайте світ своєю радістю, діліться благами і ведіть людей за собою."
  },
  20: {
    number: 20,
    name: "Благословення Роду",
    archetype: "Цілитель Роду & Провідник Епохи",
    light: "Міцний родовий зв'язок, яснознання, масштабне мислення, місія відродження.",
    shadow: "Родові образи, судові позови з родичами, страх заявити про покликання.",
    guidance: "Ви — той, хто прийшов очистити й піднести силу свого роду до небес."
  },
  21: {
    number: 21,
    name: "Всесвіт і Розширення",
    archetype: "Громадянин Світу & Миротворець",
    light: "Глобальне мислення, толерантність, міжнародні проєкти, абсолютне прийняття світу.",
    shadow: "Ворожість до інших народів, вузькість поглядів, страх глобальних масштабів.",
    guidance: "Для вас немає кордонів. Весь Всесвіт — ваш дім і простір для розквіту."
  },
  22: {
    number: 22,
    name: "Вища Духовна Свобода",
    archetype: "Вільна Душа & Чистий Початок",
    light: "Легкість, довіра до життя, почуття гумору, духовна свобода без прив'язок.",
    shadow: "Безвідповідальність, нерозсудливість, відчуття внутрішньої в'язниці.",
    guidance: "Життя — це священна гра. Грайте в неї легко, з радістю та чистою душею дитини."
  }
};

function reduceTo22(num: number): number {
  if (num <= 0) return 22;
  while (num > 22) {
    const sum = String(num).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    num = sum;
    if (num <= 22) break;
  }
  return num === 0 ? 22 : num;
}

export default function SoulPathCalculator() {
  const [day, setDay] = useState<number | ''>('');
  const [month, setMonth] = useState<number | ''>('');
  const [year, setYear] = useState<number | ''>('');
  const [result, setResult] = useState<{
    personalEnergy: ArcanaInfo;
    talentEnergy: ArcanaInfo;
    karmicBaseEnergy: ArcanaInfo;
    comfortEnergy: ArcanaInfo;
    destinyEnergy: ArcanaInfo;
    yearEnergy: ArcanaInfo;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !month || !year) return;

    // 1. Personal Energy (Day)
    const e1 = reduceTo22(Number(day));
    
    // 2. Talents & Intuition (Month)
    const e2 = reduceTo22(Number(month));
    
    // 3. Karmic Base & Past (Year sum)
    const yearDigitsSum = String(year).split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
    const e3 = reduceTo22(yearDigitsSum);
    
    // 4. Soul Comfort Zone (e1 + e2 + e3)
    const e4 = reduceTo22(e1 + e2 + e3);
    
    // 5. Destiny & Global Mission (e1 + e2 + e3 + e4)
    const e5 = reduceTo22(e1 + e2 + e3 + e4);

    // 6. Energy of Current Year 2026 (e1 + e2 + 2+0+2+6)
    const currentYearSum = 2 + 0 + 2 + 6; // 10
    const e6 = reduceTo22(e1 + e2 + currentYearSum);

    setResult({
      personalEnergy: ARCANA_DATA[e1],
      talentEnergy: ARCANA_DATA[e2],
      karmicBaseEnergy: ARCANA_DATA[e3],
      comfortEnergy: ARCANA_DATA[e4],
      destinyEnergy: ARCANA_DATA[e5],
      yearEnergy: ARCANA_DATA[e6],
    });
  };

  const handleReset = () => {
    setDay('');
    setMonth('');
    setYear('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* INPUT FORM CARD */}
      <div className="sacred-card rounded-2xl p-6 sm:p-8 border border-sacred-gold/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sacred-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-sacred-blue/30 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sacred-gold/15 border border-sacred-gold/40 text-sacred-goldLight text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sacred-gold" />
            <span>Безкоштовна експрес-діагностика долі</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-semibold">
            Розрахуйте свій <span className="gold-text-gradient">«Путь Душі»</span>
          </h2>
          <p className="text-sm text-white/70 mt-2">
            Введіть дату вашого народження, щоб розкрити 5 ключових енергій матриці призначень за авторською методикою Ірини Заверухи (Way of the Soul)®.
          </p>
        </div>

        <form onSubmit={calculate} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="calc-day" className="block text-xs font-semibold text-sacred-goldLight uppercase tracking-wider mb-2">
                День народження
              </label>
              <input
                id="calc-day"
                type="number"
                min="1"
                max="31"
                required
                placeholder="Наприклад: 14"
                value={day}
                onChange={(e) => setDay(e.target.value ? parseInt(e.target.value, 10) : '')}
                className="w-full bg-sacred-dark/80 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sacred-gold/20 text-center text-lg font-medium transition-all"
              />
            </div>

            <div>
              <label htmlFor="calc-month" className="block text-xs font-semibold text-sacred-goldLight uppercase tracking-wider mb-2">
                Місяць народження
              </label>
              <input
                id="calc-month"
                type="number"
                min="1"
                max="12"
                required
                placeholder="Наприклад: 9"
                value={month}
                onChange={(e) => setMonth(e.target.value ? parseInt(e.target.value, 10) : '')}
                className="w-full bg-sacred-dark/80 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sacred-gold/20 text-center text-lg font-medium transition-all"
              />
            </div>

            <div>
              <label htmlFor="calc-year" className="block text-xs font-semibold text-sacred-goldLight uppercase tracking-wider mb-2">
                Рік народження
              </label>
              <input
                id="calc-year"
                type="number"
                min="1920"
                max="2030"
                required
                placeholder="Наприклад: 1992"
                value={year}
                onChange={(e) => setYear(e.target.value ? parseInt(e.target.value, 10) : '')}
                className="w-full bg-sacred-dark/80 border border-white/20 focus:border-sacred-gold rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sacred-gold/20 text-center text-lg font-medium transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full sacred-gold-btn flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-semibold hover:scale-105 transition-all shadow-lg"
            >
              <Calculator className="w-4 h-4 text-sacred-dark" />
              <span>Отримати розрахунок матриці</span>
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Скинути</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="mt-8 space-y-6 animate-fadeIn">
          
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-serif text-white">
              Ваші ключові сакральні коди долі:
            </h3>
            <p className="text-xs sm:text-sm text-sacred-goldLight mt-1">
              Дата: {day}.{month}.{year} • Закони гармонії та квантового розвитку
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1. Особистісна Енергія */}
            <div className="sacred-card rounded-xl p-5 border border-sacred-gold/40 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-sacred-gold uppercase tracking-wider">
                  Енергія Проявлення (День)
                </span>
                <span className="w-8 h-8 rounded-full bg-sacred-gold text-sacred-dark font-bold text-sm flex items-center justify-center shadow">
                  {result.personalEnergy.number}
                </span>
              </div>
              <h4 className="text-lg font-serif text-white font-medium">{result.personalEnergy.name}</h4>
              <p className="text-xs text-sacred-goldLight mb-2">{result.personalEnergy.archetype}</p>
              <p className="text-xs text-white/80 leading-relaxed"><strong className="text-white">Ресурс:</strong> {result.personalEnergy.light}</p>
              <p className="text-xs text-white/60 mt-1"><strong className="text-white/70">Тінь:</strong> {result.personalEnergy.shadow}</p>
            </div>

            {/* 2. Таланти та Інтуїція */}
            <div className="sacred-card rounded-xl p-5 border border-sacred-gold/40 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-sacred-gold uppercase tracking-wider">
                  Таланти & Інтуїція (Місяць)
                </span>
                <span className="w-8 h-8 rounded-full bg-sacred-gold text-sacred-dark font-bold text-sm flex items-center justify-center shadow">
                  {result.talentEnergy.number}
                </span>
              </div>
              <h4 className="text-lg font-serif text-white font-medium">{result.talentEnergy.name}</h4>
              <p className="text-xs text-sacred-goldLight mb-2">{result.talentEnergy.archetype}</p>
              <p className="text-xs text-white/80 leading-relaxed"><strong className="text-white">Ресурс:</strong> {result.talentEnergy.light}</p>
              <p className="text-xs text-white/60 mt-1"><strong className="text-white/70">Тінь:</strong> {result.talentEnergy.shadow}</p>
            </div>

            {/* 3. Кармічний Багаж */}
            <div className="sacred-card rounded-xl p-5 border border-sacred-gold/40 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-sacred-gold uppercase tracking-wider">
                  Кармічний досвід (Рік)
                </span>
                <span className="w-8 h-8 rounded-full bg-sacred-gold text-sacred-dark font-bold text-sm flex items-center justify-center shadow">
                  {result.karmicBaseEnergy.number}
                </span>
              </div>
              <h4 className="text-lg font-serif text-white font-medium">{result.karmicBaseEnergy.name}</h4>
              <p className="text-xs text-sacred-goldLight mb-2">{result.karmicBaseEnergy.archetype}</p>
              <p className="text-xs text-white/80 leading-relaxed"><strong className="text-white">Ресурс:</strong> {result.karmicBaseEnergy.light}</p>
              <p className="text-xs text-white/60 mt-1"><strong className="text-white/70">Тінь:</strong> {result.karmicBaseEnergy.shadow}</p>
            </div>

            {/* 4. Точка Комфорту Душі */}
            <div className="sacred-card rounded-xl p-5 border border-sacred-gold/40 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-sacred-gold uppercase tracking-wider">
                  Точка комфорту душі
                </span>
                <span className="w-8 h-8 rounded-full bg-sacred-gold text-sacred-dark font-bold text-sm flex items-center justify-center shadow">
                  {result.comfortEnergy.number}
                </span>
              </div>
              <h4 className="text-lg font-serif text-white font-medium">{result.comfortEnergy.name}</h4>
              <p className="text-xs text-sacred-goldLight mb-2">{result.comfortEnergy.archetype}</p>
              <p className="text-xs text-white/80 leading-relaxed"><strong className="text-white">Ресурс:</strong> {result.comfortEnergy.light}</p>
              <p className="text-xs text-white/60 mt-1"><strong className="text-white/70">Тінь:</strong> {result.comfortEnergy.shadow}</p>
            </div>

            {/* 5. Головне Призначення */}
            <div className="sacred-card rounded-xl p-5 border-2 border-sacred-gold relative bg-sacred-gold/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-sacred-goldLight uppercase tracking-wider">
                  ★ Головне Призначення
                </span>
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-sacred-gold to-sacred-goldHover text-sacred-dark font-extrabold text-sm flex items-center justify-center shadow-lg">
                  {result.destinyEnergy.number}
                </span>
              </div>
              <h4 className="text-lg font-serif text-white font-medium">{result.destinyEnergy.name}</h4>
              <p className="text-xs text-sacred-goldLight mb-2">{result.destinyEnergy.archetype}</p>
              <p className="text-xs text-white/90 leading-relaxed"><strong className="text-sacred-goldLight">Послання:</strong> {result.destinyEnergy.guidance}</p>
            </div>

            {/* 6. Енергія Року */}
            <div className="sacred-card rounded-xl p-5 border border-sacred-gold/40 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-sacred-gold uppercase tracking-wider">
                  Енергія поточного року
                </span>
                <span className="w-8 h-8 rounded-full bg-sacred-gold text-sacred-dark font-bold text-sm flex items-center justify-center shadow">
                  {result.yearEnergy.number}
                </span>
              </div>
              <h4 className="text-lg font-serif text-white font-medium">{result.yearEnergy.name}</h4>
              <p className="text-xs text-sacred-goldLight mb-2">{result.yearEnergy.archetype}</p>
              <p className="text-xs text-white/80 leading-relaxed"><strong className="text-white">Фокус року:</strong> {result.yearEnergy.light}</p>
            </div>

          </div>

          {/* CTA BANNER: Deep Consultation */}
          <div className="bg-gradient-to-r from-sacred-blue via-sacred-indigo to-sacred-night p-6 sm:p-8 rounded-2xl border border-sacred-gold/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="text-xl font-serif text-white font-semibold">
                Бажаєте отримати повний глибинний розбір матриці долі?
              </h4>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
                Сертифіковані майстри Консультаційного центру Ірини Заверухи проведуть індивідуальну діагностику родових каналів, фінансів та призначення.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/consultation-center"
                className="sacred-gold-btn px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
              >
                <span>Замовити консультацію</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
