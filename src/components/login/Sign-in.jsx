import React from 'react';
import { Form } from 'react-bootstrap';
import { auth } from '../../firebase/firebase.utils';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: '' 
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '', showAlert: true }); // Show the alert on successful login
            this.props.history.push("/");
        } catch (error) {
            console.log(error);
            this.setState({ errorMessage: "Invalid email or password!", showAlert: true });
        }
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };
    render() {
        return (
            <SignInWrapper className='font12'>
                <TitleWrapper>
                    <h4>Sign In</h4>
                </TitleWrapper>
                <Form className='font12' onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label >Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            label="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className='font12'
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
                            className='font12'
                            label="password"
                            required
                        />
                    </Form.Group>
                    <button className="btn btn-dark font12" type="submit" style={{ width: '100%' }}>Login</button>
                </Form>
                {this.state.showAlert && (
                    <AlertWrapper className="alert alert-danger font12" role="alert">
                       {this.state.errorMessage}
                    </AlertWrapper>
                )}
            </SignInWrapper>
        )
    }
}

export default withRouter(SignIn);

const SignInWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: start;
`;

const AlertWrapper = styled.div`
    margin-top: 20px;
    max-width: 100%;
`;

const TitleWrapper = styled.div`
    text-align: center;
`;