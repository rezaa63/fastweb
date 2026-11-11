import { CtaBand, PageHero } from "../components/PageHero";
import { pageMeta, PageMeta } from "../components/PageMeta";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { ServicesSection } from "../components/ServicesSection";

export function ServicesPage() {
  return (
    <>
      <PageMeta title={pageMeta.services.title} description={pageMeta.services.description} />
      <PageHero
        kicker="خدمات"
        title={
          <>
            خدمات طراحی و توسعه وب <span className="text-gold">FastWeb96</span>
          </>
        }
        lead="از طراحی رابط کاربری تا اجرای فنی و انتشار روی دامنه‌ی اختصاصی؛ همه‌ی مراحل در یک مسیر شفاف."
        crumbs={[{ label: "خدمات" }]}
      />
      <ServicesSection variant="page" />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
