import React from 'react';
import { Container, Row } from 'react-bootstrap';
import useLoadData from '../../hooks/useLoadData';
import Food from './Food/Food';

const Foods = () => {
    const allFoodsUri = "/allFoodData.json";
    const allFoods = useLoadData(allFoodsUri);
    return (
        <section>
            <h2 className="text-center mb-5">Our All Foods</h2>
            <Container>
                <Row>
                    {
                        allFoods.map(food => <Food food={food} key={food.id}></Food>)
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Foods;