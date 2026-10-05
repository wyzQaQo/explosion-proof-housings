"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Shield,
  Flame,
  Anchor,
  Beaker,
  HardDrive,
  ArrowRight,
  ChevronRight,
  Building2,
  Globe,
  Lightbulb,
  Box,
  Cable,
  Zap,
  MapPin,
  Factory,
  Waves,
  ShoppingCart,
} from "lucide-react";
import { IndustrialParticles } from "@/components/animations/industrial-particles";
import { ScrollReveal, CountUp } from "@/components/animations/scroll-animations";
import { SpotlightCard, GlareHover } from "@/components/animations/spotlight-card";
import { CADUploadDrawer } from "@/components/cad-upload-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import products from "@/data/products.json";
import solutions from "@/data/solutions.json";
import faqs from "@/data/faqs.json";
import { FAQPageSchema, BreadcrumbListSchema } from "@/components/structured-data";
import { SEOInternalLinks } from "@/components/seo-internal-links";
import { siteConfig } from "@/config/site";

const stats = [
  { label: "Certified Products", value: 24, suffix: "+" },
  { label: "Countries Deployed", value: 47, suffix: "+" },
  { label: "Engineers Worldwide", value: 200, suffix: "+" },
  { label: "Years of R&D", value: 14, suffix: "" },
];

const iconMap: Record<string, React.ElementType> = {
  flame: Flame,
  anchor: Anchor,
  shield: Shield,
  beaker: Beaker,
};

const productCategories = [
  {
    name: "Explosion-Proof Camera Housing",
    slug: "explosion-proof",
    icon: Shield,
    description: "ATEX/IECEx-certified 316L stainless steel PTZ & fixed enclosures for Zone 1/2 hazardous area surveillance.",
    itemCount: products.filter((p) => p.category === "explosion-proof").length,
  },
  {
    name: "Explosion-Proof Light",
    slug: "explosion-proof-light",
    icon: Lightbulb,
    description: "High-output LED floodlights & compact luminaires with ATEX certification for process area illumination.",
    itemCount: products.filter((p) => p.category === "explosion-proof-light").length,
  },
  {
    name: "Junction Box",
    slug: "junction-box",
    icon: Box,
    description: "Ex e/Ex d certified terminal enclosures for hazardous area power distribution & signal marshalling.",
    itemCount: products.filter((p) => p.category === "junction-box").length,
  },
  {
    name: "Cable Gland",
    slug: "cable-gland",
    icon: Cable,
    description: "Precision-machined 316L/304 SS barrier glands with dual Ex d/Ex e certification & full PMI traceability.",
    itemCount: products.filter((p) => p.category === "cable-gland").length,
  },
];

const markets = [
  {
    region: "Middle East",
    icon: Globe,
    countries: "UAE · Saudi Arabia · Qatar · Oman · Kuwait",
    highlights: ["ADNOC approved vendor", "Aramco 9COM compliant", "Dubai stock warehouse", "GCC local currency billing"],
    color: "from-amber-500/10 to-amber-500/0",
  },
  {
    region: "United States",
    icon: Shield,
    countries: "Texas · Louisiana · California · Gulf Coast",
    highlights: ["UL 1203 listed products", "NDAA Section 889 compliant", "Houston-area logistics hub", "FOB Gulf Port shipping"],
    color: "from-blue-500/10 to-blue-500/0",
  },
  {
    region: "Africa",
    icon: MapPin,
    countries: "Nigeria · Angola · Egypt · Mozambique · South Africa",
    highlights: ["Lagos bonded warehouse", "SONCAP certified", "Local freight forwarding", "Mombasa/Durban port routes"],
    color: "from-emerald-500/10 to-emerald-500/0",
  },
];

