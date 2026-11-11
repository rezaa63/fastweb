import { AboutSection } from "../components/AboutSection";
import { BenefitsGrid } from "../components/BenefitsGrid";
import { CtaBand, PageHero } from "../components/PageHero";
import { pageMeta, PageMeta } from "../components/PageMeta";
import { ProcessTimeline } from "../components/ProcessTimeline";

export function AboutPage() {
  return (
    <>
      <PageMeta title={pageMeta.about.title} description={pageMeta.about.description} />
      <PageHero
        kicker="درباره ما"
        title={
          <>
            یک استودیو کوچک، با <span className="text-gold">استانداردهای بالا</span>
          </>
        }
        lead="FastWeb96 توسط رضا اکبری اداره می‌شود؛ طراح و توسعه‌دهنده‌ای که هر پروژه را از گفت‌وگو درباره‌ی کسب‌وکار شروع می‌کند."
        crumbs={[{ label: "درباره ما" }]}
      />
      <AboutSection showHeading={false} />
      <BenefitsGrid />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
