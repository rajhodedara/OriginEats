import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlanCard = ({ plan, isYearly, onUpgrade, isCurrentPlan }) => {
  const price = isYearly ? plan?.yearlyPrice : plan?.monthlyPrice;
  const billingCycle = isYearly ? 'year' : 'month';

  return (
    <div className={`relative bg-card border-2 rounded-xl p-6 md:p-8 transition-all duration-250 hover:shadow-warm-md ${
      plan?.isPro ? 'border-primary shadow-warm' : 'border-border'
    }`}>
      {plan?.isPro && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs md:text-sm font-semibold rounded-full">
          Most Popular
        </div>
      )}
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{plan?.name}</h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4">{plan?.description}</p>
        
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl md:text-5xl font-bold text-foreground">₹{price?.toLocaleString('en-IN')}</span>
          <span className="text-base md:text-lg text-muted-foreground">/{billingCycle}</span>
        </div>
        
        {isYearly && plan?.isPro && (
          <p className="mt-2 text-xs md:text-sm text-accent font-medium">
            Save ₹{((plan?.monthlyPrice * 12) - plan?.yearlyPrice)?.toLocaleString('en-IN')} annually
          </p>
        )}
      </div>
      <div className="space-y-4 mb-6 md:mb-8">
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
              feature?.included ? 'bg-primary' : 'bg-muted'
            }`}>
              <Icon 
                name={feature?.included ? 'Check' : 'X'} 
                size={14} 
                color={feature?.included ? '#FFFFFF' : '#57534E'} 
              />
            </div>
            <div className="flex-1">
              <p className={`text-sm md:text-base ${feature?.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                {feature?.name}
              </p>
              {feature?.description && (
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{feature?.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {isCurrentPlan ? (
        <Button variant="outline" fullWidth disabled>
          Current Plan
        </Button>
      ) : (
        <Button 
          variant={plan?.isPro ? 'default' : 'outline'} 
          fullWidth
          onClick={() => onUpgrade(plan)}
          iconName="ArrowRight"
          iconPosition="right"
        >
          {plan?.isPro ? 'Upgrade to Pro' : 'Continue with Free'}
        </Button>
      )}
      {plan?.isPro && (
        <div className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>Secure payment processing</span>
        </div>
      )}
    </div>
  );
};

export default PlanCard;