const customerSegments = [
  {
    name: "Oil Field",
    icon: Zap,
    description: "Upstream drilling & production facilities requiring Zone 1 certified electrical equipment. Our products serve desert rigs, gas injection stations, and wellhead monitoring systems across the Middle East and North Africa.",
    painPoints: ["Extreme 55°C+ ambient temperatures", "Sand/dust abrasion in desert deployments", "H₂S sour gas corrosion attack", "Remote maintenance logistics"],
    keyProducts: ["EXPTZ-316L Pro", "EXJB-316L 6-Way", "EXCG-316L M25"],
  },
  {
    name: "LNG",
    icon: Waves,
    description: "Liquefied natural gas processing trains, cryogenic storage tanks, and marine loading arms. Equipment must function reliably at cryogenic temperatures while maintaining Ex certification for methane-rich atmospheres.",
    painPoints: ["Cryogenic resilience (-162°C LNG contact)", "Methane gas group IIC ignition prevention", "Marine salt atmosphere on loading jetties", "SIL-rated safety instrument integration"],
    keyProducts: ["EXPTZ-316L Pro", "MarinePro SS304", "EXJB-SS304 4-Way"],
  },
  {
    name: "Chemical Plant",
    icon: Factory,
    description: "Downstream petrochemical crackers, polymerization reactors, and specialty chemical batch plants. Aggressive chemical vapors demand superior material selection — standard industrial equipment fails within months.",
    painPoints: ["HCl, Cl₂, SO₂ aggressive vapor corrosion", "CIP/SIP high-pressure chemical washdown", "Explosive dust atmospheres (Zone 21/22)", "FFKM elastomer sealing requirements"],
    keyProducts: ["EXPTZ-316L Pro", "EXLight LED-100W", "EXCG-316L M25"],
  },
];

