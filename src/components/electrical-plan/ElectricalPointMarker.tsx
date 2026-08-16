import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text, Line } from "@react-three/drei";
import type { Mesh } from "three";
import type { ElectricalPoint } from "@/types/electricalPlan";
import { CIRCUITS } from "@/data/electricalPlan";

interface ElectricalPointMarkerProps {
  point: ElectricalPoint;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export default function ElectricalPointMarker({
  point,
  isSelected,
  isDimmed,
  onSelect,
  onHover,
}: ElectricalPointMarkerProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<Mesh>(null);
  const circuit = CIRCUITS.find((c) => c.id === point.circuit)!;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    if (isSelected) {
      const pulse = 1.5 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
      meshRef.current.scale.setScalar(pulse);
    } else if (hovered) {
      meshRef.current.scale.setScalar(1.35);
    } else {
      meshRef.current.scale.setScalar(1);
    }
  });

  const showStem = point.y > 0.2;

  return (
    <group>
      {showStem && (
        <Line
          points={[
            [point.x, 0.01, point.z],
            [point.x, point.y, point.z],
          ]}
          color={circuit.color}
          lineWidth={1}
          dashed
          dashSize={0.06}
          gapSize={0.06}
          transparent
          opacity={isDimmed ? 0.15 : 0.4}
        />
      )}

      <mesh
        ref={meshRef}
        position={[point.x, point.y, point.z]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(point.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(point.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial
          color={circuit.color}
          emissive={circuit.color}
          emissiveIntensity={isSelected ? 1.1 : hovered ? 0.7 : 0.4}
          transparent
          opacity={isDimmed ? 0.25 : 1}
          roughness={0.3}
        />
      </mesh>

      {!isDimmed && (
        <Billboard position={[point.x, point.y + (hovered || isSelected ? 0.26 : 0.2), point.z]}>
          <Text
            fontSize={hovered || isSelected ? 0.17 : 0.1}
            color={hovered || isSelected ? "#0A0A0A" : "#5B6472"}
            anchorX="center"
            anchorY="bottom"
            outlineWidth={hovered || isSelected ? 0.018 : 0}
            outlineColor="#FFFFFF"
            fillOpacity={hovered || isSelected ? 1 : 0.85}
          >
            {point.code}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
