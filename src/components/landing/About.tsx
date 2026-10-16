import { useTranslation } from "react-i18next";

type Fact = { value: string; label: string };

const About = () => {
  const { t } = useTranslation();
  const facts = t("about.facts", { returnObjects: true }) as Fact[];
  const tools = t("about.tools", { returnObjects: true }) as string[];

  return (
  <>
<section id="nosotros" style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 40px" }}>
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "48px", alignItems: "center" }}>
  <div className="rv">
   <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("about.label")}</p>
   <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("about.title")}</h2>
   <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}>{t("about.description")}</p>
  </div>

  <div className="rv2" style={{ display: "grid", gap: "14px" }}>
   {facts.map((f) => (
    <div key={f.value} className="card" style={{ display: "flex", alignItems: "center", gap: "18px", padding: "22px 24px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff" }}>
     <span className="disp" style={{ flex: "0 0 auto", minWidth: "150px", whiteSpace: "nowrap", fontSize: "26px", lineHeight: "1.1", fontWeight: "800", color: "#0B8F63" }}>{f.value}</span>
     <span style={{ fontSize: "15px", lineHeight: "1.55", color: "#47566B" }}>{f.label}</span>
    </div>
   ))}
  </div>
 </div>

 <div className="rv3" style={{ marginTop: "48px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
  <span style={{ marginRight: "6px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#47566B" }}>{t("about.toolsLabel")}</span>
  {tools.map((tool) => (
   <span key={tool} style={{ padding: "8px 14px", borderRadius: "99px", background: "#F3F5F7", fontSize: "14px", fontWeight: "600", color: "#121821" }}>{tool}</span>
  ))}
 </div>
</section>
  </>
  );
};

export default About;
