import React from 'react';
import Food from '../Food/Food';

const Lunch = (props) => {
    const lunchCategoryFood = props.lunchFoods;
    return (
        <>
            {
                lunchCategoryFood.map(food=><Food food={food} key={food.id}></Food>)
            }
        </>
    );
};

export default Lunch;