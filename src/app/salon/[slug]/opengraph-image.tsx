import { ImageResponse } from "next/og";
import { getSalonBySlug } from "@/lib/salons";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OgImage({ params }: Props) {
  const { slug } = await params;
  const salon = getSalonBySlug(slug);

  const name = salon?.name ?? "Salon demo";
  const line = salon
    ? `${salon.category} in ${salon.city}`
    : "Personalized salon demo";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #F6EFE6 0%, #E7D3BE 55%, #7A3148 140%)",
          color: "#1C1410",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          Demo website
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: name.length > 28 ? 56 : 72, lineHeight: 1.05 }}>
            {name}
          </div>
          <div style={{ marginTop: 18, fontSize: 28, opacity: 0.75 }}>
            {line}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 20, opacity: 0.6 }}>
          Personalized preview · not an official site
        </div>
      </div>
    ),
    size,
  );
}
