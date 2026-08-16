import { forwardRef, useId } from "react";
import { FaChevronDown } from "react-icons/fa";
import { cn } from "@/utils/cn";
import type { SelectProps } from "@/interfaces/component-props";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, className, ...rest }, ref) => {
    const autoId = useId();
    const selectId = id || autoId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none rounded-xl border bg-surface dark:bg-surface-dark px-4 py-3 pr-10 text-text-primary dark:text-text-primary-dark outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20",
              error ? "border-error" : "border-border dark:border-border-dark",
              className
            )}
            aria-invalid={!!error}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
