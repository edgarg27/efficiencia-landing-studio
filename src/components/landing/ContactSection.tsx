import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "./ContactForm";

const ContactSection = () => (
  <section id="contacto" className="section-padding bg-secondary/50">
    <div className="section-container">
      <ScrollReveal>
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Agenda tu auditoría <span className="text-brand-ia">gratuita</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Cuéntanos sobre tu empresa y un experto te contactará para analizar cómo la IA puede optimizar tus procesos.
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

export default ContactSection;
