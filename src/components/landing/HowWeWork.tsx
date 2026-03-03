import { Search, Code, Rocket } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Auditoría de Procesos",
    desc: "Analizamos tus flujos de trabajo actuales para identificar oportunidades de automatización con el mayor impacto.",
  },
  {
    icon: Code,
    num: "02",
    title: "Desarrollo e Integración",
    desc: "Diseñamos y construimos soluciones personalizadas que se integran perfectamente con tus sistemas existentes.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Despliegue y Optimización",
    desc: "Implementamos, monitorizamos y optimizamos continuamente para garantizar resultados crecientes.",
  },
];

const HowWeWork = () => (
  <section id="como-funciona" className="section-padding bg-background">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un proceso claro y transparente en tres pasos hacia la automatización total.
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
                <step.icon size={24} className="text-primary" />
              </div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                Paso {step.num}
              </span>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWork;
