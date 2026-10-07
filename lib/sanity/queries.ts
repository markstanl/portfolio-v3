/** Sanity document types published as pages under /blog. */
export const BLOG_TYPES = `_type == "post" || _type == "publishedPaper" || _type == "musicType"`;

const LIST_PROJECTION = `{_id, _type, title, slug, publishedAt, excerpt, tags, image}`;

export const allPostsQuery = `*[${BLOG_TYPES}] | order(publishedAt desc) ${LIST_PROJECTION}`;

export const postBySlugQuery = `*[slug.current == $slug][0]`;

export const linksPageQuery = `*[_type == "linksPage"][0]{
  name,
  taglines,
  avatarImage,
  avatarInitials,
  socials[]{platform, url},
  links[]{label, url, iconType, icon, image}
}`;

export const cvPageQuery = `*[_type == "cvPage"][0]{
  downloadLabel,
  file{asset->{url, originalFilename}}
}`;
