import React from "react";
import googleLogo from "../../../src/googleLogo.png";
import "./LoginPage.css";

const googleLogin = () => {
  window.open("http://localhost:5000/auth/google", "_self");
};

const LoginPage = () => {
  return (
    <div className="loginPage">
      <div className="loginForm">
        <h1>Login</h1>
        <div className="GoogleContainer" onClick={googleLogin}>
          <img src={googleLogo} alt="Google Icon" />
          <p>Login With Google</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
