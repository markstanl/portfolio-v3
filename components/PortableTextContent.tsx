import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

/**
 * Tailwind's preflight strips default anchor styling, so link marks need an
 * explicit style or they read as plain text.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 font-noto-serif text-[20px] text-black">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = String(value?.href ?? "");
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-accent-purple underline underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return <PortableText value={value} components={components} />;
}
