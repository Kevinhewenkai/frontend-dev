import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddQuestionForm from '../components/AddQuestionForm';
// import apiCall from '../util/ApiCall';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function QuestionAdd (prop) {
  const navigate = useNavigate();
  // const { cardId } = useParams();

  return (<Stack direction={'column'} spacing={1}>
    <AddQuestionForm submit={async (questionText, time, qid) => {
      // const headers = {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${prop.token}`,
      // };
      // const newQuestion = {
      //   questionText: questionText,
      //   time: time,
      //   id: qid
      // };
      // questions.questions.push(newQuestion);
      // const apiBody = {
      //   questions: questions.questions,
      //   name: questions.name,
      //   thumbnail: questions.thumbnail
      // }
      // apiCall(`admin/quiz/${cardId}`, 'PUT', headers, apiBody);
      navigate('/dashboard');
    }}>Add Question</AddQuestionForm>
    <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
      <ArrowBackIcon onClick={() => navigate('/dashboard')}/>
    </Fab>
  </Stack>)
}

export default QuestionAdd;
