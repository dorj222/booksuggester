import React from "react";
import SignIn from './Sign-in';
import SignUp from './Sign-up';
import styled from 'styled-components';

const Login = () => {
    return (
        <LoginWrapper>
            <div className="signIn column">
                <SignIn />
            </div>
            <div className="signUp column">
                <SignUp />
            </div>
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    margin: 140px auto 0;
    width: 85vw;
    flex-wrap: wrap;
    gap: 40px;
    height: 100vh;
    overflow: hidden;

    @media only screen and (max-width: 600px) {
        margin-top: 100px;
        margin-bottom: 30px;
    }
`;