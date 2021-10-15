import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
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
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                     <Button className="d-block m-auto" variant="primary">Sign in</Button>
                    </Form>
                    <div className="d-flex justify-content-center mt-4">
                        <p className="d-inline" >New user?</p> 
                        <Link to="/register">Sign up here</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;