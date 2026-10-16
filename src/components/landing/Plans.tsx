import { useTranslation, Trans } from "react-i18next";
import {
  FOUNDER_SPOTS,
  formatPrice,
  monthlyPrice,
  PLAN_PRICES,
  selectBilling,
  selectPlan,
  useBilling,
  usePlan,
  WA_NUMBER,
  waLink,
  type PlanId,
} from "@/lib/plans";

const PLANS: { id: PlanId; n: 1 | 2 | 3; featured?: boolean; reveal: string }[] = [
  { id: "responde", n: 1, reveal: "rv" },
  { id: "agenda", n: 2, featured: true, reveal: "rv2" },
  { id: "vende", n: 3, reveal: "rv3" },
];

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B77F" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none", marginTop: "2px" }}><path d="M5 12l5 5 9-10"/></svg>
);

const Plans = () => {
  const { t, i18n } = useTranslation();
  const sel = usePlan();
  const billing = useBilling();
  const money = (amount: number) => formatPrice(amount, i18n.language);

  return (
  <>
<section id="planes" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 20px" }}>
 <div className="rv" style={{ maxWidth: "720px" }}>
  <p style={{ margin: "0 0 14px", fontSize: "12px", fontWeight: "700", letterSpacing: ".1em", color: "#087A55" }}>{t("plans.label")}</p>
  <h2 className="disp" style={{ margin: "0", fontSize: "clamp(34px,4.6vw,54px)", lineHeight: "1.04", fontWeight: "800", textWrap: "balance" }}>{t("plans.title")}</h2>
  <p style={{ margin: "18px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#47566B" }}>{t("plans.description")}</p>
  <ul className="pl-chips" aria-label={t("plans.idealFor")}>
   {(t("plans.niches", { returnObjects: true }) as string[]).map((n) => <li key={n}>{n}</li>)}
  </ul>
 </div>

 <div className="rv2 pl-promo">
  <span className="pl-pill">{t("plans.promoPill")}</span>
  <span><Trans i18nKey="plans.promo" values={{ count: FOUNDER_SPOTS }} components={{ b: <b /> }} /></span>
 </div>

 <div className="pl-toggle" role="radiogroup" aria-label={t("plans.billingLabel")}>
  {(["monthly", "annual"] as const).map((b) => (
   <button key={b} type="button" role="radio" aria-checked={billing === b} onClick={() => selectBilling(b)}>
    {t(`plans.${b}`)}{b === "annual" && <small>{t("plans.annualBonus")}</small>}
   </button>
  ))}
 </div>

 <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "20px", alignItems: "stretch" }}>
  {PLANS.map(({ id, n, featured, reveal }) => {
   const muted = featured ? "#A9B6C8" : "#47566B";
   const ink = featured ? "#fff" : "#121821";
   const price = monthlyPrice(id, billing);
   const features = t(`plans.p${n}f`, { returnObjects: true }) as string[];
   return (
  <article key={id} className={(featured ? "pl pl-f " : "card pl ") + reveal} data-sel={sel === id} style={{ position: "relative", display: "flex", flexDirection: "column", padding: "32px", borderRadius: "24px" }}>
   {sel === id && <span className="pl-tag" aria-hidden="true">✓ {t("plans.selected")}</span>}
   {featured && <span style={{ position: "absolute", top: "-13px", left: "32px", padding: "5px 12px", borderRadius: "99px", background: "#10B77F", color: "#06231A", fontSize: "12px", fontWeight: "700" }}>{t("plans.featured")}</span>}
   <h3 className="disp" style={{ margin: "0", fontSize: "24px", fontWeight: "700", letterSpacing: "-0.02em" }}>{t(`plans.p${n}Name`)}</h3>
   <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.55", color: muted }}>{t(`plans.p${n}Desc`)}</p>
   <div style={{ margin: "28px 0 6px", display: "flex", alignItems: "baseline", gap: "6px" }}><span className="disp" style={{ fontSize: "48px", lineHeight: "1", fontWeight: "800", color: ink }}>{money(price)}</span><span style={{ fontSize: "14px", color: muted }}>{t("plans.perMonth")}</span></div>
   <p style={{ margin: "0", fontSize: "13px", color: muted }}>{t("plans.billing")}</p>
   <p style={{ margin: "4px 0 0", minHeight: "18px", fontSize: "13px", fontWeight: "600", color: "#10B77F" }}>{billing === "annual" ? t("plans.annualNote", { price: money(PLAN_PRICES[id].annual) }) : ""}</p>
   <p className="pl-setup"><s>{t("plans.setup", { price: money(PLAN_PRICES[id].setup) })}</s> <b>{t("plans.free")}</b> {t("plans.founder")}</p>
   <ul style={{ listStyle: "none", margin: "0 0 28px", padding: "0", display: "grid", alignContent: "start", gap: "14px", flex: "1" }}>
    {features.map((f, i) => (
     <li key={f} style={{ display: "flex", gap: "12px", fontSize: "15px", lineHeight: "1.5", color: ink, fontWeight: n > 1 && i === 0 ? "700" : undefined }}><Check />{f}</li>
    ))}
   </ul>
   {featured && <p style={{ margin: "0 0 20px", paddingTop: "16px", borderTop: "1px dashed rgba(255,255,255,.15)", fontSize: "14px", lineHeight: "1.5", color: muted }}><Trans i18nKey="plans.roi" values={{ price: money(Math.ceil(price / 30)) }} components={{ b: <b style={{ color: "#fff" }} /> }} /></p>}
   <a className={"btn " + (featured ? "btn-p" : "btn-s")} href="#contacto" onClick={() => selectPlan(id)} style={{ width: "100%" }}>{t("plans.cta", { name: t(`plans.p${n}Name`) })}</a>
  </article>
   );
  })}
 </div>

 <div className="pl-trust">
  <div className="card rv" style={{ padding: "28px", borderRadius: "20px", border: "1px solid #E1E7EF", background: "#fff" }}>
   <h3 className="disp" style={{ margin: "0 0 8px", display: "flex", alignItems: "center", gap: "10px", fontSize: "19px", fontWeight: "700" }}>
    <span style={{ width: "28px", height: "28px", flex: "none", borderRadius: "8px", display: "grid", placeItems: "center", background: "rgba(16,183,127,.12)" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#087A55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
    {t("plans.trialTitle")}
   </h3>
   <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#47566B" }}>{t("plans.trialText")}</p>
  </div>
  <div className="rv2" style={{ padding: "28px", borderRadius: "20px", border: "1px solid #BFEBD7", background: "#F4FBF8" }}>
   <h3 className="disp" style={{ margin: "0 0 8px", fontSize: "19px", fontWeight: "700" }}>{t("plans.tryTitle")}</h3>
   <p style={{ margin: "0 0 16px", fontSize: "15px", lineHeight: "1.6", color: "#47566B" }}>{t(WA_NUMBER ? "plans.tryText" : "plans.tryTextForm")}</p>
   {WA_NUMBER
    ? <a className="btn btn-p" href={waLink(t("plans.tryMessage"))} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>{t("plans.tryCta")}</a>
    : <a className="btn btn-p" href="#contacto" style={{ width: "100%" }}>{t("plans.tryCtaForm")}</a>}
  </div>
 </div>

 <p style={{ margin: "28px 0 0", fontSize: "13px", lineHeight: "1.6", color: "#47566B" }}>{t("plans.note")}</p>
</section>
  </>
  );
};

export default Plans;
