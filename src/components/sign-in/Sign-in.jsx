import React from 'react';
import './sign-in.style.css';
import { Form, FormGroup, FormControl, Button} from 'react-bootstrap';

class SignIn extends React.Component{

constructor(props) {
    super(props)

        this.state = {
            email: '',
            password: ''
        };
    }  
    
    handleSubmit = event =>{
        event.preventDefault();
        this.setState({email: "", password: ""});
    };

    handleChange = event =>{
        const {value, name} = event.target;
        this.setState({[name]: value});
    };

    render(){
        return(
            <div className='sign-in'>
                
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

                <Button variant="primary" type="submit">
                    Login
                </Button>
                
                </Form>
                
            </div>
        )
    }
}

export default SignIn;