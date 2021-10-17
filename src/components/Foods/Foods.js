import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import useLoadData from '../../hooks/useLoadData';
import Breakfast from './Breakfast/Breakfast';
import Dinner from './Dinner/Dinner';
import Food from './Food/Food';
import Lunch from './Lunch/Lunch';

const Foods = () => {
    const [selectAllFoods,setSelectAllFoods] = useState(false);
    const [selectBreakfast,setSelectBreakfast] = useState(false);
    const [selectLunch,setSelectLunch] = useState(false);
    const [selectDinner,setSelectDinner] = useState(false);

    const allFoodsUri = "/allFoodData.json";
    const allFoods = useLoadData(allFoodsUri);
    const morningFoods = allFoods.filter(food=>food.eating_time ==="morning");
    const lunchFoods = allFoods.filter(food=>food.eating_time ==="noon");
    const dinnerFoods = allFoods.filter(food=>food.eating_time ==="night");
    
    const handleAllFoods = () =>{
        setSelectBreakfast(false);
        setSelectLunch(false);
        setSelectDinner(false);
    }
    const handleBreakfastFoods = () =>{
        setSelectBreakfast(true);
        setSelectLunch(false);
        setSelectDinner(false);
    }
    const handleLunchFoods = () =>{
        setSelectBreakfast(false);
        setSelectLunch(true);
        setSelectDinner(false);
    }
    const handleDinnerFoods = () =>{
        setSelectBreakfast(false);
        setSelectLunch(false);
        setSelectDinner(true);
    }
    return (
        <section>
            <h2 className="text-center mb-5 ">Our All Foods</h2>
            <div className="d-flex justify-content-end">
                <button className="bg-info rounded border-0 mx-2" onClick={handleAllFoods}>All Foods</button>
                <button className="bg-info rounded border-0 mx-2" onClick={handleBreakfastFoods}>Breakfast</button>
                <button className="bg-info rounded border-0 mx-2" onClick={handleLunchFoods}>Lunch</button>
                <button className="bg-info rounded border-0 mx-2" onClick={handleDinnerFoods}>Dinner</button>
            </div>
            <Container>
                <Row>
                    {
                        !selectAllFoods && !selectBreakfast && !selectLunch && !selectDinner && allFoods.map(food => <Food food={food} key={food.id}></Food>)
                    }
                    {
                        selectBreakfast && <Breakfast morningFoods={morningFoods}></Breakfast>
                    }
                    {
                        selectLunch && <Lunch lunchFoods={lunchFoods}></Lunch>
                    }
                    {
                        selectDinner && <Dinner dinnerFoods={dinnerFoods}></Dinner>
                    }
                </Row>
            </Container>
        </section>
    );
};

export default Foods;