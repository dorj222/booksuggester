import { render } from '@testing-library/react';
import { Component } from 'react/cjs/react.production.min';
import './App.css';
import {BookList} from './components/book-list/Booklist' 
import {Book} from './components/book/Book'

class App extends Component{

  constructor(){
    super();

    this.state ={
      books: [],
      searchField: ''
    };
  }

  componentDidMount(){
    // randomly generate a number, such that a book will be randomly selected
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let URL = `https://gutendex.com/books/?ids=${randomNumber}`;
    
    fetch(URL)
    .then(response => response.json())
    .then(response => this.setState({books:response.results[0]}))
    // .then(response => console.log('response:', response.results[0]))
    // .then(title => this.setState({titles: title}))
  }

  handleClick() {
    console.log('this is:', this);

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let URL = `https://gutendex.com/books/?ids=${randomNumber}`;
    
    fetch(URL)
    .then(response => response.json())
    .then(response => this.setState({books:response.results[0]}))

  }
  
  render(){
    // const title = this.state.books.title;
    const books = this.state.books;
    console.log('books render: ', books);

    return (
      <div className="App">
            <Book books={books}/>
            <button onClick={() => this.handleClick()}>Next</button>
      </div>
    );
  }
}

export default App;
