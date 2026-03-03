import { Clock, AlertTriangle, TrendingDown, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const before = [
  { icon: Clock, label: "Horas perdidas en tareas manuales", color: "text-destructive" },
  { icon: AlertTriangle, label: "Errores humanos frecuentes", color: "text-destructive" },
  { icon: TrendingDown, label: "Cuellos de botella operativos", color: "text-destructive" },
];

const after = [
  { icon: Zap, label: "Procesos automatizados 24/7", color: "text-primary" },
  { icon: ShieldCheck, label: "Precisión garantizada con IA", color: "text-primary" },
  { icon: TrendingUp, label: "Ahorro de costos y tiempo", color: "text-primary" },
];

const ProblemSolution = () => (
  <section id="beneficios" className="section-padding bg-background">
    <div className="section-container">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            De procesos lentos a <span className="text-brand-ia">EfficiencIA</span> total
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Descubre cómo la automatización inteligente transforma la operación de tu empresa.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Before */}
        <ScrollReveal>
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 md:p-8">
            <h3 className="text-lg font-bold text-destructive mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">✗</span>
              Sin automatización
            </h3>
            <div className="space-y-5">
              {before.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className={item.color} />
                  </div>
                  <p className="text-foreground font-medium pt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* After */}
        <ScrollReveal delay={150}>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">✓</span>
              Con EfficiencIA
            </h3>
            <div className="space-y-5">
              {after.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={20} className={item.color} />
                  </div>
                  <p className="text-foreground font-medium pt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default ProblemSolution;
