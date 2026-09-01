"use client";

import { useEffect, useState } from "react";
import type { Salon } from "@/lib/types";
import { resolveSalonImages } from "@/lib/images";
import { getMonogram, hasHttpUrl } from "@/lib/links";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Header({ salon }: { salon: Salon }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const images = resolveSalonImages(salon);

  const items = NAV.filter((item) => {
    if (item.href === "#reviews") return salon.features.reviews;
    if (item.href === "#gallery") return salon.features.gallery;
    if (item.href === "#services") return true;
    return true;
  });

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? "border-black/10 bg-[color:var(--salon-bg)]/92 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          {images.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={images.logo}
              alt={`${salon.name} logo`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold tracking-[0.14em] text-white"
              style={{ background: "var(--salon-primary)" }}
            >
              {getMonogram(salon.name)}
            </span>
          )}
          <span className="serif-display max-w-[52vw] truncate text-sm font-semibold sm:max-w-none sm:text-lg md:text-xl">
            {salon.name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[color:var(--salon-muted)] md:flex">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {salon.features.instagram && hasHttpUrl(salon.instagram) ? (
            <a
              href={salon.instagram}
              className="hidden text-sm font-medium md:inline"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          ) : null}
          {salon.features.facebook && hasHttpUrl(salon.facebook) ? (
            <a
              href={salon.facebook}
              className="hidden text-sm font-medium md:inline"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          ) : null}
          <a href="#contact" className="btn-primary hidden md:inline-flex">
            Contact
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 md:hidden"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-3 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/10 bg-[color:var(--salon-bg)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-base">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-2 py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
