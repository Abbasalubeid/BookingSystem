import React, { useState } from "react";
import LoginView from '../views/LoginView';
import  User  from '../models/User';


const LoginPresenter = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

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
        const userData = await response.json();
        const user = new User(userData.user);
        console.log(user.greet());
        setIsLoginSuccess(true);
      } else {
        // TODO: Show login Failed in UI
        console.error('Login failed');
      }
    } catch (error) {
      // TODO: Show login Failed in UI
      console.error('Login error:', error);
    }
  };

  return <LoginView onLogin={handleLogin} isLoginSuccess={isLoginSuccess} />;
};

export default LoginPresenter;
