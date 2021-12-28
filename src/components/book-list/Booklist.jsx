import React from 'react';
import './book-list.styles.css';
import {Book} from '../book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faBook} from '@fortawesome/free-solid-svg-icons';
import { firestore} from "../../firebase/firebase.utils";
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore"; 
import { Button } from 'react-bootstrap';

class BookList extends React.Component{
    constructor(){
        super();
        this.state ={
            books: []
        }
    };

    async componentDidMount(){
        const response = async()=> {  
            const data = await getDocs(firestore.collection("users").doc(this.props.currentUser.id).collection('books'));
            const dataBooks = data.docs.map((doc) => ({...doc.data()}));
            this.setState({
                books: dataBooks
            })
        }
        response();
    }

    render() { 
    
    let books = this.state.books;

     return( 
     
        <div>
            <h1 className="header">
                    <FontAwesomeIcon icon={faBook}></FontAwesomeIcon> Bookshelf
            </h1> 
            <div className='card-list'>   
                { books.map(
                    book =>(
                        <div>
                            <Book className="book"
                                    title={book.title} 
                                    authors={book.authors} 
                                    books={book}
                                    subject={book.subject} 
                                    genre={book.genre}
                                    background={book.background}
                                />
                            <button id="btnDelete"  >
                                delete <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>

                        </div>
                    ))}
            </div>
        </div>
     )
    }
}

export {BookList};
