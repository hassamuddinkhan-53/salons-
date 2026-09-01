import type { Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";
import { shortLocationText } from "@/lib/links";

function isHoursPoster(src: string): boolean {
  return /\/hours\.jpg$/i.test(src);
}

function mosaicPhotos(gallery: string[]): string[] {
  return gallery.filter((src) => !isHoursPoster(src)).slice(0, 3);
}

export function About({ salon }: { salon: Salon }) {
  const hasOwnContent =
    salon.images.gallery.length > 0 || salon.services.length > 0;
  const showHours =
    salon.features.openingHours && salon.openingHours.length > 0;
  const images = resolveSalonImages(salon);
  const mosaic = mosaicPhotos(images.gallery);
  const hoursPoster = images.gallery.find(isHoursPoster);

  return (
    <section id="about" className="section-pad">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-start">
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
          {salon.bookingNote ? (
            <p className="mt-4 max-w-xl text-sm leading-6">
              {salon.bookingNote}
            </p>
          ) : null}
          {salon.highlights && salon.highlights.length > 0 ? (
            <ul className="mt-4 max-w-xl list-disc space-y-1 pl-5 text-sm leading-6 text-[color:var(--salon-muted)]">
              {salon.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {salon.status === "demo" && !hasOwnContent ? (
            <p className="mt-4 max-w-xl text-sm leading-6 text-[color:var(--salon-muted)]">
              This page is a personalized demo built from publicly listed
              location details. Service menus, hours, and photos can be added
              once they are provided by the business.
            </p>
          ) : null}
        </div>

        <div className="space-y-4">
          {mosaic.length > 0 ? (
            <div
              className={`grid gap-2 ${
                mosaic.length === 1
                  ? "grid-cols-1"
                  : mosaic.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2"
              }`}
            >
              {mosaic.map((src, index) => (
                <div
                  key={src}
                  className={`card-panel overflow-hidden rounded-[1.25rem] ${
                    mosaic.length === 3 && index === 0 ? "col-span-2" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${salon.name} look ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <dl className="card-panel grid gap-5 rounded-[1.75rem] p-6 md:p-8">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
                Area
              </dt>
              <dd className="mt-1 text-lg">
                {shortLocationText(salon.area, salon.city)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
                Category
              </dt>
              <dd className="mt-1 text-lg">{salon.category}</dd>
            </div>
            {showHours ? (
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
                  Hours
                </dt>
                {salon.openingHours.map((row) => (
                  <dd key={row.day} className="mt-1 text-lg">
                    {row.day}: {row.hours}
                  </dd>
                ))}
              </div>
            ) : null}
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

          {hoursPoster ? (
            <div className="card-panel overflow-hidden rounded-[1.75rem] p-4 md:p-5">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--salon-muted)]">
                Opening hours
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hoursPoster}
                alt={`${salon.name} opening hours`}
                className="w-full rounded-[1rem] object-contain"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
