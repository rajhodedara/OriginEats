import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SubscriptionFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How does the billing cycle work?',
      answer: 'You can choose between monthly or yearly billing. Monthly subscriptions are charged on the same date each month. Yearly subscriptions are charged annually and offer a 20% discount compared to monthly billing. All prices are in Indian Rupees (INR).'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your Pro subscription at any time from your profile settings. Your access to Pro features will continue until the end of your current billing period. No refunds are provided for partial months or years.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major Indian payment methods including UPI (Google Pay, PhonePe, Paytm), credit cards (Visa, Mastercard, RuPay), debit cards, and net banking. All payments are processed securely through Razorpay.'
    },
    {
      question: 'How accurate is the Mumbai market data?',
      answer: 'Our AI analyzes real-time data from Mumbai\'s restaurant ecosystem including Zomato, Swiggy, and local business registries. We update our database weekly with new competitor information, pricing trends, and market dynamics specific to Mumbai neighborhoods.'
    },
    {
      question: 'Can I upgrade from Free to Pro mid-month?',
      answer: 'Yes, you can upgrade anytime. When upgrading mid-cycle, you\'ll be charged a prorated amount for the remaining days of the month. Your billing date will then reset to the upgrade date for future charges.'
    },
    {
      question: 'What happens to my analysis history if I downgrade?',
      answer: 'Your previous analysis reports remain accessible even after downgrading to Free. However, you won\'t be able to generate new Pro-level analyses or access advanced features like competitor radar and PDF exports until you upgrade again.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 7-day money-back guarantee for first-time Pro subscribers. If you\'re not satisfied within the first week, contact our support team for a full refund. Refunds are not available after the 7-day period.'
    },
    {
      question: 'Is there a limit on team members for Pro plan?',
      answer: 'The standard Pro plan includes sharing with up to 5 team members. If you need more seats or enterprise features like dedicated account management, please contact our sales team for custom pricing.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8 text-center">
        Subscription FAQs
      </h3>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left bg-background hover:bg-muted transition-colors duration-250"
              aria-expanded={openIndex === index}
            >
              <span className="text-sm md:text-base font-medium text-foreground pr-4">
                {faq?.question}
              </span>
              <Icon 
                name={openIndex === index ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                className="flex-shrink-0 text-muted-foreground"
              />
            </button>
            
            {openIndex === index && (
              <div className="p-4 md:p-5 pt-0 bg-background">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {faq?.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionFAQ;