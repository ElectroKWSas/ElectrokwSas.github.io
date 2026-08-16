import { ELECTRICAL_POINTS } from "@/data/electricalPlan";
import type { CircuitId, ElectricalPoint } from "@/types/electricalPlan";

export interface WireChain {
  key: string;
  circuitGroup: string;
  circuit: CircuitId;
  points: ElectricalPoint[];
}

/**
 * Agrupa los puntos por circuito de tablero real (circuitGroup) y los
 * encadena en el orden en que fueron definidos, simulando cómo un
 * electricista recorre un mismo circuito de un punto a otro —en vez de
 * tender un cable independiente del tablero a cada punto individual, que no
 * es como se cablea una vivienda real—. El primer punto de cada cadena
 * recibe la "acometida" (home run) hacia el tablero.
 */
export function getWireChains(): WireChain[] {
  const panel = ELECTRICAL_POINTS.find((p) => p.type === "tablero")!;
  const groups = new Map<string, WireChain>();

  for (const point of ELECTRICAL_POINTS) {
    if (point.id === panel.id) continue;
    const key = point.circuitGroup;
    if (!groups.has(key)) {
      groups.set(key, { key, circuitGroup: point.circuitGroup, circuit: point.circuit, points: [] });
    }
    groups.get(key)!.points.push(point);
  }

  return Array.from(groups.values());
}

export function panelPoint(): ElectricalPoint {
  return ELECTRICAL_POINTS.find((p) => p.type === "tablero")!;
}

/** Un seed determinístico por id, útil para variar curvas de cableado sin aleatoriedad real. */
export function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) % 1000;
  }
  return h / 1000;
}
