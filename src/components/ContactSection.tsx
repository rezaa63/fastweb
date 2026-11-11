import { useState, type FormEvent } from "react";
import { mailHref, site, telHref } from "../data/site";
import { submitLead } from "../lib/leads";
import { cx, isValidEmail, isValidIranMobile } from "../lib/utils";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

type ContactErrors = { name?: string; contact?: string; message?: string };

export function ContactSection() {
  const [values, setValues] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: ContactErrors = {};
    if (values.name.trim().length < 3) next.name = "نام خود را وارد کنید.";
    if (!values.contact.trim()) next.contact = "شماره تماس یا ایمیل را وارد کنید.";
    else if (
      !isValidIranMobile(values.contact) &&
      !isValidEmail(values.contact) &&
      values.contact.trim().length < 5
    ) {
      next.contact = "شماره تماس یا ایمیل معتبر نیست.";
    }
    if (values.message.trim().length < 5) next.message = "متن پیام را بنویسید.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    await submitLead({
      source: "contact",
      fields: {
        fullName: values.name.trim(),
        contact: values.contact.trim(),
        projectDescription: values.message.trim(),
      },
    });
    setStatus("sent");
    setValues({ name: "", contact: "", message: "" });
  };

  return (
    <section
      className="section section--cream contact"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container contact__grid">
        <div className="contact__info">
          <Reveal variant="fade" className="contact__kicker">
            <span className="kicker-line" aria-hidden="true" />
            تماس با ما
          </Reveal>

          <Reveal delay={60}>
            <h2 className="contact__title" id="contact-title">
              با <span dir="ltr">FastWeb96</span> در ارتباط باشید
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="contact__lead">
              برای شروع پروژه، مشاوره یا هر پرسشی درباره‌ی طراحی سایت، از راه‌های زیر با ما در تماس
              باشید.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <ul className="contact__rows">
              <li>
                <span className="contact__rowIcon">
                  <Icon name="pen" size={17} />
                </span>
                <div>
                  <small>طراح و توسعه‌دهنده</small>
                  <strong>{site.designer.name}</strong>
                </div>
              </li>
              <li>
                <span className="contact__rowIcon">
                  <Icon name="sparkle" size={17} />
                </span>
                <div>
                  <small>برند</small>
                  <strong dir="ltr">{site.brand.name}</strong>
                </div>
              </li>
              <li>
                <span className="contact__rowIcon">
                  <Icon name="phone" size={17} />
                </span>
                <div>
                  <small>شماره تماس</small>
                  <a href={telHref} dir="ltr">
                    {site.contact.phoneLabel}
                  </a>
                </div>
              </li>
              <li>
                <span className="contact__rowIcon">
                  <Icon name="mail" size={17} />
                </span>
                <div>
                  <small>ایمیل</small>
                  <a href={mailHref} dir="ltr">
                    {site.contact.email}
                  </a>
                </div>
              </li>
              <li>
                <span className="contact__rowIcon">
                  <Icon name="location" size={17} />
                </span>
                <div>
                  <small>موقعیت</small>
                  <strong>{site.contact.location}</strong>
                </div>
              </li>
              <li>
                <span className="contact__rowIcon">
                  <Icon name="clock" size={17} />
                </span>
                <div>
                  <small>ساعات پاسخ‌گویی</small>
                  <strong>{site.contact.hours}</strong>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <div className="socials contact__socials">
              {site.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="socials__link"
                  title={social.label}
                >
                  <Icon name={social.id as "instagram"} size={18} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="contact__card" variant="scale" delay={120}>
          <h3 className="contact__cardTitle">پیام سریع</h3>
          <p className="contact__cardText">
            فرم کوتاه زیر را پر کنید؛ در اولین فرصت پاسخ می‌دهیم.
          </p>

          {status === "sent" ? (
            <div className="contact__sent" role="status" aria-live="polite">
              <span className="contact__sentIcon">
                <Icon name="check" size={20} />
              </span>
              <p>پیام فقط در حافظه‌ی همین مرورگر ذخیره شد و به سرور ارسال نشده است. برای دریافت پاسخ، لطفاً از شماره تماس یا ایمیل استفاده کنید.</p>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setStatus("idle")}
              >
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form className="form form--compact" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name">نام</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="نام شما"
                  value={values.name}
                  onChange={(event) => {
                    setValues((prev) => ({ ...prev, name: event.target.value }));
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  aria-invalid={Boolean(errors.name)}
                  className={cx(errors.name && "is-invalid")}
                />
                {errors.name ? <span className="field__error">{errors.name}</span> : null}
              </div>

              <div className="field">
                <label htmlFor="contact-value">شماره تماس یا ایمیل</label>
                <input
                  id="contact-value"
                  name="contact"
                  type="text"
                  placeholder="۰۹۱۲۱۲۳۴۵۶۷ یا you@example.com"
                  value={values.contact}
                  onChange={(event) => {
                    setValues((prev) => ({ ...prev, contact: event.target.value }));
                    setErrors((prev) => ({ ...prev, contact: undefined }));
                  }}
                  aria-invalid={Boolean(errors.contact)}
                  className={cx(errors.contact && "is-invalid")}
                  dir="ltr"
                />
                {errors.contact ? <span className="field__error">{errors.contact}</span> : null}
              </div>

              <div className="field">
                <label htmlFor="contact-message">پیام</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="چطور می‌توانیم کمک کنیم؟"
                  value={values.message}
                  onChange={(event) => {
                    setValues((prev) => ({ ...prev, message: event.target.value }));
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  aria-invalid={Boolean(errors.message)}
                  className={cx(errors.message && "is-invalid")}
                />
                {errors.message ? <span className="field__error">{errors.message}</span> : null}
              </div>

              <button
                type="submit"
                className="btn btn--gold btn--block"
                disabled={status === "sending"}
              >
                {status === "sending" ? "در حال ارسال…" : "ارسال پیام"}
                {status !== "sending" ? <Icon name="arrowLeftLong" size={18} /> : null}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
