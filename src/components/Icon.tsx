import type { SVGProps } from "react";

const paths = {
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </>
  ),
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  arrowLeftLong: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h2.2l1.6 4-2 1.4a12 12 0 006.8 6.8l1.4-2 4 1.6v2.2a2.2 2.2 0 01-2.4 2.2A16.5 16.5 0 014.3 5.9 2.2 2.2 0 016.5 3.5z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  sparkle: (
    <>
      <path d="M12 3.5l1.9 4.6 4.6 1.9-4.6 1.9L12 16.5l-1.9-4.6L5.5 10l4.6-1.9z" />
      <path d="M18.5 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" />
    </>
  ),
  expand: (
    <>
      <path d="M9 4H4v5" />
      <path d="M15 20h5v-5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5l8.5 4.6L12 12.7 3.5 8.1z" />
      <path d="M3.5 12.6L12 17.2l8.5-4.6" />
      <path d="M3.5 16.6L12 21.2l8.5-4.6" />
    </>
  ),
  code: (
    <>
      <path d="M9 8l-4 4 4 4" />
      <path d="M15 8l4 4-4 4" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 17a8.5 8.5 0 1115 0" />
      <path d="M12 13.5l3.2-3.2" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4.2L16.6 4.2a2 2 0 012.9 0l.3.3a2 2 0 010 2.9L8.2 19z" />
      <path d="M14.8 6.2l3 3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </>
  ),
  headset: (
    <>
      <path d="M4.5 15v-3a7.5 7.5 0 0115 0v3" />
      <path d="M4.5 14.5h2.2a1 1 0 011 1v3a1 1 0 01-1 1H5.7a1.2 1.2 0 01-1.2-1.2z" />
      <path d="M19.5 14.5h-2.2a1 1 0 00-1 1v3a1 1 0 001 1h1a1.2 1.2 0 001.2-1.2z" />
    </>
  ),
  rocket: (
    <>
      <path d="M13 4.5c3.6 1 6.5 3.9 7.5 7.5-3.6 1-6.5.5-9-2s-3-5.4-2-9z" />
      <path d="M9.5 11.5L5 16v3h3l4.5-4.5" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  telegram: <path d="M20.5 5.2l-2.6 13.2c-.2.9-.8 1.1-1.5.7l-4-2.9-1.9 1.8c-.2.2-.4.4-.8.4l.3-4 7.3-6.6c.3-.3 0-.5-.5-.2L7.9 12.4l-3.9-1.2c-.8-.3-.9-.9.2-1.3l15-5.8c.7-.3 1.4.1 1.3 1.1z" />,
  bale: (
    <>
      <path d="M20 11.2c0 3.7-3.6 6.6-8 6.6-.9 0-1.8-.1-2.6-.3L5 20l1.2-3.4A6.3 6.3 0 014 11.2C4 7.5 7.6 4.6 12 4.6s8 2.9 8 6.6z" />
      <path d="M8.6 10.6c1.1 1 2.2 1.4 3.4 1.4s2.3-.4 3.4-1.4" />
    </>
  ),
  eitaa: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M15.6 9.4a4.4 4.4 0 100 5.2" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  rubika: (
    <>
      <path d="M12 3.6l7.3 4.3v8.2L12 20.4 4.7 16.1V7.9z" />
      <path d="M9.7 15.6V8.6h2.8a2.4 2.4 0 010 4.8H9.7" />
      <path d="M12.5 13.4l2.3 2.2" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3.4" />
      <path d="M8.2 10.4v5.4" />
      <circle cx="8.2" cy="8.1" r="0.85" fill="currentColor" stroke="none" />
      <path d="M11.6 15.8v-3.1a2 2 0 014 0v3.1" />
      <path d="M11.6 10.6v5.2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20 11.6a8 8 0 01-11.8 7L4 20l1.4-4A8 8 0 1120 11.6z" />
      <path d="M9 9.6c.4 2.2 2 3.8 4.2 4.2l.9-1.1 1.7.6v1.2a1 1 0 01-1.1 1A6.6 6.6 0 0110.4 8.6a1 1 0 011-1h1.2l.6 1.7z" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
