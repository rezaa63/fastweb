/**
 * تنظیمات اصلی سایت — تنها فایلی که برای تغییر اطلاعات تماس، شبکه‌های اجتماعی،
 * منوی اصلی و متن‌های معرفی برند لازم است ویرایش شود.
 *
 * همه‌ی مقادیر این فایل قابل ویرایش هستند و هیچ‌کدام به یک محیط خاص گره نخورده‌اند.
 */
export const site = {
  brand: {
    name: "FastWeb96",
    tagline: "طراحی سایت‌هایی که فقط دیده نمی‌شوند؛ ماندگار می‌شوند.",
    shortDescription:
      "طراحی و توسعه وب‌سایت‌های حرفه‌ای برای برندهایی که می‌خواهند متفاوت دیده شوند.",
    footerLine: "طراحی سایت برای کسب‌وکارهایی که می‌خواهند متفاوت دیده شوند.",
  },

  designer: {
    name: "رضا اکبری",
    role: "Web Designer & Developer",
    initials: "ر.ا",
    bio: "طراح و توسعه‌دهنده وب با تمرکز بر رابط کاربری، هویت بصری و کیفیت اجرا. هر پروژه از یک گفت‌وگوی دقیق درباره‌ی کسب‌وکار شروع می‌شود و با یک تجربه‌ی دیجیتال اختصاصی به پایان می‌رسد.",
  },

  /** شماره تماس، ایمیل، آدرس و ساعات کاری — قابل ویرایش */
  contact: {
    phone: "+989211237543",
    phoneLabel: "۰۹۲۱ ۱۲۳ ۷۵۴۳",
    email: "hello@fastweb96.ir",
    location: "تهران — همکاری با برندها در سراسر ایران",
    hours: "شنبه تا پنجشنبه، ۰۹:۰۰ تا ۱۹:۰۰",
  },

  /** شبکه‌های اجتماعی — قابل ویرایش */
  socials: [
    { id: "instagram", label: "اینستاگرام", href: "https://instagram.com/fastweb96" },
    { id: "telegram", label: "تلگرام", href: "https://t.me/fastweb96" },
    { id: "bale", label: "بله", href: "https://ble.ir/fastweb96" },
    { id: "eitaa", label: "ایتا", href: "https://eitaa.com/fastweb96" },
    { id: "rubika", label: "روبیکا", href: "https://rubika.ir/fastweb96" },
    { id: "linkedin", label: "لینکدین", href: "https://www.linkedin.com/" },
    { id: "whatsapp", label: "واتساپ", href: "https://wa.me/989211237543" },
  ],

  nav: [
    { label: "خانه", to: "/" },
    { label: "خدمات", to: "/services" },
    { label: "نمونه‌کارها", to: "/portfolio" },
    { label: "درباره ما", to: "/about" },
    { label: "ثبت سفارش", to: "/order" },
    { label: "تماس با ما", to: "/contact" },
  ],

  /**
   * آدرس اختیاری برای دریافت درخواست‌ها (فرم سفارش و فرم تماس).
   * اگر خالی بماند، درخواست‌ها در مرورگر کاربر ذخیره می‌شوند تا هنگام اتصال
   * به بک‌اند یا سرویس ایمیل، ارسال شوند.
   * مثال: "/api/leads" یا "https://example.com/api/leads"
   */
  endpoints: {
    leads: "",
  },
} as const;

export type SiteConfig = typeof site;

export const telHref = `tel:${site.contact.phone.replace(/\s/g, "")}`;
export const mailHref = `mailto:${site.contact.email}`;
