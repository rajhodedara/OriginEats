import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InteractiveSimulation = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [showScore, setShowScore] = useState(false);

  const locationOptions = [
    { value: 'bandra-west', label: 'Bandra West' },
    { value: 'juhu', label: 'Juhu' },
    { value: 'colaba', label: 'Colaba' },
    { value: 'dadar', label: 'Dadar' },
    { value: 'powai', label: 'Powai' },
    { value: 'lower-parel', label: 'Lower Parel' }
  ];

  const cuisineOptions = [
    { value: 'north-indian', label: 'North Indian' },
    { value: 'fast-food', label: 'Fast Food' },
    { value: 'cafe', label: 'Cafe' },
    { value: 'maharashtrian', label: 'Maharashtrian' },
    { value: 'south-indian', label: 'South Indian' },
    { value: 'chinese', label: 'Chinese' }
  ];

  const calculateScore = () => {
    if (location && cuisine) {
      setShowScore(true);
    }
  };

  const getScoreData = () => {
    const scores = {
      'bandra-west': { 'north-indian': 85, 'fast-food': 78, 'cafe': 92, 'maharashtrian': 72, 'south-indian': 80, 'chinese': 75 },
      'juhu': { 'north-indian': 88, 'fast-food': 82, 'cafe': 90, 'maharashtrian': 70, 'south-indian': 85, 'chinese': 78 },
      'colaba': { 'north-indian': 82, 'fast-food': 75, 'cafe': 95, 'maharashtrian': 68, 'south-indian': 77, 'chinese': 80 },
      'dadar': { 'north-indian': 90, 'fast-food': 85, 'cafe': 75, 'maharashtrian': 95, 'south-indian': 88, 'chinese': 82 },
      'powai': { 'north-indian': 87, 'fast-food': 90, 'cafe': 85, 'maharashtrian': 65, 'south-indian': 83, 'chinese': 88 },
      'lower-parel': { 'north-indian': 84, 'fast-food': 80, 'cafe': 88, 'maharashtrian': 70, 'south-indian': 79, 'chinese': 85 }
    };

    return scores?.[location]?.[cuisine] || 0;
  };

  const score = getScoreData();

  const handleFullAnalysis = () => {
    navigate('/new-analysis');
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Try Our AI-Powered Location Scorer
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Get instant potential score for your restaurant concept in Mumbai
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8 lg:p-10 shadow-warm-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Select
              label="Select Mumbai Location"
              placeholder="Choose area"
              options={locationOptions}
              value={location}
              onChange={setLocation}
              searchable
            />

            <Select
              label="Select Cuisine Type"
              placeholder="Choose cuisine"
              options={cuisineOptions}
              value={cuisine}
              onChange={setCuisine}
              searchable
            />
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={calculateScore}
            disabled={!location || !cuisine}
            iconName="Sparkles"
            iconPosition="left"
            fullWidth
            className="mb-8"
          >
            Calculate Potential Score
          </Button>

          {showScore && (
            <div className="bg-secondary/50 border border-border rounded-xl p-6 md:p-8 animate-in fade-in duration-500">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-white">{score}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {score >= 85 ? 'Excellent Potential' : score >= 75 ? 'Good Potential' : 'Moderate Potential'}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Based on location demand, competition, and market trends
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-background rounded-lg p-4 text-center">
                  <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Demand</div>
                  <div className="text-lg font-semibold text-foreground">High</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <Icon name="TrendingUp" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Competition</div>
                  <div className="text-lg font-semibold text-foreground">Medium</div>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <Icon name="DollarSign" size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Est. Revenue</div>
                  <div className="text-lg font-semibold text-foreground">₹45L/yr</div>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={handleFullAnalysis}
                iconName="ArrowRight"
                iconPosition="right"
                fullWidth
              >
                Get Full Detailed Analysis
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveSimulation;