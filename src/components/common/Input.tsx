import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";
import type { InputProps } from "@/interfaces/component-props";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border bg-surface dark:bg-surface-dark px-4 py-3 text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
            error ? "border-error" : "border-border dark:border-border-dark",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-error">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
