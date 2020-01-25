import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { FontFamily } from 'src/constants/Typography'
import routes from 'src/routes'
import configureStore from 'src/flux/store'
import App from 'src/containers/App'
import ProtectedApp from 'src/containers/ProtectedApp'

const store = configureStore()

ReactDOM.render(
    <div style={{ fontFamily: FontFamily }}>
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
    </div>,
    document.getElementById('root'),
)
