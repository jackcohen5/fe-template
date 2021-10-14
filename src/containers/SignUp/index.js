import { useForm } from 'react-hook-form'

import Navbar from 'components/Navbar'
import { Themes } from 'constants/Branding'
import Toaster from 'components/Toaster'
import { useSignUp } from 'flux/ducks/auth'
import routes from 'routes'

import {
    AlreadySignedUpContainer,
    InlineLoginInputText,
    LoginContainer,
    LoginForm,
    LoginLink,
    LoginFormTitle,
    LoginFormSubtitle,
    LoginInputContainer,
    LoginInputText,
    LoginAction,
} from './SignUp.styles'

const SignUp = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm()
    const signUp = useSignUp()
    const currentPassword = watch('password', null)
    return (
        <>
            <Navbar />
            <LoginContainer>
                <LoginForm onSubmit={handleSubmit(signUp)}>
                    <LoginFormTitle>Sign Up to get started</LoginFormTitle>
                    <LoginFormSubtitle>
                        Enter your details to proceed further
                    </LoginFormSubtitle>
                    <AlreadySignedUpContainer>
                        <span>Already have an account?</span>
                        <LoginLink to={routes.LOGIN} label="Login" />
                    </AlreadySignedUpContainer>
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
                                        'Entered value does not match email format',
                                },
                            })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <InlineLoginInputText
                            placeholder="First Name"
                            name="firstName"
                            type="firstName"
                            hasError={Boolean(errors.firstName)}
                            {...register('firstName', {
                                required: true,
                            })}
                        />
                        <LoginInputText
                            placeholder="Last Name"
                            name="lastName"
                            type="lastName"
                            hasError={Boolean(errors.lastName)}
                            {...register('lastName', {
                                required: true,
                            })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginInputText
                            placeholder="Password"
                            name="password"
                            type="password"
                            hasError={Boolean(errors.password)}
                            {...register('password', {
                                required: true,
                                validate: (value) => value.length >= 6,
                            })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginInputText
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            hasError={Boolean(errors.confirmPassword)}
                            {...register('confirmPassword', {
                                required: true,
                                validate: (value) => value === currentPassword,
                            })}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginAction theme={Themes.Primary} type="submit">
                            Sign Up
                        </LoginAction>
                    </LoginInputContainer>
                </LoginForm>
            </LoginContainer>
            <Toaster />
        </>
    )
}

export default SignUp
