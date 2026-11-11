import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Lightbox } from "../components/Lightbox";
import { CtaBand, PageHero } from "../components/PageHero";
import { PageMeta } from "../components/PageMeta";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { getProjectBySlug, relatedProjects, type Project } from "../data/projects";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  if (!project) return <NotFoundPage />;

  const related = relatedProjects(project, 3);

  return (
    <>
      <PageMeta
        title={`${project.title} | نمونه‌کارهای FastWeb96`}
        description={project.description}
      />

      <PageHero
        kicker={project.categoryLabel}
        title={project.title}
        lead={project.description}
        crumbs={[{ label: "نمونه‌کارها", to: "/portfolio" }, { label: project.title }]}
      />

      <section className="section section--dark project-detail">
        <div className="container">
          <Reveal className="project-detail__layout" variant="scale">
            <button
              type="button"
              className="project-detail__main"
              onClick={() => setLightbox({ project, index: 0 })}
              aria-label={`نمایش گالری تصاویر ${project.title}`}
            >
              <img src={project.image} alt={project.imageAlt} />
              <span className="project-detail__zoom">
                <Icon name="expand" size={18} />
                مشاهده گالری
              </span>
            </button>

            <aside className="project-detail__side">
              <dl className="project-detail__meta">
                <div>
                  <dt>دسته‌بندی</dt>
                  <dd>{project.categoryLabel}</dd>
                </div>
                <div>
                  <dt>سال</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt>تعداد تصاویر</dt>
                  <dd>{project.gallery.length}</dd>
                </div>
              </dl>

              <ul className="project-detail__tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <div className="project-detail__actions">
                <Link className="btn btn--gold btn--block" to="/order">
                  سفارش سایتی مشابه
                  <Icon name="arrowLeftLong" size={18} />
                </Link>
                <button
                  type="button"
                  className="btn btn--ghost btn--block"
                  onClick={() => setLightbox({ project, index: 0 })}
                >
                  گالری تصاویر
                </button>
              </div>
            </aside>
          </Reveal>

          <div className="project-detail__gallery">
            {project.gallery.map((image, index) => (
              <Reveal key={image.src} delay={(index % 3) * 70} variant="up">
                <button
                  type="button"
                  className="project-detail__thumb"
                  onClick={() => setLightbox({ project, index })}
                  aria-label={`باز کردن تصویر ${image.alt}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                </button>
              </Reveal>
            ))}
          </div>

          <div className="project-detail__description">
            <Reveal>
              <h2 className="project-detail__heading">درباره‌ی این پروژه</h2>
              <p>{project.description}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section section--dark-alt related" aria-labelledby="related-title">
          <div className="container">
            <div className="section-top">
              <Reveal>
                <h2 className="related__title" id="related-title">
                  پروژه‌های <span className="text-gold">مشابه</span>
                </h2>
              </Reveal>
              <Reveal variant="fade" delay={80}>
                <Link className="link-arrow" to="/portfolio">
                  همه‌ی نمونه‌کارها
                  <Icon name="arrowLeftLong" size={16} />
                </Link>
              </Reveal>
            </div>

            <div className="portfolio__grid">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 80} className="portfolio__item">
                  <ProjectCard
                    project={item}
                    onOpenGallery={(value) => setLightbox({ project: value, index: 0 })}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />

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
    </>
  );
}
