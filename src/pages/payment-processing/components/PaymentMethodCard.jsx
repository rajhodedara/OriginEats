import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentMethodCard = ({ method, isSelected, onSelect, children }) => {
  return (
    <div
      onClick={() => onSelect(method?.id)}
      className={`border-2 rounded-xl p-4 md:p-6 cursor-pointer transition-all duration-250 ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-warm'
          : 'border-border bg-card hover:border-primary/50 hover:shadow-warm-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
          isSelected ? 'border-primary' : 'border-border'
        }`}>
          {isSelected && (
            <div className="w-3 h-3 rounded-full bg-primary" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
            }`}>
              <Icon name={method?.icon} size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{method?.name}</h3>
              <p className="text-sm text-muted-foreground">{method?.description}</p>
            </div>
          </div>

          {isSelected && children && (
            <div className="mt-4 pt-4 border-t border-border">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;