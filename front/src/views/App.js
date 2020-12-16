//import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Main from './Main'
import Rating from './Rating';
//import axios from 'axios'

function App() {
  /*const [title, setTitle] = useState();

  useEffect(() => {
    async function fetchData(){
        const request = await axios.get('http://localhost:3002/api');
        console.log(request)
        setTitle(request.data.title);
        return request;
    }
    fetchData();
})*/

 

  
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={SignIn}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/main' component={Main}/>
        <Route exact path='/rating' component={Rating}/>
      </div>
    </BrowserRouter>
  );
}

export default App;

