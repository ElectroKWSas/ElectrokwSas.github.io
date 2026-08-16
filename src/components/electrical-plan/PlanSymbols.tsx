import type { ElectricalPoint } from "@/types/electricalPlan";

interface SymbolProps {
  point: ElectricalPoint;
  color: string;
  scale: number;
}

export function CeilingLightSymbol({ color, scale }: SymbolProps) {
  const r = 6.5 * scale;
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const x1 = Math.cos(angle) * (r + 1.5 * scale);
    const y1 = Math.sin(angle) * (r + 1.5 * scale);
    const x2 = Math.cos(angle) * (r + 5 * scale);
    const y2 = Math.sin(angle) * (r + 5 * scale);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.1} />;
  });
  return (
    <g>
      {rays}
      <circle r={r} fill="white" stroke={color} strokeWidth={1.4} />
    </g>
  );
}

export function SwitchSymbol({ point, color, scale }: SymbolProps) {
  const label = point.name.toLowerCase().includes("conmutaci") ? "S3" : "S";
  return (
    <g>
      <circle r={1.6 * scale} fill={color} />
      <text
        x={5 * scale}
        y={2.5 * scale}
        fontSize={9 * scale}
        fontStyle="italic"
        fontFamily="Georgia, serif"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

function OutletGlyph({ color, scale }: { color: string; scale: number }) {
  const r = 5 * scale;
  return (
    <g>
      <circle r={r} fill="white" stroke={color} strokeWidth={1.4} />
      <line x1={-1.6 * scale} y1={-2.6 * scale} x2={-1.6 * scale} y2={2.6 * scale} stroke={color} strokeWidth={1.3} />
      <line x1={1.6 * scale} y1={-2.6 * scale} x2={1.6 * scale} y2={2.6 * scale} stroke={color} strokeWidth={1.3} />
    </g>
  );
}

export function OutletSymbol({ color, scale }: SymbolProps) {
  return <OutletGlyph color={color} scale={scale} />;
}

export function GfciSymbol({ color, scale }: SymbolProps) {
  return (
    <g>
      <OutletGlyph color={color} scale={scale} />
      <text x={7 * scale} y={3 * scale} fontSize={5.5 * scale} fontFamily="Arial, sans-serif" fill={color}>
        GFCI
      </text>
    </g>
  );
}

export function ExtractorSymbol({ color, scale }: SymbolProps) {
  const r = 6 * scale;
  return (
    <g>
      <circle r={r} fill="white" stroke={color} strokeWidth={1.4} />
      <path
        d={`M0,0 Q ${3 * scale},${-5 * scale} 0,${-r} Q ${-3 * scale},${-5 * scale} 0,0`}
        fill={color}
        opacity={0.85}
        transform="rotate(0)"
      />
      <path
        d={`M0,0 Q ${3 * scale},${-5 * scale} 0,${-r} Q ${-3 * scale},${-5 * scale} 0,0`}
        fill={color}
        opacity={0.85}
        transform="rotate(120)"
      />
      <path
        d={`M0,0 Q ${3 * scale},${-5 * scale} 0,${-r} Q ${-3 * scale},${-5 * scale} 0,0`}
        fill={color}
        opacity={0.85}
        transform="rotate(240)"
      />
    </g>
  );
}

export function SpecialSymbol({ point, color, scale }: SymbolProps) {
  const s = 6.5 * scale;
  return (
    <g>
      <rect x={-s} y={-s} width={s * 2} height={s * 2} fill="white" stroke={color} strokeWidth={1.5} transform="rotate(45)" />
      <text x={0} y={s + 8 * scale} fontSize={5.4 * scale} fontFamily="Arial, sans-serif" fill={color} textAnchor="middle" fontWeight={700}>
        {point.specs.voltage}
      </text>
    </g>
  );
}

export function PanelSymbol({ color, scale }: SymbolProps) {
  const w = 9 * scale;
  const h = 13 * scale;
  return (
    <g>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="white" stroke={color} strokeWidth={1.8} />
      {[-3, -1, 1, 3].map((i) => (
        <line
          key={i}
          x1={-w / 2}
          y1={(i * h) / 8}
          x2={w / 2}
          y2={(i * h) / 8}
          stroke={color}
          strokeWidth={0.9}
        />
      ))}
    </g>
  );
}

export function SymbolFor(props: SymbolProps) {
  switch (props.point.type) {
    case "punto-luz":
      return <CeilingLightSymbol {...props} />;
    case "interruptor":
      return <SwitchSymbol {...props} />;
    case "tomacorriente":
      return <OutletSymbol {...props} />;
    case "gfci":
      return <GfciSymbol {...props} />;
    case "extractor":
      return <ExtractorSymbol {...props} />;
    case "circuito-220v":
    case "circuito-especial":
      return <SpecialSymbol {...props} />;
    case "tablero":
      return <PanelSymbol {...props} />;
    default:
      return null;
  }
}
