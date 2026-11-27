"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { LinkedinIcon, XIcon } from "@/components/ui/social-icons";

/** Share links + copy-to-clipboard feedback (glossary: Copy-to-clipboard feedback). */
export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const btn = "grid size-10 place-items-center rounded-full border border-line-strong text-heading transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary";
  return (
    <div className="flex items-center gap-2">
      <span className="eyebrow mr-2">Share</span>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><LinkedinIcon className="size-4" /></a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><XIcon className="size-4" /></a>
      <button
        type="button"
        className={btn}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {}
        }}
      >
        {copied ? <Check className="size-4 text-success animate-[fade-in_0.3s]" /> : <Link2 className="size-4" strokeWidth={1.5} />}
      </button>
      <span role="status" className="ml-1 text-xs text-success" aria-live="polite">{copied ? "Copied" : ""}</span>
    </div>
  );
}
