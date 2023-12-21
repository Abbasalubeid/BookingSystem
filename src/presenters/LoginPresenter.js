import React from 'react';
import LoginView from '../views/LoginView';
import { User } from '../models/User';


const LoginPresenter = () => {

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { user: userData } = await response.json();
        // Create a User instance with the returned data
        const user = new User(userData.id, userData.username, userData.admin);
        console.log(user.greet());
      } else {
        // TODO: Show login Failed in UI
        console.error('Login failed');
      }
    } catch (error) {
      // TODO: Show login Failed in UI
      console.error('Login error:', error);
    }
  };

  return <LoginView onLogin={handleLogin} />;
};

export default LoginPresenter;
