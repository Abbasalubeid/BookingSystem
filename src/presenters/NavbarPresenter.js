"use client"
import React from 'react';
import NavbarView from '@/views/NavbarView';

const NavbarPresenter = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.error);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <NavbarView onLogout={handleLogout} />;
};

export default NavbarPresenter;
