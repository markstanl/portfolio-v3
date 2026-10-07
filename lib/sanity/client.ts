import { createClient } from "next-sanity";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "ig0ahwfi";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/** Shared `client.fetch` options for page data that can go a little stale. */
export const fetchOptions = { next: { revalidate: 30 } };
