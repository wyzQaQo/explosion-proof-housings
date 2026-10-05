"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  HardDrive,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Upload,
  Shield,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-animations";
import { SpotlightCard } from "@/components/animations/spotlight-card";
import { Button } from "@/components/ui/button";
import { CADUploadDrawer } from "@/components/cad-upload-drawer";
import { companyInfo } from "@/config/site";
import faqs from "@/data/faqs.json";
import { FAQPageSchema, BreadcrumbListSchema } from "@/components/structured-data";
import { SEOInternalLinks } from "@/components/seo-internal-links";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [cadDrawerOpen, setCadDrawerOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    productInterest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: "",
        email: "",
        company: "",
        phone: "",
        country: "",
        productInterest: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <section className="border-b border-white/[0.06] bg-zinc-950 pt-32 pb-16">
        <div className="container">
          <ScrollReveal>
            <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-amber-500">
              CONTACT ENGINEERING
            </span>
            <h1 className="mt-2 font-sans text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
              Start Your Project
            </h1>
            <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-zinc-500">
              Our engineering team responds within 12 business hours. For urgent requests,
              call +86-755-8888-6688 (GMT+8, Mon-Sat 08:00-18:00).
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Contact Form */}
            <ScrollReveal className="lg:col-span-3">
              <SpotlightCard className="p-8">
                <h2 className="font-mono text-sm font-bold tracking-wider text-zinc-100">
                  PROJECT INQUIRY FORM
                </h2>
                <p className="mt-1 font-mono text-[10px] text-zinc-500">
                  All fields marked * are required
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                      <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h3 className="font-mono text-lg font-bold tracking-wider text-zinc-100">
                      INQUIRY RECEIVED
                    </h3>
                    <p className="max-w-sm font-mono text-xs leading-relaxed text-zinc-400">
                      Thank you. Our engineering team will review your requirements and
                      respond within <span className="text-amber-500">12 business hours</span>.
                      For urgent matters, please call us directly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">FULL NAME *</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">EMAIL *</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
                          placeholder="engineer@company.com"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">COMPANY</label>
                        <input
                          type="text"
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
                          placeholder="Company or organization"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">PHONE</label>
                        <input
                          type="tel"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
                          placeholder="+1 555 0123"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">PROJECT COUNTRY</label>
                        <input
                          type="text"
                          value={formState.country}
                          onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
                          placeholder="Where will equipment be deployed?"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">PRODUCT INTEREST</label>
                        <select
                          value={formState.productInterest}
                          onChange={(e) => setFormState({ ...formState, productInterest: e.target.value })}
                          className="w-full rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-200 focus:border-amber-500/40 focus:outline-none"
                        >
                          <option value="">Select a product line</option>
                          <option value="explosion-proof">Explosion-Proof Housings</option>
                          <option value="marine-grade">Marine-Grade Enclosures</option>
                          <option value="custom-cnc">Custom CNC Brackets</option>
                          <option value="pan-tilt">Pan-Tilt Units</option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400">MESSAGE *</label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full resize-none rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-500/40 focus:outline-none"
                        placeholder="Describe your camera model, environmental conditions, quantity required, and any special requirements..."
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          SUBMITTING...
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4" />
                          SUBMIT INQUIRY
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </SpotlightCard>
            </ScrollReveal>

            {/* Contact Info Sidebar */}
            <div className="space-y-6 lg:col-span-2">
              <ScrollReveal direction="right">
                <SpotlightCard className="p-6">
                  <h3 className="mb-4 font-mono text-xs font-bold tracking-wider text-zinc-100">
                    DIRECT CONTACT
                  </h3>
                  <div className="space-y-4">
                    <a href="mailto:engineering@exproof-housings.com" className="flex items-start gap-3 group">
                      <Mail className="mt-0.5 h-4 w-4 text-amber-500/60" />
                      <div>
                        <p className="font-mono text-[10px] text-zinc-500">Email</p>
                        <p className="font-mono text-[11px] text-zinc-300 group-hover:text-amber-500 transition-colors">
                          engineering@exproof-housings.com
                        </p>
                      </div>
                    </a>
                    <a href="tel:+8675588886688" className="flex items-start gap-3 group">
                      <Phone className="mt-0.5 h-4 w-4 text-amber-500/60" />
                      <div>
                        <p className="font-mono text-[10px] text-zinc-500">Phone</p>
                        <p className="font-mono text-[11px] text-zinc-300 group-hover:text-amber-500 transition-colors">
                          +86-755-8888-6688
                        </p>
                      </div>
                    </a>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-amber-500/60" />
                      <div>
                        <p className="font-mono text-[10px] text-zinc-500">Address</p>
                        <p className="font-mono text-[10px] leading-relaxed text-zinc-400">
                          {companyInfo.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="mt-0.5 h-4 w-4 text-amber-500/60" />
                      <div>
                        <p className="font-mono text-[10px] text-zinc-500">Working Hours</p>
                        <p className="font-mono text-[11px] text-zinc-300">
                          GMT+8, Mon-Sat 08:00-18:00
                        </p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              {/* CAD Upload CTA */}
              <ScrollReveal direction="right" delay={0.1}>
                <div
                  className="cursor-pointer"
                  onClick={() => setCadDrawerOpen(true)}
                >
                  <SpotlightCard className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/10 bg-amber-500/[0.03]">
                        <Upload className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-mono text-xs font-bold tracking-wider text-zinc-100">
                          SECURE CAD UPLOAD
                        </h3>
                        <p className="font-mono text-[9px] text-zinc-500">
                          .STEP .STP .DWG .DXF .IGES
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-[10px] leading-relaxed text-zinc-500">
                      Drag your 3D CAD files and our engineers will design custom brackets.
                      TLS 1.3 encrypted, NDA-ready, 48-hour turnaround.
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Lock className="h-3 w-3 text-emerald-400" />
                      <span className="font-mono text-[9px] text-emerald-400">
                        256-bit encrypted channel
                      </span>
                    </div>
                  </SpotlightCard>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ + SEO ==================== */}
      <section className="border-t border-white/[0.06] py-16">
        <div className="container">
          <FAQPageSchema faqs={faqs.contact} />
          <BreadcrumbListSchema
            items={[
              { name: "Home", url: siteConfig.url },
              { name: "Contact Engineering", url: `${siteConfig.url}/contact` },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-zinc-100 mb-8">
                RFQ & Project FAQ
              </h2>
              <div className="space-y-4">
                {faqs.contact.map((faq, i) => (
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
                title="BROWSE PRODUCTS"
                links={[
                  { href: "/products", text: "Full Product Catalog — Explosion-Proof Camera Housing, Lights, Junction Boxes & Cable Glands" },
                  { href: "/products/exptz-316l-pro", text: "EXPTZ-316L Pro — ATEX/IECEx/UL Triple-Certified Camera Housing" },
                  { href: "/products/explight-led-100w", text: "EXLight LED-100W — ATEX 100W Explosion-Proof LED Floodlight" },
                  { href: "/products/excg-ss316l-m25", text: "EXCG-316L M25 — Ex d/Ex e Cable Gland for Hazardous Areas" },
                ]}
              />
              <SEOInternalLinks
                title="SOLUTIONS & CERTIFICATIONS"
                links={[
                  { href: "/solutions/oil-gas", text: "Oil & Gas Refinery Zone 1 Surveillance — ATEX Certified" },
                  { href: "/solutions/marine-offshore", text: "Offshore Platform Marine-Grade Enclosures — C5-M Corrosion Rated" },
                  { href: "/certifications", text: "Full Certification Documentation — ATEX/IECEx/UL/ISO — Download Compliance Package" },
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
