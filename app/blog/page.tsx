import BlogList from "@/components/BlogList";
import { client, fetchOptions } from "@/lib/sanity/client";
import { allPostsQuery } from "@/lib/sanity/queries";
import type { BloglistEntry } from "@/types/sanity";

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { tag } = await searchParams;
  const posts = await client.fetch<BloglistEntry[]>(
    allPostsQuery,
    {},
    fetchOptions,
  );

  return (
    <BlogList
      title="Blog"
      subtitle="There is something for everyone here (hopefully)"
      posts={posts}
      initialTab={typeof tag === "string" ? tag : undefined}
    />
  );
}
