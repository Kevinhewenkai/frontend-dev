import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionAdd from './QuestionAdd';
import QuestionList from '../components/QuestionList';
import Navbar from '../components/Navbar';
import axios from 'axios';

function QuizEdit () {
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState([]);
  const { quizId } = useParams();

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  React.useEffect(() => {
    axios.get(`http://localhost:5005/admin/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(r => {
      setQuestions(r.data.questions)
    })
  }, [])

  const handleAddQuestion = (newQuestion) => {
    const result = [...questions, newQuestion];
    setQuestions(result);
  }

  React.useEffect(() => {
    handleAddQuestion()
  }, [])

  return (<>
    <Navbar route={'/'} text={'Logout'} title={'Edit a quiz'}>register</Navbar>
    <QuestionAdd quizId={quizId} token={token}>Add question</QuestionAdd>
    <QuestionList quizId={quizId}>Question</QuestionList>
  </>)
}

export default QuizEdit;
