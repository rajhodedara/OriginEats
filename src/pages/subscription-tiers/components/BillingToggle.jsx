import React from 'react';

const BillingToggle = ({ isYearly, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8 md:mb-12">
      <span className={`text-sm md:text-base font-medium transition-colors duration-250 ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative w-14 h-7 md:w-16 md:h-8 bg-muted rounded-full transition-all duration-250 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-3"
        aria-label={`Switch to ${isYearly ? 'monthly' : 'yearly'} billing`}
        role="switch"
        aria-checked={isYearly}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 md:w-6 md:h-6 bg-primary rounded-full transition-transform duration-250 ${
            isYearly ? 'translate-x-7 md:translate-x-8' : 'translate-x-0'
          }`}
        />
      </button>
      <span className={`text-sm md:text-base font-medium transition-colors duration-250 ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
        Yearly
      </span>
      {isYearly && (
        <span className="ml-2 px-3 py-1 bg-accent text-accent-foreground text-xs md:text-sm font-medium rounded-full">
          Save 20%
        </span>
      )}
    </div>
  );
};

export default BillingToggle;