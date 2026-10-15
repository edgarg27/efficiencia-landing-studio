import { useTranslation } from "react-i18next";
const HowWeWork = () => {
  const { t } = useTranslation();

  return (
  <>
<section id="proceso" style={{ marginTop: "100px", background: "#0E1620", color: "#fff", position: "relative", overflow: "hidden" }}>
 <div aria-hidden="true" style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(to right,rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "56px 56px" }}></div>
 <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "110px 24px 120px" }}>
  <div className="rv" style={{ maxWidth: "640px" }}>
   <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#34D399" }}>{t("process.label")}</p>
   <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("process.title")}</h2>
   <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#A9B6C8" }}>{t("process.description")}</p>
  </div>
  <div style={{ position: "relative", marginTop: "64px" }}>
   <div className="hide-s" aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", top: "27px", height: "2px", background: "rgba(255,255,255,.1)" }}><div className="line" style={{ height: "100%", background: "#10B77F" }}></div></div>
   <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "40px" }}>
    <div className="rv">
     <div className="mono" style={{ width: "56px", height: "56px", borderRadius: "16px", display: "grid", placeItems: "center", background: "#10B77F", color: "#06231A", fontSize: "16px", fontWeight: "500" }}>01</div>
     <p style={{ margin: "24px 0 6px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#34D399" }}>{t("process.step", { n: "01" })}</p>
     <h3 className="disp" style={{ margin: "0 0 10px", fontSize: "24px", lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("process.step1Title")}</h3>
     <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.65", color: "#A9B6C8" }}>{t("process.step1Desc")}</p>
    </div>
    <div className="rv2">
     <div className="mono" style={{ width: "56px", height: "56px", borderRadius: "16px", display: "grid", placeItems: "center", background: "#10B77F", color: "#06231A", fontSize: "16px", fontWeight: "500" }}>02</div>
     <p style={{ margin: "24px 0 6px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#34D399" }}>{t("process.step", { n: "02" })}</p>
     <h3 className="disp" style={{ margin: "0 0 10px", fontSize: "24px", lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("process.step2Title")}</h3>
     <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.65", color: "#A9B6C8" }}>{t("process.step2Desc")}</p>
    </div>
    <div className="rv3">
     <div className="mono" style={{ width: "56px", height: "56px", borderRadius: "16px", display: "grid", placeItems: "center", background: "#10B77F", color: "#06231A", fontSize: "16px", fontWeight: "500" }}>03</div>
     <p style={{ margin: "24px 0 6px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#34D399" }}>{t("process.step", { n: "03" })}</p>
     <h3 className="disp" style={{ margin: "0 0 10px", fontSize: "24px", lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }}>{t("process.step3Title")}</h3>
     <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.65", color: "#A9B6C8" }}>{t("process.step3Desc")}</p>
    </div>
   </div>
  </div>
 </div>
</section>
  </>
  );
};

export default HowWeWork;
