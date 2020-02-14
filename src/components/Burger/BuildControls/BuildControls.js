import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const buildControls = props => {

    const label = [
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Meat', type: 'meat' }
    ]

    return (
        <div className={classes.BuildControls}>
            <p><strong>Current Price: {(props.price).toFixed(2)} $</strong></p>
            {label.map((ing, key) => {
                return <BuildControl
                    key={key}
                    label={ing.label}
                    addIngredient={() => props.addIngredient(ing.type)}
                    deleteIngredient={() => props.deleteIngredient(ing.type)}
                    disabled={props.disabled[ing.type]}
                />
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.isPurchaseable}
                onClick={props.onModalShow}>{props.isAuth ? 'Order' : 'Sign In/Up to order'}</button>
        </div>
    )
}

export default buildControls;