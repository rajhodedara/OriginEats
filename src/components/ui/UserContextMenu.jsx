import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { supabase } from '../../lib/supabase';

/* ─────────────────────────────────────────────────────────────────────
   UserContextMenu — premium/futuristic aesthetic overhaul
   Design choices:
   • Avatar: dynamic glow ring — `box-shadow` layers intensify on open.
     Subtle gradient bg on avatar face.
   • Trigger: glass bg on hover/open, ultra-thin `border-border/40`.
   • Dropdown: `backdrop-blur-2xl bg-background/94` deep glass panel,
     `rounded-2xl`, layered diffused shadows.
   • Entrance: `@keyframes contextMenuIn` scale+fade.
   • Menu items: `rounded-xl`, icon nudges `translateX(2px)` on hover,
     destructive item gets faint red ambient on hover.
   • Identity header: editorial layout with tight tracking.
   • All Supabase calls, navigation, fetchUser, click-outside,
     Escape, menuItems — UNTOUCHED.
───────────────────────────────────────────────────────────────────── */

const UserContextMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [userData, setUserData] = useState({
    name: 'User', email: '',
    role: 'Premium Member', initials: 'U',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const firstName = user.user_metadata?.first_name || '';
        const lastName  = user.user_metadata?.last_name  || '';
        const fullName  = `${firstName} ${lastName}`.trim() || 'User';
        const initials  = (firstName?.[0] || '') + (lastName?.[0] || '') || 'U';
        setUserData({
          name:     fullName,
          email:    user.email,
          role:     'Premium Member',
          initials: initials.toUpperCase(),
        });
      }
    };
    fetchUser();
  }, []);

  const user = userData;

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      action: () => { navigate('/user-dashboard');     setIsOpen(false); },
    },
    {
      label: 'Subscription',
      icon: 'CreditCard',
      action: () => { navigate('/subscription-tiers'); setIsOpen(false); },
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => { setIsOpen(false); },
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/homepage');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event?.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown',   handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown',   handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @keyframes contextMenuIn {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .context-menu-panel {
          animation: contextMenuIn 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div className="user-context-menu" ref={menuRef} style={{ position: 'relative' }}>

        {/* ── Trigger ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="user-context-trigger"
          aria-expanded={isOpen}
          aria-haspopup="true"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.3125rem 0.5625rem',
            borderRadius: '0.875rem',
            background: isOpen ? 'hsl(var(--accent) / 0.45)' : 'transparent',
            border: '1px solid',
            borderColor: isOpen ? 'hsl(var(--border) / 0.5)' : 'transparent',
            transition: 'background 0.18s ease, border-color 0.18s ease',
          }}
          onMouseEnter={e => {
            if (!isOpen) {
              e.currentTarget.style.background = 'hsl(var(--accent) / 0.35)';
              e.currentTarget.style.borderColor = 'hsl(var(--border) / 0.4)';
            }
          }}
          onMouseLeave={e => {
            if (!isOpen) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }
          }}
        >
          {/* Avatar */}
          <div
            className="user-avatar"
            style={{
              fontWeight: 600,
              letterSpacing: '-0.01em',
              fontSize: '0.8125rem',
              transition: 'box-shadow 0.25s ease',
              boxShadow: isOpen
                ? '0 0 0 2px hsl(var(--background)), 0 0 0 3.5px hsl(var(--primary) / 0.65), 0 0 18px hsl(var(--primary) / 0.3)'
                : '0 0 0 2px hsl(var(--background)), 0 0 0 2px hsl(var(--primary) / 0.28), 0 0 10px hsl(var(--primary) / 0.12)',
            }}
          >
            {user?.initials}
          </div>

          {/* Name / role */}
          <div
            className="user-info hidden md:flex"
            style={{ flexDirection: 'column', gap: '0.1rem', alignItems: 'flex-start' }}
          >
            <span
              className="user-name"
              style={{ fontWeight: 500, letterSpacing: '-0.015em', fontSize: '0.875rem', lineHeight: 1.2 }}
            >
              {user?.name}
            </span>
            <span
              className="user-role"
              style={{
                fontSize: '0.7rem',
                color: 'hsl(var(--muted-foreground))',
                opacity: 0.5,
                letterSpacing: '0.02em',
                lineHeight: 1.2,
              }}
            >
              {user?.role}
            </span>
          </div>

          <Icon
            name={isOpen ? 'ChevronUp' : 'ChevronDown'}
            size={13}
            className="hidden md:block"
            style={{
              opacity: 0.4,
              transition: 'opacity 0.15s ease',
              color: 'hsl(var(--foreground))',
            }}
          />
        </button>

        {/* ── Dropdown panel ── */}
        {isOpen && (
          <div
            className="user-context-dropdown context-menu-panel"
            style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 10px)',
              minWidth: '228px',
              borderRadius: '1.125rem',
              border: '1px solid hsl(var(--border) / 0.4)',
              background: 'hsl(var(--background) / 0.94)',
              backdropFilter: 'blur(28px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.6)',
              boxShadow: [
                '0 0 0 1px hsl(var(--foreground)/0.04) inset',
                '0 4px 6px -1px rgba(0,0,0,0.07)',
                '0 16px 48px -8px rgba(0,0,0,0.2)',
              ].join(', '),
              overflow: 'hidden',
              zIndex: 100,
            }}
          >
            {/* Identity header */}
            <div
              style={{
                padding: '0.9375rem 1rem 0.875rem',
                borderBottom: '1px solid hsl(var(--border) / 0.28)',
              }}
            >
              <p style={{
                fontSize: '0.875rem', fontWeight: 600,
                color: 'hsl(var(--foreground))',
                letterSpacing: '-0.02em', marginBottom: '0.2rem', lineHeight: 1.3,
              }}>
                {user?.name}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: 'hsl(var(--muted-foreground))',
                opacity: 0.6, letterSpacing: '-0.01em',
              }}>
                {user?.email}
              </p>
            </div>

            {/* Regular items */}
            <div style={{ padding: '0.4375rem' }}>
              {menuItems?.map((item, index) => (
                <button
                  key={index}
                  onClick={item?.action}
                  className="user-context-menu-item w-full"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6875rem',
                    width: '100%',
                    padding: '0.5625rem 0.75rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem', fontWeight: 450,
                    color: 'hsl(var(--foreground) / 0.75)',
                    background: 'transparent', border: 'none', textAlign: 'left',
                    letterSpacing: '-0.015em',
                    transition: 'background 0.12s ease, color 0.12s ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'hsl(var(--accent) / 0.55)';
                    e.currentTarget.style.color = 'hsl(var(--foreground))';
                    const icon = e.currentTarget.querySelector('.item-icon');
                    if (icon) icon.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'hsl(var(--foreground) / 0.75)';
                    const icon = e.currentTarget.querySelector('.item-icon');
                    if (icon) icon.style.transform = 'translateX(0)';
                  }}
                >
                  <span
                    className="item-icon"
                    style={{
                      display: 'flex', flexShrink: 0,
                      opacity: 0.55,
                      transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    <Icon name={item?.icon} size={15} />
                  </span>
                  <span>{item?.label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid hsl(var(--border) / 0.25)', margin: '0 0.4375rem' }} />

            {/* Sign Out */}
            <div style={{ padding: '0.4375rem' }}>
              <button
                onClick={handleLogout}
                className="user-context-menu-item w-full"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6875rem',
                  width: '100%',
                  padding: '0.5625rem 0.75rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem', fontWeight: 450,
                  color: 'hsl(var(--destructive))',
                  background: 'transparent', border: 'none', textAlign: 'left',
                  letterSpacing: '-0.015em',
                  transition: 'background 0.12s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'hsl(var(--destructive) / 0.08)';
                  const icon = e.currentTarget.querySelector('.item-icon');
                  if (icon) icon.style.transform = 'translateX(2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  const icon = e.currentTarget.querySelector('.item-icon');
                  if (icon) icon.style.transform = 'translateX(0)';
                }}
              >
                <span
                  className="item-icon"
                  style={{
                    display: 'flex', flexShrink: 0, opacity: 0.7,
                    transition: 'transform 0.18s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <Icon name="LogOut" size={15} />
                </span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserContextMenu;
