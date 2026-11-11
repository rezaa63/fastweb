import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { toFa } from "../lib/utils";
import { Icon } from "./Icon";

interface ProjectCardProps {
  project: Project;
  onOpenGallery: (project: Project) => void;
}

export function ProjectCard({ project, onOpenGallery }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__media">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width={1400}
          height={933}
        />
        <div className="project-card__scrim" aria-hidden="true" />
        <span className="project-card__badge">{project.categoryLabel}</span>
        <button
          type="button"
          className="project-card__zoom"
          onClick={() => onOpenGallery(project)}
          aria-label={`نمایش گالری تصاویر ${project.title}`}
        >
          <Icon name="expand" size={18} />
        </button>
      </div>

      <div className="project-card__body">
        <div className="project-card__head">
          <h3 className="project-card__title">{project.title}</h3>
          <span className="project-card__year">{project.year}</span>
        </div>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__foot">
          <Link className="link-arrow" to={project.link}>
            مشاهده پروژه
            <Icon name="arrowLeftLong" size={16} />
          </Link>
          <button
            type="button"
            className="project-card__galleryBtn"
            onClick={() => onOpenGallery(project)}
          >
            {toFa(project.gallery.length)} تصویر
          </button>
        </div>
      </div>
    </article>
  );
}
