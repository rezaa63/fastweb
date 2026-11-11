import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { site, telHref } from "../data/site";
import { useBodyLock, useEscape, useScrollY } from "../lib/hooks";
import { cx, toFa } from "../lib/utils";
import { Icon } from "./Icon";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollY();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const scrolled = scrollY > 40;

  useBodyLock(open);
  useEscape(() => setOpen(false), open);

  // بستن منو با تغییر مسیر
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const progress =
    typeof document !== "undefined"
      ? Math.min(
          1,
          scrollY /
            Math.max(
              1,
              document.documentElement.scrollHeight - document.documentElement.clientHeight,
            ),
        )
      : 0;

  return (
    <>
      <a className="skip-link" href="#main">
        رفتن به محتوای اصلی
      </a>

      <header
        className={cx(
          "navbar",
          scrolled && "is-scrolled",
          (open || (!isHome && !scrolled)) && "is-solid",
          open && "is-open",
        )}
      >
        <div className="navbar__inner container">
          <Link to="/" className="brand" aria-label={`${site.brand.name} — صفحه اصلی`}>
            <span className="brand__mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="40" height="40" role="presentation">
                <defs>
                  <linearGradient id="brandGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#EBDCB6" />
                    <stop offset="0.5" stopColor="#C8A96B" />
                    <stop offset="1" stopColor="#8C6F3A" />
                  </linearGradient>
                </defs>
                <rect
                  x="1.2"
                  y="1.2"
                  width="37.6"
                  height="37.6"
                  rx="11"
                  fill="none"
                  stroke="url(#brandGold)"
                  strokeWidth="1.2"
                  opacity="0.75"
                />
                <path
                  d="M13.4 28.6V11.4h7.2c3.2 0 5.4 1.9 5.4 4.7s-2.2 4.7-5.4 4.7h-3.6v7.8h-3.6z"
                  fill="url(#brandGold)"
                />
                <circle cx="27.4" cy="24.4" r="2.3" fill="#2E6BFF" />
              </svg>
            </span>
            <span className="brand__text">
              <span className="brand__name" dir="ltr">
                {site.brand.name}
              </span>
              <span className="brand__sub">طراحی و توسعه وب</span>
            </span>
          </Link>

          <nav className="navbar__nav" aria-label="منوی اصلی">
            <ul className="navbar__list">
              {site.nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) => cx("nav-link", isActive && "is-active")}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <a className="navbar__phone" href={telHref} aria-label="تماس تلفنی">
              <Icon name="phone" size={17} />
              <span dir="ltr">{site.contact.phoneLabel}</span>
            </a>
            <Link to="/order" className="btn btn--gold btn--sm navbar__cta">
              شروع پروژه
            </Link>
            <button
              type="button"
              className={cx("hamburger", open && "is-active")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "بستن منو" : "باز کردن منو"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <span
          className="navbar__progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>

      <div
        id="mobile-menu"
        className={cx("mobile-menu", open && "is-open")}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-menu__glow" aria-hidden="true" />
        <nav className="mobile-menu__nav" aria-label="منوی موبایل">
          <ul>
            {site.nav.map((item, index) => (
              <li key={item.to} style={{ ["--i" as string]: index }}>
                <NavLink to={item.to} end={item.to === "/"} onClick={() => setOpen(false)}>
                  <span className="mobile-menu__index">{`۰${toFa(index + 1)}`}</span>
                  <span>{item.label}</span>
                  <Icon name="arrowLeftLong" size={20} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__foot">
          <a href={telHref} className="mobile-menu__contact" dir="ltr">
            <Icon name="phone" size={18} />
            {site.contact.phoneLabel}
          </a>
          <a href={`mailto:${site.contact.email}`} className="mobile-menu__contact" dir="ltr">
            <Icon name="mail" size={18} />
            {site.contact.email}
          </a>
          <div className="socials">
            {site.socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="socials__link"
              >
                <Icon name={social.id as "instagram"} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
