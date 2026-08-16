import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowsRotate, FaMagnifyingGlass, FaHand, FaCube, FaRulerCombined } from "react-icons/fa6";
import SEO from "@/components/common/SEO";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Loader from "@/components/common/Loader";
import Scene from "@/components/electrical-plan/Scene";
import BlueprintView from "@/components/electrical-plan/BlueprintView";
import PlanLegend from "@/components/electrical-plan/PlanLegend";
import InfoPanel from "@/components/electrical-plan/InfoPanel";
import LayerControls from "@/components/electrical-plan/LayerControls";
import { ELECTRICAL_POINTS, CIRCUITS } from "@/data/electricalPlan";
import type { CircuitId } from "@/types/electricalPlan";
import { fadeUp } from "@/animations/variants";
import { cn } from "@/utils/cn";

const ALL_LAYERS = new Set(CIRCUITS.map((c) => c.id));
type ViewMode = "3d" | "2d";

export default function InteractivePlan() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState<Set<CircuitId>>(new Set(ALL_LAYERS));
  const [viewMode, setViewMode] = useState<ViewMode>("3d");

  const selectedPoint = ELECTRICAL_POINTS.find((p) => p.id === selectedId) ?? null;

  function toggleLayer(id: CircuitId) {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next.size === 0 ? new Set(ALL_LAYERS) : next;
    });
  }

  return (
    <>
      <SEO
        title="Plano eléctrico interactivo 3D"
        description="Explora en 3D y en plano técnico 2D una instalación eléctrica residencial completa: cocina, sala, comedor, tres habitaciones y patio de ropas, con cada tomacorriente, punto de luz y circuito especial explicado."
        canonicalPath="/plano-interactivo"
      />

      <section className="bg-background-alt dark:bg-background-alt-dark pb-10 pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Plano interactivo" }]} />
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-6 max-w-2xl">
            <span className="eyebrow text-sm text-accent">Ingeniería eléctrica</span>
            <h1 className="mt-3 font-heading text-4xl font-bold text-text-primary dark:text-text-primary-dark sm:text-5xl">
              Un plano eléctrico, en tres dimensiones
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary dark:text-text-secondary-dark">
              Así diseñamos cada instalación: circuito por circuito. Explora el modelo 3D
              o el plano técnico con simbología eléctrica real, y toca cualquier punto de
              esta vivienda de un piso para ver qué hay detrás.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex justify-center sm:justify-start">
            <div className="inline-flex rounded-full border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("3d")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  viewMode === "3d"
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark"
                )}
              >
                <FaCube size={13} /> Vista 3D
              </button>
              <button
                type="button"
                onClick={() => setViewMode("2d")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  viewMode === "2d"
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-text-primary-dark"
                )}
              >
                <FaRulerCombined size={13} /> Plano técnico 2D
              </button>
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative h-[70vh] min-h-[520px] w-full overflow-hidden rounded-3xl border border-border dark:border-border-dark bg-[#EEF2F7] shadow-xl"
          >
            {viewMode === "3d" ? (
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                <Scene
                  selectedId={selectedId}
                  hoveredId={hoveredId}
                  activeLayers={activeLayers}
                  onSelect={setSelectedId}
                  onHover={setHoveredId}
                />
              </Suspense>
            ) : (
              <BlueprintView
                selectedId={selectedId}
                hoveredId={hoveredId}
                activeLayers={activeLayers}
                onSelect={setSelectedId}
                onHover={setHoveredId}
              />
            )}

            <LayerControls activeLayers={activeLayers} onToggle={toggleLayer} onShowAll={() => setActiveLayers(new Set(ALL_LAYERS))} />
            <InfoPanel point={selectedPoint} onClose={() => setSelectedId(null)} />
            {viewMode === "2d" && <PlanLegend />}

            {viewMode === "3d" && (
              <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-4">
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 rounded-full border border-border/70 bg-white/85 px-4 py-2 text-xs font-medium text-text-secondary shadow-lg backdrop-blur-md dark:border-border-dark/70 dark:bg-surface-dark/85 dark:text-text-secondary-dark">
                  <span className="flex items-center gap-1.5">
                    <FaHand size={11} /> Arrastra para rotar
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaMagnifyingGlass size={11} /> Rueda para hacer zoom
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaArrowsRotate size={11} /> Toca un punto para ver el detalle
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {CIRCUITS.map((circuit) => (
            <div
              key={circuit.id}
              className="flex items-start gap-3 rounded-2xl border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-5"
            >
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: circuit.color }}
              />
              <div>
                <p className="font-heading text-base font-semibold text-text-primary dark:text-text-primary-dark">
                  {circuit.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary dark:text-text-secondary-dark">
                  {circuit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
