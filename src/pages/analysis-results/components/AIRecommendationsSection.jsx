import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIRecommendationsSection = ({ recommendations }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Menu':
        return 'UtensilsCrossed';
      case 'Pricing':
        return 'IndianRupee';
      case 'Operations':
        return 'Settings';
      case 'Marketing':
        return 'Megaphone';
      default:
        return 'Lightbulb';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 md:p-8 shadow-warm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Sparkles" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
            AI-Generated Recommendations
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Personalized insights to maximize your restaurant's success
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((recommendation, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden transition-all duration-250 hover:shadow-warm-sm"
          >
            <button
              onClick={() => toggleExpand(index)}
              className="w-full flex items-center justify-between p-4 md:p-5 bg-muted/50 hover:bg-muted transition-colors duration-250"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={getCategoryIcon(recommendation?.category)} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="text-base md:text-lg font-semibold text-foreground truncate">
                    {recommendation?.title}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {recommendation?.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-muted-foreground">Revenue Impact</p>
                  {/* ✅ CHANGED: Applied text-green-600 here */}
                  <p className="text-lg font-bold text-green-600">
                    +{recommendation?.revenueImpact}%
                  </p>
                </div>
                <Icon
                  name={expandedIndex === index ? 'ChevronUp' : 'ChevronDown'}
                  size={20}
                  className="text-muted-foreground"
                />
              </div>
            </button>

            {expandedIndex === index && (
              <div className="p-4 md:p-5 bg-background border-t border-border">
                <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
                  {recommendation?.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Implementation Cost</p>
                    <p className="text-xl font-bold text-foreground">
                      ₹{recommendation?.implementationCost?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Expected ROI</p>
                    {/* Note: Left expectedROI using text-success based on your theme, let me know if you want this forced to green-600 too */}
                    <p className="text-xl font-bold text-success">
                      {recommendation?.expectedROI}x
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Action Steps:</p>
                  <ul className="space-y-2">
                    {recommendation?.actionSteps?.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-primary/5 rounded-lg p-4 flex items-start gap-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Pro Tip: Implement high-impact recommendations first
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Focus on recommendations with revenue impact above 15% for maximum ROI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsSection;