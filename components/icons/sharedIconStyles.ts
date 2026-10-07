import type { Options } from "roughjs/bin/core";

/** Shared rough.js draw options for the hand-drawn RoughShape-based icon sets. */
export const ROUGH_ICON_OPTIONS: Options = {
  roughness: 0.5,
  bowing: 0.3,
  strokeWidth: 1.3,
  maxRandomnessOffset: 0.6,
  curveFitting: 0.98,
};

/** Icon sitting next to a RoughLink inside a `group`, tinted on link hover. */
export const ICON_LINK_CLASS =
  "size-5 shrink-0 text-black transition-colors duration-300 group-hover:text-accent-purple";
