// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import React, {useState, useEffect} from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';


function App() {
  const[sessionToken, setSessionToken] = useState('');
  //Handling token
  useEffect(()=> {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return(
      sessionToken === localStorage.getItem('token')? <WorkoutIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>
    )
  }

  return (
    <div >
      <Sitebar clearToken={clearToken}/>
      {protectedViews()}
    </div>
  );
}

export default App;
