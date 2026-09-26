import type { Metadata } from "next";

import RoughLink from "@/components/RoughLink";

export const metadata: Metadata = {
  title: "Contact | Mark Stanley",
  description: "Get in touch with Mark Stanley.",
};

export default function ContactPage() {
  return (
    <div className="flex w-full max-w-[720px] flex-col items-center gap-[38px] px-6 py-[24px]">
      <h1 className="text-center font-noto-serif text-[48px] text-black">
        Contact
      </h1>
      <p className="w-full font-caveat text-[24px] text-black">
        The fastest way to reach me is <RoughLink href="#">email</RoughLink> —
        happy to talk AI safety research, collaboration, or anything else on
        here.
      </p>
    </div>
  );
}
