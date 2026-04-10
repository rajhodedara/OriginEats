import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '/subscription-tiers' },
      { label: 'How It Works', href: '#workflow' },
      { label: 'Success Stories', href: '#testimonials' }
    ],
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Refund Policy', href: '#refund' }
    ]
  };

  const socialLinks = [
    { icon: 'Facebook', href: '#facebook', label: 'Facebook' },
    { icon: 'Twitter', href: '#twitter', label: 'Twitter' },
    { icon: 'Instagram', href: '#instagram', label: 'Instagram' },
    { icon: 'Linkedin', href: '#linkedin', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/homepage" className="inline-flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="ChefHat" size={24} color="#FFFFFF" />
              </div>
              <span className="text-xl font-bold text-foreground">CodeShinobi</span>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-sm">
              Mumbai's first AI-powered restaurant analytics platform. Make data-driven decisions for your food service business with hyper-local insights.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.icon}
                  href={social?.href}
                  aria-label={social?.label}
                  className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg hover:bg-primary hover:text-white transition-colors duration-250"
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <a
                    href={link?.href}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} CodeShinobi. All rights reserved. Made with ❤️ for Mumbai's food entrepreneurs.
            </p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250">
                Privacy
              </a>
              <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250">
                Terms
              </a>
              <a href="#cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-250">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;