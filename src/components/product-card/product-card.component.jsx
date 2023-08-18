import {ProductCardButton, ProductCardContainer, ProductCardFooter, ProductCardImage, ProductCardPrice, ProductCardName} from "./product-card.styles.jsx";

import { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ( { product } ) => {
    const {name, price, imageUrl} = product;
    const { addItemToCart } = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)
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