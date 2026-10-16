import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();

  return (
  <>
<footer style={{ borderTop: "1px solid #E1E7EF", background: "#F9FAFB" }}>
 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "36px" }}>
  <div style={{ maxWidth: "320px" }}>
   <a className="logo-link" href="/" style={{ display: "inline-block" }}>
    <img src="/logo.png" alt="EfficiencIA" width="105" height="60" style={{ display: "block", height: "60px", width: "auto" }} />
   </a>
   <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "1.6", color: "#47566B" }}>{t("footer.description")}</p>
  </div>
  <nav aria-label={t("footer.navLabel")}>
   <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em" }}>{t("footer.navTitle")}</p>
   <div className="nav" style={{ display: "grid", gap: "10px", fontSize: "14px", color: "#47566B" }}><a className="lnk blk" href="#beneficios">{t("footer.benefits")}</a><a className="lnk blk" href="#servicios">{t("footer.services")}</a><a className="lnk blk" href="#proceso">{t("footer.process")}</a><a className="lnk blk" href="#contacto">{t("footer.contact")}</a></div>
  </nav>
  <div>
   <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em" }}>{t("footer.socialTitle")}</p>
   <div className="nav" style={{ display: "grid", gap: "10px", fontSize: "14px", color: "#47566B" }}><a className="lnk blk" href="https://www.tiktok.com/@efficiencia?_r=1&_t=ZS-94ZvlwjmtvO" target="_blank" rel="noopener noreferrer">TikTok</a><a className="lnk blk" href="https://www.instagram.com/efficiencia22/" target="_blank" rel="noopener noreferrer">Instagram</a><a className="lnk blk" href="https://www.facebook.com/profile.php?id=61587188300318" target="_blank" rel="noopener noreferrer">Facebook</a></div>
  </div>
 </div>
 <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 32px", fontSize: "13px", color: "#47566B" }}>{t("footer.rights", { year: new Date().getFullYear() })} · <a className="lnk" href="/privacidad">{t("form.privacyLink")}</a></div>
</footer>
  </>
  );
};

export default Footer;
