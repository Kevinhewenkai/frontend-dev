import React from 'react';
import apiCall from '../util/ApiCall';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import apiCall from '../util/ApiCall';

function QuestionList (prop) {
  const navigate = useNavigate();
  const [questions, setQuestions] = React.useState([]);
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchQuestions = async () => {
    const res = await apiCall(`admin/quiz/${prop.quizId}`, 'GET', headers, {});
    setQuestions(res.questions);
  }

  React.useEffect(async () => {
    await fetchQuestions();
  }, [])

  const EditQuestionFeeds = () => {
    const parts = questions.map((question, index) => {
      return (
        <div key={index} style={{ margin: '10%' }}>
          <Stack direction={'column'} spacing={1} style={{ alignItems: 'center', border: '1px solid black' }}>
            <p>{question.questionText}</p>
            <Button variant={'contained'} onClick={() => navigate(`/quiz/edit/${prop.quizId}/${index}`)}>edit</Button>
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

  return (
    <>
      <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>Edit Questions</h1>
      <EditQuestionFeeds/>
    </>
  )
//   const navigate = useNavigate();
//   const [questionDic, setQuestionDic] = React.useState({});
//   prop.detail.then(r => {
//     setQuestionDic(r);
//   });
//
//   const deleteQuestion = (questionId) => {
//     const newList = [];
//     Object.keys(questionDic).map(key => {
//       if (key === 'questions') {
//         const questions = questionDic[key];
//         if (questions) {
//           console.log(questions);
//           for (let i = 0; i < questions.length; i++) {
//             if (questions[i].id !== questionId) {
//               newList.push(questions[i]);
//             }
//           }
//         }
//       }
//       return (<></>)
//     });
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     }
//     const headers = {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     };
//     const body = {
//       questions: newList
//     }
//     apiCall(`admin/quiz/${prop.quizId}`, 'PUT', headers, body);
//   }
//
//   const parts = [];
//   if (questionDic.questions) {
//     console.log(questionDic.questions);
//     for (let i = 0; i < questionDic.questions.length; i++) {
//       parts.push((<div key={i}>
//           <span>{ questionDic.questions[i].questionText }</span>
//           <Fab size="small" color="primary" aria-label="edit" onClick={() => { navigate(`/quiz/edit/${prop.quizId}/${questionDic.questions[i].id}`) }}>
//             <EditIcon />
//           </Fab>
//          <Fab size="small" color="secondary" aria-label="delete" onClick={() => deleteQuestion(questionDic.questions[i].id)}>
//             <DeleteIcon />
//           </Fab>
//           <br/>
//         </div>
//       ))
//     }
//   }
//   // const Questions = () => {
//   //   const parts = questionDic.questions.map(question => {
//   //     return (<>
//   //       <p>{ question }</p>
//   //       <input type={'checkbox'}/>
//   //     </>)
//   //   });
//   //   return (<Grid item>
//   //     { parts }
//   //   </Grid>)
//   // }
//   //
//   return (
//     <Grid item>
//       { parts }
//     </Grid>
//   );
}
//
export default QuestionList;
