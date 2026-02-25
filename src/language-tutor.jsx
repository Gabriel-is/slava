import { useState, useEffect, useRef, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════
// LANGUAGE DATA
// ══════════════════════════════════════════════════════════════════

const LANGS = {
  uk: {
    code: "uk", name: "Ukrainian", flag: "🇺🇦", speechCode: "uk-UA",
    greeting: "Привіт! Ласкаво просимо!",
    alphabet: {
      name: "Ukrainian Cyrillic",
      letters: [
        { char: "А а", romanize: "a", phonetic: "ah — 'a' in 'father'", example: "авто", exEn: "auto", exPhonetic: "AHV-toh" },
        { char: "Б б", romanize: "b", phonetic: "b — 'b' in 'boy'", example: "банк", exEn: "bank", exPhonetic: "bahnk" },
        { char: "В в", romanize: "v", phonetic: "v — 'v' in 'van'", example: "вода", exEn: "water", exPhonetic: "voh-DAH" },
        { char: "Г г", romanize: "h", phonetic: "h — breathy 'h' in 'hello'", example: "гарний", exEn: "nice", exPhonetic: "HAR-nyy" },
        { char: "Ґ ґ", romanize: "g", phonetic: "g — hard 'g' in 'go'", example: "ґанок", exEn: "porch", exPhonetic: "GAH-nok" },
        { char: "Д д", romanize: "d", phonetic: "d — 'd' in 'dog'", example: "дім", exEn: "house", exPhonetic: "deem" },
        { char: "Е е", romanize: "e", phonetic: "eh — 'e' in 'bet'", example: "екран", exEn: "screen", exPhonetic: "eh-KRAHN" },
        { char: "Є є", romanize: "ye", phonetic: "yeh — 'ye' in 'yet'", example: "Європа", exEn: "Europe", exPhonetic: "yev-ROH-pah" },
        { char: "Ж ж", romanize: "zh", phonetic: "zh — 's' in 'measure'", example: "життя", exEn: "life", exPhonetic: "zhyt-TYAH" },
        { char: "З з", romanize: "z", phonetic: "z — 'z' in 'zoo'", example: "зима", exEn: "winter", exPhonetic: "zy-MAH" },
        { char: "И и", romanize: "y", phonetic: "ih — short 'i' in 'bit'", example: "книга", exEn: "book", exPhonetic: "KNYH-hah" },
        { char: "І і", romanize: "i", phonetic: "ee — 'ee' in 'see'", example: "ім'я", exEn: "name", exPhonetic: "EEM-yah" },
        { char: "Ї ї", romanize: "yi", phonetic: "yee — 'yee' in 'yeet'", example: "їжа", exEn: "food", exPhonetic: "YEE-zhah" },
        { char: "Й й", romanize: "y", phonetic: "y — glide 'y' in 'boy'", example: "йогурт", exEn: "yogurt", exPhonetic: "YOH-hoort" },
        { char: "К к", romanize: "k", phonetic: "k — 'k' in 'kite'", example: "кава", exEn: "coffee", exPhonetic: "KAH-vah" },
        { char: "Л л", romanize: "l", phonetic: "l — 'l' in 'lamp'", example: "любов", exEn: "love", exPhonetic: "lyu-BOHV" },
        { char: "М м", romanize: "m", phonetic: "m — 'm' in 'mom'", example: "мама", exEn: "mom", exPhonetic: "MAH-mah" },
        { char: "Н н", romanize: "n", phonetic: "n — 'n' in 'no'", example: "ніч", exEn: "night", exPhonetic: "neech" },
        { char: "О о", romanize: "o", phonetic: "oh — 'o' in 'more'", example: "око", exEn: "eye", exPhonetic: "OH-koh" },
        { char: "П п", romanize: "p", phonetic: "p — 'p' in 'pan'", example: "парк", exEn: "park", exPhonetic: "pahrk" },
        { char: "Р р", romanize: "r", phonetic: "r — rolled like Spanish", example: "ранок", exEn: "morning", exPhonetic: "RAH-nok" },
        { char: "С с", romanize: "s", phonetic: "s — 's' in 'sun'", example: "сонце", exEn: "sun", exPhonetic: "SOHN-tseh" },
        { char: "Т т", romanize: "t", phonetic: "t — 't' in 'top'", example: "так", exEn: "yes", exPhonetic: "tahk" },
        { char: "У у", romanize: "u", phonetic: "oo — 'oo' in 'food'", example: "учень", exEn: "student", exPhonetic: "OO-chehn" },
        { char: "Ф ф", romanize: "f", phonetic: "f — 'f' in 'fan'", example: "фото", exEn: "photo", exPhonetic: "FOH-toh" },
        { char: "Х х", romanize: "kh", phonetic: "kh — 'ch' in Scottish 'loch'", example: "хліб", exEn: "bread", exPhonetic: "khleeb" },
        { char: "Ц ц", romanize: "ts", phonetic: "ts — 'ts' in 'cats'", example: "цукор", exEn: "sugar", exPhonetic: "TSOO-kor" },
        { char: "Ч ч", romanize: "ch", phonetic: "ch — 'ch' in 'church'", example: "час", exEn: "time", exPhonetic: "chahs" },
        { char: "Ш ш", romanize: "sh", phonetic: "sh — 'sh' in 'ship'", example: "школа", exEn: "school", exPhonetic: "SHKOH-lah" },
        { char: "Щ щ", romanize: "shch", phonetic: "shch — 'sh-ch' in 'fresh cheese'", example: "щастя", exEn: "happiness", exPhonetic: "SHCHAHS-tyah" },
        { char: "Ь ь", romanize: "ʼ", phonetic: "soft sign — softens preceding consonant", example: "сіль", exEn: "salt", exPhonetic: "seel'" },
        { char: "Ю ю", romanize: "yu", phonetic: "yoo — like 'you'", example: "юнак", exEn: "youth", exPhonetic: "yoo-NAHK" },
        { char: "Я я", romanize: "ya", phonetic: "yah — 'ya' in 'yard'", example: "яблуко", exEn: "apple", exPhonetic: "YAHB-loo-koh" },
      ],
    },
    softSign: {
      title: "The Soft Sign (Ь) — М'який знак",
      intro: "The soft sign doesn't have its own sound. It palatalizes (softens) the consonant before it — imagine adding a tiny, quick 'y' sound. Your tongue moves toward the roof of your mouth.",
      pairs: [
        { hard: "н", soft: "нь", hardWord: "кон", hardEn: "horse (archaic)", hardPh: "kohn", softWord: "конь", softEn: "horse", softPh: "kohn'", tip: "Hard н: tongue behind teeth. Soft нь: tongue rises to palate, like starting 'ny'" },
        { hard: "л", soft: "ль", hardWord: "кол", hardEn: "stake", hardPh: "kohl", softWord: "кіль", softEn: "keel", softPh: "keel'", tip: "Hard л: thick L behind teeth. Soft ль: thin L, like 'l' in 'million'" },
        { hard: "т", soft: "ть", hardWord: "рат", hardEn: "glad (root)", hardPh: "raht", softWord: "рать", softEn: "army", softPh: "raht'", tip: "Hard т: firm T. Soft ть: like 't' in British 'Tuesday' (tyooz-day)" },
        { hard: "с", soft: "сь", hardWord: "коса", hardEn: "braid", hardPh: "koh-SAH", softWord: "просьба", softEn: "request", softPh: "PROHS'-bah", tip: "Hard с: clean S. Soft сь: tongue closer to palate, hint of 'sh'" },
        { hard: "д", soft: "дь", hardWord: "сад", hardEn: "garden", hardPh: "sahd", softWord: "будь", softEn: "be!", softPh: "bood'", tip: "Hard д: firm D. Soft дь: like 'd' in British 'duke' (dyook)" },
      ],
      apostrophe: {
        title: "The Apostrophe (') — Апостроф",
        text: "Keeps a consonant HARD before я, ю, є, ї. Without it, these letters would soften the consonant.",
        examples: [
          { word: "м'яч", ph: "MYAHCH", en: "ball", note: "м stays hard, then я starts new syllable" },
          { word: "п'ять", ph: "PYAHT'", en: "five", note: "п stays hard, я starts fresh" },
          { word: "ім'я", ph: "EEM-yah", en: "name", note: "without apostrophe, м would soften" },
          { word: "м'ясо", ph: "MYAH-soh", en: "meat", note: "hard м, then ya-so" },
        ],
      },
    },
    cases: [
      { name: "Nominative", ukr: "Називний", q: "хто? що?", use: "Subject", ex: "Кіт спить.", en: "The cat sleeps.", ph: "keet spyt'" },
      { name: "Genitive", ukr: "Родовий", q: "кого? чого?", use: "Possession/absence", ex: "Немає кота.", en: "No cat.", ph: "neh-MAH-yeh koh-TAH" },
      { name: "Dative", ukr: "Давальний", q: "кому? чому?", use: "Indirect object", ex: "Дай коту.", en: "Give to the cat.", ph: "dahy koh-TOO" },
      { name: "Accusative", ukr: "Знахідний", q: "кого? що?", use: "Direct object", ex: "Бачу кота.", en: "I see the cat.", ph: "BAH-choo koh-TAH" },
      { name: "Instrumental", ukr: "Орудний", q: "ким? чим?", use: "By means of", ex: "З котом.", en: "With the cat.", ph: "z koh-TOHM" },
      { name: "Locative", ukr: "Місцевий", q: "на кому?", use: "Location/about", ex: "Про кота.", en: "About the cat.", ph: "proh koh-TAH" },
      { name: "Vocative", ukr: "Кличний", q: "—", use: "Addressing", ex: "Коте!", en: "Hey cat!", ph: "KOH-teh" },
    ],
    genders: ["Masculine (чоловічий)", "Feminine (жіночий)", "Neuter (середній)"],
  },
  ja: {
    code: "ja", name: "Japanese", flag: "🇯🇵", speechCode: "ja-JP",
    greeting: "こんにちは！ようこそ！",
    alphabet: { name: "Hiragana (ひらがな)", letters: [
      { char: "あ", romanize: "a", phonetic: "ah — 'a' in 'father'", example: "あさ", exEn: "morning", exPhonetic: "AH-sah" },
      { char: "い", romanize: "i", phonetic: "ee — 'ee' in 'see'", example: "いぬ", exEn: "dog", exPhonetic: "EE-noo" },
      { char: "う", romanize: "u", phonetic: "oo — short 'oo' in 'food'", example: "うみ", exEn: "sea", exPhonetic: "OO-mee" },
      { char: "え", romanize: "e", phonetic: "eh — 'e' in 'bet'", example: "えき", exEn: "station", exPhonetic: "EH-kee" },
      { char: "お", romanize: "o", phonetic: "oh — 'o' in 'more'", example: "おちゃ", exEn: "tea", exPhonetic: "oh-CHAH" },
      { char: "か", romanize: "ka", phonetic: "kah", example: "かさ", exEn: "umbrella", exPhonetic: "KAH-sah" },
      { char: "き", romanize: "ki", phonetic: "kee", example: "きく", exEn: "listen", exPhonetic: "KEE-koo" },
      { char: "く", romanize: "ku", phonetic: "koo", example: "くち", exEn: "mouth", exPhonetic: "KOO-chee" },
      { char: "け", romanize: "ke", phonetic: "keh", example: "けさ", exEn: "this morning", exPhonetic: "KEH-sah" },
      { char: "こ", romanize: "ko", phonetic: "koh", example: "こども", exEn: "child", exPhonetic: "koh-DOH-moh" },
      { char: "さ", romanize: "sa", phonetic: "sah", example: "さかな", exEn: "fish", exPhonetic: "sah-KAH-nah" },
      { char: "し", romanize: "shi", phonetic: "shee (not 'see')", example: "しろ", exEn: "white", exPhonetic: "SHEE-roh" },
      { char: "す", romanize: "su", phonetic: "soo (often whispered)", example: "すし", exEn: "sushi", exPhonetic: "SOO-shee" },
      { char: "た", romanize: "ta", phonetic: "tah", example: "たべる", exEn: "eat", exPhonetic: "tah-BEH-roo" },
      { char: "な", romanize: "na", phonetic: "nah", example: "なつ", exEn: "summer", exPhonetic: "NAH-tsoo" },
      { char: "は", romanize: "ha", phonetic: "hah (as particle: wah)", example: "はな", exEn: "flower", exPhonetic: "HAH-nah" },
      { char: "ま", romanize: "ma", phonetic: "mah", example: "まち", exEn: "town", exPhonetic: "MAH-chee" },
      { char: "や", romanize: "ya", phonetic: "yah", example: "やま", exEn: "mountain", exPhonetic: "YAH-mah" },
      { char: "ら", romanize: "ra", phonetic: "between r, l, and d", example: "りんご", exEn: "apple", exPhonetic: "REEN-goh" },
      { char: "わ", romanize: "wa", phonetic: "wah", example: "わたし", exEn: "I/me", exPhonetic: "wah-TAH-shee" },
      { char: "ん", romanize: "n", phonetic: "nasal n", example: "にほん", exEn: "Japan", exPhonetic: "nee-HOHN" },
    ]},
    particles: [
      { name: "は (wa)", use: "Topic marker", ex: "私は学生です。", en: "I am a student.", ph: "wah-TAH-shee wah GAHK-seh deh-soo" },
      { name: "が (ga)", use: "Subject marker", ex: "猫がいます。", en: "There is a cat.", ph: "NEH-koh gah ee-MAH-soo" },
      { name: "を (wo)", use: "Object marker", ex: "水を飲みます。", en: "I drink water.", ph: "MEE-zoo oh noh-mee-MAH-soo" },
      { name: "に (ni)", use: "Direction/time", ex: "学校に行きます。", en: "I go to school.", ph: "GAHK-koh nee ee-kee-MAH-soo" },
      { name: "で (de)", use: "Location/means", ex: "公園で遊びます。", en: "I play at the park.", ph: "KOH-ehn deh ah-soh-bee-MAH-soo" },
      { name: "の (no)", use: "Possession", ex: "私の本。", en: "My book.", ph: "wah-TAH-shee noh HOHN" },
    ],
    genders: [],
  },
};

// ─── LESSON DATA ──────────────────────────────────────────────────
const UK_LESSONS = [
  {
    id: "greet-1", cat: "🤝 Greetings", title: "Hello & How Are You",
    phrase: { uk: "Як справи?", ph: "yahk SPRAH-vyh", en: "How are things? / How are you?" },
    morphs: [
      { uk: "Як у тебе справи?", ph: "yahk oo TEH-beh SPRAH-vyh", en: "How are things with you? (informal)", note: "тебе = genitive of ти (you)" },
      { uk: "Як у вас справи?", ph: "yahk oo VAHS SPRAH-vyh", en: "How are things with you? (formal)", note: "вас = genitive of ви (you, formal)" },
      { uk: "Добре, дякую!", ph: "DOHB-reh, DYAH-koo-yoo", en: "Good, thank you!", note: "Common response" },
      { uk: "Непогано.", ph: "neh-poh-HAH-noh", en: "Not bad.", note: "Casual response" },
    ],
  },
  {
    id: "quest-1", cat: "❓ Questions", title: "Where Is...?",
    phrase: { uk: "Де є...?", ph: "deh yeh...?", en: "Where is...?" },
    morphs: [
      { uk: "Де є магазин?", ph: "deh yeh mah-hah-ZYHN", en: "Where is the store?", note: "магазин (masc.) — nominative, no change" },
      { uk: "Де є аптека?", ph: "deh yeh ahp-TEH-kah", en: "Where is the pharmacy?", note: "аптека (fem.) — nominative, no change" },
      { uk: "Я шукаю магазин.", ph: "yah shoo-KAH-yoo mah-hah-ZYHN", en: "I'm looking for a store.", note: "магазин — accusative (masc. inanimate = nominative)" },
      { uk: "Я шукаю аптеку.", ph: "yah shoo-KAH-yoo ahp-TEH-koo", en: "I'm looking for a pharmacy.", note: "аптека → аптеку — accusative feminine: -а → -у" },
    ],
  },
  {
    id: "opin-1", cat: "💭 Opinions", title: "I Like / I Don't Like",
    phrase: { uk: "Мені подобається...", ph: "meh-NEE poh-DOH-bah-yet'-syah", en: "I like... (lit: to me it is pleasing)" },
    morphs: [
      { uk: "Мені подобається кава.", ph: "meh-NEE poh-DOH-bah-yet'-syah KAH-vah", en: "I like coffee.", note: "мені = dative of я (to me). кава stays nominative (it's the subject!)" },
      { uk: "Мені подобається ця книга.", ph: "meh-NEE poh-DOH-bah-yet'-syah tsyah KNYH-hah", en: "I like this book.", note: "ця = this (fem). книга = nominative fem." },
      { uk: "Мені не подобається холод.", ph: "meh-NEE neh poh-DOH-bah-yet'-syah KHOH-lohd", en: "I don't like the cold.", note: "не = not. холод (masc.) nominative" },
      { uk: "Йому подобається музика.", ph: "yoh-MOO poh-DOH-bah-yet'-syah MOO-zy-kah", en: "He likes music.", note: "йому = dative of він (to him)" },
    ],
  },
  {
    id: "obj-1", cat: "📦 Objects", title: "I Need / I Want",
    phrase: { uk: "Мені потрібно...", ph: "meh-NEE poh-TREEB-noh", en: "I need... (lit: to me it is necessary)" },
    morphs: [
      { uk: "Мені потрібна вода.", ph: "meh-NEE poh-TREEB-nah voh-DAH", en: "I need water.", note: "потрібна — fem. form agrees with вода (fem.)" },
      { uk: "Мені потрібний телефон.", ph: "meh-NEE poh-TREEB-nyy teh-leh-FOHN", en: "I need a phone.", note: "потрібний — masc. form agrees with телефон (masc.)" },
      { uk: "Мені потрібне молоко.", ph: "meh-NEE poh-TREEB-neh moh-loh-KOH", en: "I need milk.", note: "потрібне — neuter form agrees with молоко (neuter)" },
      { uk: "Я хочу каву.", ph: "yah KHOH-choo KAH-voo", en: "I want coffee.", note: "кава → каву — accusative fem: -а → -у. хочу takes accusative!" },
    ],
  },
  {
    id: "dir-1", cat: "🧭 Directions", title: "Go To / Come From",
    phrase: { uk: "Я іду до...", ph: "yah ee-DOO doh...", en: "I'm going to..." },
    morphs: [
      { uk: "Я іду до магазину.", ph: "yah ee-DOO doh mah-hah-ZYH-noo", en: "I'm going to the store.", note: "до + genitive: магазин → магазину (masc. -ин → -ину)" },
      { uk: "Я іду до школи.", ph: "yah ee-DOO doh SHKOH-lyh", en: "I'm going to school.", note: "до + genitive: школа → школи (fem. -а → -и)" },
      { uk: "Я іду з магазину.", ph: "yah ee-DOO z mah-hah-ZYH-noo", en: "I'm coming from the store.", note: "з + genitive: same ending as до!" },
      { uk: "Я іду додому.", ph: "yah ee-DOO doh-DOH-moo", en: "I'm going home.", note: "додому = special adverb form of дім (home)" },
    ],
  },
  {
    id: "social-1", cat: "🗣️ Social", title: "Can You Help Me?",
    phrase: { uk: "Чи можете мені допомогти?", ph: "chyh MOH-zheh-teh meh-NEE doh-poh-mohh-TYH", en: "Can you help me? (formal)" },
    morphs: [
      { uk: "Чи можеш мені допомогти?", ph: "chyh MOH-zhesh meh-NEE doh-poh-mohh-TYH", en: "Can you help me? (informal)", note: "можете → можеш: formal → informal ти form" },
      { uk: "Допоможіть, будь ласка!", ph: "doh-poh-moh-ZHEET', bood' LAHS-kah", en: "Help, please!", note: "Imperative formal. будь ласка = please" },
      { uk: "Я не розумію.", ph: "yah neh roh-zoo-MEE-yoo", en: "I don't understand.", note: "Essential survival phrase" },
      { uk: "Повторіть, будь ласка.", ph: "pohv-toh-REET', bood' LAHS-kah", en: "Repeat, please.", note: "Imperative formal of повторити" },
    ],
  },
  {
    id: "quest-2", cat: "❓ Questions", title: "How Much / How Many",
    phrase: { uk: "Скільки коштує...?", ph: "SKEEL'-kyh kohsh-TOO-yeh", en: "How much does ... cost?" },
    morphs: [
      { uk: "Скільки коштує ця сукня?", ph: "SKEEL'-kyh kohsh-TOO-yeh tsyah SOOK-nyah", en: "How much does this dress cost?", note: "ця = this (fem.), сукня stays nominative (subject)" },
      { uk: "Скільки коштує цей квиток?", ph: "SKEEL'-kyh kohsh-TOO-yeh tsey kvyh-TOHK", en: "How much does this ticket cost?", note: "цей = this (masc.)" },
      { uk: "Скільки це коштує?", ph: "SKEEL'-kyh tseh kohsh-TOO-yeh", en: "How much does this cost?", note: "це = this (neuter/general)" },
      { uk: "Це занадто дорого.", ph: "tseh zah-NAHD-toh DOH-roh-hoh", en: "That's too expensive.", note: "дорого = expensive (adverb form)" },
    ],
  },
  {
    id: "opin-2", cat: "💭 Opinions", title: "I Think / I Believe",
    phrase: { uk: "Я думаю, що...", ph: "yah DOO-mah-yoo, shcho...", en: "I think that..." },
    morphs: [
      { uk: "Я думаю, що це правда.", ph: "yah DOO-mah-yoo shcho tseh PRAHV-dah", en: "I think that's true.", note: "правда (fem.) = truth, stays nominative" },
      { uk: "Я думаю, що ні.", ph: "yah DOO-mah-yoo shcho nee", en: "I don't think so.", note: "ні = no. Simple negation" },
      { uk: "Я вважаю, що...", ph: "yah vvah-ZHAH-yoo shcho", en: "I consider/believe that...", note: "вважаю = stronger opinion than думаю" },
      { uk: "На мою думку...", ph: "nah MOH-yoo DOOM-koo", en: "In my opinion...", note: "мою думку = accusative of моя думка (my thought)" },
    ],
  },
  {
    id: "obj-2", cat: "📦 Objects", title: "This / That / These",
    phrase: { uk: "Це...", ph: "tseh...", en: "This is..." },
    morphs: [
      { uk: "Це мій дім.", ph: "tseh meey deem", en: "This is my house.", note: "мій = my (masc.) agrees with дім (masc.)" },
      { uk: "Це моя кава.", ph: "tseh moh-YAH KAH-vah", en: "This is my coffee.", note: "моя = my (fem.) agrees with кава (fem.)" },
      { uk: "Це моє місто.", ph: "tseh moh-YEH MEES-toh", en: "This is my city.", note: "моє = my (neuter) agrees with місто (neuter)" },
      { uk: "Це мої друзі.", ph: "tseh moh-YEE DROO-zee", en: "These are my friends.", note: "мої = my (plural). друзі = nom. plural of друг" },
    ],
  },
  {
    id: "social-2", cat: "🗣️ Social", title: "Sorry / Excuse Me",
    phrase: { uk: "Вибачте!", ph: "VYH-bahch-teh", en: "Sorry! / Excuse me! (formal)" },
    morphs: [
      { uk: "Вибач!", ph: "VYH-bahch", en: "Sorry! (informal)", note: "Informal ти form — drop the -те" },
      { uk: "Перепрошую.", ph: "peh-reh-PROH-shoo-yoo", en: "I apologize. (more formal)", note: "Stronger than вибачте, used for real apologies" },
      { uk: "Нічого страшного.", ph: "nee-CHOH-hoh STRAHSH-noh-hoh", en: "No big deal / It's nothing.", note: "Common response to an apology. Genitive: нічого" },
      { uk: "Все добре!", ph: "vseh DOHB-reh", en: "It's all good!", note: "Casual reassurance" },
    ],
  },
];

const UK_IDIOMS = [
  { idiom: "Не все те золото, що блищить", literal: "Not everything that glitters is gold", meaning: "Appearances deceive" },
  { idiom: "Очі бояться, а руки роблять", literal: "Eyes fear, hands do the work", meaning: "Tasks seem harder before you start" },
  { idiom: "Тихіше їдеш — далі будеш", literal: "Quieter you go, further you'll get", meaning: "Slow and steady" },
  { idiom: "Вовків боятися — в ліс не ходити", literal: "Fear wolves, don't enter the forest", meaning: "Can't achieve without risk" },
  { idiom: "Друзі пізнаються в біді", literal: "Friends known in trouble", meaning: "Friend in need is a friend indeed" },
  { idiom: "Язик до Києва доведе", literal: "Tongue leads you to Kyiv", meaning: "Ask and you'll find your way" },
  { idiom: "Все буде добре", literal: "Everything will be fine", meaning: "Ukrainian resilience" },
  { idiom: "Ні пуху ні пера!", literal: "Neither fluff nor feather!", meaning: "Good luck! (Reply: До біса!)" },
  { idiom: "Сім разів відміряй, один раз відріж", literal: "Measure seven times, cut once", meaning: "Think before acting" },
  { idiom: "Слово — не горобець", literal: "A word is not a sparrow", meaning: "Can't take back what you say" },
  { idiom: "Борщ та каша — їжа наша", literal: "Borscht and porridge — our food", meaning: "Simple is best" },
  { idiom: "Що посієш, те й пожнеш", literal: "What you sow, you'll reap", meaning: "Reap what you sow" },
  { idiom: "Поспішиш — людей насмішиш", literal: "Rush — make people laugh", meaning: "Haste makes waste" },
  { idiom: "На помилках вчаться", literal: "One learns from mistakes", meaning: "Mistakes teach" },
];

const VISUAL_VOCAB = {
  uk: [
    { word: "кіт", ph: "keet", english: "cat", emoji: "🐱" },
    { word: "собака", ph: "soh-BAH-kah", english: "dog", emoji: "🐕" },
    { word: "хліб", ph: "khleeb", english: "bread", emoji: "🍞" },
    { word: "вода", ph: "voh-DAH", english: "water", emoji: "💧" },
    { word: "дім", ph: "deem", english: "house", emoji: "🏠" },
    { word: "сонце", ph: "SOHN-tseh", english: "sun", emoji: "☀️" },
    { word: "книга", ph: "KNYH-hah", english: "book", emoji: "📖" },
    { word: "яблуко", ph: "YAHB-loo-koh", english: "apple", emoji: "🍎" },
    { word: "кава", ph: "KAH-vah", english: "coffee", emoji: "☕" },
    { word: "машина", ph: "mah-SHYH-nah", english: "car", emoji: "🚗" },
    { word: "дерево", ph: "DEH-reh-voh", english: "tree", emoji: "🌳" },
    { word: "квітка", ph: "KVEET-kah", english: "flower", emoji: "🌸" },
    { word: "риба", ph: "RYH-bah", english: "fish", emoji: "🐟" },
    { word: "молоко", ph: "moh-loh-KOH", english: "milk", emoji: "🥛" },
    { word: "сніг", ph: "sneeh", english: "snow", emoji: "❄️" },
    { word: "гора", ph: "hoh-RAH", english: "mountain", emoji: "⛰️" },
    { word: "їжа", ph: "YEE-zhah", english: "food", emoji: "🍽️" },
    { word: "ранок", ph: "RAH-nok", english: "morning", emoji: "🌅" },
  ],
  ja: [
    { word: "ねこ", kanji: "猫", ph: "NEH-koh", english: "cat", emoji: "🐱" },
    { word: "いぬ", kanji: "犬", ph: "EE-noo", english: "dog", emoji: "🐕" },
    { word: "みず", kanji: "水", ph: "MEE-zoo", english: "water", emoji: "💧" },
    { word: "ほん", kanji: "本", ph: "hohn", english: "book", emoji: "📖" },
    { word: "りんご", ph: "REEN-goh", english: "apple", emoji: "🍎" },
    { word: "くるま", kanji: "車", ph: "koo-ROO-mah", english: "car", emoji: "🚗" },
    { word: "はな", kanji: "花", ph: "HAH-nah", english: "flower", emoji: "🌸" },
    { word: "やま", kanji: "山", ph: "YAH-mah", english: "mountain", emoji: "⛰️" },
    { word: "うみ", kanji: "海", ph: "OO-mee", english: "sea", emoji: "🌊" },
    { word: "ともだち", kanji: "友達", ph: "toh-moh-DAH-chee", english: "friend", emoji: "🤝" },
  ],
};

function getDailyIdiom() { const d = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0).getTime())/86400000); return UK_IDIOMS[d % UK_IDIOMS.length]; }
const getGoals = (lc) => lc === "uk" ? [{ id:1, text:"Master nominative & accusative", progress:0 },{ id:2, text:"Learn noun genders (50 words)", progress:0 },{ id:3, text:"Read Cyrillic fluently", progress:0 },{ id:4, text:"Understand soft sign (ь)", progress:0 }] : [{ id:1, text:"Master は, が, を", progress:0 },{ id:2, text:"Read hiragana fluently", progress:0 },{ id:3, text:"Learn です/ます forms", progress:0 }];

