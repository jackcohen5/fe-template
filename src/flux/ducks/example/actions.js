import { createAction } from '@reduxjs/toolkit'

const ns = (action) => `example/${action}`

export const exampleAction = createAction(ns`EXAMPLE_ACTION`)
