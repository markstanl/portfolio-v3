"use client";

import { useMemo, useState } from "react";

import BlogCard from "@/components/BlogCard";
import type { BloglistEntry } from "@/types/sanity";

/** Coarse tabs inferred from the existing tags vocabulary — a post can match more than one. */
const TAB_TAGS = ["Research", "Philosophy", "AI", "Music"] as const;
const TABS = ["All", ...TAB_TAGS] as const;
type Tab = (typeof TABS)[number];

type BlogTabsProps = {
  posts: BloglistEntry[];
  initialTab?: string;
};

function resolveInitialTab(initialTab?: string): Tab {
  const match = TABS.find(
    (tab) => tab.toLowerCase() === initialTab?.toLowerCase(),
  );
  return match ?? "All";
}

export default function BlogTabs({ posts, initialTab }: BlogTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    resolveInitialTab(initialTab),
  );

  const filteredPosts = useMemo(
    () =>
      activeTab === "All"
        ? posts
        : posts.filter((post) => post.tags?.includes(activeTab)),
    [posts, activeTab],
  );

  return (
    <div className="flex w-full flex-col items-center gap-[24px]">
      <div className="flex flex-wrap items-center justify-center gap-[24px] font-caveat text-[20px] text-black">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={
              tab === activeTab
                ? "cursor-pointer underline decoration-2 underline-offset-4"
                : "cursor-pointer text-black/60 transition-colors hover:text-black"
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col items-start gap-[16px]">
        {filteredPosts.length === 0 ? (
          <p className="font-caveat text-[20px] text-black">
            Nothing here yet — check back soon.
          </p>
        ) : (
          filteredPosts.map((post) => <BlogCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}
