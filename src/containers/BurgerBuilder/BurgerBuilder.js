import React, { Component } from 'react';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHangler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        isPurchaseable: false,
        isPurchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ing => {
            return ingredients[ing];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        this.setState({ isPurchaseable: sum > 0 });
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

    onModalShow = () => {
        this.setState({ isPurchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ isPurchasing: false });
    }

    purchaseContinueHandler = () => {
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.price,
        //     customer: {
        //         name: 'Shahzaib',
        //         address: {
        //             steet: 'teststreet 123',
        //             zipCode: '41100',
        //             country: 'Pakistan'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', order).then(res => {
        //     this.setState({ loading: false, isPurchasing: false });
        // }).catch(err => {
        //     this.setState({ loading: false, isPurchasing: false });
        // });
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = (<OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHandler}
            price={this.state.price} />)

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.isPurchasing}
                    onModalHide={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    isPurchaseable={this.state.isPurchaseable}
                    onModalShow={this.onModalShow}
                    price={this.state.price}
                    addIngredient={this.onAddIngredient}
                    deleteIngredient={this.onDeleteIngredient}
                    disabled={disabledInfo}
                />
            </Aux>
        );
    }
}

export default withErrorHangler(BurgerBuilder, axios);