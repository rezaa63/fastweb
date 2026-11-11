import { site } from "../data/site";
import { isValidEmail, isValidIranMobile, toLatinDigits } from "./utils";

export interface LeadPayload {
  /** منبع فرم: سفارش یا تماس */
  source: "order" | "contact";
  fields: Record<string, string>;
  file?: File | null;
}

export interface LeadResult {
  ok: boolean;
  /** true اگر فقط در مرورگر ذخیره شده باشد (بدون بک‌اند) */
  storedLocally: boolean;
  message?: string;
}

const STORAGE_KEY = "fastweb96:leads";

const storeLocally = (payload: LeadPayload): void => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list = raw ? (JSON.parse(raw) as unknown[]) : [];
    list.push({
      ...payload,
      file: payload.file ? { name: payload.file.name, size: payload.file.size } : null,
      createdAt: new Date().toISOString(),
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-50)));
  } catch {
    // اگر حافظه‌ی مرورگر در دسترس نبود، جلوی ارسال را نمی‌گیریم.
  }
};

/**
 * ارسال درخواست.
 *
 * اگر `site.endpoints.leads` تنظیم شده باشد، داده به همان آدرس ارسال می‌شود
 * (FormData — سازگار با بک‌اندهای Express/Next/PHP و سرویس‌های ایمیل).
 * در غیر این صورت درخواست در مرورگر نگه داشته می‌شود تا بعداً به بک‌اند متصل شود.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  storeLocally(payload);

  const endpoint = site.endpoints.leads;
  if (!endpoint) return { ok: true, storedLocally: true };

  const body = new FormData();
  body.append("source", payload.source);
  Object.entries(payload.fields).forEach(([key, value]) => body.append(key, value));
  if (payload.file) body.append("attachment", payload.file);

  try {
    const response = await fetch(endpoint, { method: "POST", body });
    if (!response.ok) {
      return { ok: false, storedLocally: true, message: "ارسال به سرور انجام نشد." };
    }
    return { ok: true, storedLocally: true };
  } catch {
    return { ok: false, storedLocally: true, message: "اتصال به سرور برقرار نشد." };
  }
}

export const validateOrderField = (name: string, value: string): string | null => {
  const trimmed = toLatinDigits(value).trim();

  switch (name) {
    case "fullName":
      if (!value.trim()) return "نام و نام خانوادگی را وارد کنید.";
      if (value.trim().length < 3) return "نام باید حداقل ۳ حرف باشد.";
      return null;
    case "phone":
      if (!value.trim()) return "شماره تماس را وارد کنید.";
      if (!isValidIranMobile(value)) return "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷).";
      return null;
    case "email":
      if (!value.trim()) return null;
      if (!isValidEmail(value)) return "ایمیل معتبر نیست.";
      return null;
    case "businessType":
      if (!value) return "نوع کسب‌وکار را انتخاب کنید.";
      return null;
    case "siteType":
      if (!value) return "نوع سایت مورد نیاز را انتخاب کنید.";
      return null;
    case "budget":
      if (!value) return "بودجه تقریبی پروژه را انتخاب کنید.";
      return null;
    case "projectDescription":
      if (!value.trim()) return "توضیحات پروژه را بنویسید.";
      if (trimmed.length < 10) return "لطفاً کمی بیشتر درباره‌ی پروژه توضیح دهید (حداقل ۱۰ حرف).";
      return null;
    default:
      return null;
  }
};
