"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Full-screen navy menu with a curtain + staggered link reveal. */
export function MobileMenu({ open, onClose, isActive }: { open: boolean; onClose: () => void; isActive: (href: string) => boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = el.querySelectorAll("[data-menu-item]");
    // Kill in-flight tweens so a late close onComplete can never hide an open menu
    gsap.killTweensOf(el);
    gsap.killTweensOf(links);
    if (!mounted.current) {
      mounted.current = true;
      if (!open) return;
    }
    if (open) {
      gsap.set(el, { visibility: "visible" });
      if (reduce) {
        gsap.set(el, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(links, { yPercent: 0, opacity: 1 });
      } else {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" });
        gsap.fromTo(links, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.35 });
      }
      const first = el.querySelector<HTMLElement>("a");
      first?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    } else {
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: reduce ? 0 : 0.6,
        ease: "power4.inOut",
        onComplete: () => gsap.set(el, { visibility: "hidden" }),
      });
    }
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className="on-dark bg-aurora-navy bg-grain invisible fixed inset-0 z-40 flex flex-col overflow-y-auto lg:hidden"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <div className="container-page relative z-10 flex flex-1 flex-col justify-between pb-10 pt-28">
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {site.nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  data-menu-item=""
                  href={item.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className={cn(
                    "group flex items-baseline gap-4 py-2 font-display text-[clamp(2.5rem,11vw,4.5rem)] leading-none tracking-tight",
                    isActive(item.href) ? "text-accent" : "text-heading",
                  )}
                >
                  <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div data-menu-item="" className="mt-12 grid gap-6 border-t border-line pt-8 text-sm text-fg-muted sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Say hello</p>
            <a tabIndex={open ? 0 : -1} className="block text-lg text-heading" href={`mailto:${site.email}`}>{site.email}</a>
            <a tabIndex={open ? 0 : -1} className="block text-lg text-heading" href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          </div>
          <div>
            <p className="eyebrow mb-3">Offices</p>
            <p>Lagos · Abuja</p>
          </div>
        </div>
      </div>
    </div>
  );
}
