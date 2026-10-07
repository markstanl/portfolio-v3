import type { JSX, SVGProps } from "react";

import type { LinkIconKey } from "@/types/sanity";

export type IconProps = SVGProps<SVGSVGElement>;

function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.7 19c-4.3 1.3-4.3-2.2-6-2.7M12.7 21v-2.7c0-.8.3-1.5.7-2-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.2.8 2.4V21"
      />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x={3} y={3} width={18} height={18} rx={3} />
        <circle cx={7.2} cy={8} r={0.4} fill="currentColor" />
        <path d="M7.2 11v6M12 17v-3.5c0-2 3-2 3 0V17M12 13.5c0-2.2-3-2.2-3 0V17" />
      </g>
    </svg>
  );
}

function ScholarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3 9 9-5 9 5-9 5-9-5Zm4.5 2.4V16c0 1.7 2 3 4.5 3s4.5-1.3 4.5-3v-4.6"
      />
    </svg>
  );
}

function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={12} cy={12} r={9} />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" />
      </g>
    </svg>
  );
}

function DocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 3h7l4 4v14H7V3Zm7 0v4h4M9.5 12h5M9.5 15.5h5"
      />
    </svg>
  );
}

function CoffeeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 9h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Zm12 1h1.5a2.5 2.5 0 0 1 0 5H17"
      />
    </svg>
  );
}

function BlogIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2V4Z" />
        <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7V4Z" />
      </g>
    </svg>
  );
}

function ResumeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 2.5h5.5L14 6v7.3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
        <path d="M10.5 2.5V6H14" />
        <path d="M6.3 9h4.4M6.3 11.3h3" />
        <circle cx={17.2} cy={17.2} r={5.3} />
        <path d="M17.2 14.9v4.5M15.3 17.9l1.9 1.9 1.9-1.9" />
      </g>
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16v12H4V6Zm0 1 8 6 8-6"
      />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
        <rect x={3} y={3} width={18} height={18} rx={5} />
        <circle cx={12} cy={12} r={4} />
      </g>
      <circle cx={17.5} cy={6.5} r={1} fill="currentColor" />
    </svg>
  );
}

function LetterboxdIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g stroke="currentColor" strokeWidth={1.6}>
        <circle cx={7} cy={12} r={5} />
        <circle cx={12} cy={12} r={5} />
        <circle cx={17} cy={12} r={5} />
      </g>
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 6 6 6-6 6"
      />
    </svg>
  );
}

/** Icon components live in code; Sanity only stores which key to use. */
export const ICONS: Record<LinkIconKey, (props: IconProps) => JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  scholar: ScholarIcon,
  mail: MailIcon,
  globe: GlobeIcon,
  document: DocumentIcon,
  coffee: CoffeeIcon,
  instagram: InstagramIcon,
  letterboxd: LetterboxdIcon,
  blog: BlogIcon,
  resume: ResumeIcon,
};

export const SOCIAL_LABELS: Record<LinkIconKey, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  scholar: "Google Scholar",
  mail: "Email",
  globe: "Website",
  document: "Document",
  coffee: "Coffee Chat",
  instagram: "Instagram",
  letterboxd: "Letterboxd",
  blog: "Blog",
  resume: "Resume",
};
