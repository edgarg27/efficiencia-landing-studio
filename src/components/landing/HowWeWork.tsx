import { Search, Code, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslation } from "react-i18next";

const HowWeWork = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      num: "01",
      title: t("howWeWork.steps.step1.title"),
      desc: t("howWeWork.steps.step1.desc"),
    },
    {
      icon: Code,
      num: "02",
      title: t("howWeWork.steps.step2.title"),
      desc: t("howWeWork.steps.step2.desc"),
    },
    {
      icon: Rocket,
      num: "03",
      title: t("howWeWork.steps.step3.title"),
      desc: t("howWeWork.steps.step3.desc"),
    },
  ];

  return (
    <section id="como-funciona" className="section-padding bg-background">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {t("howWeWork.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("howWeWork.description")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="relative text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 relative z-10 border-4 border-background">
                  <step.icon size={24} className="text-primary" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                  {t("howWeWork.stepLabel", { num: step.num })}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;