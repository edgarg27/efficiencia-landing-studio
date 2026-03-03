import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  {
    name: "María García",
    role: "Directora de Operaciones, LogiTech",
    initials: "MG",
    quote: "Redujimos el tiempo de reportes manuales en un 40%. El equipo ahora se enfoca en análisis estratégico.",
  },
  {
    name: "Carlos Mendoza",
    role: "CEO, DataFlow Solutions",
    initials: "CM",
    quote: "La automatización de facturación nos ahorró 120 horas al mes. El ROI fue visible desde el primer trimestre.",
  },
  {
    name: "Ana Rodríguez",
    role: "Gerente de TI, NovaTech",
    initials: "AR",
    quote: "Integraron nuestros 5 sistemas en una sola plataforma. Los errores de datos cayeron un 95%.",
  },
];

const Testimonials = () => (
  <section className="section-padding bg-surface">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Lo que dicen nuestros <span className="text-brand-ia">clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Resultados reales de empresas que confiaron en EfficiencIA.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <Card className="h-full border-border/60 shadow-md hover-lift">
              <CardContent className="p-6 flex flex-col gap-4">
                <p className="italic text-foreground leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/40">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
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

export default Testimonials;
