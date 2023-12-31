import { Fragment} from "react"
import { Outlet } from "react-router-dom"


import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropDown  from "../../components/cart-dropdown/cart-dropdown.component"
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg"
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles"
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector"

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen)
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="Logo" />
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">Shop</NavLink>
                
                {
                  currentUser ? <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink> : <NavLink to="/auth">SIGN IN</NavLink>
                }
                <CartIcon />
            </NavLinks>
            {
              isCartOpen && <CartDropDown />
            }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation