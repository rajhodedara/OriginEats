import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: '256-bit SSL',
      description: 'Bank-grade encryption'
    },
    {
      icon: 'Lock',
      title: 'PCI DSS',
      description: 'Compliant payment processing'
    },
    {
      icon: 'CheckCircle2',
      title: 'RBI Approved',
      description: 'Reserve Bank of India certified'
    },
    {
      icon: 'Smartphone',
      title: 'Secure UPI',
      description: 'NPCI verified payments'
    }
  ];

  const paymentPartners = [
    { name: 'Razorpay', icon: 'CreditCard' },
    { name: 'Cashfree', icon: 'Wallet' },
    { name: 'UPI', icon: 'Smartphone' },
    { name: 'Visa', icon: 'CreditCard' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="ShieldCheck" size={24} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">Secure Payment</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={18} className="text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{feature?.title}</p>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-muted/50 rounded-xl p-6">
        <p className="text-sm font-medium text-foreground mb-4">Trusted Payment Partners</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {paymentPartners?.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border"
            >
              <Icon name={partner?.icon} size={16} className="text-primary" />
              <span className="text-sm text-foreground">{partner?.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-start gap-3 text-sm text-muted-foreground bg-accent/10 p-4 rounded-lg">
        <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0 text-accent" />
        <p>Your payment information is processed securely. We do not store credit card details nor do we share customer details with any third parties.</p>
      </div>
    </div>
  );
};

export default TrustBadges;