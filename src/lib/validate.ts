import type { Salon } from "@/lib/types";
import { hasHttpUrl, isPresent, normalizePhone } from "@/lib/links";

export interface ValidationIssue {
  id: string;
  slug: string;
  name: string;
  severity: "error" | "warning";
  message: string;
}

export interface ValidationResult {
  ok: boolean;
  salonCount: number;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

function issue(
  salon: Pick<Salon, "id" | "slug" | "name">,
  severity: "error" | "warning",
  message: string,
): ValidationIssue {
  return {
    id: salon.id,
    slug: salon.slug,
    name: salon.name,
    severity,
    message,
  };
}

export function validateSalons(salons: Salon[]): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];
  const ids = new Map<string, string>();
  const slugs = new Map<string, string>();
  const identity = new Map<string, Salon[]>();

  for (const salon of salons) {
    if (!salon.id) {
      errors.push(issue(salon, "error", "Missing salon id"));
    } else if (ids.has(salon.id)) {
      errors.push(
        issue(salon, "error", `Duplicate id also used by ${ids.get(salon.id)}`),
      );
    } else {
      ids.set(salon.id, salon.slug);
    }

    if (!salon.slug) {
      errors.push(issue(salon, "error", "Missing slug"));
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(salon.slug)) {
      errors.push(issue(salon, "error", `Malformed slug: ${salon.slug}`));
    } else if (slugs.has(salon.slug)) {
      errors.push(
        issue(
          salon,
          "error",
          `Duplicate slug also used by ${slugs.get(salon.slug)}`,
        ),
      );
    } else {
      slugs.set(salon.slug, salon.id);
    }

    if (!isPresent(salon.name)) {
      errors.push(issue(salon, "error", "Empty salon name"));
    }
    if (!isPresent(salon.city)) {
      errors.push(issue(salon, "error", "Missing city"));
    }
    if (!isPresent(salon.address)) {
      warnings.push(issue(salon, "warning", "Missing address"));
    }

    if (salon.phone) {
      if (!normalizePhone(salon.phone)) {
        errors.push(
          issue(salon, "error", `Invalid phone number: ${salon.phone}`),
        );
      }
    } else {
      warnings.push(issue(salon, "warning", "Phone not available"));
    }

    if (salon.whatsapp && !normalizePhone(salon.whatsapp)) {
      errors.push(
        issue(salon, "error", `Invalid WhatsApp number: ${salon.whatsapp}`),
      );
    }

    for (const [label, value] of [
      ["website", salon.website],
      ["instagram", salon.instagram],
      ["facebook", salon.facebook],
      ["googleMaps", salon.googleMaps],
      ["googleReviewUrl", salon.googleReviewUrl],
    ] as const) {
      if (value && !hasHttpUrl(value)) {
        errors.push(issue(salon, "error", `Malformed ${label} URL: ${value}`));
      }
    }

    const key = `${salon.name.trim().toLowerCase()}|${salon.city.trim().toLowerCase()}|${salon.address.trim().toLowerCase()}`;
    const bucket = identity.get(key) ?? [];
    bucket.push(salon);
    identity.set(key, bucket);
  }

  for (const group of identity.values()) {
    if (group.length > 1) {
      for (const salon of group) {
        warnings.push(
          issue(
            salon,
            "warning",
            "Possible duplicate business (same name, city, and address)",
          ),
        );
      }
    }
  }

  return {
    ok: errors.length === 0,
    salonCount: salons.length,
    errors,
    warnings,
  };
}
