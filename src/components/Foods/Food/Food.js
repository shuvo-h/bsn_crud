import React from 'react';
import { Card, Button, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './food.css';

const Food = ({food}) => {
    const {title, str, price, photo,id} = food;
    return (
        <Col lg={3} sm={8} md={4} xs={12} className="food-card m-2 border">
        <Card className="border-0" style={{ width: '18rem' }}>
            <Card.Img variant="top" className="rounded-circle" src={photo} />
            <Card.Body>
                <Card.Title className="text-center">{title}</Card.Title>
                <Card.Text>
                    {str}
                </Card.Text>
                <Stack direction="horizontal" gap={3}>
                    <p className="pt-4">${price}</p>
                    <Link to={`/foods/${id}`}><Button variant="primary" className="border ms-auto">Details</Button></Link>
                </Stack>
            </Card.Body>
        </Card>
</Col>
    );
};

export default Food;