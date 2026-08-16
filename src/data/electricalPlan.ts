import type {
  CircuitGroupInfo,
  CircuitInfo,
  ElectricalPoint,
  ElectricalPointSpecs,
  PointType,
  Room,
  WallSegment,
} from "@/types/electricalPlan";

export const WALL_HEIGHT = 2.6;
export const WALL_THICKNESS = 0.15;

export const CIRCUITS: CircuitInfo[] = [
  {
    id: "tablero",
    label: "Tablero y acometida",
    shortLabel: "Tablero",
    color: "#0A0A0A",
    description:
      "Tablero de distribución principal y acometida general de la vivienda.",
  },
  {
    id: "iluminacion",
    label: "Circuitos de iluminación",
    shortLabel: "Iluminación",
    color: "#12A8EE",
    description:
      "Puntos de luz de techo e interruptores de encendido en cada ambiente.",
  },
  {
    id: "tomacorrientes",
    label: "Tomacorrientes normales",
    shortLabel: "Tomacorrientes",
    color: "#0C3C9C",
    description: "Salidas de 120V de uso general distribuidas por ambiente.",
  },
  {
    id: "especiales",
    label: "Circuitos especiales",
    shortLabel: "Especiales",
    color: "#A8492E",
    description:
      "Circuitos exclusivos de mayor capacidad para horno, lavadora y secadora.",
  },
];

export const ROOMS: Room[] = [
  { id: "sala", name: "Sala", type: "sala", x1: 0, z1: 0, x2: 5.8, z2: 4.3, areaLabel: "24,9 m²" },
  { id: "comedor", name: "Comedor", type: "comedor", x1: 5.8, z1: 0, x2: 9.2, z2: 4.3, areaLabel: "14,6 m²" },
  { id: "cocina", name: "Cocina", type: "cocina", x1: 9.2, z1: 0, x2: 14, z2: 4.3, areaLabel: "20,6 m²" },
  { id: "pasillo", name: "Pasillo", type: "pasillo", x1: 0, z1: 4.3, x2: 14, z2: 5.5, areaLabel: "16,8 m²" },
  { id: "habitacion-1", name: "Habitación principal", type: "habitacion", x1: 0, z1: 5.5, x2: 4.6, z2: 10.5, areaLabel: "23 m²" },
  { id: "habitacion-2", name: "Habitación 2", type: "habitacion", x1: 4.6, z1: 5.5, x2: 8.6, z2: 10.5, areaLabel: "20 m²" },
  { id: "habitacion-3", name: "Habitación 3", type: "habitacion", x1: 8.6, z1: 5.5, x2: 12, z2: 10.5, areaLabel: "17 m²" },
  { id: "bano", name: "Baño", type: "bano", x1: 12, z1: 5.5, x2: 14, z2: 8, areaLabel: "5 m²" },
  { id: "patio-ropas", name: "Patio de ropas", type: "patio-ropas", x1: 12, z1: 8, x2: 14, z2: 10.5, areaLabel: "5 m²" },
];

export const WALLS: WallSegment[] = [
  // Perímetro exterior (con vano de puerta principal en la fachada sur)
  { x1: 0, z1: 0, x2: 1.5, z2: 0 },
  { x1: 2.7, z1: 0, x2: 14, z2: 0 },
  { x1: 14, z1: 0, x2: 14, z2: 10.5 },
  { x1: 14, z1: 10.5, x2: 0, z2: 10.5 },
  { x1: 0, z1: 10.5, x2: 0, z2: 0 },

  // Divisiones zona social (sala / comedor / cocina), semiabiertas
  { x1: 5.8, z1: 0, x2: 5.8, z2: 1.2 },
  { x1: 5.8, z1: 3.4, x2: 5.8, z2: 4.3 },
  { x1: 9.2, z1: 0, x2: 9.2, z2: 1.6 },
  { x1: 9.2, z1: 2.8, x2: 9.2, z2: 4.3 },

  // División zona social / pasillo (con vanos hacia cada ambiente)
  { x1: 0, z1: 4.3, x2: 2.2, z2: 4.3 },
  { x1: 3.2, z1: 4.3, x2: 6.8, z2: 4.3 },
  { x1: 7.6, z1: 4.3, x2: 11, z2: 4.3 },
  { x1: 11.9, z1: 4.3, x2: 14, z2: 4.3 },

  // División pasillo / zona privada (con vanos hacia cada habitación, baño y patio)
  { x1: 0, z1: 5.5, x2: 1.8, z2: 5.5 },
  { x1: 2.8, z1: 5.5, x2: 6, z2: 5.5 },
  { x1: 6.9, z1: 5.5, x2: 10, z2: 5.5 },
  { x1: 10.9, z1: 5.5, x2: 14, z2: 5.5 },

  // Divisiones entre habitaciones y zona de baño/patio
  { x1: 4.6, z1: 5.5, x2: 4.6, z2: 10.5 },
  { x1: 8.6, z1: 5.5, x2: 8.6, z2: 10.5 },
  { x1: 12, z1: 5.5, x2: 12, z2: 10.5 },

  // División baño / patio de ropas (con vano de paso)
  { x1: 12, z1: 8, x2: 12.3, z2: 8 },
  { x1: 13, z1: 8, x2: 14, z2: 8 },
];

