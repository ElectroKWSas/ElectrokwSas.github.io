import { cn } from "@/utils/cn";
import type { BadgeProps } from "@/interfaces/component-props";

const VARIANT_CLASSES: Record<string, string> = {
  primary: "bg-primary/10 text-primary dark:text-primary-light",
  accent: "bg-accent/10 text-accent",
  energy: "bg-energy/10 text-energy",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
  neutral: "bg-text-secondary/10 text-text-secondary dark:text-text-secondary-dark",
};

// Fondo opaco de alto contraste, para usar sobre fotos o superficies de color
// variable (las variantes translúcidas de arriba asumen una superficie clara
// y pierden legibilidad sobre imágenes oscuras o saturadas).
const SOLID_VARIANT_CLASSES: Record<string, string> = {
  primary: "bg-white text-primary-dark",
  accent: "bg-white text-accent-dark",
  energy: "bg-white text-energy",
  success: "bg-white text-success",
  warning: "bg-white text-warning",
  error: "bg-white text-error",
  neutral: "bg-white text-text-primary",
};

export default function Badge({ children, variant = "primary", solid = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        solid ? cn(SOLID_VARIANT_CLASSES[variant], "shadow-sm") : VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
