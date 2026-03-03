import { Cog, Network, MessageSquare, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: Cog,
    title: "Automatización de Procesos (RPA)",
    desc: "Eliminamos tareas repetitivas con bots inteligentes que trabajan por ti las 24 horas del día.",
  },
  {
    icon: Network,
    title: "Integración de Sistemas",
    desc: "Conectamos todas tus herramientas y plataformas para que la información fluya sin fricciones.",
  },
  {
    icon: MessageSquare,
    title: "Asistentes Virtuales y Bots",
    desc: "Chatbots y asistentes con IA que atienden clientes, clasifican datos y resuelven consultas.",
  },
  {
    icon: BarChart3,
    title: "Análisis de Datos Automatizado",
    desc: "Transforma tus datos en decisiones con reportes automáticos y dashboards inteligentes.",
  },
];

const Services = () => (
  <section id="servicios" className="section-padding bg-surface">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Nuestros servicios
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Soluciones de automatización a medida para cada área de tu negocio.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="group bg-card rounded-2xl border border-border p-6 hover-lift cursor-default h-full">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon size={24} className="text-primary" />
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

export default Services;
