"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { getLenis } from "@/components/providers/smooth-scroll";

/** Height (px) at which the header samples the section beneath it. */
const PROBE_Y = 36;

/**
 * Routes whose first section is a dark hero. Only the server-rendered first
 * paint uses this, so the header doesn't flash light-on-dark before
 * hydration; after that, `toneAt()` reads the real DOM.
 */
const startsDark = (pathname: string) => pathname === "/" || pathname.startsWith("/services");

/**
 * Geometric check for the [data-header="dark"] section under the header.
 * This deliberately avoids hit-testing (elementsFromPoint): full-screen
 * overlays such as the preloader and page-transition curtain sit on top
 * during load and would hide the real section.
 */
function toneAt(): "dark" | "light" {
  for (const el of document.querySelectorAll<HTMLElement>('[data-header="dark"]')) {
    if (el.closest("[data-site-header]")) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= PROBE_Y && r.bottom > PROBE_Y && r.height > 0) return "dark";
  }
  return "light";
}

/**
 * Smart header (glossary: Hide-on-scroll header, Shrinking header).
 * Reads the section beneath it ([data-header="dark"]) to pick its tone.
 */
export function Header() {
  const pathname = usePathname();
  const [tone, setTone] = useState<"dark" | "light">(() => (startsDark(pathname) ? "dark" : "light"));
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  const update = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 40);
    if (!open) setHidden(y > 240 && y > lastY.current + 4 ? true : y < lastY.current - 4 ? false : (h) => h);
    lastY.current = y;
    setTone(toneAt());
  }, [open]);

  // Sync the tone before paint on mount and after every route change.
  useLayoutEffect(() => {
    setTone(toneAt());
  }, [pathname]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    // Re-check once layout settles (fonts, images, scroll restoration).
    const settle = window.setTimeout(onScroll, 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
    };
  }, [update, pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const dark = tone === "dark" || open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <>
      <header
        data-site-header=""
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,height] duration-500 ease-out-expo",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          dark ? "on-dark" : "",
          scrolled && !open
            ? dark
              ? "bg-navy-950/70 shadow-[inset_0_-1px_0_rgb(255_255_255/0.08)] backdrop-blur-xl"
              : "bg-ivory-50/80 shadow-[inset_0_-1px_0_var(--color-ivory-200)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className={cn("container-page flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo", scrolled ? "h-header-sm" : "h-header")}>
          <Link href="/" className="relative z-10 shrink-0 rounded-sm" aria-label="The Plug Afrique, home">
            <Logo tone={dark ? "light" : "dark"} priority className={cn("transition-[width] duration-500", scrolled ? "w-16 md:w-[4.25rem]" : "")} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-pill border border-line bg-surface/40 p-1 backdrop-blur-md">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative block rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive(item.href) ? "bg-primary text-on-primary" : "text-fg-muted hover:text-heading",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <ButtonLink href={site.cta.href} variant={dark ? "accent" : "primary"} size="sm" className="hidden sm:inline-flex">
              {site.cta.label}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-heading transition-colors hover:bg-surface-muted lg:hidden"
            >
              <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
              {/* Icon morph: menu ↔ close */}
              <span aria-hidden className="relative block h-3 w-5">
                <span className={cn("absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-out-expo", open ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-500 ease-out-expo", open ? "top-1/2 -rotate-45" : "bottom-0 w-3.5")} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} isActive={isActive} />
    </>
  );
}
