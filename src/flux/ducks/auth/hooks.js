import toast from 'react-hot-toast'
import { useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import { getErrorMessage, Roles } from 'flux/ducks/auth'
import { useFetch } from 'services/Fetch'
import routes from 'routes'

export const useLogin = () => {
    const history = useHistory()
    const firebase = useFirebase()

    return ({ email, password }) =>
        firebase
            .login({ email, password })
            .then(() => history.push(routes.HOME))
            .catch((e) => toast.error(getErrorMessage(e.code)))
}

export const useLogout = () => {
    const history = useHistory()
    const firebase = useFirebase()
    return () => firebase.logout().then(() => history.push(routes.LOGIN))
}

export const useSignUp = (role = Roles.ROLE_1) => {
    const Fetch = useFetch()
    const history = useHistory()
    const firebase = useFirebase()

    return (signUpProps) => {
        signUpProps.role = role

        return Fetch({
            body: signUpProps,
            method: 'POST',
            path: '/signUp',
        })
            .then(({ token }) => firebase.login({ token }))
            .then(() => {
                delete signUpProps.password
                delete signUpProps.confirmPassword
                return firebase.updateProfile(signUpProps)
            })
            .then(() => history.push(routes.HOME))
            .catch((e) => toast.error(getErrorMessage(e.body?.errorCode)))
    }
}
