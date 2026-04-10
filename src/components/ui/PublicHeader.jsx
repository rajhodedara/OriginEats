import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/subscription-tiers' },
    { label: 'About', href: '#testimonials' },
  ];

  // FIX: Redirects to login page instead of skipping to dashboard
  const handleSignIn = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/coupons'); // Usually, "Get Started" also leads to signup/login
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="public-header">
      <div className="public-header-container">
        <Link to="/" className="public-header-logo">
          <div className="public-header-logo-icon">
            <Icon name="ChefHat" size={24} color="#FFFFFF" />
          </div>
          <span className="public-header-logo-text">OriginEats</span>
        </Link>

        <nav className="public-header-nav">
          {navigationItems.map((item) => (
            item.href.startsWith('#') ? (
              <a key={item.label} href={item.href} className="public-header-nav-item">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="public-header-nav-item">
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="public-header-actions">
          <Button variant="ghost" onClick={handleSignIn} className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button variant="default" onClick={handleGetStarted}>
            Deal Box
          </Button>

          <button onClick={toggleMobileMenu} className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg">
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="flex flex-col p-4 gap-2">
            {navigationItems.map((item) => (
              <Link key={item.label} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3">
                {item.label}
              </Link>
            ))}
            <button onClick={() => { handleSignIn(); setIsMobileMenuOpen(false); }} className="px-4 py-3 text-left">
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;