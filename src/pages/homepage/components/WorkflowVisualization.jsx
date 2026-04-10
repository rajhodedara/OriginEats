import React from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowVisualization = () => {
  const steps = [
    {
      number: "01",
      icon: "MapPin",
      title: "Select Location",
      description: "Choose your target Mumbai area and specify cuisine type, budget range, and business model preferences."
    },
    {
      number: "02",
      icon: "Brain",
      title: "AI Analysis",
      description: "Our AI engine processes a comprehensive range of signals including demographics, competitive density, foot traffic patterns, and evolving market trends to generate actionable location insights."
    },
    {
      number: "03",
      icon: "LineChart",
      title: "Get ROI Insights",
      description: "Receive detailed revenue predictions, risk assessment, competitor analysis, and actionable recommendations."
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            From Idea to Insights in 3 Simple Steps
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Get comprehensive restaurant analytics in minutes, not months
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative">
          {steps?.map((step, index) => (
            <React.Fragment key={index}>
              <div className="relative">
                <div className="bg-card border border-border rounded-xl p-6 md:p-8 h-full hover:shadow-warm-lg transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary rounded-xl">
                      <Icon name={step?.icon} size={24} color="#FFFFFF" />
                    </div>
                    <span className="text-4xl md:text-5xl font-bold text-primary/20">
                      {step?.number}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4">
                    {step?.title}
                  </h3>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step?.description}
                  </p>
                </div>

                {index < steps?.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <Icon name="ArrowRight" size={24} className="text-primary" />
                  </div>
                )}

                {index < steps?.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <Icon name="ArrowDown" size={24} className="text-primary" />
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowVisualization;