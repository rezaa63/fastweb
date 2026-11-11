/**
 * دسته‌بندی‌ها و نمونه‌کارها.
 *
 * برای افزودن پروژه‌ی جدید فقط یک آیتم به آرایه‌ی `projects` اضافه کنید.
 * برای افزودن دسته‌بندی جدید، یک آیتم به `categories` اضافه کنید (بدون تغییر در کد).
 */

import { assetUrl } from "../lib/utils";

export type CategoryId =
  | "realestate"
  | "auto"
  | "beauty"
  | "decor"
  | "skincare"
  | "cafe"
  | (string & {});

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  /** نام دسته برای نمایش */
  categoryLabel: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery: GalleryImage[];
  /** مسیر صفحه‌ی پروژه (می‌تواند به یک سایت خارجی هم تغییر کند) */
  link: string;
  featured: boolean;
  /** نمایش در اسلایدر شاخص‌ها */
  year: string;
  tags: string[];
}

export interface Category {
  id: CategoryId;
  label: string;
}

export const categories: Category[] = [
  { id: "all", label: "همه" },
  { id: "realestate", label: "املاک" },
  { id: "auto", label: "خودرو" },
  { id: "beauty", label: "زیبایی" },
  { id: "decor", label: "دکوراسیون" },
  { id: "skincare", label: "محصولات بهداشتی" },
  { id: "cafe", label: "کافه" },
];

