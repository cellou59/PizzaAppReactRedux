import pizzas from '../pizzas';
import { ADD_ORDER, ADD_PIZZA_ORDER, SET_ORDER_PAID, DELETE_ORDER } from '../actions/types';

const initialState = {
    pizzas,
    orders: JSON.parse(localStorage.getItem('orders')) || []
};

export default function rootReducer(state = initialState, action) {
    const orders = [...state.orders];
    let index;

    switch (action.type) {
        case ADD_ORDER:
            localStorage.setItem('orders', JSON.stringify(orders));

            return {
                ...state, // sans cette information notre state ne sera pas complet (on perd les pizzas)
                orders: [...state.orders, action.payload]
            };
        case ADD_PIZZA_ORDER:
            const oid = action.payload.id;
            const pid = action.payload.pizza;

            index = orders.findIndex(order => {
                return order.id === oid;
            });

            const currentOrder = { ...orders[index] };

            if (!currentOrder.pizzas[pid]) {
                currentOrder.pizzas[pid] = 1;
            } else {
                currentOrder.pizzas[pid]++;
            }

            currentOrder.total = Math.round((currentOrder.total + state.pizzas[pid].price) * 10) / 10;

            orders[index] = currentOrder;
            localStorage.setItem('orders', JSON.stringify(orders));

            return {
                ...state,
                orders
            };
        case DELETE_ORDER:
            index = orders.findIndex(order => {
                return order.id === action.payload;
            });
            orders.splice(index, 1);

            localStorage.setItem('orders', JSON.stringify(orders));

            return {
                ...state,
                orders
            }
        case SET_ORDER_PAID:
            index = orders.findIndex(order => {
                return order.id === action.payload;
            });
            const order = { ...orders[index] }
            order.paid = true;
            orders[index] = order;
            localStorage.setItem('orders', JSON.stringify(orders));

            return {
                ...state,
                orders
            }
        default:
            return state;
    }
}