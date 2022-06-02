import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from '../util/ApiCall';
import QuizCard from '../components/QuizCard';
import Grid from '@mui/material/Grid';
import Navbar from '../components/Navbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function Dashboard () {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = React.useState([]);
  console.log(quizzes)

  const fetchFeeds = async () => {
    const token = localStorage.getItem('token');
    const result = [];
    if (!token) {
      navigate('/login');
    }
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const quizzesFetched = await apiCall('admin/quiz', 'GET', headers, {});
    if (quizzesFetched.quizzes) {
      for (let i = 0; i < quizzesFetched.quizzes.length; i++) {
        const quiz = quizzesFetched.quizzes[i];
        const res = await apiCall(`admin/quiz/${quiz.id}`, 'GET', headers, {});
        const questions = res.questions;
        let sumTime = 0;
        for (let i = 0; i < questions.length; i++) {
          sumTime = await (sumTime + questions[i].time);
        }
        result.push({ name: quiz.name, questions: res.questions.length, thumbnail: quiz.thumbnail, id: quiz.id, sumTime: sumTime })
      }
      setQuizzes(result);
    }
  };

  const handleDeleteQuiz = async (index) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    console.log(quizzes[index])
    await apiCall(`admin/quiz/${quizzes[index].id}`, 'DELETE', headers, {});
    const result = [...quizzes];
    result.splice(index, 1);
    setQuizzes(result);
  }

  const Feeds = () => {
    const parts = quizzes.map((quiz, index) => {
      return (<QuizCard
          gameId={quiz.id}
          gameName={quiz.name}
          key={index}
          index={index}
          img={quiz.thumbnail}
          questionCount={quiz.questions}
          title={quiz.title}
          sumTime={quiz.sumTime}
          setGame={setQuizzes}
          active={quiz.active}
          delete={() => handleDeleteQuiz(index)}
          numQuestion={quiz.questionCount}>
        </QuizCard>)
    });
    return (<Grid item>
      {parts}
    </Grid>)
  }

  React.useEffect(async () => {
    await fetchFeeds();
  }, []);

  return <>
    <Navbar route={'/'} text={'logout'} title={'Dashboard'}>register</Navbar>
    <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
      <AddIcon onClick={() => navigate('/quiz/new')}/>
    </Fab>
    <Grid container alignItems='center' justifyContent='center' spacing={3}>
      <Feeds/>
    </Grid>
  </>;
}

export default Dashboard;
