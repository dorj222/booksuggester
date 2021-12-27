import { render } from '@testing-library/react';
import { Component } from 'react/cjs/react.production.min';
import './App.css';
import {BookList} from './components/book-list/Booklist'; 
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navbar from './components/navbar/NavbarComponent';
import {Home} from './components/home/Home';
import Login from './components/login/Login';

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
    const randomNumber = Math.floor(Math.random() * 100);
    let URL = `https://gutendex.com/books/?ids=${randomNumber}`;

    fetch(URL)
      .then(response => response.json())
      .then( 
        (response) => {this.setState({ 
        books: response.results[0],
        title: response.results[0].title,
        authors: this.getAuthors(response.results[0].authors),
        subject: this.getRepsonse(response.results[0].subjects),
        genre: this.getRepsonse(response.results[0].bookshelves),
        background: this.generateBackground(),
      })
    },  (error) =>{
        this.setState({
          isLoaded: true,
          error
        });
      })
  }

  getRepsonse(response) {
    let tempResponse = "";
    response.map(function(item, index){
    if(index < 2){
      item = item.replace(/--/g,'');
      if(index + 1 === response.length || index + 1 === 2){
        tempResponse = tempResponse + item;
      }else{
        tempResponse = tempResponse + item + "; ";
      }
    }
    return item;
    })
    return tempResponse;
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
        hasBtnNextClicked: false,
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
    // console.log('books render: ', books.copyright + " " + books.languages);
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
        <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home
                    handleClickDetail={() => this.handleClickDetail()}
                    handleClick={() => this.handleClick()}
                    title={title} 
                    authors={authors} 
                    books={books} 
                    subject={subject} 
                    genre={genre}
                    background={background}
                    hasBtnMoreClicked={hasBtnMoreClicked}
                    hasBtnNextClicked={hasBtnNextClicked}
                />
          </Route>

          <Route exact path="/book-list">
              <BookList
                        handleClickDetail={() => this.handleClickDetail()}
                        handleClick={() => this.handleClick()}
                        title={title} 
                        authors={authors} 
                        books={books} 
                        subject={subject} 
                        genre={genre}
                        background={background}
                        hasBtnMoreClicked={hasBtnMoreClicked}
                        hasBtnNextClicked={hasBtnNextClicked}
              />
          </Route>

          <Route exact path="/login">
                <Login/>
          </Route>
            
        </Switch>
        </Router>
      </div>
      
    );
  }
}

export default App;
