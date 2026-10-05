"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InternalLink {
  href: string;
  text: string;
}

interface SEOInternalLinksProps {
  title: string;
  links: InternalLink[];
  className?: string;
}

export function SEOInternalLinks({ title, links, className = "" }: SEOInternalLinksProps) {
  if (links.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="font-mono text-xs font-bold tracking-wider text-zinc-400 mb-3">
        {title}
      </h2>
      <div className="grid gap-1.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.01] px-3 py-2 transition-all hover:border-amber-500/15 hover:bg-amber-500/[0.02]"
          >
            <span className="font-mono text-[10px] text-zinc-500 transition-colors group-hover:text-zinc-300">
              {link.text}
            </span>
            <ArrowRight className="h-3 w-3 text-zinc-700 opacity-0 transition-all group-hover:opacity-100 group-hover:text-amber-500" />
          </Link>
        ))}
      </div>
    </section>
  );
}
