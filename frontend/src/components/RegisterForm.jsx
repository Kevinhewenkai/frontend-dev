import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// eslint-disable-next-line react/prop-types
function RegisterForm ({ submit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const handleEmailInputChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordInputChange = event => {
    setPassword(event.target.value);
  }

  const handleNameInputChange = event => {
    setName(event.target.value);
  }

  return (<>
    <TextField id="register-email" label="Email" variant="outlined"
               onChange={handleEmailInputChange} value={email}
    /><br/><br/>
    <TextField id="register-password" label="Password" variant="outlined" type="password"
               onChange={handlePasswordInputChange} value={password}
    /><br/><br/>
    <TextField id="register-name" label="Name" variant="outlined"
               onChange={handleNameInputChange} value={name}
    /><br/><br/>
    <Button variant="contained" onClick={() => submit(email, password, name)}>Register</Button>
    </>);
}

export default RegisterForm;
