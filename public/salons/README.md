# Per-salon images

Shared template defaults live in `public/template/`.
Put replacement photos here later when a salon has its own photos.

```
public/salons/
  salon-001/
    logo.jpg
    hero.jpg
    gallery-1.jpg
    og.jpg
  salon-002/
    ...
```

Then set the matching paths on that salon in `src/data/salons.json`:

```json
"images": {
  "logo": "/salons/salon-001/logo.jpg",
  "hero": "/salons/salon-001/hero.jpg",
  "gallery": ["/salons/salon-001/gallery-1.jpg"],
  "og": "/salons/salon-001/og.jpg"
}
```

Use only photos you have rights to. Do not scrape random websites.
