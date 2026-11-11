import { processSteps } from "../data/content";
import { useScrollProgress } from "../lib/hooks";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * تایم‌لاین مراحل همکاری — خط طلایی با اسکرول پر می‌شود و هر مرحله با ورود
 * به دید کاربر ظاهر می‌شود (Scroll Animation).
 */
export function ProcessTimeline() {
  const trackRef = useScrollProgress<HTMLDivElement>();

  return (
    <section
      className="section section--cream process"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="container">
        <div className="section-top">
          <SectionHeading
            id="process-title"
            tone="light"
            kicker="فرآیند همکاری"
            title={
              <>
                مسیر شش‌مرحله‌ای تا <span className="process__accent">تحویل سایت</span>
              </>
            }
            lead="از اولین گفت‌وگو تا پشتیبانی بعد از تحویل، هر مرحله شفاف و قابل پیگیری است."
          />
        </div>

        <div className="timeline" ref={trackRef}>
          <span className="timeline__rail" aria-hidden="true">
            <span className="timeline__railFill" />
          </span>

          <ol className="timeline__list">
            {processSteps.map((step, index) => (
              <li className="timeline__item" key={step.number}>
                <Reveal variant="up" delay={index * 60} className="timeline__inner">
                  <span className="timeline__dot" aria-hidden="true" />
                  <span className="timeline__number" dir="ltr">
                    {step.number}
                  </span>
                  <div className="timeline__content">
                    <h3 className="timeline__title">{step.title}</h3>
                    <p className="timeline__text">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
