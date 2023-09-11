import { CART_ACTION_TYPES } from "./cart.action_type";


const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

const cartReducer = (state =  CART_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            }
        default:
            return state;
    }
}

export default cartReducer;