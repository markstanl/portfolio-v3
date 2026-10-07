import type { MetadataRoute } from "next";

import { client } from "@/lib/sanity/client";
import { BLOG_TYPES } from "@/lib/sanity/queries";
import { SITE_URL } from "@/lib/site";

const SITEMAP_QUERY = `*[(${BLOG_TYPES}) && defined(slug.current)]{"slug": slug.current, _updatedAt}`;

type SitemapEntry = {
  slug: string;
  _updatedAt: string;
};

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch<SitemapEntry[]>(
    SITEMAP_QUERY,
    {},
    { next: { revalidate } },
  );

  // the blog index changes whenever any post does
  const blogLastModified = posts.reduce<string | undefined>(
    (latest, post) =>
      !latest || post._updatedAt > latest ? post._updatedAt : latest,
    undefined,
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogLastModified ? new Date(blogLastModified) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
