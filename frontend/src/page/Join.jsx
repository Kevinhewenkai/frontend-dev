import React from 'react';
import JoinForm from '../components/JoinForm';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Join () {
  const { sessionId } = useParams();
  console.log(sessionId);
  return (<>
    <Navbar route={''} text={''} title={'Join'}>register</Navbar>
    <JoinForm sessionId={sessionId}/>
  </>)
}

export default Join;
