import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslation, Trans } from "react-i18next";

const CTABanner = ({ onCtaClick }: { onCtaClick?: () => void }) => {
  const { t } = useTranslation();

  return (
    <section id="cta" className="section-padding bg-foreground relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-background mb-6 leading-tight">
            <Trans
              i18nKey="ctaBanner.title"
              components={{ 1: <br className="hidden sm:block" /> }}
            />
          </h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
            {t("ctaBanner.description")}
          </p>
          <Button
            size="lg"
            className="gap-2 text-base px-8"
            onClick={onCtaClick}
          >
            {t("ctaBanner.button")}
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTABanner;