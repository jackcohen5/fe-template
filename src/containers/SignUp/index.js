import { useForm } from "react-hook-form"

import Navbar from "components/Navbar"
import { Themes } from "constants/Branding"
import Toaster from "components/Toaster"
import { useSignUp } from "flux/ducks/auth"
import routes from "routes"

import {
    AlreadySignedUpContainer,
    InlineSignUpInputText,
    SignUpContainer,
    SignUpForm,
    LoginLink,
    SignUpFormTitle,
    SignUpFormSubtitle,
    SignUpInputContainer,
    SignUpInputText,
    SignUpAction,
} from "./SignUp.styles"

const SignUp = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm()
    const signUp = useSignUp()
    const currentPassword = watch("password", null)
    return (
        <>
            <Navbar />
            <SignUpContainer>
                <SignUpForm onSubmit={handleSubmit(signUp)}>
                    <SignUpFormTitle>Sign up to get started</SignUpFormTitle>
                    <SignUpFormSubtitle>
                        Enter your details to proceed further
                    </SignUpFormSubtitle>
                    <AlreadySignedUpContainer>
                        <span>Already have an account?</span>
                        <LoginLink to={routes.LOGIN} label="Login" />
                    </AlreadySignedUpContainer>
                    <SignUpInputContainer>
                        <SignUpInputText
                            placeholder="Email"
                            name="email"
                            type="email"
                            hasError={Boolean(errors.email)}
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "Entered value does not match email format",
                                },
                            })}
                        />
                    </SignUpInputContainer>
                    <SignUpInputContainer>
                        <InlineSignUpInputText
                            placeholder="First Name"
                            name="firstName"
                            type="firstName"
                            hasError={Boolean(errors.firstName)}
                            {...register("firstName", {
                                required: true,
                            })}
                        />
                        <SignUpInputText
                            placeholder="Last Name"
                            name="lastName"
                            type="lastName"
                            hasError={Boolean(errors.lastName)}
                            {...register("lastName", {
                                required: true,
                            })}
                        />
                    </SignUpInputContainer>
                    <SignUpInputContainer>
                        <SignUpInputText
                            placeholder="Password"
                            name="password"
                            type="password"
                            hasError={Boolean(errors.password)}
                            {...register("password", {
                                required: true,
                                validate: (value) => value.length >= 6,
                            })}
                        />
                    </SignUpInputContainer>
                    <SignUpInputContainer>
                        <SignUpInputText
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            hasError={Boolean(errors.confirmPassword)}
                            {...register("confirmPassword", {
                                required: true,
                                validate: (value) => value === currentPassword,
                            })}
                        />
                    </SignUpInputContainer>
                    <SignUpInputContainer>
                        <SignUpAction theme={Themes.Primary} type="submit">
                            Sign Up
                        </SignUpAction>
                    </SignUpInputContainer>
                </SignUpForm>
            </SignUpContainer>
            <Toaster />
        </>
    )
}

export default SignUp
