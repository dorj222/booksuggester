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

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };
    render() {
        return (
            <SignInWrapper>
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
                    <button class="btn btn-dark" type="submit" style={{ width: '100%' }}>Login</button>
                </Form>
            </SignInWrapper>
        )
    }
}

export default withRouter(SignIn);

const SignInWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: max-content;
    text-align: start;
`;
