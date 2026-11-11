import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * مدیریت اسکرول هنگام تغییر مسیر:
 * - صفحه‌ی جدید از بالا باز می‌شود
 * - اگر آدرس شامل hash باشد، به همان بخش اسکرول می‌شود
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace("#", ""));
      if (target) {
        window.requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
