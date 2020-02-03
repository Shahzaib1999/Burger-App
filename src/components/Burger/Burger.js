import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let inputIngredients = Object.keys(props.ingredients)
        .map(ingkey => {
            return [...Array(props.ingredients[ingkey])].map((_, i) => {
                return <BurgerIngredient key={ingkey + i} type={ingkey} />
            })
        }).reduce((arr, a) => {
            return arr.concat(a)
        }, []);

    if (inputIngredients.length <= 0) {
        inputIngredients = <p>Please add ingredients</p>
    };

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {inputIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;