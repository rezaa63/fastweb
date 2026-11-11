import type { ReactNode } from "react";
import { cx } from "../lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "start",
  tone = "dark",
  className,
  id,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "section-heading",
        `section-heading--${align}`,
        `section-heading--${tone}`,
        className,
      )}
    >
      {kicker ? (
        <Reveal variant="fade" className="section-heading__kicker">
          <span className="kicker-line" aria-hidden="true" />
          <span>{kicker}</span>
        </Reveal>
      ) : null}

      <Reveal delay={60}>
        <Heading id={id} className="section-heading__title">
          {title}
        </Heading>
      </Reveal>

      {lead ? (
        <Reveal delay={120}>
          <p className="section-heading__lead">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
