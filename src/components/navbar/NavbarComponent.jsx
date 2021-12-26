import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { faBookOpen} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavbarComponent = () => {
    return (
        <div>
          <div className='navbarBooks'>
                <Navbar bg="transparent" variant="light">
                <Container>
                <Navbar.Brand href="#home">
                  <FontAwesomeIcon icon={faBookOpen}>
                </FontAwesomeIcon></Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#features">Bookshelf</Nav.Link>
                  <Nav.Link href="#pricing">About</Nav.Link>
                </Nav>
                </Container>
              </Navbar>
           </div>
        </div>
    );
};

export default NavbarComponent;