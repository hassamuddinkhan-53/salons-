import type { Salon } from "@/lib/types";

export function DemoBanner({ salon }: { salon: Salon }) {
  if (salon.status !== "demo") return null;

  return (
    <div
      className="z-50 px-3 py-2.5 text-center text-[11px] font-medium leading-snug tracking-wide text-[#fffaf4] md:text-xs"
      style={{ background: "var(--salon-primary)" }}
    >
      Personalized demo for {salon.name}. This is not an official website and
      has not been claimed by the business.
    </div>
  );
}
