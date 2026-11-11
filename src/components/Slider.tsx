import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cx, prefersReducedMotion } from "../lib/utils";
import { Icon } from "./Icon";

interface SliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  getKey: (item: T, index: number) => string;
  label: string;
  className?: string;
}

/**
 * اسلایدر افقی با Scroll-Snap.
 *
 * مزیت این روش: Swipe بومی موبایل، پشتیبانی کامل RTL و کارایی بالا.
 * دکمه‌های قبلی/بعدی و Pagination روی همین مکانیزم کار می‌کنند. پخش خودکار ندارد.
 */
export function Slider<T>({
  items,
  renderItem,
  getKey,
  label,
  className,
}: SliderProps<T>) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const target = children[Math.max(0, Math.min(children.length - 1, index))];
    if (!target) return;

    /**
     * فقط نوار اسلایدر به‌صورت افقی اسکرول می‌شود (نه صفحه).
     * scrollIntoView باعث می‌شد صفحه هم به‌صورت عمودی تا اسلایدر پایین بپرد؛
     * به‌خصوص هنگام پخش خودکار وقتی کاربر بالای صفحه بود.
     */
    const trackRect = track.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const delta =
      targetRect.left + targetRect.width / 2 - (trackRect.left + trackRect.width / 2);

    track.scrollBy({
      left: delta,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  const go = useCallback(
    (step: number) => {
      setActive((current) => {
        const next = (current + step + items.length) % items.length;
        scrollToIndex(next);
        return next;
      });
    },
    [items.length, scrollToIndex],
  );

  // همگام‌سازی Pagination با موقعیت واقعی اسکرول (شامل Swipe)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const children = Array.from(track.children) as HTMLElement[];
      if (!children.length) return;
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;
      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const current = Math.abs(rect.left + rect.width / 2 - center);
        if (current < distance) {
          distance = current;
          closest = index;
        }
      });
      setActive(closest);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div
      className={cx("slider", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="slider__viewport">
        <div className="slider__track" ref={trackRef}>
          {items.map((item, index) => (
            <div
              className="slider__slide"
              key={getKey(item, index)}
              aria-hidden={index !== active}
              aria-roledescription="slide"
              aria-label={`${index + 1} از ${items.length}`}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      <div className="slider__controls">
        <div className="slider__nav">
          <button
            type="button"
            className="slider__btn"
            onClick={() => go(-1)}
            aria-label="اسلاید قبلی"
          >
            <Icon name="chevronRight" size={20} />
          </button>
          <button
            type="button"
            className="slider__btn"
            onClick={() => go(1)}
            aria-label="اسلاید بعدی"
          >
            <Icon name="chevronLeft" size={20} />
          </button>
        </div>

        <div className="slider__dots" role="tablist" aria-label="انتخاب اسلاید">
          {items.map((item, index) => (
            <button
              key={`dot-${getKey(item, index)}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`اسلاید ${index + 1}`}
              className={cx("slider__dot", index === active && "is-active")}
              onClick={() => {
                setActive(index);
                scrollToIndex(index);
              }}
            />
          ))}
        </div>

        <span className="slider__hint">برای جابه‌جایی بکشید</span>
      </div>
    </div>
  );
}
