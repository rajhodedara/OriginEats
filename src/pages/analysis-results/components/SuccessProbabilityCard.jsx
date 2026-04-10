import React from 'react';
import Icon from '../../../components/AppIcon';

const SuccessProbabilityCard = ({ probability, riskLevel, keyFactors }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'Low':
        return 'text-success';
      case 'Medium':
        return 'text-warning';
      case 'High':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'Low':
        return 'bg-success/10';
      case 'Medium':
        return 'bg-warning/10';
      case 'High':
        return 'bg-destructive/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 md:p-8 shadow-warm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Success Probability Analysis
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            AI-powered insights for your restaurant venture in Mumbai
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
              {probability}%
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>

          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${getRiskBgColor(riskLevel)}`}>
            <Icon
              name={riskLevel === 'Low' ? 'TrendingUp' : riskLevel === 'Medium' ? 'Activity' : 'TrendingDown'}
              size={24}
              className={getRiskColor(riskLevel)}
            />
            <div>
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <p className={`text-lg font-semibold ${getRiskColor(riskLevel)}`}>
                {riskLevel}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Key Success Factors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyFactors?.map((factor, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Check" size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{factor?.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{factor?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessProbabilityCard;