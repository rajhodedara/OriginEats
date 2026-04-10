import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

/* ─────────────────────────────────────────────────────────────────────
   Button — premium/futuristic aesthetic overhaul
   Design choices:
   • `shimmer-btn` pseudo-element sweep on hover (::after diagonal glide).
   • Glow shadows per variant — diffused, not harsh.
   • `hover:scale-[1.025] active:scale-[0.975]` tactile press feel.
   • outline variant: glass tint + inset highlight on hover.
   • All variants, sizes, loading, asChild, icon logic — UNTOUCHED.
───────────────────────────────────────────────────────────────────── */

const buttonVariants = cva(
  [
    "shimmer-btn",
    "relative overflow-hidden",
    "inline-flex items-center justify-center whitespace-nowrap",
    "rounded-lg text-sm font-medium tracking-tight",
    "ring-offset-background",
    "transition-all duration-200 ease-out",
    "hover:scale-[1.025] active:scale-[0.975]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground " +
          "hover:bg-primary/90 " +
          "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_6px_28px_-4px_hsl(var(--primary)/0.5)]",
        destructive:
          "bg-destructive text-destructive-foreground " +
          "hover:bg-destructive/90 " +
          "hover:shadow-[0_0_0_1px_hsl(var(--destructive)/0.4),0_6px_24px_-4px_hsl(var(--destructive)/0.45)]",
        outline:
          "border border-border/60 bg-background/60 backdrop-blur-sm " +
          "text-foreground/80 " +
          "hover:bg-accent/50 hover:text-foreground hover:border-border " +
          "hover:shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06),0_2px_12px_-2px_rgba(0,0,0,0.1)]",
        secondary:
          "bg-secondary/80 text-secondary-foreground backdrop-blur-sm " +
          "hover:bg-secondary hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)]",
        ghost:
          "text-foreground/70 " +
          "hover:bg-accent/60 hover:text-foreground " +
          "hover:scale-[1.02] active:scale-[0.98]",
        link:
          "text-primary underline-offset-4 hover:underline " +
          "hover:scale-100 active:scale-100 hover:shadow-none",
        success:
          "bg-success text-success-foreground " +
          "hover:bg-success/90 " +
          "hover:shadow-[0_0_0_1px_hsl(var(--success)/0.4),0_6px_24px_-4px_hsl(var(--success)/0.45)]",
        warning:
          "bg-warning text-warning-foreground " +
          "hover:bg-warning/90 " +
          "hover:shadow-[0_4px_20px_-4px_hsl(var(--warning)/0.4)]",
        danger:
          "bg-error text-error-foreground " +
          "hover:bg-error/90 " +
          "hover:shadow-[0_0_0_1px_hsl(var(--error)/0.4),0_6px_24px_-4px_hsl(var(--error)/0.45)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm:      "h-9 rounded-md px-3 text-xs",
        lg:      "h-11 rounded-lg px-8 text-sm",
        icon:    "h-10 w-10",
        xs:      "h-8 rounded-md px-2 text-xs",
        xl:      "h-12 rounded-xl px-10 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(({
  className, variant, size,
  asChild = false, children,
  loading = false,
  iconName = null, iconPosition = 'left', iconSize = null,
  fullWidth = false, disabled = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";

  const iconSizeMap = { xs: 12, sm: 14, default: 16, lg: 18, xl: 20, icon: 16 };
  const calculatedIconSize = iconSize || iconSizeMap?.[size] || 16;

  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );

  const renderIcon = () => {
    if (!iconName) return null;
    try {
      return (
        <Icon
          name={iconName}
          size={calculatedIconSize}
          className={cn(
            "transition-transform duration-200",
            children && iconPosition === 'left'  && "mr-2",
            children && iconPosition === 'right' && "ml-2",
          )}
        />
      );
    } catch { return null; }
  };

  const renderFallbackButton = () => (
    <button
      className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full")}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {iconName && iconPosition === 'left'  && renderIcon()}
      {children}
      {iconName && iconPosition === 'right' && renderIcon()}
    </button>
  );

  if (asChild) {
    try {
      if (!children || React.Children?.count(children) !== 1) return renderFallbackButton();
      const child = React.Children?.only(children);
      if (!React.isValidElement(child)) return renderFallbackButton();
      const content = (
        <>
          {loading && <LoadingSpinner />}
          {iconName && iconPosition === 'left'  && renderIcon()}
          {child?.props?.children}
          {iconName && iconPosition === 'right' && renderIcon()}
        </>
      );
      const clonedChild = React.cloneElement(child, {
        className: cn(
          buttonVariants({ variant, size, className }),
          fullWidth && "w-full",
          child?.props?.className
        ),
        disabled: disabled || loading || child?.props?.disabled,
        children: content,
      });
      return <Comp ref={ref} {...props}>{clonedChild}</Comp>;
    } catch { return renderFallbackButton(); }
  }

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full")}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {iconName && iconPosition === 'left'  && renderIcon()}
      {children}
      {iconName && iconPosition === 'right' && renderIcon()}
    </Comp>
  );
});

Button.displayName = "Button";
export default Button;
