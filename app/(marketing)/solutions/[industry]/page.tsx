import { SolutionDetailContent } from "./content";
import solutions from "@/data/solutions.json";

export function generateStaticParams() {
  return solutions.map((s) => ({ industry: s.slug }));
}

export default function SolutionDetailPage({
  params,
}: {
  params: { industry: string };
}) {
  return <SolutionDetailContent industry={params.industry} />;
}
