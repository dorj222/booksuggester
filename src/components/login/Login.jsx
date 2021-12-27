import React from "react";
import './login.style.css';
import SignIn from '../sign-in/Sign-in';
import SignUp from '../sign-up/Sign-up';

const Login = () => {
    return (
        <div className="login">
            <div className="signIn column">
                <SignIn/>
            </div>
            <div className="signUp column">
                <SignUp/>
            </div>
        </div>
    );
};

export default Login;