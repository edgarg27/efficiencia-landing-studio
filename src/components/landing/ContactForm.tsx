import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { formatPrice, PLAN_IDS, PLAN_NAME_KEY, PLAN_PRICES, selectPlan, usePlan, type PlanId } from "@/lib/plans";

const getContactSchema = (t: TFunction) =>
  z.object({
    name: z.string().trim().min(1, t("form.errors.nameRequired")).max(100),
    number: z
      .string()
      .regex(/^\d+$/, t("form.errors.numberOnly"))
      .length(10, t("form.errors.numberLength")),
    email: z.string().trim().email(t("form.errors.emailInvalid")).max(255),
    company: z.string().trim().max(100).optional(),
    message: z.string().trim().min(1, t("form.errors.messageRequired")).max(1000),
    captchaToken: z.string().min(1, t("form.errors.captchaRequired")),
  });

type Values = z.infer<ReturnType<typeof getContactSchema>>;
type Errors = Partial<Record<keyof Values, string>>;

const emptyValues: Values = { name: "", number: "", email: "", company: "", message: "", captchaToken: "" };

const errStyle = { margin: "6px 0 0", fontSize: "13px", color: "#C73030" } as const;

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const contactSchema = useMemo(() => getContactSchema(t), [t]);
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);
  const plan = usePlan();
  const [flash, setFlash] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // El widget se monta al acercarse al formulario (o al interactuar con él), no en la carga inicial.
  useEffect(() => {
    const el = formRef.current;
    if (!el || showCaptcha) return;
    if (!("IntersectionObserver" in window)) {
      setShowCaptcha(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCaptcha(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [showCaptcha, sent]);

  // Al elegir un plan desde las tarjetas, el selector del formulario se resalta un momento.
  useEffect(() => {
    if (!plan || document.activeElement?.id === "f-plan") return;
    setFlash(true);
    const id = setTimeout(() => setFlash(false), 1400);
    return () => clearTimeout(id);
  }, [plan]);

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setShowCaptcha(true);
      return;
    }

    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan ? { ...parsed.data, plan } : parsed.data),
      });
      if (!res.ok) throw new Error("webhook");
      setSent(true);
      setValues(emptyValues);
      selectPlan(null);
      recaptchaRef.current?.reset();
    } catch {
      setFailed(true);
      recaptchaRef.current?.reset();
      set("captchaToken")("");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "40px 8px", animation: "pop 420ms var(--ease) both" }} role="status">
        <div style={{ width: "60px", height: "60px", margin: "0 auto 20px", borderRadius: "50%", display: "grid", placeItems: "center", background: "#10B77F", color: "#fff" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
        </div>
        <h3 className="disp" style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: "700" }}>{t("form.successTitle")}</h3>
        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#47566B" }}>{t("form.successMessage")}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} onFocus={() => setShowCaptcha(true)} onClick={() => setShowCaptcha(true)} noValidate style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "18px" }}>
      <div>
        <label className="lbl" htmlFor="f-nombre">{t("form.name")}</label>
        <input className="field" id="f-nombre" name="nombre" type="text" autoComplete="name" required maxLength={100} value={values.name} onChange={(e) => set("name")(e.target.value)} aria-invalid={!!errors.name} />
        {errors.name && <p style={errStyle}>{errors.name}</p>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "18px" }}>
        <div>
          <label className="lbl" htmlFor="f-tel">{t("form.phone")}</label>
          <input className="field" id="f-tel" name="tel" type="tel" inputMode="numeric" autoComplete="tel" required maxLength={10} value={values.number} onChange={(e) => set("number")(e.target.value.replace(/\D/g, "").slice(0, 10))} aria-invalid={!!errors.number} />
          {errors.number && <p style={errStyle}>{errors.number}</p>}
        </div>
        <div>
          <label className="lbl" htmlFor="f-mail">{t("form.email")}</label>
          <input className="field" id="f-mail" name="mail" type="email" autoComplete="email" required maxLength={255} value={values.email} onChange={(e) => set("email")(e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <p style={errStyle}>{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="lbl" htmlFor="f-emp">{t("form.company")}</label>
        <input className="field" id="f-emp" name="empresa" type="text" autoComplete="organization" maxLength={100} value={values.company} onChange={(e) => set("company")(e.target.value)} />
      </div>
      <div>
        <label className="lbl" htmlFor="f-plan">{t("form.plan")}</label>
        <select
          className={"field" + (flash ? " flash" : "")}
          id="f-plan"
          name="plan"
          value={plan ?? ""}
          onChange={(e) => selectPlan((e.target.value || null) as PlanId | null)}
        >
          <option value="">{t("form.planNone")}</option>
          {PLAN_IDS.map((id) => (
            <option key={id} value={id}>
              {t(PLAN_NAME_KEY[id])} — {formatPrice(PLAN_PRICES[id], i18n.language)} {t("plans.currency")} {t("plans.perMonth")}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="lbl" htmlFor="f-proc">{t("form.message")}</label>
        <textarea data-lenis-prevent className="field" id="f-proc" name="proceso" rows={4} required maxLength={1000} style={{ resize: "vertical" }} value={values.message} onChange={(e) => set("message")(e.target.value)} aria-invalid={!!errors.message} />
        {errors.message && <p style={errStyle}>{errors.message}</p>}
      </div>

      <div className="rc-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "78px" }}>
        {showCaptcha && (
          <ReCAPTCHA
            ref={recaptchaRef}
            hl={i18n.resolvedLanguage}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(token) => set("captchaToken")(token || "")}
          />
        )}
        {errors.captchaToken && <p style={errStyle}>{errors.captchaToken}</p>}
      </div>

      <button className="btn btn-p" type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? t("form.sending") : t("form.submit")}
        <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
      {failed && (
        <p role="alert" style={{ margin: "0", textAlign: "center", fontSize: "13px", color: "#C73030" }}>
          {t("form.failed")}
        </p>
      )}
      <p style={{ margin: "0", textAlign: "center", fontSize: "13px", color: "#47566B" }}>{t("form.privacy")}</p>
    </form>
  );
};

export default ContactForm;
