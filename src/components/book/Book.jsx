import React from 'react';
import './book.style.css'

class Book extends React.Component {

    render() {

      let divStyleDetail ={ display: "none"};
      let divStyleCover ={ display: "block"};

      if(this.props.hasBtnMoreClicked){
        divStyleDetail = { display : "flex", flexDirection: "column"}
        divStyleCover = { display: "none"} 
      } 

      if(this.props.hasBtnNextClicked){
        divStyleDetail = { display : "none"}
        divStyleCover = { display: "block"} 
      } 

      return (
        <div
            className="card-container"
            style={{backgroundColor: this.props.background}}>
             
             <h2 
             style={divStyleCover}
             className='hasBtnMoreClicked'> {this.props.title} </h2>

            <div 
            style={divStyleDetail}
            className='detail'>
                <span className="detail"> {"The title: " + this.props.title} </span>
                <span className="detail">{"Authors: " + this.props.authors.name}</span>
                <span className="detail">{this.props.titleWithAuthor}</span>
                <span className="detail">{"Subject: " + this.props.subject}</span>
                <span className="detail">{"Category: " + this.props.genre}</span>
            </div>
          
             <h5
             style={divStyleCover}
             >{this.props.authors.name}</h5>
        </div>
      );

    }
  }

  export {Book};
