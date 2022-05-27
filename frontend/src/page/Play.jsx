import React from 'react';
import apiCall from '../util/ApiCall';

function Play () {
  const playerId = localStorage.getItem('playerId');
  const headers = {
    'Content-Type': 'application/json',
  };
  const Test = () => {
    const res = apiCall(`play/${playerId}/status`, 'GET', headers, {});
    res.then(r => console.log(r));
    return <></>
  }
  return (<>
  <h1>Play</h1>
    <Test/>
  </>)
}

export default Play;
