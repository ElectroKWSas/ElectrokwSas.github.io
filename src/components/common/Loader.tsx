import { cn } from "@/utils/cn";

interface LoaderProps {
  size?: number;
  className?: string;
}

export default function Loader({ size = 32, className }: LoaderProps) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={cn("animate-spin rounded-full border-4 border-primary/20 border-t-primary", className)}
      style={{ width: size, height: size }}
    />
  );
}
