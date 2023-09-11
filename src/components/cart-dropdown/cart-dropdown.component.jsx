import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component"

import {CartDropDownContainer, CartItems, EmptyMessage} from "./cart-dropdown.styles.jsx"
import { useSelector } from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector"

const CartDropDown = () => {
    const cartItems = useSelector(selectCartItems);
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