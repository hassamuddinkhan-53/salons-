"use client";

import { useCallback, useEffect, useState } from "react";
import type { GalleryMedia, Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";

function isHoursPoster(src: string): boolean {
  return /\/hours\.jpg$/i.test(src);
}

function isVideoItem(item: GalleryMedia): boolean {
  return item.kind === "video" || item.src.endsWith(".mp4");
}

function GalleryMediaItem({
  item,
  onImageClick,
}: {
  item: GalleryMedia;
  onImageClick?: (item: GalleryMedia) => void;
}) {
  if (isVideoItem(item)) {
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
    <button
      type="button"
      className="gallery-thumb group block w-full overflow-hidden rounded-[1.25rem] text-left"
      onClick={() => onImageClick?.(item)}
      aria-label={item.alt ? `View ${item.alt}` : "View full-size photo"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt || ""}
        className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />
    </button>
  );
}

function visibleItems(items: GalleryMedia[]): GalleryMedia[] {
  return items.filter((item) => !isHoursPoster(item.src));
}

export function Gallery({ salon }: { salon: Salon }) {
  const [lightbox, setLightbox] = useState<GalleryMedia | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, closeLightbox]);

  if (!salon.features.gallery) return null;

  const images = resolveSalonImages(salon);
  const groups = images.galleryGroups
    ?.map((group) => ({
      ...group,
      items: visibleItems(group.items),
    }))
    .filter((group) => group.items.length > 0);
  const photos = visibleItems(images.gallery.map((src) => ({ src })));

  return (
    <>
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
                      <GalleryMediaItem
                        key={item.src}
                        item={item}
                        onImageClick={
                          isVideoItem(item) ? undefined : setLightbox
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {photos.map((item) => (
                <GalleryMediaItem
                  key={item.src}
                  item={item}
                  onImageClick={isVideoItem(item) ? undefined : setLightbox}
                />
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

      {lightbox ? (
        <div
          className="gallery-lightbox fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt || ""}
            className="max-h-[90svh] max-w-[min(1100px,96vw)] rounded-lg object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
