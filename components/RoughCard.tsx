import type { ReactNode } from "react";

import RoughShape, { type Shape } from "@/components/RoughShape";

type RoughCardProps = {
  /** viewBox width/height; the border is inset 4px on every side. */
  width: number;
  height: number;
  /** Extra classes on the outer (sizing) wrapper. */
  className?: string;
  /** Extra classes on the content wrapper sitting above the border. */
  contentClassName?: string;
  children: ReactNode;
};

const BORDER_OPTIONS = { roughness: 1.4, bowing: 0.6, strokeWidth: 2 };

/** Hand-sketched (rough.js) rectangle border wrapping arbitrary content. */
export default function RoughCard({
  width,
  height,
  className,
  contentClassName,
  children,
}: RoughCardProps) {
  const shapes: Shape[] = [
    {
      type: "rectangle",
      x: 4,
      y: 4,
      width: width - 8,
      height: height - 8,
      options: BORDER_OPTIONS,
    },
  ];

  return (
    <div className={["relative w-full", className].filter(Boolean).join(" ")}>
      <RoughShape
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full text-black/70"
        shapes={shapes}
      />
      <div
        className={["relative z-10", contentClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
