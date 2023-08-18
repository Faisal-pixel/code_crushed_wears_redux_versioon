import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in.component";
import {AuthenticationContainer} from "./authentication.styles.jsx"

const Authentication = () => {
    
    return (
        <AuthenticationContainer>
            <SignIn />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication;