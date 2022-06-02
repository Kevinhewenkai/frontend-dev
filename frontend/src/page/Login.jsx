import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stack from '@mui/material/Stack';

function Login () {
  const navigate = useNavigate();
  return (
    <>
      <Navbar route={'/register'} text={'register'} title={'Login'}>register</Navbar>
      <Stack direction={'column'} spacing={1} display={'flex'} alignItems={'center'} className={'form'}>
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
          navigate('/dashboard');
        }}/></Stack>
    </>
  );
}

export default Login;
