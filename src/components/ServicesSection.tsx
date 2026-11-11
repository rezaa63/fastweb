import { Link } from "react-router-dom";
import { services, type Service } from "../data/content";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card__media">
        <img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          width={1400}
          height={933}
        />
        <div className="service-card__scrim" aria-hidden="true" />
        <div className="service-card__tags">
          {service.features.slice(0, 3).map((feature) => (
            <span key={feature} className="service-card__tag">
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__desc">{service.description}</p>
        <Link
          className="service-card__cta"
          to={`/portfolio?category=${service.category}`}
          aria-label={`مشاهده نمونه‌ی ${service.title}`}
        >
          <span>مشاهده نمونه</span>
          <span className="service-card__ctaIcon">
            <Icon name="arrowLeftLong" size={16} />
          </span>
        </Link>
      </div>
    </article>
  );
}

interface ServicesSectionProps {
  /** در صفحه‌ی خدمات، همه‌ی کارت‌ها با تیتر کامل نمایش داده می‌شوند */
  variant?: "home" | "page";
}

export function ServicesSection({ variant = "home" }: ServicesSectionProps) {
  return (
    <section
      className="section section--dark services"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="section-top">
          <SectionHeading
            id="services-title"
            kicker="خدمات"
            title={
              variant === "home" ? (
                <>
                  برای هر کسب‌وکار، یک سایت <span className="text-gold">اختصاصی</span>
                </>
              ) : (
                <>
                  خدماتی که ارائه می‌دهیم، با <span className="text-gold">جزئیات</span>
                </>
              )
            }
            lead={
              variant === "home"
                ? "شش حوزه‌ی تخصصی، یک استاندارد مشترک: طراحی مدرن، تجربه‌ی کاربری روان و اجرای فنی بی‌نقص."
                : "هر حوزه نیازمندی‌های خودش را دارد. ساختار، صفحات و مسیر کاربر را متناسب با همان کسب‌وکار طراحی می‌کنیم."
            }
          />
          {variant === "home" ? (
            <Reveal className="section-top__action" variant="fade" delay={120}>
              <Link className="btn btn--ghost btn--sm" to="/services">
                همه‌ی خدمات
                <Icon name="arrowLeftLong" size={16} />
              </Link>
            </Reveal>
          ) : null}
        </div>

        <div className={`services__grid${variant === "page" ? " services__grid--page" : ""}`}>
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 70} className="services__item">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
