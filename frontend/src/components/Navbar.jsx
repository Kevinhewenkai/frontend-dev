import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar (prop) {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {prop.title}
          </Typography>
          <Button color="inherit" onClick={async () => {
            // eslint-disable-next-line no-empty
            if (prop.route === '/') {
              await axios.post('admin/auth/logout', {}, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
              })
            }
            navigate(prop.route);
          }}>{prop.text}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
