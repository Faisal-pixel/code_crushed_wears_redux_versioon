import { useReducer } from "react";
import { createContext} from "react";
import { createAction } from "../utils/reducers/reducer.utils";

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


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromcart: () => null,
    removeItemTotallyFromCart: () => null,
    cartTotal: 0,
})

const INITIAL_VALUE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const CART_ACTION_TYPES = {
    TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
    ADD_CART_ITEMS: "ADD_CART_ITEMS",
    REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
    REMOVE_ITEM_TOTALLY_FROM_CART: "REMOVE_ITEM_TOTALLY_FROM_CART",
    SET_CART_COUNT: "SET_CART_COUNT",
    SET_CART_TOTAL: "SET_CART_TOTAL",
    SET_CART_ITEMS: "SET_CART_ITEMS"
}

const cartReducer = (state, action) => {
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
                ...payload
            }
        default:
            throw new Error(`Unhandle type ${type} in userReducer`)
    }
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_VALUE);
    const {isCartOpen, cartItems, cartCount, cartTotal} = state;
    const setIsCartOpen = () => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN))
    }

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount,
        }))
    }
    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItemByChecking(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromcart = (cartItemToRemove) => {
        const newCartItems = removeCartItemByChecking(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemTotallyFromCart = (cartItemToRemove) => {
        const newCartItems = removeItemTotallyFromCartByChecking(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromcart, removeItemTotallyFromCart, cartTotal}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}