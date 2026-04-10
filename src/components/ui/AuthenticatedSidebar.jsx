import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticatedSidebar = ({ isCollapsed = false }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'New Analysis',
      path: '/new-analysis',
      icon: 'PlusCircle',
    },
    {
      label: 'Analysis Results',
      path: '/analysis-results',
      icon: 'BarChart3',
    },
    {
      label: 'Subscription',
      path: '/subscription-tiers',
      icon: 'CreditCard',
    },
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="mobile-menu-button"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>
      <aside
        className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''} ${
          isMobileOpen ? 'open' : ''
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Icon name="ChefHat" size={24} color="#FFFFFF" />
          </div>
          <span className="sidebar-logo-text">OriginEats</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`sidebar-nav-item ${
                isActive(item?.path) ? 'active' : ''
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Icon name={item?.icon} size={20} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background z-[90] lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AuthenticatedSidebar;