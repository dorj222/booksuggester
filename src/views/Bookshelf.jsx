import React from 'react';
import { Book } from '../components/book/Book';
import { firestore } from "../firebase/firebase.utils";
import EmptyIcon from "../assets/svg/Empty";
import styled from "styled-components";
import { Rating } from 'react-simple-star-rating';
import { Form, Dropdown } from 'react-bootstrap';
import Fuse from 'fuse.js'

// import svg icons
import RandomIcon from "../assets/svg/RandomIcon";
import Trash from "../assets/svg/Trash";
import Sort from "../assets/svg/Sort";
import Alphabetical from "../assets/svg/Alphabetical"
import RatingIcon from '../assets/svg/RatingIcon';
import CreatedIcon from '../assets/svg/CreatedIcon';

class Bookshelf extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            hasHoveredOver: false,
            searchQuery: '',
            filteredBooks: [],
            sort: 'Title'
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
            this.setState({ books: dataBooks, filteredBooks: dataBooks }, this.sortBooks);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    handleClickDelete = async (bookID) => {
        try {
            await firestore.collection("users").doc(this.props.currentUser.id).collection("books").doc(bookID).delete();
            const updatedBooks = this.state.books.filter(book => book.id !== bookID);
            const updatedFilteredBooks = this.state.filteredBooks.filter(book => book.id !== bookID);
            this.setState({ books: updatedBooks, filteredBooks: updatedFilteredBooks });
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

            this.setState({ books: updatedBooks });
        } catch (error) {
            console.error("Error updating a document: ", error);
        }
    };

    handleSearch = (event) => {
        const searchQuery = event.target.value;
        this.setState({ searchQuery }, () => {
            if (searchQuery.trim() === '') {
                this.setState({ filteredBooks: this.state.books });
            } else {
                const fuse = new Fuse(this.state.books, { keys: ['title'] });
                const filteredBooks = fuse.search(searchQuery).map(result => result.item);
                this.setState({ filteredBooks });
            }
        });
    };

    handleSort = (sortOption) => {
        this.setState({ sort: sortOption }, this.sortBooks);
    };

    sortBooks = () => {
        let sortedBooks = [...this.state.books]; // copy the current books array
        // update this copy based on this.state.sort
        switch (this.state.sort) {
            case 'date':
                sortedBooks.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'rating':
                sortedBooks.sort((a, b) => b.hasRated - a.hasRated);
                break;
            case 'alpha':
                sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'random':
                sortedBooks.sort(() => 0.5 - Math.random());
                break;
            default:
                // do nothing
                break;
        }
        // set the state with the sorted books
        this.setState({ filteredBooks: sortedBooks });
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
                <WrapperContainer>
                    <WrapperFilters>
                        <WrapperForm>
                            <Form>
                                <Form.Group controlId="search">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search..."
                                        className='font11'
                                        value={this.state.searchQuery}
                                        onChange={this.handleSearch}
                                    />
                                </Form.Group>
                            </Form>
                        </WrapperForm>

                        <WrapperDropdown>
                            <Dropdown variant="btn-sm">
                                <Dropdown.Toggle variant="secondary btn-sm">
                                    {<Sort />}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='font12'>
                                    <Dropdown.Item onClick={() => this.handleSort('date')} className='font12'> <CreatedIcon />  Created</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort('rating')} className='font12'> <RatingIcon />  Rating</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort('alpha')} className='font12'> <Alphabetical />  Alphabetical</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleSort('random')} className='font12'> <RandomIcon />  Random</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </WrapperDropdown>
                    </WrapperFilters>
                    <WrapperCardList>
                        {this.props.currentUser && books.length > 0 ? (
                            this.state.filteredBooks.map((book, index) => (
                                <div key={`wrapper-${index}`}>
                                    <Book
                                        key={`book-${index}`}
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
                                            <Trash />
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
                </WrapperContainer>
            );
        }
    }
}
export default Bookshelf;

const WrapperCardList = styled.div`
    width: 55vw;
    margin: 50px auto 60px;
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

const WrapperContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 120px;
`;

const WrapperStarRating = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100%; 
    gap: 20px;
`;

const WrapperFilters = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const WrapperForm = styled.div`
    width: 30%; 
`;

const WrapperDropdown = styled.div`
    margin-left: 20px;
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
