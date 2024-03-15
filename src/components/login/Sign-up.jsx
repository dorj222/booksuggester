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
            emailExists: false,
            passWordMismatch: false
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ passWordMismatch: false, emailExists: false})
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            this.setState({ passWordMismatch: true});
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
                emailExists: false,
                passWordMismatch: false
            });
            history.push("/");
        } catch (error) {
            console.error(error.message);
            if (error.message.toString().includes("auth/email-already-in-use")) {
                this.setState({ emailExists: true });
            }
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confirmPassword, emailExists, passWordMismatch } = this.state;

        return (
            <SignUpWrapper>
                <TitleWrapper>
                    <h5>Sign Up</h5>
                </TitleWrapper>
                <Form className='font12' onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='font12'>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="displayName"
                            label="Display Name"
                            placeholder="Username"
                            value={displayName}
                            onChange={this.handleChange}
                            className='form-control-sm' 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='font12'>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            label="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={this.handleChange}
                            className='form-control-sm' 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='font12'>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            minLength="6"
                            onChange={this.handleChange}
                            className='form-control-sm' 
                            label="password"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className='font12'>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            minLength="6"
                            onChange={this.handleChange}
                            className='form-control-sm' 
                            label="Confirm Password"
                            required
                        />
                    </Form.Group>
                    <button type="submit" className="btn btn-dark font12" style={{ width: '100%' }}>Sign Up</button>
                </Form>
                <AlertWrapper>
                    {emailExists && (
                        <div className="alert alert-danger font12" role="alert">
                            The email address is already in use by another account.
                        </div>
                    )}
                </AlertWrapper>
                <AlertWrapper>
                    {passWordMismatch && (
                        <div className="alert alert-danger font12" role="alert">
                            Passwords do not match.
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