import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { mailHref, site, telHref } from "../data/site";
import { submitLead, validateOrderField } from "../lib/leads";
import { cx, toFa } from "../lib/utils";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const businessTypes = [
  "املاک و مستغلات",
  "نمایشگاه خودرو",
  "سالن زیبایی",
  "دکوراسیون و معماری",
  "محصولات بهداشتی",
  "کافه و رستوران",
  "کسب‌وکار دیگر",
];

const siteTypes = [
  "سایت شرکتی / معرفی",
  "فروشگاه آنلاین",
  "صفحه‌ی فرود (Landing)",
  "سایت رزرو و نوبت‌دهی",
  "پورتفولیو و گالری",
  "طراحی مجدد سایت فعلی",
];

const budgets = [
  "زیر ۱۰ میلیون تومان",
  "۱۰ تا ۲۵ میلیون تومان",
  "۲۵ تا ۵۰ میلیون تومان",
  "بالای ۵۰ میلیون تومان",
];

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  businessType: "",
  siteType: "",
  budget: "",
  projectDescription: "",
};

type FieldName = keyof typeof initialValues;
type FormValues = typeof initialValues;

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function OrderForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName | "file", string>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const update =
    (name: FieldName) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({ ...prev, file: "حجم فایل باید کمتر از ۱۰ مگابایت باشد." }));
      event.target.value = "";
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setFile(selected);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors: Partial<Record<FieldName | "file", string>> = {};
    (Object.keys(values) as FieldName[]).forEach((name) => {
      const error = validateOrderField(name, values[name]);
      if (error) nextErrors[name] = error;
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0];
      const node = formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`);
      node?.focus();
      return;
    }

    setSubmitting(true);
    const result = await submitLead({
      source: "order",
      fields: {
        fullName: values.fullName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        businessType: values.businessType,
        siteType: values.siteType,
        budget: values.budget,
        projectDescription: values.projectDescription.trim(),
      },
      file,
    });
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(
        result.message ?? "ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید یا با ما تماس بگیرید.",
      );
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
    setFile(null);
    formRef.current?.reset();
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
    setSubmitError(null);
  };

  return (
    <section className="section section--dark order" id="order" aria-labelledby="order-title">
      <div className="container order__grid">
        <div className="order__aside">
          <SectionHeading
            id="order-title"
            kicker="ثبت سفارش"
            title={
              <>
                شروع پروژه <span className="text-gold">جدید</span>
              </>
            }
            lead="فرم زیر را کامل کنید تا در اولین فرصت با شما تماس بگیریم و درباره‌ی جزئیات پروژه گفت‌وگو کنیم."
          />

          <Reveal delay={140}>
            <ul className="order__steps">
              <li>
                <span>۰۱</span>
                <div>
                  <strong>ثبت درخواست</strong>
                  <small>اطلاعات پروژه را در فرم وارد کنید.</small>
                </div>
              </li>
              <li>
                <span>۰۲</span>
                <div>
                  <strong>تماس کارشناس</strong>
                  <small>در اولین فرصت برای هماهنگی جلسه تماس می‌گیریم.</small>
                </div>
              </li>
              <li>
                <span>۰۳</span>
                <div>
                  <strong>پیشنهاد و شروع</strong>
                  <small>پیشنهاد شفاف زمان و هزینه را دریافت می‌کنید.</small>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={200} className="order__contact">
            <a href={telHref} className="order__contactRow">
              <Icon name="phone" size={17} />
              <span dir="ltr">{site.contact.phoneLabel}</span>
            </a>
            <a href={mailHref} className="order__contactRow">
              <Icon name="mail" size={17} />
              <span dir="ltr">{site.contact.email}</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="order__panel" variant="scale" delay={80}>
          {submitted ? (
            <div className="form-success" role="status" aria-live="polite">
              <span className="form-success__icon">
                <Icon name="check" size={26} />
              </span>
              <h3 className="form-success__title">درخواست شما ثبت شد</h3>
              <p className="form-success__text">
                اطلاعات این درخواست فقط در حافظه‌ی همین مرورگر ذخیره شده و برای تیم <span dir="ltr">FastWeb96</span> ارسال نشده است. برای ثبت واقعی سفارش، لطفاً از راه‌های تماس استفاده کنید.
              </p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={resetForm}>
                ثبت درخواست جدید
              </button>
            </div>
          ) : (
            <form className="form" ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="form__grid">
                <div className="field">
                  <label htmlFor="fullName">
                    نام و نام خانوادگی <span className="field__req">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="مثال: رضا اکبری"
                    value={values.fullName}
                    onChange={update("fullName")}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    className={cx(errors.fullName && "is-invalid")}
                  />
                  {errors.fullName ? (
                    <span className="field__error" id="fullName-error">
                      {errors.fullName}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="phone">
                    شماره تماس <span className="field__req">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    value={values.phone}
                    onChange={update("phone")}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={cx(errors.phone && "is-invalid")}
                    dir="ltr"
                  />
                  {errors.phone ? (
                    <span className="field__error" id="phone-error">
                      {errors.phone}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="email">ایمیل</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={update("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cx(errors.email && "is-invalid")}
                    dir="ltr"
                  />
                  {errors.email ? (
                    <span className="field__error" id="email-error">
                      {errors.email}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="businessType">
                    نوع کسب‌وکار <span className="field__req">*</span>
                  </label>
                  <div className="field__select">
                    <select
                      id="businessType"
                      name="businessType"
                      value={values.businessType}
                      onChange={update("businessType")}
                      aria-invalid={Boolean(errors.businessType)}
                      aria-describedby={errors.businessType ? "businessType-error" : undefined}
                      className={cx(errors.businessType && "is-invalid")}
                    >
                      <option value="">انتخاب کنید…</option>
                      {businessTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronLeft" size={16} />
                  </div>
                  {errors.businessType ? (
                    <span className="field__error" id="businessType-error">
                      {errors.businessType}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="siteType">
                    نوع سایت مورد نیاز <span className="field__req">*</span>
                  </label>
                  <div className="field__select">
                    <select
                      id="siteType"
                      name="siteType"
                      value={values.siteType}
                      onChange={update("siteType")}
                      aria-invalid={Boolean(errors.siteType)}
                      aria-describedby={errors.siteType ? "siteType-error" : undefined}
                      className={cx(errors.siteType && "is-invalid")}
                    >
                      <option value="">انتخاب کنید…</option>
                      {siteTypes.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronLeft" size={16} />
                  </div>
                  {errors.siteType ? (
                    <span className="field__error" id="siteType-error">
                      {errors.siteType}
                    </span>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="budget">
                    بودجه تقریبی <span className="field__req">*</span>
                  </label>
                  <div className="field__select">
                    <select
                      id="budget"
                      name="budget"
                      value={values.budget}
                      onChange={update("budget")}
                      aria-invalid={Boolean(errors.budget)}
                      aria-describedby={errors.budget ? "budget-error" : undefined}
                      className={cx(errors.budget && "is-invalid")}
                    >
                      <option value="">انتخاب کنید…</option>
                      {budgets.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevronLeft" size={16} />
                  </div>
                  {errors.budget ? (
                    <span className="field__error" id="budget-error">
                      {errors.budget}
                    </span>
                  ) : null}
                </div>

                <div className="field field--full">
                  <label htmlFor="projectDescription">
                    توضیحات پروژه <span className="field__req">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    rows={5}
                    placeholder="درباره‌ی کسب‌وکار، مخاطب و چیزی که از سایت انتظار دارید بنویسید…"
                    value={values.projectDescription}
                    onChange={update("projectDescription")}
                    aria-invalid={Boolean(errors.projectDescription)}
                    aria-describedby={
                      errors.projectDescription ? "projectDescription-error" : undefined
                    }
                    className={cx(errors.projectDescription && "is-invalid")}
                  />
                  {errors.projectDescription ? (
                    <span className="field__error" id="projectDescription-error">
                      {errors.projectDescription}
                    </span>
                  ) : null}
                </div>

                <div className="field field--full">
                  <label htmlFor="attachment">
                    آپلود فایل یا نمونه مورد نظر <span className="field__hint">(اختیاری)</span>
                  </label>
                  <label className={cx("upload", errors.file && "is-invalid")} htmlFor="attachment">
                    <span className="upload__icon">
                      <Icon name="layers" size={18} />
                    </span>
                    <span className="upload__text">
                      <strong>{file ? file.name : "انتخاب فایل"}</strong>
                      <small>
                        {file
                          ? `${toFa(Math.max(1, Math.round(file.size / 1024)))} کیلوبایت`
                          : "تصویر، PDF یا فایل فشرده — حداکثر ۱۰ مگابایت"}
                      </small>
                    </span>
                    <span className="upload__btn">مرور فایل</span>
                    <input
                      id="attachment"
                      name="attachment"
                      type="file"
                      accept="image/*,.pdf,.zip,.rar,.doc,.docx"
                      onChange={handleFile}
                    />
                  </label>
                  {errors.file ? <span className="field__error">{errors.file}</span> : null}
                </div>
              </div>

              {submitError ? (
                <p className="form__alert" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="form__footer">
                <button type="submit" className="btn btn--gold btn--block" disabled={submitting}>
                  {submitting ? "در حال ارسال…" : "ارسال درخواست"}
                  {!submitting ? <Icon name="arrowLeftLong" size={18} /> : null}
                </button>
                <p className="form__note">
                  اطلاعات شما فقط برای بررسی همین درخواست استفاده می‌شود.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
