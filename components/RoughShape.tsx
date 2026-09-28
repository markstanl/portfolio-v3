"use client";

import rough from "roughjs";
import type { Options } from "roughjs/bin/core";
import { useEffect, useRef } from "react";

export type Shape =
  | {
      type: "rectangle";
      x: number;
      y: number;
      width: number;
      height: number;
      options?: Options;
    }
  | {
      type: "line";
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      options?: Options;
    }
  | { type: "path"; d: string; options?: Options }
  | {
      type: "circle";
      x: number;
      y: number;
      diameter: number;
      options?: Options;
    };

type RoughShapeProps = {
  viewBox: string;
  shapes: readonly Shape[];
  className?: string;
  preserveAspectRatio?: string;
};

const DEFAULT_OPTIONS: Options = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  roughness: 1.2,
  bowing: 0.8,
};

/**
 * Renders hand-sketched (rough.js) primitives into an SVG. `stroke` defaults
 * to "currentColor" so color follows the wrapping element's text color,
 * including on hover.
 */
export default function RoughShape({
  viewBox,
  shapes,
  className,
  preserveAspectRatio,
}: RoughShapeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rc = rough.svg(svg);
    const nodes = shapes.map((shape) => {
      const options = { ...DEFAULT_OPTIONS, ...shape.options };
      switch (shape.type) {
        case "rectangle":
          return rc.rectangle(
            shape.x,
            shape.y,
            shape.width,
            shape.height,
            options,
          );
        case "line":
          return rc.line(shape.x1, shape.y1, shape.x2, shape.y2, options);
        case "path":
          return rc.path(shape.d, options);
        case "circle":
          return rc.circle(shape.x, shape.y, shape.diameter, options);
      }
    });

    for (const node of nodes) svg.appendChild(node);
    return () => {
      for (const node of nodes) svg.removeChild(node);
    };
  }, [shapes]);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
    />
  );
}
