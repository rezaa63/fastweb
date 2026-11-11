import { useState } from "react";
import { Link } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import { Icon } from "./Icon";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";

const PROJECT_SLUG = "dena-plus-showroom";

/**
 * نمایش ویژه‌ی پروژه‌ی «دنا پلاس» — طراحی شبیه Showcase یک محصول پرمیوم.
 * تصویر اصلی با Hover Zoom بسیار نرم و گالری کامل با Lightbox.
 */
export function CarShowcase() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const project = getProjectBySlug(PROJECT_SLUG);

  if (!project) return null;

  return (
    <section className="section section--dark car-showcase" aria-labelledby="car-showcase-title">
      <div className="container">
        <Reveal className="car-showcase__frame" variant="scale">
          <div className="car-showcase__media">
            <button
              type="button"
              className="car-showcase__imageBtn"
              onClick={() => setLightboxIndex(0)}
              aria-label={`نمایش گالری تصاویر ${project.title}`}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                decoding="async"
                width={1400}
                height={790}
              />
              <span className="car-showcase__glow" aria-hidden="true" />
              <span className="car-showcase__shade" aria-hidden="true" />
              <span className="car-showcase__expand">
                <Icon name="expand" size={18} />
                گالری
              </span>
            </button>

            <div className="car-showcase__specs" aria-hidden="true">
              <span className="car-showcase__spec">
                <em dir="ltr">Dena Plus</em>
                <small>خودروی شاخص</small>
              </span>
              <span className="car-showcase__specSep" />
              <span className="car-showcase__spec">
                <em dir="ltr">Turbo</em>
                <small>مشخصات فنی</small>
              </span>
              <span className="car-showcase__specSep" />
              <span className="car-showcase__spec">
                <em dir="ltr">360°</em>
                <small>گالری تصاویر</small>
              </span>
            </div>
          </div>

          <div className="car-showcase__panel">
            <span className="car-showcase__kicker">
              <Icon name="sparkle" size={14} />
              پروژه ویژه
            </span>

            <h2 className="car-showcase__title" id="car-showcase-title">
              طراحی سایت نمایشگاه خودرو
            </h2>

            <p className="car-showcase__desc">
              شوروم دیجیتال دنا پلاس؛ تجربه‌ای که خودرو را همان‌طور که در نمایشگاه می‌بینید نمایش
              می‌دهد؛ با گالری تصاویر، جزئیات فنی و فرم رزرو تست رانندگی.
            </p>

            <ul className="car-showcase__list">
              <li>
                <Icon name="check" size={16} /> صفحه‌ی اختصاصی هر خودرو با مشخصات فنی
              </li>
              <li>
                <Icon name="check" size={16} /> گالری تصاویر با Lightbox و زوم نرم
              </li>
              <li>
                <Icon name="check" size={16} /> فرم رزرو تست رانندگی و تماس سریع
              </li>
            </ul>

            <div className="car-showcase__actions">
              <Link className="btn btn--gold btn--sm" to={project.link}>
                مشاهده پروژه
                <Icon name="arrowLeftLong" size={16} />
              </Link>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => setLightboxIndex(0)}
              >
                گالری تصاویر
              </button>
            </div>
          </div>
        </Reveal>

        <div className="car-showcase__thumbs">
          {project.gallery.slice(0, 4).map((image, index) => (
            <Reveal key={image.src} delay={index * 70} variant="up">
              <button
                type="button"
                className="car-showcase__thumb"
                onClick={() => setLightboxIndex(index)}
                aria-label={`نمایش تصویر ${image.alt}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                <span className="car-showcase__thumbShade" aria-hidden="true" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <Lightbox
          images={project.gallery}
          index={lightboxIndex}
          title={project.title}
          category={project.categoryLabel}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </section>
  );
}
