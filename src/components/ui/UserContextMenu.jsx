import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

import { supabase } from '../../lib/supabase';

const UserContextMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [userData, setUserData] = useState({
    name: 'User',
    email: '',
    role: 'Premium Member',
    initials: 'U',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const firstName = user.user_metadata?.first_name || '';
        const lastName = user.user_metadata?.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim() || 'User';
        const initials = (firstName?.[0] || '') + (lastName?.[0] || '') || 'U';

        setUserData({
          name: fullName,
          email: user.email,
          role: 'Premium Member', // Keep as default for now
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
      action: () => {
        navigate('/user-dashboard');
        setIsOpen(false);
      },
    },
    {
      label: 'Subscription',
      icon: 'CreditCard',
      action: () => {
        navigate('/subscription-tiers');
        setIsOpen(false);
      },
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => {
        setIsOpen(false);
      },
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
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="user-context-menu" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-context-trigger"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="user-avatar">{user?.initials}</div>
        <div className="user-info hidden md:flex">
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
        </div>
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          className="hidden md:block"
        />
      </button>
      {isOpen && (
        <div className="user-context-dropdown">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>

          <div className="py-2">
            {menuItems?.map((item, index) => (
              <button
                key={index}
                onClick={item?.action}
                className="user-context-menu-item w-full"
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </div>

          <div className="user-context-divider" />

          <div className="py-2">
            <button
              onClick={handleLogout}
              className="user-context-menu-item w-full text-destructive"
            >
              <Icon name="LogOut" size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;
