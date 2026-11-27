"use client";

import dynamic from "next/dynamic";

// three.js loads only on the client, after first paint (DESIGN.md §7.6)
const HeroNetwork = dynamic(() => import("./hero-network"), { ssr: false, loading: () => null });

export function HeroCanvas() {
  return <HeroNetwork />;
}
