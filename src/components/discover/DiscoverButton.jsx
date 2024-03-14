import styled from 'styled-components';

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 100%;
    padding: 10px;
    margin: 20px 15px;
    box-shadow: 0 12px 16px rgba(0,0,0,0.4);
    background-color: #ffffff;
    color: #222222;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    position: relative; /*To properly place ripple for button feedback on active state*/

    /*Styles when button is hovered*/
    &:hover{
       box-shadow: 0 3px 8px rgba(0,0,0,0.2);
       background-color: #f2f2f2;
    }

    /*Styles when button is focused*/
    &:focus{
        outline: none;
    }

    /*Styles when button is active*/
    &:active::after{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.1);
        border-radius: 100%;
        transform: translate(-50%, -50%) scale(0); /*Starts scale from middle of button*/
        animation: ripple 0.6s linear; /*Ripple effect when button is clicked/active state*/
    }

    /*Ripple effect animation*/
    @keyframes ripple {
     to {
       transform: translate(-50%, -50%) scale(2); /*Ends scale covering button*/
       opacity: 0;
     }
    }
`;

export default Button;