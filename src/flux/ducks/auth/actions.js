import { createAction } from '@reduxjs/toolkit'

const ns = (action) => `auth/${action}`

export const handleLogin = createAction(ns`HANDLE_LOGIN`)
