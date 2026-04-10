import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

/* ─────────────────────────────────────────────────────────────────────
   AuthenticatedSidebar — premium/futuristic aesthetic overhaul
   Design choices:
   • Panel: `backdrop-blur-xl bg-background/75` deep glass base with a
     near-invisible `border-r border-border/25` divider.
   • Logo container: primary glow ring, `hover:scale-105` lift.
   • Nav items: `rounded-xl` with smooth `transition-all duration-200`.
   • Active item: 3px inset left accent bar (box-shadow trick), primary
     text + `bg-primary/7` ambient fill.
   • Hover: `bg-accent/40` with full opacity text.
   • Stagger entrance: items slide in from left on mount with
     `animation-delay` per index.
   • Mobile overlay: blur backdrop.
   • All items, paths, routing, mobile logic — UNTOUCHED.
───────────────────────────────────────────────────────────────────── */

const AuthenticatedSidebar = ({ isCollapsed = false }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const navigationItems = [
    { label: 'Dashboard',        path: '/user-dashboard',     icon: 'LayoutDashboard' },
    { label: 'New Analysis',     path: '/new-analysis',       icon: 'PlusCircle'      },
    { label: 'Analysis Results', path: '/analysis-results',   icon: 'BarChart3'       },
    { label: 'Subscription',     path: '/subscription-tiers', icon: 'CreditCard'      },
  ];

  const isActive = (path) => location?.pathname === path;
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      <style>{`
        @keyframes sidebarItemIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .sidebar-nav-item-animated {
          opacity: 0;
          animation: sidebarItemIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* ── Mobile toggle ── */}
      <button
        onClick={toggleMobileMenu}
        className="mobile-menu-button"
        style={{ transition: 'transform 0.15s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>

      {/* ── Sidebar panel ── */}
      <aside
        className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''} ${isMobileOpen ? 'open' : ''}`}
        style={{
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          background: 'hsl(var(--background) / 0.75)',
          borderRight: '1px solid hsl(var(--border) / 0.25)',
          boxShadow: '1px 0 0 0 hsl(var(--foreground)/0.03)',
        }}
      >
        {/* ── Logo / Brand ── */}
        <div className="sidebar-header">
          <div
            className="sidebar-logo"
            style={{
              transition: 'transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease',
              boxShadow: '0 0 0 1.5px hsl(var(--primary) / 0.3), 0 0 16px hsl(var(--primary) / 0.18)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.06)';
              e.currentTarget.style.boxShadow = '0 0 0 1.5px hsl(var(--primary) / 0.5), 0 0 24px hsl(var(--primary) / 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 0 1.5px hsl(var(--primary) / 0.3), 0 0 16px hsl(var(--primary) / 0.18)';
            }}
          >
            <Icon name="ChefHat" size={24} color="#FFFFFF" />
          </div>
          <span
            className="sidebar-logo-text"
            style={{ letterSpacing: '-0.025em', fontWeight: 600 }}
          >
            OriginEats
          </span>
        </div>

        {/* ── Navigation ── */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigationItems?.map((item, i) => {
            const active = isActive(item?.path);
            return (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileOpen(false)}
                className={`sidebar-nav-item ${active ? 'active' : ''} ${mounted ? 'sidebar-nav-item-animated' : ''}`}
                style={{
                  borderRadius: '0.75rem',
                  position: 'relative',
                  transition: 'background 0.18s ease, color 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease',
                  animationDelay: mounted ? `${i * 60}ms` : '0ms',
                  ...(active
                    ? {
                        color: 'hsl(var(--primary))',
                        background: 'hsl(var(--primary) / 0.07)',
                        boxShadow: 'inset 3px 0 0 hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.06)',
                        fontWeight: 500,
                      }
                    : {
                        color: 'hsl(var(--foreground) / 0.55)',
                        fontWeight: 400,
                      }),
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'hsl(var(--foreground))';
                    e.currentTarget.style.background = 'hsl(var(--accent) / 0.4)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = 'hsl(var(--foreground) / 0.55)';
                    e.currentTarget.style.background = '';
                  }
                }}
              >
                <Icon name={item?.icon} size={18} />
                <span style={{ letterSpacing: '-0.01em' }}>{item?.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── Mobile backdrop overlay ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[90] lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
          style={{
            background: 'hsl(var(--background) / 0.6)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        />
      )}
    </>
  );
};

export default AuthenticatedSidebar;
