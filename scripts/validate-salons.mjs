import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const salons = JSON.parse(
  readFileSync(join(root, "src/data/salons.json"), "utf8"),
);

const PLACEHOLDERS = new Set([
  "",
  "not checked",
  "not found",
  "n/a",
  "na",
  "none",
  "null",
  "#error!",
  "yes",
  "no",
]);

function present(value) {
  return typeof value === "string" && !PLACEHOLDERS.has(value.trim().toLowerCase());
}

function httpUrl(value) {
  if (!present(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const errors = [];
const warnings = [];
const ids = new Map();
const slugs = new Map();

for (const salon of salons) {
  const loc = `${salon.id} (${salon.slug})`;
  if (!salon.id) errors.push("Missing id");
  if (ids.has(salon.id)) errors.push(`Duplicate id ${salon.id}`);
  else ids.set(salon.id, salon.slug);

  if (!salon.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(salon.slug)) {
    errors.push(`${loc}: bad slug`);
  }
  if (slugs.has(salon.slug)) errors.push(`Duplicate slug ${salon.slug}`);
  else slugs.set(salon.slug, salon.id);

  if (!present(salon.name)) errors.push(`${loc}: empty name`);
  if (!present(salon.city)) errors.push(`${loc}: missing city`);
  if (!salon.status) errors.push(`${loc}: missing status`);

  if (salon.phone && present(salon.phone) && salon.phone.replace(/\D/g, "").length < 10) {
    errors.push(`${loc}: invalid phone ${salon.phone}`);
  }
  if (salon.whatsapp && present(salon.whatsapp) && salon.whatsapp.replace(/\D/g, "").length < 10) {
    errors.push(`${loc}: invalid WhatsApp ${salon.whatsapp}`);
  }

  for (const key of ["website", "instagram", "facebook", "googleMaps", "googleReviewUrl"]) {
    if (salon[key] && !httpUrl(salon[key])) {
      errors.push(`${loc}: malformed ${key}`);
    }
  }

  if (!salon.phone) warnings.push(`${loc}: phone missing`);
  if (salon.features.whatsapp && !salon.whatsapp) {
    errors.push(`${loc}: whatsapp feature enabled without a number`);
  }
  if (salon.features.phone && !salon.phone) {
    errors.push(`${loc}: phone feature enabled without a number`);
  }
}

console.log(`Validated ${salons.length} salons`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
if (errors.length) {
  console.error(errors.slice(0, 40).join("\n"));
  process.exit(1);
}
