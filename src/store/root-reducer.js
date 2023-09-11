import { combineReducers } from "redux"; //allows us to combine smaller reducers and have just one big reducer
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import cartReducer from "./cart/cart.reducer";
export const rootReducer = combineReducers({ //we pass in an object
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer
})