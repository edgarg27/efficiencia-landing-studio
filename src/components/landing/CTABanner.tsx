import { useTranslation } from "react-i18next";
const CTABanner = () => {
  const { t } = useTranslation();

  return (
  <>
<section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 110px" }}>
 <div className="rv" style={{ position: "relative", overflow: "hidden", padding: "clamp(40px,7vw,88px) clamp(24px,5vw,72px)", borderRadius: "28px", background: "#0E1620", color: "#fff", textAlign: "center" }}>
  <div aria-hidden="true" style={{ position: "absolute", inset: "auto 0 0 0", height: "6px", background: "#10B77F" }}></div>
  <div style={{ position: "relative" }}>
   <h2 className="disp" style={{ margin: "0 auto", maxWidth: "760px", fontSize: "clamp(32px,4.6vw,54px)", lineHeight: "1.05", fontWeight: "800", textWrap: "balance" }}>{t("cta.title")}</h2>
   <p style={{ margin: "20px auto 0", maxWidth: "560px", fontSize: "17px", lineHeight: "1.6", color: "#A9B6C8" }}>{t("cta.description")}</p>
   <a className="btn btn-d" href="#contacto" style={{ marginTop: "34px" }}>{t("cta.button")}
    <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
  </div>
 </div>
</section>
  </>
  );
};

export default CTABanner;
