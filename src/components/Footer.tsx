import { Link } from "react-router-dom";
import { services } from "../data/content";
import { mailHref, site, telHref } from "../data/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Footer() {
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  return (
    <footer className="footer" id="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
        <Reveal className="footer__brand" variant="up">
          <Link to="/" className="footer__logo" aria-label={`${site.brand.name} — صفحه اصلی`}>
            <span dir="ltr" className="footer__logoText">
              {site.brand.name}
            </span>
            <span className="footer__dot" aria-hidden="true" />
          </Link>
          <p className="footer__tagline">«{site.brand.footerLine}»</p>
          <div className="socials">
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

        <Reveal className="footer__col" delay={80}>
          <h2 className="footer__title">لینک‌های سریع</h2>
          <ul className="footer__list">
            {site.nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="footer__col" delay={140}>
          <h2 className="footer__title">خدمات</h2>
          <ul className="footer__list">
            {services.map((service) => (
              <li key={service.id}>
                <Link to={`/portfolio?category=${service.category}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="footer__col footer__col--contact" delay={200}>
          <h2 className="footer__title">ارتباط با ما</h2>
          <ul className="footer__list footer__list--contact">
            <li>
              <span className="footer__person">{site.designer.name}</span>
              <span className="footer__personRole">{site.designer.role}</span>
            </li>
            <li>
              <a href={telHref} dir="ltr">
                <Icon name="phone" size={16} />
                {site.contact.phoneLabel}
              </a>
            </li>
            <li>
              <a href={mailHref} dir="ltr">
                <Icon name="mail" size={16} />
                {site.contact.email}
              </a>
            </li>
            <li className="footer__muted">
              <Icon name="location" size={16} />
              {site.contact.location}
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copyright">
          © <span dir="ltr">{site.brand.name}</span> — تمامی حقوق محفوظ است.{" "}
          <span className="footer__year">({year})</span>
        </p>
        <p className="footer__credit" dir="ltr">
          Designed &amp; Developed by {site.designer.name}
        </p>
      </div>
    </footer>
  );
}
