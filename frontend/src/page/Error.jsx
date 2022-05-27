import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login () {
  const navigate = useNavigate();
  // eslint-disable-next-line react/react-in-jsx-scope
  return (<>
    <h1>Login</h1>
    <LoginForm submit={async (email, password) => {
      const response = await fetch('http://localhost:5005/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        })
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/quiz/new');
    }}/>
  </>);
}

export default Login;
