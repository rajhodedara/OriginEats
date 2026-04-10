import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedSidebar from '../../components/ui/AuthenticatedSidebar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import UserContextMenu from '../../components/ui/UserContextMenu';
import Icon from '../../components/AppIcon';
import OrderSummary from './components/OrderSummary';
import PaymentMethodCard from './components/PaymentMethodCard';
import UPIPaymentForm from './components/UPIPaymentForm';
import CardPaymentForm from './components/CardPaymentForm';
import BillingInformationForm from './components/BillingInformationForm';
import TrustBadges from './components/TrustBadges';
import PaymentConfirmation from './components/PaymentConfirmation';
// Razorpay script is loaded in index.html

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState('yearly');

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay Secure',
      description: 'Pay using UPI, Cards, NetBanking, or Wallets',
      icon: 'ShieldCheck'
    },
    {
      id: 'upi',
      name: 'Direct UPI',
      description: 'Pay using Google Pay, PhonePe, Paytm',
      icon: 'Smartphone'
    },
    {
      id: 'card',
      name: 'Direct Credit/Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: 'CreditCard'
    }
  ];

  const planDetails = {
    monthly: { price: 999 },
    yearly: { price: 9990 }
  };
  const plan = planDetails?.[billingCycle];
  const gst = Math.round(plan?.price * 0.18);
  const totalAmount = plan?.price + gst;

  const handleRazorpayPayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'CodeShinobi',
      description: `${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)} Subscription`,
      image: '/logo.png',
      handler: function (response) {
        console.log('Razorpay Response:', response);
        setIsProcessing(false);
        navigate('/user-dashboard');
      },
      prefill: {
        name: 'User',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3B82F6',
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePaymentConfirmation = () => {
    setIsProcessing(true);

    if (selectedPaymentMethod === 'razorpay') {
      handleRazorpayPayment();
      return;
    }
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/user-dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedSidebar />
      <div className="lg:ml-[280px] min-h-screen">
        <header className="sticky top-0 z-40 bg-card border-b border-border shadow-warm-sm">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Complete Your Payment</h1>
              <NavigationBreadcrumbs />
            </div>
            <UserContextMenu />
          </div>
        </header>

        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="CreditCard" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">Secure Checkout</h2>
                  <p className="text-sm text-muted-foreground">Complete your subscription upgrade to CodeShinobi Pro</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-3 rounded-lg">
                <Icon name="Sparkles" size={18} />
                <p className="text-sm font-medium">Limited time offer: Get 2 months free with yearly subscription!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-warm">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name="Wallet" size={24} className="text-primary" />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">Select Payment Method</h3>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods?.map((method) => (
                      <PaymentMethodCard
                        key={method?.id}
                        method={method}
                        isSelected={selectedPaymentMethod === method?.id}
                        onSelect={setSelectedPaymentMethod}
                      >
                        {method?.id === 'razorpay' && (
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="flex items-center gap-3 mb-2 text-primary">
                              <Icon name="ShieldCheck" size={20} />
                              <span className="font-semibold">Razorpay Secure Checkout</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Pay securely using UPI, Cards, NetBanking, Wallets, and EMI options.
                              You will be redirected to Razorpay's secure interface.
                            </p>
                          </div>
                        )}
                        {method?.id === 'upi' && <UPIPaymentForm />}
                        {method?.id === 'card' && <CardPaymentForm />}
                      </PaymentMethodCard>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-warm">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">Billing Information</h3>
                  </div>

                  <BillingInformationForm />
                </div>

                <TrustBadges />

                <PaymentConfirmation
                  isProcessing={isProcessing}
                  onConfirm={handlePaymentConfirmation}
                />
              </div>

              <div className="lg:col-span-1">
                <OrderSummary
                  selectedPlan="pro"
                  billingCycle={billingCycle}
                />
              </div>
            </div>

            <div className="mt-8 bg-muted/50 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Icon name="HelpCircle" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 to assist you with any payment-related queries.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-250">
                      <Icon name="Mail" size={18} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">support@codeshinobi.com</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-250">
                      <Icon name="Phone" size={18} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">+91 98765 43210</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-border bg-card mt-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} CodeShinobi. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250">
                  Privacy Policy
                </button>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250">
                  Terms of Service
                </button>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250">
                  Refund Policy
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PaymentProcessing;