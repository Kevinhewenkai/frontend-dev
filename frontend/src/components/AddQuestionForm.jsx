import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// eslint-disable-next-line react/prop-types
function AddQuestionForm ({ submit }) {
  const [questionText, setQuestionText] = React.useState('');
  const [time, setTime] = React.useState('');

  const handleTextInputChange = event => {
    setQuestionText(event.target.value);
  };

  const handleTimeInputChange = event => {
    setTime(Number(event.target.value));
  };

  const Qid = Date.now().toString(36) + Math.random().toString(36).substr(2);

  return (<>
    <TextField id="outlined-basic" label="Question" variant="outlined"
    onChange={handleTextInputChange} value={questionText}
  /><br/><br/>
    <TextField id="outlined-basic" label="Time" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    onChange={handleTimeInputChange} value={time}
  /><br/><br/>
    <Button variant="contained" onClick={() => submit(questionText, time, Qid)}>Add question</Button>
  </>);
}

export default AddQuestionForm;
