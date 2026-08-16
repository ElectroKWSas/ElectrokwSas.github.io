import { useMemo } from "react";
import { Text, Billboard } from "@react-three/drei";
import { ROOMS, WALLS, WALL_HEIGHT, WALL_THICKNESS } from "@/data/electricalPlan";

const WALL_COLOR = "#F5F7FA";
const FLOOR_COLOR = "#E9EEF5";

function Wall({ x1, z1, x2, z2 }: { x1: number; z1: number; x2: number; z2: number }) {
  const { length, centerX, centerZ, angle } = useMemo(() => {
    const dx = x2 - x1;
    const dz = z2 - z1;
    return {
      length: Math.hypot(dx, dz),
      centerX: (x1 + x2) / 2,
      centerZ: (z1 + z2) / 2,
      angle: Math.atan2(dz, dx),
    };
  }, [x1, z1, x2, z2]);

  return (
    <mesh
      position={[centerX, WALL_HEIGHT / 2, centerZ]}
      rotation={[0, -angle, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[length, WALL_HEIGHT, WALL_THICKNESS]} />
      <meshStandardMaterial color={WALL_COLOR} roughness={0.85} metalness={0.02} />
    </mesh>
  );
}

function RoomLabel({ room }: { room: (typeof ROOMS)[number] }) {
  const cx = (room.x1 + room.x2) / 2;
  const cz = (room.z1 + room.z2) / 2;

  return (
    <group position={[cx, 0.02, cz]} rotation={[-Math.PI / 2, 0, 0]}>
      <Text
        fontSize={0.34}
        color="#8B97A8"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.02}
      >
        {room.name.toUpperCase()}
      </Text>
      {room.areaLabel && (
        <Text
          position={[0, -0.42, 0]}
          fontSize={0.2}
          color="#B7C0CC"
          anchorX="center"
          anchorY="middle"
        >
          {room.areaLabel}
        </Text>
      )}
    </group>
  );
}

export default function HouseGeometry() {
  const bounds = useMemo(() => {
    const x1 = Math.min(...ROOMS.map((r) => r.x1));
    const z1 = Math.min(...ROOMS.map((r) => r.z1));
    const x2 = Math.max(...ROOMS.map((r) => r.x2));
    const z2 = Math.max(...ROOMS.map((r) => r.z2));
    return { x1, z1, x2, z2, width: x2 - x1, depth: z2 - z1, cx: (x1 + x2) / 2, cz: (z1 + z2) / 2 };
  }, []);

  return (
    <group>
      {/* Losa / piso */}
      <mesh position={[bounds.cx, -0.05, bounds.cz]} receiveShadow>
        <boxGeometry args={[bounds.width + 0.3, 0.1, bounds.depth + 0.3]} />
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.95} />
      </mesh>

      {/* Paredes */}
      {WALLS.map((w, idx) => (
        <Wall key={idx} {...w} />
      ))}

      {/* Etiquetas de ambientes, estilo plano técnico */}
      {ROOMS.map((room) => (
        <RoomLabel key={room.id} room={room} />
      ))}

      {/* Norte de referencia */}
      <Billboard position={[bounds.x2 + 0.9, 0.9, bounds.z1 + 0.2]}>
        <Text fontSize={0.3} color="#A8492E" anchorX="center" anchorY="middle">
          N ↑
        </Text>
      </Billboard>
    </group>
  );
}
