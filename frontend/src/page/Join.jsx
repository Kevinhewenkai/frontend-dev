import React from 'react';
import JoinForm from '../components/JoinForm';
import { useParams } from 'react-router-dom';

function Join () {
  const { sessionId } = useParams();
  console.log(sessionId);
  return (<>
    <h1>Join the session</h1>
    <JoinForm sessionId={sessionId}/>
  </>)
}

export default Join;
