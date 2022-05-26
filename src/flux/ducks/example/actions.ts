import { createAction } from "@reduxjs/toolkit"

const ns = (action: TemplateStringsArray) => `example/${action}`

export const exampleAction = createAction(ns`EXAMPLE_ACTION`)
