import React, { useState } from "react";
import SignIn from './Sign-in';
import SignUp from './Sign-up';
import styled from 'styled-components';

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <LoginWrapper>
            <div className="content">
                <div className="form">
                    {isSignIn ? <SignIn /> : <SignUp />}
                </div>
                <div className="toggleButton font13">
                    <SignUpText>
                        {isSignIn ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={toggleForm}>
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </button>
                    </SignUpText>
                </div>
            </div>
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .content {
        text-align: center;
        width: 90%;
        max-width: 350px;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: 20px; /* Add some padding */
    }

    .form {
        width: 100%;
        margin-bottom: 20px;
    }

    .toggleButton {
        text-align: center;
    }
`;

const SignUpText = styled.div`
    text-align: center;
    margin-top: 20px;
`;