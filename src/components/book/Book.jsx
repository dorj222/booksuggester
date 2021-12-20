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
                <span className="detail"> {"Title: " + this.props.title} </span>
                <span className="detail">{"Authors: " + this.props.authors}</span>
                <span className="detail">{"Subject: " + this.props.subject}</span>
                <span className="detail">{"Category: " + this.props.genre}</span>
                <span className="detail">{"Language: " + "English"}</span>
                <span className="detail">{"Copyright status in the US: " + "Public domain"}</span>
            </div>
          
             <h5
             style={divStyleCover}
             >{this.props.authors}</h5>
        </div>
      );

    }
  }

  export {Book};
