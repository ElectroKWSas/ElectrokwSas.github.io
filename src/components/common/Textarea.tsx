import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";
import type { TextareaProps } from "@/interfaces/component-props";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className, rows = 5, ...rest }, ref) => {
    const autoId = useId();
    const textareaId = id || autoId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full resize-none rounded-xl border bg-surface dark:bg-surface-dark px-4 py-3 text-text-primary dark:text-text-primary-dark placeholder:text-text-secondary/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
            error ? "border-error" : "border-border dark:border-border-dark",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-error">
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

Textarea.displayName = "Textarea";

export default Textarea;
