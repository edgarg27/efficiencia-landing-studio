import { useTranslation } from "react-i18next";
import { Fragment, useState } from "react";

type Msg = { from: "b" | "u"; text: string };
// Cada proyecto se muestra como conversación de chat (msgs) o como captura de pantalla (img).
type CaseData = { title: string; desc: string; tagA: string; tagB: string; msgs?: Msg[]; img?: string; imgAlt?: string; avatar?: string; botName?: string; status?: string };


const Portfolio = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const data = t("portfolio.cases", { returnObjects: true }) as CaseData[];
  const cases = data.map((d, i) => ({
    num: "0" + (i + 1), title: d.title, desc: d.desc, tagA: d.tagA, tagB: d.tagB,
    tabClass: active === i ? "cs on" : "cs", pressed: active === i, show: active === i,
    pick: () => setActive(i),
    img: d.img, imgAlt: d.imgAlt ?? "", avatar: d.avatar, botName: d.botName ?? t("portfolio.botName"), status: d.status ?? t("portfolio.status"),
    messages: (d.msgs ?? []).map((m, j) => ({ text: m.text, cls: m.from === "b" ? "mb" : "mu", delay: 200 + j * 650 + "ms" })),
  }));

  return (
    <>
<section id="portafolio" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 40px" }}>
 <div className="rv" style={{ maxWidth: "680px" }}>
  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("portfolio.label")}</p>
  <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("portfolio.title")}</h2>
  <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}>{t("portfolio.description")}</p>
 </div>

 <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))", gap: "40px", alignItems: "start" }}>
  {/* Selector de proyectos */}
  <div className="rv2" role="group" aria-label={t("portfolio.groupLabel")} style={{ display: "grid", gap: "12px" }}>
   {cases.map((c) => (<Fragment key={c.num}>
    <button type="button" className={c.tabClass} aria-pressed={c.pressed} onClick={c.pick}>
     <span className="mono" style={{ fontSize: "12px", color: "#087A55" }}>{c.num}</span>
     <span style={{ display: "block", marginTop: "6px", fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: "20px", fontWeight: "700", letterSpacing: "-0.02em", color: "#121821" }}>{c.title}</span>
     <span style={{ display: "block", marginTop: "6px", fontSize: "14px", lineHeight: "1.55", color: "#47566B" }}>{c.desc}</span>
     <span style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
      <span style={{ padding: "4px 10px", borderRadius: "99px", background: "#F3F5F7", fontSize: "12px", fontWeight: "600", color: "#47566B" }}>{c.tagA}</span>
      <span style={{ padding: "4px 10px", borderRadius: "99px", background: "#F3F5F7", fontSize: "12px", fontWeight: "600", color: "#47566B" }}>{c.tagB}</span>
     </span>
    </button>
   </Fragment>))}
   <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#47566B" }}>{t("portfolio.note")}</p>
  </div>

  {/* Contenedor fijo: el revelado (rv3) se aplica una sola vez y el panel cambia por dentro */}
  <div className="rv3">
  {cases.map((c) => c.show && c.img && (<Fragment key={c.num}>
  {/* Captura de pantalla del proyecto */}
  <div style={{ border: "1px solid #E1E7EF", borderRadius: "24px", background: "#fff", boxShadow: "0 40px 80px -48px rgba(18,24,33,.3),0 2px 6px rgba(18,24,33,.05)", overflow: "hidden" }}>
   <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: "7px", padding: "14px 18px", background: "#0E1620" }}>
    <i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#47566B" }}></i><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#47566B" }}></i><i style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#47566B" }}></i>
   </div>
   <img src={c.img} alt={c.imgAlt} loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "auto", background: "#F9FAFB" }} />
  </div>
  </Fragment>))}

  {cases.map((c) => c.show && !c.img && (<Fragment key={c.num}>
  {/* Ventana de chat */}
  <div style={{ border: "1px solid #E1E7EF", borderRadius: "24px", background: "#fff", boxShadow: "0 40px 80px -48px rgba(18,24,33,.3),0 2px 6px rgba(18,24,33,.05)", overflow: "hidden" }}>
   <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", background: "#0E1620", color: "#fff" }}>
    {c.avatar
     ? <img src={c.avatar} alt="" width={40} height={40} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(255,255,255,.18)", flex: "0 0 auto" }} />
     : <span style={{ width: "40px", height: "40px", borderRadius: "12px", display: "grid", placeItems: "center", background: "#10B77F" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 8V5M9 13v1M15 13v1"/><circle cx="12" cy="4" r="1"/></svg></span>}
    <span><strong style={{ display: "block", fontSize: "15px" }}>{c.botName}</strong><span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#A9B6C8" }}><i className="live" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34D399" }}></i>{c.status}</span></span>
    {/* Iconos decorativos de WhatsApp (buscar y menú) */}
    {c.avatar && (<span aria-hidden="true" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "18px", color: "#fff" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg></span>)}
   </div>
   <div aria-live="polite" style={{ minHeight: "440px", padding: "22px 20px", background: "#F9FAFB", display: "flex", flexDirection: "column" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
     {c.messages.map((m, j) => (<Fragment key={j}>
      <div className={m.cls} style={{ animationDelay: m.delay }}>{m.text}</div>
     </Fragment>))}
    </div>
   </div>
   <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", borderTop: "1px solid #E1E7EF", background: "#fff" }}>
    <div style={{ flex: "1", minHeight: "44px", display: "flex", alignItems: "center", padding: "0 16px", borderRadius: "12px", border: "1px solid #E1E7EF", fontSize: "14px", color: "#47566B" }}>{t("portfolio.placeholder")}</div>
    <span aria-hidden="true" style={{ width: "44px", height: "44px", borderRadius: "12px", display: "grid", placeItems: "center", background: "#087A55", color: "#fff" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
   </div>
  </div>
  </Fragment>))}
  </div>
 </div>
</section>
    </>
  );
};

export default Portfolio;
