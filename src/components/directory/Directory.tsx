"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Salon } from "@/lib/types";
import { salonPath } from "@/lib/links";

export function Directory({ salons }: { salons: Salon[] }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");

  const cities = useMemo(
    () => Array.from(new Set(salons.map((salon) => salon.city))).sort(),
    [salons],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return salons.filter((salon) => {
      const cityOk = city === "all" || salon.city === city;
      if (!cityOk) return false;
      if (!q) return true;
      return (
        salon.name.toLowerCase().includes(q) ||
        salon.area.toLowerCase().includes(q) ||
        salon.address.toLowerCase().includes(q) ||
        salon.slug.toLowerCase().includes(q)
      );
    });
  }, [salons, query, city]);

  return (
    <div className="min-h-svh bg-[#f6efe6] text-[#1c1410]">
      <header className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6b5e55]">
          One codebase · {salons.length} salon URLs
        </p>
        <h1 className="serif-display mt-3 text-5xl md:text-7xl">
          Salon demo directory
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#6b5e55]">
          Each link opens the same website template with that salon&apos;s data.
          These are personalized demos, not official business websites.
        </p>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, area, or slug"
            className="h-12 w-full rounded-full border border-black/10 bg-white px-5 text-sm outline-none md:max-w-md"
          />
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="h-12 rounded-full border border-black/10 bg-white px-4 text-sm"
          >
            <option value="all">All cities</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 pb-20 md:grid-cols-2 md:px-6 lg:grid-cols-3">
        {filtered.map((salon) => (
          <Link
            key={salon.id}
            href={salonPath(salon.slug)}
            className="rounded-[1.5rem] border border-black/10 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b5e55]">
              {salon.city} · {salon.area || salon.category}
            </p>
            <h2 className="serif-display mt-2 text-2xl leading-tight">
              {salon.name}
            </h2>
            <p className="mt-2 text-sm text-[#6b5e55]">{salon.address}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em]">
              /salon/{salon.slug}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
