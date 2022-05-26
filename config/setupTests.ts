import "regenerator-runtime/runtime"
import "@testing-library/jest-dom"

import "firebase/auth"
import "firebase/firestore"
import "reactfire"

jest.mock("firebase/auth", () => ({ getAuth: jest.fn() }))
jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    getFirestore: jest.fn(),
}))
jest.mock("reactfire", () => ({
    useAuth: jest.fn(),
    useFirestore: jest.fn(),
    useFirestoreDocData: jest.fn(),
    useSigninCheck: jest.fn(),
    useUser: jest.fn(),
}))
