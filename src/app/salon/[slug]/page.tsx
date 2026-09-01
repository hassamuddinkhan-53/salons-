import { notFound } from "next/navigation";
import { SalonSite } from "@/components/salon/SalonSite";
import { getAllSalons, getSalonBySlug } from "@/lib/salons";
import { salonMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSalons().map((salon) => ({ slug: salon.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const salon = getSalonBySlug(slug);
  if (!salon) return { title: "Salon not found" };
  return salonMetadata(salon);
}

export default async function SalonPage({ params }: PageProps) {
  const { slug } = await params;
  const salon = getSalonBySlug(slug);
  if (!salon) notFound();
  return <SalonSite salon={salon} />;
}
