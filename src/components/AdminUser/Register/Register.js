import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import { useHistory, useLocation } from "react-router-dom";

const Register = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const location = useLocation();
    const history = useHistory();
    const {signInWithUserEmailAndPassword, emailError,passError} = useFirebase();

    const handleEmailField = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordField = (event) =>{
        setPassword(event.target.value);
    }
   
    const handleSignUp = () => {
        signInWithUserEmailAndPassword(email,password)
            .then(()=>history.push(location.state?.from))
    }
    
    return (
        <div className="container mt-5">
            <h2 className="text-center">Registration from</h2>
            <p>Please fill up the registration form</p>
            <Form>
            <Form.Group controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First name"
                    
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                    <Form.Group controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailField} type="email" placeholder="Enter email" required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                        {
                            emailError && <p>{emailError}</p>
                        }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handlePasswordField}  type="password" placeholder="Password" required/>
                        {
                            <p>{passError}</p>
                        }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Re-type Password" required/>
                </Form.Group>
                <Button variant="primary" onClick={handleSignUp} >Sign Up</Button>
            </Form>
             
            <div className="d-flex justify-content-center mt-4">
                <p className="d-inline" >New user?</p> 
                <Link to="/login">Login here</Link>
            </div>
            
        </div>
    );
};

export default Register;