import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import { useFirebaseApp } from 'reactfire'
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithCustomToken,
} from 'firebase/auth'
import LogRocket from 'logrocket'

import { getErrorMessage, Roles } from 'flux/ducks/auth'
import { useFetch } from 'services/Fetch'
import routes from 'routes'

const useLoginSuccess = () => {
    const history = useHistory()

    return useCallback(
        ({ user: { email } }) => {
            history.push(routes.HOME)
            LogRocket.identify(email, { email })
        },
        [history],
    )
}

export const useLogin = () => {
    const onLoginSuccess = useLoginSuccess()
    const Auth = getAuth(useFirebaseApp())
    return ({ email, password }) =>
        signInWithEmailAndPassword(Auth, email, password)
            .then(onLoginSuccess)
            .catch((e) => toast.error(getErrorMessage(e.code)))
}

export const useLogout = () => {
    const history = useHistory()
    const Auth = getAuth(useFirebaseApp())
    return () =>
        Auth.signOut().then(() => {
            history.push(routes.LOGIN)
            window.location.reload()
        })
}

export const useSignUp = (role = Roles.ROLE_1) => {
    const onLoginSuccess = useLoginSuccess()
    const Fetch = useFetch()
    const Auth = getAuth(useFirebaseApp())

    return (signUpProps) => {
        signUpProps.role = role

        return Fetch({
            body: signUpProps,
            method: 'POST',
            path: '/signUp',
        })
            .then(({ token }) => signInWithCustomToken(Auth, token))
            .then(onLoginSuccess)
            .catch((e) => toast.error(getErrorMessage(e.body?.errorCode)))
    }
}
