import { ContactSection } from "../components/ContactSection";
import { PageHero } from "../components/PageHero";
import { pageMeta, PageMeta } from "../components/PageMeta";

export function ContactPage() {
  return (
    <>
      <PageMeta title={pageMeta.contact.title} description={pageMeta.contact.description} />
      <PageHero
        kicker="تماس با ما"
        title={
          <>
            با <span dir="ltr" className="text-gold">FastWeb96</span> در ارتباط باشید
          </>
        }
        lead="برای شروع پروژه یا هر پرسشی، از راه‌های ارتباطی زیر یا فرم پیام سریع استفاده کنید."
        crumbs={[{ label: "تماس با ما" }]}
      />
      <ContactSection />
    </>
  );
}
