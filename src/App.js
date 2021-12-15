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
    const baseURL = 'https://gutendex.com/books/?ids=1';
    fetch(baseURL)
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
            <h1>{books.title}</h1>
      </div>
    );
  }
}

export default App;
