import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    <h1>QuizNew</h1>
    <TextField id="join-session-id" label="Quiz Name" variant="outlined"
               onChange={handleName} value={name}
    /><br/><br/>
    <Button variant="contained" color="success" onClick={createQuiz}>Create</Button>
    <Button variant="contained" color="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
    <br/>
  </>;
}

export default QuizNew;
