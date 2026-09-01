import type { CSSProperties } from "react";
import type { Salon } from "@/lib/types";
import { localBusinessJsonLd } from "@/lib/seo";
import { About } from "@/components/salon/About";
import { Contact } from "@/components/salon/Contact";
import { DemoBanner } from "@/components/salon/DemoBanner";
import { Footer } from "@/components/salon/Footer";
import { Gallery } from "@/components/salon/Gallery";
import { Header } from "@/components/salon/Header";
import { Hero } from "@/components/salon/Hero";
import { Reviews } from "@/components/salon/Reviews";
import { Services } from "@/components/salon/Services";
import { StickyCta } from "@/components/salon/StickyCta";

export function SalonSite({ salon }: { salon: Salon }) {
  const theme = {
    "--theme-primary": salon.theme.primaryColor,
    "--theme-secondary": salon.theme.secondaryColor,
    "--theme-accent": salon.theme.accentColor,
    "--theme-bg": salon.theme.backgroundColor,
    "--theme-text": salon.theme.textColor,
  } as CSSProperties;

  return (
    <div className="salon-shell pb-16 md:pb-0" style={theme}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(salon)),
        }}
      />
      <DemoBanner salon={salon} />
      <Header salon={salon} />
      <main>
        <Hero salon={salon} />
        <div className="hairline mx-auto max-w-6xl" />
        <About salon={salon} />
        <Services salon={salon} />
        <Gallery salon={salon} />
        <Reviews salon={salon} />
        <Contact salon={salon} />
      </main>
      <Footer salon={salon} />
      <StickyCta salon={salon} />
    </div>
  );
}
