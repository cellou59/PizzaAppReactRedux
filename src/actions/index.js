import { ADD_ORDER, ADD_PIZZA_ORDER, DELETE_ORDER, SET_ORDER_PAID } from './types';

export const addOrder = id => ({
    type: ADD_ORDER,
    payload: {
        id,
        pizzas: {},
        total: 0,
        paid: false
    }
});

export const addPizzaOrder = (oid, pid) => ({
    type: ADD_PIZZA_ORDER,
    payload: {
        id: oid,
        pizza: pid
    }
});

export const deleteOrder = id => ({
    type: DELETE_ORDER,
    payload: id
});

export const setOrderPaid = id => ({
    type: SET_ORDER_PAID,
    payload: id
});