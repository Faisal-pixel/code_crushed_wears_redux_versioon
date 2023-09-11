import {CartIconContainer, ShoppingIcon, ItemCounter} from "./cart-icon.styles.jsx"
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const toggleIsCartOpen = () => dispatch(setIsCartOpen());

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon"/>
            <ItemCounter>{cartCount}</ItemCounter>
        </CartIconContainer>
    )
}

export default CartIcon;