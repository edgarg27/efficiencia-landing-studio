import { Cog, Network, MessageSquare, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Cog,
      title: t("services.items.item1.title"),
      desc: t("services.items.item1.desc"),
    },
    {
      icon: Network,
      title: t("services.items.item2.title"),
      desc: t("services.items.item2.desc"),
    },
    {
      icon: MessageSquare,
      title: t("services.items.item3.title"),
      desc: t("services.items.item3.desc"),
    },
    {
      icon: BarChart3,
      title: t("services.items.item4.title"),
      desc: t("services.items.item4.desc"),
    },
  ];

  return (
    <section id="servicios" className="section-padding bg-surface">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              {t("services.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("services.description")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group bg-card rounded-2xl border border-border p-6 hover-lift cursor-default h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={24} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;