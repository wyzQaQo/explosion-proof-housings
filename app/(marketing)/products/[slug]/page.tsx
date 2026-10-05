import { ProductDetailContent } from "./content";
import products from "@/data/products.json";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <ProductDetailContent slug={params.slug} />;
}
