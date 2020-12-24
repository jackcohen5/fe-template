import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { handleLogin, userSelector } from 'flux/ducks/auth'

export const useHandleLogin = () => {
    const { isAuthenticated, user, getAccessTokenSilently, logout } = useAuth0()
    const currentUser = useSelector(userSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuthenticated && !currentUser) {
            dispatch(
                handleLogin({
                    user: {
                        email: user.email,
                        firstName: user.given_name,
                        lastName: user.family_name,
                        name: user.name,
                        isVerified: user.email_verified,
                        picture: user.picture,
                        sub: user.sub,
                    },
                    getAccessToken: getAccessTokenSilently,
                }),
            )
        }
    }, [isAuthenticated, getAccessTokenSilently, currentUser])

    return { logout }
}
