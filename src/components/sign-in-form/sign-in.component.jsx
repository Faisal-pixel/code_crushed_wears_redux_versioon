import { useState } from "react";
import { signInWithGooglePopup, signInUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import Button, {BUTTON_TYPES_CLASSES} from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import {SignInContainer, SignInH2, SignInButtonsContainer} from "./sign-in.styles.jsx"
const signInDefaultFields = {
    email: "",
    password: ""
}
const SignIn = () => {
    const [signInFields, setSignInFields] = useState(signInDefaultFields)
    const {email, password} = signInFields;


    const resetFormFields = () => {
        setSignInFields(signInDefaultFields);
    }

    const logGoogleUser = async () => {
         await signInWithGooglePopup();
    }

    const logInUser = async (event) => {
        event.preventDefault()
        try {
         await signInUserWithEmailAndPassword(email, password);
        resetFormFields();
        } catch (error) {

            switch(error.code){
                case "auth/wrong-password":
                    alert("incorrect password for email")
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email");
                    break;
                default: 
                    console.log(error)
            }

            // if(error.code === "auth/wrong-password") {
            //     alert("Incorrect password for email")
            // }
        }
        
    }

    const handleChange = (event) => {
        const {value, name} = event.target;
        setSignInFields({...signInFields, [name]: value})
        
    }

    

    return (
        <SignInContainer>
            <SignInH2>I already have an account</SignInH2>
            <span>Sign in with your email and password</span>
            <form onSubmit={logInUser}>
            <FormInput label={"Email"} onChange={handleChange} name="email" type={"email"} required value={email}/>
            <FormInput label={"Password"} onChange={handleChange} name="password" type={"password"} required value={password}/>
            <SignInButtonsContainer>
                <Button type="submit">SIGN IN</Button>
                <Button type="button" buttonType={BUTTON_TYPES_CLASSES.google} onClick={logGoogleUser}>Sign in with Google</Button>
            </SignInButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignIn;