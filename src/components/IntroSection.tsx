import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { assetUrl } from "../lib/utils";

const points = [
  { icon: "pen" as const, title: "طراحی اختصاصی", text: "بدون قالب آماده" },
  { icon: "gauge" as const, title: "سرعت بالا", text: "بهینه برای همه دستگاه‌ها" },
  { icon: "search" as const, title: "سئوی تکنیکال", text: "ساختار آماده برای گوگل" },
];

/** ماکت مرورگر — عنصر گرافیکی بخش معرفی */
function BrowserMockup() {
  return (
    <div className="mockup" aria-hidden="true">
      <div className="mockup__window">
        <div className="mockup__bar">
          <span className="mockup__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mockup__url" dir="ltr">
            fastweb96.ir
          </span>
        </div>

        <div className="mockup__screen">
          <img src={assetUrl("/images/villa-night.jpg")} alt="" loading="lazy" decoding="async" />
          <span className="mockup__screenShade" />

          <div className="mockup__nav">
            <span className="mockup__logo" dir="ltr">
              FastWeb96
            </span>
            <span className="mockup__navLinks">
              <i />
              <i />
              <i />
            </span>
            <span className="mockup__navBtn" />
          </div>

          <div className="mockup__hero">
            <span className="mockup__line mockup__line--xl" />
            <span className="mockup__line mockup__line--lg" />
            <span className="mockup__line mockup__line--sm" />
            <span className="mockup__cta" />
          </div>
        </div>
      </div>

      <div className="mockup__float mockup__float--a">
        <span className="mockup__floatIcon">
          <Icon name="gauge" size={16} />
        </span>
        <span>
          <strong>Performance</strong>
          <small>بهینه و سریع</small>
        </span>
      </div>

      <div className="mockup__float mockup__float--b">
        <span className="mockup__floatIcon mockup__floatIcon--blue">
          <Icon name="grid" size={16} />
        </span>
        <span>
          <strong>Responsive</strong>
          <small>موبایل تا دسکتاپ</small>
        </span>
      </div>
    </div>
  );
}

export function IntroSection() {
  return (
    <section className="section section--cream intro" id="intro" aria-labelledby="intro-title">
      <div className="container intro__grid">
        <div className="intro__copy">
          <Reveal variant="fade" className="intro__kicker">
            <span className="kicker-line" aria-hidden="true" />
            معرفی FastWeb96
          </Reveal>

          <Reveal delay={60}>
            <h2 className="intro__title" id="intro-title">
              ما فقط سایت طراحی نمی‌کنیم؛{" "}
              <span className="intro__titleAccent">تجربه دیجیتال</span> می‌سازیم.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="intro__text">
              FastWeb96 با تمرکز بر طراحی مدرن، تجربه کاربری و عملکرد فنی، برای کسب‌وکارهای مختلف
              وب‌سایت‌هایی اختصاصی و حرفه‌ای طراحی می‌کند.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <ul className="intro__points">
              {points.map((point) => (
                <li key={point.title}>
                  <span className="intro__pointIcon">
                    <Icon name={point.icon} size={18} />
                  </span>
                  <span>
                    <strong>{point.title}</strong>
                    <small>{point.text}</small>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <Link className="link-arrow intro__link" to="/about">
              بیشتر درباره فرآیند کار
              <Icon name="arrowLeftLong" size={16} />
            </Link>
          </Reveal>
        </div>

        <Reveal className="intro__visual" variant="left" delay={140}>
          <BrowserMockup />
        </Reveal>
      </div>
    </section>
  );
}
