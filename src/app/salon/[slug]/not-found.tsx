import Link from "next/link";

export default function SalonNotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f6efe6] px-6 text-center text-[#1c1410]">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#6b5e55]">
          404
        </p>
        <h1 className="serif-display mt-3 text-5xl">Salon not found</h1>
        <p className="mt-3 text-[#6b5e55]">
          That demo URL does not match a salon in the data file.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to directory
        </Link>
      </div>
    </main>
  );
}
