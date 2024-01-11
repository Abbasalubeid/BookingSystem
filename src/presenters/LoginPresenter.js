import React, { useState } from "react";
import LoginView from '../views/LoginView';
import  User  from '../models/User';


const LoginPresenter = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      setIsLoading(true);
      setLoginError('');
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
        setIsAdmin(user.admin > 0); 
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } catch (error) {
      setLoginError(`Login error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginView onLogin={handleLogin} isLoginSuccess={isLoginSuccess} isAdmin={isAdmin} isLoading={isLoading} loginError={loginError} />;
};

export default LoginPresenter;