const V = (voltage: string, extra?: Partial<ElectricalPointSpecs>): ElectricalPointSpecs => ({
  voltage,
  ...extra,
});

let autoId = 0;
function point(
  code: string,
  name: string,
  type: PointType,
  circuit: ElectricalPoint["circuit"],
  roomId: string,
  x: number,
  y: number,
  z: number,
  description: string,
  specs: ElectricalPointSpecs
): Omit<ElectricalPoint, "circuitGroup"> {
  autoId += 1;
  return { id: `ep-${autoId}`, code, name, type, circuit, roomId, x, y, z, description, specs };
}

const OUTLET_SPECS = V("120V", { amperage: "15A", breaker: "1x15A", wireGauge: "12 AWG" });
const LIGHT_SPECS = V("120V", { amperage: "8A", breaker: "1x15A", wireGauge: "14 AWG" });
const SWITCH_SPECS = V("120V", { breaker: "1x15A", wireGauge: "14 AWG" });
const GFCI_SPECS = V("120V", { amperage: "20A", breaker: "1x20A GFCI", wireGauge: "12 AWG" });

const RAW_POINTS: Omit<ElectricalPoint, "circuitGroup">[] = [
  // Tablero
  point(
    "TB-1",
    "Tablero de distribución principal",
    "tablero",
    "tablero",
    "pasillo",
    11.6,
    1.6,
    4.35,
    "Tablero monofásico de 12 circuitos con breaker principal de 60A. Distribuye todos los circuitos ramales de la vivienda y aloja el breaker diferencial de los circuitos especiales.",
    V("120/240V", { amperage: "60A principal", breaker: "Tablero 12 circuitos" })
  ),

  // Sala
  point("IL-S1", "Punto de luz — Sala (frontal)", "punto-luz", "iluminacion", "sala", 1.8, 2.55, 1.6, "Punto de luz de techo para el área frontal de la sala, controlado desde el interruptor junto a la puerta principal.", LIGHT_SPECS),
  point("IL-S2", "Punto de luz — Sala (interior)", "punto-luz", "iluminacion", "sala", 4, 2.55, 3, "Punto de luz de techo para el área interior de la sala, cercana al paso hacia el pasillo.", LIGHT_SPECS),
  point("INT-S1", "Interruptor sencillo — Entrada", "interruptor", "iluminacion", "sala", 2.55, 1.2, 0.1, "Interruptor sencillo junto a la puerta principal, controla el punto de luz frontal de la sala.", SWITCH_SPECS),
  point("INT-S2", "Interruptor sencillo — Pasillo", "interruptor", "iluminacion", "sala", 4.9, 1.2, 4.2, "Interruptor sencillo en el paso hacia el pasillo, controla el punto de luz interior de la sala.", SWITCH_SPECS),
  point("TC-S1", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "sala", 0.1, 0.4, 1, "Tomacorriente doble de uso general sobre pared occidental de la sala.", OUTLET_SPECS),
  point("TC-S2", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "sala", 0.1, 0.4, 3.6, "Tomacorriente doble de uso general para punto de TV / equipo de entretenimiento.", OUTLET_SPECS),
  point("TC-S3", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "sala", 3, 0.4, 4.2, "Tomacorriente doble de uso general sobre pared sur de la sala.", OUTLET_SPECS),
  point("TC-S4", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "sala", 5.7, 0.4, 2.2, "Tomacorriente doble de uso general cercano al paso hacia el comedor.", OUTLET_SPECS),

  // Comedor
  point("IL-C1", "Punto de luz colgante — Comedor", "punto-luz", "iluminacion", "comedor", 7.5, 2.55, 2.15, "Punto de luz de techo centrado sobre la mesa del comedor, ideal para lámpara colgante.", LIGHT_SPECS),
  point("INT-C1", "Interruptor sencillo — Comedor", "interruptor", "iluminacion", "comedor", 5.9, 1.2, 3.8, "Interruptor sencillo junto al paso desde la sala, controla la luminaria del comedor.", SWITCH_SPECS),
  point("TC-C1", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "comedor", 6, 0.4, 0.1, "Tomacorriente doble de uso general sobre pared norte del comedor.", OUTLET_SPECS),
  point("TC-C2", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "comedor", 9.1, 0.4, 3.6, "Tomacorriente doble de uso general cercano al paso hacia la cocina.", OUTLET_SPECS),

  // Cocina
  point("IL-K1", "Punto de luz — Cocina (zona cocción)", "punto-luz", "iluminacion", "cocina", 10.3, 2.55, 1.4, "Punto de luz de techo sobre la zona de cocción y estufa.", LIGHT_SPECS),
  point("IL-K2", "Punto de luz — Cocina (zona lavado)", "punto-luz", "iluminacion", "cocina", 12.8, 2.55, 2.9, "Punto de luz de techo sobre la zona de lavaplatos y meson.", LIGHT_SPECS),
  point("INT-K1", "Interruptor doble — Cocina", "interruptor", "iluminacion", "cocina", 9.35, 1.2, 3.8, "Interruptor doble junto al paso desde el comedor, controla los dos puntos de luz de la cocina.", SWITCH_SPECS),
  point("TC-K1", "Tomacorriente doble — Mesón", "tomacorriente", "tomacorrientes", "cocina", 9.4, 1.1, 1, "Tomacorriente doble sobre mesón, altura de electrodomésticos menores.", OUTLET_SPECS),
  point("TC-K2", "Tomacorriente doble — Mesón", "tomacorriente", "tomacorrientes", "cocina", 11.6, 1.1, 0.1, "Tomacorriente doble sobre mesón, pared norte de la cocina.", OUTLET_SPECS),
  point("TC-K3", "Tomacorriente doble — Nevera", "tomacorriente", "tomacorrientes", "cocina", 13.9, 0.4, 1.5, "Tomacorriente doble exclusivo para el punto de nevera.", OUTLET_SPECS),
  point("GFCI-K1", "Tomacorriente GFCI — Zona húmeda", "gfci", "tomacorrientes", "cocina", 13.9, 1.1, 3.4, "Tomacorriente con protección GFCI cercano al lavaplatos, exigido por zona húmeda.", GFCI_SPECS),
  point("ESP-K1", "Circuito especial 220V — Horno eléctrico", "circuito-220v", "especiales", "cocina", 11.9, 0.4, 4.2, "Circuito exclusivo de 220V para horno eléctrico empotrado, con breaker diferencial dedicado.", V("220V", { amperage: "40A", breaker: "2x40A", wireGauge: "8 AWG" })),

  // Pasillo
  point("IL-PA1", "Punto de luz — Pasillo", "punto-luz", "iluminacion", "pasillo", 7, 2.55, 4.9, "Punto de luz de techo central del pasillo de circulación.", LIGHT_SPECS),
  point("INT-PA1", "Interruptor de escalera (1/2)", "interruptor", "iluminacion", "pasillo", 0.6, 1.2, 4.4, "Interruptor de conmutación en el extremo occidental del pasillo (control de vía).", SWITCH_SPECS),
  point("INT-PA2", "Interruptor de escalera (2/2)", "interruptor", "iluminacion", "pasillo", 13.4, 1.2, 4.4, "Interruptor de conmutación en el extremo oriental del pasillo (control de vía).", SWITCH_SPECS),

  // Habitación 1 (principal)
  point("IL-H1", "Punto de luz — Habitación principal", "punto-luz", "iluminacion", "habitacion-1", 2.3, 2.55, 8, "Punto de luz de techo centrado en la habitación principal.", LIGHT_SPECS),
  point("INT-H1", "Interruptor sencillo — Hab. principal", "interruptor", "iluminacion", "habitacion-1", 1.9, 1.2, 5.6, "Interruptor sencillo junto a la puerta de la habitación principal.", SWITCH_SPECS),
  point("TC-H1A", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "habitacion-1", 0.1, 0.4, 6.5, "Tomacorriente doble junto a la cabecera de la cama.", OUTLET_SPECS),
  point("TC-H1B", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "habitacion-1", 0.1, 0.4, 9.5, "Tomacorriente doble sobre pared occidental, zona de closet.", OUTLET_SPECS),
  point("TC-H1C", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "habitacion-1", 4.5, 0.4, 8.5, "Tomacorriente doble sobre pared oriental de la habitación principal.", OUTLET_SPECS),

  // Habitación 2
  point("IL-H2", "Punto de luz — Habitación 2", "punto-luz", "iluminacion", "habitacion-2", 6.6, 2.55, 8, "Punto de luz de techo centrado en la habitación 2.", LIGHT_SPECS),
  point("INT-H2", "Interruptor sencillo — Hab. 2", "interruptor", "iluminacion", "habitacion-2", 6.4, 1.2, 5.6, "Interruptor sencillo junto a la puerta de la habitación 2.", SWITCH_SPECS),
  point("TC-H2A", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "habitacion-2", 4.7, 0.4, 8.2, "Tomacorriente doble junto a la cabecera de la cama.", OUTLET_SPECS),
  point("TC-H2B", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "habitacion-2", 8.5, 0.4, 7, "Tomacorriente doble sobre pared oriental de la habitación 2.", OUTLET_SPECS),

  // Habitación 3
  point("IL-H3", "Punto de luz — Habitación 3", "punto-luz", "iluminacion", "habitacion-3", 10.3, 2.55, 8, "Punto de luz de techo centrado en la habitación 3.", LIGHT_SPECS),
  point("INT-H3", "Interruptor sencillo — Hab. 3", "interruptor", "iluminacion", "habitacion-3", 9, 1.2, 5.6, "Interruptor sencillo junto a la puerta de la habitación 3.", SWITCH_SPECS),
  point("TC-H3A", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "habitacion-3", 8.7, 0.4, 8.2, "Tomacorriente doble junto a la cabecera de la cama.", OUTLET_SPECS),
  point("TC-H3B", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "habitacion-3", 11.9, 0.4, 7, "Tomacorriente doble sobre pared oriental de la habitación 3.", OUTLET_SPECS),

  // Baño
  point("IL-B1", "Punto de luz — Baño", "punto-luz", "iluminacion", "bano", 13, 2.55, 6.75, "Punto de luz de techo del baño compartido.", LIGHT_SPECS),
  point("INT-B1", "Interruptor sencillo — Baño", "interruptor", "iluminacion", "bano", 11.9, 1.2, 6, "Interruptor sencillo junto a la puerta del baño, controla luz y extractor.", SWITCH_SPECS),
  point("GFCI-B1", "Tomacorriente GFCI — Baño", "gfci", "tomacorrientes", "bano", 13.9, 1.1, 5.7, "Tomacorriente con protección GFCI junto al lavamanos, exigido por normativa en zonas húmedas.", GFCI_SPECS),
  point("EXT-B1", "Extractor de baño", "extractor", "iluminacion", "bano", 13.5, 2.55, 7.7, "Extractor de aire para ventilación del baño, encendido conjunto con la luminaria.", LIGHT_SPECS),

  // Patio de ropas
  point("IL-P1", "Punto de luz — Patio de ropas", "punto-luz", "iluminacion", "patio-ropas", 13, 2.55, 9.25, "Punto de luz de techo del patio de ropas.", LIGHT_SPECS),
  point("INT-P1", "Interruptor sencillo — Patio", "interruptor", "iluminacion", "patio-ropas", 11.9, 1.2, 8.4, "Interruptor sencillo junto a la puerta de acceso al patio de ropas.", SWITCH_SPECS),
  point("TC-P1", "Tomacorriente doble", "tomacorriente", "tomacorrientes", "patio-ropas", 13.9, 0.4, 8.3, "Tomacorriente doble de uso general en el patio de ropas.", OUTLET_SPECS),
  point("ESP-P1", "Circuito especial — Lavadora", "circuito-especial", "especiales", "patio-ropas", 12.1, 0.4, 9, "Circuito exclusivo de 120V/20A para lavadora, con tomacorriente polarizado dedicado.", V("120V", { amperage: "20A", breaker: "1x20A", wireGauge: "12 AWG" })),
  point("ESP-P2", "Circuito especial 220V — Secadora", "circuito-220v", "especiales", "patio-ropas", 12.1, 0.4, 10.2, "Circuito exclusivo de 220V para secadora eléctrica, con breaker dedicado independiente.", V("220V", { amperage: "30A", breaker: "2x30A", wireGauge: "10 AWG" })),
];

