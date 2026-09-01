import type { MetadataRoute } from "next";
import { getAllSalons } from "@/lib/salons";
import { getSiteUrl, salonPath } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  if (!site) return [];

  return [
    {
      url: site,
      lastModified: new Date(),
    },
    ...getAllSalons().map((salon) => ({
      url: `${site}${salonPath(salon.slug)}`,
      lastModified: new Date(),
    })),
  ];
}
