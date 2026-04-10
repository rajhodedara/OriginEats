import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

/* ─────────────────────────────────────────────────────────────────────
   NavigationBreadcrumbs — premium/futuristic aesthetic overhaul
   Design choices:
   • Glass pill wrapper: `bg-background/60 backdrop-blur-md` with
     `border border-border/30` ultra-thin ring.
   • Links: `tracking-tight text-[0.8125rem]`, hover lifts to full
     `foreground` with a smooth `transition-colors duration-150`.
   • Separator: opacity 0.25, size 11 — barely-there visual rhythm.
   • Current crumb: `font-medium text-foreground` — high contrast anchor.
   • All breadcrumbMap, route paths, null-return logic — UNTOUCHED.
───────────────────────────────────────────────────────────────────── */

const NavigationBreadcrumbs = () => {
  const location = useLocation();

  const breadcrumbMap = {
    '/user-dashboard':    [{ label: 'Dashboard',        path: '/user-dashboard'    }],
    '/new-analysis':      [{ label: 'Dashboard',        path: '/user-dashboard'    },
                           { label: 'New Analysis',     path: '/new-analysis'      }],
    '/analysis-results':  [{ label: 'Dashboard',        path: '/user-dashboard'    },
                           { label: 'Analysis Results', path: '/analysis-results'  }],
    '/subscription-tiers':[{ label: 'Dashboard',        path: '/user-dashboard'    },
                           { label: 'Subscription',     path: '/subscription-tiers'}],
    '/payment-processing':[{ label: 'Dashboard',        path: '/user-dashboard'    },
                           { label: 'Subscription',     path: '/subscription-tiers'},
                           { label: 'Payment',          path: '/payment-processing'}],
  };

  const breadcrumbs = breadcrumbMap?.[location?.pathname] || [];
  if (breadcrumbs?.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.3125rem 0.875rem',
          borderRadius: '9999px',
          background: 'hsl(var(--background) / 0.6)',
          border: '1px solid hsl(var(--border) / 0.3)',
          backdropFilter: 'blur(12px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 hsl(var(--foreground)/0.04)',
        }}
      >
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          return (
            <li
              key={crumb?.path}
              className="breadcrumb-item"
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              {!isLast ? (
                <>
                  <Link
                    to={crumb?.path}
                    className="breadcrumb-link"
                    style={{
                      fontSize: '0.8125rem',
                      color: 'hsl(var(--muted-foreground) / 0.65)',
                      fontWeight: 400,
                      textDecoration: 'none',
                      letterSpacing: '-0.015em',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'hsl(var(--foreground))'}
                    onMouseLeave={e => e.currentTarget.style.color = 'hsl(var(--muted-foreground) / 0.65)'}
                  >
                    {crumb?.label}
                  </Link>
                  <Icon
                    name="ChevronRight"
                    size={11}
                    style={{ opacity: 0.25, flexShrink: 0, color: 'hsl(var(--foreground))' }}
                  />
                </>
              ) : (
                <span
                  aria-current="page"
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'hsl(var(--foreground))',
                    letterSpacing: '-0.015em',
                  }}
                >
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