/**
 * Cuadro de cargas del tablero: 12 circuitos ramales reales, cada uno con su
 * propio breaker. Cada circuito recorre varios puntos en secuencia (como se
 * cablea de verdad una vivienda) en vez de tender un cable independiente del
 * tablero a cada punto individual.
 */
export const CIRCUIT_GROUPS: CircuitGroupInfo[] = [
  { id: "cto-1", label: "Iluminación sala, comedor y pasillo", breaker: "1x15A" },
  { id: "cto-2", label: "Iluminación cocina", breaker: "1x15A" },
  { id: "cto-3", label: "Iluminación habitaciones", breaker: "1x15A" },
  { id: "cto-4", label: "Iluminación baño y patio de ropas", breaker: "1x15A" },
  { id: "cto-5", label: "Tomacorrientes sala y comedor", breaker: "1x20A" },
  { id: "cto-6", label: "Tomacorrientes cocina — mesón 1", breaker: "1x20A" },
  { id: "cto-7", label: "Tomacorrientes cocina — mesón 2 y nevera", breaker: "1x20A" },
  { id: "cto-8", label: "Tomacorrientes habitaciones", breaker: "1x20A" },
  { id: "cto-9", label: "Tomacorrientes baño y patio de ropas", breaker: "1x20A GFCI" },
  { id: "cto-10", label: "Circuito exclusivo — Horno eléctrico", breaker: "2x40A" },
  { id: "cto-11", label: "Circuito exclusivo — Lavadora", breaker: "1x20A" },
  { id: "cto-12", label: "Circuito exclusivo — Secadora", breaker: "2x30A" },
];

