import type { Salon, SalonImages } from "@/lib/types";

/** Shared template photos. Replace per salon under public/salons/{id}/ */
export const TEMPLATE_IMAGES = {
  logo: "/template/logo.jpg",
  hero: "/template/hero.jpg",
  gallery: [
    "/template/gallery-1.jpg",
    "/template/gallery-2.jpg",
    "/template/gallery-3.jpg",
    "/template/gallery-4.jpg",
    "/template/gallery-5.jpg",
    "/template/gallery-6.jpg",
  ],
  og: "/template/hero.jpg",
} as const;

export function resolveSalonImages(salon: Salon): SalonImages {
  const customGallery = salon.images.gallery.filter(Boolean);
  return {
    logo: salon.images.logo || TEMPLATE_IMAGES.logo,
    logoFit: salon.images.logoFit || "cover",
    logoBackground: salon.images.logoBackground || "light",
    hero: salon.images.hero || TEMPLATE_IMAGES.hero,
    gallery: customGallery.length > 0 ? customGallery : [...TEMPLATE_IMAGES.gallery],
    galleryGroups: salon.images.galleryGroups,
    og: salon.images.og || salon.images.hero || TEMPLATE_IMAGES.og,
    reviewPhotos: salon.images.reviewPhotos?.filter(Boolean) ?? [],
    classes: salon.images.classes || null,
  };
}
