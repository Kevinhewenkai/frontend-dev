import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
// import QuestionAdd from './QuestionAdd';
import apiCall from '../util/ApiCall';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
// import QuestionList from '../components/QuestionList';

function QuestionEdit () {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = React.useState('');
  const [time, setTime] = React.useState('');
  const [point, setPoint] = React.useState('');
  const [select, setSelect] = React.useState('single');
  const [media, setMedia] = React.useState('');
  const [answer1, setAnswer1] = React.useState('');
  const [answer2, setAnswer2] = React.useState('');
  const [answer3, setAnswer3] = React.useState('');
  const [answer4, setAnswer4] = React.useState('');
  const [answer5, setAnswer5] = React.useState('');
  const [answer6, setAnswer6] = React.useState('');
  const [singleCorrect, setSingleCorrect] = React.useState('');
  const [mutiCorrect, setMutiCorrect] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const handleMutiCorrectChange = (event) => {
    setMutiCorrect({
      ...mutiCorrect,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSingleCorrect = event => {
    setSingleCorrect(event.target.value);
  }

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

  const handleAnswer1InputChange = event => {
    setAnswer1(event.target.value);
  }

  const handleAnswer2InputChange = event => {
    setAnswer2(event.target.value);
  }

  const handleAnswer3InputChange = event => {
    setAnswer3(event.target.value);
  }

  const handleAnswer4InputChange = event => {
    setAnswer4(event.target.value);
  }

  const handleAnswer5InputChange = event => {
    setAnswer5(event.target.value);
  }

  const handleAnswer6InputChange = event => {
    setAnswer6(event.target.value);
  }

  const updateQuestion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const res = await apiCall(`admin/quiz/${quizId}`, 'GET', headers, {});
    const questions = res.questions;
    let question;
    for (let i = 0; i < questions.length; i++) {
      Object.keys(questions[i]).map(key => {
        if (key === 'id') {
          if (questions[i][key] === questionId) {
            question = questions[i];
          }
        }
        return <></>
      })
    }
    const newList = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id !== questionId) {
        newList.push(questions[i]);
      }
    }

    question.time = time;
    question.point = point;
    question.type = select;
    question.questionText = questionText;
    question.media = media;
    question.answers = [answer1, answer2, answer3, answer4, answer5, answer6];
    question.correct = (select === 'single') ? singleCorrect : mutiCorrect;
    newList.push(question);
    const body = {
      questions: newList
    }
    await apiCall(`admin/quiz/${quizId}`, 'PUT', headers, body);
    navigate(`/quiz/edit/${quizId}`);
  }

  return (<>
    <h1>Edit Question</h1>
    <select value={select} onChange={handleSelectInputChange}>
      <option value='single'>Single Choices</option>
      <option value='multiple'>Multiple Choices</option>
    </select>
    <br/>
    <br/>
    <TextField id="outlined-basic" label="Question" variant="outlined"
       onChange={handleTextInputChange} value={questionText}
    />
    <br/>
    <br/>
    <TextField id="outlined-basic" label="Time" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
               onChange={handleTimeInputChange} value={time}
    />
    <br/>
    <br/>
    <TextField id="outlined-basic" label="Point" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
               onChange={handlePointInputChange} value={point}
    /><br/>
    <br/>
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
    <br/><br/>
    <h2>Answers</h2>
    <TextField id="outlined-basic" label="Answer1" variant="outlined"
               onChange={handleAnswer1InputChange} value={answer1}
    /><br/>
    <TextField id="outlined-basic" label="Answer2" variant="outlined"
               onChange={handleAnswer2InputChange} value={answer2}
    /><br/>
    <TextField id="outlined-basic" label="Answer3" variant="outlined"
               onChange={handleAnswer3InputChange} value={answer3}
    /><br/>
    <TextField id="outlined-basic" label="Answer4" variant="outlined"
               onChange={handleAnswer4InputChange} value={answer4}
    /><br/>
    <TextField id="outlined-basic" label="Answer5" variant="outlined"
               onChange={handleAnswer5InputChange} value={answer5}
    /><br/>
    <TextField id="outlined-basic" label="Answer6" variant="outlined"
               onChange={handleAnswer6InputChange} value={answer6}
    /><br/>
    {
      select === 'single'
        ? <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Correct Answer</FormLabel>
          <RadioGroup
            aria-labelledby="single-correct-answer"
            row
            name="single-correct-answer"
            onChange={handleSingleCorrect}
            value={singleCorrect}
          >
            <FormControlLabel value="1" control={<Radio />} label="Answer1" />
            <FormControlLabel value="2" control={<Radio />} label="Answer2" />
            <FormControlLabel value="3" control={<Radio />} label="Answer3" />
            <FormControlLabel value="4" control={<Radio />} label="Answer4" />
            <FormControlLabel value="5" control={<Radio />} label="Answer5" />
            <FormControlLabel value="6" control={<Radio />} label="Answer6" />
          </RadioGroup>
        </FormControl>
        : (
          <>
          <FormLabel component="legend">Correct Answer</FormLabel>
            <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox checked={mutiCorrect['1']} onChange={handleMutiCorrectChange} name="1" />
            }
            label="Answer1"
          />
          <FormControlLabel
            control={
              <Checkbox checked={mutiCorrect['2']} onChange={handleMutiCorrectChange} name="2" />
            }
            label="Answer2"
          />
          <FormControlLabel
            control={
              <Checkbox checked={mutiCorrect['3']} onChange={handleMutiCorrectChange} name="3" />
            }
            label="Answer3"
          />
          <FormControlLabel
            control={
              <Checkbox checked={mutiCorrect['4']} onChange={handleMutiCorrectChange} name="4" />
            }
            label="Answer4"
          />
          <FormControlLabel
            control={
              <Checkbox checked={mutiCorrect['5']} onChange={handleMutiCorrectChange} name="5" />
            }
            label="Answer5"
          />
          <FormControlLabel
            control={
              <Checkbox checked={mutiCorrect['6']} onChange={handleMutiCorrectChange} name="6" />
            }
            label="Answer6"
          />
        </FormGroup>
        </>)
    }
    <Button variant="contained" color="success" onClick={updateQuestion}>Update</Button>
    <Button variant="contained" color="secondary" onClick={() => navigate(`/quiz/edit/${quizId}`)}>Cancel</Button>
  </>)
}

export default QuestionEdit;
