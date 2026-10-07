"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

/**
 * Renders the site Nav/Footer everywhere except standalone pages (e.g.
 * /links) that shouldn't carry the rest of the site's chrome.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname?.startsWith("/links");

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col items-center">{children}</main>
      <Footer />
    </>
  );
}
