"use client";

import { annotate } from "rough-notation";
import { type ReactNode, useEffect, useRef } from "react";

type RoughAnnotation = ReturnType<typeof annotate>;

type RoughLinkProps = {
  href: string;
  children: ReactNode;
};

/**
 * Inline link with a hand-drawn (rough-notation/rough.js) highlight that
 * sketches in on first hover and stays shown.
 */
export default function RoughLink({ href, children }: RoughLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const annotation = annotate(ref.current, {
      type: "highlight",
      color: "#d3a6ed",
      animationDuration: 350,
      multiline: true,
    });
    annotationRef.current = annotation;

    return () => annotation.remove();
  }, []);

  const handleMouseEnter = () => {
    if (shownRef.current) return;
    shownRef.current = true;
    annotationRef.current?.show();
  };

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </a>
  );
}
