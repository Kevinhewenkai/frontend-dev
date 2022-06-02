import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import apiCall from '../util/ApiCall';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

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

  return (<div className={'form'}>
    <Stack direction={'column'} spacing={1}>
      <TextField id="join-session-id" label="Session Id" variant="outlined"
                  onChange={handleSessionId} value={sessionId}
    />
      <TextField id="join-name" label="Name" variant="outlined"
                 onChange={handleName} value={name}
      />
      <Button variant="contained" onClick={join} fullWidth>Join</Button>
    </Stack>
  </div>)
}

export default JoinForm;
