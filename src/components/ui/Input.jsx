import React from "react";
import { cn } from "../../utils/cn";

/* ─────────────────────────────────────────────────────────────────────
   Input — premium/futuristic aesthetic overhaul
   Design choices:
   • `bg-background/60 backdrop-blur-sm` glass base at rest.
   • `border-border/50` ultra-thin border → full at focus.
   • Focus: layered glow ring (`shadow-[0_0_0_3px_...]`) —
     a breathing soft halo, not a hard rectangle.
   • `transition-all duration-200` — border, shadow, bg all animate.
   • Label: `tracking-tight font-medium text-xs uppercase` editorial
     feel with increased letter-spacing for the label tier.
   • Error: destructive glow ring on focus.
   • All structure, IDs, description/error slots — UNTOUCHED.
───────────────────────────────────────────────────────────────────── */

const Input = React.forwardRef(({
  className, type = "text",
  label, description, error,
  required = false, id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random()?.toString(36)?.substr(2, 9)}`;

  const baseInputClasses = [
    "flex h-10 w-full rounded-lg",
    "border border-border/50 bg-background/60",
    "backdrop-blur-sm",
    "px-3 py-2 text-sm text-foreground",
    "ring-offset-background",
    "placeholder:text-muted-foreground/40",
    "transition-all duration-200 ease-out",
    // Hover
    "hover:border-border/80 hover:bg-background/80",
    // Focus — soft glow halo
    "focus-visible:outline-none",
    "focus-visible:border-ring/80",
    "focus-visible:bg-background",
    "focus-visible:shadow-[0_0_0_3px_hsl(var(--ring)/0.12),0_1px_4px_rgba(0,0,0,0.08)]",
    // File
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-40",
  ].join(" ");

  if (type === "checkbox") {
    return (
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded-sm border border-border/60 bg-background/60 text-primary",
          "transition-all duration-150",
          "focus:ring-2 focus:ring-ring/30 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        ref={ref}
        id={inputId}
        {...props}
      />
    );
  }

  if (type === "radio") {
    return (
      <input
        type="radio"
        className={cn(
          "h-4 w-4 rounded-full border border-border/60 bg-background/60 text-primary",
          "transition-all duration-150",
          "focus:ring-2 focus:ring-ring/30 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        ref={ref}
        id={inputId}
        {...props}
      />
    );
  }

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "block text-xs font-medium tracking-widest uppercase",
            "leading-none select-none",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            error ? "text-destructive" : "text-foreground/50",
          )}
        >
          {label}
          {required && (
            <span className="text-destructive ml-1 normal-case tracking-normal">*</span>
          )}
        </label>
      )}

      <input
        type={type}
        className={cn(
          baseInputClasses,
          error && [
            "border-destructive/50",
            "hover:border-destructive/70",
            "focus-visible:border-destructive/80",
            "focus-visible:shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
          ],
          className
        )}
        ref={ref}
        id={inputId}
        {...props}
      />

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
  );
});

Input.displayName = "Input";
export default Input;
