import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import Navbar from "components/Navbar"
import Toaster from "components/Toaster"
import { Theme } from "constants/Branding"
import { useLogin } from "flux/ducks/auth"
import Route from "routes"

import {
    ButtonSeparator,
    ButtonSeparatorContainer,
    ButtonSeparatorText,
    LoginAction,
    LoginContainer,
    LoginForm,
    LoginFormSubtitle,
    LoginFormTitle,
    LoginInputContainer,
    LoginInputText,
} from "./Login.styles"

export const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const navigate = useNavigate()
    const login = useLogin()

    return (
        <>
            <Navbar />
            <LoginContainer>
                <LoginForm onSubmit={handleSubmit(login)}>
                    <LoginFormTitle>Login</LoginFormTitle>
                    <LoginFormSubtitle>Login to your account</LoginFormSubtitle>
                    <LoginInputContainer>
                        <LoginInputText
                            placeholder="Email"
                            name="email"
                            type="email"
                            hasError={Boolean(errors.email)}
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "Entered value does not match email format.",
                                },
                            })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginInputText
                            placeholder="Password"
                            name="password"
                            type="password"
                            hasError={Boolean(errors.password)}
                            {...register("password", { required: true })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginAction
                            ariaLabel="Login"
                            theme={Theme.Primary}
                            type="submit"
                        >
                            Login
                        </LoginAction>
                    </LoginInputContainer>
                    <ButtonSeparatorContainer>
                        <ButtonSeparator></ButtonSeparator>
                        <ButtonSeparatorText>OR</ButtonSeparatorText>
                        <ButtonSeparator></ButtonSeparator>
                    </ButtonSeparatorContainer>
                    <LoginInputContainer>
                        <LoginAction
                            ariaLabel="Sign Up"
                            onClick={() => navigate(Route.SIGN_UP)}
                        >
                            Sign up
                        </LoginAction>
                    </LoginInputContainer>
                </LoginForm>
            </LoginContainer>
            <Toaster />
        </>
    )
}

export default Login
