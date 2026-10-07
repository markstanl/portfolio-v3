import type { JSX, SVGProps } from "react";

import { Coffee, FileUser, Globe, Newspaper } from "lucide-react";
import {
  siGithub,
  siGooglescholar,
  siInstagram,
  siLetterboxd,
} from "simple-icons";

import type { LinkIconKey } from "@/types/sanity";

export type IconProps = SVGProps<SVGSVGElement>;

function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={siGithub.path} />
    </svg>
  );
}

// simple-icons has no LinkedIn mark (removed at LinkedIn's request), so this
// uses Font Awesome Free's "in" glyph instead (viewBox 0 0 448 512, CC BY 4.0).
function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}

function ScholarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={siGooglescholar.path} />
    </svg>
  );
}

function GlobeIcon(props: IconProps) {
  return <Globe strokeWidth={1.6} {...props} />;
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
  return <Coffee strokeWidth={1.6} {...props} />;
}

function BlogIcon(props: IconProps) {
  return <Newspaper strokeWidth={1.6} {...props} />;
}

function ResumeIcon(props: IconProps) {
  return <FileUser strokeWidth={1.6} {...props} />;
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
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={siInstagram.path} />
    </svg>
  );
}

function LetterboxdIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={siLetterboxd.path} />
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
