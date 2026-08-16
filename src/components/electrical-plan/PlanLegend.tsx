import {
  CeilingLightSymbol,
  SwitchSymbol,
  OutletSymbol,
  GfciSymbol,
  ExtractorSymbol,
  SpecialSymbol,
  PanelSymbol,
} from "@/components/electrical-plan/PlanSymbols";
import type { ElectricalPoint } from "@/types/electricalPlan";

const ROWS: { type: ElectricalPoint["type"]; label: string }[] = [
  { type: "punto-luz", label: "Punto de luz" },
  { type: "interruptor", label: "Interruptor (S / S3)" },
  { type: "tomacorriente", label: "Tomacorriente doble" },
  { type: "gfci", label: "Tomacorriente GFCI" },
  { type: "extractor", label: "Extractor" },
  { type: "circuito-220v", label: "Circuito especial" },
  { type: "tablero", label: "Tablero" },
];

const FAKE_POINT = { specs: { voltage: "220V" } } as ElectricalPoint;

export default function PlanLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-20 max-h-[45%] overflow-y-auto rounded-2xl border border-border/80 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:left-6 sm:bottom-6">
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
        Simbología
      </p>
      <div className="grid grid-cols-1 gap-1.5">
        {ROWS.map((row) => (
          <div key={row.type} className="flex items-center gap-2.5 px-1">
            <svg width="26" height="22" viewBox="-13 -11 26 22" className="shrink-0">
              {row.type === "punto-luz" && <CeilingLightSymbol point={FAKE_POINT} color="#55606E" scale={0.85} />}
              {row.type === "interruptor" && <SwitchSymbol point={{ name: "" } as ElectricalPoint} color="#55606E" scale={0.85} />}
              {row.type === "tomacorriente" && <OutletSymbol point={FAKE_POINT} color="#55606E" scale={0.85} />}
              {row.type === "gfci" && <GfciSymbol point={FAKE_POINT} color="#55606E" scale={0.75} />}
              {row.type === "extractor" && <ExtractorSymbol point={FAKE_POINT} color="#55606E" scale={0.85} />}
              {row.type === "circuito-220v" && <SpecialSymbol point={FAKE_POINT} color="#55606E" scale={0.6} />}
              {row.type === "tablero" && <PanelSymbol point={FAKE_POINT} color="#55606E" scale={0.85} />}
            </svg>
            <span className="text-xs text-text-secondary">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
