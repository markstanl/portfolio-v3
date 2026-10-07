import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { JSX, SVGProps } from "react";

import { client } from "@/lib/sanity/client";
import { linksPageQuery } from "@/lib/sanity/queries";
import type { LinkIconKey, LinksPage as LinksPageData } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Links | Mark Stanley",
  description: "Mark Stanley's links.",
};

const options = { next: { revalidate: 30 } };

type IconProps = SVGProps<SVGSVGElement>;

function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 21v-2.7c0-.8.3-1.5.7-2-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.2.8 2.4V21"
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
        <path d="M7.2 11v6M12 17v-3.5c0-2 3-2 3 0V17M12 13.5c0-2.2-3-2.2-3 0" />
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

function ChevronRightIcon(props: IconProps) {
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
const ICONS: Record<LinkIconKey, (props: IconProps) => JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  scholar: ScholarIcon,
  mail: MailIcon,
  globe: GlobeIcon,
  document: DocumentIcon,
  coffee: CoffeeIcon,
};

const SOCIAL_LABELS: Record<LinkIconKey, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  scholar: "Google Scholar",
  mail: "Email",
  globe: "Website",
  document: "Document",
  coffee: "Coffee Chat",
};

function isMailto(href: string) {
  return href.startsWith("mailto:");
}

export default async function LinksPage() {
  const page = await client.fetch<LinksPageData | null>(
    linksPageQuery,
    {},
    options,
  );

  if (!page) {
    notFound();
  }

  const socials = page.socials ?? [];
  const links = page.links ?? [];

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-cream px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-accent-purple/10 blur-3xl"
      />

      <div className="relative flex w-full max-w-xs flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-20 items-center justify-center rounded-full bg-accent-purple shadow-md ring-4 ring-white">
            <span className="font-noto-serif text-2xl font-bold text-cream">
              {page.avatarInitials}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h1 className="font-noto-serif text-2xl font-semibold tracking-tight text-black">
              {page.name}
            </h1>
            {page.taglines && page.taglines.length > 0 && (
              <div className="flex flex-col items-center gap-0.5">
                {page.taglines.map((line) => (
                  <p
                    key={line}
                    className="text-center text-sm font-medium text-black/55"
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          {socials.length > 0 && (
            <div className="flex items-center gap-3 pt-1">
              {socials.map(({ platform, url }) => {
                const Icon = ICONS[platform] ?? GlobeIcon;
                return (
                  <a
                    key={platform + url}
                    href={url}
                    target={isMailto(url) ? undefined : "_blank"}
                    rel={isMailto(url) ? undefined : "noopener noreferrer"}
                    aria-label={SOCIAL_LABELS[platform] ?? platform}
                    className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 shadow-sm transition-colors duration-200 hover:border-accent-purple/40 hover:text-accent-purple"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <nav className="flex w-full flex-col gap-3">
          {links.map(({ label, url, icon }) => {
            const Icon = ICONS[icon] ?? GlobeIcon;
            return (
              <a
                key={label + url}
                href={url}
                target={isMailto(url) ? undefined : "_blank"}
                rel={isMailto(url) ? undefined : "noopener noreferrer"}
                className="group flex w-full items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-purple/30 hover:shadow-md active:translate-y-0 active:shadow-sm"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple">
                  <Icon className="size-[18px]" />
                </span>
                <span className="flex-1 text-left text-[15px] font-semibold text-black">
                  {label}
                </span>
                <ChevronRightIcon className="size-4 shrink-0 text-black/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent-purple/60" />
              </a>
            );
          })}
        </nav>

        <p className="text-xs font-medium text-black/35">
          &copy; {new Date().getFullYear()} {page.name}
        </p>
      </div>
    </div>
  );
}
