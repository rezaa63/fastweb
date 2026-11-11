import { OrderForm } from "../components/OrderForm";
import { PageHero } from "../components/PageHero";
import { pageMeta, PageMeta } from "../components/PageMeta";

export function OrderPage() {
  return (
    <>
      <PageMeta title={pageMeta.order.title} description={pageMeta.order.description} />
      <PageHero
        kicker="ثبت سفارش"
        title={
          <>
            شروع پروژه <span className="text-gold">جدید</span>
          </>
        }
        lead="اطلاعات پروژه را ثبت کنید تا در اولین فرصت با شما تماس بگیریم."
        crumbs={[{ label: "ثبت سفارش" }]}
      />
      <OrderForm />
    </>
  );
}
