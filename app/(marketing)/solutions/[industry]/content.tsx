"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Shield,
  HardDrive,
  ChevronRight,
  Flame,
  Anchor,
  Beaker,
  CheckCircle2,
  ArrowRight,
  Lock,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-animations";
import { SpotlightCard } from "@/components/animations/spotlight-card";
import { CADUploadDrawer } from "@/components/cad-upload-drawer";
import { Button } from "@/components/ui/button";
import solutions from "@/data/solutions.json";
import products from "@/data/products.json";
import faqs from "@/data/faqs.json";
import { FAQPageSchema, BreadcrumbListSchema } from "@/components/structured-data";
import { SEOInternalLinks } from "@/components/seo-internal-links";
import { siteConfig } from "@/config/site";

const iconMap: Record<string, React.ElementType> = {
  flame: Flame,
  anchor: Anchor,
  shield: Shield,
  beaker: Beaker,
};

export function SolutionDetailContent({ industry }: { industry: string }) {
  const [cadDrawerOpen, setCadDrawerOpen] = useState(false);
  const solution = solutions.find((s) => s.slug === industry);

  if (!solution) {
    notFound();
  }

  const Icon = iconMap[solution.icon] || Shield;
  const recommendedProducts = products.filter((p) =>
    solution.recommendedProducts.includes(p.id)
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-white/[0.06] bg-zinc-950 pt-32 pb-16">
        <div className="container">
          <nav className="mb-8 flex items-center gap-2 font-mono text-[10px] text-zinc-600">
            <Link href="/" className="hover:text-zinc-400">HOME</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/solutions" className="hover:text-zinc-400">SOLUTIONS</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amber-500">{solution.name.toUpperCase()}</span>
          </nav>

          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-amber-500/10 bg-amber-500/[0.03]">
                <Icon className="h-8 w-8 text-amber-500/80" />
              </div>
              <div>
                <h1 className="font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                  {solution.name}
                </h1>
                <p className="mt-1 font-mono text-sm font-semibold text-zinc-400">
                  {solution.headline}
                </p>
              </div>
            </div>
            <p className="max-w-3xl font-mono text-xs leading-relaxed text-zinc-500">
              {solution.subheadline}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {solution.challenges.map((challenge, i) => (
              <ScrollReveal key={challenge.title} delay={i * 0.1}>
                <SpotlightCard className="p-6">
                  <h3 className="mb-3 font-mono text-sm font-bold tracking-wider text-red-400">
                    CHALLENGE 0{i + 1}
                  </h3>
                  <h4 className="font-sans text-lg font-bold text-zinc-100">
                    {challenge.title}
                  </h4>
                  <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-500">
                    {challenge.description}
                  </p>
                  <div className="mt-4 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.02] p-3">
                    <span className="font-mono text-[9px] font-semibold tracking-wider text-emerald-400">
                      OUR SOLUTION
                    </span>
                    <p className="mt-1 font-mono text-[10px] leading-relaxed text-zinc-400">
                      {challenge.ourSolution}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <ScrollReveal>
            <h2 className="mb-8 font-sans text-2xl font-bold tracking-tight text-zinc-100">
              Recommended Products for {solution.name}
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.1}>
                <Link href={`/products/${product.slug}`}>
                  <SpotlightCard className="group p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="spec-badge text-[10px]">
                        {product.exProofRating}
                      </span>
                      <span className="font-mono text-sm font-bold text-amber-500">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-100 transition-colors group-hover:text-amber-500">
                      {product.name}
                    </h3>
                    <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center gap-1 font-mono text-[10px] text-amber-500 opacity-0 transition-opacity group-hover:opacity-100">
                      VIEW SPECS
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* White-Label Message */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <ScrollReveal>
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] p-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-emerald-400" />
                <h3 className="font-mono text-sm font-bold tracking-wider text-emerald-400">
                  WHITE-LABEL & NDA-READY
                </h3>
              </div>
              <p className="font-mono text-xs leading-relaxed text-zinc-400">
                {solution.whiteLabelMessage}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100">
                Ready to Discuss Your {solution.name} Requirements?
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-mono text-xs leading-relaxed text-zinc-500">
                Send us your camera specifications and site conditions. Our engineers will
                recommend the optimal housing configuration with complete compliance documentation.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => setCadDrawerOpen(true)}
                >
                  <HardDrive className="h-4 w-4" />
                  SUBMIT PROJECT
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="gap-2">
                    CONTACT ENGINEERING
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== FAQ + SCHEMA + SEO LINKS ==================== */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <FAQPageSchema faqs={faqs.solutions} />
          <BreadcrumbListSchema
            items={[
              { name: "Home", url: siteConfig.url },
              { name: "Solutions", url: `${siteConfig.url}/solutions` },
              { name: solution.name, url: `${siteConfig.url}/solutions/${solution.slug}` },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100 mb-8">
                Hazardous Area Technical FAQ
              </h2>
              <div className="space-y-4">
                {faqs.solutions.map((faq, i) => (
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
                title="RECOMMENDED PRODUCTS"
                links={recommendedProducts.map((p) => ({
                  href: `/products/${p.slug}`,
                  text: `${p.name} — ${p.shortDescription}`,
                }))}
              />
              <SEOInternalLinks
                title="EXPLORE OTHER SOLUTIONS"
                links={solutions
                  .filter((s) => s.id !== solution.id)
                  .map((s) => ({
                    href: `/solutions/${s.slug}`,
                    text: `${s.name} — ${s.headline}`,
                  }))}
              />
              <SEOInternalLinks
                title="RELATED RESOURCES"
                links={[
                  { href: "/certifications", text: "ATEX/IECEx/UL Certification Documentation — Full Technical Specs" },
                  { href: "/products", text: "Complete Hazardous Area Product Catalog — All 12 Models" },
                  { href: "/contact", text: "Submit Project Specifications — Get Custom Quotation Within 12 Hours" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <CADUploadDrawer
        isOpen={cadDrawerOpen}
        onClose={() => setCadDrawerOpen(false)}
      />
    </div>
  );
}
