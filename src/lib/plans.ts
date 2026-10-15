import { useSyncExternalStore } from "react";

export const PLAN_IDS = ["starter", "growth", "enterprise"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

// Precios mensuales de ejemplo, en pesos mexicanos (MXN). Cámbialos aquí por los reales.
export const PLAN_PRICES: Record<PlanId, number> = {
  starter: 2500,
  growth: 6500,
  enterprise: 14900,
};

// Clave de i18n con el nombre de cada plan.
export const PLAN_NAME_KEY: Record<PlanId, string> = {
  starter: "plans.p1Name",
  growth: "plans.p2Name",
  enterprise: "plans.p3Name",
};

export const formatPrice = (amount: number, lang: string) =>
  new Intl.NumberFormat(lang === "en" ? "en-US" : "es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(amount);

// Plan elegido: lo comparten las tarjetas de planes y el formulario de contacto.
let current: PlanId | null = null;
const listeners = new Set<() => void>();

export const selectPlan = (plan: PlanId | null) => {
  if (plan === current) return;
  current = plan;
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export const usePlan = (): PlanId | null =>
  useSyncExternalStore(subscribe, () => current, () => null);
