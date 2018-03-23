import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';



export const addIngredient = (name) => ({type: actionTypes.ADD_INGREDIENT, ingredientName: name});
export const removeIngredient = (name) => ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name});

//Synchronous action creator that will execute after async is complete
export const setIngredients = (ingredients) => ({type: actionTypes.SET_INGREDIENTS, ingredients: ingredients});
export const fetchIngredientsFailed = () => ({type: actionTypes.FETCH_INGREDIENTS_FAILED});

//Asynchronous action creator
export const initIngredients = () => (dispatch => {
    //Send an HTTP request asynchronously
    axios.get('https://react-my-burger-mbw.firebaseio.com/ingredients.json')
        .then(response => {
            //When a response is returned, don't use setState; dispatch my synchronous action creator to update the page
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
});