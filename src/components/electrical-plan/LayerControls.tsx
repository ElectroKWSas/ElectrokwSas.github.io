import { FaCheck } from "react-icons/fa6";
import type { CircuitId } from "@/types/electricalPlan";
import { CIRCUITS } from "@/data/electricalPlan";
import { cn } from "@/utils/cn";

interface LayerControlsProps {
  activeLayers: Set<CircuitId>;
  onToggle: (id: CircuitId) => void;
  onShowAll: () => void;
}

export default function LayerControls({ activeLayers, onToggle, onShowAll }: LayerControlsProps) {
  const allActive = activeLayers.size === CIRCUITS.length;

  return (
    <div className="absolute left-4 top-4 z-20 flex max-w-[min(90vw,20rem)] flex-col gap-2 rounded-2xl border border-border/80 bg-white/90 p-3 shadow-xl backdrop-blur-md dark:border-border-dark/80 dark:bg-surface-dark/90 sm:left-6 sm:top-6">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-text-secondary dark:text-text-secondary-dark">
        Capas del circuito
      </p>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={onShowAll}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm font-medium transition",
            allActive
              ? "bg-text-primary/5 text-text-primary dark:bg-white/10 dark:text-text-primary-dark"
              : "text-text-secondary hover:bg-black/5 dark:text-text-secondary-dark dark:hover:bg-white/5"
          )}
        >
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-[4px] border",
              allActive ? "border-text-primary bg-text-primary dark:border-white dark:bg-white/90" : "border-border dark:border-border-dark"
            )}
          >
            {allActive && <FaCheck size={9} className="text-white dark:text-secondary" />}
          </span>
          Ver todo
        </button>

        {CIRCUITS.map((circuit) => {
          const active = activeLayers.has(circuit.id);
          return (
            <button
              key={circuit.id}
              type="button"
              onClick={() => onToggle(circuit.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm font-medium transition",
                active
                  ? "text-text-primary dark:text-text-primary-dark"
                  : "text-text-secondary/50 dark:text-text-secondary-dark/50"
              )}
            >
              <span
                className="flex h-4 w-4 items-center justify-center rounded-[4px] border"
                style={{
                  borderColor: circuit.color,
                  backgroundColor: active ? circuit.color : "transparent",
                }}
              >
                {active && <FaCheck size={9} className="text-white" />}
              </span>
              {circuit.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
