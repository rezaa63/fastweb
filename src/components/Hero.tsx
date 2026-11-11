import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/site";
import { assetUrl, cx } from "../lib/utils";
import { Icon } from "./Icon";

/**
 * ویدیوی اصلی Hero — همان ویدیوی ارائه‌شده توسط کارفرما.
 * این ویدیو پخش نمی‌شود؛ فقط با اسکرول، تایم‌لاین آن اسکراب (جلو/عقب) می‌شود.
 *
 * برای روان بودن اسکراب، انکود ویدیو مهم‌ترین عامل است. اگر فایل جایگزین شد،
 * ترجیحاً ویژگی‌های زیر را رعایت کنید (با ffmpeg → `-movflags +faststart`):
 * - MP4 / H.264 (نسخه‌ی WebM/VP9 هم می‌تواند به‌عنوان منبع دوم اضافه شود)
 * - کی‌فریم کوتاه: هر ۰٫۳ تا ۰٫۵ ثانیه (`-g 12` روی ۲۴fps)، بدون GOP بلند
 * - رزولوشن ۱۲۸۰×۷۲۰ (موبایل/دسکتاپ معمولی) یا حداکثر ۱۹۲۰×۱۰۸۰
 * - بیتریت حدود ۳ تا ۵ مگابیت بر ثانیه، بدون B-frame زیاد
 * GOP بلند باعث می‌شود هر seek چند ده فریم رمزگشایی کند و اسکرول تکان‌تکان شود.
 */
const HERO_VIDEO = assetUrl("/media/hero-video.mp4");
const HERO_POSTER = assetUrl("/media/hero-poster.jpg");

/** نرمی دنبال‌کردن هدف (۰ تا ۱) — بالاتر یعنی چسبیده‌تر و پاسخگوتر به اسکرول */
const SMOOTHING = 0.3;
/** اختلاف بزرگ‌تر از این مقدار (ثانیه) مستقیم اعمال می‌شود تا اسکرول سریع عقب نماند */
const SNAP_THRESHOLD = 0.45;
/** اختلاف کمتر از این مقدار (ثانیه) نادیده گرفته می‌شود تا seek بی‌مورد ارسال نشود */
const MIN_DELTA = 0.012;

