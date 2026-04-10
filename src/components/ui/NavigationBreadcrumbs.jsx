import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = () => {
  const location = useLocation();

  const breadcrumbMap = {
    '/user-dashboard': [{ label: 'Dashboard', path: '/user-dashboard' }],
    '/new-analysis': [
      { label: 'Dashboard', path: '/user-dashboard' },
      { label: 'New Analysis', path: '/new-analysis' },
    ],
    '/analysis-results': [
      { label: 'Dashboard', path: '/user-dashboard' },
      { label: 'Analysis Results', path: '/analysis-results' },
    ],
    '/subscription-tiers': [
      { label: 'Dashboard', path: '/user-dashboard' },
      { label: 'Subscription', path: '/subscription-tiers' },
    ],
    '/payment-processing': [
      { label: 'Dashboard', path: '/user-dashboard' },
      { label: 'Subscription', path: '/subscription-tiers' },
      { label: 'Payment', path: '/payment-processing' },
    ],
  };

  const breadcrumbs = breadcrumbMap?.[location?.pathname] || [];

  if (breadcrumbs?.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol className="flex items-center gap-2">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;

          return (
            <li key={crumb?.path} className="breadcrumb-item">
              {!isLast ? (
                <>
                  <Link to={crumb?.path} className="breadcrumb-link">
                    {crumb?.label}
                  </Link>
                  <Icon
                    name="ChevronRight"
                    size={16}
                    className="breadcrumb-separator"
                  />
                </>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {crumb?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default NavigationBreadcrumbs;