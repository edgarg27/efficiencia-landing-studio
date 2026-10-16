import { useTranslation } from "react-i18next";
const LogoStrip = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="casos" style={{ borderTop: "1px solid #E1E7EF", borderBottom: "1px solid #E1E7EF", background: "#F9FAFB" }}>
 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
  <p className="rv" style={{ margin: "0", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#47566B" }}>{t("logoStrip.title")}</p>
  <div className="rv2" style={{ display: "flex", alignItems: "center" }}>
   <img src="/nodus-flex-center.jpg" alt="Nodus Flex Center" width="1979" height="676" loading="lazy" style={{ height: "64px", width: "auto", borderRadius: "10px", display: "block" }} />
  </div>
 </div>
</section>
  </>
  );
};

export default LogoStrip;
