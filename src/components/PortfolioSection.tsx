import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories, featuredProjects, projects, type Project } from "../data/projects";
import { cx, toFa } from "../lib/utils";
import { Icon } from "./Icon";
import { Lightbox } from "./Lightbox";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Slider } from "./Slider";

interface PortfolioSectionProps {
  variant?: "home" | "page";
}

export function PortfolioSection({ variant = "home" }: PortfolioSectionProps) {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "all";
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? projects : projects.filter((item) => item.category === category)),
    [category],
  );

  const selectCategory = (id: string) => {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setParams(next, { replace: true });
  };

  return (
    <section
      className="section section--dark portfolio"
      id="portfolio"
      aria-labelledby="portfolio-title"
    >
      <div className="container">
        {variant === "home" ? (
          <div className="section-top">
            <SectionHeading
              id="portfolio-title"
              kicker="نمونه‌کارها"
              title={
                <>
                  نمونه‌کارهای <span className="text-gold">FastWeb96</span>
                </>
              }
              lead="هر پروژه یک مسئله‌ی مشخص داشته است؛ این‌ها راه‌حل‌هایی هستند که برایش طراحی شده‌اند."
            />
            <Reveal className="section-top__action" variant="fade" delay={120}>
              <span className="portfolio__count">{toFa(projects.length)} پروژه</span>
            </Reveal>
          </div>
        ) : (
          <h2 className="sr-only">نمونه‌کارهای FastWeb96</h2>
        )}

        {/* اسلایدر پروژه‌های شاخص */}
        <Reveal className="portfolio__sliderWrap" variant="up">
          <Slider
            items={featuredProjects}
            getKey={(project) => project.slug}
            label="پروژه‌های شاخص FastWeb96"
            renderItem={(project) => (
              <article className="featured-slide">
                <button
                  type="button"
                  className="featured-slide__media"
                  onClick={() => setLightbox({ project, index: 0 })}
                  aria-label={`نمایش گالری تصاویر ${project.title}`}
                >
                  <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                  <span className="featured-slide__zoom">
                    <Icon name="expand" size={18} />
                  </span>
                </button>

                <div className="featured-slide__body">
                  <span className="featured-slide__chip">{project.categoryLabel}</span>
                  <h3 className="featured-slide__title">{project.title}</h3>
                  <p className="featured-slide__desc">{project.description}</p>
                  <div className="featured-slide__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="featured-slide__actions">
                    <Link className="btn btn--gold btn--sm" to={project.link}>
                      مشاهده پروژه
                      <Icon name="arrowLeftLong" size={16} />
                    </Link>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => setLightbox({ project, index: 0 })}
                    >
                      گالری تصاویر
                    </button>
                  </div>
                </div>
              </article>
            )}
          />
        </Reveal>

        {/* فیلتر دسته‌بندی */}
        <Reveal className="portfolio__filters" variant="fade" delay={80}>
          {variant === "page" ? (
            <span className="portfolio__count">{toFa(projects.length)} پروژه</span>
          ) : null}
          <div className="filter-chips" role="tablist" aria-label="دسته‌بندی نمونه‌کارها">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={category === item.id}
                className={cx("filter-chip", category === item.id && "is-active")}
                onClick={() => selectCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* شبکه‌ی نمونه‌کارها */}
        <div className="portfolio__grid" key={category}>
          {filtered.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 80} className="portfolio__item">
              <ProjectCard
                project={project}
                onOpenGallery={(item) => setLightbox({ project: item, index: 0 })}
              />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="portfolio__empty">به‌زودی نمونه‌کارهای این دسته اضافه می‌شود.</p>
        ) : null}

        {variant === "home" ? (
          <Reveal className="portfolio__more" variant="fade">
            <Link className="btn btn--ghost" to="/portfolio">
              مشاهده‌ی همه‌ی نمونه‌کارها
              <Icon name="arrowLeftLong" size={18} />
            </Link>
          </Reveal>
        ) : null}
      </div>

      {lightbox ? (
        <Lightbox
          images={lightbox.project.gallery}
          index={lightbox.index}
          title={lightbox.project.title}
          category={lightbox.project.categoryLabel}
          onIndexChange={(index) => setLightbox({ ...lightbox, index })}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  );
}
