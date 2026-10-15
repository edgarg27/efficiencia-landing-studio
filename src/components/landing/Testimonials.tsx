import { useTranslation } from "react-i18next";
const Testimonials = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="testimonios" style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 40px" }}>
 <div className="rv" style={{ maxWidth: "640px" }}>
  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("testimonials.label")}</p>
  <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("testimonials.title")}</h2>
  <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}>{t("testimonials.description")}</p>
 </div>
 <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "20px" }}>
  <figure className="card rv2" style={{ margin: "0", padding: "32px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px" }}>
   <div>
    <div className="disp" style={{ fontSize: "56px", lineHeight: "1", fontWeight: "800", color: "#0B8F63" }}><span className="cnt k40" data-s="%"><span className="ph">40%</span></span></div>
    <blockquote style={{ margin: "14px 0 0", fontSize: "18px", lineHeight: "1.55", fontWeight: "500" }}>{t("testimonials.quote1")}</blockquote>
   </div>
   <figcaption style={{ display: "flex", alignItems: "center", gap: "12px" }}><span style={{ width: "44px", height: "44px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(16,183,127,.12)", color: "#087A55", fontWeight: "700" }}>G</span><span><strong style={{ display: "block", fontSize: "15px" }}>Gerardo</strong><span style={{ fontSize: "13px", color: "#47566B" }}>{t("testimonials.role1")}</span></span></figcaption>
  </figure>
  <figure className="card rv3" style={{ margin: "0", padding: "32px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "28px" }}>
   <div>
    <div className="disp" style={{ fontSize: "56px", lineHeight: "1", fontWeight: "800", color: "#0B8F63" }}><span className="cnt k120" data-s=" h"><span className="ph">120 h</span></span><span style={{ fontSize: "22px", fontWeight: "700", color: "#47566B" }}>{t("testimonials.perMonth")}</span></div>
    <blockquote style={{ margin: "14px 0 0", fontSize: "18px", lineHeight: "1.55", fontWeight: "500" }}>{t("testimonials.quote2")}</blockquote>
   </div>
   <figcaption style={{ display: "flex", alignItems: "center", gap: "12px" }}><span style={{ width: "44px", height: "44px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(16,183,127,.12)", color: "#087A55", fontWeight: "700" }}>M</span><span><strong style={{ display: "block", fontSize: "15px" }}>Maribel</strong><span style={{ fontSize: "13px", color: "#47566B" }}>{t("testimonials.role2")}</span></span></figcaption>
  </figure>
 </div>
</section>
  </>
  );
};

export default Testimonials;
