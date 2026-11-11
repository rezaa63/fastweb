import { useScrollY } from "../lib/hooks";
import { cx, scrollToTop } from "../lib/utils";
import { Icon } from "./Icon";

/**
 * دکمه‌ی شناور بازگشت به ابتدای صفحه.
 * تا اسکرول نکرده‌ایم پنهان است، سپس ظاهر می‌شود و در فوتر هم دیده می‌شود.
 */
export function ScrollTopButton() {
  const scrollY = useScrollY();
  const visible = scrollY > 360;

  return (
    <button
      type="button"
      className={cx("scroll-top", visible && "is-visible")}
      onClick={scrollToTop}
      aria-label="بازگشت به ابتدای صفحه"
      title="بازگشت به ابتدای صفحه"
      tabIndex={visible ? 0 : -1}
    >
      <span className="scroll-top__ring" aria-hidden="true" />
      <Icon name="arrowUp" size={20} />
    </button>
  );
}
