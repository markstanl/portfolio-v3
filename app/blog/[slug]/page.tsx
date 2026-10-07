import Image from "next/image";
import { notFound } from "next/navigation";

import PortableTextContent from "@/components/PortableTextContent";
import RoughLink from "@/components/RoughLink";
import { formatDate } from "@/lib/formatDate";
import { client, fetchOptions } from "@/lib/sanity/client";
import { postBySlugQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { BlogEntry } from "@/types/sanity";

export default async function ArticlePage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await client.fetch<BlogEntry | null>(
    postBySlugQuery,
    { slug },
    fetchOptions,
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="relative w-full overflow-hidden">
      {post.image && (
        <div className="pointer-events-none absolute right-0 top-0 hidden aspect-[4/3] w-[420px] opacity-55 [mask-image:radial-gradient(ellipse_farthest-side_at_top_right,black_35%,transparent_98%)] sm:block lg:w-[520px]">
          <Image
            src={urlFor(post.image)
              .width(1200)
              .height(900)
              .fit("crop")
              .auto("format")
              .url()}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-6 py-6">
        <div className="w-full font-caveat text-xl text-black">
          <RoughLink href="/blog">← Back to posts</RoughLink>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="w-full text-center font-cormorant text-4xl text-black sm:text-6xl">
            {post.title}
          </h1>
          <p className="w-full text-center font-cormorant text-2xl italic text-black">
            Mark Stanley - {formatDate(post.publishedAt)}
          </p>
          {post.image && post.imageCredit && (
            <p className="w-full text-right font-caveat text-sm text-black/50">
              {post.imageCredit}
            </p>
          )}
        </div>

        {post._type === "post" && (
          <div className="w-full">
            {post.foreword && (
              <>
                <p className="mb-1 font-cormorant text-xl italic text-black/50">
                  Foreword
                </p>
                <p className="mb-4 font-noto-serif text-xl italic text-black">
                  {post.foreword}
                </p>
                <p className="mb-1 font-cormorant text-xl italic text-black/50">
                  Body
                </p>
              </>
            )}
            <PortableTextContent value={post.body} />
          </div>
        )}

        {post._type === "musicType" && (
          <div className="w-full">
            {post.composer && (
              <p className="mb-4 font-noto-serif text-xl italic text-black">
                {post.composer}
              </p>
            )}
            {post.foreword && (
              <>
                <p className="mb-1 font-cormorant text-xl italic text-black/50">
                  Foreword
                </p>
                <p className="mb-4 font-noto-serif text-xl text-black">
                  {post.foreword}
                </p>
                <p className="mb-1 font-cormorant text-xl italic text-black/50">
                  Body
                </p>
              </>
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
              <p className="mb-6 font-noto-serif text-xl text-black">
                {post.abstract}
              </p>
            )}
            {post.link && (
              <div className="font-noto-serif text-xl text-black">
                <RoughLink href={post.link} type="underline" revealOn="mount">
                  Read <span className="italic">{post.title}</span>
                  {post.publishedIn ? ` on ${post.publishedIn}` : ""} →
                </RoughLink>
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
