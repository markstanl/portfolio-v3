/** Sanity document types published as pages under /blog. */
export const BLOG_TYPES = `_type == "post" || _type == "publishedPaper" || _type == "musicType"`;

const LIST_PROJECTION = `{_id, _type, title, slug, publishedAt, excerpt, tags, image}`;

export const allPostsQuery = `*[${BLOG_TYPES}] | order(publishedAt desc) ${LIST_PROJECTION}`;

export const postBySlugQuery = `*[slug.current == $slug][0]`;
