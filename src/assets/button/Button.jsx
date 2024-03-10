import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8 font14"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 3px solid #025464;
  background-color: ${(props) => (props.border ? "transparent" : "#FFF")};
  width: fit-content;
  padding: 15px;
  outline: none;
  color: #025464;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #025464;
    color: #fff;
    transform: scale(1.1);
  }
`;