import RoughShape, { type Shape } from "@/components/RoughShape";

type IconProps = {
  className?: string;
};

const ICON_OPTIONS = {
  roughness: 0.5,
  bowing: 0.3,
  strokeWidth: 1.3,
  maxRandomnessOffset: 0.6,
  curveFitting: 0.98,
};

const ENVELOPE_SHAPES: Shape[] = [
  {
    type: "rectangle",
    x: 3,
    y: 5,
    width: 18,
    height: 14,
    options: ICON_OPTIONS,
  },
  { type: "path", d: "M4 7l8 6 8-6", options: ICON_OPTIONS },
];

export function EnvelopeIcon({ className }: IconProps) {
  return (
    <RoughShape
      viewBox="0 0 24 24"
      shapes={ENVELOPE_SHAPES}
      className={className}
    />
  );
}

const COFFEE_CUP_SHAPES: Shape[] = [
  {
    type: "path",
    d: "M5 9h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z",
    options: ICON_OPTIONS,
  },
  { type: "path", d: "M17 10h1.5a2.5 2.5 0 0 1 0 5H17", options: ICON_OPTIONS },
  { type: "path", d: "M8 6c-1 1-1 2 0 3", options: ICON_OPTIONS },
  { type: "path", d: "M12 6c-1 1-1 2 0 3", options: ICON_OPTIONS },
];

export function CoffeeCupIcon({ className }: IconProps) {
  return (
    <RoughShape
      viewBox="0 0 24 24"
      shapes={COFFEE_CUP_SHAPES}
      className={className}
    />
  );
}

const CHAT_BUBBLE_SHAPES: Shape[] = [
  { type: "path", d: "M4 6h16v10H9l-4 4v-4H4Z", options: ICON_OPTIONS },
  { type: "path", d: "M8 10h8", options: ICON_OPTIONS },
  { type: "path", d: "M8 13h5", options: ICON_OPTIONS },
];

export function ChatBubbleIcon({ className }: IconProps) {
  return (
    <RoughShape
      viewBox="0 0 24 24"
      shapes={CHAT_BUBBLE_SHAPES}
      className={className}
    />
  );
}
