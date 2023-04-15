import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase.config';
const auth = getAuth(app)

const Login = () => {
    const [error,setError] =useState('')
    const emailRef = useRef()
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setError('')
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                console.log(user)

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error(errorMessage)
                setError(errorMessage)
            });

    }
    const handlePasswordReset = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('please provide your email')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email')
            }).catch((error) => {
                console.log(error)
            });

    }
    return (
        <div className='w-25 mx-auto'>
            <h1 className='text-primary mb-4'>Please LogIn</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" ref={emailRef} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <p><small>Forget Password?<button onClick={handlePasswordReset} className='btn btn-link'>Please Reset</button>
                </small></p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>{error}</p>
        </div>
    );
};

export default Login;