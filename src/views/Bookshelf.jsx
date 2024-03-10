import React from 'react';
import { Book } from '../components/book/Book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { firestore } from "../firebase/firebase.utils";
import EmptyIcon from "../assets/svg/Empty";
import styled from "styled-components";
import StarRatingComponent from 'react-star-rating-component';


class Bookshelf extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            hasHoveredOver: false,
        }
    };

    async componentDidMount() {
        try {
            if (!this.props.currentUser) {
                return;
            }
            const snapshot = await firestore.collection("users").doc(this.props.currentUser.id).collection('books').get();
            const dataBooks = snapshot.docs.map(doc => {
                const data = doc.data();
                data.hasRead = data.hasRead || 0; // add this line.
                return { id: doc.id, ...data };
            });
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

    handleClickUpdateRead = async (bookID, rating) => {
        try {
            await firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).update({
                "hasRead": rating
            });

            const books = this.state.books.map(book =>
                book.id === bookID ? { ...book, hasRead: rating } : book
            );

            this.setState({ books });
        } catch (error) {
            console.error("Error updating a document: ", error);
        }
    };

    render() {
        const { books } = this.state;
        if (!this.props.currentUser) {
            return (
                <WrapperCardList>
                    <WrapperMessage>
                        <div className='flexColumn flexCenter'>
                            <EmptyIcon />
                            <span className='font20'>No books found</span>
                        </div>
                    </WrapperMessage>
                </WrapperCardList>
            )
        }
        else {
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
                                />
                                <WrapperStarRating>
                                    <HoverableStarRating>
                                        <StarRatingComponent className="starRating"
                                            name={"rate" + book.id}
                                            starCount={5}
                                            value={book.hasRead}
                                            starColor="#ffd700"
                                            emptyStarColor={"grey"}
                                            onStarClick={(nextValue) => this.handleClickUpdateRead(book.id, nextValue)}
                                        />
                                    </HoverableStarRating>
                                    <DeleteIcon icon={faTrash} onClick={() => this.handleClickDelete(book.id)} />
                                </WrapperStarRating>
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
}
export default Bookshelf;

const WrapperCardList = styled.nav`
    width: 55vw;
    margin: 100px auto 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 40px;
    min-height: 70vh;
`;

const WrapperMessage = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
`;

const WrapperStarRating = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100%; 
    gap: 20px;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #ff0000;
        opacity: 0.7;
    }
`;

const HoverableStarRating = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.3s;
    color: white;
    &:hover {
        opacity: 0.7;
    }
`;