const rawProjects: Project[] = [
  {
    slug: "aseman-luxury-estate",
    title: "آسمان — مشاور املاک لوکس",
    category: "realestate",
    categoryLabel: "املاک",
    description:
      "وب‌سایت اختصاصی برای مجموعه‌ای از پروژه‌های مسکونی لوکس، با تور مجازی، فیلتر پیشرفته‌ی ملک و فرم رزرو بازدید.",
    image: "/images/villa-night.jpg",
    imageAlt: "ویلای مدرن با استخر در نور شب — نمونه‌کار سایت املاک FastWeb96",
    gallery: [
      {
        src: "/images/villa-night.jpg",
        alt: "ویلای مدرن با استخر در نور شب — صفحه اصلی سایت املاک آسمان",
      },
      {
        src: "/images/villa-pool.jpg",
        alt: "ویلای سفید با استخر و نخل — گالری پروژه‌های مسکونی",
      },
      {
        src: "/images/house-modern.jpg",
        alt: "خانه‌ی مدرن لوکس با استخر در روز — صفحه‌ی جزئیات ملک",
      },
      {
        src: "/images/towers.jpg",
        alt: "برج‌های شیشه‌ای مدرن از نمای پایین — بخش پروژه‌های ساختمانی",
      },
    ],
    link: "/portfolio/aseman-luxury-estate",
    featured: true,
    year: "۱۴۰۴",
    tags: ["املاک لوکس", "تور مجازی", "فیلتر پیشرفته"],
  },
  {
    slug: "dena-plus-showroom",
    title: "دنا پلاس — نمایشگاه خودرو",
    category: "auto",
    categoryLabel: "خودرو",
    description:
      "شوروم دیجیتال دنا پلاس با معرفی کامل خودرو، گالری تصاویر، مشخصات فنی و فرم رزرو تست رانندگی.",
    image: "/images/dena-plus-front.jpg",
    imageAlt: "خودروی دنا پلاس در نمایشگاه — نمونه‌کار سایت نمایشگاه خودرو FastWeb96",
    gallery: [
      {
        src: "/images/dena-plus-front.jpg",
        alt: "نمای جلوی خودروی دنا پلاس — صفحه‌ی معرفی خودرو",
      },
      {
        src: "/images/dena-plus-turbo.jpg",
        alt: "جزئیات چراغ عقب و نشان توربو دنا پلاس — گالری تصاویر",
      },
      {
        src: "/images/dena-plus-road.jpg",
        alt: "دنا پلاس در حرکت در جاده — بخش تست رانندگی",
      },
      {
        src: "/images/showroom-dark.jpg",
        alt: "سالن نمایشگاه خودرو با نورپردازی مدرن — صفحه‌ی نمایشگاه",
      },
    ],
    link: "/portfolio/dena-plus-showroom",
    featured: true,
    year: "۱۴۰۴",
    tags: ["نمایشگاه خودرو", "مشخصات فنی", "رزرو تست رانندگی"],
  },
  {
    slug: "lumina-beauty-salon",
    title: "لومینا — سالن زیبایی",
    category: "beauty",
    categoryLabel: "زیبایی",
    description:
      "هویت بصری و وب‌سایت سالن زیبایی لومینا با گالری خدمات، معرفی تیم و سیستم رزرو نوبت آنلاین.",
    image: "/images/salon-mono.jpg",
    imageAlt: "سالن زیبایی مدرن با طراحی مینیمال — نمونه‌کار سایت سالن زیبایی FastWeb96",
    gallery: [
      {
        src: "/images/salon-mono.jpg",
        alt: "فضای داخلی سالن زیبایی با طراحی مینیمال — صفحه اصلی لومینا",
      },
      {
        src: "/images/barber-dark.jpg",
        alt: "سالن آرایش مردانه با آینه‌های گرد و نور گرم — بخش خدمات",
      },
      {
        src: "/images/salon-pink.jpg",
        alt: "صندلی‌های سالن زیبایی در برابر آینه — گالری خدمات",
      },
    ],
    link: "/portfolio/lumina-beauty-salon",
    featured: false,
    year: "۱۴۰۳",
    tags: ["رزرو نوبت", "گالری خدمات", "هویت بصری"],
  },
  {
    slug: "nevesht-interior-studio",
    title: "نوشت — استودیو معماری داخلی",
    category: "decor",
    categoryLabel: "دکوراسیون",
    description:
      "پورتفولیوی مینیمال برای استودیو معماری داخلی، با نمایش پروژه‌ها در قالب گالری تمام‌صفحه و روایت تصویری.",
    image: "/images/interior-living.jpg",
    imageAlt: "فضای نشیمن مدرن با پالت رنگی خنثی — نمونه‌کار سایت دکوراسیون FastWeb96",
    gallery: [
      {
        src: "/images/interior-living.jpg",
        alt: "نشیمن مدرن با رنگ‌های خنثی — صفحه‌ی پروژه‌ی نوشت",
      },
      {
        src: "/images/interior-lounge.jpg",
        alt: "فضای نشیمن با مبلمان مینیمال و نور طبیعی — گالری پروژه",
      },
      {
        src: "/images/interior-minimal.jpg",
        alt: "اتاق مینیمال با صندلی زرد به‌عنوان نقطه‌ی تمرکز — جزئیات طراحی",
      },
    ],
    link: "/portfolio/nevesht-interior-studio",
    featured: true,
    year: "۱۴۰۴",
    tags: ["پورتفولیو", "معماری داخلی", "گالری تمام‌صفحه"],
  },
  {
    slug: "avene-skincare",
    title: "آونه — محصولات مراقبت پوست",
    category: "skincare",
    categoryLabel: "محصولات بهداشتی",
    description:
      "فروشگاه آنلاین محصولات مراقبت پوست با چیدمان پرمیوم، صفحه‌ی محصول تمیز و مسیر خرید کوتاه و روان.",
    image: "/images/skincare-blue.jpg",
    imageAlt: "محصولات مراقبت پوست با چیدمان پرمیوم — نمونه‌کار فروشگاه آنلاین FastWeb96",
    gallery: [
      {
        src: "/images/skincare-blue.jpg",
        alt: "بسته‌بندی محصولات مراقبت پوست — صفحه‌ی محصول آونه",
      },
      {
        src: "/images/skincare-flatlay.jpg",
        alt: "سه محصول مراقبت پوست روی سطح چوبی — گالری فروشگاه",
      },
    ],
    link: "/portfolio/avene-skincare",
    featured: false,
    year: "۱۴۰۳",
    tags: ["فروشگاه آنلاین", "صفحه محصول", "تجربه خرید"],
  },
  {
    slug: "note-cafe",
    title: "نُت — کافه و رستوران",
    category: "cafe",
    categoryLabel: "کافه",
    description:
      "وب‌سایت کافه نُت با منوی دیجیتال، معرفی فضای کافه و فرم رزرو میز برای تجربه‌ای گرم و مدرن.",
    image: "/images/cafe-warm.jpg",
    imageAlt: "کانتر کافه مدرن با نورپردازی گرم — نمونه‌کار سایت کافه FastWeb96",
    gallery: [
      {
        src: "/images/cafe-warm.jpg",
        alt: "کانتر کافه با نور گرم و چوب — صفحه اصلی کافه نُت",
      },
      {
        src: "/images/cafe-interior.jpg",
        alt: "فضای داخلی کافه با میزهای چوبی — گالری فضا",
      },
      {
        src: "/images/cafe-cups.jpg",
        alt: "فنجان‌های قهوه در دست — بخش منوی دیجیتال",
      },
    ],
    link: "/portfolio/note-cafe",
    featured: false,
    year: "۱۴۰۳",
    tags: ["منوی دیجیتال", "رزرو میز", "هویت بصری"],
  },
  {
    slug: "aftab-tower",
    title: "برج آفتاب — پروژه‌های ساختمانی",
    category: "realestate",
    categoryLabel: "املاک",
    description:
      "سایت معرفی برج مسکونی آفتاب با پلان طبقات، گالری پیشرفت پروژه و فرم مشاوره‌ی فروش.",
    image: "/images/villa-pool.jpg",
    imageAlt: "ویلای مدرن با استخر — نمونه‌کار سایت پروژه‌های ساختمانی FastWeb96",
    gallery: [
      {
        src: "/images/villa-pool.jpg",
        alt: "ویلای مدرن با استخر — صفحه‌ی پروژه‌ی برج آفتاب",
      },
      {
        src: "/images/towers.jpg",
        alt: "نمای برج‌های شیشه‌ای — گالری پیشرفت پروژه",
      },
      {
        src: "/images/house-modern.jpg",
        alt: "خانه‌ی مدرن با استخر — بخش پلان و امکانات",
      },
    ],
    link: "/portfolio/aftab-tower",
    featured: false,
    year: "۱۴۰۲",
    tags: ["پلان طبقات", "گالری پروژه", "فرم مشاوره"],
  },
  {
    slug: "arian-motors",
    title: "آرین موتورز — نمایشگاه خودرو",
    category: "auto",
    categoryLabel: "خودرو",
    description:
      "سایت نمایشگاه خودرو با فیلتر برند و قیمت، کارت اختصاصی هر خودرو و گالری تصاویر با کیفیت بالا.",
    image: "/images/showroom-dark.jpg",
    imageAlt: "خودرو در سالن نمایشگاه تاریک با نورپردازی — نمونه‌کار سایت خودرو FastWeb96",
    gallery: [
      {
        src: "/images/showroom-dark.jpg",
        alt: "سالن نمایشگاه خودرو — صفحه‌ی فهرست خودروها",
      },
      {
        src: "/images/car-motion.jpg",
        alt: "خودروی اسپرت در حرکت — گالری تصاویر خودرو",
      },
      {
        src: "/images/car-studio.jpg",
        alt: "کوپه‌ی تیره در نور طبیعی — صفحه‌ی جزئیات خودرو",
      },
    ],
    link: "/portfolio/arian-motors",
    featured: false,
    year: "۱۴۰۳",
    tags: ["فیلتر خودرو", "کارت خودرو", "گالری تصاویر"],
  },
  {
    slug: "mana-hair-studio",
    title: "مانا — استودیو مو",
    category: "beauty",
    categoryLabel: "زیبایی",
    description:
      "وب‌سایت استودیو مو با تمرکز بر نمونه‌کارها، معرفی متخصص‌ها و رزرو آنلاین خدمات.",
    image: "/images/salon-pink.jpg",
    imageAlt: "صندلی‌های استودیو مو در برابر آینه — نمونه‌کار سایت زیبایی FastWeb96",
    gallery: [
      {
        src: "/images/salon-pink.jpg",
        alt: "صندلی‌های استودیو مو — صفحه اصلی مانا",
      },
      {
        src: "/images/barber-dark.jpg",
        alt: "فضای استودیو با آینه‌های گرد — گالری فضا",
      },
      {
        src: "/images/salon-mono.jpg",
        alt: "نمای سیاه‌وسفید سالن — بخش نمونه‌کارها",
      },
    ],
    link: "/portfolio/mana-hair-studio",
    featured: false,
    year: "۱۴۰۲",
    tags: ["رزرو آنلاین", "نمونه‌کار", "معرفی تیم"],
  },
];

/** مسیر تصاویر با احترام به base بیلد (برای انتشار در زیرمسیر) */
export const projects: Project[] = rawProjects.map((project) => ({
  ...project,
  image: assetUrl(project.image),
  gallery: project.gallery.map((image) => ({ ...image, src: assetUrl(image.src) })),
}));

/** پروژه‌های شاخص برای اسلایدر */
export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const relatedProjects = (project: Project, limit = 3): Project[] =>
  projects
    .filter((item) => item.slug !== project.slug)
    .sort((a, b) => Number(b.category === project.category) - Number(a.category === project.category))
    .slice(0, limit);
