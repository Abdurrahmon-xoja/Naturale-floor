export type Locale = 'ru' | 'uz' | 'en';

export type Product = {
  slug: string;
  name: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  category: 'parquet' | 'engineered' | 'laminate' | 'spc';
  material: string;
  thicknessMm: number;
  plankSize: string;
  color: string;
  surface: string;
  originCountry: string;
  pricePerM2: number;
  images: string[];
  modelGlb?: string;
  modelUsdz?: string;
  tourUrl?: string;
  description: Record<Locale, string>;
  relatedSlugs?: string[];
};

export const products: Product[] = [
  {
    slug: 'oak-natural-brushed',
    name: {
      ru: 'Дуб Натуральный Brushed',
      uz: 'Cho\'tkali Tabiiy Eman',
      en: 'Natural Brushed Oak',
    },
    subtitle: {
      ru: 'Массивная доска • Германия',
      uz: 'Massiv taxta • Germaniya',
      en: 'Solid parquet • Germany',
    },
    category: 'parquet',
    material: 'Дуб (Quercus robur)',
    thicknessMm: 20,
    plankSize: '1900 × 190 × 20 мм',
    color: 'Натуральный / Light honey',
    surface: 'Brushed, матовый масло-воск',
    originCountry: 'Германия',
    pricePerM2: 1_250_000,
    images: [
      '/images/products/oak-natural-brushed-1.jpg',
      '/images/products/oak-natural-brushed-2.jpg',
    ],
    modelGlb: '/models/oak-natural-brushed.glb',
    modelUsdz: '/models/oak-natural-brushed.usdz',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: 'Классика европейского паркетного производства — массивная доска из немецкого дуба с брашированной поверхностью. Текстура дерева максимально подчёркнута: мелкие поры раскрыты, годичные кольца чётко читаются.\n\nМасло-восковое покрытие питает древесину изнутри, сохраняя живой тёплый тон. Доска легко поддаётся реставрации на месте без демонтажа.\n\nИдеально для гостиных и спален в стиле скандинавский минимализм, классика или эко-интерьер.',
      uz: 'Nemis emandan tayyorlangan, cho\'tkali yuzaga ega klassik evropa parket taxtalari. Yog\'-mum qoplaması yog\'ochni ichdan to\'yintiradi, jonli iliq rangni saqlaydi.\n\nSkandinaviya minimalizmi, klassika yoki eko-interior uchun ideal.',
      en: 'Classic European solid oak flooring from Germany with a brushed surface finish. The oil-wax coating nourishes the wood from within, preserving a warm living tone. Easy in-situ refinishing without removal.\n\nPerfect for Scandinavian minimalist, classical, or eco interiors.',
    },
    relatedSlugs: ['oak-smoked', 'ash-white', 'american-walnut'],
  },
  {
    slug: 'american-walnut',
    name: {
      ru: 'Орех Американский Селект',
      uz: 'Amerika Yong\'og\'i Select',
      en: 'American Walnut Select',
    },
    subtitle: {
      ru: 'Массивная доска • США',
      uz: 'Massiv taxta • AQSh',
      en: 'Solid parquet • USA',
    },
    category: 'parquet',
    material: 'Орех (Juglans nigra)',
    thicknessMm: 18,
    plankSize: '2200 × 185 × 18 мм',
    color: 'Шоколадно-коричневый',
    surface: 'Гладкий, УФ-масло',
    originCountry: 'США',
    pricePerM2: 1_890_000,
    images: [
      '/images/products/american-walnut-1.jpg',
      '/images/products/american-walnut-2.jpg',
    ],
    modelGlb: '/models/placeholder.glb',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: 'Американский чёрный орех — один из самых роскошных паркетных материалов. Тёмный шоколадный тон с выраженными прожилками создаёт атмосферу состоятельности и тепла.\n\nГрад «Селект» означает минимум сучков и равномерный цвет, что особенно ценится в парадных гостиных и кабинетах.\n\nПокрытие УФ-маслом подчёркивает природную красоту без искусственного блеска.',
      uz: 'Amerika qora yong\'og\'i — parket materiallari orasidagi eng hashamatlilaridan biri. To\'q shokoladli ton va belirgin tomirlar issiqlik va farovonlik muhitini yaratadi.',
      en: 'American Black Walnut — one of the most luxurious flooring materials. The deep chocolate tone with distinct grain creates an atmosphere of warmth and prestige. Select grade means minimal knots and even colour, ideal for living rooms and studies.',
    },
    relatedSlugs: ['oak-natural-brushed', 'beech-steamed', 'oak-smoked'],
  },
  {
    slug: 'ash-white',
    name: {
      ru: 'Ясень Беленый',
      uz: 'Oqartirilgan Kul Daraxti',
      en: 'White Ash',
    },
    subtitle: {
      ru: 'Инженерная доска • Австрия',
      uz: 'Muhandislik taxta • Avstriya',
      en: 'Engineered board • Austria',
    },
    category: 'engineered',
    material: 'Ясень (Fraxinus excelsior)',
    thicknessMm: 15,
    plankSize: '2200 × 200 × 15 мм',
    color: 'Белёный / Pearl',
    surface: 'Brushed, матовый лак',
    originCountry: 'Австрия',
    pricePerM2: 980_000,
    images: [
      '/images/products/ash-white-1.jpg',
      '/images/products/ash-white-2.jpg',
    ],
    modelGlb: '/models/placeholder.glb',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: 'Белёный ясень придаёт помещению воздушность и свет. Выраженная структура волокна, характерная для ясеня, прекрасно читается даже после обработки пигментом.\n\nИнженерная конструкция обеспечивает стабильность размеров при перепадах влажности — незаменима для полов с подогревом (тёплый пол).\n\nОтличный выбор для современных скандинавских и японо-минималистических интерьеров.',
      uz: 'Oqartirilgan kul daraxti xonaga yorug\'lik va hafiflik beradi. Muhandislik konstruktsiyasi namlik o\'zgarishlarida o\'lchamlarning barqarorligini ta\'minlaydi — isitish tizimlari bilan foydalanish uchun ideal.',
      en: 'Whitened ash brings light and airiness to any room. The engineered core provides dimensional stability through humidity changes — ideal for underfloor heating systems. A top choice for modern Scandinavian or Japanese minimalist interiors.',
    },
    relatedSlugs: ['oak-natural-brushed', 'alpine-oak-laminate'],
  },
  {
    slug: 'oak-smoked',
    name: {
      ru: 'Дуб Дымчатый',
      uz: 'Tutun Eman',
      en: 'Smoked Oak',
    },
    subtitle: {
      ru: 'Инженерная доска • Бельгия',
      uz: 'Muhandislik taxta • Belgiya',
      en: 'Engineered board • Belgium',
    },
    category: 'engineered',
    material: 'Дуб (Quercus robur)',
    thicknessMm: 14,
    plankSize: '1900 × 190 × 14 мм',
    color: 'Дымчато-серый / Graphite',
    surface: 'Brushed, матовый масло',
    originCountry: 'Бельгия',
    pricePerM2: 1_120_000,
    images: [
      '/images/products/oak-smoked-1.jpg',
      '/images/products/oak-smoked-2.jpg',
    ],
    modelGlb: '/models/placeholder.glb',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: 'Термообработка аммиаком придаёт дубу насыщенный серо-коричневый тон — эффект «состаренного» дерева без потери прочности. Брашировка подчёркивает объём текстуры.\n\nДуб дымчатый органично вписывается в лофт, индустриальный и современный классический стили.\n\nИнженерный слой обеспечивает совместимость с водяным тёплым полом.',
      uz: 'Ammiak bilan issiqlik ishlovi emanga to\'q kulrang-jigarrang ton beradi — mustahkamlikni yo\'qotmasdan «qadimiy» yog\'och effekti. Zamonaviy klassik va loft interior uchun ideal.',
      en: 'Ammonia fuming gives the oak a rich grey-brown tone — the look of aged timber without losing strength. The brushed surface emphasises texture depth. Compatible with water underfloor heating.',
    },
    relatedSlugs: ['oak-natural-brushed', 'american-walnut'],
  },
  {
    slug: 'beech-steamed',
    name: {
      ru: 'Бук Паровой',
      uz: 'Bug\'latilgan Qo\'ng\'iroq Daraxti',
      en: 'Steamed Beech',
    },
    subtitle: {
      ru: 'Массивная доска • Румыния',
      uz: 'Massiv taxta • Ruminiya',
      en: 'Solid parquet • Romania',
    },
    category: 'parquet',
    material: 'Бук (Fagus sylvatica)',
    thicknessMm: 22,
    plankSize: '1800 × 130 × 22 мм',
    color: 'Розовато-бежевый',
    surface: 'Гладкий, лак',
    originCountry: 'Румыния',
    pricePerM2: 720_000,
    images: [
      '/images/products/beech-steamed-1.jpg',
      '/images/products/beech-steamed-2.jpg',
    ],
    modelGlb: '/models/placeholder.glb',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: 'Паровой бук — традиционный выбор для детских, спален и кухонных зон. Паровая обработка выравнивает цвет и устраняет внутренние напряжения в древесине, обеспечивая долгосрочную стабильность.\n\nБук обладает высокой твёрдостью по Янке, что делает его устойчивым к царапинам и вмятинам.\n\nДоступная цена при отличном европейском качестве.',
      uz: 'Bug\'latilgan qo\'ng\'iroq daraxti bolalar xonalari va oshxonalar uchun an\'anaviy tanlov. Yuqori Janka qattiqligi uni tirnalish va botiqlardan himoya qiladi.',
      en: 'Steamed beech is the traditional choice for children\'s rooms, bedrooms, and kitchens. Steam treatment evens the colour and relieves internal stresses. High Janka hardness means excellent scratch resistance at an accessible price.',
    },
    relatedSlugs: ['oak-natural-brushed', 'ash-white', 'alpine-oak-laminate'],
  },
  {
    slug: 'alpine-oak-laminate',
    name: {
      ru: 'Ламинат Дуб Альпийский',
      uz: 'Alp Eman Laminat',
      en: 'Alpine Oak Laminate',
    },
    subtitle: {
      ru: 'Ламинат 33 класс • Германия',
      uz: 'Laminat 33-sinf • Germaniya',
      en: 'Laminate Class 33 • Germany',
    },
    category: 'laminate',
    material: 'HDF + декоративный слой',
    thicknessMm: 12,
    plankSize: '1380 × 193 × 12 мм',
    color: 'Светло-бежевый с серым',
    surface: 'Embossed (тиснение в тон), матовый',
    originCountry: 'Германия',
    pricePerM2: 380_000,
    images: [
      '/images/products/alpine-oak-laminate-1.jpg',
      '/images/products/alpine-oak-laminate-2.jpg',
    ],
    modelGlb: '/models/placeholder.glb',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: '33 класс износостойкости — подходит для коммерческих помещений с высокой проходимостью. Тиснение «в тон» имитирует натуральную фактуру дерева на ощупь.\n\nВлагостойкая HDF-плита с замком AC5 обеспечивает простой плавающий монтаж без клея и гвоздей.\n\nОптимальное решение для офисов, прихожих и гостиных с большой нагрузкой.',
      uz: '33-sinf eskirishga chidamlilik — yuqori trafikli tijorat xonalari uchun mos. Namlikka chidamli HDF plita oddiy suzuvchi o\'rnatishni ta\'minlaydi. Ofislar va koridorlar uchun optimal yechim.',
      en: 'Class 33 wear resistance — suitable for high-traffic commercial spaces. Embossed-in-register surface mimics natural wood texture to the touch. Moisture-resistant HDF with AC5 lock for easy floating installation. Ideal for offices, hallways, and busy living rooms.',
    },
    relatedSlugs: ['ash-white', 'beech-steamed', 'spc-stone-grey'],
  },
  {
    slug: 'spc-stone-grey',
    name: {
      ru: 'SPC Камень Серый',
      uz: 'SPC Kulrang Tosh',
      en: 'SPC Stone Grey',
    },
    subtitle: {
      ru: 'SPC / Водостойкий • Китай / EU контроль',
      uz: 'SPC / Suv o\'tkazmaydigan • Xitoy / EU nazorat',
      en: 'SPC / Waterproof • China / EU QC',
    },
    category: 'spc',
    material: 'Stone Plastic Composite (SPC)',
    thicknessMm: 6,
    plankSize: '1220 × 180 × 6 мм',
    color: 'Серо-бежевый / Stone',
    surface: 'Матовый, тиснение под камень',
    originCountry: 'Китай (EU сертификат E1)',
    pricePerM2: 290_000,
    images: [
      '/images/products/spc-stone-grey-1.jpg',
      '/images/products/spc-stone-grey-2.jpg',
    ],
    modelGlb: '/models/placeholder.glb',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: 'SPC — абсолютно водостойкое покрытие на минеральной основе. Идеально для ванных, кухонь и любых помещений с высокой влажностью.\n\nОснование из камне-пластикового композита не деформируется при намокании и перепадах температур. Встроенная подложка снижает шум шагов.\n\nСертификат E1 — безопасен для жилых помещений и детских комнат.',
      uz: 'SPC — mineral asosidagi mutlaq suv o\'tkazmaydigan qoplama. Vannaxona, oshxona va yuqori namlikli xonalar uchun ideal. E1 sertifikati — turar-joy va bolalar xonalari uchun xavfsiz.',
      en: 'SPC is a completely waterproof mineral-core flooring. Perfect for bathrooms, kitchens, and any high-humidity spaces. The stone-plastic composite core does not warp when wet. Built-in underlayer reduces footstep noise. E1 certified — safe for residential and children\'s rooms.',
    },
    relatedSlugs: ['alpine-oak-laminate', 'ash-white'],
  },
  {
    slug: 'cherry-european',
    name: {
      ru: 'Вишня Европейская',
      uz: 'Evropa Gilos',
      en: 'European Cherry',
    },
    subtitle: {
      ru: 'Массивная доска • Франция',
      uz: 'Massiv taxta • Fransiya',
      en: 'Solid parquet • France',
    },
    category: 'parquet',
    material: 'Вишня (Prunus avium)',
    thicknessMm: 20,
    plankSize: '1600 × 120 × 20 мм',
    color: 'Розово-красный / Amber',
    surface: 'Гладкий, натуральный лак',
    originCountry: 'Франция',
    pricePerM2: 1_550_000,
    images: [
      '/images/products/cherry-european-1.jpg',
      '/images/products/cherry-european-2.jpg',
    ],
    modelGlb: '/models/placeholder.glb',
    tourUrl: '/tours/showroom.jpg',
    description: {
      ru: 'Европейская вишня — редкая и изысканная порода для тех, кто ценит уникальность. Молодая древесина имеет нежно-розовый тон, который со временем приобретает тёплый янтарный оттенок.\n\nЭтот природный процесс патинирования превращает пол в живой объект, неповторимый в каждом помещении.\n\nРекомендована для парадных спален, кабинетов и коллекционных интерьеров.',
      uz: 'Evropa gilosi — noyob va nafis tur. Yosh yog\'och asta-sekin iliq qahrabo rangini oladi — har bir xonada taqqoslanmas yashovchi ob\'ektga aylanadi. Namoyishkor yotoq xonalari va kabinetlar uchun tavsiya etiladi.',
      en: 'European cherry is a rare and refined species for those who value uniqueness. Young wood has a delicate pink tone that develops a warm amber patina over time. Recommended for master bedrooms, studies, and collector interiors.',
    },
    relatedSlugs: ['american-walnut', 'oak-natural-brushed'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product): Product[] {
  if (!product.relatedSlugs) return [];
  return product.relatedSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];
}
