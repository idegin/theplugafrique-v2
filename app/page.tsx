import { Hero } from "@/components/home/hero";
import { ClientMarquee } from "@/components/home/client-marquee";
import { Essence } from "@/components/home/essence";
import { Story } from "@/components/home/story";
import { Philosophy } from "@/components/home/philosophy";
import { Services } from "@/components/home/services";
import { WhyUs } from "@/components/home/why-us";
import { Testimonials } from "@/components/home/testimonials";
import { Insights } from "@/components/home/insights";
import { Faq } from "@/components/home/faq";
import { Invitation } from "@/components/home/invitation";

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <ClientMarquee />
        <Essence />
        <Story />
        <Philosophy />
        <Services />
        <WhyUs />
        <Testimonials />
        <Insights />
        <Faq />
        <Invitation />
      </main>
    </>
  );
}
