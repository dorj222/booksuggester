import React from 'react';
import { Book } from '../book/Book'
import './home.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { firestore } from "../../firebase/firebase.utils"
import styled from "styled-components";

class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      hasBtnMoreClicked: false
    };
  }

  handleClickNext() {
    this.props.callAPI();
    this.setState({
      hasBtnMoreClicked: false
    })
  }

  handleClickDetail() {

    if (!this.state.hasBtnMoreClicked) {
      this.setState({
        hasBtnMoreClicked: true
      }
      )
    }
    else {
      this.setState({
        hasBtnMoreClicked: false
      }
      )
    }
  }

  handleClickSave() {

    if (!this.props.currentUser) {
      alert("Please sign in!");
      return
    }
    else {

      try {
        const response = async () => {
          firestore.collection("users").doc(this.props.currentUser.id).collection('books').add(
            {
              "title": this.props.title,
              "authors": this.props.authors,
              "subject": this.props.subject,
              "genre": this.props.genre,
              "background": this.props.background,
              "hasRead": false,
              "hasMoreClicked": false
            }
          );
        }
        response();
        this.handleClickNext()
      } catch (error) {
        console.log(error);
      }
    }
  }


  render() {

    return (
        <div className="homeContainer">
          <Book
            title={this.props.title}
            authors={this.props.authors}
            subject={this.props.subject}
            genre={this.props.genre}
            background={this.props.background}
            hasBtnMoreClicked={this.state.hasBtnMoreClicked}
          />

          <div className='btnContainer'>
            <button id="btnAbout" onClick={() => this.handleClickDetail()} >
              more <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
            </button>
            <button id="btnBookMark" onClick={() => this.handleClickSave()}>
              save <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
            </button>
            <button id="btnNext" onClick={() =>
              this.handleClickNext()
            }>
              next <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
            </button>
          </div>
        </div>
    );
  }
};

export { Home };
