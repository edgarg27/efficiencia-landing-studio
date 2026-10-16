import { useSyncExternalStore } from "react";

export const PLAN_IDS = ["responde", "agenda", "vende"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export const BILLING_IDS = ["monthly", "annual"] as const;
export type Billing = (typeof BILLING_IDS)[number];

// Precios en pesos mexicanos (MXN), más IVA. Mantenlos sincronizados con api/webhook.js.
// annual es el pago único anual (equivale a 2 meses gratis).
export const PLAN_PRICES: Record<PlanId, { monthly: number; annual: number; setup: number }> = {
  responde: { monthly: 1490, annual: 14900, setup: 1990 },
  agenda: { monthly: 2490, annual: 24900, setup: 2990 },
  vende: { monthly: 3990, annual: 39900, setup: 3990 },
};

// Precio mensual que se muestra según el periodo de pago elegido.
export const monthlyPrice = (id: PlanId, billing: Billing) =>
  billing === "annual" ? Math.round(PLAN_PRICES[id].annual / 12) : PLAN_PRICES[id].monthly;

// Lugares que quedan con instalación gratis (precio fundador). Actualízalo conforme vendas.
export const FOUNDER_SPOTS = 10;

// WhatsApp del bot de prueba: 52 + 10 dígitos, sin espacios. Vacío = el botón lleva al formulario.
export const WA_NUMBER = "";

export const waLink = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// Clave de i18n con el nombre de cada plan.
export const PLAN_NAME_KEY: Record<PlanId, string> = {
  responde: "plans.p1Name",
  agenda: "plans.p2Name",
  vende: "plans.p3Name",
};

export const formatPrice = (amount: number, lang: string) =>
  new Intl.NumberFormat(lang === "en" ? "en-US" : "es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(amount);

// Plan y periodo elegidos: los comparten las tarjetas de planes y el formulario de contacto.
let state: { plan: PlanId | null; billing: Billing } = { plan: null, billing: "monthly" };
const listeners = new Set<() => void>();

const update = (next: Partial<typeof state>) => {
  if (Object.entries(next).every(([k, v]) => state[k as keyof typeof state] === v)) return;
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};

export const selectPlan = (plan: PlanId | null) => update({ plan });
export const selectBilling = (billing: Billing) => update({ billing });

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export const usePlan = (): PlanId | null =>
  useSyncExternalStore(subscribe, () => state.plan, () => null);

export const useBilling = (): Billing =>
  useSyncExternalStore(subscribe, () => state.billing, () => "monthly");
