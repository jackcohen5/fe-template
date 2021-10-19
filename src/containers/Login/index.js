import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Navbar from 'components/Navbar'
import Toaster from 'components/Toaster'
import { Themes } from 'constants/Branding'
import { useLogin } from 'flux/ducks/auth'
import routes from 'routes'

import {
    ButtonSeparator,
    ButtonSeparatorContainer,
    ButtonSeparatorText,
    LoginContainer,
    LoginForm,
    LoginFormTitle,
    LoginFormSubtitle,
    LoginInputContainer,
    LoginInputText,
    LoginAction,
} from './Login.styles'

export const Login = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const history = useHistory()
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
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        'Entered value does not match email format.',
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
                            {...register('password', { required: true })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginAction theme={Themes.Primary} type="submit">
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
                            onClick={() => history.push(routes.SIGN_UP)}
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