export default function HomePage() {
  const [cadDrawerOpen, setCadDrawerOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div className="relative">
      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <IndustrialParticles />
        <div className="absolute inset-0 -z-10 industrial-grid opacity-30" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/3 h-[500px] w-[500px] rounded-full bg-zinc-400/[0.02] blur-[100px]" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container relative z-10 py-32"
        >
          <div className="mx-auto max-w-5xl">
            <ScrollReveal delay={0.1}>
              <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-amber-500">
                    ATEX · IECEx · UL CERTIFIED — SUPPLIER TO OIL FIELD · LNG · CHEMICAL
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="text-center font-sans text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="text-zinc-100">Explosion-Proof</span>
                <br />
                <span className="text-gradient-amber">Hazardous Area Solutions</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="mx-auto mt-8 max-w-2xl text-center font-mono text-sm leading-relaxed text-zinc-400">
                One certified partner for your entire hazardous area electrical package.
                Camera housings, LED floodlights, junction boxes, and cable glands — all
                ATEX/IECEx certified, all from a single engineering center with full material
                traceability. Ready for Middle East, US, and Africa EPC project deployment.
              </p>
            </ScrollReveal>

            {/* 4 Pillar Quick Links */}
            <ScrollReveal delay={0.5}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?cat=${cat.slug}`}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.01] p-4 transition-all hover:border-amber-500/20 hover:bg-amber-500/[0.03]"
                  >
                    <cat.icon className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-amber-500" />
                    <span className="font-mono text-[9px] font-semibold tracking-wider text-zinc-500 transition-colors group-hover:text-zinc-300">
                      {cat.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    <Shield className="h-4 w-4" />
                    VIEW ALL PRODUCTS
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() => setCadDrawerOpen(true)}
                >
                  <HardDrive className="h-4 w-4" />
                  SUBMIT CAD / RFQ
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.8}>
              <div className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-mono text-3xl font-bold tracking-tight text-amber-500 sm:text-4xl">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 font-mono text-[10px] font-semibold tracking-[0.2em] text-zinc-500">
                      {stat.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
      </section>

      {/* ==================== PRODUCT CATEGORIES OVERVIEW ==================== */}
      <section className="relative py-24">
        <div className="container">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
                COMPLETE HAZARDOUS AREA SOLUTION
              </span>
              <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                Four Product Lines. One Certified Partner.
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-mono text-xs leading-relaxed text-zinc-500">
                Stop coordinating four separate vendors. Get your entire hazardous area electrical
                package — camera housings, lights, junction boxes, and cable glands — from a single
                manufacturer with unified certification documentation and volume discount pricing.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-4">
            {productCategories.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.1}>
                <Link href={`/products?cat=${cat.slug}`}>
                  <SpotlightCard className="group h-full p-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/10 bg-amber-500/[0.03]">
                      <cat.icon className="h-8 w-8 text-amber-500/70 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-100 transition-colors group-hover:text-amber-500">
                      {cat.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] leading-relaxed text-zinc-500">
                      {cat.description}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-500">
                        {cat.itemCount} Models
                      </span>
                      <ArrowRight className="h-3 w-3 text-amber-500/50 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </SpotlightCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="relative py-24">
        <div className="container">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
                  FEATURED PRODUCTS
                </span>
                <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                  One-Vendor Electrical Package
                </h2>
                <p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-zinc-500">
                  Camera housing, LED light, junction box, cable gland — all ATEX/IECEx certified,
                  all shipped with full material traceability from a single engineering center.
                </p>
              </div>
              <Link
                href="/products"
                className="hidden items-center gap-1 font-mono text-xs text-amber-500 transition-colors hover:text-amber-400 sm:flex"
              >
                VIEW ALL
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products
              .filter((p) => p.featured)
              .slice(0, 4)
              .map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.1}>
                  <Link href={`/products/${product.slug}`}>
                    <GlareHover>
                      <SpotlightCard className="group h-full p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <Badge variant="spec">{product.categoryName}</Badge>
                          <span className="font-mono text-xs font-bold text-amber-500">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="mb-4 flex h-36 items-center justify-center rounded-lg border border-white/[0.04] bg-zinc-900/50">
                          <div className="text-center">
                            <Shield className="mx-auto h-10 w-10 text-zinc-700" />
                            <p className="mt-1 font-mono text-[9px] text-zinc-600 line-clamp-1">
                              {product.materialGrade}
                            </p>
                          </div>
                        </div>
                        <h3 className="font-mono text-xs font-bold tracking-wider text-zinc-100 line-clamp-1 transition-colors group-hover:text-amber-500">
                          {product.name}
                        </h3>
                        <p className="mt-2 font-mono text-[10px] leading-relaxed text-zinc-500 line-clamp-2">
                          {product.shortDescription}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <span className="spec-badge text-[8px]">{product.exProofRating}</span>
                          <span className="spec-badge text-[8px]">{product.ipRating}</span>
                        </div>
                      </SpotlightCard>
                    </GlareHover>
                  </Link>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* ==================== CUSTOMER SEGMENTS ==================== */}
      <section className="relative py-24">
        <div className="container">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
                WHO WE SERVE
              </span>
              <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                Trusted by Oil Field · LNG · Chemical
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {customerSegments.map((segment, i) => (
              <ScrollReveal key={segment.name} delay={i * 0.1}>
                <SpotlightCard className="h-full p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/10 bg-amber-500/[0.03]">
                      <segment.icon className="h-5 w-5 text-amber-500/70" />
                    </div>
                    <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-100">
                      {segment.name}
                    </h3>
                  </div>
                  <p className="font-mono text-[10px] leading-relaxed text-zinc-500">
                    {segment.description}
                  </p>
                  <div className="mt-4 space-y-1.5">
                    {segment.painPoints.map((pain) => (
                      <div key={pain} className="flex items-start gap-2">
                        <span className="mt-0.5 block h-1 w-1 rounded-full bg-red-500/60" />
                        <span className="font-mono text-[10px] text-zinc-500">{pain}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {segment.keyProducts.map((kp) => (
                      <span key={kp} className="rounded border border-amber-500/15 bg-amber-500/[0.03] px-2 py-0.5 font-mono text-[9px] text-amber-500">
                        {kp}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* ==================== GLOBAL MARKETS ==================== */}
      <section className="relative py-24">
        <div className="container">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
                GLOBAL MARKET PRESENCE
              </span>
              <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                Middle East · USA · Africa
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-mono text-xs leading-relaxed text-zinc-500">
                Regional warehouse stock, local certification compliance, and in-market logistics
                partners for rapid EPC project delivery across our three core markets.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {markets.map((market, i) => (
              <ScrollReveal key={market.region} delay={i * 0.1}>
                <div className={cn(
                  "relative overflow-hidden rounded-xl border border-white/[0.06] bg-metal-card p-6",
                )}>
                  <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", market.color)} />
                  <div className="mt-2 mb-4 flex items-center gap-3">
                    <market.icon className="h-5 w-5 text-amber-500/60" />
                    <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-100">
                      {market.region}
                    </h3>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-500">{market.countries}</p>
                  <div className="mt-4 space-y-2">
                    {market.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 rounded border border-white/[0.04] bg-white/[0.01] px-3 py-2">
                        <ShoppingCart className="h-3 w-3 text-emerald-400/60" />
                        <span className="font-mono text-[10px] text-zinc-400">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* ==================== SOLUTIONS ==================== */}
      <section className="relative py-24">
        <div className="container">
          <ScrollReveal>
            <div className="mb-12">
              <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
                CERTIFIED FOR CRITICAL ENVIRONMENTS
              </span>
              <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                Industry Solutions
              </h2>
              <p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-zinc-500">
                Pre-engineered solutions with complete certification packages, material traceability,
                and pressure test reports — ready for EPC project submission.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution, i) => {
              const Icon = iconMap[solution.icon] || Shield;
              return (
                <ScrollReveal key={solution.id} delay={i * 0.1}>
                  <Link href={`/solutions/${solution.slug}`}>
                    <SpotlightCard className="group h-full p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-amber-500/10 bg-amber-500/[0.03]">
                        <Icon className="h-6 w-6 text-amber-500/80 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-100 transition-colors group-hover:text-amber-500">
                        {solution.name}
                      </h3>
                      <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-500 line-clamp-3">
                        {solution.headline}
                      </p>
                      <div className="mt-4 flex items-center gap-1 font-mono text-[10px] text-amber-500 opacity-0 transition-opacity group-hover:opacity-100">
                        EXPLORE SOLUTION
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </SpotlightCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* ==================== CERTIFICATIONS ==================== */}
      <section className="relative py-24">
        <div className="container">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-amber-500/10 bg-metal-card p-8 sm:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <Shield className="mx-auto h-12 w-12 text-amber-500" />
                <h2 className="mt-4 font-sans text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                  Certification-First Engineering
                </h2>
                <p className="mt-3 font-mono text-xs leading-relaxed text-zinc-400">
                  Every product ships with complete certification documentation: ATEX EU-Type
                  Examination Certificate, IECEx Certificate of Conformity, UL Listing report,
                  material mill test certificates (EN 10204 3.1), hydrostatic pressure test
                  reports, and dimensional FAIR per AS9102 standards.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 font-mono text-xs text-emerald-400">ATEX 2014/34/EU</span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 font-mono text-xs text-emerald-400">IECEx</span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 font-mono text-xs text-emerald-400">UL 1203</span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 font-mono text-xs text-emerald-400">ISO 9001:2015</span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 font-mono text-xs text-emerald-400">IP68 / IP69K</span>
                </div>
                <div className="mt-6">
                  <Link href="/certifications">
                    <Button variant="outline" size="sm" className="gap-2">
                      VIEW ALL CERTIFICATIONS
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CAD CTA ==================== */}
      <section className="relative py-24">
        <div className="container">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 sm:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
                    ONE-VENDOR PACKAGE RFQ
                  </span>
                  <h2 className="mt-2 font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                    Need a Complete Electrical Package?
                  </h2>
                  <p className="mt-4 font-mono text-xs leading-relaxed text-zinc-400">
                    Send us your site specifications and we&apos;ll quote the full package:
                    camera housing, LED lights, junction boxes, and cable glands — all ATEX/IECEx
                    certified from a single manufacturer. Drag your CAD files or spec sheets here.
                    Typical turnaround: 48-hour package quotation with consolidated certification docs.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="spec-badge text-[9px]">CAMERA HOUSING</span>
                    <span className="spec-badge text-[9px]">LED LIGHT</span>
                    <span className="spec-badge text-[9px]">JUNCTION BOX</span>
                    <span className="spec-badge text-[9px]">CABLE GLAND</span>
                  </div>
                  <div className="mt-6">
                    <Button
                      size="lg"
                      className="gap-2"
                      onClick={() => setCadDrawerOpen(true)}
                    >
                      <HardDrive className="h-4 w-4" />
                      SUBMIT PACKAGE RFQ
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-center">
                  <div className="relative">
                    <div className="flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-dashed border-amber-500/20 bg-amber-500/[0.02]">
                      <div className="text-center">
                        <HardDrive className="mx-auto h-16 w-16 text-amber-500/30" />
                        <p className="mt-3 font-mono text-xs text-zinc-500">DRAG CAD / SPEC SHEETS</p>
                      </div>
                    </div>
                    <div className="absolute -right-4 -top-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[9px] text-emerald-400">TLS 1.3 ENCRYPTED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHITE-LABEL ==================== */}
      <section className="relative pb-24">
        <div className="container">
          <ScrollReveal>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-zinc-500" />
                <Globe className="h-5 w-5 text-zinc-500" />
              </div>
              <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-300">
                WHITE-LABEL HARDWARE — EPC READY
              </h3>
              <p className="mx-auto mt-2 max-w-2xl font-mono text-[11px] leading-relaxed text-zinc-500">
                Fully de-branded hardware for system integrators and EPC contractors. Complete
                certification packages, ADNOC/Aramco compliant documentation, NDAA Section 889
                certified, and Dubai/Lagos/Houston warehouse stock availability.
                <span className="text-amber-500"> Mutual NDA available before quotation.</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== FAQ + SEO INTERNAL LINKS ==================== */}
      <section className="relative py-24 border-t border-white/[0.06]">
        <div className="container">
          <FAQPageSchema faqs={faqs.homepage} />
          <BreadcrumbListSchema
            items={[
              { name: "Home", url: siteConfig.url },
              {
                name: "Explosion-Proof Hazardous Area Equipment",
                url: siteConfig.url,
              },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            {/* FAQ Section */}
            <div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.homepage.slice(0, 5).map((faq, i) => (
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

            {/* SEO Internal Links */}
            <div className="space-y-8">
              <SEOInternalLinks
                title="EXPLORE PRODUCTS"
                links={[
                  { href: "/products/exptz-316l-pro", text: "EXPTZ-316L Pro — 316L Stainless Steel Explosion-Proof Camera Housing" },
                  { href: "/products/exptz-pan-tilt-hd", text: "EXPTZ Pan-Tilt HD — Heavy-Duty ATEX Pan-Tilt with Thermal Payload" },
                  { href: "/products/explight-led-100w", text: "EXLight LED-100W — ATEX 100W Explosion-Proof LED Floodlight" },
                  { href: "/products/exjb-316l-6way", text: "EXJB-316L 6-Way — Ex e Hazardous Area Junction Box" },
                  { href: "/products/excg-ss316l-m25", text: "EXCG-316L M25 — Dual-Certified Ex d/Ex e Cable Gland" },
                  { href: "/products/marinepro-ss304", text: "MarinePro SS304 — C5-M Marine-Grade PTZ Camera Enclosure" },
                ]}
              />
              <SEOInternalLinks
                title="INDUSTRY SOLUTIONS"
                links={[
                  { href: "/solutions/oil-gas", text: "Oil & Gas Refinery — Zone 1 Hazardous Area Surveillance Systems" },
                  { href: "/solutions/marine-offshore", text: "Marine & Offshore Platform — Salt-Spray Proof Camera Enclosures" },
                  { href: "/solutions/border-security", text: "Border & Critical Infrastructure — NDAA-Compliant Surveillance" },
                  { href: "/solutions/chemical", text: "Chemical Processing — IP69K Washdown-Proof Camera Housings" },
                ]}
              />
              <SEOInternalLinks
                title="CERTIFICATION & COMPLIANCE"
                links={[
                  { href: "/certifications", text: "ATEX 2014/34/EU Certification — EU Explosion-Proof Equipment Directive" },
                  { href: "/certifications", text: "IECEx International Certification System — 35+ Country Acceptance" },
                  { href: "/certifications", text: "UL 1203 Listed — North American Explosion-Proof Standard (NEC/CEC)" },
                  { href: "/certifications", text: "IP68/IP69K Ingress Protection — Submersion & High-Pressure Washdown Rated" },
                ]}
              />
              <SEOInternalLinks
                title="MARKETS & CUSTOMERS"
                links={[
                  { href: "/solutions/oil-gas", text: "Middle East Oil Field Explosion-Proof Equipment — Aramco/ADNOC Compliant" },
                  { href: "/products?cat=cable-gland", text: "LNG Plant Hazardous Area Cable Glands — Cryogenic Rated" },
                  { href: "/products/exptz-316l-pro", text: "Chemical Plant ATEX Camera Housing — HCl & Cl₂ Resistant 316L" },
                  { href: "/products?cat=explosion-proof", text: "Africa Zone 1 Surveillance Equipment — SONCAP Certified, Lagos Stock" },
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
