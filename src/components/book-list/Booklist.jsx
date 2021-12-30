import React from 'react';
import './book-list.styles.css';
import {Book} from '../book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faInfoCircle, faBook,faBookmark} from '@fortawesome/free-solid-svg-icons';
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
              console.log(dataBooks);
            this.setState({
                books: dataBooks
            })
        }
        response();
    }

    handleClickDelete(bookID){
        const response = async()=> {  
            await (firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).delete()
            .then(res => {
                console.log(res);
            })
            .catch((error) =>{
                console.error("Error deleting a document: ", error);
            }) 
            );
        }
        response();
        this.componentDidMount()
    }

    handleClickUpdate(bookID, hasRead){
        const response = async()=> {  
            await (firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).update({
                "hasRead": !hasRead
            })
            .then(res => {
                console.log(res);
            })
            .catch((error) =>{
                console.error("Error deleting a document: ", error);
            }) 
            );
        }
        response();
        this.componentDidMount()
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
                       
                        <div key={book.id}>
                            <Book   key={book.id}
                                    className="book"
                                    title={book.title} 
                                    authors={book.authors} 
                                    books={book}
                                    subject={book.subject} 
                                    genre={book.genre}
                                    background={book.background}
                                />
                            <button id="btnAbout" onClick={() => this.props.handleClickDetail()} >
                             <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> more
                            </button>
                            <button id="btnDelete"  onClick={()=>this.handleClickDelete(book.id)}>
                             <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> delete
                            </button>
                   
                            <label> 
                            <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>  <span class="checkmark">read </span> <input type="checkbox" checked={book.hasRead} onClick={() => this.handleClickUpdate(book.id, book.hasRead)} /> 
                            </label>
                        </div>
                    ))}
            </div>    
        </div>
     )
    }
}
export {BookList};
