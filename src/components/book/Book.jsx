import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
  }

  toggleHoverState = () => {
    this.setState(prevState => ({
      showInfo: !prevState.showInfo
    }));
  };

  render() {
    const { title, background, authors, subject, genre } = this.props;
    const { showInfo } = this.state;

    return (
      <CardContainer
        style={{ backgroundColor: background }}
        onMouseEnter={this.toggleHoverState}
        onMouseLeave={this.toggleHoverState}
        showInfo={showInfo}
      >
        <ContentContainer>
          {!showInfo ? (
            <>
              <Title>{title.length > 120 ? title.substring(0, 120) + '...' : title}</Title>
              <Authors>{authors.length > 120 ? title.substring(0, 120) + '...' : authors}</Authors>
            </>
          ) : (
            <DetailContainer className='font12'>
              {[
                { label: "Title", value: title },
                { label: "Authors", value: authors },
                { label: "Subject", value: subject },
                { label: "Category", value: genre },
              ].map((item, index) => (
                item.value && (
                  <span key={index}>
                    <DetailLabel>{item.label}:</DetailLabel>
                    <DetailValue>{item.value.length > 120 ? item.value.substring(0, 120) + '...' : item.value}</DetailValue>
                  </span>
                )
              ))}
            </DetailContainer>
          )}
        </ContentContainer>
      </CardContainer>
    );
  }
}

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CardContainer = styled.div`
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

const ContentContainer = styled.div``;

const Title = styled.h6`
  margin: 0;
  text-overflow: ellipsis;
  animation: ${fadeInOut} 1s ease;
`;

const Authors = styled.span`
  font-size: 12px;
  color: #555;
  animation: ${fadeInOut} 1s ease;
`;
const DetailContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  animation: ${fadeInOut} 1s ease;
`;

const DetailValue = styled.span`
  margin-left: 5px;
  animation: ${fadeInOut} 1s ease;
`;

export { Book };