// ══════════════════════════════════════════════════════════════════
// API + SPEECH
// ══════════════════════════════════════════════════════════════════

async function callClaude(msgs, sys) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages: msgs }) });
    const d = await r.json(); return d.content?.filter(b => b.type === "text").map(b => b.text).join("\n") || null;
  } catch(e) { return null; }
}

function useSpeech(lc) {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [sup, setSup] = useState({ stt: false, tts: false });
  const rec = useRef(null);
  useEffect(() => { const S = window.SpeechRecognition || window.webkitSpeechRecognition; setSup({ stt: !!S, tts: "speechSynthesis" in window }); if (S) { rec.current = new S(); rec.current.continuous = false; rec.current.interimResults = false; } return () => { try{rec.current?.abort();}catch(e){} try{window.speechSynthesis?.cancel();}catch(e){} }; }, [lc]);
  const listen = useCallback((cb) => { const r = rec.current; if(!r)return; r.lang = LANGS[lc]?.speechCode||"en-US"; r.onresult=(e)=>{const t=e.results[0]?.[0]?.transcript;if(t)cb(t);setListening(false);}; r.onerror=()=>setListening(false); r.onend=()=>setListening(false); try{r.start();setListening(true);}catch(e){setListening(false);} }, [lc]);
  const stopListen = useCallback(()=>{try{rec.current?.stop();}catch(e){}setListening(false);},[]);
  const speak = useCallback((t)=>{ if(!window.speechSynthesis||!t)return; window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang=LANGS[lc]?.speechCode||"en-US"; u.rate=0.8; u.onstart=()=>setSpeaking(true); u.onend=()=>setSpeaking(false); u.onerror=()=>setSpeaking(false); window.speechSynthesis.speak(u); },[lc]);
  const stopSpeak = useCallback(()=>{try{window.speechSynthesis?.cancel();}catch(e){}setSpeaking(false);},[]);
  return { listening, speaking, sup, listen, stopListen, speak, stopSpeak };
}

