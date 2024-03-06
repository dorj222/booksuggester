import React from 'react';
import './bookshelf.styles.css';
import { Book } from '../book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faInfoCircle, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { firestore } from "../../firebase/firebase.utils";
import EmptyIcon from "../../assets/svg/Empty";
import styled from "styled-components";

class Bookshelf extends React.Component {
    constructor() {
        super();
        this.state = {
            books: []
        }
    };

    async componentDidMount() {
        try {
            const snapshot = await firestore.collection("users").doc(this.props.currentUser.id).collection('books').get();
            const dataBooks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.setState({ books: dataBooks });
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    handleClickDelete(bookID) {
        const response = async () => {
            await (firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).delete()
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error("Error deleting a document: ", error);
                })
            );
        }
        response();
        this.componentDidMount()
    }

    handleClickUpdateRead(bookID, hasRead) {
        const response = async () => {
            await (firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).update({
                "hasRead": !hasRead
            })
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error("Error deleting a document: ", error);
                })
            );
        }
        response();
        this.componentDidMount()
    }

    handleClickUpdateMore(bookID, hasMoreClicked) {
        const response = async () => {
            await (firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).update({
                "hasMoreClicked": !hasMoreClicked
            })
                .then(res => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error("Error deleting a document: ", error);
                })
            );
        }
        response();
        this.componentDidMount()
    }

    render() {
        const { books } = this.state;
        return (
            <WrapperCardList>
                {this.props.currentUser && books.length > 0 ? (
                    books.map(book => (
                        <div key={book.id}>
                            <Book
                                key={book.id}
                                className="book"
                                title={book.title}
                                authors={book.authors}
                                subject={book.subject}
                                genre={book.genre}
                                background={book.background}
                                hasBtnMoreClicked={book.hasMoreClicked}
                            />
                            <button id="btnAbout" onClick={() => this.handleClickUpdateMore(book.id, book.hasMoreClicked)}>
                                <FontAwesomeIcon icon={faInfoCircle} /> more
                            </button>
                            <button id="btnDelete" onClick={() => this.handleClickDelete(book.id)}>
                                <FontAwesomeIcon icon={faTrash} /> delete
                            </button>
                            <label>
                                <FontAwesomeIcon icon={faBookmark} />  <span className="checkmark">read </span> <input type="checkbox" checked={book.hasRead} onChange={() => this.handleClickUpdateRead(book.id, book.hasRead)} />
                            </label>
                        </div>
                    ))
                ) : (
                    <WrapperMessage>
                        <div className='flexColumn flexCenter'>
                            <EmptyIcon />
                            <span className='font20'>No books found</span>
                        </div>
                    </WrapperMessage>
                )}
            </WrapperCardList>
        );
    }
}
export { Bookshelf };


const WrapperCardList = styled.nav`
    width: 75vw;
    margin: 100px auto 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start; 
    gap: 20px;
    min-height: 70vh;
`;

const WrapperMessage = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
`;
