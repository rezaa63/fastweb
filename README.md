# FastWeb96 — وب‌سایت رسمی استودیو طراحی و توسعه وب

وب‌سایت اختصاصی **FastWeb96** (طراح: رضا اکبری) — فارسی، RTL، با طراحی مدرن/مینیمال و پالت
مشکی عمیق، طلایی، آبی و کرم.

- **استک:** React 19 + TypeScript + Vite (بدون فریم‌ورک CSS؛ استایل‌ها با CSS Variables و فایل‌های modulare)
- **فونت:** Vazirmatn (فایل متغیر، self-hosted در `public/fonts`)
- **ویدیوی Hero:** `public/media/hero-video.mp4` (بدون صدا، faststart، ~۱.۳MB) + `hero-poster.jpg`

---

## اجرا

```bash
cd fastweb96-website
npm install
npm run dev        # http://localhost:3000
npm run build      # خروجی استاتیک در dist/
npm run preview    # پیش‌نمایش بیلد تولید
npm run typecheck
```

> در این محیط، سایت از طریق `docker-compose.base44.yml` در ریشه‌ی ریپو و روی پورت ۳۰۰۰ بالا می‌آید.

---

## ساختار پروژه

```
fastweb96-website/
├── index.html                 # عنوان، متا، Open Graph، JSON-LD، dir=rtl
├── public/
│   ├── fonts/                 # Vazirmatn-Variable.woff2
│   ├── media/                 # ویدیو و پوستر Hero
│   ├── images/                # تصاویر پروژه‌ها و خدمات (بهینه‌شده)
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── data/                  # ⬅️ همه‌ی محتوای قابل ویرایش
    │   ├── site.ts            # برند، طراح، تلفن، ایمیل، شبکه‌های اجتماعی، منو، endpoint فرم
    │   ├── projects.ts        # دسته‌بندی‌ها + نمونه‌کارها (گالری، featured، link)
    │   └── content.ts         # خدمات، مراحل همکاری، مزیت‌ها
    ├── components/            # کامپوننت‌های قابل استفاده‌ی مجدد
    ├── pages/                 # Home / Services / Portfolio / Project / About / Order / Contact / 404
    ├── lib/                   # هوک‌ها (اسکرول، Reveal، قفل بدنه) + ابزارها + ارسال فرم
    └── styles/                # tokens, base, layout, hero, sections, portfolio, forms
```

---

## ویرایش محتوا (بدون دست زدن به کد)

### اطلاعات تماس، شبکه‌های اجتماعی و منو
`src/data/site.ts` → بخش‌های `contact` و `socials` و `nav`.
شماره تماس، ایمیل، آدرس، ساعات کاری و لینک شبکه‌های اجتماعی همه از همین فایل خوانده می‌شوند.

### افزودن پروژه‌ی جدید به نمونه‌کارها
فقط یک آیتم به آرایه‌ی `projects` در `src/data/projects.ts` اضافه کنید:

```ts
{
  slug: "my-new-project",          // آدرس صفحه: /portfolio/my-new-project
  title: "نام پروژه",
  category: "cafe",                // یکی از idهای موجود در categories
  categoryLabel: "کافه",
  description: "توضیح کوتاه پروژه",
  image: "/images/cafe-warm.jpg",  // تصویر اصلی
  imageAlt: "توضیح تصویر برای دسترس‌پذیری و SEO",
  gallery: [{ src: "/images/…", alt: "…" }],
  link: "/portfolio/my-new-project",
  featured: false,                 // نمایش در اسلایدر شاخص‌ها
  year: "۱۴۰۴",
  tags: ["منوی دیجیتال", "رزرو میز"],
}
```

### افزودن دسته‌بندی جدید
یک آیتم به `categories` اضافه کنید (مثلاً `{ id: "fitness", label: "باشگاه ورزشی" }`)؛
فیلترها، فوتر و بج کارت‌ها خودکار به‌روز می‌شوند. نیازی به تغییر کد نیست.

### جایگزینی ویدیوی Hero
فایل `public/media/hero-video.mp4` را با نسخه‌ی وب‌بهینه (H.264، بدون صدا، `+faststart`) جایگزین
کنید و پوستر را در `public/media/hero-poster.jpg` بگذارید. مسیرها در `src/components/Hero.tsx`
ثابت‌های `HERO_VIDEO` / `HERO_POSTER` هستند.

