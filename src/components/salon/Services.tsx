import type { Salon } from "@/lib/types";

export function Services({ salon }: { salon: Salon }) {
  const hasServices = salon.services.length > 0;

  return (
    <section id="services" className="section-pad pt-0">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
          Services
        </p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">
          What we can help with
        </h2>

        {hasServices ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {salon.services.map((service) => (
              <article
                key={service.name}
                className="service-card card-panel rounded-[1.5rem] p-5 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_56px_-28px_rgba(28,20,16,0.38)]"
              >
                <h3 className="serif-display text-2xl">{service.name}</h3>
                {service.description ? (
                  <p className="mt-2 text-sm leading-6 text-[color:var(--salon-muted)]">
                    {service.description}
                  </p>
                ) : null}
                {service.price ? (
                  <p className="mt-4 text-sm font-semibold">{service.price}</p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="card-panel mt-8 rounded-[1.75rem] p-6 md:p-8">
            <p className="max-w-2xl text-base leading-7 text-[color:var(--salon-muted)]">
              A verified service menu was not included in the source lead data,
              so no treatments or prices are listed here. Contact {salon.name}{" "}
              for current offerings.
            </p>
            <a href="#contact" className="btn-primary mt-6">
              Ask about services
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
