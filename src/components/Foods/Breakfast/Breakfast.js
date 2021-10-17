import React from 'react';
import Food from '../Food/Food';

const Breakfast = (props) => {
    const morningCategoryFood = props.morningFoods;
    return (
        <>
            {
                morningCategoryFood.map(food=><Food food={food} key={food.id}></Food>)
            }
        </>
    );
};

export default Breakfast;