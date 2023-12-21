import React from 'react';
import SignupView from '../views/SignupView';

const SignupPresenter = () => {

  const handleSignup = async (username, password) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Successfully created account");
      } else {
        alert('signup failed');
      }
    } catch (error) {
      alert('signup error:', error);
    }
  };

  return <SignupView onSignup={handleSignup} />;
};

export default SignupPresenter;

