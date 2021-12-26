import React from 'react';
import {Book} from '../book/Book'
import './home.style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faHeart, faBookmark, faInfoCircle, faBookOpen} from '@fortawesome/free-solid-svg-icons';

class Home extends React.Component {

    render() {

        return (
            <div>
                <div className="homeContainer">  
                    <Book
                    title={this.props.title} 
                    authors={this.props.authors} 
                    books={this.props.books} 
                    subject={this.props.subject} 
                    genre={this.props.genre}
                    background={this.props.background}
                    hasBtnMoreClicked={this.props.hasBtnMoreClicked}
                    hasBtnNextClicked={this.props.hasBtnNextClicked}
                    />

                    <div className='btnContainer'>
                        <button id="btnAbout" onClick={() => this.props.handleClickDetail()} >
                            more <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                        </button>
                        <button id="btnBookMark">
                            save <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </button>
                        <button id="btnNext" onClick={() => this.props.handleClick()}>
                            next <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
                        </button>
                    </div>
                </div>

            </div>
        );
    } 
};

export {Home};