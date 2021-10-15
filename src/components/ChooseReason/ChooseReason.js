import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ChooseReason = () => {
    return (
        <Container className="container">
            <h1 className="text-center">Why This Restaurent?</h1>
            <Row>
                <Col lg={6} md={6} sm={12} xs={12} className="p-4 border-0">
                    <Card style={{ width: '100%' }} className="border-0">
                        <Card.Img variant="top" src="https://gebranlebanesecuisine.com.au/wp-content/uploads/2014/05/photodune-2201397-chef-with-dish-m.jpg" />
                        <Card.Body>
                            <Card.Title>Why will you choose our food?</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem eveniet repellat porro esse doloremque impedit minima ut corrupti? Ab temporibus, earum eius laborum consequuntur obcaecati voluptatum unde adipisci neque recusandae.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={6} md={6} sm={12} xs={12} className="p-4 border-0">
                    <Card style={{ width: '100%' }}>
                    <Card.Img variant="top" src="https://gebranlebanesecuisine.com.au/wp-content/uploads/2014/05/photodune-2201397-chef-with-dish-m.jpg" />
                    <Card.Body>
                        <Card.Title>Why is our resturant best in this downtown?</Card.Title>
                        <Card.Text>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem eveniet repellat porro esse doloremque impedit minima ut corrupti? Ab temporibus, earum eius laborum consequuntur obcaecati voluptatum unde adipisci neque recusandae.
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    );
};

export default ChooseReason;