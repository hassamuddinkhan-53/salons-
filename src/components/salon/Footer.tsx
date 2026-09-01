import type { Salon } from "@/lib/types";
import { formatDisplayPhone, hasHttpUrl, telLink, toWhatsAppLink } from "@/lib/links";

export function Footer({ salon }: { salon: Salon }) {
  return (
    <footer className="border-t border-black/10 px-4 py-12 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="serif-display text-3xl">{salon.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-[color:var(--salon-muted)]">
            {salon.address.toLowerCase().includes(salon.city.toLowerCase())
              ? salon.address
              : `${salon.address}, ${salon.city}`}
          </p>
          {salon.status === "demo" ? (
            <p className="mt-3 max-w-md text-xs leading-5 text-[color:var(--salon-muted)]">
              Demo website for outreach. Not affiliated until the business
              claims it.
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {salon.features.phone && salon.phone ? (
            <a href={telLink(salon.phone)}>{formatDisplayPhone(salon.phone)}</a>
          ) : null}
          {salon.features.whatsapp && salon.whatsapp ? (
            <a href={toWhatsAppLink(salon.whatsapp)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
          {salon.features.maps && hasHttpUrl(salon.googleMaps) ? (
            <a href={salon.googleMaps} target="_blank" rel="noreferrer">
              Google Maps
            </a>
          ) : null}
          {salon.features.instagram && hasHttpUrl(salon.instagram) ? (
            <a href={salon.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          ) : null}
          {salon.features.facebook && hasHttpUrl(salon.facebook) ? (
            <a href={salon.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          ) : null}
          {salon.features.website && hasHttpUrl(salon.website) ? (
            <a href={salon.website} target="_blank" rel="noreferrer">
              Website
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
