import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RoughCard from "@/components/RoughCard";
import RoughLink from "@/components/RoughLink";
import { DownloadIcon } from "@/components/icons/CvIcons";
import { ICON_LINK_CLASS } from "@/components/icons/sharedIconStyles";
import { client, fetchOptions } from "@/lib/sanity/client";
import { cvPageQuery } from "@/lib/sanity/queries";
import type { CvPage as CvPageData } from "@/types/sanity";

export const metadata: Metadata = {
  title: "CV | Mark Stanley",
  description: "Mark Stanley's CV.",
  robots: { index: false, follow: false },
};

export default async function CvPage() {
  const page = await client.fetch<CvPageData | null>(
    cvPageQuery,
    {},
    fetchOptions,
  );

  if (!page?.file?.asset?.url) {
    notFound();
  }

  const { url, originalFilename } = page.file.asset;
  const downloadUrl = `${url}?dl=${encodeURIComponent(
    originalFilename ?? "Mark-Stanley-CV.pdf",
  )}`;

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-6">
      <h1 className="text-center font-noto-serif text-5xl text-black">CV</h1>

      <div className="group flex items-center gap-2">
        <DownloadIcon className={ICON_LINK_CLASS} />
        <RoughLink href={downloadUrl}>
          {page.downloadLabel ?? "Download CV"}
        </RoughLink>
      </div>

      <RoughCard
        width={340}
        height={440}
        className="max-w-md"
        contentClassName="aspect-[340/440] w-full p-2"
      >
        <object data={url} type="application/pdf" className="size-full">
          <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center font-caveat text-xl text-black">
            <p>Your browser can&apos;t preview PDFs inline.</p>
            <RoughLink href={downloadUrl}>Download the CV instead</RoughLink>
          </div>
        </object>
      </RoughCard>
    </div>
  );
}
