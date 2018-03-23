import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

//Use a utility class to clean up this code. Each reduction case should be only a couple of lines of code, and all data transformation should be done in the utility class
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
        default:
            return state;
    }
};


const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId} );
    return updateObject(state, { loading: false, purchased: true, orders: state.orders.concat(newOrder) });
};

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { loading: false, orders: action.orders });
};

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, { loading: false });
};


export default reducer;