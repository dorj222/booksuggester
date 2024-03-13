import styled from 'styled-components';

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid light-gray;
  border-left: 1px solid black;
  border-radius: 8px;
  padding: 25px;
  cursor: pointer;
  width: 260px;
  font-family: Garamond, serif;
  height: 380px;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.01);
    transition: transform 1.5s ease-out;
    border-left: 0px;
    border-right: 1px solid black;
  }

  @media only screen and (max-width: 600px) {
    width: 220px;
    min-height: 330px;
    padding: 10px;
  }
`;

export default BookContainer;