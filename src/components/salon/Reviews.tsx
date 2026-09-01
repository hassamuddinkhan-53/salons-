import type { Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";
import { hasHttpUrl } from "@/lib/links";

function stars(rating: number) {
  const full = Math.round(Math.min(5, Math.max(0, rating)));
  return "★".repeat(full) + "☆".repeat(5 - full);
}

export function Reviews({ salon }: { salon: Salon }) {
  if (!salon.features.reviews) return null;

  const canLeaveReview = hasHttpUrl(salon.googleReviewUrl);
  const reviewPhotos = resolveSalonImages(salon).reviewPhotos ?? [];

  return (
    <section id="reviews" className="section-pad pt-0">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
          Reviews
        </p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">
          What Google shows
        </h2>

        <div className="card-panel mt-8 rounded-[1.75rem] p-6 md:flex md:items-center md:justify-between md:p-8">
          <div>
            {salon.googleRating != null ? (
              <>
                <p className="serif-display text-6xl leading-none">
                  {salon.googleRating}
                </p>
                <p className="mt-2 tracking-[0.2em] text-[color:var(--salon-accent)]">
                  {stars(salon.googleRating)}
                </p>
              </>
            ) : (
              <p className="serif-display text-3xl">Reviews listed on Google</p>
            )}
            <p className="mt-3 text-[color:var(--salon-muted)]">
              {salon.googleReviews != null
                ? `${salon.googleReviews} Google reviews`
                : "Review count not available in the source data"}
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            {canLeaveReview ? (
              <a
                href={salon.googleReviewUrl!}
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Leave us a Google Review ⭐
              </a>
            ) : (
              <p className="max-w-xs text-sm text-[color:var(--salon-muted)]">
                A Google review link can be added when a verified URL is
                available.
              </p>
            )}
          </div>
        </div>

        {reviewPhotos.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {reviewPhotos.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt="Client look from the salon"
                className="w-full rounded-[1.5rem] object-cover"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
