export const Roles = {
    ROLE_1: "ROLE_1",
    ROLE_2: "ROLE_2",
}

const ErrorMessages = {
    "auth/email-already-in-use":
        "The email address is already in use by another account.",
    "auth/email-already-exists":
        "The email address is already in use by another account.",
    "auth/invalid-email": "The email address is not valid.",
    "auth/weak-password": "Please use a stronger password.",
    "auth/user-not-found": "Those credentials do not match our records.",
    "auth/wrong-password": "Those credentials do not match our records.",
}

export const getErrorMessage = (code) =>
    ErrorMessages[code] ??
    "An error occurred. Please try again in a few minutes."

export const USER_COLLECTION = "users"
