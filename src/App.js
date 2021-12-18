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
      genre: '',
      titleWithAuthor: '',
      background: '',
      isBtnMoreClicked: false
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
        subject: "",
        genre: "",
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
    // console.log("handleClickDetail: ", String(this.isBtnMoreClicked));
    console.log("handleClickDetail: ", this.isBtnMoreClicked);
    this.setState({
      subject: "",
      genre: "",
      titleWithAuthor: "",
      isBtnMoreClicked: false
    })
    
  }

  handleClickDetail(){

    // console.log("handleClickDetail: ", String(this.isBtnMoreClicked));
    // if(this.isBtnMoreClicked === false){
    this.setState({
      title: null,
      authors: null,
      background: this.state.background,
      titleWithAuthor: this.state.title + " by " + this.state.authors,
      subject: "Subject: " + this.state.books.subjects[0],
      genre: "Genre: " + this.state.books.bookshelves[0],
      isBtnMoreClicked: true
        }
      )
    // }else{
    //   this.setState({
    //     title: this.state.books.title,
    //     authors: this.state.books.authors[0].name,
    //     background: this.state.background,
    //     titleWithAuthor: "www",
    //     subject: "",
    //     genre: "",
    //     isBtnMoreClicked: false
    //       }
    //     )
    // }
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
    // console.log('books authors: ', authors);
    const title = this.state.title;
    // console.log('title:', title);
    const subject = this.state.subject;
    const genre = this.state.genre;
    const titleWithAuthor = this.state.titleWithAuthor;
    const background = this.state.background;
    // let background = this.generateBackground();

    return (
      <div className="App">
            <Book title={title} 
            authors={authors} 
            books={books} 
            subject={subject} 
            genre={genre}
            titleWithAuthor={titleWithAuthor}
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
