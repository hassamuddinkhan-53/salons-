import type { Salon } from "@/lib/types";
import { hasHttpUrl, telLink, toWhatsAppLink } from "@/lib/links";

export function StickyCta({ salon }: { salon: Salon }) {
  const actions = [
    salon.features.phone && salon.phone
      ? { href: telLink(salon.phone), label: "Call", external: false }
      : null,
    salon.features.whatsapp && salon.whatsapp
      ? {
          href: toWhatsAppLink(salon.whatsapp),
          label: "WhatsApp",
          external: true,
        }
      : null,
    salon.features.maps && hasHttpUrl(salon.googleMaps)
      ? { href: salon.googleMaps, label: "Directions", external: true }
      : null,
  ].filter(Boolean) as { href: string; label: string; external: boolean }[];

  if (actions.length === 0) return null;

  return (
    <div className="sticky-cta fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[color:var(--salon-bg)]/95 backdrop-blur md:hidden">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${actions.length}, minmax(0, 1fr))` }}
      >
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noreferrer" : undefined}
            className="py-3 text-center text-xs font-semibold uppercase tracking-[0.14em]"
          >
            {action.label}
          </a>
        ))}
      </div>
    </div>
  );
}
