import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "@/lib/sanity/client";
import type { SanityImage } from "@/types/sanity";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImage) => builder.image(source);
