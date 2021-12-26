import React from 'react';
// import './book-list.style.css';
import {Book} from '../book/Book'
import {NavbarComponent} from '../navbar/NavbarComponent'


export const BookList = (props) => {
    return <div className='card-list'>  
      {/* {props.monsters.map( monster => (
    //   <h1 key={monster.id}>{monster.name}</h1>
        <Book key={monster.id} monster={monster}/>
      ))} */
      
      <div className="div">
          
                {/* <NavbarComponent/> */}
                <h1>Hello world!</h1>
                 {/* <Book/> */}
      </div>
     
      }
      
    </div>;
}
