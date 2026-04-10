import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const CardPaymentForm = () => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  const formatCardNumber = (value) => {
    const cleaned = value?.replace(/\s/g, '');
    const formatted = cleaned?.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted?.substring(0, 19);
  };

  const formatExpiry = (value) => {
    const cleaned = value?.replace(/\D/g, '');
    if (cleaned?.length >= 2) {
      return `${cleaned?.substring(0, 2)}/${cleaned?.substring(2, 4)}`;
    }
    return cleaned;
  };

  const handleChange = (field, value) => {
    let formattedValue = value;

    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      formattedValue = value?.replace(/\D/g, '')?.substring(0, 3);
    }

    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const cardTypes = [
    { name: 'Visa', icon: 'CreditCard' },
    { name: 'Mastercard', icon: 'CreditCard' },
    { name: 'RuPay', icon: 'CreditCard' },
    { name: 'Amex', icon: 'CreditCard' }
  ];

  return (
    <div className="space-y-4">
      <Input
        label="Card Number"
        type="text"
        placeholder="1234 5678 9012 3456"
        value={cardDetails?.number}
        onChange={(e) => handleChange('number', e?.target?.value)}
        error={errors?.number}
        required
      />
      <Input
        label="Cardholder Name"
        type="text"
        placeholder="Name as on card"
        value={cardDetails?.name}
        onChange={(e) => handleChange('name', e?.target?.value)}
        error={errors?.name}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry Date"
          type="text"
          placeholder="MM/YY"
          value={cardDetails?.expiry}
          onChange={(e) => handleChange('expiry', e?.target?.value)}
          error={errors?.expiry}
          required
        />

        <Input
          label="CVV"
          type="text"
          placeholder="123"
          value={cardDetails?.cvv}
          onChange={(e) => handleChange('cvv', e?.target?.value)}
          error={errors?.cvv}
          required
        />
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm font-medium text-foreground mb-3">Accepted Cards</p>
        <div className="flex items-center gap-3 flex-wrap">
          {cardTypes?.map((card) => (
            <div
              key={card?.name}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border"
            >
              <Icon name={card?.icon} size={16} className="text-primary" />
              <span className="text-sm text-foreground">{card?.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-success/10 p-3 rounded-lg">
        <Icon name="Lock" size={14} className="mt-0.5 flex-shrink-0 text-success" />
        <p>Your card details are encrypted and secure. We never store your CVV.</p>
      </div>
    </div>
  );
};

export default CardPaymentForm;