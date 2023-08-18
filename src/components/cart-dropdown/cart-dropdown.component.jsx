import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../contexts/cart.context"
import Button from "../button/button.component"

import CartItem from "../cart-item/cart-item.component"

import {CartDropDownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles.jsx"

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout")
    }

    return (
        <CartDropDownContainer>

        <CartItems> 
        {
            cartItems.length > 0 ? cartItems.map(item => {
                    return (
                        <CartItem cartItem={item} key={item.id} />
                        )
                }) : <EmptyMessage>Your cart is empty.</EmptyMessage>
        }
        </CartItems>
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>

        </CartDropDownContainer>
    )
}

export default CartDropDown