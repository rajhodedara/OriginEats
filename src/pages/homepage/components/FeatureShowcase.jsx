import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureShowcase = () => {
  const features = [
    {
      icon: "MapPinned",
      title: "Hyper-Local Mumbai Insights",
      description: "Get granular data across all of Mumbai, covering every neighborhood and ward, with detailed foot traffic patterns, demographic insights, and local competition analyzed at the pin-code level.",
      benefits: ["Area-specific demand analysis", "Neighborhood demographics", "Local competitor mapping"]
    },
    {
      icon: "TrendingUp",
      title: "AI Revenue Prediction",
      description: "Our machine learning models analyze a broad combination of signals such as location dynamics, cuisine preferences, pricing bands, mobility patterns, and seasonal demand trends to forecast your 12-month revenue trajectory with strong predictive confidence.",
      benefits: ["12-month revenue forecasts", "Break-even analysis", "ROI timeline projections"]
    },
    {
      icon: "Radar",
      title: "Competitor Intelligence Radar",
      description: "Identify every restaurant within 500m radius. Compare pricing, menu offerings, customer ratings, and market positioning to find your competitive edge.",
      benefits: ["Real-time competitor tracking", "Pricing benchmarks", "Market gap identification"]
    }
  ];

  return (
    <section id="features" className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Mumbai-Specific Intelligence for Restaurant Success
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Powered by AI trained on Mumbai's unique food service market dynamics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-xl mb-4 md:mb-6">
                <Icon name={feature?.icon} size={28} className="text-primary" />
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">
                {feature?.title}
              </h3>

              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                {feature?.description}
              </p>

              <ul className="space-y-2 md:space-y-3">
                {feature?.benefits?.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;