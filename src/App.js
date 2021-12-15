import { render } from '@testing-library/react';
import { Component } from 'react/cjs/react.production.min';
import './App.css';

class App extends Component{

  constructor(){
    super();

    this.state ={
      books: [],
      titles: {},
      searchField: ''
    };
  }

  componentDidMount(){
    // randomly generate a number, such that a book will be randomly selected
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let URL = `https://gutendex.com/books/?ids=${randomNumber}`;
    
    fetch(URL)
    .then(response => response.json())
    .then(response => this.setState({books:response.results[0]}))
    // .then(response => console.log('response:', response.results[0].title))
    // .then(title => this.setState({titles: title}))
  }
  
  render(){
    // const title = this.state.books.title;
    const books = this.state.books;
    console.log('books render: ', books);

    return (
      <div className="App">
            <h5>{books.title}</h5>
      </div>
    );
  }
}

export default App;
