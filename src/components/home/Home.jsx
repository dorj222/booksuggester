import React from 'react';
import { Book } from '../book/Book'
import './home.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faHeart } from '@fortawesome/free-solid-svg-icons';
import { firestore } from "../../firebase/firebase.utils"
import { Toast } from 'react-bootstrap';


class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      showToast: false
    };
  }

  handleClickNext() {
    this.props.callAPI();
  }

  handleClickSave() {
    if (!this.props.currentUser) {
      this.setState({ showToast: true });
      return;
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
        />

        <div className='btnContainer'>
          <button id="btnBookMark" onClick={() => this.handleClickSave()}>
            save <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
          </button>
          <button id="btnNext" onClick={() =>
            this.handleClickNext()
          }>
            next <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
          </button>
        </div>

        <Toast
          show={this.state.showToast}
          onClose={() => this.setState({ showToast: false })}
          style={{
            position: 'absolute',
            top: 120,
            right: 20,
          }}
        >
          <Toast.Header className='d-flex justify-content-between font12'>
            <strong className="mr-auto">Sign in Reminder</strong>
          </Toast.Header>
          <Toast.Body className='font12'>Please sign in to save the book in the bookshelf.</Toast.Body>
        </Toast>

      </div>
    );
  }
};

export { Home };
