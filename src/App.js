import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faHeart, faBookmark, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';
// import { Button } from 'bootstrap';
import Button from 'react-bootstrap/Button';
import { Component } from 'react/cjs/react.production.min';
import './App.css';
import {BookList} from './components/book-list/Booklist'; 
import {Book} from './components/book/Book';


class App extends Component{

  constructor(){
    super();

    this.state ={
      books: [],
      searchField: '',
      authors: [],
      title: '',
      subject: '',
      subjectTemp: '',
      genre: '',
      genreTemp: '',
      titleWithAuthor: '',
      titleWithAuthorTemp: '',
      background: ''
    };
  }

  componentDidMount(){
    this.callAPI();
  }

  callAPI() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let URL = `https://gutendex.com/books/?ids=${randomNumber}`;

    fetch(URL)
      .then(response => response.json())
      .then( 
        (response) => {this.setState({ 
        books: response.results[0],
        title: response.results[0].title,
        authors: response.results[0].authors[0].name,
        subject: response.results[0].subjects,
        genre: response.results[0].bookshelves,
        background: this.generateBackground()
      })
    }, 
      (error) =>{
        this.setState({
          isLoaded: true,
          error
        });
      })
  }



  handleClick() {
    this.callAPI();
    this.setState({
      subjectTemp: "",
      genreTemp: "",
      titleWithAuthorTemp: ""
    })
  }

  handleClickDetail(){
    this.setState({
      title: null,
      authors: null,
      background: this.state.background,
      titleWithAuthorTemp: this.state.title + " by " + this.state.authors,
      subjectTemp: "Subject: " + this.state.subject[0],
      genreTemp: "Genre: " + this.state.genre
    }
    )
  }

  generateBackground() {
    let background = this.state.background;
    const getRandomInt = Math.floor(Math.random() * 100) + 155;
    const getRandomInt2 = Math.floor(Math.random() * 100) + 155;
    const getRandomInt3 = Math.floor(Math.random() * 100) + 155;
    background = `${"rgb(" + getRandomInt + "," + getRandomInt2 + "," + getRandomInt3 + ")"}`;    
    return background;
  }
  
  render(){
    // const title = this.state.books.title;
    const books = this.state.books;
    console.log('books render: ', books);
    const authors = this.state.authors;
    console.log('books authors: ', authors);
    const title = this.state.title;
    console.log('title:', title);
    const subjectTemp = this.state.subjectTemp;
    const genreTemp = this.state.genreTemp;
    const titleWithAuthorTemp = this.state.titleWithAuthorTemp;
    const background = this.state.background;
    // let background = this.generateBackground();

    return (
      <div className="App">
            <Book title={title} 
            authors={authors} 
            books={books} 
            subject={subjectTemp} 
            genre={genreTemp}
            titleWithAuthor={titleWithAuthorTemp}
            background={background}
            />
            {/* <Detail title={title} authors={authors} books={books}/> */}
            <div className='btnContainer'>
                <button id="btnAbout" onClick={() => 
                  this.handleClickDetail()
                  // <Detail title={title} authors={authors} books={books}/>
                }>
                    
                    more <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                </button>

                <button id="btnBookMark">
                    
                    save <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </button>

                <button id="btnNext" onClick={() => 
                  this.handleClick()}>
                    next <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
                </button>
            </div>
      </div>
    );
  }

}

export default App;
