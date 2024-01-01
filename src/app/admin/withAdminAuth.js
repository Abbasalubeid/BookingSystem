import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAdminStatus = async () => {
        try {
          setIsLoading(true);
          const response = await fetch('/api/auth/isAdmin');
          if (!response.ok) {
            throw new Error('Not admin user!');
          }
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      };

        checkAdminStatus();
    }, []);

    useEffect(() => {
      if (!isLoading && !isAdmin) {
        throw redirect('/login');
      }
    }, [isLoading, isAdmin]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAdmin) {
      return null; // Render nothing until the redirect is processed
    }

    return <WrappedComponent isAdmin={isAdmin} {...props} />;
  };
};

export default withAdminAuth;
