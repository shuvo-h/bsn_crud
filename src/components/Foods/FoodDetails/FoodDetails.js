import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router';
import useLoadData from '../../../hooks/useLoadData';
import { addToDb } from '../../../utilities/localstorageDB/localstorageDB';

const FoodDetails = () => {
    const {foodId} = useParams();
    
    const allfoods = useLoadData('/allFoodData.json');
    const selectedFood = allfoods.find(food => parseInt(food.id) === parseInt(foodId)) || {};
    const {title, str, price, eating_time, category, receipe, foodRegion, photo,id} = selectedFood;

    const handleCartAdd = (idnumber) =>{
        addToDb(idnumber);
    }
    return (
        <div className="container">
            <Card style={{ width: '80%' }} className="m-auto">
                <Card.Img variant="top" className="p-3 mx-auto" style={{ width: '30rem' }} src={photo} />
                <Card.Body>
                    <Card.Title className="text-center">{title}</Card.Title>
                    <h1 className="text-center">${price}</h1>
                    <Card.Text>
                    {str}
                    </Card.Text>
                    <Card.Text>
                        <strong>Recipe: </strong> {receipe}
                    </Card.Text>
                    <ListGroup variant="flush" style={{ width: '20rem' }} className="m-auto text-center">
                        <ListGroup.Item>Preferred for <strong>{eating_time}</strong></ListGroup.Item>
                        <ListGroup.Item>Category: <strong>{category}</strong></ListGroup.Item>
                        <ListGroup.Item>Region: {foodRegion}</ListGroup.Item>
                    </ListGroup>
                    <Button onClick={()=>handleCartAdd(id)} variant="primary" className="d-block m-auto">add to cart</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default FoodDetails;