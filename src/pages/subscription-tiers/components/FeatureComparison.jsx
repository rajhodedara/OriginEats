import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureComparison = () => {
  const comparisonFeatures = [
    {
      category: 'Analysis Features',
      items: [
        { name: 'Location Analysis', free: '3 per month', pro: 'Unlimited' },
        { name: 'Revenue Predictions', free: 'Basic (6 months)', pro: 'Advanced (12 months)' },
        { name: 'Competitor Radar', free: false, pro: true },
        { name: 'Menu Suggestions', free: false, pro: true },
        { name: 'Disaster Simulation', free: false, pro: true }
      ]
    },
    {
      category: 'Data & Insights',
      items: [
        { name: 'Market Trends', free: 'Weekly updates', pro: 'Real-time updates' },
        { name: 'Competitor Pricing', free: 'Basic data', pro: 'Detailed analytics' },
        { name: 'Cuisine Demand Analysis', free: true, pro: true },
        { name: 'Risk Assessment', free: 'Basic', pro: 'Comprehensive' },
        { name: 'Historical Data Access', free: '3 months', pro: '2 years' }
      ]
    },
    {
      category: 'Export & Sharing',
      items: [
        { name: 'PDF Reports', free: false, pro: true },
        { name: 'CSV Data Export', free: false, pro: true },
        { name: 'Custom Branding', free: false, pro: true },
        { name: 'Team Sharing', free: false, pro: 'Up to 5 members' }
      ]
    },
    {
      category: 'Support',
      items: [
        { name: 'Email Support', free: 'Standard (48h)', pro: 'Priority (24h)' },
        { name: 'Chat Support', free: false, pro: true },
        { name: 'Phone Support', free: false, pro: true },
        { name: 'Dedicated Account Manager', free: false, pro: 'Enterprise only' }
      ]
    }
  ];

  const renderValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="Check" size={20} color="var(--color-primary)" />
      ) : (
        <Icon name="X" size={20} color="var(--color-muted-foreground)" />
      );
    }
    return <span className="text-sm md:text-base text-foreground">{value}</span>;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-center">
        Detailed Feature Comparison
      </h3>
      <div className="space-y-8">
        {comparisonFeatures?.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
              {category?.category}
            </h4>
            
            <div className="space-y-3">
              {category?.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="grid grid-cols-3 gap-4 items-center py-2">
                  <div className="col-span-1 text-sm md:text-base text-foreground">
                    {item?.name}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {renderValue(item?.free)}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    {renderValue(item?.pro)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="col-span-1"></div>
        <div className="col-span-1 text-center">
          <span className="text-sm md:text-base font-semibold text-muted-foreground">Free Plan</span>
        </div>
        <div className="col-span-1 text-center">
          <span className="text-sm md:text-base font-semibold text-primary">Pro Plan</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;