export const profileIsLoadedSelector = (state) =>
    state.firebase.profile?.isLoaded ?? false

export const firstNameSelector = (state) =>
    state.firebase.profile?.firstName ?? ''

export const lastNameSelector = (state) =>
    state.firebase.profile?.lastName ?? ''

export const fullNameSelector = (state) =>
    `${firstNameSelector(state)} ${lastNameSelector(state)}`.trim() || null
