import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "../lib/hooks";
import { cx } from "../lib/utils";

type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  /** تأخیر به میلی‌ثانیه برای ساخت افکت پله‌ای */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * نمایش نرم عنصر با ورود به دید کاربر — پایه‌ی همه‌ی انیمیشن‌های سایت.
 * با prefers-reduced-motion، محتوا بدون انیمیشن نمایش داده می‌شود.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={cx("reveal", `reveal--${variant}`, inView && "is-visible", className)}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
