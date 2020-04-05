const ns = (action) => `example/${action}`

export const EXAMPLE_ACTION = ns`EXAMPLE_ACTION`

export const exampleAction = () => ({
    type: EXAMPLE_ACTION,
})
