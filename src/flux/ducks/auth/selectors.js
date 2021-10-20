export const isAuthLoadedSelector = (state) => state.firebase.auth.isLoaded

export const isLoggedInSelector = (state) => Boolean(state.firebase.auth.uid)

export const accessTokenSelector = (state) =>
    state.firebase.auth?.stsTokenManager?.accessToken ?? null

export const roleSelector = (state) => state.firebase.profile?.role ?? null

export const isEmailVerifiedSelector = (state) =>
    state.firebase.auth?.emailVerified ?? false
