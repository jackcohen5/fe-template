const authStoreSelector = (state) => state.auth

export const userSelector = (state) => authStoreSelector(state).user

export const emailSelector = (state) => userSelector(state)?.email

export const firstNameSelector = (state) => userSelector(state)?.firstName

export const lastNameSelector = (state) => userSelector(state)?.lastName

export const nameSelector = (state) => userSelector(state)?.name

export const pictureSelector = (state) => userSelector(state)?.picture

export const isVerifiedSelector = (state) =>
    userSelector(state)?.isVerified ?? false
