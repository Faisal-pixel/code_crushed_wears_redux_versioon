import {BaseButton, GoogleSignInButton, InvertedButton} from './button.styles.jsx'
//So basically here we are trying to control the styling for different types of button so if we pass in a buttonType and it is equal to the value of google in the BUTTON_TYPES_CLASS object then it should give the button a class of the value and same with the inverted

export const BUTTON_TYPES_CLASSES = {
    base: "base",
    google: "google-sign-in",
    inverted: "inverted",
}

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) =>
    (
        {
            [BUTTON_TYPES_CLASSES.base]: BaseButton,
            [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
            [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
        }[buttonType]
)

const Button = (props) => {
    const {children, buttonType, ...otherProps} = props;
    const CustomButton = getButton(buttonType)
    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button;