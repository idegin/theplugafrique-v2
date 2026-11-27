"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Static site: no backend yet, so this opens a pre-filled email.
 * Swap for a form service (Formspree, Buttondown, etc.) when one is chosen.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const uid = useId();
  const inputId = `nl-email-${uid}`;
  const msgId = `nl-msg-${uid}`;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Subscribe to TPA Insights")}&body=${encodeURIComponent(`Please add ${email} to your insights list.`)}`;
  };

  return (
    <form onSubmit={submit} noValidate className="relative">
      <label htmlFor={inputId} className="visually-hidden">Email address</label>
      <div className={cn("flex items-center rounded-pill border bg-white/[0.04] p-1.5 pl-5 transition-colors focus-within:border-gold-300", state === "error" ? "animate-shake border-danger" : "border-line-strong")}>
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          placeholder="you@organisation.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          aria-invalid={state === "error"}
          aria-describedby={msgId}
          className="min-w-0 flex-1 bg-transparent py-2 text-heading outline-none placeholder:text-fg-subtle"
        />
        <button type="submit" className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-300 text-navy-950 transition-transform hover:scale-105 active:scale-95" aria-label="Subscribe">
          {state === "done" ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      <p id={msgId} role="status" className={cn("mt-2 min-h-5 text-xs", state === "error" ? "text-danger" : "text-fg-subtle")}>
        {state === "error" ? "Please enter a valid email address." : state === "done" ? "Thanks! Your email app should open to confirm." : "No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
