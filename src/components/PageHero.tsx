import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  kicker: string;
  title: ReactNode;
  lead?: string;
  crumbs?: Array<{ label: string; to?: string }>;
}

/** سربرگ صفحات داخلی — ترکیب هم‌خانواده با Hero اصلی */
export function PageHero({ kicker, title, lead, crumbs }: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__bg" aria-hidden="true">
        <span className="page-hero__glow page-hero__glow--blue" />
        <span className="page-hero__glow page-hero__glow--gold" />
        <span className="page-hero__grid" />
      </div>

      <div className="container page-hero__inner">
        {crumbs ? (
          <nav className="breadcrumbs" aria-label="مسیر صفحه">
            <ol>
              <li>
                <Link to="/">خانه</Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label}>
                  <Icon name="chevronLeft" size={13} />
                  {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal variant="fade" className="page-hero__kicker">
          <span className="kicker-line" aria-hidden="true" />
          {kicker}
        </Reveal>

        <Reveal delay={70}>
          <h1 className="page-hero__title" id="page-hero-title">
            {title}
          </h1>
        </Reveal>

        {lead ? (
          <Reveal delay={140}>
            <p className="page-hero__lead">{lead}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

interface CtaBandProps {
  title?: ReactNode;
  text?: string;
}

export function CtaBand({
  title = (
    <>
      پروژه‌ای در ذهن دارید؟ <span className="text-gold">شروع کنیم.</span>
    </>
  ),
  text = "در اولین فرصت درباره‌ی ایده، زمان و بودجه‌ی پروژه با شما گفت‌وگو می‌کنیم.",
}: CtaBandProps) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container cta-band__inner">
        <Reveal>
          <h2 className="cta-band__title" id="cta-band-title">
            {title}
          </h2>
          <p className="cta-band__text">{text}</p>
        </Reveal>
        <Reveal variant="fade" delay={120} className="cta-band__actions">
          <Link className="btn btn--gold" to="/order">
            ثبت سفارش
            <Icon name="arrowLeftLong" size={18} />
          </Link>
          <Link className="btn btn--ghost" to="/contact">
            تماس با ما
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
