import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fab from '@mui/material/Fab';

function QuizNew () {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const token = localStorage.getItem('token');

  const handleName = event => {
    setName(event.target.value);
  }
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  const createQuiz = async () => {
    try {
      const response = await fetch('http://localhost:5005/admin/quiz/new', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (response.status === 400) {
        console.log(await response.text());
      }
    } catch (err) {
      console.log(err);
    }
    navigate('/dashboard')
  };

  return <>
    <Navbar route={'/'} text={'logout'} title={'Create A Quiz'}>register</Navbar>
    <div className={'form'}>
      <Stack direction={'column'} spacing={1}>
        <TextField id="join-session-id" label="Quiz Name" variant="outlined"
                   onChange={handleName} value={name}
        />
        <Button variant="contained" color="success" onClick={createQuiz}>Create</Button>
      </Stack>
    </div>
    <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
      <ArrowBackIcon onClick={() => navigate('/dashboard')}/>
    </Fab>
  </>;
}

export default QuizNew;
