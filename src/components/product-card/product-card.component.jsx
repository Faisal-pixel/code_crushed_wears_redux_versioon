import {ProductCardButton, ProductCardContainer, ProductCardFooter, ProductCardImage, ProductCardPrice, ProductCardName} from "./product-card.styles.jsx";

import { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selector.js";

const ProductCard = ( { product } ) => {
    const dispatch = useDispatch();
    const {name, price, imageUrl} = product;
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
    return (
        <ProductCardContainer>
            <ProductCardImage src={imageUrl} alt={name}/>
            <ProductCardFooter>
                <ProductCardName>{name}</ProductCardName>
                <ProductCardPrice>{price}</ProductCardPrice>
            </ProductCardFooter>
            <ProductCardButton buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart} children="Add to card"/>
        </ProductCardContainer>
    )
}

export default ProductCard;