import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL("/", process.env.NEXT_PUBLIC_SITE_URL).href }];
}
