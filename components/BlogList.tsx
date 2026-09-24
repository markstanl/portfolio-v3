import BlogTabs from "@/components/BlogTabs";
import type { BloglistEntry } from "@/types/sanity";

type BlogListProps = {
  title: string;
  subtitle: string;
  posts: BloglistEntry[];
  initialTab?: string;
};

export default function BlogList({
  title,
  subtitle,
  posts,
  initialTab,
}: BlogListProps) {
  return (
    <div className="flex w-full max-w-[1076px] flex-col items-center gap-[38px] px-6 py-[24px]">
      <h1 className="text-center font-noto-serif text-[48px] text-black">
        {title}
      </h1>
      <p className="w-full font-caveat text-[24px] text-black">{subtitle}</p>
      <BlogTabs posts={posts} initialTab={initialTab} />
    </div>
  );
}
