import type { Salon } from "@/lib/types";
import { formatDisplayPhone, hasHttpUrl, telLink, toWhatsAppLink } from "@/lib/links";

export function Contact({ salon }: { salon: Salon }) {
  const showHours =
    salon.features.openingHours && salon.openingHours.length > 0;

  return (
    <section id="contact" className="section-pad pt-0">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
          Contact
        </p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">
          Visit {salon.name}
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="card-panel rounded-[1.75rem] p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
              Address
            </h3>
            <p className="mt-2 text-lg leading-7">{salon.address}</p>
            <p className="text-[color:var(--salon-muted)]">
              {[salon.area, salon.city].filter(Boolean).join(", ")}
            </p>
            {salon.features.maps && hasHttpUrl(salon.googleMaps) ? (
              <a
                href={salon.googleMaps}
                className="btn-primary mt-6"
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
            ) : null}
          </article>

          <article className="card-panel rounded-[1.75rem] p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
              Reach us
            </h3>
            <ul className="mt-4 space-y-3 text-base">
              <li>
                Phone:{" "}
                {salon.features.phone && salon.phone ? (
                  <a className="underline" href={telLink(salon.phone)}>
                    {formatDisplayPhone(salon.phone)}
                  </a>
                ) : (
                  <span>Not Available</span>
                )}
              </li>
              {salon.landline ? (
                <li>
                  Landline:{" "}
                  <a className="underline" href={telLink(salon.landline)}>
                    {formatDisplayPhone(salon.landline)}
                  </a>
                </li>
              ) : null}
              <li>
                WhatsApp:{" "}
                {salon.features.whatsapp && salon.whatsapp ? (
                  <a
                    className="underline"
                    href={toWhatsAppLink(salon.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {formatDisplayPhone(salon.whatsapp)}
                  </a>
                ) : (
                  <span>Not Available</span>
                )}
              </li>
              <li>
                Website:{" "}
                {salon.features.website && hasHttpUrl(salon.website) ? (
                  <a
                    className="underline"
                    href={salon.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit website
                  </a>
                ) : (
                  <span>Not Available</span>
                )}
              </li>
              <li>
                Instagram:{" "}
                {salon.features.instagram && hasHttpUrl(salon.instagram) ? (
                  <a
                    className="underline"
                    href={salon.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                ) : (
                  <span>Not Available</span>
                )}
              </li>
              <li>
                Facebook:{" "}
                {salon.features.facebook && hasHttpUrl(salon.facebook) ? (
                  <a
                    className="underline"
                    href={salon.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                ) : (
                  <span>Not Available</span>
                )}
              </li>
            </ul>

            {salon.bookingNote ? (
              <p className="mt-5 text-sm leading-6 text-[color:var(--salon-muted)]">
                {salon.bookingNote}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
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
              {salon.features.phone && salon.phone ? (
                <a href={telLink(salon.phone)} className="btn-ghost">
                  Call now
                </a>
              ) : null}
            </div>
          </article>
        </div>

        {showHours ? (
          <article className="card-panel mt-4 rounded-[1.75rem] p-6 md:p-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
              Opening hours
            </h3>
            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              {salon.openingHours.map((row) => (
                <li key={row.day} className="flex justify-between gap-4">
                  <span>{row.day}</span>
                  <span className="text-[color:var(--salon-muted)]">
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ) : null}
      </div>
    </section>
  );
}
