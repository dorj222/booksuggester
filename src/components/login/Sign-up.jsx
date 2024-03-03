import React from "react";
import { Form } from 'react-bootstrap';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

class SignUp extends React.Component {
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
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        try {
            const history = this.props.history;
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            history.push("/");
        } catch (error) {
            console.error(error.message);
            if (error.message.toString().includes("auth/email-already-in-use")) {
                alert("The email address is already in use by another account.");

            }
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {

        const { displayName, email, password, confirmPassword } = this.state;

        return (
            <SignUpWrapper>
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
                            minLength="6"
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
                            minLength="6"
                            onChange={this.handleChange}
                            label="Confirm Password"
                            required
                        />
                    </Form.Group>
                    <button type="submit" class="btn btn-dark" style={{ width: '100%' }}>Sign Up</button>
                </Form>
            </SignUpWrapper>
        )
    }
}

export default withRouter(SignUp);

const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: max-content;
    text-align: start;
`;
