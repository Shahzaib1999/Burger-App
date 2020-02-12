import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHangler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        isPurchasing: false,
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(ing => {
            return ingredients[ing];
        }).reduce((sum, el) => {
            return sum + el
        }, 0);

        return sum > 0;
    }


    onAddIngredient = (type) => {
        // const oldIngredientCount = this.state.ingredients[type];
        // const updatedIngredientCount = oldIngredientCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedIngredientCount;
        // const price = INGREDIENTS_PRICE[type];

        // this.setState({
        //     ingredients: updatedIngredients,
        //     price: this.state.price + price
        // });
        // this.updatePurchaseState(updatedIngredients);
    }

    onDeleteIngredient = (type) => {
        // const oldIngredientCount = this.state.ingredients[type];
        // const updatedIngredientCount = oldIngredientCount ? oldIngredientCount - 1 : 0;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedIngredientCount;
        // const price = INGREDIENTS_PRICE[type];

        // this.setState({
        //     ingredients: updatedIngredients,
        //     price: this.state.price - price
        // });
        // this.updatePurchaseState(updatedIngredients);
    }

    onModalShow = () => {
        this.setState({ isPurchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ isPurchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isPurchaseable={this.updatePurchaseState(this.props.ings)}
                        onModalShow={this.onModalShow}
                        price={this.props.price}
                        addIngredient={this.props.onIngredientAdded}
                        deleteIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseCancelHandler}
                price={this.props.price} />
        }

        // let orderSummary = (this.props.ings && <OrderSummary
        //     ingredients={this.props.ings}
        //     purchaseContinue={this.purchaseContinueHandler}
        //     purchaseCancel={this.purchaseCancelHandler}
        //     price={this.state.price} />)

        return (
            <Aux>
                <Modal
                    show={this.state.isPurchasing}
                    onModalHide={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchased: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHangler(BurgerBuilder, axios));