/**
 * Hero سینمایی با ویدیوی کنترل‌شده توسط اسکرول.
 *
 * - ویدیو هیچ‌وقت play نمی‌شود؛ فقط currentTime آن با پیشرفت اسکرول نوشته می‌شود.
 * - یک شنونده‌ی passive اسکرول فقط «درخواست فریم بعدی» می‌دهد؛ همه‌ی محاسبات و
 *   نوشتن روی ویدیو داخل requestAnimationFrame انجام می‌شود.
 * - پیشرفت اسکرول در متغیر CSS «--scroll-progress» نوشته می‌شود تا متن و اورلی‌ها
 *   بدون re-render ری‌اکت حرکت کنند.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // احترام به prefers-reduced-motion: هیچ اسکرابی انجام نمی‌شود و فقط فریم اول/پوستر می‌ماند.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      section.style.setProperty("--scroll-progress", "0");
      return;
    }

    let duration = 0;
    let start = 0;
    let span = 1;
    let target = 0;
    let rendered = 0;
    let lastProgress = -1;
    let frame = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      start = rect.top + window.scrollY;
      span = Math.max(1, section.offsetHeight - window.innerHeight);
    };

    const progressNow = () => {
      const value = (window.scrollY - start) / span;
      return value < 0 ? 0 : value > 1 ? 1 : value;
    };

    const paint = () => {
      frame = 0;

      const progress = progressNow();
      if (Math.abs(progress - lastProgress) > 0.0005) {
        lastProgress = progress;
        section.style.setProperty("--scroll-progress", progress.toFixed(4));
      }

      // تا وقتی متادیتای ویدیو نیامده یا seek قبلی تمام نشده، currentTime نوشته نمی‌شود.
      if (!duration || video.seeking) return;

      target = progress * duration;
      const delta = target - rendered;
      if (Math.abs(delta) < MIN_DELTA) return;

      // پرش‌های بزرگ (اسکرول سریع، اسکرول با نوار مرورگر) بدون نرم‌سازی اعمال می‌شوند.
      rendered = Math.abs(delta) > SNAP_THRESHOLD ? target : rendered + delta * SMOOTHING;

      try {
        video.currentTime = rendered;
      } catch {
        /* برخی مرورگرها هنگام آماده نبودن بافر خطا می‌دهند؛ فریم بعد دوباره تلاش می‌شود */
      }

      schedule();
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const onLoadedMetadata = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();
      // یک seek بسیار کوچک باعث می‌شود فریم اول در همه‌ی مرورگرها رسم شود.
      if (duration && video.currentTime === 0) {
        try {
          video.currentTime = 0.001;
          rendered = 0.001;
        } catch {
          /* ignore */
        }
      }
      measure();
      schedule();
    };

    const onSeeked = () => {
      if (duration) schedule();
    };

    const onScroll = () => schedule();

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    if (video.readyState >= 1) onLoadedMetadata();

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    resizeObserver?.observe(section);
    schedule();

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__media">
          <div className="hero__videoWrap">
            {/* پوستر/فریم جایگزین — تا رسیدن ویدیو یا در صورت خطا دیده می‌شود */}
            <img className="hero__poster" src={HERO_POSTER} alt="" aria-hidden="true" />

            <video
              ref={videoRef}
              className={cx("hero__video", ready && "is-ready", failed && "is-failed")}
              src={HERO_VIDEO}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
              onLoadedData={() => setReady(true)}
              onError={() => setFailed(true)}
              /* ویدیو هرگز نباید خودش پخش شود؛ این فقط یک محافظ است. */
              onPlay={(event) => event.currentTarget.pause()}
            />
          </div>

          <div className="hero__overlay" aria-hidden="true" />
          <div className="hero__scrim" aria-hidden="true" />
          <div className="hero__vignette" aria-hidden="true" />
          <div className="hero__glow hero__glow--blue" aria-hidden="true" />
          <div className="hero__glow hero__glow--gold" aria-hidden="true" />
          <div className="hero__grid" aria-hidden="true" />
        </div>

        <div className="hero__content container">
          <p className="hero__eyebrow">
            <span className="hero__eyebrowDot" aria-hidden="true" />
            استودیو طراحی و توسعه وب
            <span className="hero__eyebrowSep" aria-hidden="true" />
            <span className="hero__eyebrowName">{site.designer.name}</span>
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__brand" dir="ltr">
              {site.brand.name}
            </span>
            <span className="hero__tagline">{site.brand.tagline}</span>
          </h1>

          <p className="hero__lead">{site.brand.shortDescription}</p>

          <div className="hero__actions">
            <Link className="btn btn--gold" to="/portfolio">
              مشاهده نمونه‌کارها
              <Icon name="arrowLeftLong" size={18} />
            </Link>
            <Link className="btn btn--ghost" to="/order">
              ثبت سفارش
              <Icon name="arrowUpRight" size={18} />
            </Link>
          </div>

          <ul className="hero__marks">
            <li>
              <Icon name="pen" size={16} /> طراحی اختصاصی
            </li>
            <li>
              <Icon name="gauge" size={16} /> سرعت و پرفورمنس
            </li>
            <li>
              <Icon name="headset" size={16} /> پشتیبانی واقعی
            </li>
          </ul>
        </div>

        <div className={cx("hero__loader", (ready || failed) && "is-hidden")} aria-hidden="true">
          <span className="hero__loaderBar">
            <span />
          </span>
          <span className="hero__loaderText">آماده‌سازی تجربه</span>
        </div>

        <div className="hero__scrollHint" aria-hidden="true">
          <span className="hero__scrollLine">
            <span />
          </span>
          <span className="hero__scrollText">اسکرول کنید</span>
        </div>
      </div>
    </section>
  );
}
