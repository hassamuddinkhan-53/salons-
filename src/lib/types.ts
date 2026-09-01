export type SalonStatus = "demo" | "live";

export interface SalonTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface SalonFeatures {
  gallery: boolean;
  reviews: boolean;
  whatsapp: boolean;
  instagram: boolean;
  facebook: boolean;
  website: boolean;
  booking: boolean;
  maps: boolean;
  phone: boolean;
  openingHours: boolean;
}

export interface SalonImages {
  logo: string | null;
  hero: string | null;
  gallery: string[];
  og: string | null;
}

export interface SalonService {
  name: string;
  description?: string | null;
  price?: string | null;
}

export interface OpeningHour {
  day: string;
  hours: string;
}

export interface SalonVerification {
  phoneMissing: boolean;
  whatsappMissing: boolean;
  socialMissing: boolean;
  needsManualReview: boolean;
  issues: string[];
}

export interface Salon {
  id: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  area: string;
  address: string;
  phone: string | null;
  whatsapp: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  googleMaps: string | null;
  googleReviewUrl: string | null;
  services: SalonService[];
  images: SalonImages;
  openingHours: OpeningHour[];
  description: string;
  tagline: string;
  theme: SalonTheme;
  features: SalonFeatures;
  status: SalonStatus;
  priority: string;
  notes: string;
  verification: SalonVerification;
}
