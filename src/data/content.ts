/**
 * خدمات، مراحل همکاری و مزیت‌ها — همه از این فایل قابل ویرایش هستند.
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** دسته‌بندی مرتبط در نمونه‌کارها */
  category: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "realestate",
    title: "سایت املاک و مستغلات",
    description:
      "طراحی سایت مدرن برای مشاوران املاک، دفاتر معاملات ملکی و پروژه‌های ساختمانی.",
    image: "/images/villa-night.jpg",
    alt: "ویلای مدرن با استخر در شب — طراحی سایت املاک",
    category: "realestate",
    features: ["فیلتر پیشرفته ملک", "تور مجازی", "فرم رزرو بازدید"],
  },
  {
    id: "auto",
    title: "سایت نمایشگاه خودرو",
    description:
      "طراحی سایت حرفه‌ای برای نمایشگاه‌های خودرو با امکان معرفی خودروها، گالری تصاویر و اطلاعات فنی.",
    image: "/images/dena-plus-front.jpg",
    alt: "خودروی دنا پلاس در نمایشگاه خودرو مدرن — طراحی سایت نمایشگاه خودرو",
    category: "auto",
    features: ["کارت اختصاصی خودرو", "گالری تصاویر", "اطلاعات فنی"],
  },
  {
    id: "beauty",
    title: "سایت سالن زیبایی",
    description: "طراحی سایت شیک و ظریف برای سالن‌های زیبایی، آرایشگاه‌ها و خدمات Beauty.",
    image: "/images/salon-mono.jpg",
    alt: "سالن زیبایی لوکس و مدرن — طراحی سایت سالن زیبایی",
    category: "beauty",
    features: ["رزرو نوبت آنلاین", "گالری خدمات", "معرفی متخصص‌ها"],
  },
  {
    id: "decor",
    title: "سایت دکوراسیون و معماری",
    description:
      "طراحی سایت لوکس برای استودیوهای معماری داخلی و برندهای دکوراسیون با نمایش حرفه‌ای پروژه‌ها.",
    image: "/images/interior-living.jpg",
    alt: "فضای داخلی لوکس با طراحی مدرن و مینیمال — طراحی سایت دکوراسیون",
    category: "decor",
    features: ["پورتفولیوی تصویری", "صفحه‌ی پروژه", "فرم مشاوره"],
  },
  {
    id: "skincare",
    title: "فروشگاه محصولات بهداشتی",
    description:
      "طراحی فروشگاه آنلاین محصولات مراقبت پوست و بهداشتی با چیدمان Premium و مسیر خرید ساده.",
    image: "/images/skincare-blue.jpg",
    alt: "محصولات مراقبت پوست و بهداشتی با چیدمان پرمیوم — طراحی فروشگاه آنلاین",
    category: "skincare",
    features: ["صفحه‌ی محصول", "سبد خرید روان", "پرداخت امن"],
  },
  {
    id: "cafe",
    title: "سایت کافه و رستوران",
    description:
      "طراحی سایت منوی دیجیتال و رزرو میز برای کافه‌ها و رستوران‌ها با هویت بصری گرم و مدرن.",
    image: "/images/cafe-warm.jpg",
    alt: "کافه مدرن با نورپردازی گرم، میز و قهوه — طراحی سایت کافه",
    category: "cafe",
    features: ["منوی دیجیتال", "رزرو میز", "معرفی فضا"],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "۰۱",
    title: "مشاوره",
    description: "گفت‌وگو درباره‌ی کسب‌وکار، مخاطب و هدف پروژه تا تصویر روشنی از نتیجه شکل بگیرد.",
  },
  {
    number: "۰۲",
    title: "بررسی نیازهای کسب‌وکار",
    description: "تحلیل رقبا، ساختار محتوا و مسیر کاربر؛ خروجی این مرحله نقشه‌ی راه پروژه است.",
  },
  {
    number: "۰۳",
    title: "طراحی UI/UX",
    description: "طراحی رابط کاربری اختصاصی، هویت بصری و نمونه‌ی اولیه‌ی صفحات پیش از اجرا.",
  },
  {
    number: "۰۴",
    title: "توسعه سایت",
    description: "پیاده‌سازی تمیز، سریع و واکنش‌گرا بر اساس طراحی تأییدشده و ساختار قابل توسعه.",
  },
  {
    number: "۰۵",
    title: "تست و بهینه‌سازی",
    description: "بررسی عملکرد، سرعت، سازگاری دستگاه‌ها و سئوی تکنیکال پیش از انتشار.",
  },
  {
    number: "۰۶",
    title: "تحویل و پشتیبانی",
    description: "انتشار روی دامنه‌ی اختصاصی، آموزش مدیریت سایت و پشتیبانی پس از تحویل.",
  },
];

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    id: "custom",
    title: "طراحی اختصاصی",
    description: "هر پروژه از صفر و متناسب با هویت همان برند طراحی می‌شود؛ بدون قالب آماده.",
  },
  {
    id: "responsive",
    title: "Responsive Design",
    description: "تجربه‌ی یکسان و بی‌نقص روی موبایل، تبلت، لپ‌تاپ و نمایشگرهای بزرگ.",
  },
  {
    id: "performance",
    title: "سرعت و Performance",
    description: "تصاویر بهینه، کد سبک و بارگذاری سریع؛ چون سرعت بخشی از تجربه است.",
  },
  {
    id: "uiux",
    title: "UI/UX حرفه‌ای",
    description: "مسیر کاربر ساده و واضح طراحی می‌شود تا بازدیدکننده به مشتری تبدیل شود.",
  },
  {
    id: "modern",
    title: "طراحی مدرن",
    description: "زبان بصری روز، تایپوگرافی دقیق و جزئیاتی که حس پرمیوم منتقل می‌کند.",
  },
  {
    id: "seo",
    title: "سئو تکنیکال پایه",
    description: "ساختار عنوان‌ها، متا تگ‌ها، داده‌ی ساختاریافته و آماده‌سازی برای موتورهای جست‌وجو.",
  },
  {
    id: "support",
    title: "پشتیبانی",
    description: "پاسخ‌گویی واقعی بعد از تحویل، برای رفع مشکل و به‌روزرسانی‌های دوره‌ای.",
  },
  {
    id: "scalable",
    title: "قابلیت توسعه در آینده",
    description: "ساختار داده‌ای و کدی که افزودن صفحات و پروژه‌های جدید را ساده می‌کند.",
  },
];
