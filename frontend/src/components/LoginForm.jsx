import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// eslint-disable-next-line react/prop-types
function LoginForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailInputChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordInputChange = event => {
    setPassword(event.target.value);
  }

  return (<>
    <TextField id="login-email" label="Email" variant="outlined"
               onChange={handleEmailInputChange} value={email}
    /><br/><br/>
    <TextField id="login-password" label="Password" variant="outlined" type="password"
               onChange={handlePasswordInputChange} value={password}
    /><br/><br/>
    <Button variant="contained" onClick={() => submit(email, password)}>Login</Button>
  </>);
}

export default LoginForm;