---

## صفحات و مسیرها

| مسیر | صفحه |
| --- | --- |
| `/` | خانه (Hero اسکرول‌محور، معرفی، خدمات، پروژه ویژه، نمونه‌کارها، فرآیند، درباره، مزیت‌ها، ثبت سفارش، تماس) |
| `/services` | خدمات + فرآیند همکاری |
| `/portfolio` | نمونه‌کارها (فیلتر + اسلایدر + گرید + لایت‌باکس) |
| `/portfolio/:slug` | صفحه‌ی هر پروژه (گالری، مشخصات، پروژه‌های مشابه) |
| `/about` | درباره ما + مزیت‌ها + فرآیند |
| `/order` | ثبت سفارش |
| `/contact` | تماس با ما |

---

## فرم‌ها

فرم سفارش و فرم تماس اعتبارسنجی سمت کلاینت دارند (نام، موبایل ایران، ایمیل، انتخاب‌های الزامی،
توضیحات، حجم/نوع فایل تا ۱۰MB) و پیام موفقیت دقیقاً طبق متن درخواستی نمایش داده می‌شود.

ارسال داده در `src/lib/leads.ts`:

- اگر `site.endpoints.leads` خالی باشد (وضعیت فعلی)، درخواست در `localStorage`
  با کلید `fastweb96:leads` نگه داشته می‌شود (مناسب دمو، بدون بک‌اند).
- برای دریافت واقعی درخواست‌ها، آدرس یک endpoint را در `src/data/site.ts` قرار دهید:

```ts
endpoints: { leads: "/api/leads" }   // یا "https://example.com/api/leads"
```

درخواست به‌صورت `POST` با `FormData` (`source`, فیلدهای فرم و `attachment`) ارسال می‌شود؛
با هر بک‌اندی (Express / Next / PHP / سرویس ایمیل) سازگار است.

---

## SEO و دسترس‌پذیری

- `lang="fa"` و `dir="rtl"` روی `<html>`
- Title و Meta Description مطابق درخواست در `index.html` + به‌روزرسانی هر صفحه با `PageMeta`
- سلسله‌مراتب عنوان‌ها: یک `h1` در هر صفحه و `h2`/`h3` منظم
- `alt` توصیفی برای همه‌ی تصاویر، `aria-label` برای کنترل‌های آیکونی، `skip-link`
- داده‌ی ساختاریافته‌ی `ProfessionalService` (JSON-LD)، `robots.txt` و `sitemap.xml`

---

## دامنه‌ی اختصاصی و انتشار

هیچ آدرس داخلی یا محیط‌وابسته‌ای در کد hard-code نشده است؛ همه‌ی مسیرها نسبی‌اند.

1. `npm run build` → پوشه‌ی `dist/`
2. آپلود `dist/` روی هر هاست/CDN (Nginx، Netlify، Vercel، GitHub Pages…)
3. برای SPA بودن مسیرها، همه‌ی مسیرها به `index.html` ری‌رایت شوند:
   - **Nginx:** `try_files $uri $uri/ /index.html;`
   - **Netlify:** `/* /index.html 200`
4. دامنه‌ی `.ir` را به هاست وصل کنید و در `public/robots.txt` / `public/sitemap.xml` مقدار
   `https://fastweb96.ir` را با دامنه‌ی نهایی جایگزین کنید.

> در حالت توسعه، Vite روی `0.0.0.0:3000` گوش می‌دهد و هاست‌های اضافی از طریق متغیر استاندارد
> `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` مجاز می‌شوند (بدون هارد‌کد کردن دامنه).

---

## تصاویر و مجوزها

منابع و مجوز تصاویر در [`CREDITS.md`](./CREDITS.md) آمده است. تصاویر خودروی دنا پلاس از
ویکی‌مدیا کامانز با مجوز CC BY / CC BY-SA هستند و نیاز به ذکر منبع دارند (در CREDITS انجام شده).
برای استفاده‌ی تجاری، تصاویر اختصاصی برند را جایگزین کنید.
