import type { PointType } from "@/types/electricalPlan";

export const HOUSE_CENTER = { x: 7, z: 5.25 };

export const POINT_TYPE_LABELS: Record<PointType, string> = {
  tablero: "Tablero de distribución",
  "punto-luz": "Punto de luz",
  interruptor: "Interruptor",
  tomacorriente: "Tomacorriente",
  gfci: "Tomacorriente GFCI",
  extractor: "Extractor",
  "circuito-220v": "Circuito especial 220V",
  "circuito-especial": "Circuito especial",
};

