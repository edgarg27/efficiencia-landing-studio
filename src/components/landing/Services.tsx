import { useTranslation } from "react-i18next";
const Services = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="servicios" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 40px" }}>
 <div className="rv" style={{ maxWidth: "640px" }}>
  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("services.label")}</p>
  <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("services.title")}</h2>
  <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}>{t("services.description")}</p>
 </div>
 <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "20px" }}>
  <article className="card rv" style={{ padding: "28px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff" }}>
   <div className="ico" style={{ width: "48px", height: "48px", borderRadius: "14px", display: "grid", placeItems: "center", background: "rgba(16,183,127,.1)", color: "#087A55" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V5M9 13v1M15 13v1M2 13v2M22 13v2"/><circle cx="12" cy="4" r="1"/></svg></div>
   <h3 className="disp" style={{ margin: "22px 0 10px", fontSize: "21px", lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("services.item1Title")}</h3>
   <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#47566B" }}>{t("services.item1Desc")}</p>
  </article>
  <article className="card rv2" style={{ padding: "28px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff" }}>
   <div className="ico" style={{ width: "48px", height: "48px", borderRadius: "14px", display: "grid", placeItems: "center", background: "rgba(16,183,127,.1)", color: "#087A55" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l3 8.5M16 7.5l-3 8.5M8.5 6h7"/></svg></div>
   <h3 className="disp" style={{ margin: "22px 0 10px", fontSize: "21px", lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("services.item2Title")}</h3>
   <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#47566B" }}>{t("services.item2Desc")}</p>
  </article>
  <article className="card rv3" style={{ padding: "28px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff" }}>
   <div className="ico" style={{ width: "48px", height: "48px", borderRadius: "14px", display: "grid", placeItems: "center", background: "rgba(16,183,127,.1)", color: "#087A55" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2h-7l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z"/><path d="M8 10h8M8 13h5"/></svg></div>
   <h3 className="disp" style={{ margin: "22px 0 10px", fontSize: "21px", lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("services.item3Title")}</h3>
   <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#47566B" }}>{t("services.item3Desc")}</p>
  </article>
  <article className="card rv3" style={{ padding: "28px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff" }}>
   <div className="ico" style={{ width: "48px", height: "48px", borderRadius: "14px", display: "grid", placeItems: "center", background: "rgba(16,183,127,.1)", color: "#087A55" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V4M4 20h16"/><path d="M8 15l3-4 3 2 5-6"/></svg></div>
   <h3 className="disp" style={{ margin: "22px 0 10px", fontSize: "21px", lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("services.item4Title")}</h3>
   <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#47566B" }}>{t("services.item4Desc")}</p>
  </article>
 </div>
</section>
  </>
  );
};

export default Services;
