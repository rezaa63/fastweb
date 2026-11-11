import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
}

const setMeta = (name: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setOg = (property: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

/** عنوان و توضیحات هر صفحه برای SEO */
export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setOg("og:title", title);
    setOg("og:description", description);
  }, [title, description]);

  return null;
}

export const pageMeta = {
  home: {
    title: "FastWeb96 | طراحی سایت حرفه‌ای و مدرن",
    description:
      "FastWeb96 | طراحی سایت حرفه‌ای برای املاک، نمایشگاه خودرو، سالن زیبایی، دکوراسیون، محصولات بهداشتی و کافه با طراحی مدرن و اختصاصی.",
  },
  services: {
    title: "خدمات | FastWeb96 — طراحی سایت اختصاصی",
    description:
      "خدمات FastWeb96: طراحی سایت املاک، نمایشگاه خودرو، سالن زیبایی، دکوراسیون، فروشگاه محصولات بهداشتی و کافه با طراحی اختصاصی و مدرن.",
  },
  portfolio: {
    title: "نمونه‌کارها | FastWeb96",
    description:
      "نمونه‌کارهای FastWeb96 در حوزه‌های املاک، خودرو، زیبایی، دکوراسیون، محصولات بهداشتی و کافه — گالری کامل پروژه‌های طراحی سایت.",
  },
  about: {
    title: "درباره ما | FastWeb96 — رضا اکبری",
    description:
      "FastWeb96 مجموعه‌ی طراحی و توسعه وب رضا اکبری است؛ با تمرکز بر طراحی مدرن، تجربه کاربری و هویت بصری برای کسب‌وکارهای مختلف.",
  },
  order: {
    title: "ثبت سفارش | FastWeb96",
    description:
      "فرم ثبت سفارش طراحی سایت FastWeb96 — نام، شماره تماس، نوع کسب‌وکار، نوع سایت، بودجه و توضیحات پروژه را ثبت کنید تا کارشناسان با شما تماس بگیرند.",
  },
  contact: {
    title: "تماس با ما | FastWeb96",
    description:
      "با FastWeb96 در ارتباط باشید — شماره تماس، ایمیل، شبکه‌های اجتماعی و فرم تماس مستقیم با رضا اکبری.",
  },
} as const;
