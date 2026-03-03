import ScrollReveal from "@/components/ScrollReveal";

const logos = ["TechCorp", "DataFlow", "Nexus AI", "CloudBase", "AutoSys"];

const LogoStrip = () => (
  <section className="py-10 md:py-14 bg-background border-b border-border/50">
    <div className="section-container">
      <ScrollReveal>
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
          Empresas que ya multiplicaron su eficiencia
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center h-10 px-5 rounded-lg bg-muted/60 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <span className="text-sm font-bold tracking-wide text-muted-foreground select-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default LogoStrip;
