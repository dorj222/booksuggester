import React, { useState } from "react";
import SignIn from '../components/login/Sign-in';
import SignUp from '../components/login/Sign-up';
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
                <div className="toggleButton font12">
                    <SignUpText>
                        {isSignIn ? "Don't have an account? " : "Already have an account? "}
                        <Button onClick={toggleForm}>
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </Button>
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
        padding: 20px;
    }
    .form {
        width: 100%;
    }
    .toggleButton {
        text-align: center;
    }
    @media (max-width: 1400px) {
        margin-top: 40px;
      }
`;

const SignUpText = styled.div`
    text-align: center;
`;

const Button = styled.button`
  margin-right: 5px;
  border: none;
  border-radius: 10px;
  color: black;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin: 4px 10px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    transition: 0.2s ease-in-out;
    text-decoration: underline;
  }
`;