import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "reactfire"
import {
    signInWithEmailAndPassword,
    signInWithCustomToken,
} from "firebase/auth"
import LogRocket from "logrocket"

import { getErrorMessage, Roles } from "flux/ducks/auth"
import { useFetch } from "services/Fetch"
import routes from "routes"

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

const useLoginSuccess = () => {
    const navigate = useNavigate()
    return useCallback(
        ({ user: { email } }) => {
            LogRocket.identify(email, { email })
            navigate(routes.HOME)
        },
        [navigate]
    )
}

export const useLogin = () => {
    const onLoginSuccess = useLoginSuccess()
    const Auth = useAuth()
    return ({ email, password }) =>
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
            navigate(routes.LOGIN)
            window.location.reload()
        })
}

export const useSignUp = (role = Roles.ROLE_1) => {
    const onLoginSuccess = useLoginSuccess()
    const Fetch = useFetch()
    const Auth = useAuth()

    return (signUpProps) => {
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
