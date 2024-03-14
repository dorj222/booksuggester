import React from 'react';
import { Book } from '../components/book/Book';
import Forward from "../assets/svg/Forward";
import Floppy from "../assets/svg/Floppy";
import Gear from "../assets/svg/Gear"
import { firestore } from "../firebase/firebase.utils";
import { Toast, Spinner } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import config from '../config';

// Import Discover components
import GetTitleName from '../components/discover/GetTitleName';
import GetResponse from '../components/discover/GetResponse';
import GetAuthors from '../components/discover/GetAuthors';
import GenerateBackground from '../components/discover/GenerateBackground';
import Button from '../components/discover/DiscoverButton'
import SettingsModal from '../components/discover/SettingsModal';

import BookContainer from '../components/book/BookContainer';

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      showToast: false,
      book: [],
      books: [],
      authors: '',
      title: '',
      subject: '',
      genre: '',
      background: '',
      isLoading: false,
      showModal: false,
      author_year_start: 1700,
      author_year_end: 1800,
      topics: 'All'
    };
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.abortController = new AbortController();
    this.callAPI();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.abortController.abort();
  }

  handleClickNext() {
    this.callAPI();
  }

  handleDropdownPeriods = (start, end) => {
    this.setState({
      author_year_start: start,
      author_year_end: end
    });
  }

  handleDropdownTopics = (topic) => {
    this.setState({
      topics: topic
    });
  }


  handleClickSave() {
    if (!this.props.currentUser) {
      this.setState({ showToast: true });
      return;
    }
    else {
      try {
        const response = async () => {
          if (this._isMounted) {
            firestore.collection("users").doc(this.props.currentUser.id).collection('books').add(
              {
                "title": this.state.title,
                "authors": this.state.authors,
                "subject": this.state.subject,
                "genre": this.state.genre,
                "background": this.state.background,
                "hasRated": false,
                "createAt": Date()
              }
            );
          }
        }
        response();
        this.handleClickNext()
      } catch (error) {
        console.log(error);
      }
    }
  }

  submitForm = async (event) => {
    event.preventDefault();
    this.setState({ book: [], books: [] }, async () => {
      await this.callAPI();
      this.setState({ showModal: false });
    });
  };

  callAPI = async () => {
    this.setState({ isLoading: true });
    if (this.state.books && this.state.books.length > 0) {
      this.selectRandomBook();
    } else {
      await this.fetchRandomPage();
    }
  }

  fetchRandomPage = async () => {
    const topicParam = this.state.topics === 'All' ? '' : `topic=${this.state.topics}&`;
    const pageNumber = this.state.topics === 'All' ? Math.floor(Math.random() * 15) : 1;

    const URL = `${config.baseUrl}?` +
      `author_year_start=${this.state.author_year_start}&` +
      `author_year_end=${this.state.author_year_end}&` +
      topicParam +
      `page=${pageNumber}`;

    fetch(URL, { signal: this.abortController.signal })
      .then(response => response.json())
      .then(
        (response) => {
          if (response && response.results && response.results.length > 0) {
            // Save all the books in the React state.
            this.setState({ books: response.results }, this.selectRandomBook);
          } else {
            // Recall the API if no results are found.
            this.fetchRandomPage();
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  selectRandomBook() {
    if (this.state.books.length > 0) {
      const randomBookIndex = Math.floor(Math.random() * this.state.books.length);
      const bookData = this.state.books[randomBookIndex];
      const remainingBooks = this.state.books.filter((book, index) => index !== randomBookIndex);
      this.setState({
        book: bookData,
        title: GetTitleName(bookData.title),
        authors: GetAuthors(bookData.authors),
        subject: GetResponse(bookData.subjects),
        genre: GetResponse(bookData.bookshelves),
        background: GenerateBackground(),
        books: remainingBooks,
        isLoading: false,
      }, () => {
        // checking if there are no more books left in the state
        if (this.state.books.length === 0) {
          this.setState({ topics: "All" }, async () => {
            await this.callAPI();
          });
        }
      });
    }
  }

  render() {
    return (
      <HomeContainer>
        {this.state.isLoading ?
          <BookContainer>
            <SpinnerBook />
          </BookContainer>
          : (
            <Book
              title={this.state.title}
              authors={this.state.authors}
              subject={this.state.subject}
              genre={this.state.genre}
              background={this.state.background}
              isLoading={this.isLoading}
            />
          )}

        <ButtonContainer>
          <Button onClick={() => this.setState({ showModal: true })}>
            {this.state.isLoading ? <Spinner /> : <div className='font13'> <Gear /> Settings</div>}
          </Button>
          <Button id="btnBookMark" onClick={() => this.handleClickSave()}>
            {this.state.isLoading ? <Spinner /> : <div className='font13'> <Floppy /> Save</div>}
          </Button>
          <Button id="btnNext" onClick={() => this.handleClickNext()} disabled={this.state.isLoading}>
            {this.state.isLoading ? <Spinner /> : <div className='font13'> <Forward /> Next</div>}
          </Button>
        </ButtonContainer>

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

        <SettingsModal
          showModal={this.state.showModal}
          authorYearStart={this.state.author_year_start}
          authorYearEnd={this.state.author_year_end}
          topics={this.state.topics}
          handleDropdownPeriods={this.handleDropdownPeriods}
          handleDropdownTopics={this.handleDropdownTopics}
          submitForm={this.submitForm}
        />

      </HomeContainer>
    );
  }
};

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerBook = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #333;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spinAnimation} 1s linear infinite;
`;

export default Discover;