import React from 'react';
import LocationSelector from './LocationSelector';
import CuisineSelector from './CuisineSelector';
import BudgetSlider from './BudgetSlider';
import AdditionalOptions from './AdditionalOptions';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AnalysisForm = ({ 
  formData, 
  errors, 
  onFieldChange, 
  onSubmit, 
  isLoading 
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
            Restaurant Analysis Parameters
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Provide details about your planned restaurant to receive AI-powered insights and predictions
          </p>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-6">
          <LocationSelector
            value={formData?.location}
            onChange={(value) => onFieldChange('location', value)}
            error={errors?.location}
          />

          <CuisineSelector
            value={formData?.cuisine}
            onChange={(value) => onFieldChange('cuisine', value)}
            error={errors?.cuisine}
          />

          <BudgetSlider
            value={formData?.budget}
            onChange={(value) => onFieldChange('budget', value)}
            error={errors?.budget}
          />

          <AdditionalOptions
            metroAccess={formData?.metroAccess}
            onMetroAccessChange={(value) => onFieldChange('metroAccess', value)}
            timeline={formData?.timeline}
            onTimelineChange={(value) => onFieldChange('timeline', value)}
          />
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <Icon name="Sparkles" size={24} className="text-primary flex-shrink-0 mt-1" />
          <div className="space-y-2 flex-1">
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              AI-Powered Analysis Ready
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Our advanced AI will analyze your parameters against Mumbai's restaurant market data, competitor landscape, and historical success patterns to provide actionable insights.
            </p>
            <ul className="space-y-1 mt-3">
              <li className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="text-success" />
                <span>Success probability scoring</span>
              </li>
              <li className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="text-success" />
                <span>12-month revenue predictions</span>
              </li>
              <li className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="text-success" />
                <span>Competitor analysis with pricing insights</span>
              </li>
              <li className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Icon name="Check" size={16} className="text-success" />
                <span>Location-specific recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="Sparkles"
        iconPosition="left"
        className="shadow-warm-md hover:shadow-warm-lg transition-smooth"
      >
        {isLoading ? 'Analyzing Your Parameters...' : 'Start AI Analysis'}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Analysis typically completes in 15-30 seconds. You'll receive comprehensive insights including market trends, competitor data, and revenue projections.
      </p>
    </form>
  );
};

export default AnalysisForm;