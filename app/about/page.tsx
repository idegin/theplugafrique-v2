import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { AboutHero } from "@/components/about/about-hero";
import { Chapters } from "@/components/about/chapters";
import { NameIdentity } from "@/components/about/name-identity";
import { Principles } from "@/components/about/principles";
import { Audience } from "@/components/about/audience";
import { Differentiators } from "@/components/about/differentiators";
import { Offices } from "@/components/about/offices";
import { ClientMarquee } from "@/components/home/client-marquee";
import { Invitation } from "@/components/home/invitation";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "The Plug Afrique is a Pan-African consulting practice connecting people, ideas and opportunities for impact.",
  path: "/about/",
  og: "about",
});

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <AboutHero />
      <ClientMarquee />
      <Chapters />
      <NameIdentity />
      <Principles />
      <Audience />
      <Differentiators />
      <Offices />
      <Invitation
        eyebrow="Work with us"
        title={
          <>
            Ready to be <em className="em-accent">connected?</em>
          </>
        }
      />
    </main>
  );
}
