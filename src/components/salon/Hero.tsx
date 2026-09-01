import type { Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";
import { hasHttpUrl, telLink, toWhatsAppLink } from "@/lib/links";

export function Hero({ salon }: { salon: Salon }) {
  const images = resolveSalonImages(salon);
  const layout = salon.layout || "classic";
  const ratingLabel =
    salon.googleRating != null
      ? `${salon.googleRating}${
          salon.googleReviews != null ? ` · ${salon.googleReviews} Google reviews` : ""
        }`
      : null;

  return (
    <section id="top" className="hero-wash relative overflow-hidden">
      <div
        className={`mx-auto grid min-h-[88svh] max-w-6xl items-center gap-10 px-4 pb-24 pt-10 md:px-6 md:pb-28 md:pt-16 ${
          layout === "atelier"
            ? "md:grid-cols-[0.9fr_1.1fr]"
            : "md:grid-cols-[1.15fr_0.85fr]"
        }`}
      >
        <div className={layout === "atelier" ? "md:order-2" : undefined}>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
            {salon.category}
            {salon.area ? ` · ${salon.area}` : ""}
          </p>
          <h1 className="serif-display text-[2.35rem] font-medium leading-[1.08] break-words md:text-7xl md:leading-[0.95]">
            {salon.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[color:var(--salon-muted)] md:text-xl">
            {salon.tagline || `${salon.category} in ${salon.city}`}
          </p>

          {salon.bookingNote ? (
            <p className="mt-4 max-w-xl text-sm leading-6">
              {salon.bookingNote}
            </p>
          ) : null}

          {ratingLabel ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-sm">
              <span aria-hidden>★</span>
              {ratingLabel}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {salon.features.phone && salon.phone ? (
              <a href={telLink(salon.phone)} className="btn-primary">
                Call salon
              </a>
            ) : null}
            {salon.features.whatsapp && salon.whatsapp ? (
              <a
                href={toWhatsAppLink(salon.whatsapp)}
                className="btn-gold"
                target="_blank"
                rel="noreferrer"
              >
                {salon.bookingNote ? "Book on WhatsApp" : "Chat on WhatsApp"}
              </a>
            ) : null}
            {salon.features.maps && hasHttpUrl(salon.googleMaps) ? (
              <a
                href={salon.googleMaps}
                className="btn-ghost"
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
            ) : null}
            <a href="#contact" className="btn-ghost">
              View contact
            </a>
          </div>
        </div>

        <div className={`relative ${layout === "atelier" ? "md:order-1" : ""}`}>
          <div className="card-panel overflow-hidden rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images.hero || ""}
              alt={salon.name}
              className="hero-photo aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
