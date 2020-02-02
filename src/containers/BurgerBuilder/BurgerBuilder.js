import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.3,
    bacon: .6,
    cheese: .5,
    meat: 1
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: 4,
        isPurchaseable: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ing => {
            return ingredients[ing];
        }).reduce((sum,el) => {
            return sum + el
        }, 0);

        this.setState({isPurchaseable: sum > 0});
    }


    onAddIngredient = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngredientCount;
        const price = INGREDIENTS_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            price: this.state.price + price
        });
        this.updatePurchaseState(updatedIngredients);
    }

    onDeleteIngredient = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredientCount = oldIngredientCount ? oldIngredientCount - 1 : 0;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedIngredientCount;
        const price = INGREDIENTS_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            price: this.state.price - price
        });
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    isPurchaseable={this.state.isPurchaseable}
                    price={this.state.price}
                    addIngredient={this.onAddIngredient}
                    deleteIngredient={this.onDeleteIngredient}
                    disabled={disabledInfo}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;