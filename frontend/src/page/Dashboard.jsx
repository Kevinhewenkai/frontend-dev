import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from '../util/ApiCall';
import QuizCard from '../components/QuizCard';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Logout from '../components/Logout';

function Dashboard () {
  const navigate = useNavigate();
  const [games, setGames] = React.useState([]);

  const createQuiz = async () => {
    const token = localStorage.getItem('token');
    const result = [];
    if (!token) {
      navigate('/login');
    }
    const headers = {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const quizzes = await apiCall('admin/quiz', 'GET', headers, {});
    if (quizzes.quizzes) {
      for (let i = 0; i < quizzes.quizzes.length; i++) {
        const quiz = quizzes.quizzes[i];
        const res = await apiCall(`admin/quiz/${quiz.id}`, 'GET', headers, {});
        const questions = res.questions;
        let sumTime = 0;
        for (let i = 0; i < questions.length; i++) {
          sumTime = await (sumTime + questions[i].time);
        }
        result.push({ name: quiz.name, questions: res.questions.length, thumbnail: quiz.thumbnail, id: quiz.id, sumTime: sumTime })
      }
      // const gameList = quizzes.quizzes.map(async quiz => {
      //   const res = await apiCall(`admin/quiz/${quiz.id}`, 'GET', headers, {});
      //   // console.log(res.questions.thumbnail);
      //   // console.log(quiz.id);
      //   // console.log(res);
      //   return { id: quiz.id, title: quiz.name, questionCount: res.questions.length, thumbnail: quiz.thumbnail }
      // });
      // console.log(gameList);
      // console.log(result);
      setGames(result);
    }
  };

  const GamePart = () => {
    const parts = games.map((quiz, index) => {
      return (<QuizCard
          gameId={quiz.id}
          gameName={quiz.name}
          key={index}
          index={index}
          img={quiz.thumbnail}
          questionCount={quiz.questions}
          title={quiz.title}
          sumTime={quiz.sumTime}
          setGame={setGames}
          active={quiz.active}
          numQuestion={quiz.questionCount}>
        </QuizCard>)
    });
    return (<Grid item>
      {parts}
    </Grid>)
  }
  // const buildDashboard = () => {
  //   const response = createQuiz();
  // };
  React.useEffect(() => {
    createQuiz();
    // console.log(createQuiz());
  }, []);
  // createQuiz().then(body => console.log(body));
  return <>
    <h1>Dashboard</h1>
    <Logout />
    <br/>
    <br/>
    <Button style={{ position: 'relative', alignItems: 'center' }} variant="contained" color="success" onClick={() => navigate('/quiz/new')}>Add a New quiz</Button>
    <Grid container alignItems='center' justifyContent='center' spacing={3}>
      <GamePart/>
    </Grid>
  </>;
}

export default Dashboard;
