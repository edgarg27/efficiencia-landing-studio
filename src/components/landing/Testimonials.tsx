import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslation, Trans } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Gerardo",
      role: t("testimonials.items.item1.role"),
      initials: "G",
      quote: t("testimonials.items.item1.quote"),
    },
    {
      name: "Maribel",
      role: t("testimonials.items.item2.role"),
      initials: "M",
      quote: t("testimonials.items.item2.quote"),
    },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              <Trans
                i18nKey="testimonials.title"
                components={{ 1: <span className="text-brand-ia" /> }}
              />
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("testimonials.description")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {testimonials.map((test, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <Card className="h-full border-border/60 shadow-md hover-lift">
                <CardContent className="p-6 flex flex-col gap-4">
                  <p className="italic text-foreground leading-relaxed">
                    "{test.quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/40">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                        {test.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-foreground">{test.name}</p>
                      <p className="text-xs text-muted-foreground">{test.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;