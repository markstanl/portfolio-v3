"use client";

import { annotate } from "rough-notation";
import Link from "next/link";
import { type ReactNode, useEffect, useRef } from "react";

type RoughAnnotation = ReturnType<typeof annotate>;

type RoughLinkProps = {
  href: string;
  children: ReactNode;
  /**
   * "highlight" (default) is the original CTA treatment: a plain CSS
   * underline plus a rough-notation highlight sketched behind the text.
   * "underline" swaps the highlight for a rough-notation underline instead,
   * used for links inline in blog body copy.
   */
  type?: "highlight" | "underline";
  /**
   * "hover" (default) sketches the annotation in on first hover, or on
   * first scroll-into-view for touch devices. "mount" draws it immediately,
   * for links read inline as part of running text rather than discovered
   * by pointer interaction.
   */
  revealOn?: "hover" | "mount";
};

const BASE_LINK_CLASS =
  "relative cursor-pointer transition-colors duration-300 hover:text-accent-purple";
const HIGHLIGHT_LINK_CLASS = `${BASE_LINK_CLASS} underline decoration-1 underline-offset-4 decoration-black/40`;

const isExternalHref = (href: string) => /^https?:\/\/|^mailto:/i.test(href);

/**
 * Inline link with a hand-drawn (rough-notation/rough.js) annotation.
 * Renders a plain anchor for external/mailto hrefs and a Next `Link` for
 * internal ones.
 */
export default function RoughLink({
  href,
  children,
  type = "highlight",
  revealOn = "hover",
}: RoughLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const shownRef = useRef(false);
  const linkClass =
    type === "highlight" ? HIGHLIGHT_LINK_CLASS : BASE_LINK_CLASS;

  useEffect(() => {
    if (!ref.current) return;

    const annotation = annotate(ref.current, {
      type,
      color: "#d3a6ed",
      animationDuration: 350,
      multiline: true,
      padding: 2,
    });
    annotationRef.current = annotation;

    if (revealOn === "mount") {
      shownRef.current = true;
      annotation.show();
    }

    return () => annotation.remove();
  }, [type, revealOn]);

  useEffect(() => {
    if (revealOn === "mount") return;
    if (!ref.current) return;

    const isTouchDevice = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
    if (!isTouchDevice) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shownRef.current) {
          shownRef.current = true;
          annotationRef.current?.show();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [revealOn]);

  const handleMouseEnter = () => {
    if (revealOn === "mount") return;
    if (shownRef.current) return;
    shownRef.current = true;
    annotationRef.current?.show();
  };

  if (isExternalHref(href)) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={linkClass}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Link>
  );
}
