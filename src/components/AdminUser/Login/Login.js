import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import { FcGoogle } from "react-icons/fc";
import { BsFacebook , BsGithub} from "react-icons/bs";
import { useHistory, useLocation } from "react-router-dom";



const Login = () => {
    const [existEmail,setExistEmail] = useState('');
    const [existPassword,setExistPassword] = useState('');
    const {signInWithGoogle, signInWithEmail,signInWithFacebook, signInWithGitHub, setIsLoading} = useFirebase();
    
    const location = useLocation();
    const history = useHistory();
    
    const handleSIgnIn = () =>{
        setIsLoading(true);
        signInWithEmail(existEmail,existPassword)
            .then(()=>history.push(location.state?.from))
            .finally(()=>setIsLoading(false))
    }
    const handleGoogleSignIn = () =>{
        setIsLoading(true);
        signInWithGoogle()
        .then(()=>history.push(location.state?.from))
        .finally(()=>setIsLoading(false))
    }
    const handleFacebookSignIn = () =>{
        setIsLoading(true);
        signInWithFacebook()
        .then(()=>history.push(location.state?.from))
        .finally(()=>setIsLoading(false))
    }
    const handleGitHubSignIn = () =>{
        setIsLoading(true);
        signInWithGitHub()
            .then(result=>history.push(location.state?.from))
            .finally(()=>setIsLoading(false))
    }

    return (
        <Container className="mt-3">
            <h2 className="text-center  pb-3">The Cafe Kitchen</h2>
            <Row>
                <Col>
                    <img src="https://media.istockphoto.com/vectors/website-security-and-user-authorization-creation-vector-id1194166998?k=20&m=1194166998&s=612x612&w=0&h=tURytLmvoygRBSXT3UgOniIlLzPdCZA2RrrUxSZAYb4=" alt="" />
                </Col>
                <Col>
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={(e)=>setExistEmail(e.target.value)} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={(e)=>setExistPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                     <Button className="d-block m-auto" onClick={handleSIgnIn} variant="primary">Sign in</Button>
                    </Form>
                    <div className="d-flex justify-content-center mt-4">
                        <p className="d-inline" >New user?</p> 
                        <Link to="/register">Sign up here</Link>
                    </div>
                    <div>
                        <Button onClick={handleGoogleSignIn} variant="light" ><FcGoogle size={40} /></Button>
                        <Button onClick={handleFacebookSignIn} variant="primary" ><BsFacebook size={40} /></Button>
                        <Button onClick={handleGitHubSignIn} variant="light" ><BsGithub size={40} /></Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;