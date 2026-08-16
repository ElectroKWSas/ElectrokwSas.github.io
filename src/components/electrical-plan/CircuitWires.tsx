import { useMemo } from "react";
import { Line } from "@react-three/drei";
import type { CircuitId } from "@/types/electricalPlan";
import { CIRCUITS } from "@/data/electricalPlan";
import { getWireChains, panelPoint } from "@/utils/electricalWiring";

const WIRE_Y = 0.03;
const PANEL = panelPoint();

interface CircuitWiresProps {
  activeLayers: Set<CircuitId>;
  selectedId: string | null;
  hoveredId: string | null;
}

export default function CircuitWires({ activeLayers, selectedId, hoveredId }: CircuitWiresProps) {
  const chains = useMemo(() => getWireChains(), []);

  return (
    <group>
      {chains.map((chain) => {
        if (!activeLayers.has(chain.circuit)) return null;
        const circuit = CIRCUITS.find((c) => c.id === chain.circuit)!;
        const emphasizedChain = chain.points.some((p) => p.id === selectedId || p.id === hoveredId);

        // Acometida: del tablero al primer punto del recorrido del circuito
        const homeRun: [number, number, number][] = [
          [PANEL.x, WIRE_Y, PANEL.z],
          [chain.points[0].x, WIRE_Y, PANEL.z],
          [chain.points[0].x, WIRE_Y, chain.points[0].z],
        ];

        return (
          <group key={chain.key}>
            <Line
              points={homeRun}
              color={circuit.color}
              lineWidth={emphasizedChain ? 2.4 : 1}
              transparent
              opacity={emphasizedChain ? 0.9 : 0.35}
            />
            {chain.points.slice(1).map((point, idx) => {
              const prev = chain.points[idx];
              const emphasized = emphasizedChain && (point.id === selectedId || point.id === hoveredId || prev.id === selectedId || prev.id === hoveredId);
              return (
                <Line
                  key={point.id}
                  points={[
                    [prev.x, WIRE_Y, prev.z],
                    [point.x, WIRE_Y, point.z],
                  ]}
                  color={circuit.color}
                  lineWidth={emphasized ? 2.4 : 1.3}
                  transparent
                  opacity={emphasized ? 0.9 : 0.45}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
