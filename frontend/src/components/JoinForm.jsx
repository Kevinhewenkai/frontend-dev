import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import apiCall from '../util/ApiCall';
import { useNavigate } from 'react-router-dom';

function JoinForm (prop) {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = React.useState(prop.sessionId ? prop.sessionId : '');
  const [name, setName] = React.useState('');

  const handleSessionId = event => {
    setSessionId(event.target.value);
  }

  const handleName = event => {
    setName(event.target.value);
  }

  const join = async () => {
    const headers = {
      'Content-type': 'application/json',
    };
    const body = {
      name: { name }
    };
    const data = await apiCall(`play/join/${sessionId}`, 'POST', headers, body);
    localStorage.setItem('playerId', data.playerId);
    navigate(`/play/${sessionId}`);
  }

  return (<>
    <TextField id="join-session-id" label="Session Id" variant="outlined"
               onChange={handleSessionId} value={sessionId}
    /><br/><br/>
    <TextField id="join-name" label="Name" variant="outlined"
               onChange={handleName} value={name}
    /><br/><br/>
    <Button variant="contained" onClick={join}>Join</Button>
  </>)
}

export default JoinForm;
