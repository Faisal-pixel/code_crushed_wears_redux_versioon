import { compose, legacy_createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

//check issues and resolution for explanation
const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWears = [process.env.NODE_ENV !== "production" && logger, thunk].filter(Boolean) //Removes anything that gives a falsy value;
const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWears));
export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers) //3 arguments(root reducer - important, undefined,  composedEnhancers(allows us to see what the state looks like before an action is dispatched, what the action is and how the state looks after the action.))
export const persistor = persistStore(store);