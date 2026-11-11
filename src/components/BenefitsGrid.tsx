import { benefits } from "../data/content";
import type { IconName } from "./Icon";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<string, IconName> = {
  custom: "pen",
  responsive: "grid",
  performance: "gauge",
  uiux: "sparkle",
  modern: "rocket",
  seo: "search",
  support: "headset",
  scalable: "layers",
};

export function BenefitsGrid() {
  return (
    <section className="section section--dark benefits" aria-labelledby="benefits-title">
      <div className="container">
        <div className="section-top">
          <SectionHeading
            id="benefits-title"
            kicker="چرا FastWeb96"
            title={
              <>
                مزیت‌هایی که در <span className="text-gold">نتیجه</span> دیده می‌شوند
              </>
            }
            lead="طراحی خوب فقط زیبا بودن نیست؛ سرعت، ساختار و تجربه‌ی کاربر هم بخشی از طراحی است."
          />
        </div>

        <ul className="benefits__grid">
          {benefits.map((benefit, index) => (
            <li key={benefit.id}>
              <Reveal delay={(index % 4) * 70} className="benefit">
                <span className="benefit__icon">
                  <Icon name={iconMap[benefit.id] ?? "sparkle"} size={20} />
                </span>
                <h3 className="benefit__title">{benefit.title}</h3>
                <p className="benefit__text">{benefit.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
