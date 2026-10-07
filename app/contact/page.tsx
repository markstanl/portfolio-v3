import type { Metadata } from "next";

import RoughCard from "@/components/RoughCard";
import RoughLink from "@/components/RoughLink";
import RoughShape, { type Shape } from "@/components/RoughShape";
import {
  ChatBubbleIcon,
  CoffeeCupIcon,
  EnvelopeIcon,
} from "@/components/icons/ContactIcons";
import { ICON_LINK_CLASS } from "@/components/icons/sharedIconStyles";

export const metadata: Metadata = {
  title: "Contact | Mark Stanley",
  description: "Get in touch with Mark Stanley.",
};

const HORIZONTAL_DIVIDER_SHAPES: Shape[] = [
  {
    type: "line",
    x1: 2,
    y1: 2,
    x2: 98,
    y2: 2,
    options: { roughness: 1, bowing: 1 },
  },
];

const VERTICAL_DIVIDER_SHAPES: Shape[] = [
  {
    type: "line",
    x1: 2,
    y1: 2,
    x2: 2,
    y2: 98,
    options: { roughness: 1, bowing: 1 },
  },
];

const STAMP_SHAPES: Shape[] = [
  {
    type: "rectangle",
    x: 4,
    y: 4,
    width: 48,
    height: 48,
    options: { roughness: 2.2, bowing: 1.4, strokeWidth: 1.8 },
  },
];

export default function ContactPage() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-6">
      <h1 className="text-center font-noto-serif text-5xl text-black">
        Contact
      </h1>

      <RoughCard
        width={400}
        height={260}
        contentClassName="flex flex-col md:flex-row"
      >
        <div className="flex flex-1 flex-col gap-4 p-6 font-caveat text-2xl text-black sm:p-8">
          <p>
            Always happy to talk shop! AI Safety, ML, philosophy, or anything
            you&apos;re interested in; I&apos;m always trying to learn more!
          </p>
          <p>Don&apos;t be a stranger!</p>
          <p className="self-end text-3xl font-bold text-accent-purple">
            — Mark
          </p>
        </div>

        <div className="block h-4 w-full md:hidden">
          <RoughShape
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
            className="size-full text-black/40"
            shapes={HORIZONTAL_DIVIDER_SHAPES}
          />
        </div>
        <div className="hidden md:block md:h-auto md:w-4">
          <RoughShape
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
            className="size-full text-black/40"
            shapes={VERTICAL_DIVIDER_SHAPES}
          />
        </div>

        <div className="flex flex-col gap-4 p-6 sm:p-8 md:w-56 md:shrink-0">
          <div className="relative size-14 self-end">
            <RoughShape
              viewBox="0 0 56 56"
              className="absolute inset-0 size-full text-accent-purple"
              shapes={STAMP_SHAPES}
            />
            <span className="absolute inset-0 flex items-center justify-center font-caveat text-lg font-bold text-accent-purple">
              MS
            </span>
          </div>

          <div className="flex flex-col gap-3 font-caveat text-2xl text-black">
            <div className="group flex items-center gap-2">
              <CoffeeCupIcon className={ICON_LINK_CLASS} />
              <RoughLink href="https://calendly.com/markstanl">
                Coffee Chat
              </RoughLink>
            </div>
            <div className="group flex items-center gap-2">
              <EnvelopeIcon className={ICON_LINK_CLASS} />
              <RoughLink href="mailto:markgstanley1@gmail.com">
                Email me
              </RoughLink>
            </div>
            <div className="group flex items-center gap-2">
              <ChatBubbleIcon className={ICON_LINK_CLASS} />
              <RoughLink href="https://www.linkedin.com/in/markstanl/">
                LinkedIn
              </RoughLink>
            </div>
          </div>
        </div>
      </RoughCard>
    </div>
  );
}
