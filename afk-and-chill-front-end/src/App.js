// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import React, {useState,useEffect} from 'react';
import Register from './layouts/RegisterPage'

function App() {

  const [isAuthenticated, setisAuthenticated] = useState(false);

  // const authenticateUser = (authState) => {
  //   setisAuthenticated(authState);
  // }

  useEffect(() => {
    console.log(`Authenticated: ${isAuthenticated}`);
  }, [isAuthenticated]);

  return (
    <Register setisAuthenticated={setisAuthenticated}/>
  )
}

export default App;
