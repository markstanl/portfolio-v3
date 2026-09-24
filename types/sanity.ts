import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

/**
 * Blog posts and philosophy papers share one type; `foreword` is optional
 * framing text that papers use and posts generally omit.
 */
export type Post = {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  metaDescription?: string;
  foreword?: string;
  image?: SanityImage;
  imageCredit?: string;
  body: PortableTextBlock[];
  tags?: string[];
};

export type PublishedPaper = {
  _id: string;
  _type: "publishedPaper";
  title: string;
  abstract?: string;
  publishedIn?: string;
  publishedAt: string;
  link?: string;
  slug: { current: string };
  excerpt?: string;
  metaDescription?: string;
  image?: SanityImage;
  imageCredit?: string;
  tags?: string[];
};

export type Music = {
  _id: string;
  _type: "musicType";
  title: string;
  composer?: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  metaDescription?: string;
  foreword?: string;
  image?: SanityImage;
  imageCredit?: string;
  body: PortableTextBlock[];
  tags?: string[];
  musicLink?: string;
  conductingVideoEmbed?: string;
};

export type BlogEntry = Post | PublishedPaper | Music;

/** Fields fetched for the blog list/tabs view — see lib/sanity/queries.ts. */
export type BloglistEntry = {
  _id: string;
  _type: Post["_type"] | PublishedPaper["_type"] | Music["_type"];
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  image?: SanityImage;
  tags?: string[];
};
