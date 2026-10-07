"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    resolveInitialTab(initialTab),
  );
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);

  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(resolveInitialTab(initialTab));
  }

  const filteredPosts = useMemo(
    () =>
      activeTab === "All"
        ? posts
        : posts.filter((post) => post.tags?.includes(activeTab)),
    [posts, activeTab],
  );

  function handleTabClick(tab: Tab) {
    setActiveTab(tab);
    router.push(tab === "All" ? "/blog" : `/blog?tag=${tab}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3 font-caveat text-base text-black sm:gap-6 sm:text-xl">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabClick(tab)}
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

      <div className="flex w-full flex-col items-start gap-4">
        {filteredPosts.length === 0 ? (
          <p className="font-caveat text-xl text-black">
            Nothing here yet — check back soon.
          </p>
        ) : (
          filteredPosts.map((post) => <BlogCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}
