import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <>
<section id="contacto" style={{ maxWidth: "1200px", margin: "0 auto", padding: "110px 24px 60px" }}>
 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "56px", alignItems: "start" }}>
  <div className="rv" style={{ position: "relative" }}>
   <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("contact.label")}</p>
   <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("contact.title")}</h2>
   <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B", maxWidth: "460px" }}>{t("contact.description")}</p>
   <div style={{ marginTop: "28px", display: "flex", alignItems: "center", gap: "10px", color: "#47566B", fontSize: "14px" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#087A55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
    <a href="mailto:ventas@efficiencia.cloud" style={{ fontWeight: "600", color: "#121821" }}>ventas@efficiencia.cloud</a>
   </div>
  </div>
  <div className="rv2" style={{ padding: "32px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff", boxShadow: "0 30px 60px -40px rgba(18,24,33,.3)" }}>
   <ContactForm />
  </div>
 </div>
</section>
    </>
  );
};

export default ContactSection;
