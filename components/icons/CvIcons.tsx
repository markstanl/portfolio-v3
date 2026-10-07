import RoughShape, { type Shape } from "@/components/RoughShape";
import { ROUGH_ICON_OPTIONS } from "@/components/icons/sharedIconStyles";

type IconProps = {
  className?: string;
};

const DOWNLOAD_SHAPES: Shape[] = [
  { type: "path", d: "M12 4v10", options: ROUGH_ICON_OPTIONS },
  { type: "path", d: "M8 11l4 4 4-4", options: ROUGH_ICON_OPTIONS },
  { type: "path", d: "M5 19h14", options: ROUGH_ICON_OPTIONS },
];

export function DownloadIcon({ className }: IconProps) {
  return (
    <RoughShape
      viewBox="0 0 24 24"
      shapes={DOWNLOAD_SHAPES}
      className={className}
    />
  );
}
