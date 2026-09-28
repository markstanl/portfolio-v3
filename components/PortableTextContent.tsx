import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

import RoughLink from "@/components/RoughLink";

/** A run of plain paragraphs (no real Sanity list) authored as "1) ...", "2) ...", "∴) ..." — grouped and boxed like a real list argument. */
type ProseArgumentBlock = {
  _type: "proseArgument";
  _key: string;
  items: PortableTextBlock[];
};

const linkMark = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: { href?: string };
}) => (
  <RoughLink href={String(value?.href ?? "")} type="underline" revealOn="mount">
    {children}
  </RoughLink>
);

/**
 * Tailwind's preflight strips default anchor styling, so link marks need an
 * explicit style or they read as plain text.
 *
 * Numbered/bulleted lists (used for philosophical arguments — premises with
 * an author-written "C." / "C*" / "∴" conclusion) share the body's type
 * size, and only add indentation, so they read as arguments rather than
 * differently-styled text. The same premise/conclusion pattern is also
 * detected when an author typed it as plain paragraphs ("1)", "2)", "∴)")
 * instead of a real Sanity list — see groupProseArguments.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => (
      <p
        className={
          value?.listItem
            ? "font-noto-serif text-xl text-black"
            : "mb-4 indent-8 font-noto-serif text-xl text-black"
        }
      >
        {children}
      </p>
    ),
  },
  list: {
    number: ({ children }) => (
      <div className="mb-4 rounded-lg border border-black/15 px-5 py-4">
        <ol className="ml-6 list-decimal space-y-2 font-noto-serif text-xl text-black marker:text-black/60">
          {children}
        </ol>
      </div>
    ),
    bullet: ({ children }) => (
      <div className="mb-4 rounded-lg border border-black/15 px-5 py-4">
        <ul className="ml-6 list-disc space-y-2 font-noto-serif text-xl text-black marker:text-black/60">
          {children}
        </ul>
      </div>
    ),
  },
  listItem: {
    number: ({ children, value }) => (
      <li
        className={isConclusionBlock(value) ? conclusionItemClassName : "pl-1"}
      >
        {children}
      </li>
    ),
    bullet: ({ children, value }) => (
      <li
        className={isConclusionBlock(value) ? conclusionItemClassName : "pl-1"}
      >
        {children}
      </li>
    ),
  },
  types: {
    proseArgument: ({ value }: { value: ProseArgumentBlock }) => (
      <div className="mb-4 rounded-lg border border-black/15 px-5 py-4">
        <div className="space-y-2">
          {value.items.map((item, index) => (
            <div
              key={item._key ?? index}
              className={
                index === value.items.length - 1
                  ? conclusionItemClassName
                  : "pl-1"
              }
            >
              <PortableText value={item} components={argumentLineComponents} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  marks: {
    link: linkMark,
  },
};

/** Renders a single grouped prose-argument line without the standalone paragraph's indent/margin. */
const argumentLineComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-noto-serif text-xl text-black">{children}</p>
    ),
  },
  marks: {
    link: linkMark,
  },
};

/** Drops stray empty paragraphs (e.g. manual blank lines left by an editor) so paragraph spacing stays consistent without CMS-side cleanup. */
function isBlankBlock(block: PortableTextBlock): boolean {
  if (block._type !== "block") return false;
  const children = block.children as Array<{ text?: string }> | undefined;
  return !children?.some((child) => child.text?.trim());
}

const PREMISE_LINE_PATTERN = /^\d+[.)]\s/;
const CONCLUSION_PATTERN = /^(C\*?[.)]|∴\)?)/;
const conclusionItemClassName = "mt-1 border-t border-black/20 pt-2 pl-1";

function getBlockText(value: unknown): string {
  const children = (value as { children?: Array<{ text?: string }> })?.children;
  return children?.map((child) => child.text ?? "").join("") ?? "";
}

/** Flags an argument's conclusion line (author-written "C." / "C*" / "∴") so it can be set off from the premises above it. */
function isConclusionBlock(value: unknown): boolean {
  return CONCLUSION_PATTERN.test(getBlockText(value).trim());
}

function isPlainProseLine(block: PortableTextBlock): boolean {
  return (
    block._type === "block" &&
    !block.listItem &&
    (block.style ?? "normal") === "normal"
  );
}

/**
 * Groups consecutive plain paragraphs authored as a premise/conclusion
 * argument ("1) ...", "2) ...", "∴) ...") into a single proseArgument block,
 * for posts where the argument wasn't entered as a real Sanity list.
 */
function groupProseArguments(
  blocks: PortableTextBlock[],
): Array<PortableTextBlock | ProseArgumentBlock> {
  const result: Array<PortableTextBlock | ProseArgumentBlock> = [];
  let run: PortableTextBlock[] = [];

  const flush = () => {
    const first = run[0] && getBlockText(run[0]).trim();
    const last =
      run[run.length - 1] && getBlockText(run[run.length - 1]).trim();
    if (
      run.length >= 2 &&
      first &&
      last &&
      PREMISE_LINE_PATTERN.test(first) &&
      CONCLUSION_PATTERN.test(last)
    ) {
      result.push({
        _type: "proseArgument",
        _key: `arg-${run[0]._key ?? result.length}`,
        items: run,
      });
    } else {
      result.push(...run);
    }
    run = [];
  };

  for (const block of blocks) {
    const text = getBlockText(block).trim();
    const isArgumentLine =
      isPlainProseLine(block) &&
      (PREMISE_LINE_PATTERN.test(text) || CONCLUSION_PATTERN.test(text));

    if (isArgumentLine) {
      run.push(block);
    } else {
      flush();
      result.push(block);
    }
  }
  flush();

  return result;
}

export default function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[];
}) {
  const blocks = (value ?? []).filter((block) => !isBlankBlock(block));
  const grouped = groupProseArguments(blocks);
  return <PortableText value={grouped} components={components} />;
}
