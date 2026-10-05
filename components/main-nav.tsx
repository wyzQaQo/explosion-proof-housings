"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/config/site";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded border border-amber-500/30 bg-amber-500/10">
            <Shield className="h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 rounded bg-amber-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-sm" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-widest text-zinc-100">
              <span className="text-amber-500">EX</span>PROOF
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">
              ENGINEERING CENTER
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 font-mono text-xs tracking-wider transition-colors",
                  isActive
                    ? "text-amber-500"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-amber-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <div className="ml-4 h-6 w-px bg-white/[0.08]" />
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded border border-amber-500/30 px-4 py-2 font-mono text-xs font-semibold tracking-wider text-amber-500 transition-all hover:border-amber-500/60"
          >
            <span className="relative z-10 flex items-center gap-2">
              <HardDrive className="h-3.5 w-3.5" />
              CAD UPLOAD
            </span>
            <div className="absolute inset-0 bg-amber-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded border border-white/[0.08] text-zinc-400 md:hidden"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.06] bg-zinc-950/95 backdrop-blur-2xl md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded px-4 py-3 font-mono text-xs tracking-wider transition-colors",
                    pathname === item.href
                      ? "bg-amber-500/10 text-amber-500"
                      : "text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-4 py-3 font-mono text-xs font-semibold tracking-wider text-amber-500"
              >
                <HardDrive className="h-4 w-4" />
                CAD UPLOAD
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
