import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
// import ProductCard from "./components/product-card/product-card.component";


const App = () => {
  const dispatch = useDispatch() //dispatch never updates. Just that useEffect doesnt know so you will get get the lint warning. you dont have to put it but if you dont like the warning, you can put it.
  useEffect(()=> {
    const unsubscribe = onAuthStateChangedListener((user) => {
         if(user) {
             createUserDocumentFromAuth(user)
         }
         dispatch(setCurrentUser(user)) //Remember in setCurrentUser it uses the createAction helper function we created that recieves the user_action_type and a payload and returns it back as an object. setCurrentUser also returns it back as an object so now we can pass it into the dispatch function.
     })

     return unsubscribe;
 }, [])
  return (
    <Routes>
      <Route path="/" element={<Navigation />}> 
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;