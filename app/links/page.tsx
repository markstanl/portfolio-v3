import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import {
  ChevronRightIcon,
  ICONS,
  SOCIAL_LABELS,
} from "@/components/icons/LinkIcons";
import { client, fetchOptions } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { linksPageQuery } from "@/lib/sanity/queries";
import type { LinkIconKey, LinksPage as LinksPageData } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Links | Mark Stanley",
  description: "Mark Stanley's links.",
};

function isMailto(href: string) {
  return href.startsWith("mailto:");
}

export default async function LinksPage() {
  const page = await client.fetch<LinksPageData | null>(
    linksPageQuery,
    {},
    fetchOptions,
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
          <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-accent-purple shadow-md ring-4 ring-white">
            {page.avatarImage ? (
              <Image
                src={urlFor(page.avatarImage)
                  .width(160)
                  .height(160)
                  .fit("crop")
                  .url()}
                alt={page.name}
                width={80}
                height={80}
                className="size-full object-cover"
              />
            ) : (
              <span className="font-noto-serif text-2xl font-bold text-cream">
                {page.avatarInitials}
              </span>
            )}
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
                const Icon = ICONS[platform as LinkIconKey] ?? ICONS.globe;
                return (
                  <a
                    key={platform + url}
                    href={url}
                    target={isMailto(url) ? undefined : "_blank"}
                    rel={isMailto(url) ? undefined : "noopener noreferrer"}
                    aria-label={
                      SOCIAL_LABELS[platform as LinkIconKey] ?? platform
                    }
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
          {links.map(({ label, url, iconType, icon, image }) => {
            const Icon =
              iconType === "icon"
                ? (ICONS[icon as LinkIconKey] ?? ICONS.globe)
                : null;
            const imageUrl =
              iconType === "image" && image
                ? urlFor(image).width(72).height(72).fit("crop").url()
                : null;
            return (
              <a
                key={label + url}
                href={url}
                target={isMailto(url) ? undefined : "_blank"}
                rel={isMailto(url) ? undefined : "noopener noreferrer"}
                className="group flex w-full items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-purple/30 hover:shadow-md active:translate-y-0 active:shadow-sm"
              >
                {Icon && (
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-purple/10 text-accent-purple">
                    <Icon className="size-[18px]" />
                  </span>
                )}
                {imageUrl && (
                  <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-purple/10">
                    <Image
                      src={imageUrl}
                      alt=""
                      width={36}
                      height={36}
                      className="size-full object-cover"
                    />
                  </span>
                )}
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
