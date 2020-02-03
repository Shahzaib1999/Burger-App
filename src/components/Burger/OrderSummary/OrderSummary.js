import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSumary = Object.keys(props.ingredients)
        .map(ingKey => {
        return <li key={ingKey}><span style={{textTransform: 'uppercase'}}>{ingKey}</span>: {props.ingredients[ingKey]}</li>
        });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burer with the following ingredients:</p>
            <ul>
                {ingredientSumary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>
                CONTINUE
            </Button>
        </Aux>
    )
}

export default orderSummary;