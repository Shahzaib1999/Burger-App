import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (formData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', formData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, response.data))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (order) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: order
    };
};

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersSuccess(err));
            });
    };
};