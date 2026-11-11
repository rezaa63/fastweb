import { AboutSection } from "../components/AboutSection";
import { BenefitsGrid } from "../components/BenefitsGrid";
import { CarShowcase } from "../components/CarShowcase";
import { ContactSection } from "../components/ContactSection";
import { Hero } from "../components/Hero";
import { IntroSection } from "../components/IntroSection";
import { OrderForm } from "../components/OrderForm";
import { pageMeta, PageMeta } from "../components/PageMeta";
import { PortfolioSection } from "../components/PortfolioSection";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { ServicesSection } from "../components/ServicesSection";

export function HomePage() {
  return (
    <>
      <PageMeta title={pageMeta.home.title} description={pageMeta.home.description} />
      <Hero />
      <IntroSection />
      <ServicesSection />
      <CarShowcase />
      <PortfolioSection />
      <ProcessTimeline />
      <AboutSection />
      <BenefitsGrid />
      <OrderForm />
      <ContactSection />
    </>
  );
}
