import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { faBookOpen} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import "./navbar.style.css";

const NavbarComponent = () => {
    return (
        <div>
          <div className='navbarBooks'>
                <Navbar bg="transparent" variant="light">
                <Container>
                <Navbar.Brand as={Link} to="/">
                  <FontAwesomeIcon icon={faBookOpen}>
                </FontAwesomeIcon></Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/book-list">Bookshelf</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav>
                </Container>
              </Navbar>
           </div>
        </div>
    );
};

export default NavbarComponent;