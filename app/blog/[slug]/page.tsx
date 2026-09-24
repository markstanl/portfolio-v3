import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PortableTextContent from "@/components/PortableTextContent";
import { formatDate } from "@/lib/formatDate";
import { client } from "@/lib/sanity/client";
import { postBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { BlogEntry } from "@/types/sanity";

const options = { next: { revalidate: 30 } };

export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await client.fetch<BlogEntry | null>(
    postBySlugQuery,
    { slug },
    options,
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="relative w-full overflow-hidden">
      {post.image && (
        <div className="pointer-events-none absolute right-0 top-0 hidden h-[360px] w-[340px] opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_75%)] sm:block lg:w-[420px]">
          <Image
            src={urlFor(post.image).width(840).height(720).fit("crop").url()}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center gap-[38px] px-6 py-[24px]">
        <Link
          href="/blog"
          className="w-full font-caveat text-[20px] text-black"
        >
          ← Back to posts
        </Link>

        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="w-full text-center font-cormorant text-[40px] text-black sm:text-[64px]">
            {post.title}
          </h1>
          <p className="w-full text-center font-cormorant text-[24px] italic text-black">
            Mark Stanley - {formatDate(post.publishedAt)}
          </p>
          {post.image && post.imageCredit && (
            <p className="w-full text-right font-caveat text-[14px] text-black/50">
              {post.imageCredit}
            </p>
          )}
        </div>

        {post._type === "post" && (
          <div className="w-full">
            {post.foreword && (
              <p className="mb-4 font-noto-serif text-[20px] italic text-black">
                {post.foreword}
              </p>
            )}
            <PortableTextContent value={post.body} />
          </div>
        )}

        {post._type === "musicType" && (
          <div className="w-full">
            {post.composer && (
              <p className="mb-4 font-noto-serif text-[20px] italic text-black">
                {post.composer}
              </p>
            )}
            {post.foreword && (
              <p className="mb-4 font-noto-serif text-[20px] text-black">
                {post.foreword}
              </p>
            )}
            <PortableTextContent value={post.body} />
            {post.conductingVideoEmbed &&
              (post.conductingVideoEmbed.includes("google") ? (
                <iframe
                  src={post.conductingVideoEmbed}
                  className="mt-4 aspect-video w-full"
                  allow="autoplay"
                >
                  This video is not supported in your browser.
                </iframe>
              ) : (
                <video
                  src={post.conductingVideoEmbed}
                  controls
                  preload="metadata"
                  className="mt-4 aspect-video w-full"
                >
                  This video is not supported in your browser.
                </video>
              ))}
          </div>
        )}

        {post._type === "publishedPaper" && (
          <div className="w-full">
            {post.abstract && (
              <p className="mb-6 font-noto-serif text-[20px] text-black">
                {post.abstract}
              </p>
            )}
            {post.link && (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-noto-serif text-[20px] text-accent-purple underline underline-offset-2"
              >
                Read <span className="italic">{post.title}</span>
                {post.publishedIn ? ` on ${post.publishedIn}` : ""} →
              </a>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
