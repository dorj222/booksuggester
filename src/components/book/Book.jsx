import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import BookContainer from './BookContainer';

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
      <BookContainer
        style={{ backgroundColor: background }}
        onMouseEnter={this.toggleHoverState}
        onMouseLeave={this.toggleHoverState}
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
      </BookContainer>
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
