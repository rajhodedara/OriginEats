import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Input from "./Input";

/* ─────────────────────────────────────────────────────────────────────
   Select — premium/futuristic aesthetic overhaul
   Design choices:
   • Trigger: `bg-background/60 backdrop-blur-sm` glass base, ultra-thin
     border, soft glow on focus.
   • Dropdown: `backdrop-blur-xl bg-background/92` floating glass panel,
     `rounded-2xl`, diffused shadow + border.
   • Entrance: `@keyframes selectIn` scale+fade from 0.96 → 1.
   • Options: `rounded-xl` inside panel, selected uses primary glow.
   • ChevronDown: smooth 180° rotation.
   • All filter/multi/search/clearable/native hidden select — UNTOUCHED.
───────────────────────────────────────────────────────────────────── */

const Select = React.forwardRef(({
  className, options = [],
  value, defaultValue,
  placeholder = "Select an option",
  multiple = false, disabled = false, required = false,
  label, description, error,
  searchable = false, clearable = false, loading = false,
  id, name,
  onChange, onOpenChange,
  ...props
}, ref) => {
  const [isOpen, setIsOpen]       = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  const selectId = id || `select-${Math.random()?.toString(36)?.substr(2, 9)}`;

  const filteredOptions = searchable && searchTerm
    ? options?.filter(option =>
        option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        (option?.value && option?.value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
      )
    : options;

  const getSelectedDisplay = () => {
    if (!value) return placeholder;
    if (multiple) {
      const selectedOptions = options?.filter(opt => value?.includes(opt?.value));
      if (selectedOptions?.length === 0) return placeholder;
      if (selectedOptions?.length === 1) return selectedOptions?.[0]?.label;
      return `${selectedOptions?.length} items selected`;
    }
    const selectedOption = options?.find(opt => opt?.value === value);
    return selectedOption ? selectedOption?.label : placeholder;
  };

  const handleToggle = () => {
    if (!disabled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onOpenChange?.(newIsOpen);
      if (!newIsOpen) setSearchTerm("");
    }
  };

  const handleOptionSelect = (option) => {
    if (multiple) {
      const newValue = value || [];
      const updatedValue = newValue?.includes(option?.value)
        ? newValue?.filter(v => v !== option?.value)
        : [...newValue, option?.value];
      onChange?.(updatedValue);
    } else {
      onChange?.(option?.value);
      setIsOpen(false);
      onOpenChange?.(false);
    }
  };

  const handleClear = (e) => {
    e?.stopPropagation();
    onChange?.(multiple ? [] : '');
  };

  const handleSearchChange = (e) => setSearchTerm(e?.target?.value);

  const isSelected = (optionValue) => {
    if (multiple) return value?.includes(optionValue) || false;
    return value === optionValue;
  };

  const hasValue = multiple ? value?.length > 0 : value !== undefined && value !== '';

  // Click-outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            "block text-xs font-medium tracking-widest uppercase mb-2 leading-none select-none",
            error ? "text-destructive" : "text-foreground/50",
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1 normal-case tracking-normal">*</span>}
        </label>
      )}

      <div className="relative">
        {/* ── Trigger ── */}
        <button
          ref={ref}
          id={selectId}
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg",
            "border border-border/50 bg-background/60 backdrop-blur-sm",
            "px-3 py-2 text-sm tracking-tight",
            "ring-offset-background",
            "transition-all duration-200 ease-out",
            "hover:border-border/80 hover:bg-background/80",
            "focus:outline-none focus:border-ring/80 focus:bg-background",
            "focus:shadow-[0_0_0_3px_hsl(var(--ring)/0.12)]",
            "disabled:cursor-not-allowed disabled:opacity-40",
            error && [
              "border-destructive/50",
              "focus:border-destructive/80",
              "focus:shadow-[0_0_0_3px_hsl(var(--destructive)/0.12)]",
            ],
            !hasValue && "text-muted-foreground/50",
          )}
          onClick={handleToggle}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...props}
        >
          <span className="truncate">{getSelectedDisplay()}</span>

          <div className="flex items-center gap-1 flex-shrink-0">
            {clearable && hasValue && !loading && (
              <button
                type="button"
                className="h-4 w-4 flex items-center justify-center rounded text-muted-foreground/60 hover:text-foreground transition-colors"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground/50",
                "transition-transform duration-200 ease-out",
                isOpen && "rotate-180 text-foreground/70",
              )}
            />
          </div>
        </button>

        {/* Hidden native select */}
        <select
          name={name}
          value={value || ''}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
          multiple={multiple}
          required={required}
        >
          <option value="">Select...</option>
          {options?.map(option => (
            <option key={option?.value} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>

        {/* ── Dropdown Panel ── */}
        {isOpen && (
          <div
            className="absolute z-50 w-full mt-2 overflow-hidden"
            style={{
              borderRadius: '1rem',
              border: '1px solid hsl(var(--border) / 0.45)',
              background: 'hsl(var(--background) / 0.94)',
              backdropFilter: 'blur(24px) saturate(1.5)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08), 0 16px 40px -8px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.04) inset',
              animation: 'selectDropIn 0.18s cubic-bezier(0.22, 1, 0.36, 1) both',
            }}
          >
            <style>{`
              @keyframes selectDropIn {
                from { opacity: 0; transform: scale(0.96) translateY(-6px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
              }
            `}</style>

            {searchable && (
              <div className="p-2 border-b border-border/30">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground/40" />
                  <Input
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="pl-8 h-8 text-xs"
                  />
                </div>
              </div>
            )}

            <div className="py-1.5 max-h-60 overflow-auto">
              {filteredOptions?.length === 0 ? (
                <div className="px-3 py-3 text-xs text-muted-foreground/50 text-center tracking-tight">
                  {searchTerm ? 'No options found' : 'No options available'}
                </div>
              ) : (
                filteredOptions?.map((option) => (
                  <div
                    key={option?.value}
                    className={cn(
                      "relative flex items-center rounded-lg mx-1.5 my-0.5",
                      "px-3 py-2 text-sm tracking-tight",
                      "transition-all duration-100 ease-out",
                      "cursor-pointer select-none outline-none",
                      isSelected(option?.value)
                        ? "bg-primary/90 text-primary-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.4)]"
                        : "text-foreground/75 hover:bg-accent/60 hover:text-foreground",
                      option?.disabled && "pointer-events-none opacity-40",
                    )}
                    onClick={() => !option?.disabled && handleOptionSelect(option)}
                  >
                    <span className="flex-1">{option?.label}</span>
                    {multiple && isSelected(option?.value) && (
                      <Check className="h-3.5 w-3.5 flex-shrink-0 ml-2" strokeWidth={2.5} />
                    )}
                    {option?.description && (
                      <span className="text-xs opacity-50 ml-2 flex-shrink-0">
                        {option?.description}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {description && !error && (
        <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">
          {description}
        </p>
      )}
      {error && (
        <p className="text-xs text-destructive/80 mt-2 leading-relaxed flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-destructive/80 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";
export default Select;
