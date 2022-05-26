export enum Route {
    HOME = "/",
    LOGIN = "/login",
    SIGN_UP = "/sign-up",
    ROLE_1_ROUTE = "/private/role-1",
    ROLE_2_ROUTE = "/private/role-2",
}

export const routeTitles = {
    [Route.HOME]: "Home",
    [Route.LOGIN]: "Login",
    [Route.SIGN_UP]: "Sign Up",
    [Route.ROLE_1_ROUTE]: "Private Role 1 Route",
    [Route.ROLE_2_ROUTE]: "Private Role 2 Route",
}

export default Route
