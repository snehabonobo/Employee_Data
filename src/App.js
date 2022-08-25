import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import React, { useState } from "react";
import {signOut} from "firebase/auth";
import {auth} from "./firebase"

function App() {

  const [isAuth, setIsAuth] = useState(false);
  

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    
      
      <Router>
        <nav>
          
          {!isAuth ? (<Link to = "/">  </Link>
        ) :(
          <>
          <Link to = "/welcomepage">  </Link>
           <Link to = "/welcomepage"  onClick={signUserOut}>Log out</Link>
           </>
           )}
        </nav>
      <Routes>
      <Route  exact path="/welcomepage" element={<HomePage isAuth={isAuth} />}/>
       
      <Route path="/" element={<LoginPage setIsAuth={setIsAuth}/>}/>

       



      </Routes>
</Router>




  );

}



  

export default App;
