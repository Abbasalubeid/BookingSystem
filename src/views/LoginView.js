import React from 'react';
import Form from '../components/Form';

const LoginView = ({ onLogin }) => {
  const loginFields = [
    { name: 'username', type: 'text', placeholder: 'Username' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  const handleFormSubmit = (formData) => {
    const { username, password } = formData;
    onLogin(username, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <Form fields={loginFields} onSubmit={handleFormSubmit} submitLabel="Log In" />
    </div>
  );
};

export default LoginView;
