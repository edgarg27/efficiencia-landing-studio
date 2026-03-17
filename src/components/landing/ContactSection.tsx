import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "./ContactForm";
import { useTranslation, Trans } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contacto" className="section-padding bg-secondary/50">
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              <Trans
                i18nKey="contactSection.title"
                components={{ 1: <span className="text-brand-ia" /> }}
              />
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("contactSection.description")}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <Card className="max-w-lg mx-auto shadow-md border-border/60">
            <CardContent className="p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;