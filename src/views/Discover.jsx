import React from 'react';
import { Book } from '../components/book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faHeart } from '@fortawesome/free-solid-svg-icons';
import { firestore } from "../firebase/firebase.utils";
import { Toast, Spinner } from 'react-bootstrap';
import styled from 'styled-components';

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
      isLoading: false
    };
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

  selectRandomBook() {
    if (this.state.books.length > 0) {
      const randomBookIndex = Math.floor(Math.random() * this.state.books.length);
      const bookData = this.state.books[randomBookIndex];
      const remainingBooks = this.state.books.filter((book, index) => index !== randomBookIndex);
      this.setState({
        book: bookData,
        title: this.getTitleName(bookData.title),
        authors: this.getAuthors(bookData.authors),
        subject: this.getRepsonse(bookData.subjects),
        genre: this.getRepsonse(bookData.bookshelves),
        background: this.generateBackground(),
        books: remainingBooks,
        isLoading: false,
      }, () => {
        // checking if there are no more books left in the state
        if (this.state.books.length === 0) {
          // if so, fetch a new set of books
          this.callAPI();
        }
      });
    }
  }

  callAPI() {
    this.setState({ isLoading: true });
    if (this.state.books && this.state.books.length > 0) {
      this.selectRandomBook();
    } else {
      const fetchRandomPage = () => {
        const randomPageNumber = Math.floor(Math.random() * 1000) + 1;
        let URL = `https://gutendex.com/books/?author_year_start=0&languages=en&page=${randomPageNumber}`;
        fetch(URL, { signal: this.abortController.signal })
          .then(response => response.json())
          .then(
            (response) => {
              if (response && response.results && response.results.length > 0) {
                // Save all the books in the React state.
                this.setState({ books: response.results }, this.selectRandomBook);
              } else {
                // Recall the API if no results are found.
                fetchRandomPage();
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
      fetchRandomPage();
    }
  }

  getTitleName(response) {
    if (response) {
      return response;
    }
    else {
      return "";
    }
  }

  getRepsonse(response) {
    let tempResponse = "";
    response.map(function (item, index) {
      if (index < 2) {
        item = item.replace(/--/g, '');
        if (index + 1 === response.length || index + 1 === 2) {
          tempResponse = tempResponse + item;
        } else {
          tempResponse = tempResponse + item + "; ";
        }
      }
      return item;
    })
    return tempResponse;
  }

  getAuthors(response) {
    let fullName = "";
    fullName = response.map(function (x, index) {
      const countComma = (x.name.match(/,/g) || []).length;
      if (!x.name.includes("(") && !x.name.includes(")") && (countComma === 1)) {
        let nameArray = x.name.split(', ');
        if (index + 1 === response.length) {
          fullName = nameArray[1] + " " + nameArray[0];
        } else {
          fullName = nameArray[1] + " " + nameArray[0] + ", "
        }
      } else {
        fullName = x.name;
      }
      return fullName;
    });
    return fullName;
  }

  generateBackground() {
    let background = this.state.background;
    const getRandomInt = Math.floor(Math.random() * 100) + 155;
    const getRandomInt2 = Math.floor(Math.random() * 100) + 155;
    const getRandomInt3 = Math.floor(Math.random() * 100) + 155;
    background = `${"rgb(" + getRandomInt + "," + getRandomInt2 + "," + getRandomInt3 + ")"}`;
    return background;
  }

  render() {
    return (
      <HomeContainer>
        <Book
          title={this.state.title}
          authors={this.state.authors}
          subject={this.state.subject}
          genre={this.state.genre}
          background={this.state.background}
          isLoading={this.isLoading}
        />

        <ButtonContainer>
          <Button id="btnBookMark" onClick={() => this.handleClickSave()}>
            {this.state.isLoading ? <Spinner animation="border" size="sm" /> : <>save <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon></>}
          </Button>
          <Button id="btnNext" onClick={() => this.handleClickNext()} disabled={this.state.isLoading}>
            {this.state.isLoading ? <Spinner animation="border" size="sm" /> : <>next <FontAwesomeIcon icon={faForward}></FontAwesomeIcon></>}
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
  margin-top: 20px;
`;

const Button = styled.button`
  margin-right: 5px;
  border: none;
  border-radius: 10px;
  color: black;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin: 4px 10px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    transition: 0.2s ease-in-out;
    text-decoration: underline;
  }
`;

export default Discover;