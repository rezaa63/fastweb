import { useCallback, useEffect, useRef } from "react";
import type { GalleryImage } from "../data/projects";
import { useBodyLock, useEscape } from "../lib/hooks";
import { cx } from "../lib/utils";
import { Icon } from "./Icon";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  title?: string;
  category?: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * نمایش تمام‌صفحه‌ی تصاویر با کلیدهای جهت‌دار، شمارنده و نوار بندانگشتی.
 * (Lightbox + Gallery قابل استفاده در نمونه‌کارها و صفحه‌ی پروژه)
 */
export function Lightbox({
  images,
  index,
  title,
  category,
  onIndexChange,
  onClose,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const total = images.length;
  const current = images[index];

  useBodyLock(true);
  useEscape(onClose);

  const go = useCallback(
    (step: number) => {
      if (total === 0) return;
      onIndexChange((index + step + total) % total);
    },
    [index, onIndexChange, total],
  );

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      // در حالت RTL، کلید راست یعنی تصویر بعدی
      if (event.key === "ArrowLeft") go(1);
      if (event.key === "ArrowRight") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!current) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `گالری تصاویر ${title}` : "گالری تصاویر"}
      onClick={onClose}
    >
      <div className="lightbox__inner" onClick={(event) => event.stopPropagation()}>
        <div className="lightbox__top">
          <div className="lightbox__meta">
            {category ? <span className="lightbox__chip">{category}</span> : null}
            {title ? <span className="lightbox__title">{title}</span> : null}
          </div>
          <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose}>
            <Icon name="close" size={20} />
            <span className="sr-only">بستن گالری</span>
          </button>
        </div>

        <div className="lightbox__stage">
          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={() => go(-1)}
            aria-label="تصویر قبلی"
          >
            <Icon name="chevronRight" size={22} />
          </button>

          <figure className="lightbox__figure">
            <img src={current.src} alt={current.alt} />
            <figcaption className="lightbox__caption">
              <span>{current.alt}</span>
              <span className="lightbox__counter" dir="ltr">
                {index + 1} / {total}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={() => go(1)}
            aria-label="تصویر بعدی"
          >
            <Icon name="chevronLeft" size={22} />
          </button>
        </div>

        {total > 1 ? (
          <div className="lightbox__thumbs" role="tablist" aria-label="انتخاب تصویر">
            {images.map((image, thumbIndex) => (
              <button
                key={image.src + thumbIndex}
                type="button"
                role="tab"
                aria-selected={thumbIndex === index}
                aria-label={`تصویر ${thumbIndex + 1}`}
                className={cx("lightbox__thumb", thumbIndex === index && "is-active")}
                onClick={() => onIndexChange(thumbIndex)}
              >
                <img src={image.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
