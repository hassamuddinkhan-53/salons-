import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/links";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      // Demo pages stay out of search until a salon is marked live.
      disallow: "/",
    },
    sitemap: site ? `${site}/sitemap.xml` : undefined,
  };
}
