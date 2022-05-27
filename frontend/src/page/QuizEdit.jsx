import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionAdd from './QuestionAdd';
import apiCall from '../util/ApiCall';
import QuestionList from '../components/QuestionList';

function QuizEdit () {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const quiz = apiCall(`admin/quiz/${cardId}`, 'GET', headers, {});
  return (<>
    <h1>Edit Quiz</h1>
    <QuestionAdd detail={quiz} token={token}>Add question</QuestionAdd>
    <h2>Edit Questions</h2>
    <QuestionList detail={quiz} quizId={cardId}>Question</QuestionList>
  </>)
}

export default QuizEdit;
