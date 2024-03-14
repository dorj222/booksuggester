import React from "react";
import styled from "styled-components";
import FullButton from "../assets/button/Button.jsx";
import HeaderImage from "../assets/svg/icon/rocket.svg"
import Wave from "../assets/svg/Wave.jsx";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter flexColumn flex" style={{ zIndex: 9 }}>
        <div>
          <h1 className="extraBold font60">Explore infinite worlds—your perfect book awaits!</h1>
          <Description className="font14 semiBold">
            Experience the literary exploration with BookSuggester.
            Delve into the diverse offerings of the Gutenberg library, where each click
            unveils a random literary gem waiting to be discovered.
          </Description>
          <NavLink className="pointer extraBold" to="/discover">
            <FullButton className="semiBold" title="Get Started" />
          </NavLink>
        </div>
      </LeftSide>

      <RightSide>
        <ImageWrapper >
          <Img className="radius8" src={HeaderImage} alt="office" style={{ zIndex: 9, width: "60%" }} />
        </ImageWrapper>
      </RightSide>

      <WaveWrapper>
        <div className="wave-container">
          <Wave />
        </div>
      </WaveWrapper>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  display: flex;
  flex-direction: row;  
  overflow: auto;
  width: 100%;
  min-height: 100vh;
  height: -moz-fit-content;
  height: -webkit-fit-content;
  height: -fit-content;
  @media (max-width: 960px) {
    flex-direction: column;
    padding-top: 50px;
  }
  @media (max-width: 550px) {
    padding-top: 100px;
  }
`;

const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 75%;
    order: 2;
    padding-bottom: 50px;
    text-align: left;
  }
  @media (max-width: 560px) {
    width: 95%;
    margin-bottom: 50px;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 60%;
    order: 1;
    margin-top: 40px;
  }
`;
const Description = styled.div`
  max-width: 470px;
  padding: 12px 0 12px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: left;
    max-width: 100%;
  }
`;

const WaveWrapper = styled.div` 
.wave-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  } 
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;