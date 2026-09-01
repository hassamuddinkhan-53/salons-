import type { Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";

export function Gallery({ salon }: { salon: Salon }) {
  if (!salon.features.gallery) return null;

  const photos = resolveSalonImages(salon).gallery;

  return (
    <section id="gallery" className="section-pad pt-0">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
          Gallery
        </p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">
          Gallery
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
            />
          ))}
        </div>
        {salon.status === "demo" && salon.images.gallery.length === 0 ? (
          <p className="mt-4 text-xs text-[color:var(--salon-muted)]">
            Preview photos from the shared template. Replace them later in{" "}
            <code>public/salons/{salon.id}/</code>.
          </p>
        ) : null}
      </div>
    </section>
  );
}
