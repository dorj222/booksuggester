import React from 'react';
import './book.style.css'

class Book extends React.Component {

  render() {

    let divStyleDetail = { display: "none" };
    let divStyleCover = { display: "block" };

    if (this.props.hasBtnMoreClicked) {
      divStyleDetail = { display: "flex", flexDirection: "column" }
      divStyleCover = { display: "none" }
    } else {
      divStyleDetail = { display: "none" }
      divStyleCover = { display: "block" }
    }

    return (
      <div className="card-container" style={{ backgroundColor: this.props.background }}>
        {this.props.title && (
          <h6 style={divStyleCover} className='hasBtnMoreClicked'> {this.props.title} </h6>
        )}
        <div style={divStyleDetail} className='detail'>
          {[
            { label: "Title", value: this.props.title },
            { label: "Authors", value: this.props.authors },
            { label: "Subject", value: this.props.subject },
            { label: "Category", value: this.props.genre },
            { label: "Language", value: "English" },
            { label: "Copyright status in the US", value: "Public domain" }
          ].map((item, index) => (
            item.value && <span key={index} className="detail">{`${item.label}: ${item.value}`}</span>
          ))}
        </div>
        {this.props.authors && (
          <span style={divStyleCover} className="font12">{this.props.authors}</span>
        )}
      </div>
    );
  }
}
export { Book };
