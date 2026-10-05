"use client";

import Link from "next/link";
import { Shield, Mail, Phone, Globe, Lock } from "lucide-react";
import { companyInfo, navItems } from "@/config/site";

const footerLinks = {
  Products: [
    { label: "Explosion-Proof Housings", href: "/products" },
    { label: "Marine-Grade Enclosures", href: "/products?cat=marine" },
    { label: "Custom CNC Solutions", href: "/contact" },
    { label: "PTZ Adaptation Kits", href: "/products?cat=adaptation" },
  ],
  Solutions: [
    { label: "Oil & Gas Refinery", href: "/solutions/oil-gas" },
    { label: "Marine & Offshore", href: "/solutions/marine-offshore" },
    { label: "Border Security", href: "/solutions/border-security" },
    { label: "Chemical Processing", href: "/solutions/chemical" },
  ],
  Compliance: [
    { label: "ATEX Certification", href: "/certifications" },
    { label: "IECEx Standards", href: "/certifications" },
    { label: "UL 1203 Listing", href: "/certifications" },
    { label: "ISO Quality System", href: "/certifications" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "CAD Upload", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-zinc-950">
      <div className="container py-16">
        {/* Top Row */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-amber-500/30 bg-amber-500/10">
                <Shield className="h-4 w-4 text-amber-500" />
              </div>
              <span className="font-mono text-sm font-bold tracking-widest text-zinc-100">
                <span className="text-amber-500">EX</span>PROOF
              </span>
            </Link>
            <p className="mb-6 font-mono text-xs leading-relaxed text-zinc-500">
              {companyInfo.name}
              <br />
              {companyInfo.address}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${companyInfo.email || "engineering@exproof-housings.com"}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-300"
              >
                <Mail className="h-3 w-3 text-amber-500/60" />
                engineering@exproof-housings.com
              </a>
              <a
                href={`tel:${companyInfo.phone || "+8675588886688"}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-300"
              >
                <Phone className="h-3 w-3 text-amber-500/60" />
                +86-755-8888-6688
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-mono text-xs font-semibold tracking-widest text-zinc-300">
                {title.toUpperCase()}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-xs text-zinc-500 transition-colors hover:text-amber-500/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Bottom Row */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
            <Lock className="h-3 w-3" />
            <span>Secure TLS 1.3 Encrypted &middot; ISO 27001 Compliant Infrastructure</span>
          </div>
          <p className="font-mono text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} ExProof Engineering Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
