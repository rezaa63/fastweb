import { Link } from "react-router-dom";
import { site } from "../data/site";
import { assetUrl } from "../lib/utils";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface AboutSectionProps {
  /** در صفحه‌ی «درباره ما» تیتر سربرگ صفحه نمایش داده می‌شود و اینجا لازم نیست */
  showHeading?: boolean;
}

export function AboutSection({ showHeading = true }: AboutSectionProps) {
  return (
    <section className="section section--dark about" id="about" aria-labelledby="about-title">
      <div className="about__glow" aria-hidden="true" />
      <div className="container about__grid">
        <div className="about__copy">
          {showHeading ? (
            <SectionHeading
              id="about-title"
              kicker="درباره ما"
              title={
                <>
                  درباره{" "}
                  <span className="text-gold" dir="ltr">
                    {site.brand.name}
                  </span>
                </>
              }
              lead={`${site.brand.name} یک مجموعه طراحی و توسعه وب است که با تمرکز بر طراحی مدرن، تجربه کاربری و هویت بصری، برای کسب‌وکارهای مختلف وب‌سایت‌های حرفه‌ای ایجاد می‌کند.`}
            />
          ) : (
            <>
              <h2 className="sr-only" id="about-title">
                درباره {site.brand.name}
              </h2>
              <Reveal>
                <p className="about__lede">
                  {site.brand.name} یک مجموعه طراحی و توسعه وب است که با تمرکز بر طراحی مدرن،
                  تجربه کاربری و هویت بصری، برای کسب‌وکارهای مختلف وب‌سایت‌های حرفه‌ای ایجاد می‌کند.
                </p>
              </Reveal>
            </>
          )}

          <Reveal delay={140} className="about__designer">
            <span className="about__avatar" aria-hidden="true">
              {site.designer.initials}
            </span>
            <div className="about__designerMeta">
              <p className="about__designerName">{site.designer.name}</p>
              <p className="about__designerRole" dir="ltr">
                {site.designer.role}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="about__bio">{site.designer.bio}</p>
          </Reveal>

          <Reveal delay={260} className="about__actions">
            <Link className="btn btn--gold btn--sm" to="/order">
              شروع یک پروژه
              <Icon name="arrowLeftLong" size={16} />
            </Link>
            <Link className="btn btn--ghost btn--sm" to="/contact">
              گفت‌وگو با {site.designer.name}
            </Link>
          </Reveal>
        </div>

        <Reveal className="about__visual" variant="left" delay={160}>
          <div className="about__frame">
            <img
              src={assetUrl("/images/towers.jpg")}
              alt="معماری مدرن و برج‌های شیشه‌ای — نمادی از طراحی دقیق و ساختار حرفه‌ای"
              loading="lazy"
              decoding="async"
            />
            <span className="about__frameShade" aria-hidden="true" />
            <div className="about__badge">
              <span className="about__badgeMark" dir="ltr">
                {site.brand.name}
              </span>
              <span className="about__badgeText">طراحی و توسعه وب</span>
            </div>
          </div>

          <div className="about__quote">
            <Icon name="sparkle" size={18} />
            <p>«{site.brand.tagline}»</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
