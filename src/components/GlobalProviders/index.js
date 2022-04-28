import PropTypes from "prop-types"
import { Provider as ReduxProvider } from "react-redux"
import {
    FirebaseAppProvider,
    AuthProvider,
    useFirebaseApp,
    FirestoreProvider,
} from "reactfire"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import configureStore from "flux/store"

const store = configureStore()

const WrappedFirebaseProvider = ({ children }) => {
    const Firebase = useFirebaseApp()
    return (
        <AuthProvider sdk={getAuth(Firebase)}>
            <FirestoreProvider sdk={getFirestore(Firebase)}>
                {children}
            </FirestoreProvider>
        </AuthProvider>
    )
}

WrappedFirebaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

const GlobalProviders = ({ children }) => (
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

GlobalProviders.propTypes = {
    children: PropTypes.node.isRequired,
}

export default GlobalProviders
