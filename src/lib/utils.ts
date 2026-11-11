/** ابزارهای کوچک مشترک */

export const cx = (...values: Array<string | false | null | undefined>): string =>
  values.filter(Boolean).join(" ");

/**
 * آدرس عمومی یک فایل داخل `public` با احترام به `base` بیلد.
 * روی دامنه/ریشه همان `/images/...` است و در انتشار زیرمسیر (مثل GitHub Pages)
 * به `/زیرمسیر/images/...` تبدیل می‌شود.
 */
export const assetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** تبدیل ارقام لاتین به فارسی */
export const toFa = (value: string | number): string =>
  String(value).replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);

/** تبدیل ارقام فارسی/عربی به لاتین (برای اعتبارسنجی و ذخیره‌سازی) */
export const toLatinDigits = (value: string): string =>
  value
    .replace(/[۰-۹]/g, (digit) => String(FA_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

export const digitsOnly = (value: string): string => toLatinDigits(value).replace(/\D/g, "");

export const formatFaNumber = (value: number): string => toFa(new Intl.NumberFormat("en-US").format(value));

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const smoothScrollTo = (top: number): void => {
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
};

export const scrollToTop = (): void => smoothScrollTo(0);

/** اعتبارسنجی موبایل ایران با پشتیبانی از حالت ۰۹... و +۹۸۹... */
export const isValidIranMobile = (value: string): boolean => {
  const digits = digitsOnly(value);
  if (!digits) return false;
  const normalized = digits.startsWith("0098")
    ? digits.slice(4)
    : digits.startsWith("98")
      ? digits.slice(2)
      : digits;
  return /^9\d{9}$/.test(normalized.replace(/^0/, ""));
};

export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value.trim());
