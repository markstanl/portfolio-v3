import Image from "next/image";
import Link from "next/link";

import { formatDate, formatShortDate } from "@/lib/formatDate";
import { urlFor } from "@/lib/sanity/image";
import type { BloglistEntry } from "@/types/sanity";

export default function BlogCard({ post }: { post: BloglistEntry }) {
  const imageUrl = post.image
    ? urlFor(post.image).width(600).height(340).fit("crop").url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="flex w-full flex-col items-start gap-4 rounded-lg bg-footer p-4 sm:p-6 md:flex-row md:items-center md:gap-6"
    >
      <div className="flex w-full flex-col items-start gap-3 md:flex-1">
        <h3 className="font-noto-serif text-[24px] text-black">{post.title}</h3>
        {post.excerpt && (
          <p className="font-caveat text-[16px] text-black">{post.excerpt}</p>
        )}
        <p
          className="font-noto-serif text-[16px] text-black/60"
          title={formatDate(post.publishedAt)}
        >
          {formatShortDate(post.publishedAt)}
        </p>
      </div>
      <div className="relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-placeholder-purple md:w-2/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-10 text-white/70"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="8.5" cy="9.5" r="1.5" />
              <path d="M21 15l-5-5L5 20" />
            </g>
          </svg>
        )}
      </div>
    </Link>
  );
}
