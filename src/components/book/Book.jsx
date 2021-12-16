import React from 'react';
import './book.style.css'

export const Book = (props) => (
    
    <div 
        className="card-container"
        style={{ backgroundColor: 
        "rgb("+`${Math.floor(Math.random() * 100)+155}`+ 
        "," + `${Math.floor(Math.random() * 100)+155}` + 
        "," + `${Math.floor(Math.random() * 100)+155}` +")"}}
    >
        <h2> {props.title} </h2>
        <h7>{props.authors}</h7>
    </div>
);