import BlogList from "@/components/BlogList";
import { client } from "@/lib/sanity/client";
import { allPostsQuery } from "@/lib/sanity/queries";
import type { BloglistEntry } from "@/types/sanity";

const options = { next: { revalidate: 30 } };

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { tag } = await searchParams;
  const posts = await client.fetch<BloglistEntry[]>(allPostsQuery, {}, options);

  return (
    <BlogList
      title="Blog"
      subtitle="There is something for everyone here (hopefully)"
      posts={posts}
      initialTab={typeof tag === "string" ? tag : undefined}
    />
  );
}
