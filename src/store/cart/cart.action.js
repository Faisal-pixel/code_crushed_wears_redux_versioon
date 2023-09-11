import { createAction } from "../../utils/reducers/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.action_type";

const addCartItemByChecking = (cartItems, productToAdd) => {
    
    //check if the new item coming in exist in the cart items.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    //if the new item exists, we get a new array, here we need to increas the quantity. We do this by mapping through our cartItems and check if the new product id is equal to a cartItem id, if it is true that means we need to inrease the quantity for that one, so we return a new object spreading the existing object for this cartItem but increasing the quantity by 1
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }

    //if it is a new cart item, we return a new array consisting all the existing cartItems and a new object of the new product with quantity of 1
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItemByChecking = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const cartItemToRemoveFromList = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    // check f quantity is equal to 1, if it is remove the item from the cart
    if(cartItemToRemoveFromList.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    //if it isnt, return back cartitems with matching cart item with reduced quanity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}

const removeItemTotallyFromCartByChecking = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const setIsCartOpen = () => createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN)

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItemByChecking(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromcart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItemByChecking(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemTotallyFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeItemTotallyFromCartByChecking(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}