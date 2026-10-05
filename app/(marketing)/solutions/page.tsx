"use client";

import Link from "next/link";
import { Shield, Flame, Anchor, Beaker, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-animations";
import { SpotlightCard } from "@/components/animations/spotlight-card";
import solutions from "@/data/solutions.json";
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

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-white/[0.06] bg-zinc-950 pt-32 pb-16">
        <div className="container">
          <ScrollReveal>
            <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
              INDUSTRY SOLUTIONS
            </span>
            <h1 className="mt-2 font-sans text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
              Certified for Critical Environments
            </h1>
            <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-zinc-500">
              Pre-engineered enclosure solutions with complete certification documentation,
              material traceability, and pressure test reports — ready for EPC project submission.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {solutions.map((solution, i) => {
              const Icon = iconMap[solution.icon] || Shield;
              return (
                <ScrollReveal key={solution.id} delay={i * 0.1}>
                  <Link href={`/solutions/${solution.slug}`}>
                    <SpotlightCard className="group h-full p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-amber-500/10 bg-amber-500/[0.03]">
                          <Icon className="h-7 w-7 text-amber-500/80 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex-1">
                          <h2 className="font-mono text-lg font-bold tracking-wider text-zinc-100 transition-colors group-hover:text-amber-500">
                            {solution.name}
                          </h2>
                          <p className="mt-2 font-mono text-xs font-semibold text-zinc-400">
                            {solution.headline}
                          </p>
                          <p className="mt-3 font-mono text-[11px] leading-relaxed text-zinc-500">
                            {solution.subheadline}
                          </p>
                          <div className="mt-4 flex items-center gap-1 font-mono text-[10px] text-amber-500 opacity-0 transition-opacity group-hover:opacity-100">
                            VIEW FULL SOLUTION
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FAQ + SEO ==================== */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <FAQPageSchema faqs={faqs.solutions} />
          <BreadcrumbListSchema
            items={[
              { name: "Home", url: siteConfig.url },
              { name: "Industry Solutions", url: `${siteConfig.url}/solutions` },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100 mb-8">
                Hazardous Area Solutions FAQ
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
                title="CERTIFIED PRODUCTS"
                links={[
                  { href: "/products/exptz-316l-pro", text: "EXPTZ-316L Pro — ATEX Zone 1 Camera Housing for Oil & Gas" },
                  { href: "/products/marinepro-ss304", text: "MarinePro SS304 — C5-M Marine-Grade Enclosure for Offshore" },
                  { href: "/products/exptz-pan-tilt-hd", text: "EXPTZ Pan-Tilt HD — Thermal/Visible Dual-Sensor for Border Security" },
                  { href: "/products/explight-led-100w", text: "EXLight LED-100W — ATEX Floodlight for Chemical Plant Illumination" },
                ]}
              />
              <SEOInternalLinks
                title="RELATED RESOURCES"
                links={[
                  { href: "/certifications", text: "ATEX/IECEx/UL Certification — Equipment Marking & Standards Explained" },
                  { href: "/products", text: "Complete Product Catalog — 12 Models Across 4 Categories" },
                  { href: "/contact", text: "Submit EPC Project Specifications — Get Consolidated Quotation" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
