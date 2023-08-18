import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middleWears = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWears));
export const store = legacy_createStore(rootReducer, undefined, composedEnhancers) //3 arguments(root reducer - important, undefined,  composedEnhancers(allows us to see what the state looks like before an action is dispatched, what the action is and how the state looks after the action.))