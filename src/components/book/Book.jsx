import React, { Component } from 'react';
import './book.style.css';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false
    };
  }

  toggleHoverState(state) {
    return { showInfo: !state.showInfo }
  }

  render() {
    const { title, background, authors, subject, genre } = this.props;
    const { showInfo } = this.state;

    return (
      <div 
        className="card-container" 
        style={{ backgroundColor: background }}
        onMouseEnter={() => this.setState(this.toggleHoverState)}
        onMouseLeave={() => this.setState(this.toggleHoverState)}
      > 
        {!showInfo ? (
          <>
            <h6>{title}</h6>
            <span className="font12">{authors}</span>
          </>
        ) : (
          <div className='detail'>
            {[
              { label: "Title", value: title },
              { label: "Authors", value: authors },
              { label: "Subject", value: subject },
              { label: "Category", value: genre },
            ].map((item, index) => (
              item.value && <span key={index} className="detail">{`${item.label}: ${item.value}`}</span>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export { Book };