"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Shield,
  HardDrive,
  ChevronRight,
  Ruler,
  Layers,
  CheckCircle2,
  Thermometer,
  Weight,
  Wrench,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-animations";
import { SpotlightCard } from "@/components/animations/spotlight-card";
import { CADUploadDrawer } from "@/components/cad-upload-drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import products from "@/data/products.json";
import faqs from "@/data/faqs.json";
import { ProductSchema, FAQPageSchema, BreadcrumbListSchema } from "@/components/structured-data";
import { SEOInternalLinks } from "@/components/seo-internal-links";
import { siteConfig } from "@/config/site";

export function ProductDetailContent({ slug }: { slug: string }) {
  const [cadDrawerOpen, setCadDrawerOpen] = useState(false);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-white/[0.06] bg-zinc-950 pt-32 pb-12">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 font-mono text-[10px] text-zinc-600">
            <Link href="/" className="hover:text-zinc-400">HOME</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-zinc-400">PRODUCTS</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amber-500">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <ScrollReveal>
              <div className="flex h-80 items-center justify-center rounded-xl border border-white/[0.06] bg-metal-card lg:h-[500px]">
                <div className="text-center">
                  <Shield className="mx-auto h-20 w-20 text-zinc-700" />
                  <p className="mt-4 font-mono text-xs text-zinc-600">
                    {product.material}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Product Info */}
            <ScrollReveal direction="right">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="spec">{product.categoryName}</Badge>
                  {product.exProofRating !== "N/A — Non-hazardous area" && (
                    <Badge variant="cert">ATEX CERTIFIED</Badge>
                  )}
                </div>

                <h1 className="font-sans text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                  {product.name}
                </h1>

                <div className="mt-4 font-mono text-3xl font-bold text-amber-500">
                  ${product.price.toLocaleString()}
                  <span className="ml-2 font-mono text-xs font-normal text-zinc-600">
                    USD / unit
                  </span>
                </div>

                <p className="mt-6 font-mono text-xs leading-relaxed text-zinc-400">
                  {product.description}
                </p>

                {/* Critical Specs Grid */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-3">
                    <span className="font-mono text-[9px] font-semibold tracking-wider text-zinc-500">MATERIAL</span>
                    <p className="mt-1 font-mono text-xs font-bold text-zinc-200">
                      {product.materialGrade}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-3">
                    <span className="font-mono text-[9px] font-semibold tracking-wider text-zinc-500">EX RATING</span>
                    <p className="mt-1 font-mono text-[10px] font-bold leading-tight text-amber-500">
                      {product.exProofRating}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-3">
                    <span className="font-mono text-[9px] font-semibold tracking-wider text-zinc-500">IP RATING</span>
                    <p className="mt-1 font-mono text-xs font-bold text-zinc-200">
                      {product.ipRating}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-3">
                    <span className="font-mono text-[9px] font-semibold tracking-wider text-zinc-500">TEMP RANGE</span>
                    <p className="mt-1 font-mono text-[10px] font-bold text-zinc-200">
                      {product.tempRange}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={() => setCadDrawerOpen(true)}
                  >
                    <HardDrive className="h-4 w-4" />
                    REQUEST CAD QUOTATION
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Shield className="h-4 w-4" />
                    DOWNLOAD DATASHEET
                  </Button>
                </div>

                <p className="mt-3 font-mono text-[10px] text-zinc-600">
                  Volume pricing available for 10+ units. Contact us for EPC project quotations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Dimension Matrix */}
            <ScrollReveal className="lg:col-span-2">
              <SpotlightCard className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/10 bg-amber-500/[0.03]">
                    <Ruler className="h-5 w-5 text-amber-500/80" />
                  </div>
                  <div>
                    <h2 className="font-mono text-sm font-bold tracking-wider text-zinc-100">
                      INTERNAL USABLE SPACE MATRIX
                    </h2>
                    <p className="font-mono text-[10px] text-zinc-500">
                      Critical dimensions for camera compatibility verification
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="pb-3 pr-4 font-mono text-[10px] font-semibold tracking-wider text-zinc-500">
                          PARAMETER
                        </th>
                        <th className="pb-3 pr-4 font-mono text-[10px] font-semibold tracking-wider text-zinc-500">
                          DIMENSION
                        </th>
                        <th className="pb-3 font-mono text-[10px] font-semibold tracking-wider text-zinc-500">
                          NOTES
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          label: "Usable Internal Length",
                          value: product.internalDimensions.usableLength,
                          note: "Between front window and rear gland plate",
                        },
                        {
                          label: "Usable Internal Diameter",
                          value: product.internalDimensions.usableDiameter,
                          note: "Clear bore for camera body",
                        },
                        {
                          label: "Max Camera Dimensions",
                          value: product.internalDimensions.maxCameraSize,
                          note: "L × W × H",
                        },
                        {
                          label: "Window Thickness",
                          value: product.internalDimensions.windowThickness,
                          note: "Tempered optical-grade glass",
                        },
                        {
                          label: "Total Length (External)",
                          value: product.externalDimensions.totalLength,
                          note: "Including sunshield",
                        },
                        {
                          label: "Body Diameter (External)",
                          value: product.externalDimensions.bodyDiameter,
                          note: "Main housing body",
                        },
                        {
                          label: "Sunshield Width",
                          value: product.externalDimensions.sunshieldWidth,
                          note: "Maximum width",
                        },
                        {
                          label: "Net Weight",
                          value: product.weight,
                          note: product.finish,
                        },
                      ].map((row) => (
                        <tr
                          key={row.label}
                          className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.01]"
                        >
                          <td className="py-3 pr-4 font-mono text-[11px] font-semibold text-zinc-300">
                            {row.label}
                          </td>
                          <td className="py-3 pr-4 font-mono text-[11px] text-amber-500">
                            {row.value}
                          </td>
                          <td className="py-3 font-mono text-[10px] text-zinc-600">
                            {row.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <ScrollReveal direction="right">
                <SpotlightCard className="p-6">
                  <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-zinc-100">
                    CERTIFICATIONS
                  </h3>
                  <div className="space-y-2">
                    {product.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="flex items-center gap-2 rounded border border-emerald-500/10 bg-emerald-500/[0.02] px-3 py-2"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="font-mono text-[10px] text-emerald-400">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.1}>
                <SpotlightCard className="p-6">
                  <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-zinc-100">
                    CAMERA COMPATIBILITY
                  </h3>
                  <div className="space-y-1.5">
                    {product.compatibility.map((cam) => (
                      <div
                        key={cam}
                        className="flex items-center gap-2 rounded px-3 py-1.5 text-zinc-400"
                      >
                        <Layers className="h-3 w-3 text-zinc-600" />
                        <span className="font-mono text-[10px]">{cam}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <SpotlightCard className="p-6">
                  <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-zinc-100">
                    ADDITIONAL SPECS
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Thermometer className="mt-0.5 h-4 w-4 text-zinc-600" />
                      <div>
                        <p className="font-mono text-[10px] text-zinc-500">Temperature Range</p>
                        <p className="font-mono text-[10px] text-zinc-300">{product.tempRange}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Weight className="mt-0.5 h-4 w-4 text-zinc-600" />
                      <div>
                        <p className="font-mono text-[10px] text-zinc-500">Weight</p>
                        <p className="font-mono text-[10px] text-zinc-300">{product.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="mt-0.5 h-4 w-4 text-zinc-600" />
                      <div>
                        <p className="font-mono text-[10px] text-zinc-500">Surface Finish</p>
                        <p className="font-mono text-[10px] text-zinc-300">{product.finish}</p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="container">
          <ScrollReveal>
            <h2 className="mb-8 font-sans text-2xl font-bold tracking-tight text-zinc-100">
              Key Features
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((feature, i) => (
              <ScrollReveal key={feature} delay={i * 0.05}>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.01] p-4">
                  <CheckCircle2 className="mb-2 h-4 w-4 text-amber-500/60" />
                  <p className="font-mono text-[11px] leading-relaxed text-zinc-400">
                    {feature}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal>
            <h2 className="mb-8 font-sans text-2xl font-bold tracking-tight text-zinc-100">
              Target Applications
            </h2>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {product.applications.map((app, i) => (
              <ScrollReveal key={app} delay={i * 0.05}>
                <span className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.01] px-4 py-2 font-mono text-[10px] text-zinc-400">
                  {app}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-amber-500/10 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 text-center sm:p-12">
              <HardDrive className="mx-auto h-10 w-10 text-amber-500" />
              <h2 className="mt-4 font-sans text-2xl font-bold tracking-tight text-zinc-100">
                Need Custom CNC Brackets?
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-mono text-xs leading-relaxed text-zinc-400">
                Drag your 3D CAD files (.STEP, .STP, .DWG, .DXF) and our engineers
                will design precision CNC brackets to fit your camera into this housing.
              </p>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => setCadDrawerOpen(true)}
                >
                  <HardDrive className="h-4 w-4" />
                  SUBMIT 3D MODEL
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== FAQ + SCHEMA + SEO LINKS ==================== */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <ProductSchema product={{
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            category: product.categoryName,
            material: product.materialGrade,
            exProofRating: product.exProofRating,
            ipRating: product.ipRating,
            certifications: product.certifications,
          }} />
          <FAQPageSchema faqs={faqs.products} />
          <BreadcrumbListSchema
            items={[
              { name: "Home", url: siteConfig.url },
              { name: "Products", url: `${siteConfig.url}/products` },
              { name: product.name, url: `${siteConfig.url}/products/${product.slug}` },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.products.slice(0, 5).map((faq, i) => (
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
                title="RELATED PRODUCTS"
                links={products
                  .filter((p) => p.id !== product.id)
                  .slice(0, 4)
                  .map((p) => ({
                    href: `/products/${p.slug}`,
                    text: `${p.name} — ${p.shortDescription}`,
                  }))}
              />
              <SEOInternalLinks
                title="COMPLETE YOUR PACKAGE"
                links={[
                  { href: "/products?cat=explosion-proof-light", text: "Explosion-Proof LED Lights — ATEX Certified for Zone 1/2 Illumination" },
                  { href: "/products?cat=junction-box", text: "Hazardous Area Junction Boxes — Ex e 316L/304 Signal & Power Distribution" },
                  { href: "/products?cat=cable-gland", text: "Ex d/Ex e Cable Glands — 316L Stainless Steel M16-M40 Sizes" },
                  { href: "/solutions/oil-gas", text: "Oil & Gas Refinery — Complete Zone 1 Surveillance Solution" },
                ]}
              />
              <SEOInternalLinks
                title="CERTIFICATION DOCUMENTS"
                links={[
                  { href: "/certifications", text: "ATEX 2014/34/EU — EU Explosion-Proof Equipment Directive" },
                  { href: "/certifications", text: "IECEx Certificate — International Explosion-Proof Certification" },
                  { href: "/certifications", text: "UL 1203 Listing — North American Hazardous Location Standard" },
                  { href: "/contact", text: "Request Full Certification Package — Submit Your Project Specs" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <CADUploadDrawer
        isOpen={cadDrawerOpen}
        onClose={() => setCadDrawerOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
