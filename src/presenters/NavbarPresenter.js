"use client"
import React, { useState, useEffect } from 'react';
import NavbarView from '@/views/NavbarView';

const NavbarPresenter = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const response = await fetch('/api/auth/isAdmin');
      const data = await response.json();
      setIsAdmin(data.isAdmin);
    };

    fetchAdminStatus();
  }, []);

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

  return <NavbarView onLogout={handleLogout} isAdmin={isAdmin} />;
};

export default NavbarPresenter;
