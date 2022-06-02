import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
// import QuestionAdd from './QuestionAdd';
import apiCall from '../util/ApiCall';
import Navbar from '../components/Navbar';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function QuestionEdit () {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = React.useState('');
  const [time, setTime] = React.useState('');
  const [point, setPoint] = React.useState('');
  const [select, setSelect] = React.useState('single');
  const [media, setMedia] = React.useState('');
  const [answers, setAnswers] = React.useState([
    { answers: '' },
    { answers: '' },
  ])

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  React.useEffect(async () => {
    const res = await apiCall(`admin/quiz/${quizId}`, 'GET', headers, {});
    if (res.questions[questionId]) {
      setAnswers(res.questions[questionId].answers);
    }
    if (res.questionText) {
      setQuestionText(res.questionText);
    }
  }, [])

  const handleTextInputChange = event => {
    setQuestionText(event.target.value);
  };

  const handleTimeInputChange = event => {
    setTime(Number(event.target.value));
  };

  const handlePointInputChange = event => {
    setPoint(Number(event.target.value));
  };

  const handleSelectInputChange = event => {
    setSelect(event.target.value);
  };

  const handleMediaInputChange = event => {
    setMedia(event.target.value);
  }

  const updateQuestion = async () => {
    const res = await apiCall(`admin/quiz/${quizId}`, 'GET', headers, {});
    const result = res.questions;
    console.log(questionId)
    console.log(result)
    const value = {
      answers: answers,
      media: media,
      point: point,
      questionText: questionText,
      time: time,
      type: select
    }
    result[questionId] = value;
    const body = {
      questions: result
    }
    await apiCall(`admin/quiz/${quizId}`, 'PUT', headers, body);
    navigate(`/quiz/edit/${quizId}`);
  }

  const handleAnswerChange = (e, index) => {
    const { attr, value } = e.target;
    const result = [...answers];
    result[index][attr] = value;
    setAnswers(result);
  }

  const handleAddAnswer = () => {
    const result = [...answers, { answers: '' }];
    setAnswers(result);
  }

  const handleDeleteAnswer = (index) => {
    const result = [...answers];
    result.splice(index, 1);
    setAnswers(result);
  }

  const AnswersTextFields = () => {
    const parts = answers.map((answer, index) => {
      return (
        <div key={index}>
          <Stack direction={'row'} spacing={1}>
            <TextField label="answer" variant="outlined"
                        onChange={e => handleAnswerChange(e, index)}
                        value={answer.answers}
                        style={{ margin: '2%' }}
          />
            {
              answers.length > 2 &&
              <Button variant={'outlined'} color={'warning'} onClick={handleDeleteAnswer}>Delete</Button>
            }
          </Stack>
        </div>
      )
    })
    return (
      <Grid>
        {parts}
      </Grid>
    )
  }

  return (<>
    <Navbar route={'/'} text={'logout'} title={'Edit Question'}>register</Navbar>
    <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
      <ArrowBackIcon onClick={() => navigate('/dashboard')}/>
    </Fab>
    <Stack direction={'column'} spacing={1} className={'form'}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label="Age"
            onChange={handleSelectInputChange}
          >
            <MenuItem value={'single'}>Single</MenuItem>
            <MenuItem value={'Multiple'}>Mutiple</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField id="outlined-basic" label="Question" variant="outlined"
                 onChange={handleTextInputChange} value={questionText}
      />
      <TextField id="outlined-basic" label="Time" variant="outlined"
                 inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                 onChange={handleTimeInputChange} value={time}
      />
      <TextField id="outlined-basic" label="Point" variant="outlined"
                 inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                 onChange={handlePointInputChange} value={point}
      />
      <Button
        variant="contained"
        component="label"
      >
        Upload Image Or Video
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaInputChange} value={media}
          hidden
        />
      </Button>
      <h2>Answers</h2>
      <AnswersTextFields/>
      {answers.length > 1 && answers.length < 6 && <Button variant={'contained'} onClick={handleAddAnswer}>Add Question</Button>}
      <Button variant="contained" color="success" onClick={updateQuestion}>Update</Button>
    </Stack>
  </>)
}

export default QuestionEdit;
