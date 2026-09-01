import type { GalleryMedia, Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";

function GalleryMediaItem({ item }: { item: GalleryMedia }) {
  const isVideo = item.kind === "video" || item.src.endsWith(".mp4");

  if (isVideo) {
    return (
      <video
        src={item.src}
        className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
        controls
        playsInline
        muted
        loop
        preload="metadata"
        aria-label={item.alt || "Salon video"}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt || ""}
      className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
    />
  );
}

export function Gallery({ salon }: { salon: Salon }) {
  if (!salon.features.gallery) return null;

  const images = resolveSalonImages(salon);
  const groups = images.galleryGroups?.filter((group) => group.items.length > 0);
  const photos = images.gallery;

  return (
    <section id="gallery" className="section-pad pt-0">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--salon-muted)]">
          Gallery
        </p>
        <h2 className="serif-display mt-3 text-4xl md:text-5xl">
          {groups && groups.length > 0 ? "Looks from the salon" : "Gallery"}
        </h2>

        {groups && groups.length > 0 ? (
          <div className="mt-8 space-y-10">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--salon-muted)]">
                  {group.title}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {group.items.map((item) => (
                    <GalleryMediaItem key={item.src} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {photos.map((src) => (
              <GalleryMediaItem key={src} item={{ src }} />
            ))}
          </div>
        )}
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
