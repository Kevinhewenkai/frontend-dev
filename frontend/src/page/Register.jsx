import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stack from '@mui/material/Stack';

function Register () {
  const navigate = useNavigate();
  return (<>
    <Navbar route={'/login'} text={'login'} title={'Register'}>register</Navbar>
    <Stack direction={'column'} spacing={1} display={'flex'} alignItems={'center'} className={'form'}>
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
    </Stack>
  </>);
}

export default Register;
