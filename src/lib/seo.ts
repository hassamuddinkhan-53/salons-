import type { Metadata } from "next";
import type { Salon } from "@/lib/types";
import { getSiteUrl, salonAbsoluteUrl } from "@/lib/links";

export function salonSeoTitle(salon: Salon): string {
  return `${salon.name} | ${salon.category} in ${salon.city}`;
}

export function salonSeoDescription(salon: Salon): string {
  const location = [salon.area, salon.city].filter(Boolean).join(", ");
  const rating =
    salon.googleRating != null
      ? ` Google rating ${salon.googleRating}${
          salon.googleReviews != null ? ` from ${salon.googleReviews} reviews` : ""
        }.`
      : "";
  return `${salon.name} is a ${salon.category.toLowerCase()} in ${location}.${rating} Personalized demo website — not an official salon site.`.trim();
}

export function salonMetadata(salon: Salon): Metadata {
  const title = salonSeoTitle(salon);
  const description = salonSeoDescription(salon);
  const url = salonAbsoluteUrl(salon.slug);
  const site = getSiteUrl();
  const ogImage = salon.images.og;

  return {
    title,
    description,
    robots:
      salon.status === "demo"
        ? { index: false, follow: false }
        : { index: true, follow: true },
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: salon.name,
      locale: "en_PK",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: salon.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: site ? { "og:url": url || "" } : undefined,
  };
}

export function localBusinessJsonLd(salon: Salon) {
  const url = salonAbsoluteUrl(salon.slug);
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: salon.name,
    description: salonSeoDescription(salon),
    address: {
      "@type": "PostalAddress",
      streetAddress: salon.address,
      addressLocality: salon.city,
      addressCountry: "PK",
    },
    ...(salon.phone ? { telephone: salon.phone } : {}),
    ...(salon.googleMaps ? { hasMap: salon.googleMaps } : {}),
    ...(url ? { url } : {}),
    ...(salon.googleRating != null
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: salon.googleRating,
            ...(salon.googleReviews != null
              ? { reviewCount: salon.googleReviews }
              : {}),
            bestRating: 5,
          },
        }
      : {}),
  };
}
