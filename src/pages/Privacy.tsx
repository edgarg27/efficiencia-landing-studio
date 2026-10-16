import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type Section = { h: string; p: string[] };

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const sections = t("privacyPage.sections", { returnObjects: true }) as Section[];

  useEffect(() => {
    document.title = t("privacyPage.metaTitle");
  }, [t, i18n.language]);

  return (
    <main style={{ minHeight: "100vh", background: "#F9FAFB", padding: "48px 24px 80px" }}>
      <article style={{ maxWidth: "760px", margin: "0 auto" }}>
        <a className="logo-link" href="/" style={{ display: "inline-block", marginBottom: "32px" }}>
          <img src="/logo.png" alt="EfficiencIA" width="105" height="60" style={{ display: "block", height: "60px", width: "auto" }} />
        </a>
        <h1 className="disp" style={{ margin: "0 0 8px", fontSize: "clamp(32px,5vw,48px)", fontWeight: "800", lineHeight: "1.1" }}>
          {t("privacyPage.title")}
        </h1>
        <p className="mono" style={{ margin: "0 0 36px", fontSize: "13px", color: "#47566B" }}>{t("privacyPage.updated")}</p>
        {sections.map((s) => (
          <section key={s.h} style={{ marginBottom: "28px" }}>
            <h2 className="disp" style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: "700" }}>{s.h}</h2>
            {s.p.map((para) => (
              <p key={para} style={{ margin: "0 0 10px", fontSize: "16px", lineHeight: "1.7", color: "#47566B" }}>{para}</p>
            ))}
          </section>
        ))}
        <a className="btn btn-p" href="/" style={{ marginTop: "12px" }}>{t("privacyPage.back")}</a>
      </article>
    </main>
  );
};

export default Privacy;
