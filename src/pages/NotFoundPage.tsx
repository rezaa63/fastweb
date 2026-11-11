import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";

export function NotFoundPage() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__code" dir="ltr">
          404
        </span>
        <h1 className="not-found__title">این صفحه پیدا نشد</h1>
        <p className="not-found__text">
          ممکن است آدرس تغییر کرده باشد. از منوی اصلی یا دکمه‌های زیر ادامه دهید.
        </p>
        <div className="not-found__actions">
          <Link className="btn btn--gold" to="/">
            بازگشت به خانه
            <Icon name="arrowLeftLong" size={18} />
          </Link>
          <Link className="btn btn--ghost" to="/portfolio">
            مشاهده نمونه‌کارها
          </Link>
        </div>
      </div>
    </section>
  );
}
