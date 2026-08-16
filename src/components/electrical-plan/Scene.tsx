import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ELECTRICAL_POINTS } from "@/data/electricalPlan";
import { HOUSE_CENTER } from "@/config/electricalPlan";
import type { CircuitId } from "@/types/electricalPlan";
import HouseGeometry from "@/components/electrical-plan/HouseGeometry";
import CircuitWires from "@/components/electrical-plan/CircuitWires";
import ElectricalPointMarker from "@/components/electrical-plan/ElectricalPointMarker";

interface SceneProps {
  selectedId: string | null;
  hoveredId: string | null;
  activeLayers: Set<CircuitId>;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}

function SceneContent({ selectedId, hoveredId, activeLayers, onSelect, onHover }: SceneProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <>
      <color attach="background" args={["#EEF2F7"]} />
      <fog attach="fog" args={["#EEF2F7", 26, 48]} />

      <PerspectiveCamera makeDefault fov={38} position={[17, 15, 21]} />
      <OrbitControls
        ref={controlsRef}
        target={[HOUSE_CENTER.x, 0.4, HOUSE_CENTER.z]}
        enableDamping
        dampingFactor={0.08}
        minDistance={7}
        maxDistance={30}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2 - 0.04}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        onStart={() => setAutoRotate(false)}
        makeDefault
      />

      <ambientLight intensity={0.65} />
      <directionalLight
        position={[12, 18, 8]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />
      <directionalLight position={[-10, 8, -6]} intensity={0.35} />
      <hemisphereLight args={["#EAF2FF", "#D7DEE8", 0.5]} />

      <Grid
        position={[HOUSE_CENTER.x, -0.09, HOUSE_CENTER.z]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#C9D3E0"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#AEBBCC"
        fadeDistance={34}
        fadeStrength={1.5}
        infiniteGrid
      />

      <HouseGeometry />
      <CircuitWires activeLayers={activeLayers} selectedId={selectedId} hoveredId={hoveredId} />

      {ELECTRICAL_POINTS.filter((p) => p.type !== "tablero").map((point) => (
        <ElectricalPointMarker
          key={point.id}
          point={point}
          isSelected={point.id === selectedId}
          isDimmed={!activeLayers.has(point.circuit)}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}

      {/* Tablero principal, siempre visible como origen del sistema */}
      {ELECTRICAL_POINTS.filter((p) => p.type === "tablero").map((point) => (
        <ElectricalPointMarker
          key={point.id}
          point={point}
          isSelected={point.id === selectedId}
          isDimmed={false}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </>
  );
}

export default function Scene(props: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMissed={() => props.onSelect(null)}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
