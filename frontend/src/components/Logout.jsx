import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import apiCall from '../util/ApiCall';

function Logout () {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="outlined" onClick={() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
        }
        const headers = {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
        apiCall('admin/auth/logout', 'POST', headers, {})
          .then(navigate('/login'));
      }}>Logout</Button>
    </>
  )
}

export default Logout;
