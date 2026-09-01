const PLACEHOLDER_VALUES = new Set([
  "",
  "not checked",
  "not found",
  "n/a",
  "na",
  "none",
  "null",
  "#error!",
  "error",
  "yes",
  "no",
]);

export function isPresent(value: string | null | undefined): value is string {
  if (!value) return false;
  return !PLACEHOLDER_VALUES.has(value.trim().toLowerCase());
}

export function hasHttpUrl(value: string | null | undefined): value is string {
  if (!isPresent(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const PK_PHONE =
  /^(?:\+?92|0)?(?:3\d{9}|[2-9]\d{7,10})$/;

export function normalizePhone(
  value: string | null | undefined,
): string | null {
  if (!isPresent(value)) return null;
  const digits = value.replace(/[^\d+]/g, "");
  const compact = digits.replace(/^\+/, "");
  if (compact.length < 10) return null;
  if (!PK_PHONE.test(digits.replace(/[\s-]/g, ""))) {
    if (/^\+?\d{10,15}$/.test(digits)) return digits;
    return null;
  }
  return digits;
}

export function toWhatsAppLink(number: string): string {
  const digits = number.replace(/\D/g, "");
  const international = digits.startsWith("0")
    ? `92${digits.slice(1)}`
    : digits.startsWith("92")
      ? digits
      : digits;
  return `https://wa.me/${international}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function formatDisplayPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length === 12) {
    return `+92 ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  if (digits.startsWith("0") && digits.length === 11) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  }
  return phone;
}

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
}

export function salonPath(slug: string): string {
  return `/salon/${slug}`;
}

export function salonAbsoluteUrl(slug: string): string | undefined {
  const site = getSiteUrl();
  if (!site) return undefined;
  return `${site}${salonPath(slug)}`;
}

export function getMonogram(name: string): string {
  const skip = new Set([
    "and",
    "the",
    "&",
    "by",
    "n",
    "of",
    "salon",
    "saloon",
    "spa",
    "studio",
    "beauty",
    "parlour",
    "parlor",
    "clinic",
    "ladies",
    "only",
  ]);
  const words = name
    .replace(/['’]/g, "")
    .split(/[\s&/-]+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .filter((word) => !skip.has(word.toLowerCase()));

  if (words.length === 0) {
    return name.slice(0, 2).toUpperCase();
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}
