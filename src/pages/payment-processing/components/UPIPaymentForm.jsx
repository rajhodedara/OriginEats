import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const UPIPaymentForm = () => {
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');

  const validateUPI = (value) => {
    const upiPattern = /^[\w.-]+@[\w.-]+$/;
    if (!value) {
      setError('UPI ID is required');
      return false;
    }
    if (!upiPattern?.test(value)) {
      setError('Please enter a valid UPI ID (e.g., username@paytm)');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    const value = e?.target?.value;
    setUpiId(value);
    if (value) {
      validateUPI(value);
    } else {
      setError('');
    }
  };

  const popularUPIApps = [
    { name: 'Google Pay', icon: 'Smartphone', suffix: '@okaxis' },
    { name: 'PhonePe', icon: 'Smartphone', suffix: '@ybl' },
    { name: 'Paytm', icon: 'Wallet', suffix: '@paytm' },
    { name: 'BHIM', icon: 'CreditCard', suffix: '@upi' }
  ];

  return (
    <div className="space-y-4">
      <Input
        label="UPI ID"
        type="text"
        placeholder="username@paytm"
        value={upiId}
        onChange={handleChange}
        error={error}
        required
        description="Enter your UPI ID to complete payment"
      />
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm font-medium text-foreground mb-3">Popular UPI Apps</p>
        <div className="grid grid-cols-2 gap-2">
          {popularUPIApps?.map((app) => (
            <button
              key={app?.name}
              type="button"
              onClick={() => setUpiId(`${app?.suffix}`)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-250 text-left"
            >
              <Icon name={app?.icon} size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{app?.name}</p>
                <p className="text-xs text-muted-foreground">{app?.suffix}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-accent/10 p-3 rounded-lg">
        <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0 text-accent" />
        <p>You will receive a payment request on your UPI app. Please approve it to complete the transaction.</p>
      </div>
    </div>
  );
};

export default UPIPaymentForm;