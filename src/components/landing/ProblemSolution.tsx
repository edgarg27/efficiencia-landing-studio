import { useTranslation, Trans } from "react-i18next";
const ProblemSolution = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="beneficios" style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 40px" }}>
 <div className="rv" style={{ maxWidth: "640px" }}>
  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("benefits.label")}</p>
  <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}><Trans i18nKey="benefits.title" components={{ b: <span style={{ color: "#0B8F63" }} /> }} /></h2>
  <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}>{t("benefits.description")}</p>
 </div>
 <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "20px" }}>
  <div className="rv2" style={{ padding: "32px", borderRadius: "20px", background: "#F9FAFB", border: "1px solid #E1E7EF" }}>
   <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#C73030", fontWeight: "700", fontSize: "14px" }}>
    <span style={{ display: "grid", placeItems: "center", width: "26px", height: "26px", borderRadius: "50%", background: "rgba(239,67,67,.1)" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></span>{t("benefits.beforeTitle")}</div>
   <ul style={{ listStyle: "none", margin: "24px 0 0", padding: "0", display: "grid", gap: "16px", fontSize: "17px", color: "#47566B" }}>
    <li style={{ display: "flex", gap: "12px", alignItems: "center" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EF4343", flex: "none" }}></span>{t("benefits.before1")}</li>
    <li style={{ display: "flex", gap: "12px", alignItems: "center" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EF4343", flex: "none" }}></span>{t("benefits.before2")}</li>
    <li style={{ display: "flex", gap: "12px", alignItems: "center" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EF4343", flex: "none" }}></span>{t("benefits.before3")}</li>
   </ul>
  </div>
  <div className="rv3" style={{ padding: "32px", borderRadius: "20px", background: "linear-gradient(160deg,#F2FCF8,#fff 70%)", border: "1px solid rgba(16,183,127,.4)", boxShadow: "0 24px 50px -30px rgba(18,24,33,.18)" }}>
   <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#087A55", fontWeight: "700", fontSize: "14px" }}>
    <span style={{ display: "grid", placeItems: "center", width: "26px", height: "26px", borderRadius: "50%", background: "#10B77F", color: "#fff" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></span>{t("benefits.afterTitle")}</div>
   <ul style={{ listStyle: "none", margin: "24px 0 0", padding: "0", display: "grid", gap: "16px", fontSize: "17px", color: "#121821", fontWeight: "500" }}>
    <li style={{ display: "flex", gap: "12px", alignItems: "center" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B77F", flex: "none" }}></span>{t("benefits.after1")}</li>
    <li style={{ display: "flex", gap: "12px", alignItems: "center" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B77F", flex: "none" }}></span>{t("benefits.after2")}</li>
    <li style={{ display: "flex", gap: "12px", alignItems: "center" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B77F", flex: "none" }}></span>{t("benefits.after3")}</li>
   </ul>
  </div>
 </div>
</section>
  </>
  );
};

export default ProblemSolution;
