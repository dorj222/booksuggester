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
            showAlert: false // Add state variable for controlling the alert
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
                confirmPassword: '',
                showAlert: false // Reset showAlert state
            });
            history.push("/");
        } catch (error) {
            console.error(error.message);
            if (error.message.toString().includes("auth/email-already-in-use")) {
                this.setState({ showAlert: true }); // Show the alert for email already in use
            }
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword, showAlert } = this.state;

        return (
            <SignUpWrapper>
                <TitleWrapper>
                    <h5>Sign Up</h5>
                </TitleWrapper>
                <Form className='font11' onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='font11'>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="displayName"
                            label="Display Name"
                            placeholder="Username"
                            value={displayName}
                            onChange={this.handleChange}
                            className='font11'
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='font11'>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            label="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={this.handleChange}
                            className='font11'
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='font11'>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            minLength="6"
                            onChange={this.handleChange}
                            className='font11'
                            label="password"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='font11'>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            minLength="6"
                            onChange={this.handleChange}
                            className='font11'
                            label="Confirm Password"
                            required
                        />
                    </Form.Group>
                    <button type="submit" className="btn btn-dark font11" style={{ width: '100%' }}>Sign Up</button>
                </Form>
                <AlertWrapper>
                    {showAlert && (
                        <div className="alert alert-danger font11" role="alert">
                            The email address is already in use by another account.
                        </div>
                    )}
                </AlertWrapper>
            </SignUpWrapper>
        )
    }
}

export default withRouter(SignUp);

const SignUpWrapper = styled.div`
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