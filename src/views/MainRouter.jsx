import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from '../components/navbar/Navbar';
import Discover from './Discover';
import Bookshelf from './Bookshelf';
import Login from './Login';
import Home from './Home';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

class MainRouter extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Router basename="/booksuggester">
          <Navbar currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path="/">
              <Home currentUser={this.state.currentUser} />
            </Route>
            <Route exact path="/discover">
              <Discover currentUser={this.state.currentUser} />
            </Route>
            <Route exact path="/bookshelf">
              <Bookshelf currentUser={this.state.currentUser} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default MainRouter;