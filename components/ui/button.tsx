import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

export const buttonStyles = cva(
  "group/btn relative inline-flex select-none items-center justify-center gap-3 whitespace-nowrap rounded-pill font-medium transition-[background-color,box-shadow,color,border-color,transform] duration-300 ease-out-quart active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary shadow-sm hover:bg-primary-hover hover:shadow-md",
        accent: "bg-accent-fill text-on-accent hover:shadow-glow-gold",
        secondary: "border border-line-strong text-heading hover:border-heading hover:bg-surface-muted",
        ghost: "text-heading hover:bg-surface-muted",
        light: "bg-ivory-50 text-navy-950 hover:bg-white hover:shadow-lg",
      },
      size: {
        sm: "h-10 pl-5 pr-2 text-sm",
        md: "h-12 pl-6 pr-2 text-[0.9375rem]",
        lg: "h-14 pl-8 pr-2.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

const iconWrap = cva(
  "grid place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover/btn:rotate-45",
  {
    variants: {
      variant: {
        primary: "bg-on-primary/12 text-on-primary",
        accent: "bg-navy-950/10 text-on-accent",
        secondary: "bg-surface-muted text-heading",
        ghost: "bg-surface-muted text-heading",
        light: "bg-navy-950/8 text-navy-950",
      },
      size: { sm: "size-7", md: "size-8", lg: "size-10" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

/** Label that rolls up on hover (glossary: Letter roll / Text slide-up on hover). */
export function RollLabel({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> &
  VariantProps<typeof buttonStyles> & { magnetic?: boolean; icon?: ReactNode; external?: boolean };

export function ButtonLink({ className, variant, size, magnetic = false, icon, children, external, ...props }: ButtonLinkProps) {
  const el = (
    <Link
      className={cn(buttonStyles({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <RollLabel>{children}</RollLabel>
      <span className={iconWrap({ variant, size })} aria-hidden>
        {icon ?? <ArrowUpRight className="size-4" strokeWidth={1.75} />}
      </span>
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function Button({
  className,
  variant,
  size,
  children,
  icon,
  ...props
}: ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonStyles> & { icon?: ReactNode }) {
  return (
    <button className={cn(buttonStyles({ variant, size }), className)} {...props}>
      <RollLabel>{children}</RollLabel>
      <span className={iconWrap({ variant, size })} aria-hidden>
        {icon ?? <ArrowUpRight className="size-4" strokeWidth={1.75} />}
      </span>
    </button>
  );
}

/** Text link with growing underline + arrow nudge. */
export function ArrowLink({ className, children, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link className={cn("group/al inline-flex items-center gap-2 font-medium text-heading", className)} {...props}>
      <span className="link-underline">{children}</span>
      <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-quart group-hover/al:translate-x-0.5 group-hover/al:-translate-y-0.5" strokeWidth={1.75} aria-hidden />
    </Link>
  );
}
