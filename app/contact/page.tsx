import type { Metadata } from "next";

import RoughLink from "@/components/RoughLink";

export const metadata: Metadata = {
  title: "Contact | Mark Stanley",
  description: "Get in touch with Mark Stanley.",
};

export default function ContactPage() {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-10 px-6 py-6">
      <h1 className="text-center font-noto-serif text-5xl text-black">
        Contact
      </h1>
      <div className="flex w-full flex-col gap-2 font-caveat text-2xl text-black">
        <p>
          Always happy to talk shop! AI Safety, ML, philosophy, or anything
          you're interested in; I'm always trying to learn more!
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 font-caveat text-2xl text-black">
        <p>
          —{" "}
          <RoughLink href="https://calendly.com/markstanl">
            Coffee Chat
          </RoughLink>
        </p>
        <p>
          —{" "}
          <RoughLink href="mailto:markgstanley1@gmail.com">Email me</RoughLink>
        </p>
        <p>
          —{" "}
          <RoughLink href="https://www.linkedin.com/in/markstanl/">
            Connect on LinkedIn
          </RoughLink>
        </p>
      </div>
    </div>
  );
}
