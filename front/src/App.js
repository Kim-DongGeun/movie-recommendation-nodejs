import './App.css';
import React from 'react';
import Row from './Row';
import requests from './Requests'
import Banner from './Banner';

function App() {
  return (
    <div className="app">
      <Banner />
      <Row title="요즘 영화" fetchUrl={requests.fetchTrending} isLargeRow={true}/>
      <Row title="인기 있는" fetchUrl={requests.fetchTopRated}/>
      <Row title="액션" fetchUrl={requests.fetchActionMoives}/>
      <Row title="코미디" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="다큐멘터리" fetchUrl={requests.fetchDocumentaries}/>
      <Row title="호러 스릴러" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="로맨스" fetchUrl={requests.fetchRomanceMovies}/>
    </div>
  );
}

export default App;

