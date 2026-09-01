import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f6efe6] px-6 text-center">
      <div>
        <h1 className="serif-display text-5xl">Page not found</h1>
        <Link href="/" className="btn-primary mt-8">
          Home
        </Link>
      </div>
    </main>
  );
}
