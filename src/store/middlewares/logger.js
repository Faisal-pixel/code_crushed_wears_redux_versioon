const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        next(action)
    }

    console.log("action type: ", action.type)
    console.log("payload: ", action.payload)
    console.log("currentState: ", store.getState())

    next(action);

    console.log("next state: ", store.getState());
}

export default loggerMiddleware;