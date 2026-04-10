import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentConfirmation = ({ isProcessing, onConfirm }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
          <Icon name="AlertCircle" size={24} className="text-warning" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Important Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>Your subscription will be activated immediately after payment confirmation</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>You will receive an invoice via email within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>Auto-renewal can be managed from your account settings</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Dot" size={16} className="mt-1 flex-shrink-0" />
              <span>Refunds are processed within 5-7 business days as per our policy</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
            required
          />
          <label htmlFor="terms" className="text-sm text-foreground">
            I agree to the{' '}
            <button className="text-primary hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button className="text-primary hover:underline">Privacy Policy</button>
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="auto-renewal"
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
            defaultChecked
          />
          <label htmlFor="auto-renewal" className="text-sm text-foreground">
            Enable auto-renewal for uninterrupted service (can be disabled anytime)
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/subscription-tiers')}
          disabled={isProcessing}
          className="flex-1"
        >
          Back to Plans
        </Button>
        <Button
          variant="default"
          onClick={onConfirm}
          loading={isProcessing}
          iconName="Lock"
          iconPosition="left"
          className="flex-1"
        >
          {isProcessing ? 'Processing Payment...' : 'Complete Secure Payment'}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
        <Icon name="Shield" size={14} />
        <span>Protected by 256-bit SSL encryption</span>
      </div>
    </div>
  );
};

export default PaymentConfirmation;