import styled from "styled-components";

import { BaseButton, GoogleSignInButton, InvertedButton } from "../button/button.styles";

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
   top: 90px;
   right: 40px;
   z-index: 5;
    overflow-x: hidden;

    ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} {
       margin-top: auto;
     }

  ::-webkit-scrollbar {
       width: 0.5rem;
     }


     ::-webkit-scrollbar-thumb {
       background-color: rgb(113, 112, 112);
       border-radius: 100vw;
     }
`

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`

export const CartItems = styled.div`
  .cart-items {
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }
`
