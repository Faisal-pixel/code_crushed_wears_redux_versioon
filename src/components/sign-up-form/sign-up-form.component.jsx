import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {SignUpContainer, SignUpH2} from "./sign-up-form.styles.jsx"
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    //using use state to set the values of the form fields
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields;
    //created a function that resets the value of the input fields in the form when the user has been authenticated
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //the handleSubmit function submits the form, here I prevent default 
    const handleSubmit = async (event) => {
        event.preventDefault();

        //check whether password and confirmpassword matches if it doesnt return

        if(password !== confirmPassword) {
            alert("passwords do not match")
            return
        }

        //then i use the try catch block just in case i get an error. here i use the createAutUserWithEmailAndPassword function that I inported from the firebase utils

        try {
            //Here i get a response and the destructed user from the response i got 
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            //Here I get the userDocref by passing in the user and then since the displayName key that i get from the user object is null... automatically set the display name from the form
            await createUserDocumentFromAuth(user, {displayName: displayName})
            resetFormFields();
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.error("user creation encountered an error", error)
            }
        }

        
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    }

    return (
        <SignUpContainer>
        <SignUpH2>Don't have an account?</SignUpH2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Display Name"} onChange={handleChange} name="displayName" type={"text"} required value={displayName}/>

                <FormInput label="Email" onChange={handleChange} type="email" name="email" required value={email}/>

                <FormInput label="Password" onChange={handleChange} type="password" name="password" required value={password}/>

                <FormInput label="Confirm Password" onChange={handleChange} type="password" name="confirmPassword" required value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;