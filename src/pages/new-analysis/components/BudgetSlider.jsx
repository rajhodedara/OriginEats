import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetSlider = ({ value, onChange, error }) => {
  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000)?.toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000)?.toFixed(2)} Lakhs`;
    }
    return `₹${amount?.toLocaleString('en-IN')}`;
  };

  const minBudget = 500000;
  const maxBudget = 10000000;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon name="IndianRupee" size={20} className="text-primary" />
        <label className="text-sm font-medium text-foreground">
          Investment Budget <span className="text-destructive">*</span>
        </label>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatCurrency(minBudget)}
          </span>
          <span className="text-lg font-semibold text-primary">
            {formatCurrency(value)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatCurrency(maxBudget)}
          </span>
        </div>
        
        <input
          type="range"
          min={minBudget}
          max={maxBudget}
          step={100000}
          value={value}
          onChange={(e) => onChange(Number(e?.target?.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          style={{
            background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((value - minBudget) / (maxBudget - minBudget)) * 100}%, var(--color-muted) ${((value - minBudget) / (maxBudget - minBudget)) * 100}%, var(--color-muted) 100%)`
          }}
        />
        
        <p className="text-xs text-muted-foreground">
          Slide to set your total investment budget including setup, equipment, and initial working capital
        </p>
        
        {error && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default BudgetSlider;