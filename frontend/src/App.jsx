import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import React from 'react';
import './App.css';

import Register from './page/Register';
import Login from './page/Login';
import QuizNew from './page/QuizNew';
import Dashboard from './page/Dashboard';
import QuizEdit from './page/QuizEdit';
import QuestionEdit from './page/QuestionEdit';
import Result from './page/Result';
import Join from './page/Join';
import Play from './page/Play';

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz/new" element={<QuizNew/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/quiz/edit/:quizId" element={<QuizEdit/>}/>
          <Route path="quiz/edit/:quizId/:questionId" element={<QuestionEdit/>}/>
          <Route path="result/:sessionId" element={<Result/>}/>
          <Route path="join" element={<Join/>}/>
          <Route path="join/:sessionId" element={<Join/>}/>
          <Route path="play/:sessionId" element={<Play/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
