"use client";

import { Shield, Globe, BadgeCheck, Droplets, Leaf, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/animations/scroll-animations";
import { cn } from "@/lib/utils";
import certifications from "@/data/certifications.json";
import faqs from "@/data/faqs.json";
import { FAQPageSchema, BreadcrumbListSchema } from "@/components/structured-data";
import { SEOInternalLinks } from "@/components/seo-internal-links";
import { siteConfig } from "@/config/site";

const categoryIcons: Record<string, React.ElementType> = {
  european: Globe,
  international: Globe,
  "north-american": Shield,
  environmental: Droplets,
  quality: BadgeCheck,
};

export default function CertificationsPage() {
  const [expanded, setExpanded] = useState<string | null>(certifications[0]?.id || null);

  return (
    <div className="min-h-screen">
      <section className="border-b border-white/[0.06] bg-zinc-950 pt-32 pb-16">
        <div className="container">
          <ScrollReveal>
            <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
              COMPLIANCE & CERTIFICATION
            </span>
            <h1 className="mt-2 font-sans text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
              Certification-First Engineering
            </h1>
            <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-zinc-500">
              Every housing ships with complete certification packages. Our quality system
              ensures full traceability from raw material PMI testing through final pressure
              test and dimensional inspection for every single unit.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cert Accordion */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-4">
            {certifications.map((cert, i) => {
              const Icon = categoryIcons[cert.category] || Shield;
              const isExpanded = expanded === cert.id;

              return (
                <ScrollReveal key={cert.id} delay={i * 0.05}>
                  <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-metal-card">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : cert.id)}
                      className="flex w-full items-center gap-4 p-6 text-left transition-colors hover:bg-white/[0.01]"
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all",
                          isExpanded
                            ? "border-amber-500/20 bg-amber-500/10"
                            : "border-white/[0.06] bg-white/[0.01]"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-6 w-6 transition-colors",
                            isExpanded ? "text-amber-500" : "text-zinc-600"
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-100">
                          {cert.name}
                        </h3>
                        <p className="mt-1 font-mono text-[10px] text-zinc-500 line-clamp-1">
                          {cert.fullName}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        className="flex h-8 w-8 items-center justify-center rounded border border-white/[0.06] text-zinc-600"
                      >
                        +
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.06] px-6 pb-6 pt-4">
                            <p className="font-mono text-[11px] leading-relaxed text-zinc-400">
                              {cert.description}
                            </p>

                            {/* Technical Details */}
                            {cert.technicalDetails && (
                              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {Object.entries(cert.technicalDetails).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="rounded-lg border border-white/[0.04] bg-white/[0.01] p-3"
                                  >
                                    <span className="font-mono text-[9px] font-semibold tracking-wider text-zinc-600">
                                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                                    </span>
                                    <p className="mt-1 font-mono text-[10px] text-zinc-300">
                                      {value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Marking Example */}
                            {cert.markingExample && (
                              <div className="mt-6">
                                <span className="font-mono text-[9px] font-semibold tracking-wider text-zinc-500">
                                  EQUIPMENT MARKING EXAMPLE
                                </span>
                                <pre className="mt-2 overflow-x-auto rounded-lg border border-white/[0.06] bg-zinc-950 p-4 font-mono text-[10px] leading-relaxed text-amber-500">
                                  {cert.markingExample}
                                </pre>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Infrastructure */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100">
              Quality Assurance Infrastructure
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "PMI Testing",
                desc: "100% incoming raw material positive material identification using handheld XRF analyzer. Every heat of 316L is verified for Mo content (>2.5%).",
              },
              {
                title: "Hydrostatic Testing",
                desc: "Each housing undergoes hydrostatic pressure testing at 1.5× design pressure with 30-minute hold time. Test certificates issued per unit.",
              },
              {
                title: "CMM Dimensional",
                desc: "Coordinate measuring machine inspection on critical bore diameters, flame path gaps, and O-ring groove dimensions per ASME Y14.5.",
              },
              {
                title: "Batch Traceability",
                desc: "Full batch traceability from raw material heat number through CNC machining, assembly, testing, and shipping. EN 10204 3.1 certs included.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-6">
                  <BadgeCheck className="mb-3 h-6 w-6 text-amber-500/60" />
                  <h3 className="font-mono text-sm font-bold tracking-wider text-zinc-200">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-mono text-[10px] leading-relaxed text-zinc-500">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ + SEO ==================== */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <FAQPageSchema faqs={faqs.certifications} />
          <BreadcrumbListSchema
            items={[
              { name: "Home", url: siteConfig.url },
              { name: "Certifications", url: `${siteConfig.url}/certifications` },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100 mb-8">
                Explosion-Proof Certification FAQ
              </h2>
              <div className="space-y-4">
                {faqs.certifications.map((faq, i) => (
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
                title="EXPLORE CERTIFIED PRODUCTS"
                links={[
                  { href: "/products/exptz-316l-pro", text: "EXPTZ-316L Pro — ATEX/IECEx/UL Triple-Certified PTZ Camera Housing" },
                  { href: "/products/exptz-pan-tilt-hd", text: "EXPTZ Pan-Tilt HD — SIL 2 Rated Ex d IIC T6 Pan-Tilt Unit" },
                  { href: "/products/explight-led-100w", text: "EXLight LED-100W — ATEX/IECEx Explosion-Proof LED Floodlight" },
                  { href: "/products/exjb-316l-6way", text: "EXJB-316L 6-Way — Ex e Certified Junction Box" },
                ]}
              />
              <SEOInternalLinks
                title="RELATED SOLUTIONS"
                links={[
                  { href: "/solutions/oil-gas", text: "Oil & Gas Refinery ATEX Zone 1 Surveillance — Certification Required" },
                  { href: "/solutions/marine-offshore", text: "Offshore Platform Camera Enclosures — DNV GL Type Approval" },
                  { href: "/solutions/chemical", text: "Chemical Plant IP69K Certified Camera Housing — CIP/SIP Washdown" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
