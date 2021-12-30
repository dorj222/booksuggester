import { render } from '@testing-library/react';
import { Component } from 'react/cjs/react.production.min';
import './App.css';
import {BookList} from './components/book-list/Booklist'; 
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navbar from './components/navbar/NavbarComponent';
import {Home} from './components/home/Home';
import Login from './components/login/Login';
import {auth, createUserProfileDocument, firestore} from './firebase/firebase.utils';
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore"; 
class App extends Component{

  constructor(){
    super();

    this.state ={
      book: [],
      searchField: '',
      authors: '',
      title: '',
      subject: '',
      genre: '',
      background: '',
      hasBtnMoreClicked: false,
      hasBtnNextClicked: false,
      hasBtnSaveClicked: false,
      hasRead: false,
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  async componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: { 
                id: snapShot.id, 
              ...snapShot.data()
                }
              }
              // , ()=>{
              //    console.log(this.state.currentUser);
              // }
              );
          }); 
      }else{
        this.setState({currentUser: userAuth});
      }
      });
    this.callAPI();
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  callAPI() {
    const randomNumber = Math.floor(Math.random() * 100);
    let URL = `https://gutendex.com/books/?ids=${randomNumber}`;

    const response = async() => {fetch(URL)
      .then(response => response.json())
      .then( 
        (response) => {this.setState({ 
        book: response.results[0],
        title: response.results[0].title,
        authors: this.getAuthors(response.results[0].authors),
        subject: this.getRepsonse(response.results[0].subjects),
        genre: this.getRepsonse(response.results[0].bookshelves),
        background: this.generateBackground(),
      })
    },  (error) =>{
        this.setState({
          isLoaded: true,
          error
        });
      })
    }
    response();
  }

  getRepsonse(response) {
    let tempResponse = "";
    response.map(function(item, index){
    if(index < 2){
      item = item.replace(/--/g,'');
      if(index + 1 === response.length || index + 1 === 2){
        tempResponse = tempResponse + item;
      }else{
        tempResponse = tempResponse + item + "; ";
      }
    }
    return item;
    })
    return tempResponse;
  }
  
  getAuthors(response) {
    let fullName = "";
    fullName = response.map( function(x, index){
        const countComma = (x.name.match(/,/g) || []).length;
        if(!x.name.includes("(") && !x.name.includes(")") && (countComma === 1)){
          let nameArray = x.name.split(', ');
          if(index + 1 === response.length){
            fullName = nameArray[1] + " " + nameArray[0]; 
          }else{
            fullName = nameArray[1] + " " + nameArray[0] + ", "
          }
        }else{
          fullName = x.name;
        }
        return fullName;
      });
    return fullName;
  }

  handleClick() {
    this.callAPI();
    this.setState({
        hasBtnMoreClicked: false,
        hasBtnNextClicked: true
      })
  }

  handleClickDetail(){

    if(!this.state.hasBtnMoreClicked){
    this.setState({
      hasBtnMoreClicked: true,
      hasBtnNextClicked: false,
        }
      )}  
    else{
      this.setState({
        hasBtnMoreClicked: false,
        hasBtnNextClicked: false,
          }
        )}
  }

  handleClickSave(){
    this.setState({
      hasBtnSaveClicked: true
    });

    if(!this.state.currentUser){
      alert("Please sign in!");
      return
    }else{

     try{
     const response = async()=> {  
      firestore.collection("users").doc(this.state.currentUser.id).collection('books').add(
        {
      "title": this.state.title,
      "authors": this.state.authors,
      "subject": this.state.subject,
      "genre": this.state.genre,
      "background": this.state.background,
      "hasRead": this.state.hasRead
          }
      );}
      response();
    }catch(error){
      console.log(error);
    } }
    this.handleClick()
  }

  generateBackground() {
    let background = this.state.background;
    const getRandomInt = Math.floor(Math.random() * 100) + 155;
    const getRandomInt2 = Math.floor(Math.random() * 100) + 155;
    const getRandomInt3 = Math.floor(Math.random() * 100) + 155;
    background = `${"rgb(" + getRandomInt + "," + getRandomInt2 + "," + getRandomInt3 + ")"}`;    
    return background;
  }

  render(){
    // const title = this.state.book.title;
    const book = this.state.book;
    // console.log('book render: ', book.copyright + " " + book.languages);
    const authors = this.state.authors;
    // console.log('book authors: ', authors);
    const title = this.state.title;
    const subject = this.state.subject;
    const genre = this.state.genre;
    const background = this.state.background;
    let  hasBtnMoreClicked = this.state.hasBtnMoreClicked;
    let  hasBtnNextClicked = this.state.hasBtnNextClicked;
    let  hasBtnSaveCLicked = this.state.hasBtnSaveClicked;
    let currentUser = this.state.currentUser;

    return (
     
      <div className="App">
        <Router>
        <Navbar currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/">
            <Home
                    handleClickDetail={() => this.handleClickDetail()}
                    handleClick={() => this.handleClick()}
                    handleClickSave={()=> this.handleClickSave()}
                    title={title} 
                    authors={authors} 
                    book={book} 
                    subject={subject} 
                    genre={genre}
                    background={background}
                    hasBtnMoreClicked={hasBtnMoreClicked}
                    hasBtnNextClicked={hasBtnNextClicked}
                    hasBtnSaveCLicked={hasBtnSaveCLicked}
                />
          </Route>

          <Route exact path="/book-list">
              <BookList
                        handleClickDetail={() => this.handleClickDetail()}
                        handleClick={() => this.handleClick()}
                        hasBtnMoreClicked={hasBtnMoreClicked}
                        hasBtnNextClicked={hasBtnNextClicked}
                        hasBtnSaveCLicked={hasBtnSaveCLicked}
                        currentUser={currentUser}
              />
          </Route>

          <Route exact path="/login">
                <Login/>
          </Route>
            
        </Switch>
        </Router>
      </div>
      
    );
  }
}

export default App;
