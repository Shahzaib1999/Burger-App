import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state) => {
    return updateObject(state, { purchased: false });
};
const purchaseBurgerStart = (state) => {
    return updateObject(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(state.ordersData, { id: action.orderId });
            return updateObject(state, {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            });
};
const purchaseBurgerFail = (state) => {
    return updateObject(state, { loading: false });
};
const fetchOrderStart = (state) => {
    return updateObject(state, { loading: true });
};
const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};
const fetchOrderFail = (state) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT: return purchaseInit(state)
        case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
        case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionType.FETCH_ORDERS_START: return fetchOrderStart(state);
        case actionType.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state,action);
        case actionType.FETCH_ORDERS_FAIL: return fetchOrderFail(state,action);    
        default: return state;
    }
}

export default reducer;