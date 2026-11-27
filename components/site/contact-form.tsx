"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { RollLabel } from "@/components/ui/button";

const interests = ["Strategy & Advisory", "Innovation & Digital", "Capability & Learning", "Culture & Engagement", "Partnerships", "Something else"];

function Field({ id, label, error, textarea, ...props }: { id: string; label: string; error?: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const base =
    "peer w-full rounded-sm border bg-surface px-4 pb-2.5 pt-6 text-fg outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-focus focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-gold-300)_35%,transparent)]";
  const Tag = (textarea ? "textarea" : "input") as "input";
  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(base, textarea && "min-h-36 resize-y", error ? "animate-shake border-danger" : "border-line-strong")}
        {...props}
      />
      {/* Floating label */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 origin-left text-fg-muted transition-transform duration-300 ease-out-expo peer-focus:-translate-y-2.5 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.78]"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Contact form for a static site: validates inline, then opens a pre-filled
 * email to the TPA inbox. Swap the submit for a form service when chosen.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Record<string, string> = {};
    if (!v("name")) next.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(v("email"))) next.email = "Please enter a valid email address.";
    if (v("message").length < 10) next.message = "A sentence or two helps us prepare.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const body = `Name: ${v("name")}\nEmail: ${v("email")}\nOrganisation: ${v("org") || "-"}\nInterested in: ${picked.join(", ") || "-"}\n\n${v("message")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New enquiry from ${v("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="animate-fade-up rounded-xl border border-line bg-surface p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-sage-100 text-sage-700"><Check className="size-6" /></span>
        <p className="mt-6 font-display text-display-sm text-heading">Thank you. Let&apos;s plug in.</p>
        <p className="mt-3 text-fg-muted">Your email app should have opened with your message. If not, write to us at {site.email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" autoComplete="name" error={errors.name} />
        <Field id="email" label="Email address" type="email" autoComplete="email" error={errors.email} />
      </div>
      <Field id="org" label="Organisation (optional)" autoComplete="organization" />
      <fieldset>
        <legend className="mb-3 text-sm text-fg-muted">What can we help with?</legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => {
            const on = picked.includes(i);
            return (
              <button
                type="button"
                key={i}
                aria-pressed={on}
                onClick={() => setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                className={cn(
                  "rounded-pill border px-4 py-2 text-sm transition-[background-color,color,border-color] duration-300",
                  on ? "border-transparent bg-primary text-on-primary" : "border-line-strong text-fg hover:border-heading",
                )}
              >
                {i}
              </button>
            );
          })}
        </div>
      </fieldset>
      <Field id="message" label="Tell us about your project" textarea error={errors.message} />
      <button type="submit" className="group/btn inline-flex h-14 items-center gap-3 rounded-pill bg-primary pl-8 pr-2.5 font-medium text-on-primary shadow-sm transition-[background-color,transform] duration-300 hover:bg-primary-hover active:scale-[0.97]">
        <RollLabel>Send message</RollLabel>
        <span className="grid size-10 place-items-center rounded-full bg-on-primary/12 transition-transform duration-500 ease-out-expo group-hover/btn:rotate-45">
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </span>
      </button>
    </form>
  );
}
