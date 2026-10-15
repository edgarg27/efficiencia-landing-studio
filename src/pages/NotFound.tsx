import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#F9FAFB", padding: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <a className="logo-link" href="/" style={{ display: "inline-block", marginBottom: "28px" }}>
          <img src="/logo.png" alt="EfficiencIA" width="105" height="60" style={{ display: "block", height: "60px", width: "auto" }} />
        </a>
        <p className="mono" style={{ margin: "0 0 12px", fontSize: "14px", color: "#087A55" }}>{t("notFound.code")}</p>
        <h1 className="disp" style={{ margin: "0 0 12px", fontSize: "clamp(40px,6vw,64px)", fontWeight: "800", lineHeight: "1.05" }}>{t("notFound.title")}</h1>
        <p style={{ margin: "0 0 28px", fontSize: "17px", color: "#47566B" }}>{t("notFound.description")}</p>
        <a className="btn btn-p" href="/">{t("notFound.back")}</a>
      </div>
    </main>
  );
};

export default NotFound;
