import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const CTABanner = () => (
  <section id="cta" className="section-padding bg-foreground relative overflow-hidden">
    {/* Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />

    <div className="section-container relative z-10 text-center">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-background mb-6 leading-tight">
          ¿Listo para transformar el flujo de<br className="hidden sm:block" /> trabajo de tu empresa?
        </h2>
        <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
          Agenda una auditoría gratuita y descubre cuánto tiempo y dinero puedes ahorrar con automatización inteligente.
        </p>
        <Button
          size="lg"
          className="gap-2 text-base px-8"
        >
          Agenda tu auditoría gratuita
          <ArrowRight size={18} />
        </Button>
      </ScrollReveal>
    </div>
  </section>
);

export default CTABanner;
