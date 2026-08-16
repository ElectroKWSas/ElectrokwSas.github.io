import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import type { ButtonProps } from "@/interfaces/component-props";

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary/40",
  secondary:
    "bg-secondary text-white hover:bg-secondary-light focus-visible:ring-secondary/40",
  accent:
    "bg-accent text-white hover:bg-accent-dark focus-visible:ring-accent/40",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white dark:text-primary-light dark:border-primary-light focus-visible:ring-primary/40",
  ghost:
    "text-primary hover:bg-primary/10 dark:text-primary-light dark:hover:bg-primary-light/10",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1DA851] focus-visible:ring-[#25D366]/40",
};

const SIZE_CLASSES: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth,
      isLoading,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <>
            {icon && iconPosition === "left" && <span>{icon}</span>}
            {children}
            {icon && iconPosition === "right" && <span>{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