// ══════════════════════════════════════════════════════════════════
// THEME + COMPONENTS
// ══════════════════════════════════════════════════════════════════

const T = { bg:"#07070b", sf:"#0f0f16", r:"#16161f", b:"#222233", bh:"#333348", tx:"#e2e0ed", mu:"#8584a0", dm:"#52516d", ac:"#5b8def", ag:"rgba(91,141,239,0.1)", gn:"#5cd692", gs:"rgba(92,214,146,0.08)", am:"#f0b944", as:"rgba(240,185,68,0.08)", rd:"#ef6b6b", pk:"#d98ef0", gd:"#f5c542" };

const Bar = ({v,max=100,c=T.ac,h=5}) => <div style={{width:"100%",height:h,borderRadius:h,background:T.r,overflow:"hidden"}}><div style={{width:`${Math.min(v/max*100,100)}%`,height:"100%",borderRadius:h,background:c,transition:"width 0.5s"}}/></div>;
const Chip = ({children,on,click,c=T.ac}) => <button onClick={click} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${on?c+"50":T.b}`,background:on?c+"15":"transparent",color:on?c:T.mu,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>{children}</button>;

// ══════════════════════════════════════════════════════════════════
// LESSON VIEW
// ══════════════════════════════════════════════════════════════════

function LessonView({ speakFn, onGenerate }) {
  const [completed, setCompleted] = useState(new Set());
  const [active, setActive] = useState(null);
  const [morphIdx, setMorphIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [genLesson, setGenLesson] = useState(null);
  const [genLoading, setGenLoading] = useState(false);

  const cats = [...new Set(UK_LESSONS.map(l => l.cat))];
  const available = UK_LESSONS.filter(l => !completed.has(l.id));

  const startLesson = (lesson) => { setActive(lesson); setMorphIdx(0); setRevealed(false); };

  const completeLesson = () => {
    setCompleted(p => new Set([...p, active.id]));
    setActive(null);
    setMorphIdx(0);
    setRevealed(false);
  };

  const generateLesson = async () => {
    setGenLoading(true);
    const completedTitles = UK_LESSONS.filter(l => completed.has(l.id)).map(l => l.title).join(", ");
    const raw = await callClaude([{ role: "user", content: `Generate a new Ukrainian lesson. Previously completed: ${completedTitles || "none"}.` }],
      `You generate Ukrainian language micro-lessons. Return ONLY valid JSON, no markdown. Format:
{"title":"Short Title","cat":"emoji Category","phrase":{"uk":"main phrase","ph":"phonetic","en":"english"},"morphs":[{"uk":"variation","ph":"phonetic","en":"english","note":"grammar explanation"},{"uk":"...","ph":"...","en":"...","note":"..."},{"uk":"...","ph":"...","en":"...","note":"..."}]}
Focus on: common conversational phrases, case changes, gender agreement. Include 3-4 morphs showing how the phrase changes with different nouns/cases/genders. Phonetics should use CAPS for stressed syllables. Make it practical — phrases someone would actually use daily.`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw.replace(/```json?\n?|```/g, "").trim());
        setGenLesson({ ...parsed, id: "gen-" + Date.now() });
      } catch(e) { setGenLesson(null); }
    }
    setGenLoading(false);
  };

  if (active || genLesson) {
    const lesson = genLesson || active;
    const morphs = lesson.morphs || [];
    const m = morphs[morphIdx];
    const isLast = morphIdx >= morphs.length - 1;

    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => { setActive(null); setGenLesson(null); }} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${T.b}`, background: "transparent", color: T.mu, cursor: "pointer", fontSize: 11, marginBottom: 16 }}>← Back to lessons</button>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: T.ac, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{lesson.cat}</div>
          <h2 style={{ margin: "4px 0 0", fontSize: 18, color: T.tx, fontWeight: 700 }}>{lesson.title}</h2>
        </div>

        {/* Core phrase */}
        <div onClick={() => speakFn(lesson.phrase.uk)} style={{
          padding: 18, borderRadius: 14, background: `linear-gradient(135deg, ${T.ac}12, ${T.ac}06)`,
          border: `1px solid ${T.ac}30`, cursor: "pointer", marginBottom: 20, textAlign: "center",
        }}>
          <div style={{ fontSize: 10, color: T.ac, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Core Phrase</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: T.tx }}>{lesson.phrase.uk}</div>
          <div style={{ fontSize: 13, color: T.ac, fontStyle: "italic", marginTop: 4 }}>{lesson.phrase.ph}</div>
          <div style={{ fontSize: 13, color: T.mu, marginTop: 4 }}>{lesson.phrase.en}</div>
          <div style={{ fontSize: 10, color: T.dm, marginTop: 6 }}>🔊 Tap to hear</div>
        </div>

        {/* Morph cards */}
        {m && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: T.dm, fontWeight: 700, marginBottom: 8 }}>VARIATION {morphIdx + 1} of {morphs.length}</div>
            <div onClick={() => setRevealed(!revealed)} style={{
              padding: 16, borderRadius: 12, background: T.r, border: `1px solid ${revealed ? T.gn + "40" : T.b}`, cursor: "pointer",
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: T.tx, marginBottom: 4 }}>{m.uk}</div>
              <div style={{ fontSize: 12, color: T.ac, fontStyle: "italic" }}>{m.ph}</div>

              {revealed ? (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.b}` }}>
                  <div style={{ fontSize: 14, color: T.gn, fontWeight: 600 }}>{m.en}</div>
                  {m.note && <div style={{ fontSize: 12, color: T.pk, marginTop: 6, padding: "6px 10px", borderRadius: 7, background: T.pk + "08" }}>📝 {m.note}</div>}
                </div>
              ) : (
                <div style={{ fontSize: 11, color: T.dm, marginTop: 8 }}>Tap to reveal translation & grammar note</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={() => speakFn(m.uk)} style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${T.b}`, background: T.r, color: T.tx, cursor: "pointer", fontSize: 12 }}>🔊 Hear</button>
              {!isLast ? (
                <button onClick={() => { setMorphIdx(morphIdx + 1); setRevealed(false); }} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: T.ac, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Next variation →</button>
              ) : (
                <button onClick={genLesson ? () => setGenLesson(null) : completeLesson} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: T.gn, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>✓ Complete lesson</button>
              )}
            </div>
          </div>
        )}

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 8 }}>
          {morphs.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 4, background: i <= morphIdx ? T.ac : T.b, transition: "background 0.3s" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, color: T.tx, fontWeight: 700 }}>Phrase Lessons</h2>
          <p style={{ margin: "3px 0 0", fontSize: 11, color: T.mu }}>
            {completed.size}/{UK_LESSONS.length} completed · Learn a phrase, see it morph through cases & genders
          </p>
        </div>
        <button onClick={generateLesson} disabled={genLoading} style={{
          padding: "7px 14px", borderRadius: 8, border: "none",
          background: genLoading ? T.b : T.pk, color: "#fff",
          cursor: genLoading ? "default" : "pointer", fontSize: 12, fontWeight: 700,
        }}>
          {genLoading ? "Generating..." : "✨ New AI Lesson"}
        </button>
      </div>

      {cats.map(cat => {
        const lessons = UK_LESSONS.filter(l => l.cat === cat);
        return (
          <div key={cat} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.mu, marginBottom: 8 }}>{cat}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {lessons.map(l => {
                const done = completed.has(l.id);
                return (
                  <div key={l.id} onClick={() => !done && startLesson(l)} style={{
                    padding: "11px 14px", borderRadius: 10, background: T.r,
                    border: `1px solid ${done ? T.gn + "30" : T.b}`,
                    cursor: done ? "default" : "pointer", opacity: done ? 0.6 : 1,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.tx }}>{done ? "✓ " : ""}{l.title}</div>
                      <div style={{ fontSize: 11, color: T.ac, fontStyle: "italic", marginTop: 2 }}>{l.phrase.uk}</div>
                    </div>
                    <div style={{ fontSize: 11, color: T.dm }}>{l.morphs.length} variations</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// REMAINING VIEWS (compact)
// ══════════════════════════════════════════════════════════════════

function IdiomBanner({ sp }) {
  const [ex, setEx] = useState(false);
  const id = getDailyIdiom();
  return (
    <div onClick={() => setEx(!ex)} style={{ margin: "10px 14px 0", padding: "10px 12px", borderRadius: 10, background: `${T.gd}08`, border: `1px solid ${T.gd}20`, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: T.gd, textTransform: "uppercase", letterSpacing: 1 }}>🇺🇦 Idiom</span>
        <button onClick={e => { e.stopPropagation(); sp(id.idiom); }} style={{ padding: "2px 8px", borderRadius: 5, background: T.gd + "15", border: `1px solid ${T.gd}30`, color: T.gd, cursor: "pointer", fontSize: 11 }}>🔊</button>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.tx, marginTop: 4 }}>«{id.idiom}»</div>
      <div style={{ fontSize: 11, color: T.mu, marginTop: 2, fontStyle: "italic" }}>"{id.literal}"</div>
      {ex && <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${T.gd}10`, fontSize: 11, color: T.tx }}><span style={{ fontWeight: 700, color: T.gn }}>→ </span>{id.meaning}</div>}
    </div>
  );
}

function AlphaView({ lang, sp }) {
  const [quiz, setQuiz] = useState(false);
  const [qi, setQi] = useState(0);
  const [qa, setQa] = useState("");
  const [qr, setQr] = useState(null);
  const [sc, setSc] = useState({ c: 0, t: 0 });
  const L = LANGS[lang].alphabet.letters;
  const pick = () => Math.floor(Math.random() * L.length);
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div><h2 style={{ margin: 0, fontSize: 17, color: T.tx }}>{LANGS[lang].alphabet.name}</h2><p style={{ margin: "2px 0 0", fontSize: 10, color: T.mu }}>{lang==="uk"?"⚠️ Use written phonetics — browser TTS quality is low for Ukrainian":"Tap to hear"}</p></div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>{quiz && <span style={{ fontSize: 11, color: T.gn, fontWeight: 700 }}>{sc.c}/{sc.t}</span>}<Chip on={quiz} click={() => quiz ? setQuiz(false) : (setQuiz(true),setQi(pick()),setQa(""),setQr(null))} c={T.pk}>{quiz?"✕":"🧠 Quiz"}</Chip></div>
      </div>
      {quiz ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 28, background: T.r, borderRadius: 12, border: `1px solid ${T.b}` }}>
          <div onClick={() => sp(L[qi].char.split(" ")[0])} style={{ fontSize: 56, marginBottom: 10, cursor: "pointer" }}>{L[qi].char.split(" ")[0]}</div>
          <div style={{ display: "flex", gap: 6, width: "100%", maxWidth: 260 }}>
            <input value={qa} onChange={e=>setQa(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(qr?(setQi(pick()),setQa(""),setQr(null)):(()=>{const ok=qa.trim().toLowerCase()===L[qi].romanize.toLowerCase();setQr(ok?"✓":L[qi].romanize);setSc(p=>({c:p.c+(ok?1:0),t:p.t+1}));})())} placeholder="..." autoFocus style={{ flex:1, padding:"8px 10px", borderRadius:8, border:`1px solid ${T.b}`, background:T.bg, color:T.tx, fontSize:13, outline:"none" }} />
            <button onClick={qr?(()=>{setQi(pick());setQa("");setQr(null);}):(()=>{const ok=qa.trim().toLowerCase()===L[qi].romanize.toLowerCase();setQr(ok?"✓":L[qi].romanize);setSc(p=>({c:p.c+(ok?1:0),t:p.t+1}));})} style={{ padding:"8px 14px", borderRadius:8, border:"none", background:T.ac, color:"#fff", fontWeight:700, fontSize:12, cursor:"pointer" }}>{qr?"Next":"Check"}</button>
          </div>
          {qr && <div style={{ marginTop: 10, padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: qr==="✓"?T.gs:T.as, color: qr==="✓"?T.gn:T.am }}>{qr==="✓"?"Correct!":"It's \""+qr+"\""}</div>}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 6 }}>
          {L.map((l,i) => (
            <div key={i} onClick={() => sp(l.char.split(" ")[0])} style={{ padding: "8px 8px 10px", borderRadius: 8, background: T.r, border: `1px solid ${T.b}`, cursor: "pointer" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=T.ac+"40"} onMouseLeave={e=>e.currentTarget.style.borderColor=T.b}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: T.tx }}>{l.char}</span>
                <span style={{ fontSize: 9, color: T.ac, fontWeight: 700 }}>{l.romanize}</span>
              </div>
              <div style={{ fontSize: 9, color: T.pk, marginTop: 3 }}>{l.phonetic}</div>
              <div style={{ fontSize: 9, color: T.dm, marginTop: 2 }}>{l.example} ({l.exEn}) <span style={{ color: T.ac, fontStyle: "italic" }}>{l.exPhonetic}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SoftSignView({ sp }) {
  const ss = LANGS.uk.softSign;
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 17, color: T.tx }}>{ss.title}</h2>
      <p style={{ margin: "0 0 16px", fontSize: 12, color: T.mu, lineHeight: 1.5 }}>{ss.intro}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ss.pairs.map((p,i) => (
          <div key={i} style={{ padding: 12, borderRadius: 10, background: T.r, border: `1px solid ${T.b}` }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 6 }}>
              <div style={{ flex: 1 }} onClick={() => sp(p.hardWord)}>
                <div style={{ fontSize: 9, fontWeight: 700, color: T.rd, textTransform: "uppercase" }}>Hard {p.hard}</div>
                <div style={{ cursor: "pointer" }}><span style={{ fontSize: 16, fontWeight: 700, color: T.tx }}>{p.hardWord}</span> <span style={{ fontSize: 11, color: T.mu }}>({p.hardEn})</span></div>
                <div style={{ fontSize: 10, color: T.ac, fontStyle: "italic" }}>🔊 {p.hardPh}</div>
              </div>
              <div style={{ width: 1, background: T.b }} />
              <div style={{ flex: 1 }} onClick={() => sp(p.softWord)}>
                <div style={{ fontSize: 9, fontWeight: 700, color: T.gn, textTransform: "uppercase" }}>Soft {p.soft}</div>
                <div style={{ cursor: "pointer" }}><span style={{ fontSize: 16, fontWeight: 700, color: T.tx }}>{p.softWord}</span> <span style={{ fontSize: 11, color: T.mu }}>({p.softEn})</span></div>
                <div style={{ fontSize: 10, color: T.ac, fontStyle: "italic" }}>🔊 {p.softPh}</div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: T.pk, padding: "6px 8px", borderRadius: 6, background: T.pk+"08" }}>💡 {p.tip}</div>
          </div>
        ))}
      </div>
      <h3 style={{ margin: "20px 0 4px", fontSize: 15, color: T.tx }}>{ss.apostrophe.title}</h3>
      <p style={{ margin: "0 0 12px", fontSize: 12, color: T.mu }}>{ss.apostrophe.text}</p>
      {ss.apostrophe.examples.map((ex,i) => (
        <div key={i} onClick={() => sp(ex.word)} style={{ padding: 10, borderRadius: 8, background: T.r, border: `1px solid ${T.b}`, cursor: "pointer", marginBottom: 6 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: T.tx }}>{ex.word}</span> <span style={{ fontSize: 11, color: T.mu }}>({ex.en})</span>
          <div style={{ fontSize: 11, color: T.ac, fontStyle: "italic", marginTop: 2 }}>🔊 {ex.ph}</div>
          <div style={{ fontSize: 10, color: T.dm, marginTop: 2 }}>{ex.note}</div>
        </div>
      ))}
    </div>
  );
}

function GrammarView({ lang, sp }) {
  const d = LANGS[lang]; const isUk = lang === "uk";
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ margin: "0 0 16px", fontSize: 17, color: T.tx }}>{isUk ? "Cases & Gender" : "Particles"}</h2>
      {isUk && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>{d.genders.map((g,i)=><div key={i} style={{ padding: "6px 12px", borderRadius: 8, background: T.r, border: `1px solid ${T.b}`, fontSize: 11, color: T.tx }}>{["🔵","🔴","🟡"][i]} {g}</div>)}</div>}
      {(isUk ? d.cases : d.particles).map((c,i) => (
        <div key={i} onClick={() => sp(isUk ? c.ex : c.ex.replace(/。/g,""))} style={{ padding: "10px 12px", borderRadius: 10, background: T.r, border: `1px solid ${T.b}`, cursor: "pointer", marginBottom: 6 }}
          onMouseEnter={e=>e.currentTarget.style.borderColor=T.ac+"40"} onMouseLeave={e=>e.currentTarget.style.borderColor=T.b}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.ac }}>{isUk ? c.name : c.name}</span>
            {isUk && <span style={{ fontSize: 10, color: T.pk }}>{c.ukr} ({c.q})</span>}
          </div>
          <div style={{ fontSize: 10, color: T.mu, marginBottom: 3 }}>{isUk ? c.use : c.use}</div>
          <div style={{ fontSize: 13, color: T.tx }}>🔊 {isUk ? c.ex : c.ex} <span style={{ fontSize: 10, color: T.dm }}>({isUk ? c.en : c.en})</span></div>
          <div style={{ fontSize: 10, color: T.ac, fontStyle: "italic", marginTop: 1 }}>{isUk ? c.ph : c.ph}</div>
        </div>
      ))}
    </div>
  );
}

function ListenMode({ words, sp }) {
  const [idx, setIdx] = useState(0); const [flip, setFlip] = useState(false);
  const w = words[idx] || words[0];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <p style={{ fontSize: 11, color: T.mu }}>See the word → translate in your head → tap to check</p>
      <div onClick={() => setFlip(!flip)} style={{ width: 240, minHeight: 170, borderRadius: 12, background: T.r, border: `2px solid ${flip?T.gn+"40":T.b}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 4, padding: 14 }}>
        {!flip ? (<><div style={{ fontSize: 24, fontWeight: 700, color: T.tx }}>{w.word}</div><div style={{ fontSize: 11, color: T.ac }}>{w.ph}</div><div style={{ fontSize: 10, color: T.dm, marginTop: 6 }}>Tap to reveal</div></>) : (<><div style={{ fontSize: 36 }}>{w.emoji}</div><div style={{ fontSize: 18, fontWeight: 700, color: T.tx }}>{w.word}</div><div style={{ fontSize: 13, color: T.gn, fontWeight: 600 }}>{w.english}</div><div style={{ fontSize: 10, color: T.ac }}>{w.ph}</div></>)}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={e=>{e.stopPropagation();sp(w.word);}} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${T.b}`, background: T.r, color: T.tx, cursor: "pointer", fontSize: 11 }}>🔊</button>
        <button onClick={() => { setIdx((idx+1)%words.length); setFlip(false); }} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: T.ac, color: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>Next →</button>
      </div>
      <div style={{ fontSize: 10, color: T.dm }}>{idx+1}/{words.length}</div>
    </div>
  );
}

function VisualVocab({ lang, sp }) {
  const W = VISUAL_VOCAB[lang]||[]; const [mode, setMode] = useState("browse"); const [ms, setMs] = useState(null); const [sc, setSc] = useState({c:0,t:0});
  const mk = () => { const s=[...W].sort(()=>Math.random()-0.5).slice(0,4); return { opts:s, tgt:s[Math.floor(Math.random()*s.length)], sel:null, res:null }; };
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 6 }}>
        <h2 style={{ margin: 0, fontSize: 17, color: T.tx }}>Visual Vocab {mode==="match"&&<span style={{fontSize:11,color:T.gn}}>{sc.c}/{sc.t}</span>}</h2>
        <div style={{ display: "flex", gap: 5 }}><Chip on={mode==="browse"} click={()=>setMode("browse")} c={T.ac}>📖</Chip><Chip on={mode==="match"} click={()=>{setMs(mk());setSc({c:0,t:0});setMode("match");}} c={T.gn}>🎯</Chip><Chip on={mode==="listen"} click={()=>setMode("listen")} c={T.pk}>📝</Chip></div>
      </div>
      {mode==="browse"&&<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 6 }}>{W.map((w,i)=><div key={i} onClick={()=>sp(w.word)} style={{ padding:10, borderRadius:10, textAlign:"center", background:T.r, border:`1px solid ${T.b}`, cursor:"pointer" }}><div style={{fontSize:30,marginBottom:2}}>{w.emoji}</div><div style={{fontSize:14,fontWeight:700,color:T.tx}}>{w.word}</div>{w.kanji&&<div style={{fontSize:10,color:T.pk}}>{w.kanji}</div>}<div style={{fontSize:9,color:T.ac,marginTop:2}}>{w.ph}</div></div>)}</div>}
      {mode==="match"&&ms&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{fontSize:64,padding:20,borderRadius:16,background:T.r,border:`2px solid ${T.b}`}}>{ms.tgt.emoji}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,width:"100%",maxWidth:360}}>{ms.opts.map(o=>{const iS=ms.sel===o.word,iT=o.word===ms.tgt.word,gn=ms.res&&iT,rd=ms.res==="no"&&iS;return<button key={o.word} onClick={()=>{if(ms.res)return;const ok=o.word===ms.tgt.word;setMs(p=>({...p,sel:o.word,res:ok?"ok":"no"}));setSc(p=>({c:p.c+(ok?1:0),t:p.t+1}));sp(ms.tgt.word);}} style={{padding:"10px 6px",borderRadius:10,border:`2px solid ${gn?T.gn:rd?T.rd:T.b}`,background:gn?T.gs:rd?T.rd+"0a":T.r,color:T.tx,fontSize:15,fontWeight:700,cursor:ms.res?"default":"pointer"}}>{o.word}<div style={{fontSize:9,color:T.ac,marginTop:1}}>{o.ph}</div></button>})}</div>
        {ms.res&&<button onClick={()=>setMs(mk())} style={{padding:"8px 20px",borderRadius:8,border:"none",background:T.ac,color:"#fff",fontWeight:700,cursor:"pointer"}}>Next →</button>}
      </div>}
      {mode==="listen"&&<ListenMode words={W} sp={sp}/>}
    </div>
  );
}

function ChatView({ lang, msgs, setMsgs, ld, setLd, fb, setFb, goals, setGoals, stats, setStats, prof, setProf, sp, cm }) {
  const [inp, setInp] = useState(""); const endR = useRef(null); const inR = useRef(null); const d = LANGS[lang];
  useEffect(() => { endR.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const sys = () => { const gl=goals.map(g=>`- ${g.text} (${g.progress}%)`).join("\n"); const isU=lang==="uk";
    return `Expert ${d.name} tutor. Top 1500 conversational words. Mode: ${cm==="casual"?"Pimsleur-style chat":"Structured lesson"}. Proficiency: ~${prof}/100.
PRIORITIES: ${isU?"1. CASES & GENDER: Name the case when user uses nouns. Show endings. 2. SOFT SIGN: Explain palatalization when relevant. 3. Top 1500 vocab, 2-3 new words/exchange. 4. Sentence construction breakdown. 5. ALWAYS include phonetic pronunciation (CAPS=stress) like voh-DAH.":"1. Particles は、が、を、に、で、の. 2. SOV structure. 3. Politeness levels. 4. Phonetic guides."}
FORMAT: Primarily ${d.name}. English in parentheses for new words. Phonetic guide for ALL text. 2-4 sentences for chat. Show incorrect→correct.
GOALS:\n${gl}
After response, NEW LINE: |||FEEDBACK|||{"feedback":[{"type":"positive|correction|note","text":"..."}],"proficiency_delta":0,"goal_updates":[{"id":1,"delta":0}],"grammar_score":80,"journal_note":"..."}`;};
  const parse = (raw) => { const i=raw.indexOf("|||FEEDBACK|||"); if(i===-1)return{c:raw.trim(),m:null}; let m=null; try{m=JSON.parse(raw.substring(i+14).trim().replace(/```json?\n?|```/g,"").trim());}catch(e){} return{c:raw.substring(0,i).trim(),m}; };
  const send = async (ov) => { const t=(ov||inp).trim(); if(!t||ld)return; if(!ov)setInp(""); setLd(true); const nm=[...msgs,{role:"user",content:t}]; setMsgs(nm);
    const raw=await callClaude(nm.slice(-12).map(m=>({role:m.role,content:m.content})),sys()); if(raw){const{c,m:mt}=parse(raw);setMsgs(p=>[...p,{role:"assistant",content:c}]);if(mt){if(mt.feedback)setFb(p=>[...mt.feedback,...p].slice(0,30));if(mt.proficiency_delta)setProf(p=>Math.max(0,Math.min(100,p+mt.proficiency_delta)));if(mt.goal_updates)setGoals(p=>p.map(g=>{const u=mt.goal_updates.find(x=>x.id===g.id);return u?{...g,progress:Math.min(100,g.progress+(u.delta||0))}:g;}));setStats(p=>{const nu=new Set(p.uniqueWords);t.split(/\s+/).forEach(w=>nu.add(w.toLowerCase()));const co=mt.feedback?.filter(f=>f.type==="correction").length||0;return{...p,wordsUsed:nu.size,messageCount:p.messageCount+1,corrections:p.corrections+co,streak:co===0?p.streak+1:0,journal:mt.journal_note?[...p.journal,{time:new Date().toLocaleTimeString(),text:mt.journal_note}]:p.journal,uniqueWords:nu};});}}else{setMsgs(p=>[...p,{role:"assistant",content:"Connection issue — try again."}]);}setLd(false);inR.current?.focus();};
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {lang==="uk"&&<IdiomBanner sp={sp.speak}/>}
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px 0"}}>{msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:8}}>
        <div style={{maxWidth:"82%",padding:"9px 13px",borderRadius:12,fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap",...(m.role==="user"?{background:T.ac,color:"#fff",borderBottomRightRadius:3}:{background:T.r,border:`1px solid ${T.b}`,borderBottomLeftRadius:3,color:T.tx})}}>
          {m.content}{m.role==="assistant"&&<button onClick={()=>sp.speaking?sp.stopSpeak():sp.speak(m.content)} style={{display:"inline-block",marginLeft:5,padding:"1px 6px",borderRadius:4,background:"transparent",border:`1px solid ${T.b}`,color:T.mu,cursor:"pointer",fontSize:9,verticalAlign:"middle"}}>{sp.speaking?"⏹":"🔊"}</button>}
        </div></div>)}
        {ld&&<div style={{display:"flex",marginBottom:8}}><div style={{padding:"10px 16px",borderRadius:12,borderBottomLeftRadius:3,background:T.r,border:`1px solid ${T.b}`,display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:T.ac,animation:`dP 1.2s infinite`,animationDelay:`${i*.15}s`}}/>)}</div></div>}
        <div ref={endR}/>
      </div>
      <div style={{padding:"8px 14px",borderTop:`1px solid ${T.b}`,flexShrink:0,background:T.sf}}>
        <div style={{display:"flex",gap:5,alignItems:"center",padding:"3px 3px 3px 10px",borderRadius:10,background:T.r,border:`1px solid ${T.b}`}}>
          {sp.sup.stt&&<button onClick={()=>sp.listening?sp.stopListen():sp.listen(t=>{setInp(t);setTimeout(()=>send(t),150);})} style={{width:30,height:30,borderRadius:8,border:"none",cursor:"pointer",background:sp.listening?T.rd+"15":"transparent",color:sp.listening?T.rd:T.mu,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",animation:sp.listening?"mP 1.5s infinite":"none"}}>🎤</button>}
          <input ref={inR} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder={`${d.name} or English...`} disabled={ld} style={{flex:1,padding:"8px 0",border:"none",background:"transparent",color:T.tx,fontSize:12,outline:"none",fontFamily:"inherit"}}/>
          <button onClick={()=>send()} disabled={ld||!inp.trim()} style={{padding:"7px 14px",borderRadius:7,border:"none",background:inp.trim()?T.ac:T.b,color:inp.trim()?"#fff":T.dm,fontWeight:700,fontSize:11,cursor:inp.trim()?"pointer":"default"}}>Send</button>
        </div>
        {sp.listening&&<div style={{textAlign:"center",marginTop:4,fontSize:10,color:T.rd,fontWeight:600}}>🎤 Listening...</div>}
      </div>
    </div>
  );
}

function Sidebar({fb,goals,setGoals,stats}) {
  const [tab,setTab]=useState("feedback");const [ng,setNg]=useState("");
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:T.sf,borderLeft:`1px solid ${T.b}`}}>
      <div style={{display:"flex",borderBottom:`1px solid ${T.b}`,flexShrink:0}}>{["feedback","goals","stats"].map(t=><button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px 3px",border:"none",background:"transparent",cursor:"pointer",color:tab===t?T.ac:T.dm,fontWeight:tab===t?700:500,fontSize:9,letterSpacing:0.5,textTransform:"uppercase",borderBottom:tab===t?`2px solid ${T.ac}`:"2px solid transparent"}}>{t}</button>)}</div>
      <div style={{flex:1,overflowY:"auto",padding:10}}>
        {tab==="feedback"&&(fb.length===0?<div style={{textAlign:"center",padding:24,color:T.dm,fontSize:11}}>💬 Chat for feedback</div>:<div style={{display:"flex",flexDirection:"column",gap:5}}>{fb.map((f,i)=><div key={i} style={{padding:"7px 9px",borderRadius:7,fontSize:10,lineHeight:1.5,background:f.type==="positive"?T.gs:f.type==="correction"?T.as:T.ag,borderLeft:`3px solid ${f.type==="positive"?T.gn:f.type==="correction"?T.am:T.ac}`,color:T.tx}}><span style={{fontSize:8,fontWeight:700,textTransform:"uppercase",color:f.type==="positive"?T.gn:f.type==="correction"?T.am:T.ac}}>{f.type==="positive"?"✨":"💡"} {f.type}</span><div style={{marginTop:1}}>{f.text}</div></div>)}</div>)}
        {tab==="goals"&&<div style={{display:"flex",flexDirection:"column",gap:6}}>{goals.map(g=><div key={g.id} style={{padding:"8px 9px",borderRadius:8,background:T.r,border:`1px solid ${T.b}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:10,color:T.tx}}>{g.text}</span><span style={{fontSize:9,color:T.ac,fontWeight:700}}>{g.progress}%</span></div><Bar v={g.progress}/></div>)}<div style={{display:"flex",gap:4}}><input value={ng} onChange={e=>setNg(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&ng.trim()){setGoals(p=>[...p,{id:Date.now(),text:ng.trim(),progress:0}]);setNg("");}}} placeholder="Add goal..." style={{flex:1,padding:"5px 8px",borderRadius:6,background:T.bg,border:`1px solid ${T.b}`,color:T.tx,fontSize:9,outline:"none"}}/><button onClick={()=>{if(ng.trim()){setGoals(p=>[...p,{id:Date.now(),text:ng.trim(),progress:0}]);setNg("");}}} style={{padding:"5px 8px",borderRadius:6,background:T.ac,border:"none",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:10}}>+</button></div></div>}
        {tab==="stats"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>{[{l:"Words",v:stats.wordsUsed,c:T.ac},{l:"Msgs",v:stats.messageCount,c:T.gn},{l:"Fixes",v:stats.corrections,c:T.am},{l:"Streak",v:`${stats.streak}🔥`,c:"#f97316"}].map(s=><div key={s.l} style={{padding:7,borderRadius:7,background:T.r,textAlign:"center"}}><div style={{fontSize:14,fontWeight:800,color:s.c}}>{s.v}</div><div style={{fontSize:7,color:T.dm,textTransform:"uppercase"}}>{s.l}</div></div>)}</div>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════

export default function App() {
  const [lang,setLang]=useState("uk"); const [view,setView]=useState("chat"); const [cm,setCm]=useState("casual");
  const [msgs,setMsgs]=useState([]); const [ld,setLd]=useState(false); const [fb,setFb]=useState([]); const [goals,setGoals]=useState(getGoals("uk"));
  const [prof,setProf]=useState(0); const [sb,setSb]=useState(true);
  const [stats,setStats]=useState({wordsUsed:0,messageCount:0,corrections:0,streak:0,journal:[],uniqueWords:new Set()});
  const sp=useSpeech(lang); const d=LANGS[lang]; const isU=lang==="uk";

  useEffect(()=>{
    setMsgs([{role:"assistant",content:isU?`${d.greeting}\n\nI'm your Ukrainian tutor! I'll teach the 1500 most important words, 7 cases, 3 genders, and the soft sign.\n\n⚠️ Browser TTS for Ukrainian is low quality — use the written phonetics.\n\nSay something in Ukrainian, or type "teach me"!`:`${d.greeting}\n\nI'm your Japanese tutor! Mastering 1500 words, particles, and sentence structure.\n\nSay something or type "teach me"!`}]);
    setFb([]);setGoals(getGoals(lang));setProf(0);setStats({wordsUsed:0,messageCount:0,corrections:0,streak:0,journal:[],uniqueWords:new Set()});
  },[lang]);

  const pl=[{l:"Beginner",c:"#4ade80",m:0},{l:"Elementary",c:"#22d3ee",m:15},{l:"Intermediate",c:"#818cf8",m:35},{l:"Upper-Int.",c:"#c084fc",m:60},{l:"Advanced",c:"#f472b6",m:85}].slice().reverse().find(x=>prof>=x.m)||{l:"Beginner",c:"#4ade80"};
  const nav=[{id:"chat",icon:"💬",label:"Chat"},{id:"lessons",icon:"📚",label:"Lessons"},{id:"alphabet",icon:isU?"Аа":"あ",label:"Alphabet"},{id:"grammar",icon:"📐",label:isU?"Cases":"Particles"},...(isU?[{id:"softsign",icon:"Ьь",label:"Soft Sign"}]:[]),{id:"vocab",icon:"🖼️",label:"Visual"}];

  return (
    <div style={{display:"flex",height:"100vh",width:"100%",background:T.bg,color:T.tx,fontFamily:"'Nunito','DM Sans',-apple-system,sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dP{0%,80%,100%{transform:scale(0.5);opacity:0.3}40%{transform:scale(1);opacity:1}}
        @keyframes mP{0%,100%{box-shadow:0 0 0 0 rgba(239,107,107,0.4)}50%{box-shadow:0 0 0 8px rgba(239,107,107,0)}}
        *{box-sizing:border-box;margin:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.b};border-radius:3px}input::placeholder{color:${T.dm}}`}</style>

      <div style={{width:58,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 0",gap:2,background:T.sf,borderRight:`1px solid ${T.b}`}}>
        <button onClick={()=>setLang(lang==="uk"?"ja":"uk")} style={{width:40,height:40,borderRadius:10,border:`1px solid ${T.b}`,background:T.r,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:6}} title={`→ ${isU?"Japanese":"Ukrainian"}`}>{d.flag}</button>
        {nav.map(n=><button key={n.id} onClick={()=>setView(n.id)} style={{width:42,height:42,borderRadius:8,border:"none",background:view===n.id?T.ag:"transparent",color:view===n.id?T.ac:T.mu,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0}} title={n.label}><span style={{fontSize:["alphabet","softsign"].includes(n.id)?11:15,fontWeight:["alphabet","softsign"].includes(n.id)?800:400}}>{n.icon}</span><span style={{fontSize:6,fontWeight:700}}>{n.label}</span></button>)}
        <div style={{flex:1}}/>
        <div style={{textAlign:"center",marginBottom:3}}><div style={{width:6,height:6,borderRadius:3,background:pl.c,margin:"0 auto 1px"}}/><div style={{fontSize:6,color:pl.c,fontWeight:700}}>{pl.l}</div></div>
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 12px",borderBottom:`1px solid ${T.b}`,background:T.sf,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:13,fontWeight:800}}>{d.flag} {d.name}</span><span style={{fontSize:9,color:T.dm}}>·</span><span style={{fontSize:10,color:T.mu,fontWeight:600}}>{nav.find(n=>n.id===view)?.label}</span></div>
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            {view==="chat"&&<div style={{display:"flex",borderRadius:5,overflow:"hidden",border:`1px solid ${T.b}`}}>{[{id:"casual",l:"💬"},{id:"lesson",l:"📚"}].map(m=><button key={m.id} onClick={()=>setCm(m.id)} style={{padding:"3px 9px",border:"none",cursor:"pointer",fontSize:10,fontWeight:600,background:cm===m.id?T.ac:"transparent",color:cm===m.id?"#fff":T.mu}}>{m.l}</button>)}</div>}
            <button onClick={()=>setSb(!sb)} style={{padding:"3px 7px",borderRadius:5,background:sb?T.ag:"transparent",border:`1px solid ${T.b}`,color:sb?T.ac:T.mu,cursor:"pointer",fontSize:12}}>☰</button>
          </div>
        </div>
        <div style={{flex:1,display:"flex",overflow:"hidden"}}>
          <div style={{flex:1,overflow:"auto"}}>
            {view==="chat"&&<ChatView lang={lang} msgs={msgs} setMsgs={setMsgs} ld={ld} setLd={setLd} fb={fb} setFb={setFb} goals={goals} setGoals={setGoals} stats={stats} setStats={setStats} prof={prof} setProf={setProf} sp={sp} cm={cm}/>}
            {view==="lessons"&&<LessonView speakFn={sp.speak}/>}
            {view==="alphabet"&&<AlphaView lang={lang} sp={sp.speak}/>}
            {view==="grammar"&&<GrammarView lang={lang} sp={sp.speak}/>}
            {view==="softsign"&&<SoftSignView sp={sp.speak}/>}
            {view==="vocab"&&<VisualVocab lang={lang} sp={sp.speak}/>}
          </div>
          {sb&&<div style={{width:250,flexShrink:0}}><Sidebar fb={fb} goals={goals} setGoals={setGoals} stats={stats}/></div>}
        </div>
      </div>
    </div>
  );
}
