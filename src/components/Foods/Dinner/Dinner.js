import React from 'react';
import Food from '../Food/Food';

const Dinner = (props) => {
    const dinnerCategoryFood = props.dinnerFoods;
    return (
        <>
            {
                dinnerCategoryFood.map(food=><Food food={food} key={food.id}></Food>)
            }
        </>
    );
};

export default Dinner;