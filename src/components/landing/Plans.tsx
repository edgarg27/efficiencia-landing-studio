import { useTranslation } from "react-i18next";
const Plans = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="planes" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 20px" }}>
 <div className="rv" style={{ maxWidth: "640px" }}>
  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("plans.label")}</p>
  <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("plans.title")}</h2>
  <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}>{t("plans.description")}</p>
 </div>
 <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "20px", alignItems: "stretch" }}>
  <article className="card pl rv" style={{ position: "relative", display: "flex", flexDirection: "column", padding: "32px", borderRadius: "24px" }}>
   
   <h3 className="disp" style={{ margin: "0", fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("plans.p1Name")}</h3>
   <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#47566B" }}>{t("plans.p1Desc")}</p>
   <div style={{ margin: "28px 0 6px", display: "flex", alignItems: "baseline", gap: "6px" }}><span className="disp" style={{ fontSize: "48px", lineHeight: "1", fontWeight: "800", color: "#121821" }}>$[PRECIO]</span><span style={{ fontSize: "14px", color: "#47566B" }}>{t("plans.perMonth")}</span></div>
   <p style={{ margin: "0 0 28px", fontSize: "13px", color: "#47566B" }}>{t("plans.billing")}</p>
   <ul style={{ listStyle: "none", margin: "0 0 32px", padding: "0", display: "grid", gap: "14px", flex: "1" }}><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p1f1")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p1f2")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p1f3")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p1f4")}</li></ul>
   <a className="btn btn-s" href="#contacto" style={{ width: "100%" }}>{t("plans.p1Cta")}</a>
  </article>
  <article className="pl pl-f rv2" style={{ position: "relative", display: "flex", flexDirection: "column", padding: "32px", borderRadius: "24px" }}>
   <span style={{ position: "absolute", top: "-13px", left: "32px", padding: "5px 12px", borderRadius: "99px", background: "#10B77F", color: "#06231A", fontSize: "12px", fontWeight: "700" }}>{t("plans.featured")}</span>
   <h3 className="disp" style={{ margin: "0", fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("plans.p2Name")}</h3>
   <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#A9B6C8" }}>{t("plans.p2Desc")}</p>
   <div style={{ margin: "28px 0 6px", display: "flex", alignItems: "baseline", gap: "6px" }}><span className="disp" style={{ fontSize: "48px", lineHeight: "1", fontWeight: "800", color: "#fff" }}>$[PRECIO]</span><span style={{ fontSize: "14px", color: "#A9B6C8" }}>{t("plans.perMonth")}</span></div>
   <p style={{ margin: "0 0 28px", fontSize: "13px", color: "#A9B6C8" }}>{t("plans.billing")}</p>
   <ul style={{ listStyle: "none", margin: "0 0 32px", padding: "0", display: "grid", gap: "14px", flex: "1" }}><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#fff" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p2f1")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#fff" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p2f2")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#fff" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p2f3")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#fff" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p2f4")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#fff" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p2f5")}</li></ul>
   <a className="btn btn-p" href="#contacto" style={{ width: "100%" }}>{t("plans.p2Cta")}</a>
  </article>
  <article className="card pl rv3" style={{ position: "relative", display: "flex", flexDirection: "column", padding: "32px", borderRadius: "24px" }}>
   
   <h3 className="disp" style={{ margin: "0", fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("plans.p3Name")}</h3>
   <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.55", color: "#47566B" }}>{t("plans.p3Desc")}</p>
   <div style={{ margin: "28px 0 6px", display: "flex", alignItems: "baseline", gap: "6px" }}><span className="disp" style={{ fontSize: "48px", lineHeight: "1", fontWeight: "800", color: "#121821" }}>$[PRECIO]</span><span style={{ fontSize: "14px", color: "#47566B" }}>{t("plans.perMonth")}</span></div>
   <p style={{ margin: "0 0 28px", fontSize: "13px", color: "#47566B" }}>{t("plans.billing")}</p>
   <ul style={{ listStyle: "none", margin: "0 0 32px", padding: "0", display: "grid", gap: "14px", flex: "1" }}><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p3f1")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p3f2")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p3f3")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p3f4")}</li><li style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: "#121821" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>{t("plans.p3f5")}</li></ul>
   <a className="btn btn-s" href="#contacto" style={{ width: "100%" }}>{t("plans.p3Cta")}</a>
  </article>
 </div>
 <p style={{ margin: "24px 0 0", fontSize: "13px", color: "#47566B" }}>{t("plans.note")}</p>
</section>
  </>
  );
};

export default Plans;
