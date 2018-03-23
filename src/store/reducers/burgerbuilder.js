import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};


//In this reducer, the utility class doesn't help consolidate code much. Too much custom data transformation is done. In this case, pull the logic into its own method.
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

const addIngredient = (state, action) => {
    /*New ES6 ability allows us to dynamically set variable name using []! I don't know which ingredient this will be, but I can handle whichever it is*/
    const updatedAddIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient);
    const updatedAddState = {
        ingredients: updatedAddIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedAddState);
};

const removeIngredient = (state, action) => {
    const updatedSubtractIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedSubtractIngredients = updateObject(state.ingredients, updatedSubtractIngredient);
    const updatedSubtractState = {
        ingredients: updatedSubtractIngredients,
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedSubtractState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        price: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

export default reducer;