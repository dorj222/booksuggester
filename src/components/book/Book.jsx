import React from 'react';
import './book.style.css'

class Book extends React.Component {

    render() {

      if(this.props.hasBtnMoreClicked){

      return (
        <div
            className="card-container detail"
            style={{backgroundColor: this.props.background}}>
              <span> {"The title: " + this.props.title} </span>
              <span>{"Authors: " + this.props.authors.name}</span>
              <span>{this.props.titleWithAuthor}</span>
              <span>{"Subject: " + this.props.subject}</span>
              <span>{"Category: " + this.props.genre}</span>
        </div>
      );} 
      
      else{
        return (
          <div
              className="card-container"
              style={{backgroundColor: this.props.background}}>
              <h2> {this.props.title} </h2>
              <h5>{this.props.authors.name}</h5>
          </div>
        );
      }
    }
  }

  export {Book};
