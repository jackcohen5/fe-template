import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogRocket from 'logrocket'

import { FontFamily } from 'src/constants/Typography'
import routes from 'src/routes'
import configureStore from 'src/flux/store'
import App from 'src/containers/App'
import ErrorBoundary from 'src/components/ErrorBoundary'
import ProtectedApp from 'src/containers/ProtectedApp'

if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('your/logrocket/client-key')
}

const store = configureStore()

ReactDOM.render(
    <div style={{ fontFamily: FontFamily }}>
        <ErrorBoundary tag="root">
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path={routes.HOME} component={App} />
                        <Route
                            exact
                            path={routes.PROTECTED_HOME}
                            component={ProtectedApp}
                        />
                    </Switch>
                </Router>
            </Provider>
        </ErrorBoundary>
    </div>,
    document.getElementById('root'),
)
