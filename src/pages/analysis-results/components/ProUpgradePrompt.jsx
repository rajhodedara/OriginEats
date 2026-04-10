import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProUpgradePrompt = () => {
  const navigate = useNavigate();

  const proFeatures = [
    {
      icon: 'Sparkles',
      title: 'Advanced AI Insights',
      description: 'Get deeper market analysis with ML-powered predictions',
    },
    {
      icon: 'TrendingUp',
      title: 'Unlimited Analyses',
      description: 'Run unlimited location and cuisine combinations',
    },
    {
      icon: 'Users',
      title: 'Competitor Intelligence',
      description: 'Access detailed competitor strategies and pricing',
    },
    {
      icon: 'BarChart3',
      title: 'Custom Reports',
      description: 'Generate branded PDF reports with your logo',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 md:p-8 border-2 border-primary/20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Crown" size={24} color="#FFFFFF" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                Unlock Pro Features
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Get unlimited access to advanced analytics for just ₹999/month
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {proFeatures?.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={feature?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{feature?.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>7-day money-back guarantee • Cancel anytime</span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button
            variant="default"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/subscription-tiers')}
            fullWidth
            className="lg:w-auto"
          >
            Upgrade Now
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Join 500+ Mumbai restaurateurs
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProUpgradePrompt;