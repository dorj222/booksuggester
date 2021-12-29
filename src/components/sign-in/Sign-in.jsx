import React from 'react';
import './sign-in.style.css';
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap';
import {auth, signInWithGoogle} from '../../firebase/firebase.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { useHistory, withRouter, Redirect } from "react-router-dom";
import { RouteComponentProps } from 'react-router';

class SignIn extends React.Component{

constructor(props) {
    super(props)

        this.state = {
            email: '',
            password: ''
        };
    }  
    
    handleSubmit = async event => {
        event.preventDefault();
        const history = this.props.history;
        const { email, password } = this.state;
        try {
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({ email: '', password: '' });
          history.push("/");
        } catch (error) {
          console.log(error);
          alert("The email or password are incorrect.")
        }
      };
    
    handleChange = event =>{
        const {value, name} = event.target;
        this.setState({[name]: value});
    };

    handleSubmitGoogle = async event =>{
        // event.preventDefault();
        // const history = this.props.history;
        // await signInWithGoogle();
        // console.log("event: ", event.authResponse)
            // history.push("/");
    };

    render(){
        return(
            <div className='sign-in'>
                <h3>Sign In</h3>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                            type="email" 
                            name="email" 
                            label="email"
                            placeholder="Enter email" 
                            value={this.state.email} 
                            onChange={this.handleChange}  
                            required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                             type="password" 
                             name="password" 
                             placeholder="Enter password" 
                             value={this.state.password} 
                             onChange={this.handleChange}
                             label="password"  
                             required  
                    />
                </Form.Group>

                <Button variant="primary" type="submit" id="btnLogin"> 
                    Login 
                </Button>

                {/* <Button variant="primary" onClick={this.handleSubmitGoogle}>
                 Continue with Google
                </Button> */}

                </Form>
                
            </div>
        )
    }
}

export default withRouter(SignIn);