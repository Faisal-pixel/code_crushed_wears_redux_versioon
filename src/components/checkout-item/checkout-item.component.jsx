import "./checkout-item.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromcart, removeItemTotallyFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const {name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems);
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromcart(cartItems, cartItem))
    const removeItemTotallyFromCartHandler = () => dispatch(removeItemTotallyFromCart(cartItems, cartItem))
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeItemHandler}>
                    &#10094;
                </div>
                    <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={removeItemTotallyFromCartHandler}> &#10005; </div>
        </div>
    )
}

export default CheckoutItem;