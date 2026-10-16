import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGS } from "@/i18n";

const NAV = [
  { id: "beneficios", key: "header.benefits" },
  { id: "servicios", key: "header.services" },
  { id: "portafolio", key: "header.portfolio" },
  { id: "proceso", key: "header.process" },
  { id: "nosotros", key: "header.about" },
  { id: "planes", key: "header.plans" },
] as const;

const Header = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Publica la altura del encabezado (--hd-h) para que el hero ocupe el resto de la primera pantalla.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--hd-h", el.offsetHeight + "px");
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Encabezado con fondo difuminado en cuanto se empieza a hacer scroll.
  useEffect(() => {
    const onScroll = () => setScrolled((s) => (s === window.scrollY > 8 ? s : !s));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta en el menú la sección que está en el centro de la pantalla.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id === "inicio" ? null : e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ["inicio", ...NAV.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="hd-bar" data-scrolled={scrolled}>
      <header ref={ref} className="nav top hd" style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        <a className="hd-logo logo-link" href="/" aria-label={t("header.logoLabel")} style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="" width="77" height="44" style={{ display: "block", height: "44px", width: "auto" }} />
        </a>
        <nav className="hd-nav" aria-label={t("header.navLabel")} style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {NAV.map((n) => (
            <a key={n.id} className="lnk" href={`#${n.id}`} aria-current={active === n.id ? "location" : undefined} style={{ fontSize: "14px", fontWeight: "500", color: "#47566B" }}>
              {t(n.key)}
            </a>
          ))}
        </nav>
        <div className="hd-actions" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div className="lang" role="group" aria-label={t("header.langLabel")}>
            {LANGS.map((lng) => (
              <button key={lng} type="button" lang={lng} aria-pressed={i18n.resolvedLanguage === lng} onClick={() => i18n.changeLanguage(lng)}>
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn btn-p" href="#contacto" style={{ minHeight: "44px", padding: "0 18px", fontSize: "14px" }}>{t("header.cta")}</a>
        </div>
      </header>
    </div>
  );
};

export default Header;
