import { Directory } from "@/components/directory/Directory";
import { getAllSalons } from "@/lib/salons";

export default function HomePage() {
  const salons = getAllSalons();
  return <Directory salons={salons} />;
}
