import * as actionTypes from './actionsTypes';
import axios from 'axios';


export const requestStart = () => {
    return {type: actionTypes.REQUEST_START}
};

export const dishesRequestSucces = (dishesData) => {
    return {type: actionTypes.DISHES_REQUEST_SUCCES, dishes: dishesData}
};

export const requestError = () => {
    return {type: actionTypes.REQUEST_ERROR}
};

export const getDishes = () => {
    return dispatch => {
        dispatch(requestStart());
        axios.get('dishes2.json').then(response => {
            const result = response.data;
            let dishes = Object.keys(result).map(dishKey => {
                return ({
                    key: dishKey,
                    image: result[dishKey].image,
                    title: result[dishKey].title,
                    price: result[dishKey].price
                })
            });
            dispatch(dishesRequestSucces(dishes));
        }, error => {
            dispatch(requestError());
        })

    }
};

export const addDishToCart = (dishId, dish) => {
    return {type: actionTypes.ADD_DISH_TO_CART, dishId, dish}
};

export const removeDishFromCart = (dishId, dish) => {
    return {type: actionTypes.REMOVE_DISH_FROM_CART, dishId, dish}
};

export const initCart = () => {
    return {type: actionTypes.INIT_CART}
};

export const orderRequestSucces = () => {
    return {type: actionTypes.ORDER_REQUEST_SUCCES}
};

export const orderInit = () => {
    return {type: actionTypes.ORDER_INIT}
};

export const placeOrder = order => {
    return dispatch => {
        dispatch(requestStart());
        axios.post('orders2.json', order).then(() => {
            dispatch(orderRequestSucces());
        }, error => {
            dispatch(requestError())
        })
    }
};


