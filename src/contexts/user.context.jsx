import { createContext, useEffect} from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { useReducer } from "react";

//as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    //now we destructure the action
    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }    
        default:
            throw new Error(`Unhandle type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    //The useReducer hook takes in the userReducer function we created that returns an object containing our data we want to update, and the the Initial state
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
    //Now we can destructure state to get our currentUser
    const {currentUser} = state;
    //Now we can define our setCurrentUser which recieves a user value (like the authentication from firebase). In it we call the dispatch function and pass in the user object which passes it into our user reducers
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }
    const value = {currentUser, setCurrentUser}
    useEffect(()=> {
       const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        return unsubscribe;
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}