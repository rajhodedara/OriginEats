import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/new-analysis');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full mb-6 md:mb-8">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm md:text-base font-medium text-foreground">
              Mumbai's First AI-Powered Restaurant Analytics
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 md:mb-6">
            Turn Mumbai's Food Market Data Into Your{' '}
            <span className="text-primary">Competitive Advantage</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto">
            Get hyper-localized AI insights, revenue predictions, and competitor analysis for Mumbai's restaurant landscape. Make data-driven decisions before investing your first rupee.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={handleGetStarted}
              iconName="Sparkles"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Start Free Analysis
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              iconName="PlayCircle"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              See How It Works
            </Button>
          </div>

          <div className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm md:text-base text-muted-foreground">Mumbai Locations Analyzed</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">₹2.5Cr+</div>
              <div className="text-sm md:text-base text-muted-foreground">Revenue Predicted</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">92%</div>
              <div className="text-sm md:text-base text-muted-foreground">Prediction Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;