import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, actionText, route, variant = 'default' }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 hover:shadow-warm-md transition-smooth">
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg ${
          variant === 'primary' ?'bg-primary text-primary-foreground' :'bg-accent text-accent-foreground'
        }`}>
          <Icon name={icon} size={24} className="md:w-7 md:h-7" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Button 
        variant={variant === 'primary' ? 'default' : 'outline'} 
        fullWidth 
        onClick={handleAction}
        iconName="ArrowRight"
        iconPosition="right"
      >
        {actionText}
      </Button>
    </div>
  );
};

export default QuickActionCard;