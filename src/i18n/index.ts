import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

const STORAGE_KEY = "efficiencia-lang";

const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* localStorage no disponible: se usa el idioma del navegador */
  }
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
};

// Mantiene <html lang>, título y descripción alineados con el idioma activo.
const syncDocument = (lng: string) => {
  document.documentElement.lang = lng;
  document.title = i18n.t("meta.title");
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", i18n.t("meta.description"));
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* ignorar */
  }
};

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: initialLang(),
  fallbackLng: "es",
  interpolation: { escapeValue: false },
  showSupportNotice: false,
});

syncDocument(i18n.language);
i18n.on("languageChanged", syncDocument);

export default i18n;
