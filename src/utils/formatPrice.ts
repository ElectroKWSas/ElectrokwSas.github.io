import type { PriceType } from "@/types/service";

const COP_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return COP_FORMATTER.format(price);
}

export function formatServicePrice(price: number, priceType: PriceType): string {
  if (priceType === "cotizar") return "Cotizar";
  const formatted = formatPrice(price);
  return priceType === "desde" ? `Desde ${formatted}` : formatted;
}
