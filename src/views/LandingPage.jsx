import React, { Component } from 'react';
import { Bookshelf } from '../components/bookshelf/Bookshelf';
import Navbar from '../components/navbar/Navbar';
import { Home } from '../components/home/Home';
import Login from '../components/login/Login';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            book: [],
            authors: '',
            title: '',
            subject: '',
            genre: '',
            background: '',
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    async componentDidMount() {
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
        this.callAPI();
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    callAPI() {
        const randomNumber = Math.floor(Math.random() * 1000);
        let URL = `https://gutendex.com/books/?ids=${randomNumber}`;

        const response = async () => {
            fetch(URL)
                .then(response => response.json())
                .then(
                    (response) => {
                        this.setState({
                            book: response.results[0],
                            title: this.getTitleName(response.results[0].title),
                            authors: this.getAuthors(response.results[0].authors),
                            subject: this.getRepsonse(response.results[0].subjects),
                            genre: this.getRepsonse(response.results[0].bookshelves),
                            background: this.generateBackground(),
                        })
                    }, (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    })
        }
        response();
    }

    getTitleName(response) {
        if (response) {
            return response;
        }
        else {
            return "";
        }
    }

    getRepsonse(response) {
        let tempResponse = "";
        response.map(function (item, index) {
            if (index < 2) {
                item = item.replace(/--/g, '');
                if (index + 1 === response.length || index + 1 === 2) {
                    tempResponse = tempResponse + item;
                } else {
                    tempResponse = tempResponse + item + "; ";
                }
            }
            return item;
        })
        return tempResponse;
    }

    getAuthors(response) {
        let fullName = "";
        fullName = response.map(function (x, index) {
            const countComma = (x.name.match(/,/g) || []).length;
            if (!x.name.includes("(") && !x.name.includes(")") && (countComma === 1)) {
                let nameArray = x.name.split(', ');
                if (index + 1 === response.length) {
                    fullName = nameArray[1] + " " + nameArray[0];
                } else {
                    fullName = nameArray[1] + " " + nameArray[0] + ", "
                }
            } else {
                fullName = x.name;
            }
            return fullName;
        });
        return fullName;
    }

    generateBackground() {
        let background = this.state.background;
        const getRandomInt = Math.floor(Math.random() * 100) + 155;
        const getRandomInt2 = Math.floor(Math.random() * 100) + 155;
        const getRandomInt3 = Math.floor(Math.random() * 100) + 155;
        background = `${"rgb(" + getRandomInt + "," + getRandomInt2 + "," + getRandomInt3 + ")"}`;
        return background;
    }

    render() {
        return (
            <div>
                <Router basename="/booksuggester">
                    <Navbar currentUser={this.state.currentUser} />
                    <Switch>
                        <Route exact path="/">
                            <Home className="homeContainer"
                                currentUser={this.state.currentUser}
                                callAPI={() => this.callAPI()}
                                title={this.state.title}
                                authors={this.state.authors}
                                subject={this.state.subject}
                                genre={this.state.genre}
                                background={this.state.background}
                            />
                        </Route>

                        <Route exact path="/bookshelf">
                            <Bookshelf
                                currentUser={this.state.currentUser}
                            />
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

export default LandingPage;
