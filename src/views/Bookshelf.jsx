import React from 'react';
import { Book } from '../components/book/Book';
import Trash from "../assets/svg/Trash";
import { firestore } from "../firebase/firebase.utils";
import EmptyIcon from "../assets/svg/Empty";
import styled from "styled-components";
import { Rating } from 'react-simple-star-rating';

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
                data.hasRated = data.hasRated || 0;
                return { id: doc.id, ...data };
            });
            this.setState({ books: dataBooks });
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    handleClickDelete = async (bookID) => {
        try {
            await firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).delete();

            const updatedBooks = this.state.books.filter(book => book.id !== bookID);

            this.setState({ books: updatedBooks });
        } catch (error) {
            console.error("Error deleting a document: ", error);
        }
    };

    handleClickUpdateRead = async (bookID, rating) => {
        try {
            await firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).update({
                "hasRated": rating
            });

            const updatedBooks = this.state.books.map(book =>
                book.id === bookID ? { ...book, hasRated: rating } : book
            );

            this.setState({ books:updatedBooks });
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
                                        <Rating
                                            onClick={(rate) => this.handleClickUpdateRead(book.id, rate)}
                                            ratingValue={book.hasRated}
                                            initialValue={book.hasRated}
                                            size={"28px"}
                                        />
                                    </HoverableStarRating>
                                    <DeleteIcon onClick={() => this.handleClickDelete(book.id)} >
                                        <Trash/>
                                    </DeleteIcon>
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

const WrapperCardList = styled.div`
    width: 55vw;
    margin: 100px auto 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 40px;
    min-height: 70vh;
`;

const WrapperMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
`;

const WrapperStarRating = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100%; 
    gap: 20px;
`;

const DeleteIcon = styled.div`
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