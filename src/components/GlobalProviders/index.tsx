import { Provider as ReduxProvider } from "react-redux"
import {
    AuthProvider,
    FirebaseAppProvider,
    FirestoreProvider,
    useFirebaseApp,
} from "reactfire"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import configureStore from "flux/store"

const store = configureStore()

const WrappedFirebaseProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const Firebase = useFirebaseApp()
    return (
        <AuthProvider sdk={getAuth(Firebase)}>
            <FirestoreProvider sdk={getFirestore(Firebase)}>
                {children}
            </FirestoreProvider>
        </AuthProvider>
    )
}

const GlobalProviders = ({ children }: { children: React.ReactNode }) => (
    <FirebaseAppProvider
        firebaseConfig={{
            projectId: process.env.FIREBASE_PROJECT_ID,
            apiKey: process.env.FIREBASE_API_KEY,
        }}
    >
        <WrappedFirebaseProvider>
            <ReduxProvider store={store}>{children}</ReduxProvider>
        </WrappedFirebaseProvider>
    </FirebaseAppProvider>
)

export default GlobalProviders
