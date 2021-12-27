import React from 'react';
import './book-list.styles.css';
import {Book} from '../book/Book';
import {Home} from '../home/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBook} from '@fortawesome/free-solid-svg-icons';


class BookList extends React.Component{
    
    render() { 
     return( 
      <div>
            <h1 className="header">
                <FontAwesomeIcon icon={faBook}></FontAwesomeIcon> Bookshelf
            </h1>
            
            <div className="card-list">

           
            <Book className="book"
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={this.props.background}
                />
            <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={"cherry"}
                />
            <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={"teal"}
                />
             <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={"pink"}
                />
            <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={"white"}
                />
            <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={"grey"}
                />
             <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={this.props.background}
                />
            <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={this.props.background}
                />
            <Book 
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={this.props.background}
                />

              </div>
      </div>
     )
    }
}

export {BookList};
