"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Shield, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-animations";
import { SpotlightCard, GlareHover } from "@/components/animations/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import products from "@/data/products.json";
import faqs from "@/data/faqs.json";
import { FAQPageSchema, BreadcrumbListSchema, ItemListSchema } from "@/components/structured-data";
import { SEOInternalLinks } from "@/components/seo-internal-links";
import { siteConfig } from "@/config/site";

const categories = [
  { value: "all", label: "All Products" },
  { value: "explosion-proof", label: "Camera Housing" },
  { value: "marine-grade", label: "Marine-Grade" },
  { value: "explosion-proof-light", label: "Ex-Proof Light" },
  { value: "junction-box", label: "Junction Box" },
  { value: "cable-gland", label: "Cable Gland" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.material.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "all" || p.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-white/[0.06] bg-zinc-950 pt-32 pb-16">
        <div className="container">
          <ScrollReveal>
            <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
              PRODUCT CATALOG
            </span>
            <h1 className="mt-2 font-sans text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
              Camera Housing Systems
            </h1>
            <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-zinc-500">
              Every product ships with full material traceability, hydrostatic pressure test
              report, dimensional FAIR, and applicable ATEX/IECEx/UL certification documents.
            </p>
          </ScrollReveal>

          {/* Filters */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "rounded border px-4 py-2 font-mono text-[11px] font-semibold tracking-wider transition-all",
                    activeCategory === cat.value
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                      : "border-white/[0.06] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, materials, certifications..."
                className="w-full rounded border border-white/[0.08] bg-white/[0.02] py-2 pl-9 pr-4 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none sm:w-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.05}>
                  <Link href={`/products/${product.slug}`}>
                    <GlareHover>
                      <SpotlightCard className="group h-full p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Badge variant={product.category === "explosion-proof" ? "spec" : "default"}>
                            {product.categoryName}
                          </Badge>
                          <span className="font-mono text-sm font-bold text-amber-500">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Image placeholder */}
                        <div className="mb-4 flex h-48 items-center justify-center rounded-lg border border-white/[0.04] bg-zinc-900/50">
                          <div className="text-center">
                            <Shield className="mx-auto h-12 w-12 text-zinc-700 transition-transform duration-500 group-hover:scale-110 group-hover:text-zinc-600" />
                            <p className="mt-2 font-mono text-[9px] text-zinc-600">
                              {product.materialGrade}
                            </p>
                          </div>
                        </div>

                        <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-100 transition-colors group-hover:text-amber-500">
                          {product.name}
                        </h3>
                        <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-500 line-clamp-2">
                          {product.shortDescription}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          <span className="spec-badge flex items-center gap-1 text-[9px]">
                            {product.exProofRating}
                          </span>
                          <span className="spec-badge flex items-center gap-1 text-[9px]">
                            {product.ipRating}
                          </span>
                          <span className="spec-badge flex items-center gap-1 text-[9px]">
                            {product.materialGrade}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center gap-1 font-mono text-[10px] text-amber-500 opacity-0 transition-opacity group-hover:opacity-100">
                          VIEW TECHNICAL SPECS
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </SpotlightCard>
                    </GlareHover>
                  </Link>
                </ScrollReveal>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <Shield className="mx-auto h-12 w-12 text-zinc-700" />
              <p className="mt-4 font-mono text-sm text-zinc-500">
                No products match your criteria.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-2 font-mono text-xs text-amber-500 hover:text-amber-400"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==================== FAQ + SEO ==================== */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <FAQPageSchema faqs={faqs.products} />
          <BreadcrumbListSchema
            items={[
              { name: "Home", url: siteConfig.url },
              { name: "Hazardous Area Products", url: `${siteConfig.url}/products` },
            ]}
          />
          <ItemListSchema
            items={products.slice(0, 12).map((p) => ({
              name: p.name,
              slug: p.slug,
              description: p.shortDescription,
            }))}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100 mb-8">
                Explosion-Proof Equipment FAQ
              </h2>
              <div className="space-y-4">
                {faqs.products.map((faq, i) => (
                  <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-5">
                    <h3 className="font-mono text-xs font-bold tracking-wider text-zinc-200 mb-2">
                      {faq.question}
                    </h3>
                    <p className="font-mono text-[10px] leading-relaxed text-zinc-500">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <SEOInternalLinks
                title="PRODUCT CATEGORIES"
                links={[
                  { href: "/products?cat=explosion-proof", text: "Explosion-Proof Camera Housings — ATEX/IECEx Zone 1/2 PTZ Enclosures" },
                  { href: "/products?cat=explosion-proof-light", text: "Explosion-Proof LED Lights — ATEX 100W/50W Floodlights & Luminaires" },
                  { href: "/products?cat=junction-box", text: "Hazardous Area Junction Boxes — Ex e 316L/304 Terminal Enclosures" },
                  { href: "/products?cat=cable-gland", text: "Ex d/Ex e Cable Glands — M16-M40 Dual-Certified Stainless Steel" },
                  { href: "/products?cat=marine-grade", text: "Marine-Grade Enclosures — C5-M Salt Spray Rated Camera Housings" },
                ]}
              />
              <SEOInternalLinks
                title="INDUSTRY SOLUTIONS"
                links={[
                  { href: "/solutions/oil-gas", text: "Oil & Gas Refinery — Zone 1 ATEX Certified Surveillance" },
                  { href: "/solutions/marine-offshore", text: "Marine & Offshore — C5-M Corrosion Rated Camera Enclosures" },
                  { href: "/contact", text: "Request Custom CNC Bracket Quotation — 48-Hour Turnaround" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
