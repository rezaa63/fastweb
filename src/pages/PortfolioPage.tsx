import { CtaBand, PageHero } from "../components/PageHero";
import { pageMeta, PageMeta } from "../components/PageMeta";
import { PortfolioSection } from "../components/PortfolioSection";

export function PortfolioPage() {
  return (
    <>
      <PageMeta title={pageMeta.portfolio.title} description={pageMeta.portfolio.description} />
      <PageHero
        kicker="نمونه‌کارها"
        title={
          <>
            نمونه‌کارهای <span className="text-gold">FastWeb96</span>
          </>
        }
        lead="پروژه‌ها را بر اساس دسته‌بندی مرور کنید؛ روی هر تصویر بزنید تا گالری کامل باز شود."
        crumbs={[{ label: "نمونه‌کارها" }]}
      />
      <PortfolioSection variant="page" />
      <CtaBand />
    </>
  );
}
