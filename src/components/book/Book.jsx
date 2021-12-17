import React from 'react';
import './book.style.css'

export const Book = (props) => (
    
    <div
        className="card-container"
        style={{backgroundColor: props.background}}
    >
        <h2> {props.title} </h2>
        
        <h7>{props.titleWithAuthor}</h7>
        <h7>{props.subject}</h7>
        <h7>{props.genre}</h7>
        <h8>{props.authors}</h8>
        
    </div>
);