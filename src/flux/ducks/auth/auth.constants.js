import Auth0Lock from 'auth0-lock'

export const ROLE_CLAIM_KEY = 'https://nametbd.com/roles'

export const Roles = {
    nametbd_ROLE1: 'nametbd_role1',
    nametbd_ROLE2: 'nametbd_role2',
}

export const getAuthLock = (role = Roles.nametbd_ROLE1) =>
    new Auth0Lock('nametbd_AUTH0_CLIENT_ID', 'nametbd_AUTH0_DOMAIN', {
        additionalSignUpFields: [
            {
                name: 'firstName',
                placeholder: 'First name',
            },
            {
                name: 'lastName',
                placeholder: 'Last name',
            },
            {
                type: 'hidden',
                name: 'role',
                value: role,
            },
        ],
        auth: {
            audience: 'nametbd_AUTH0_API_AUDIENCE',
            params: {
                scope: 'openid email',
            },
            redirectUrl: 'nametbd_AUTH0_API_REDIRECT_URI',
            responseType: 'token id_token',
        },
    })

export const AuthState = {
    LOGGING_IN: 'logging_in',
    LOGGED_IN: 'logged_in',
    LOGGING_OUT: 'logging_out',
    LOGGED_OUT: 'logged_out',
}
