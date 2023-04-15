import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase.config';

const auth = getAuth(app);
const Register = () => {
    const [error,setError] = useState('')
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(name, email, password)
        if(!/(?=.*\d)/.test(password)){
            setError ('Please enter at least one Number');
            return;
        }else if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Password should contain at least two uppercase')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                emailVerification(user)
                updateUserData(user,name)
            })
            .catch(error => {
                // console.error('error', error)
                setError(error.message)
            })
    }
    const emailVerification = (user) => {
        sendEmailVerification(user)
            .then(() => {
                alert('email verification sent')
            });
    }
    const updateUserData=(user,name)=>{
        updateProfile(user,{
            displayName:name
        }).then(()=>{
            console.log('user updated')
        }).catch(error=>{
            setError(error.message)
        })
    }
    return (
        <div className='w-25 mx-auto'>
            <h1 className='text-primary mb-4'>Please Register!!</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Link className='my-2 text-decoration-none d-block' to='/login'>Already registered?</Link>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>{error}</p>
        </div>
    );
};

export default Register;