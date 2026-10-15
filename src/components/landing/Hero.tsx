import { useTranslation, Trans } from "react-i18next";
const Hero = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="inicio" style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "24px 24px 72px", minHeight: "calc(100svh - var(--hd-h, 76px))", display: "flex", alignItems: "center" }}>
 <div className="grid-bg" aria-hidden="true" style={{ position: "absolute", inset: "-40px -200px 0 -200px", zIndex: "0" }}></div>
 <div className="hero-out" style={{ position: "relative", zIndex: "1", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,460px),1fr))", gap: "48px", alignItems: "center" }}>
  <div>
   <div className="in" style={{ "--d": "0", display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 14px", borderRadius: "999px", background: "rgba(16,183,127,.1)", border: "1px solid rgba(16,183,127,.25)", color: "#087A55", fontSize: "12px", fontWeight: "700", letterSpacing: ".08em" }}>
    <span className="live" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B77F" }}></span>{t("hero.badge")}
   </div>
   <h1 className="disp in" style={{ "--d": "1", margin: "18px 0 0", fontSize: "clamp(38px,4.7vw,66px)", lineHeight: "1", fontWeight: "800", textWrap: "balance" }}><Trans i18nKey="hero.title" components={{ b: <span style={{ color: "#0B8F63" }} /> }} /></h1>
   <p className="in" style={{ "--d": "2", margin: "20px 0 0", maxWidth: "520px", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}><Trans i18nKey="hero.description" components={{ b: <strong style={{ color: "#121821" }} /> }} /></p>
   <div className="in" style={{ "--d": "3", marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
    <a className="btn btn-p" href="#contacto">{t("hero.start")}
     <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    <a className="btn btn-s" href="#casos">
     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 5l12 7-12 7z"/></svg>{t("hero.cases")}</a>
   </div>
  </div>

  {/* Dashboard */}
  <div className="float" style={{ position: "relative", width: "100%", maxWidth: "560px", margin: "0 auto" }}>
   <div className="dash" style={{ background: "#fff", border: "1px solid #E1E7EF", borderRadius: "20px", padding: "22px 24px 24px", boxShadow: "0 40px 80px -40px rgba(18,24,33,.3),0 2px 6px rgba(18,24,33,.05)" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
     <div style={{ display: "flex", gap: "6px" }} aria-hidden="true"><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(239,67,67,.6)" }}></i><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(251,191,36,.6)" }}></i><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(16,183,127,.6)" }}></i></div>
     <span style={{ fontSize: "12px", color: "#47566B" }}>{t("hero.dashboard")}</span>
    </div>
    <div style={{ display: "grid", gap: "12px" }}>
     <div style={{ padding: "14px 16px", borderRadius: "12px", background: "#F9FAFB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600" }}><span>{t("hero.step1")}</span><span className="pct p100 mono" style={{ fontSize: "13px", color: "#087A55" }}></span></div>
      <div style={{ marginTop: "10px", height: "8px", borderRadius: "99px", background: "#E1E7EF", overflow: "hidden" }}><div className="bar" style={{ "--bd": "700ms", width: "100%", height: "100%", borderRadius: "99px", background: "#10B77F" }}></div></div>
     </div>
     <div style={{ padding: "14px 16px", borderRadius: "12px", background: "#F9FAFB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600" }}><span>{t("hero.step2")}</span><span className="pct p78 mono" style={{ "--bd": "1000ms", fontSize: "13px", color: "#087A55" }}></span></div>
      <div style={{ marginTop: "10px", height: "8px", borderRadius: "99px", background: "#E1E7EF", overflow: "hidden" }}><div className="bar" style={{ "--bd": "1000ms", width: "78%", height: "100%", borderRadius: "99px", background: "#10B77F" }}></div></div>
     </div>
     <div style={{ padding: "14px 16px", borderRadius: "12px", background: "#F9FAFB" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "600" }}><span>{t("hero.step3")}</span><span className="pct p45 mono" style={{ "--bd": "1300ms", fontSize: "13px", color: "#087A55" }}></span></div>
      <div style={{ marginTop: "10px", height: "8px", borderRadius: "99px", background: "#E1E7EF", overflow: "hidden" }}><div className="bar" style={{ "--bd": "1300ms", width: "45%", height: "100%", borderRadius: "99px", background: "#10B77F" }}></div></div>
     </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center", margin: "14px 0 10px" }} aria-hidden="true">
     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path className="draw" d="M12 4v15M6 13l6 6 6-6"/></svg>
    </div>
    <div className="done" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", borderRadius: "12px", background: "rgba(16,183,127,.1)", border: "1px solid rgba(16,183,127,.2)", color: "#087A55", fontWeight: "700", fontSize: "14px" }}>
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>{t("hero.done")}{" "}<span className="mono">3.2s</span>
    </div>
   </div>
  </div>
 </div>
</section>
  </>
  );
};

export default Hero;
