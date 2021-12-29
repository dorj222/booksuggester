import React from 'react';
import './book-list.styles.css';
import {Book} from '../book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faInfoCircle,faBook} from '@fortawesome/free-solid-svg-icons';
import { firestore} from "../../firebase/firebase.utils";
import { doc, setDoc, deleteDoc, getDocs, addDoc } from "firebase/firestore"; 
import { Button } from 'react-bootstrap';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { type } from '@testing-library/user-event/dist/type';

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
            let dataKeys = data.docs.map((doc) => ({...doc.id}));
            let tempArray = [];
            
            dataKeys.map( function(x){
                let temp = "";
                for (const [key, value] of Object.entries(x)) {
                    temp = temp + `${value}`;
                  }
                tempArray.push(temp)     
                return temp;
            });

            for (const [key, value] of Object.entries(dataBooks)) {
                for(let key2 = 0; key2 < tempArray.length; key2++){
                    if(key2 === parseInt(key)){
                        let tempObject = {};
                        tempObject["id"] = tempArray[key2];
                        tempObject = {...value, ...tempObject}; 
                        dataBooks[key] = tempObject;
                    }
                } }
            //   console.log(dataBooks);
            this.setState({
                books: dataBooks
            })
        }
        response();
    }

    handleClickDelete(book){
            // alert("Yes it works");
            // console.log(book);
            // const response = async()=> {  
            // deleteDoc(firestore.collection("users").doc(this.props.currentUser.id).collection('books'), );
            // }
            //   response();
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
                            <button id="btnAbout" onClick={() => this.props.handleClickDetail()} >
                                more <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                            </button>
                            <button id="btnDelete"  onClick={this.handleClickDelete(book)}>
                                delete <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                            <button id="btnRead"  >
                                read <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                            </button>

                        </div>
                    ))}
            </div>
           
        </div>
     )
    }
}

export {BookList};
