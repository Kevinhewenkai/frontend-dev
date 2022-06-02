import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function AddQuestionForm (prop) {
  const [questionText, setQuestionText] = React.useState('');
  const [time, setTime] = React.useState('');

  const handleTextInputChange = event => {
    setQuestionText(event.target.value);
  };

  const handleTimeInputChange = event => {
    setTime(Number(event.target.value));
  };

  const Qid = Date.now().toString(36) + Math.random().toString(36).substr(2);

  return (<Stack direction={'column'} spacing={1} alignItems={'center'}>
    <h1>Add a question</h1>
    <TextField id="outlined-basic" label="Question" variant="outlined"
    onChange={handleTextInputChange} value={questionText}
    />
    <TextField id="outlined-basic" label="Time" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    onChange={handleTimeInputChange} value={time}
    />
    <Button variant="contained" onClick={() => prop.submit(questionText, time, Qid)}>Add question</Button>
  </Stack>);
}

export default AddQuestionForm;
