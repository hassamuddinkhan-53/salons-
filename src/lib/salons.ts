import salonsData from "@/data/salons.json";
import type { Salon } from "@/lib/types";

/**
 * Local JSON is the v1 data source.
 * Replace the internals of this module later with Supabase, Firebase,
 * or Postgres without changing salon UI components.
 */
const salons = salonsData as Salon[];

export function getAllSalons(): Salon[] {
  return salons;
}

export function getSalonBySlug(slug: string): Salon | undefined {
  return salons.find((salon) => salon.slug === slug);
}

export function getSalonById(id: string): Salon | undefined {
  return salons.find((salon) => salon.id === id);
}

export function getSalonSlugs(): string[] {
  return salons.map((salon) => salon.slug);
}

export function getSalonsByCity(city: string): Salon[] {
  return salons.filter(
    (salon) => salon.city.toLowerCase() === city.toLowerCase(),
  );
}

export function searchSalons(query: string): Salon[] {
  const q = query.trim().toLowerCase();
  if (!q) return salons;
  return salons.filter((salon) => {
    return (
      salon.name.toLowerCase().includes(q) ||
      salon.city.toLowerCase().includes(q) ||
      salon.area.toLowerCase().includes(q) ||
      salon.address.toLowerCase().includes(q) ||
      salon.slug.toLowerCase().includes(q)
    );
  });
}
