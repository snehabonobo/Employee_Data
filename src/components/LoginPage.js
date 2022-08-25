import React from "react";
import {auth, provider} from "../firebase";
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import "./LoginPage.css";
function Login({setIsAuth}) {
    let navigate = useNavigate();
    const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth", true)
          setIsAuth(true);
          const name = result.user.displayName;
          const email = result.user.email;

          localStorage.setItem("name", name)
          localStorage.setItem("email", email)
          navigate("/welcomepage");
      });
    };


  return (
    <div className="loginPage">
      <p>Sign In to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>Google</button>

      </div>
  )
}

export default Login