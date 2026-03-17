import ScrollReveal from "@/components/ScrollReveal";
import { useTranslation } from "react-i18next";

const logos = ["Nodus Flex Center"];

const LogoStrip = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 md:py-14 bg-background border-b border-border/50">
      <div className="section-container">
        <ScrollReveal>
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-8">
            {t("logoStrip.title")}
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
};

export default LogoStrip;