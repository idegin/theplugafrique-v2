import Image from "next/image";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/base-path";

/** TPA logo. `tone="light"` for dark backgrounds. */
export function Logo({ tone = "dark", className, priority }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={asset(tone === "light" ? "/brand/tpa-logo-light.png" : "/brand/tpa-logo.png")}
      alt="The Plug Afrique"
      width={359}
      height={202}
      priority={priority}
      unoptimized
      className={cn("h-auto w-[4.5rem] md:w-20", className)}
    />
  );
}
