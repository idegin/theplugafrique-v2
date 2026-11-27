import { ButtonLink } from "@/components/ui/button";
import { DrawLine } from "@/components/motion/draw-line";

export default function NotFound() {
  return (
    <main id="main" data-header="dark" className="on-dark bg-aurora-navy bg-grain relative flex min-h-svh items-center overflow-hidden">
      <div className="container-page relative z-10 py-32">
        <p className="eyebrow eyebrow-rule">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(7rem,28vw,20rem)] leading-[0.85] tracking-tighter text-heading">
          4<em className="em-accent">0</em>4
        </h1>
        <DrawLine scrub={false} className="my-6 h-16 w-64" d="M2 40 C 60 40, 80 4, 130 20 S 190 60, 230 30" viewBox="0 0 240 64" />
        <p className="max-w-[40ch] text-lead text-fg-muted">This connection came loose. The page you&apos;re looking for has moved or never existed.</p>
        <div className="mt-10">
          <ButtonLink href="/" variant="accent" size="lg">Back to home</ButtonLink>
        </div>
      </div>
    </main>
  );
}
