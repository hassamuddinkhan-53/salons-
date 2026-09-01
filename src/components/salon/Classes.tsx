import type { Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";
import { toWhatsAppLink } from "@/lib/links";

export function Classes({ salon }: { salon: Salon }) {
  const flyer = resolveSalonImages(salon).classes;
  if (!salon.features.classes || !flyer) return null;

  return (
    <section id="classes" className="section-pad pt-0">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
          Classes
        </p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">
          Classes
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--salon-muted)]">
          See the flyer below and message the salon on WhatsApp for dates.
        </p>
        <div className="card-panel mt-8 overflow-hidden rounded-[1.75rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flyer}
            alt={`${salon.name} makeup classes flyer`}
            className="w-full object-contain bg-black"
          />
        </div>
        {salon.whatsapp ? (
          <a
            href={toWhatsAppLink(salon.whatsapp)}
            className="btn-gold mt-6"
            target="_blank"
            rel="noreferrer"
          >
            Ask about classes on WhatsApp
          </a>
        ) : null}
      </div>
    </section>
  );
}
