import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Register () {
  const navigate = useNavigate();
  // eslint-disable-next-line react/react-in-jsx-scope
  return (<>
    <h1>Register</h1>
    <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button>
    <br/>
    <br/>
    <RegisterForm submit={async (email, password, name) => {
      const response = await fetch('http://localhost:5005/admin/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        })
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/quiz/new');
    }}/>
  </>);
}

export default Register;
