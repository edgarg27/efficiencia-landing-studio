import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslation, Trans } from "react-i18next";

const Hero = ({ onCtaClick }: { onCtaClick?: () => void }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 bg-surface">
      {/* Decorative blobs */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <ScrollReveal>
            <div className="max-w-xl">
              <h1 className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {t("hero.badge")}
              </h1>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 text-foreground">
                <Trans
                  i18nKey="hero.title"
                  components={{ 1: <span className="text-brand-ia" /> }}
                />
              </h2>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                <Trans
                  i18nKey="hero.description"
                  components={{ 1: <strong className="text-foreground" /> }}
                />
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" onClick={onCtaClick}>
                  {t("hero.buttons.start")}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={() => document.querySelector("#beneficios")?.scrollIntoView({ behavior: "smooth" })}>
                  <Play size={16} aria-hidden="true" />
                  {t("hero.buttons.cases")}
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Visual */}
          <ScrollReveal delay={200}>
            <HeroVisual />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const HeroVisual = () => {
  const { t } = useTranslation();
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow */}
      <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl scale-90" />

      <div className="relative w-full max-w-md mx-auto bg-card rounded-2xl border border-border shadow-xl p-6">
        {/* Fake dashboard header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-amber-400/60" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
          <span className="ml-auto text-xs text-muted-foreground font-medium">{t("hero.visual.header")}</span>
        </div>

        {/* Flow boxes */}
        <div className="space-y-3">
          {[
            { label: t("hero.visual.steps.step1"), pct: 100 },
            { label: t("hero.visual.steps.step2"), pct: 78 },
            { label: t("hero.visual.steps.step3"), pct: 45 },
          ].map((item, i) => (
            <div key={i} className="bg-surface rounded-lg p-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="text-primary font-semibold">{item.pct}%</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Arrow connector */}
        <div className="flex justify-center my-4">
          <svg width="24" height="40" viewBox="0 0 24 40" className="text-primary">
            <path d="M12 0 L12 32 M6 26 L12 34 L18 26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="bg-primary/10 rounded-lg p-3 text-center">
          <span className="text-primary font-bold text-sm">{t("hero.visual.completed")}</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;