const POINT_TO_GROUP: Record<string, string> = {
  "IL-S1": "cto-1", "IL-S2": "cto-1", "INT-S1": "cto-1", "INT-S2": "cto-1",
  "IL-C1": "cto-1", "INT-C1": "cto-1", "IL-PA1": "cto-1", "INT-PA1": "cto-1", "INT-PA2": "cto-1",

  "IL-K1": "cto-2", "IL-K2": "cto-2", "INT-K1": "cto-2",

  "IL-H1": "cto-3", "INT-H1": "cto-3", "IL-H2": "cto-3", "INT-H2": "cto-3", "IL-H3": "cto-3", "INT-H3": "cto-3",

  "IL-B1": "cto-4", "INT-B1": "cto-4", "EXT-B1": "cto-4", "IL-P1": "cto-4", "INT-P1": "cto-4",

  "TC-S1": "cto-5", "TC-S2": "cto-5", "TC-S3": "cto-5", "TC-S4": "cto-5", "TC-C1": "cto-5", "TC-C2": "cto-5",

  "TC-K1": "cto-6", "GFCI-K1": "cto-6",

  "TC-K2": "cto-7", "TC-K3": "cto-7",

  "TC-H1A": "cto-8", "TC-H1B": "cto-8", "TC-H1C": "cto-8",
  "TC-H2A": "cto-8", "TC-H2B": "cto-8",
  "TC-H3A": "cto-8", "TC-H3B": "cto-8",

  "GFCI-B1": "cto-9", "TC-P1": "cto-9",

  "ESP-K1": "cto-10",
  "ESP-P1": "cto-11",
  "ESP-P2": "cto-12",
};

export const ELECTRICAL_POINTS: ElectricalPoint[] = RAW_POINTS.map((p) => ({
  ...p,
  circuitGroup: p.type === "tablero" ? "tablero" : POINT_TO_GROUP[p.code],
}));
