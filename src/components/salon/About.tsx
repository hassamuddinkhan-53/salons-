import type { Salon } from "@/lib/types";

export function About({ salon }: { salon: Salon }) {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
            About
          </p>
          <h2 className="serif-display mt-3 text-4xl md:text-5xl">
            {salon.name}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[color:var(--salon-muted)]">
            {salon.description}
          </p>
          {salon.status === "demo" ? (
            <p className="mt-4 max-w-xl text-sm leading-6 text-[color:var(--salon-muted)]">
              This page is a personalized demo built from publicly listed
              location details. Service menus, hours, and photos can be added
              once they are provided by the business.
            </p>
          ) : null}
        </div>
        <dl className="card-panel grid gap-5 rounded-[1.75rem] p-6 md:p-8">
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
              Location
            </dt>
            <dd className="mt-1 text-lg">{salon.address}</dd>
            <dd className="text-[color:var(--salon-muted)]">
              {[salon.area, salon.city].filter(Boolean).join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
              Category
            </dt>
            <dd className="mt-1 text-lg">{salon.category}</dd>
          </div>
          {salon.googleRating != null ? (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
                Google rating
              </dt>
              <dd className="mt-1 text-lg">
                {salon.googleRating}
                {salon.googleReviews != null
                  ? ` (${salon.googleReviews} reviews)`
                  : ""}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  );
}
