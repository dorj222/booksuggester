import React from 'react';
import './book.style.css'


export const Book = (props) => (
    <div className="card-container">
        <h3> {props.title} </h3>
        <h3>by {props.authors}</h3>
    </div>
)