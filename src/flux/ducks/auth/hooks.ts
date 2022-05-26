import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "reactfire"
import {
    signInWithCustomToken,
    signInWithEmailAndPassword,
} from "firebase/auth"
import LogRocket from "logrocket"

import { Role, getErrorMessage } from "flux/ducks/auth"
import { useFetch } from "services/Fetch"
import Route from "routes"

export const useUserRole = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [role, setRole] = useState(undefined)
    const Auth = useAuth()

    useEffect(
        () =>
            Auth.onAuthStateChanged((user) => {
                if (user) {
                    setIsLoading(true)
                    user.getIdTokenResult().then((r) => {
                        setRole(r.claims.role)
                        setIsLoading(false)
                    })
                } else {
                    setRole(undefined)
                    setIsLoading(false)
                }
            }),
        [Auth]
    )

    return { role, isLoading }
}

type LoginSuccessPropsType = { user: { email: string } }

const useLoginSuccess = () => {
    const navigate = useNavigate()
    return useCallback(
        ({ user: { email } }: LoginSuccessPropsType) => {
            LogRocket.identify(email, { email })
            navigate(Route.HOME)
        },
        [navigate]
    )
}

type LoginPropsType = { email: string; password: string }

export const useLogin = () => {
    const onLoginSuccess = useLoginSuccess()
    const Auth = useAuth()
    return ({ email, password }: LoginPropsType) =>
        signInWithEmailAndPassword(Auth, email, password)
            .then(onLoginSuccess)
            .catch((e) => toast.error(getErrorMessage(e.code)))
}

export const useLogout = () => {
    const navigate = useNavigate()
    const Auth = useAuth()
    return () =>
        Auth.signOut().then(() => {
            LogRocket.startNewSession()
            navigate(Route.LOGIN)
            window.location.reload()
        })
}

type SignUpPropsType = { email: string; password: string; role: string }

export const useSignUp = (role = Role.ROLE_1) => {
    const onLoginSuccess = useLoginSuccess()
    const Fetch = useFetch()
    const Auth = useAuth()

    return (signUpProps: SignUpPropsType) => {
        signUpProps.role = role

        return Fetch({
            body: signUpProps,
            method: "POST",
            path: "/signUp",
        })
            .then(({ token }) => signInWithCustomToken(Auth, token))
            .then(onLoginSuccess)
            .catch((e) => toast.error(getErrorMessage(e.body?.errorCode)))
    }
}
