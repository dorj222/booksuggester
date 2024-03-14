import styled from 'styled-components';

const Button = styled.button`
    margin: 20px 10px;
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    border-radius: 18px;
    padding: 13px 23px;
    border: 1px solid #222222;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s;
    background: #fff;
    color: #222222;
    :hover {
        border-color: #000000;
        background: #f7f7f7;
    }
`;









export default Button;