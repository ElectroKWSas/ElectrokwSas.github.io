import { AnimatePresence, motion } from "framer-motion";
import {
  FaXmark,
  FaLightbulb,
  FaToggleOn,
  FaPlug,
  FaPlugCircleBolt,
  FaFan,
  FaBolt,
  FaChargingStation,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { ElectricalPoint } from "@/types/electricalPlan";
import { CIRCUITS, CIRCUIT_GROUPS, ROOMS } from "@/data/electricalPlan";
import { POINT_TYPE_LABELS } from "@/config/electricalPlan";

const TYPE_ICONS: Record<ElectricalPoint["type"], IconType> = {
  tablero: FaChargingStation,
  "punto-luz": FaLightbulb,
  interruptor: FaToggleOn,
  tomacorriente: FaPlug,
  gfci: FaPlugCircleBolt,
  extractor: FaFan,
  "circuito-220v": FaBolt,
  "circuito-especial": FaBolt,
};

interface InfoPanelProps {
  point: ElectricalPoint | null;
  onClose: () => void;
}

export default function InfoPanel({ point, onClose }: InfoPanelProps) {
  const circuit = point ? CIRCUITS.find((c) => c.id === point.circuit) : null;
  const room = point ? ROOMS.find((r) => r.id === point.roomId) : null;
  const group = point ? CIRCUIT_GROUPS.find((g) => g.id === point.circuitGroup) : null;
  const Icon = point ? TYPE_ICONS[point.type] : FaBolt;

  return (
    <AnimatePresence>
      {point && (
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute right-4 top-4 z-20 w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-2xl border border-border/80 bg-white/90 shadow-2xl backdrop-blur-md dark:border-border-dark/80 dark:bg-surface-dark/90 sm:right-6 sm:top-6"
        >
          <div className="flex items-start justify-between gap-3 border-b border-border/70 p-4 dark:border-border-dark/70">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: circuit?.color }}
              >
                <Icon size={17} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary dark:text-text-secondary-dark">
                  {point.code} · {room?.name}
                </p>
                <p className="font-heading text-base font-semibold leading-tight text-text-primary dark:text-text-primary-dark">
                  {point.name}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar panel"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition hover:bg-black/5 dark:text-text-secondary-dark dark:hover:bg-white/10"
            >
              <FaXmark size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <p className="text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
              {point.description}
            </p>

            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-secondary/80 dark:text-text-secondary-dark/80">
                Circuito de tablero
              </p>
              <div className="flex items-center gap-2 rounded-xl bg-background-alt px-3 py-2 dark:bg-background-alt-dark">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: circuit?.color }} />
                <div className="min-w-0">
                  <span className="block text-sm font-medium leading-tight text-text-primary dark:text-text-primary-dark">
                    {group ? `${group.id.toUpperCase()} · ${group.label}` : circuit?.label}
                  </span>
                  {group && (
                    <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
                      Breaker {group.breaker}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-secondary/80 dark:text-text-secondary-dark/80">
                Ficha técnica
              </p>
              <dl className="grid grid-cols-2 gap-2">
                <SpecRow label="Tipo" value={POINT_TYPE_LABELS[point.type]} />
                <SpecRow label="Voltaje" value={point.specs.voltage} />
                {point.specs.amperage && <SpecRow label="Capacidad" value={point.specs.amperage} />}
                {point.specs.breaker && <SpecRow label="Protección" value={point.specs.breaker} />}
                {point.specs.wireGauge && <SpecRow label="Calibre" value={point.specs.wireGauge} />}
              </dl>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 px-3 py-2 dark:border-border-dark/70">
      <dt className="text-[10px] uppercase tracking-wide text-text-secondary/70 dark:text-text-secondary-dark/70">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">{value}</dd>
    </div>
  );
}
