import { useTranslation } from "react-i18next";
const LogoStrip = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="casos" style={{ borderTop: "1px solid #E1E7EF", borderBottom: "1px solid #E1E7EF", background: "#F9FAFB" }}>
 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
  <p className="rv" style={{ margin: "0", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#47566B" }}>{t("logoStrip.title")}</p>
  <div className="rv2" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
   <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="14" fill="#121821"/><path d="M9 19V9l10 10V9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
   <span className="disp" style={{ fontSize: "22px", fontWeight: "700", color: "#121821" }}>Nodus Flex Center</span>
  </div>
 </div>
</section>
  </>
  );
};

export default LogoStrip;
