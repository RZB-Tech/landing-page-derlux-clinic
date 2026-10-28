import type { Condition } from "./types";

// Uzbek (Latin) version of `conditions-ru.ts`: same direction keys, same ids, same order. The names match
// the «Nima bilan murojaat qilishadi» lists in `directions.ts`.
// TODO(clinic): a native speaker should proofread the Uzbek, and the clinic's doctors should approve it.
export const conditionsUz: Record<string, Condition[]> = {
  dermatology: [
    {
      id: "acne",
      name: "Husnbuzar (akne) va postakne",
      about:
        "Akne — yog' bezlari va soch follikulalarining surunkali yallig'lanishi bo'lib, ko'pincha o'smirlik davrida boshlanadi, lekin kattalarda ham uchraydi. Postakne — toshmalardan keyingi oqibatlar: dog'lar, chandiqlar va terining notekis releefi.",
      causes: [
        "Teri yog'ining ko'p ishlab chiqarilishi va teshiklarning tiqilishi",
        "C. acnes bakteriyasining ko'payishi va yallig'lanish",
        "Gormonal o'zgarishlar: jinsiy yetilish, hayz sikli, homiladorlik, polikistoz tuxumdon sindromi",
        "Irsiyat, nomos kosmetika, toshmalarni siqish",
      ],
      symptoms: [
        "Qora va oq komedonlar, qizil papulalar va yiringli pustulalar",
        "Og'riqli chuqur tugunlar va kistalar",
        "Terining yog'li yaltirashi va kengaygan teshiklar",
        "Toshmalardan keyin: qizil va jigarrang dog'lar, cho'kkan yoki ko'tarilgan chandiqlar",
      ],
      diagnostics: [
        "Ko'rik, aknening turi va og'irlik darajasini aniqlash",
        "Gormonal sabab gumon qilinganda gormon profili va kichik chanoq UZIsi",
        "Oshqozon-ichak traktining hamroh kasalliklarini baholash",
      ],
      treatment: [
        "Tashqi retinoidlar va azelain kislotali vositalar, antibakterial dorilar",
        "O'rta og'ir va og'ir shakllarda — shifokor buyurgan ichiladigan dorilar",
        "Professional tozalash, pilinglar va apparat usullari",
        "Postakneni tuzatish: dog'lar va chandiqlar uchun lazer va apparat muolajalari",
        "Kundalik parvarish va quyoshdan himoya vositalarini tanlash",
      ],
      risks: [
        "Doimiy atrofik va gipertrofik chandiqlar",
        "Oylar davomida saqlanadigan yallig'lanishdan keyingi giperpigmentatsiya",
        "Xo'ppoz hosil bo'lishi bilan chuqur yallig'lanish",
        "Xavotir, o'ziga ishonchning pasayishi",
      ],
    },
    {
      id: "psoriasis",
      name: "Psoriaz",
      about:
        "Psoriaz — terining surunkali immun vositachilikdagi kasalligi bo'lib, zo'rayish va remissiya davrlari bilan kechadi. U yuqumli emas; teri juda tez yangilanadi, shuning uchun po'st tashlaydigan blyashkalar hosil bo'ladi.",
      causes: [
        "Irsiy moyillik va immun javobning o'ziga xosligi",
        "Stress, infeksiyalar (shu jumladan streptokokk), teri jarohatlari",
        "Ayrim dorilar, alkogol, chekish",
        "Ortiqcha vazn va modda almashinuvi buzilishlari",
      ],
      symptoms: [
        "Kumushrang-oq tangachalar bilan qoplangan qizil blyashkalar",
        "Joylashuvi: tirsak, tizza, bosh terisi, bel",
        "Qichishish, quruqlik, og'riqli yoriqlar",
        "Tirnoqlarning qalinlashishi, chuqurchalar va qavatlanishi; bo'g'imlarda og'riq va qotish",
      ],
      diagnostics: [
        "Teri, tirnoq va bosh terisini ko'rik",
        "Jarayonning tarqalganligi va hayot sifatiga ta'sirini baholash",
        "Dermatoskopiya va zarur bo'lsa biopsiya",
        "Bo'g'imlar, modda almashinuvi va yurak-qon tomir omillarini skrining qilish",
      ],
      treatment: [
        "Topik glyukokortikosteroidlar, D vitamini analoglari, namlovchi va keratolitik vositalar",
        "Tor spektrli ultrabinafsha bilan fototerapiya",
        "Tarqalgan va og'ir shakllarda sistem terapiya — shifokor buyurig'iga ko'ra",
        "Qo'zg'atuvchi omillarni aniqlash va bartaraf etish, vaznni nazorat qilish",
      ],
      risks: [
        "Tarqalgan shaklga o'tish, terining katta qismi zararlanishi",
        "Bo'g'imlar deformatsiyasi va harakat yo'qolishi bilan psoriatik artrit",
        "Yurak-qon tomir kasalliklari va diabet xavfining oshishi",
        "Uyqu buzilishi, depressiya, ijtimoiy yakkalanish",
      ],
    },
    {
      id: "neurodermatitis",
      name: "Neyrodermit",
      about:
        "Neyrodermit (atopik dermatit) — kuchli qichishish va zo'rayishga moyillik bilan kechadigan terining surunkali yallig'lanish kasalligi. Ko'pincha bolalikda boshlanadi va terining himoya to'sig'i buzilishi bilan bog'liq.",
      causes: [
        "Allergiyaga irsiy moyillik (atopiya)",
        "Teri to'sig'ining buzilishi va quruqlikning kuchayishi",
        "Allergenlar: chang, gul changi, hayvon juni, ayrim mahsulotlar",
        "Stress, harorat o'zgarishi, agressiv yuvish vositalari",
      ],
      symptoms: [
        "Kechqurun va tunda kuchayadigan qattiq qichishish",
        "Quruqlik, po'st tashlash, terining qizarishi",
        "Tirsak va tizza bukilmalarida, bo'yin, yuz va qo'llarda o'choqlar",
        "Tirnalgan izlar, terining qalinlashishi, po'stloqlar",
      ],
      diagnostics: [
        "Ko'rik va allergologik anamnez to'plash",
        "Og'irlikni klinik shkalalar bo'yicha baholash",
        "Ko'rsatma bo'lsa allergologik tekshiruv",
        "Qo'tir, zamburug' va boshqa teri kasalliklarini istisno qilish",
      ],
      treatment: [
        "Kundalik namlash: emolentlar va teri to'sig'ini tiklovchi vositalar",
        "Zo'rayish davrida tashqi yallig'lanishga qarshi dorilar",
        "Kuchli qichishishda antigistamin vositalar — shifokor buyurig'iga ko'ra",
        "Allergenlar va bezovta qiluvchi omillarni bartaraf etish, turmush va ovqatlanish bo'yicha tavsiyalar",
        "Og'ir kechganda fototerapiya va sistem dorilar",
      ],
      risks: [
        "Tirnalgan joylarga ikkilamchi bakterial va virusli infeksiya qo'shilishi",
        "Terining qalinlashishi va rangi o'zgarishi bilan surunkali kechish",
        "Surunkali uyqusizlik, e'tibor va o'zlashtirishning pasayishi",
        "Bronxial astma va allergik rinit bilan birga kelishi",
      ],
    },
    {
      id: "eczema",
      name: "Ekzema",
      about:
        "Ekzema — terining yuza qatlamlarining yallig'lanishi bo'lib, qichishish, shish va mayda pufakchalar paydo bo'lishi bilan kechadi. U chin, mikrobli, seboreyali va kasbiy turlarga bo'linadi va qaytalanishga moyil.",
      causes: [
        "Kontakt moddalar yoki mahsulotlarga sekin turdagi allergik reaksiya",
        "Surunkali infeksiya o'choqlari, oshqozon-ichak trakti kasalliklari",
        "Stress va asab tizimi ishining buzilishi",
        "Maishiy kimyo, suv, metallar bilan doimiy aloqa",
      ],
      symptoms: [
        "Teri sohasining qizarishi va shishishi",
        "Ochilib, ho'l bo'ladigan mayda pufakchalar",
        "Po'stloqlar, po'st tashlash, yoriqlar",
        "Kuchli qichishish va achishish",
      ],
      diagnostics: [
        "Ko'rik va ekzema shaklini aniqlash",
        "Ko'rsatma bo'lsa allergologik va kontakt sinamalar",
        "Zamburug' yoki bakterial infeksiya gumon qilinganda mikroskopiya va ekma",
        "Hamroh kasalliklarni aniqlash uchun tekshiruv",
      ],
      treatment: [
        "Allergen va bezovta qiluvchi omillar bilan aloqani to'xtatish",
        "Bosqichga qarab tashqi vositalar: quritadigan, yallig'lanishga qarshi, yumshatuvchi",
        "Antigistamin va tinchlantiruvchi terapiya — shifokor buyurig'iga ko'ra",
        "Hamroh kasalliklarni davolash, oziq-ovqat allergiyasida parhez",
      ],
      risks: [
        "Tez-tez qaytalanadigan surunkali shaklga o'tish",
        "Ho'l o'choqlarga ikkilamchi infeksiya qo'shilishi",
        "Chuqur yoriqlar, terining qalinlashishi va chandiqlanishi",
        "Qo'llar zararlanganda mehnat qobiliyatining buzilishi",
      ],
    },
    {
      id: "alopecia",
      name: "Alopesiya",
      about:
        "Alopesiya — sochning to'kilishi yoki siyraklashishi bo'lib, diffuz, uyali yoki androgen turda bo'ladi. Sabablari turlicha, shuning uchun davolash sababni qidirishdan boshlanadi.",
      causes: [
        "Gormonal buzilishlar: qalqonsimon bez, androgenlar, tug'ruqdan keyingi davr",
        "Temir, D vitamini, rux va oqsil tanqisligi",
        "Stress, o'tkazilgan infeksiyalar, vaznning keskin kamayishi",
        "Autoimmun jarayonlar, irsiyat, bosh terisining zamburug' kasalliklari",
      ],
      symptoms: [
        "Kuniga 100 tadan ortiq soch to'kilishi va sezilarli siyraklashish",
        "Yumaloq, silliq kal o'choqlar",
        "Oraliq kengayishi, chakka va tepada kallik",
        "Sochning mo'rtlashishi va ingichkalashishi, bosh terisida qichishish va po'st tashlash",
      ],
      diagnostics: [
        "Bosh terisini ko'rik va trixoskopiya",
        "Tahlillar: ferritin, qalqonsimon bez gormonlari, jinsiy gormonlar, D vitamini",
        "Ko'rsatma bo'lsa zamburug' infeksiyasiga tekshiruv",
        "Zarur bo'lsa qo'shni mutaxassislar maslahati",
      ],
      treatment: [
        "Sababni davolash: tanqisliklar va gormonal fonni tuzatish",
        "Soch o'sishini rag'batlantiruvchi tashqi dorilar (minoksidil va boshqalar)",
        "Bosh terisi uchun inyeksion va fizioterapevtik usullar",
        "Uyali alopesiyada — yallig'lanishga qarshi va immunomodulyator terapiya",
        "Parvarish va ovqatlanish bo'yicha tavsiyalar",
      ],
      risks: [
        "Siyraklashishning kuchayishi va follikulalarning chandiqli almashinuvi",
        "Kech tashxisda sochning qaytmas yo'qolishi",
        "Soch to'kilishiga sabab bo'lgan aniqlanmagan sistem kasallik",
        "Xavotir va hayot sifatining pasayishi",
      ],
    },
    {
      id: "vitiligo",
      name: "Vitiligo",
      about:
        "Vitiligo — orttirilgan pigmentatsiya buzilishi: o'choqlarda melanotsitlar yo'q bo'lib, teri rangini yo'qotadi. Kasallik yuqumli emas va hayot uchun xavfli emas, lekin kuzatuvni talab qiladi.",
      causes: [
        "Autoimmun mexanizm: immun tizimi melanotsitlarni zararlaydi",
        "Irsiy moyillik",
        "Qo'zg'atuvchi omillar sifatida stress, teri jarohatlari va kuyishlar",
        "Qalqonsimon bezning autoimmun kasalliklari bilan birga kelishi",
      ],
      symptoms: [
        "Aniq chegarali oq dog'lar, ko'pincha qo'llarda, yuzda, ko'z va og'iz atrofida",
        "Dog' sohasida sochning rangsizlanishi",
        "O'choqlarning simmetrik joylashuvi",
        "Jarohat va quyosh kuyishidan keyin yangi dog'lar paydo bo'lishi",
      ],
      diagnostics: [
        "Ko'rik, shu jumladan Vud chiroqi nurida",
        "Faollikni aniqlash: barqaror yoki rivojlanuvchi kechish",
        "Qalqonsimon bez gormonlari va autoimmun markerlarga tahlillar",
        "Oq dog'larning boshqa sabablarini istisno qilish: zamburug', yallig'lanishdan keyingi",
      ],
      treatment: [
        "Tashqi yallig'lanishga qarshi dorilar va kalsinevrin ingibitorlari",
        "Pigmentning qaytishini rag'batlantirish uchun tor spektrli fototerapiya",
        "Hamroh autoimmun buzilishlarni davolash",
        "Terini quyoshdan himoya qilish, bemor xohlasa niqoblovchi vositalar",
      ],
      risks: [
        "Zararlanish maydonining kengayishi va yangi o'choqlar paydo bo'lishi",
        "Rangsizlangan terining quyoshda kuyishi va jarohatlanish xavfining oshishi",
        "Boshqa autoimmun kasalliklar bilan birga kelishi",
        "Hissiy tashvishlar, o'ziga ishonchning pasayishi",
      ],
    },
    {
      id: "pigmentation",
      name: "Pigmentatsiya",
      about:
        "Pigmentatsiya — terida melaninning ortiqcha to'planishi bo'lib, to'q dog'lar paydo bo'ladi. Eng ko'p uchraydigan shakllari: xloazma (melazma), lentigo, sepkil va yallig'lanishdan keyingi dog'lar.",
      causes: [
        "Ultrabinafsha nur va quyosh kuyishlari",
        "Gormonal o'zgarishlar: homiladorlik, gormonal kontratseptsiya, qalqonsimon bez kasalliklari",
        "Teri yallig'lanishi va jarohatlari: akne, kuyishlar, agressiv muolajalar",
        "Yoshga bog'liq o'zgarishlar, fotosensibilizatsiya qiluvchi dorilar va kosmetika",
      ],
      symptoms: [
        "Yuz, ko'krak va qo'llarda to'q dog'lar",
        "Yonoq, peshona va yuqori lab ustida simmetrik jigarrang dog'lar (xloazma)",
        "Yozda dog'larning kuchayishi va qishda susayishi",
        "Teri tusining notekisligi va xiraligi",
      ],
      diagnostics: [
        "Ko'rik va dermatoskopiya: xavfsiz dog'larni xavfli hosilalardan farqlash",
        "Pigment joylashgan chuqurlikni aniqlash",
        "Sistem sabab gumon qilinganda gormon tahlillari va tekshiruv",
      ],
      treatment: [
        "Ultrabinafshadan kundalik himoya (SPF 50 va undan yuqori) — davoning asosi",
        "Oqartiruvchi vositalar: azelain, traneksam, koyev kislotalari",
        "Ko'rsatma bo'lsa kimyoviy pilinglar va lazer usullari",
        "Asosiy sababni davolash: gormonal yoki yallig'lanish",
      ],
      risks: [
        "Dog'lar to'qlashadi va kattalashadi, davolashga qiyin beriladi",
        "Pigment dog'iga o'xshash xavfli hosilani o'tkazib yuborish",
        "Fotohimoyaga rioya qilinmasa qayta paydo bo'lishi",
        "Kosmetik noqulaylik",
      ],
    },
  ],
  gynecology: [
    {
      id: "infertility",
      name: "Bepushtlikni davolash",
      about:
        "Himoyasiz muntazam jinsiy hayotda bir yil ichida (35 yoshdan keyin — 6 oyda) homiladorlik bo'lmasa, bepushtlik haqida gapiriladi. Sabab ayolda, erkakda yoki ikkalasida bo'lishi mumkin.",
      causes: [
        "Ovulyatsiya buzilishi: polikistoz tuxumdon sindromi, qalqonsimon bez kasalliklari, prolaktin",
        "Bachadon naylarining tiqilishi, bitishmalar, endometrioz",
        "Yallig'lanish kasalliklari va jinsiy yo'l bilan yuqadigan infeksiyalar",
        "Erkak omili, yosh, ortiqcha yoki yetishmaydigan vazn",
      ],
      symptoms: [
        "Bir yil ichida homiladorlik bo'lmasligi",
        "Notekis, juda siyrak yoki ko'p hayz sikli",
        "Og'riqli hayz, qorin pastida og'riq, yaqinlikda og'riq",
        "Ko'pincha shikoyat bo'lmaydi — sabab tekshiruvda aniqlanadi",
      ],
      diagnostics: [
        "Ko'rik, anamnez, ovulyatsiyani baholash bilan kichik chanoq a'zolari UZIsi",
        "Gormonlar: FSG, LG, prolaktin, TTG, AMG, testosteron",
        "Bachadon naylari o'tkazuvchanligi, surtmalar va infeksiyalarga tahlillar",
        "Sherikning spermogrammasi — tekshiruvning majburiy qismi",
      ],
      treatment: [
        "Aniqlangan sababni davolash: gormonal tuzatish, yallig'lanishga qarshi terapiya",
        "UZI nazoratida ovulyatsiyani rag'batlantirish",
        "Bitishmalar, mioma, polipda jarrohlik usullari (laparoskopiya, gisteroskopiya)",
        "Vazn, turmush tarzi va siklni rejalashtirish bo'yicha tavsiyalar",
        "Zarur bo'lsa yordamchi reproduktiv texnologiyalar mutaxassisiga yo'llanma",
      ],
      risks: [
        "Yosh ulg'ayishi bilan homiladorlik ehtimoli kamayadi, shuning uchun vaqt muhim",
        "Endometrioz, bitishma jarayoni va surunkali yallig'lanishning kuchayishi",
        "Aniqlanmagan gormonal buzilishlar va diabet xavfi",
        "Juftlikda hissiy zo'riqish va nizolar",
      ],
    },
    {
      id: "inflammation",
      name: "Yallig'lanish kasalliklari",
      about:
        "Yallig'lanish kasalliklariga kolpit, servitsit, endometrit, adneksit va ayol jinsiy a'zolarining boshqa yallig'lanishlari kiradi. Ularni bakteriya, virus va zamburug'lar keltirib chiqaradi; o'tkir va surunkali bo'ladi.",
      causes: [
        "Jinsiy yo'l bilan yuqadigan infeksiyalar va qin mikroflorasi muvozanati buzilishi",
        "Immunitetning pasayishi, sovqotish, stress",
        "Bachadon ichi aralashuvlari: abortlar, tug'ruq, bachadon ichi vositalari, diagnostik muolajalar",
        "Gigiyenaga rioya qilmaslik, sheriklarning tez-tez almashishi",
      ],
      symptoms: [
        "Qorin pastida va belda og'riq, sovqotganda kuchayadi",
        "Hidli patologik ajralmalar, qichishish, achishish",
        "Siyishda va yaqinlikda og'riq, hayzlar orasida qonli ajralmalar",
        "O'tkir kechganda harorat ko'tarilishi, holsizlik",
      ],
      diagnostics: [
        "Ko'zgularda ko'rik, flora va sitologiyaga surtma",
        "Infeksiyalarga PZR tahlillar, sezuvchanlikni aniqlash bilan ekma",
        "Kichik chanoq a'zolari UZIsi",
        "Bachadon bo'yni yallig'lanishida kolposkopiya",
      ],
      treatment: [
        "Etiotrop terapiya: tahlil natijalariga ko'ra antibakterial, zamburug'ga qarshi, virusga qarshi dorilar",
        "Qin mikroflorasini tiklash",
        "Jinsiy yo'l bilan yuqadigan infeksiyalarda jinsiy sherikni davolash",
        "Davo kursidan keyin nazorat tahlillari",
      ],
      risks: [
        "Surunkali yallig'lanish va tez-tez qaytalanish",
        "Bachadon naylarida bitishmalar va tiqilish, bachadondan tashqari homiladorlik",
        "Bepushtlik, homiladorlikning tushib qolishi",
        "Surunkali chanoq og'rig'i",
      ],
    },
    {
      id: "myoma",
      name: "Mioma",
      about:
        "Bachadon miomasi — bachadon devorining mushak to'qimasidan chiqadigan xavfsiz o'sma. U 30 yoshdan oshgan ko'p ayollarda uchraydi, gormonlar ta'sirida o'sadi va uzoq vaqt shikoyat bermasligi mumkin.",
      causes: [
        "Gormonal omillar: estrogen va progesteronning ortiqligi",
        "Irsiy moyillik",
        "Kech tug'ruq, abortlar, yallig'lanish kasalliklari",
        "Ortiqcha vazn, arterial gipertenziya, stress",
      ],
      symptoms: [
        "Ko'p va uzoq davom etadigan hayz, qon laxtalari",
        "Qorin pastida tortuvchi og'riq va og'irlik hissi, belda og'riq",
        "Katta tugunlarda tez-tez siyish va ich qotishi",
        "Kamqonlikdan holsizlik va oqarish; homilador bo'lishda qiyinchilik",
      ],
      diagnostics: [
        "Ginekologik ko'rik",
        "Kichik chanoq a'zolari UZIsi: tugunlar o'lchami, soni va joylashuvi",
        "Kamqonlikni baholash uchun umumiy qon tahlili va temir",
        "Ko'rsatma bo'lsa MRT va gisteroskopiya",
      ],
      treatment: [
        "Shikoyatsiz kichik tugunlarda UZI bilan kuzatuv",
        "Dori terapiyasi: gormonal dorilar, qon ketishini to'xtatish, kamqonlikni davolash",
        "Kam invaziv usullar: bachadon arteriyalari emboliyasi, FUZ-ablyatsiya",
        "Miomektomiya (bachadonni saqlab tugunlarni olib tashlash), ko'rsatma bo'lsa — bachadonni olib tashlash",
      ],
      risks: [
        "Qon yo'qotishdan surunkali kamqonlik",
        "Tugunning tez o'sishi, nekroz, siydik yo'llari va ichakning siqilishi",
        "Bepushtlik, homila tushishi, homiladorlik va tug'ruq asoratlari",
        "Kamdan-kam hollarda — yomon sifatli o'zgarish, shuning uchun nazorat kerak",
      ],
    },
    {
      id: "cyst",
      name: "Kista",
      about:
        "Tuxumdon kistasi — tuxumdon to'qimasi ichidagi suyuqlikli bo'shliq. O'zi o'tib ketadigan funksional kistalar va kuzatuv yoki davo talab qiladigan barqaror kistalar (endometrioid, dermoid, kistadenomalar) bo'ladi.",
      causes: [
        "Gormonal muvozanatning buzilishi va ovulyatsiya buzilishi",
        "Endometrioz",
        "Bachadon ortiqlarining yallig'lanish kasalliklari",
        "Ovulyatsiyani rag'batlantiruvchi dorilarni qabul qilish, stress, abortlar",
      ],
      symptoms: [
        "Qorin pastida bir tomonda tortuvchi yoki o'tkir og'riq",
        "Sikl buzilishlari, hayzning kechikishi yoki hayzlar orasidagi ajralmalar",
        "Taranglik hissi, yaqinlikda va jismoniy zo'riqishda og'riq",
        "Ko'pincha shikoyatsiz kechadi va UZIda aniqlanadi",
      ],
      diagnostics: [
        "Ginekologik ko'rik va kichik chanoq a'zolari UZIsi, dopplerometriya",
        "Ko'rsatma bo'lsa onkomarkerlar (SA-125, HE4)",
        "Gormonal tahlillar",
        "Murakkab hollarda MRT",
      ],
      treatment: [
        "Funksional kistalarda 1–3 hayz sikli o'tgach UZI bilan kuzatuv",
        "Yangi kistalar o'sishini bostirish uchun gormonal terapiya",
        "Tuxumdon to'qimasini saqlab kistani laparoskopik olib tashlash",
        "Kista yorilganda yoki oyoqchasi buralganda shoshilinch operatsiya",
      ],
      risks: [
        "Kistaning yorilishi va ichki qon ketish",
        "Kista oyoqchasining buralishi va tuxumdon nekrozi",
        "Tuxumdon zaxirasining kamayishi, bepushtlik",
        "Ayrim kista turlarining yomon sifatli o'zgarishi",
      ],
    },
    {
      id: "pregnancy",
      name: "Homiladorlikni olib borish",
      about:
        "Homiladorlikni olib borish — butun muddat davomida muntazam ko'riklar, tahlillar va UZI bo'lib, ona va chaqaloqdagi og'ishlarni o'z vaqtida payqash uchun kerak. Kuzatuvni 12 haftagacha boshlagan ma'qul.",
      causes: [
        "18 yoshgacha yoki 35 yoshdan keyingi yosh",
        "Surunkali kasalliklar: gipertoniya, diabet, qalqonsimon bez va buyrak kasalliklari",
        "Homila tushishi, oldingi homiladorliklardagi asoratlar, ko'p homilalik",
        "Chekish, alkogol, yetishmaydigan yoki ortiqcha vazn",
      ],
      symptoms: [
        "Hayzning kechikishi va homiladorlik testining musbat bo'lishi",
        "Ko'ngil aynishi, holsizlik, tez-tez siyish",
        "Xavotirli belgilar: qonli ajralmalar, kuchli og'riq, shishlar, bosh og'rig'i, qimirlashning kamayishi — shoshilinch maslahat kerak",
        "Homiladorlikni rejalashtirish va unga tayyorgarlik",
      ],
      diagnostics: [
        "Muddatlar bo'yicha skriningler: har trimestrda UZI va tahlillar",
        "Umumiy qon va siydik tahlillari, gormonlar, qon guruhi va rezus-omil",
        "Arterial bosim va vaznni nazorat qilish",
        "Infeksiyalarga testlar, 24–28-haftada glyukozaga tolerantlik testi",
      ],
      treatment: [
        "Individual kuzatuv rejasi va tashrif jadvali",
        "Ko'rsatma bo'yicha foliy kislotasi, temir, D vitamini va boshqa dorilarni buyurish",
        "Ovqatlanish, jismoniy faollik va kun tartibi bo'yicha tavsiyalar",
        "Asoratlarni o'z vaqtida davolash: kamqonlik, bola tashlash xavfi, gestatsion diabet, preeklampsiya",
        "Tug'ruqqa tayyorgarlik va tug'ish usulini tanlash bo'yicha maslahat",
      ],
      risks: [
        "Asoratlarni o'tkazib yuborish: kamqonlik, preeklampsiya, gestatsion diabet, bola tashlash xavfi",
        "Homila rivojlanish nuqsonlarini kech aniqlash",
        "Tug'ruqda ona va chaqaloq hayoti va sog'lig'iga xavf",
        "Muddatidan oldin tug'ruq va tug'ilishda vaznning kamligi",
      ],
    },
    {
      id: "contraception",
      name: "Kontratseptsiya tanlash",
      about:
        "Kontratseptsiya tanlash — sog'liq, yosh va rejalarni hisobga olib, istalmagan homiladorlikdan ishonchli saqlanish usulini individual tanlash. Usul aynan sizga mos kelishi va zarar bermasligi kerak.",
      causes: [
        "Yosh, tug'ruqlar soni va kelgusi homiladorlik rejalari",
        "Surunkali kasalliklar: gipertoniya, migren, tromboz, jigar kasalliklari",
        "Chekish, ortiqcha vazn",
        "Siklning muntazamligi, mioma, endometrioz, kistalar mavjudligi",
      ],
      symptoms: [
        "Istalmagan homiladorlikdan himoya kerak",
        "Notekis yoki og'riqli sikl, akne, ortiqcha tuklanishda usul kerak",
        "Nojo'ya ta'sirlar sababli joriy usulni almashtirish kerak",
        "Tug'ruqdan, abortdan keyin yoki emizish davrida",
      ],
      diagnostics: [
        "Maslahat va anamnez to'plash, qarshi ko'rsatmalarni baholash",
        "Bosim va vaznni o'lchash",
        "Ko'rsatma bo'lsa ko'rik, UZI va surtmalar",
        "Zarur bo'lsa gormonlar va qon ivishiga tahlillar",
      ],
      treatment: [
        "Usul tanlash: kombinatsiyalangan va progestinli tabletkalar, bachadon ichi tizimi yoki spiral, implant, to'siq usullari",
        "Qo'llash qoidalari va dori o'tkazib yuborilganda ko'riladigan choralarni tushuntirish",
        "Ko'tarilishni baholash uchun 2–3 oydan keyin nazorat tashrifi",
        "Zarur bo'lsa usulni almashtirish yoki bekor qilish",
      ],
      risks: [
        "Istalmagan homiladorlik va asoratli abort",
        "Tabletkalarni o'zboshimchalik bilan tanlaganda nojo'ya ta'sirlar va tromboz xavfi",
        "Ishonchsiz usullardan foydalanganda yolg'on himoya hissi",
        "Dori qabuli bilan yashiringan, aniqlanmagan kasalliklar",
      ],
    },
    {
      id: "erosion",
      name: "Bachadon bo'yni eroziyasini davolash",
      about:
        "Eroziya — bachadon bo'yni epiteliysi butunligining buzilishi. Ko'pincha uning ortida ektopiya (fiziologik holat) yoki yallig'lanish yashirinadi; chin eroziya kamroq uchraydi. Saratondan oldingi o'zgarishlarni istisno qilish muhim.",
      causes: [
        "Infeksiyalar: odam papillomavirusi, xlamidiya, gerpes, trixomonadalar",
        "Bachadon bo'yni va qinning yallig'lanishi",
        "Mexanik jarohatlar: tug'ruq, abortlar, spirinsovka va tamponlarni noto'g'ri qo'llash",
        "Gormonal o'zgarishlar va sikl buzilishlari",
      ],
      symptoms: [
        "Ko'pincha shikoyat bo'lmaydi, profilaktik ko'rikda topiladi",
        "Yaqinlikdan keyin kontakt qonli ajralmalar",
        "Ko'p shilimshiq yoki yiringli ajralmalar",
        "Noqulaylik va qorin pastida tortuvchi og'riq",
      ],
      diagnostics: [
        "Ko'zgularda ko'rik va kengaytirilgan kolposkopiya",
        "Surtma sitologiyasi (PAP-test), yuqori xavfli VPCHga PZR",
        "Flora va infeksiyalarga surtma va tahlillar",
        "Displaziyadan shubha qilinganda nishonli biopsiya",
      ],
      treatment: [
        "Tahlil natijalariga ko'ra yallig'lanish va infeksiyalarni davolash",
        "Mikroflorani tiklash",
        "Ko'rsatma bo'lsa o'zgargan joyni destruksiya qilish (radioto'lqin, lazer, kriodestruksiya)",
        "Dinamik kuzatuv va takroriy kolposkopiya hamda sitologiya",
      ],
      risks: [
        "Bachadon bo'ynining surunkali yallig'lanishi",
        "Yuqori xavfli VPCH bo'lganda displaziya va bachadon bo'yni saratoniga o'tish",
        "Bo'yinning chandiqli deformatsiyasi va tug'ruqdagi asoratlar",
        "Uzoq yallig'lanishda bepushtlik",
      ],
    },
  ],
  endocrinology: [
    {
      id: "thyroid",
      name: "Bolalar va kattalarda qalqonsimon bez kasalliklari",
      about:
        "Qalqonsimon bez modda almashinuvini, yurakni, asab tizimini va o'sishni boshqaradigan gormonlar ishlab chiqaradi. Tez-tez uchraydigan kasalliklarga gipotireoz, tireotoksikoz, tugunlar va buqoq, autoimmun tireoidit kiradi.",
      causes: [
        "Yod tanqisligi va autoimmun jarayonlar (Xashimoto tireoiditi, Greyvs kasalligi)",
        "Irsiyat, radiatsiya ta'siri",
        "Homiladorlik va tug'ruqdan keyingi davr",
        "Bolalarda bezning tug'ma anomaliyalari",
      ],
      symptoms: [
        "Gipotireoz: holsizlik, uyquchanlik, sovuqqa chidamsizlik, vazn ortishi, ich qotishi, quruq teri, soch to'kilishi",
        "Tireotoksikoz: asabiylik, vazn yo'qotish, yurak urishi, terlash, qo'l titrashi",
        "Bo'yinning kattalashishi, tomoqda bo'g'ilish hissi, yutishda qiyinchilik",
        "Bolalarda: bo'y o'sishidan orqada qolish, o'zlashtirishning pasayishi, rivojlanishning kechikishi",
      ],
      diagnostics: [
        "Ko'rik va bezni paypaslash",
        "Gormonlar: TTG, erkin T4 va T3, TPO va TTG retseptorlariga antitanalar",
        "Qalqonsimon bez UZIsi",
        "Ko'rsatma bo'lsa tugunlarning ingichka ignali biopsiyasi",
      ],
      treatment: [
        "Gipotireozda levotiroksin bilan o'rnini bosuvchi terapiya",
        "Tireotoksikozda tireostatiklar; zarur bo'lsa radioyod terapiyasi yoki operatsiya",
        "Tugun va buqoqni kuzatish, yomon sifatlilikdan shubha qilinganda jarrohlik davosi",
        "Gormonlarni muntazam nazorat qilish va dozani tanlash",
        "Yod tanqisligining oldini olish",
      ],
      risks: [
        "Yurak ritmi buzilishlari, arterial gipertenziya, osteoporoz",
        "Bepushtlik va homiladorlik asoratlari",
        "Bolalarda jismoniy va aqliy rivojlanishning kechikishi",
        "Og'ir kriz holatlari: miksedematoz koma, tireotoksik kriz",
      ],
    },
    {
      id: "growth",
      name: "Bolalar va o'smirlarda jismoniy rivojlanishning kechikishi",
      about:
        "O'sish va rivojlanishning kechikishi — bolaning bo'yi, vazni yoki jinsiy yetilish sur'ati bo'yicha tengdoshlaridan orqada qolishi. Sabablari gormonal, almashinuv yoki irsiy bo'lishi mumkin, shuning uchun aniq diagnostika kerak.",
      causes: [
        "O'sish gormoni tanqisligi, qalqonsimon bez kasalliklari",
        "Jinsiy rivojlanishning kechikishi, gormonal buzilishlar",
        "Surunkali kasalliklar: seliakiya, buyrak va yurak kasalliklari",
        "Yetarli ovqatlanmaslik, D vitamini tanqisligi, genetik sindromlar",
      ],
      symptoms: [
        "Yoshga nisbatan me'yordan past bo'y yoki bo'yning sekin o'sishi (yiliga 4–5 sm dan kam)",
        "Jinsiy yetilishning kech boshlanishi",
        "Vaznning sekin ortishi, tez charchash",
        "Tana nisbatlari va tashqi ko'rinishi yoshidan kichik",
      ],
      diagnostics: [
        "Bo'y, vaznni o'lchash, sentil jadvallari bo'yicha baholash va o'sish sur'ati",
        "Suyak yoshini aniqlash uchun qo'l rentgeni",
        "Gormonlar: IOF-1, TTG, T4, jinsiy gormonlar, kortizol",
        "Yashirin surunkali kasalliklarga tahlillar; zarur bo'lsa stimulyatsion testlar",
      ],
      treatment: [
        "Asosiy sababni davolash: gormonal dorilar, hamroh kasalliklar terapiyasi",
        "Ko'rsatma bo'lsa o'sish gormoni bilan o'rnini bosuvchi terapiya",
        "Yetarli oqsil, kalsiy va D vitaminli ovqatlanish, uyqu va faollik tartibi",
        "Har 3–6 oyda dinamikada kuzatuv",
      ],
      risks: [
        "Vaqt o'tkazib yuborilsa yakuniy bo'y past bo'ladi: o'sish zonalari yopiladi",
        "Jinsiy yetilish va suyak zichligining buzilishi",
        "Jiddiy surunkali kasallikni yashiradigan orqada qolish",
        "Jamoada ruhiy qiyinchiliklar",
      ],
    },
    {
      id: "overweight",
      name: "Ortiqcha vazn",
      about:
        "Ortiqcha vazn va semizlik — ortiqcha yog' to'planib, ko'p kasalliklar xavfini oshiradigan surunkali holat. Tashxis tana vazni indeksi (TVI ≥ 25) va bel aylanasi bo'yicha qo'yiladi.",
      causes: [
        "Energiya muvozanatining buzilishi: ortiqcha kaloriya va kam harakat turmush tarzi",
        "Gormonal sabablar: gipotireoz, insulin qarshiligi, Kushing sindromi, PKTS",
        "Irsiyat, uyqu buzilishlari, stress",
        "Ayrim dorilarni qabul qilish",
      ],
      symptoms: [
        "Parhezda ham ketmaydigan ortiqcha vazn",
        "Hansirash, tez charchash, terlashning kuchayishi",
        "Bo'g'imlar va belda og'riq, xurrak",
        "Bosim va qand ko'tarilishi, sikl buzilishlari",
      ],
      diagnostics: [
        "TVI, bel aylanasi va tana tarkibini hisoblash",
        "Glyukoza, glikozillangan gemoglobin, insulin, HOMA-IR indeksi, lipid profili",
        "TTG, kortizol, jinsiy gormonlar",
        "Ko'rsatma bo'lsa jigar UZIsi, bosim, EKG",
      ],
      treatment: [
        "Kaloriyaning o'rtacha tanqisligi bilan individual ovqatlanish rejasi",
        "Jismoniy faollikni bosqichma-bosqich oshirish",
        "Gormonal buzilishlar va hamroh holatlarni davolash",
        "Dorisiz choralar yetarli bo'lmaganda shifokor buyurgan dori terapiyasi",
        "Xulq-atvor bo'yicha qo'llab-quvvatlash va natijani mustahkamlash",
      ],
      risks: [
        "2-tur qandli diabet va gipertoniya kasalligi",
        "Ateroskleroz, yurak ishemik kasalligi, insult",
        "Jigarning yog'li kasalligi, bo'g'im kasalliklari, uyqu apnoesi",
        "Bepushtlik va ayrim saraton turlari xavfining oshishi",
      ],
    },
    {
      id: "metabolic",
      name: "Metabolik sindrom",
      about:
        "Metabolik sindrom — abdominal semizlik, yuqori bosim, qon qandi va yog'larining buzilishi birikmasi. Sindromning asosi — insulin qarshiligi bo'lib, bunda hujayralar insulinni yomonroq qabul qiladi.",
      causes: [
        "Visseral semizlik va kam harakat turmush tarzi",
        "Diabet va gipertoniyaga irsiy moyillik",
        "Tez uglevodlar va to'yingan yog'lar ko'p ovqatlanish",
        "Surunkali stress, uyqusizlik, chekish",
      ],
      symptoms: [
        "Bel aylanasi: erkaklarda 94 sm dan, ayollarda 80 sm dan ortiq",
        "Yuqori bosim, bosh og'rig'i",
        "Ovqatdan keyin holsizlik va uyquchanlik, shirinlikka ishtiyoq",
        "Terining bukilmalarida to'q joylar (akantoz)",
      ],
      diagnostics: [
        "Bel, TVI va bosimni o'lchash",
        "Och qoringa glyukoza, glyukozaga tolerantlik testi, insulin, HOMA-IR, glikozillangan gemoglobin",
        "Xolesterin, PZLP, YuZLP, triglitseridlar",
        "Jigar va yurak-qon tomir xavfini baholash",
      ],
      treatment: [
        "Vaznni 5–10% kamaytirish — davoning asosi",
        "O'rta yer dengizi parhezi turida ovqatlanish, qand va tuzni cheklash",
        "Haftasiga kamida 150 daqiqa jismoniy faollik",
        "Shifokor buyurig'iga ko'ra bosim, qand va xolesterinni dori bilan tuzatish",
        "Tahlillarni muntazam nazorat qilish",
      ],
      risks: [
        "2-tur qandli diabet",
        "Miokard infarkti, insult, ateroskleroz",
        "Sirrozga o'tadigan jigarning yog'li kasalligi",
        "Gormonal fon buzilishlari va bepushtlik",
      ],
    },
    {
      id: "endocrine-infertility",
      name: "Ayollarda endokrin bepushtlik",
      about:
        "Endokrin bepushtlik gormonal buzilishlar bilan bog'liq bo'lib, bunda ovulyatsiya bo'lmaydi yoki kam bo'ladi. Bu bepushtlikning eng ko'p uchraydigan va davolashga yaxshi beriladigan sabablaridan biri.",
      causes: [
        "Polikistoz tuxumdon sindromi va insulin qarshiligi",
        "Qalqonsimon bez kasalliklari, yuqori prolaktin",
        "Lyuteal faza yetishmovchiligi, tuxumdonlarning muddatidan oldin tugashi",
        "Ortiqcha yoki yetishmaydigan vazn, stress",
      ],
      symptoms: [
        "Notekis hayz yoki uning yo'qligi",
        "Yuz va tanada ortiqcha tuklanish, akne, yog'li teri",
        "Vazn ortishi, ayniqsa qorin sohasida",
        "Bir yil ichida homiladorlik bo'lmasligi",
      ],
      diagnostics: [
        "Gormonal profil: FSG, LG, prolaktin, TTG, testosteron, DGEA-S, AMG, progesteron",
        "Tuxumdonlar UZIsi va follikulometriya",
        "Glyukoza, insulin, lipidlar",
        "Bachadon naylari o'tkazuvchanligi va sherikning spermogrammasi",
      ],
      treatment: [
        "Vazn kamaytirish va insulin qarshiligini tuzatish",
        "Ko'rsatma bo'lsa qalqonsimon bezni davolash, prolaktinni kamaytirish",
        "UZI nazoratida ovulyatsiyani chaqirish",
        "Lyuteal fazani qo'llab-quvvatlash",
        "Samarasiz bo'lsa — yordamchi reproduktiv texnologiyalar mutaxassisiga yo'llanma",
      ],
      risks: [
        "Davolanmasa bepushtlik",
        "Hayz siyrak bo'lganda endometriy giperplaziyasi va bachadon tanasi saratoni xavfi",
        "2-tur qandli diabet, semizlik, dislipidemiya",
        "Homiladorlikning tushib qolishi va asoratlari",
      ],
    },
    {
      id: "diabetes",
      name: "1 va 2-tur qandli diabet",
      about:
        "Qandli diabet — qonda glyukoza darajasi yuqori bo'ladigan surunkali kasallik. 1-turda organizm insulinni deyarli ishlab chiqarmaydi, 2-turda hujayralar uni qabul qilmaydi va vaqt o'tishi bilan insulin yetishmay qoladi.",
      causes: [
        "1-tur: oshqozon osti bezi hujayralarining autoimmun yemirilishi, irsiyat",
        "2-tur: ortiqcha vazn, kam harakat turmush tarzi, yosh, irsiyat",
        "Homiladorlik davridagi gestatsion diabet, pankreatit va ayrim dorilarni qabul qilish",
        "Qo'zg'atuvchi omillar sifatida infeksiyalar va stress",
      ],
      symptoms: [
        "Kuchli chanqoq va tez-tez siyish",
        "Charchoq, vaznning kamayishi yoki ortishi, ishtahaning ortishi",
        "Teri qichishi, yaralarning sekin bitishi, zamburug' infeksiyalari",
        "Ko'rishning xiralashishi; aseton hidi va ko'ngil aynishi — 1-tur uchun xavfli belgi",
      ],
      diagnostics: [
        "Och qoringa glyukoza va glikozillangan gemoglobin (HbA1c)",
        "Shubhali qiymatlarda glyukozaga tolerantlik testi",
        "Diabet turini aniqlash uchun C-peptid va antitanalar",
        "Asoratlarni baholash: ko'z, buyrak, nervlar, oyoq, yurak",
      ],
      treatment: [
        "1-tur diabet: insulin terapiyasi va o'z-o'zini nazorat qilishni o'rgatish",
        "2-tur diabet: ovqatlanish, faollik, qandni tushiruvchi dorilar, zarur bo'lsa insulin",
        "Glyukozani o'z-o'zini nazorat qilish va bosimni muntazam o'lchash",
        "Asoratlar oldini olish: ko'z, buyrak va oyoqlarning yillik ko'riklari",
        "Shifokor belgilaydigan HbA1c ning individual maqsadli qiymatlari",
      ],
      risks: [
        "Qon tomirlar zararlanishi: infarkt, insult, oyoqlarda qon aylanishining buzilishi",
        "Ko'rish yo'qolishigacha retinopatiya, buyrak yetishmovchiligi bilan nefropatiya",
        "Neyropatiya va amputatsiya xavfi bilan diabetik oyoq sindromi",
        "O'tkir holatlar: ketoatsidoz, giperosmolyar koma, og'ir gipoglikemiya",
      ],
    },
  ],
};
