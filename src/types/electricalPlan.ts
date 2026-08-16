export type RoomType =
  | "sala"
  | "comedor"
  | "cocina"
  | "habitacion"
  | "bano"
  | "patio-ropas"
  | "pasillo";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  x1: number;
  z1: number;
  x2: number;
  z2: number;
  areaLabel?: string;
}

export interface WallSegment {
  x1: number;
  z1: number;
  x2: number;
  z2: number;
}

export type CircuitId = "iluminacion" | "tomacorrientes" | "especiales" | "tablero";

export interface CircuitInfo {
  id: CircuitId;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
}

export type PointType =
  | "tablero"
  | "punto-luz"
  | "interruptor"
  | "tomacorriente"
  | "gfci"
  | "extractor"
  | "circuito-220v"
  | "circuito-especial";

export interface ElectricalPointSpecs {
  voltage: string;
  amperage?: string;
  breaker?: string;
  wireGauge?: string;
}

export interface ElectricalPoint {
  id: string;
  code: string;
  name: string;
  type: PointType;
  circuit: CircuitId;
  /** Circuito de tablero al que pertenece (ej. "CTO-2"), como en un cuadro de cargas real. */
  circuitGroup: string;
  roomId: string;
  x: number;
  y: number;
  z: number;
  description: string;
  specs: ElectricalPointSpecs;
}

export interface CircuitGroupInfo {
  id: string;
  label: string;
  breaker: string;
}
