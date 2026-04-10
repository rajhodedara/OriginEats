import React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../utils/cn";

/* ─────────────────────────────────────────────────────────────────────
   Checkbox — premium/futuristic aesthetic overhaul
   Design choices:
   • Unchecked: `bg-background/60 backdrop-blur-sm` glass box,
     `border-border/50` ultra-thin border. Hover lifts border to full.
   • Checked: primary bg + `shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]`
     glow halo — makes selection feel alive.
   • Check icon: `scale-100` entrance with `duration-150` spring feel.
   • Label: `tracking-tight` — refined typographic pairing.
   • All structure, CheckboxGroup, IDs, error/description — UNTOUCHED.
───────────────────────────────────────────────────────────────────── */

const Checkbox = React.forwardRef(({
  className, id,
  checked, indeterminate = false,
  disabled = false, required = false,
  label, description, error,
  size = "default",
  ...props
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random()?.toString(36)?.substr(2, 9)}`;

  const sizeClasses = {
    sm:      "h-4 w-4",
    default: "h-4 w-4",
    lg:      "h-5 w-5",
  };

  const isCheckedOrIndeterminate = checked || indeterminate;

  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <div className="relative flex items-center mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          ref={ref}
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          required={required}
          className="sr-only"
          {...props}
        />

        <label
          htmlFor={checkboxId}
          className={cn(
            "peer shrink-0 rounded-md",
            "border transition-all duration-200 ease-out",
            "ring-offset-background",
            "flex items-center justify-center",
            sizeClasses?.[size],
            // Checked / indeterminate
            isCheckedOrIndeterminate ? [
              "bg-primary text-primary-foreground border-primary",
              "shadow-[0_0_0_3px_hsl(var(--primary)/0.18),0_0_12px_hsl(var(--primary)/0.15)]",
            ] : [
              "bg-background/60 backdrop-blur-sm border-border/50",
              "hover:border-border hover:bg-background/80",
              "hover:shadow-[0_0_0_3px_hsl(var(--border)/0.15)]",
            ],
            // Error
            error && "border-destructive/60 shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
            // Disabled
            disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
          )}
        >
          {checked && !indeterminate && (
            <Check
              className={cn(
                "h-3 w-3 text-current",
                "transition-all duration-150 ease-out",
                checked ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
              strokeWidth={2.5}
            />
          )}
          {indeterminate && (
            <Minus
              className={cn(
                "h-3 w-3 text-current",
                "transition-all duration-150 ease-out",
                indeterminate ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
              strokeWidth={2.5}
            />
          )}
        </label>
      </div>

      {(label || description || error) && (
        <div className="flex-1 space-y-1 min-w-0">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "block text-sm font-medium tracking-tight leading-none",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                error ? "text-destructive" : "text-foreground",
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}

          {description && !error && (
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              {description}
            </p>
          )}

          {error && (
            <p className="text-xs text-destructive/80 leading-relaxed flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-destructive/80 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

/* ── CheckboxGroup ───────────────────────────────────────────────── */

const CheckboxGroup = React.forwardRef(({
  className, children,
  label, description, error,
  required = false, disabled = false,
  ...props
}, ref) => {
  return (
    <fieldset
      ref={ref}
      disabled={disabled}
      className={cn("space-y-3", className)}
      {...props}
    >
      {label && (
        <legend className={cn(
          "text-xs font-medium tracking-widest uppercase",
          error ? "text-destructive" : "text-foreground/50",
        )}>
          {label}
          {required && <span className="text-destructive ml-1 normal-case tracking-normal">*</span>}
        </legend>
      )}

      {description && !error && (
        <p className="text-xs text-muted-foreground/60 leading-relaxed">
          {description}
        </p>
      )}

      <div className="space-y-2.5">
        {children}
      </div>

      {error && (
        <p className="text-xs text-destructive/80 leading-relaxed flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-destructive/80 flex-shrink-0" />
          {error}
        </p>
      )}
    </fieldset>
  );
});

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };
