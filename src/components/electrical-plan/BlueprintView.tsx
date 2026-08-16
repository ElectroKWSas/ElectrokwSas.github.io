import { useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";
import { FaPlus, FaMinus, FaExpand } from "react-icons/fa6";
import { ROOMS, WALLS, ELECTRICAL_POINTS, CIRCUITS } from "@/data/electricalPlan";
import { getWireChains, hashSeed, panelPoint } from "@/utils/electricalWiring";
import type { CircuitId } from "@/types/electricalPlan";
import { SymbolFor } from "@/components/electrical-plan/PlanSymbols";
import { SITE } from "@/config/site";

const SCALE = 42;
const MARGIN = 46;
const BOTTOM_BAND = 78;
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 4.5;

interface BlueprintViewProps {
  activeLayers: Set<CircuitId>;
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function BlueprintView({
  activeLayers,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: BlueprintViewProps) {
  const bounds = useMemo(() => {
    const x1 = Math.min(...ROOMS.map((r) => r.x1));
    const z1 = Math.min(...ROOMS.map((r) => r.z1));
    const x2 = Math.max(...ROOMS.map((r) => r.x2));
    const z2 = Math.max(...ROOMS.map((r) => r.z2));
    return { x1, z1, x2, z2 };
  }, []);

  const toX = (m: number) => (m - bounds.x1) * SCALE + MARGIN;
  const toY = (m: number) => (m - bounds.z1) * SCALE + MARGIN;

  const width = (bounds.x2 - bounds.x1) * SCALE + MARGIN * 2;
  const height = (bounds.z2 - bounds.z1) * SCALE + MARGIN * 2 + BOTTOM_BAND;

  const chains = useMemo(() => getWireChains(), []);
  const panel = panelPoint();
  const [zoomHover, setZoomHover] = useState<string | null>(null);

  // --- Zoom / pan ---
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [isPointerDown, setIsPointerDown] = useState(false);
  const dragging = useRef(false);
  const moved = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  function zoomBy(factor: number) {
    setView((v) => ({ ...v, scale: clamp(v.scale * factor, MIN_ZOOM, MAX_ZOOM) }));
  }

  function resetView() {
    setView({ scale: 1, x: 0, y: 0 });
  }

  function handleWheel(e: ReactWheelEvent<HTMLDivElement>) {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    zoomBy(factor);
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragging.current = true;
    moved.current = false;
    setIsPointerDown(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
  }

  function handlePointerUp() {
    dragging.current = false;
    setIsPointerDown(false);
  }

  function segmentPath(ax: number, az: number, bx: number, bz: number, seed: number) {
    const x1 = toX(ax);
    const y1 = toY(az);
    const x2 = toX(bx);
    const y2 = toY(bz);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const bend = (seed - 0.5) * Math.min(len * 0.22, 16);
    const mx = (x1 + x2) / 2 + nx * bend;
    const my = (y1 + y2) / 2 + ny * bend;
    return { d: `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`, mid: { x: mx, y: my } };
  }

  const titleW = 220;
  const titleH = 50;

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <div
        className="h-full w-full touch-none"
        style={{ cursor: isPointerDown ? "grabbing" : "grab" }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
      <div
        data-testid="plan-viewport"
        className="flex h-full w-full items-center justify-center"
        style={{
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          transformOrigin: "center center",
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
          textRendering="optimizeLegibility"
          className="block h-[94%] w-[94%] select-none"
          onClick={() => {
            if (!moved.current) onSelect(null);
          }}
        >
          {/* Muros */}
          <g>
            {WALLS.map((w, i) => (
              <line
                key={i}
                x1={toX(w.x1)}
                y1={toY(w.z1)}
                x2={toX(w.x2)}
                y2={toY(w.z2)}
                stroke="#111318"
                strokeWidth={4.5}
                strokeLinecap="square"
              />
            ))}
          </g>

          {/* Etiquetas de ambiente */}
          <g>
            {ROOMS.map((room) => (
              <text
                key={room.id}
                x={toX((room.x1 + room.x2) / 2)}
                y={toY((room.z1 + room.z2) / 2)}
                textAnchor="middle"
                fontStyle="italic"
                fontFamily="Georgia, serif"
                fontSize={12.5}
                fill="#1A2233"
              >
                {room.name.toUpperCase()}
              </text>
            ))}
          </g>

          {/* Cableado */}
          <g>
            {chains.map((chain) => {
              if (!activeLayers.has(chain.circuit)) return null;
              const circuit = CIRCUITS.find((c) => c.id === chain.circuit)!;
              const first = chain.points[0];
              const home = segmentPath(panel.x, panel.z, first.x, first.z, hashSeed(chain.key));
              const chainEmph = chain.points.some(
                (p) => p.id === selectedId || p.id === hoveredId || p.id === zoomHover
              );

              return (
                <g key={chain.key}>
                  <path
                    d={home.d}
                    fill="none"
                    stroke={circuit.color}
                    strokeWidth={chainEmph ? 1.8 : 1.1}
                    strokeDasharray="5 3"
                    opacity={chainEmph ? 0.95 : 0.55}
                  />
                  <text
                    x={home.mid.x}
                    y={home.mid.y - 3}
                    fontSize={7}
                    fill={circuit.color}
                    fontFamily="Arial, sans-serif"
                    opacity={chainEmph ? 1 : 0.7}
                  >
                    2-{first.specs.wireGauge ?? "12 AWG"}
                  </text>

                  {chain.points.slice(1).map((point, idx) => {
                    const prev = chain.points[idx];
                    const seg = segmentPath(prev.x, prev.z, point.x, point.z, hashSeed(point.id));
                    const segEmph =
                      point.id === selectedId ||
                      point.id === hoveredId ||
                      prev.id === selectedId ||
                      prev.id === hoveredId ||
                      point.id === zoomHover;
                    return (
                      <path
                        key={point.id}
                        d={seg.d}
                        fill="none"
                        stroke={circuit.color}
                        strokeWidth={segEmph ? 1.8 : 1.1}
                        strokeDasharray="5 3"
                        opacity={segEmph ? 0.95 : 0.5}
                      />
                    );
                  })}
                </g>
              );
            })}
          </g>

          {/* Símbolos eléctricos */}
          <g>
            {ELECTRICAL_POINTS.map((point) => {
              const circuit = CIRCUITS.find((c) => c.id === point.circuit)!;
              const visible = activeLayers.has(point.circuit);
              const isSelected = point.id === selectedId;
              const isHovered = point.id === hoveredId || point.id === zoomHover;
              return (
                <g
                  key={point.id}
                  transform={`translate(${toX(point.x)}, ${toY(point.z)})`}
                  opacity={visible ? 1 : 0.22}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!moved.current) onSelect(point.id);
                  }}
                  onMouseEnter={() => {
                    setZoomHover(point.id);
                    onHover(point.id);
                  }}
                  onMouseLeave={() => {
                    setZoomHover(null);
                    onHover(null);
                  }}
                >
                  {(isSelected || isHovered) && visible && (
                    <circle r={13} fill={circuit.color} opacity={0.14} />
                  )}
                  <SymbolFor point={point} color={circuit.color} scale={1} />
                  {point.type !== "interruptor" && (
                    <text
                      y={-11}
                      textAnchor="middle"
                      fontSize={isSelected || isHovered ? 7.5 : 6}
                      fontFamily="Arial, sans-serif"
                      fill={isSelected || isHovered ? "#111318" : "#8B97A8"}
                    >
                      {point.code}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Norte */}
          <g transform={`translate(${width - MARGIN}, ${MARGIN})`}>
            <text textAnchor="middle" fontSize={13} fill="#A8492E" fontFamily="Georgia, serif">
              N ↑
            </text>
          </g>

          {/* Escala */}
          <g transform={`translate(${MARGIN}, ${height - BOTTOM_BAND + 30})`}>
            <line x1={0} y1={0} x2={SCALE * 2} y2={0} stroke="#111318" strokeWidth={1.5} />
            <line x1={0} y1={-3} x2={0} y2={3} stroke="#111318" strokeWidth={1.5} />
            <line x1={SCALE * 2} y1={-3} x2={SCALE * 2} y2={3} stroke="#111318" strokeWidth={1.5} />
            <text x={SCALE} y={-7} textAnchor="middle" fontSize={9} fill="#111318" fontFamily="Arial, sans-serif">
              2 m
            </text>
          </g>

          {/* Cajetín / título, esquina inferior derecha (convención de dibujo técnico) */}
          <g transform={`translate(${width - MARGIN - titleW}, ${height - BOTTOM_BAND + 14})`}>
            <rect width={titleW} height={titleH} fill="#FFFFFF" stroke="#111318" strokeWidth={1.2} />
            <line x1={0} y1={20} x2={titleW} y2={20} stroke="#111318" strokeWidth={0.8} />
            <text x={10} y={14} fontSize={12} fontWeight={700} fontFamily="Arial, sans-serif" fill="#0A0A0A">
              {SITE.name}
            </text>
            <text x={10} y={32} fontSize={7.5} fontFamily="Arial, sans-serif" fill="#55606E">
              Plano de instalación eléctrica residencial
            </text>
            <text x={10} y={43} fontSize={7.5} fontFamily="Arial, sans-serif" fill="#55606E">
              Vivienda de un piso · Ver barra de escala
            </text>
          </g>
        </svg>
      </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex flex-col overflow-hidden rounded-xl border border-border/80 bg-white/95 shadow-xl backdrop-blur-md sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => zoomBy(1.25)}
          aria-label="Acercar"
          className="flex h-9 w-9 items-center justify-center text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
        >
          <FaPlus size={12} />
        </button>
        <div className="h-px bg-border/80" />
        <button
          type="button"
          onClick={() => zoomBy(0.8)}
          aria-label="Alejar"
          className="flex h-9 w-9 items-center justify-center text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
        >
          <FaMinus size={12} />
        </button>
        <div className="h-px bg-border/80" />
        <button
          type="button"
          onClick={resetView}
          aria-label="Restablecer zoom"
          className="flex h-9 w-9 items-center justify-center text-text-secondary transition hover:bg-black/5 hover:text-text-primary"
        >
          <FaExpand size={11} />
        </button>
      </div>
    </div>
  );
}
