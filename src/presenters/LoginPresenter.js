import React from 'react';
import LoginForm from '../components/LoginForm';
import { User } from '../models/User';


const LoginPresenter = () => {

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {

        const userData = await response.json();
        const user = new User(userData.id, userData.username, userData.admin);
        console.log(user.greet());
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
};

export default LoginPresenter;
