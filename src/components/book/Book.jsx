import React from 'react';
import './book.style.css'


export const Book = (props) => (
    <div className="card-container">
        <h2> {props.books.title} </h2>
        {/* <p>{props}</p> */}
    </div>
)