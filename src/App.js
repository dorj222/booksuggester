import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faHeart, faBookmark, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';
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
      authors: '',
      title: '',
      subject: '',
      genre: '',
      background: '',
      hasBtnMoreClicked: false,
      hasBtnNextClicked: false
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
        authors: this.getAuthors(response.results[0].authors),
        subject: this.getSubjects(response.results[0].subjects),
        genre: this.getGenre(response.results[0].bookshelves),
        background: this.generateBackground(),
      })
    },  (error) =>{
        this.setState({
          isLoaded: true,
          error
        });
      })
  }

  getGenre(response) {
    let tempGenre = ""
    response.map(function(item, index){
      if(index < 3){
        
        if(index + 1 === response.length || index + 1 === 3){
          tempGenre = tempGenre + item;
        }else{
          tempGenre = tempGenre  + item + ", "
        }
      }
    })
    return tempGenre;
  }

  getSubjects(subject) {
    let tempSubject = "";
    subject.map(function(item, index){
    if(index < 2){
      item = item.replace(/--/g,'');

      if(index + 1 === subject.length || index + 1 === 2){
        tempSubject = tempSubject + item;
      }else{
        tempSubject = tempSubject + item + "; ";
      }
    }
    return item;
    })
    return tempSubject;
  }

  getAuthors(response) {
    let fullName = "";
    fullName = response.map( function(x, index){
        const countComma = (x.name.match(/,/g) || []).length;
        if(!x.name.includes("(") && !x.name.includes(")") && (countComma === 1)){
          let nameArray = x.name.split(', ');
          if(index + 1 === response.length){
            fullName = nameArray[1] + " " + nameArray[0]; 
          }else{
            fullName = nameArray[1] + " " + nameArray[0] + ", "
          }
        }else{
          fullName = x.name;
        }
        return fullName;
      });
    return fullName;
  }

  handleClick() {
    this.callAPI();

      this.setState({
        hasBtnMoreClicked: false,
        hasBtnNextClicked: true
      })

  }

  handleClickDetail(){

    if(!this.state.hasBtnMoreClicked){
    this.setState({
      hasBtnMoreClicked: true,
      hasBtnNextClicked: false,
        }
      )}  
    else{
      this.setState({
        hasBtnMoreClicked: false,
        hasBtnMoreClicked: false,
          }
        )}
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
    const subject = this.state.subject;
    const genre = this.state.genre;
    const background = this.state.background;
    let  hasBtnMoreClicked = this.state.hasBtnMoreClicked;
    let  hasBtnNextClicked = this.state.hasBtnNextClicked;

    return (
      <div className="App">

            <Book
            style={this.state.showMyComponent ? {} : { display: 'none' }}
            title={title} 
            authors={authors} 
            books={books} 
            subject={subject} 
            genre={genre}
            background={background}
            hasBtnMoreClicked={hasBtnMoreClicked}
            hasBtnNextClicked={hasBtnNextClicked}
            />

            <div className='btnContainer'>

                <button id="btnAbout" onClick={() => this.handleClickDetail()} >
                    more <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                </button>

                <button id="btnBookMark">
                    save <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                </button>

                <button id="btnNext" onClick={() => this.handleClick()}>
                    next <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
                 </button>

            </div>
      </div>
    );
  }
}

export default App;
