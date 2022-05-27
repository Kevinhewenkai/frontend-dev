import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddQuestionForm from '../components/AddQuestionForm';
import apiCall from '../util/ApiCall';
import Button from '@mui/material/Button';

function QuestionAdd (prop) {
  const [body, setbody] = React.useState({});
  prop.detail.then(r => { setbody(r) });
  const navigate = useNavigate();
  const { cardId } = useParams();

  return (<>
    <h1>Add a question</h1>
    <AddQuestionForm submit={async (questionText, time, qid) => {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${prop.token}`,
      };
      const newQuestion = {
        questionText: questionText,
        time: time,
        id: qid
      };
      body.questions.push(newQuestion);
      const apiBody = {
        questions: body.questions,
        name: body.name,
        thumbnail: body.thumbnail
      }
      apiCall(`admin/quiz/${cardId}`, 'PUT', headers, apiBody);
      navigate('/dashboard');
    }}>Add Question</AddQuestionForm>
    <Button variant="contained" color="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
  </>)
}

export default QuestionAdd;
