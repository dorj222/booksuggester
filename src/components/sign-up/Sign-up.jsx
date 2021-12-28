import React from "react";
import './sign-up.style.css';
import { Form, FormGroup, FormControl, Button, InputGroup} from 'react-bootstrap';
import {signInWithGoogle} from '../../firebase/firebase.utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import { RouteComponentProps } from 'react-router';
import { useHistory, withRouter, Redirect } from "react-router-dom";

class SignUp extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit = async event => {

        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("Passwords don't match!");
            return;
        }
        try{
            const history = this.props.history;
            const{ user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {displayName});
            this.setState ({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            history.push("/");
        } catch(error){
            console.error(error.message);
            if(error.message.toString().includes("auth/email-already-in-use")){
               alert("The email address is already in use by another account.");
               
            }
        }
    };

    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render(){

        const {displayName, email, password, confirmPassword} = this.state;

        return(
            <div className="signUp">
                
                <h3>Sign Up</h3>
                <Form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                            type="text" 
                            name="displayName" 
                            label="Display Name"
                            placeholder="Username" 
                            value={displayName} 
                            onChange={this.handleChange}  
                            required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                            type="email" 
                            name="email" 
                            label="email"
                            placeholder="Enter email" 
                            value={email} 
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
                             value={password} 
                             minlength="6"
                             onChange={this.handleChange}
                             label="password"  
                             required  
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                             type="password" 
                             name="confirmPassword" 
                             placeholder="Confirm Password" 
                             value={confirmPassword} 
                             minlength="6"
                             onChange={this.handleChange}
                             label="Confirm Password"  
                             required  
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit" id="btnRegister"> 
                    Register 
                </Button>


                </Form>
            </div>
        )
    }
}

export default withRouter(SignUp);
