import Link from 'components/Link'
import Navbar from 'components/Navbar'

import { AppContainer } from './App.styles'
import ExampleAction from './ExampleAction'
import { useExampleAction, useExampleApiAction, useLinkParams } from './hooks'

export const App = () => {
    const exampleActionProps = useExampleAction()
    const exampleApiActionProps = useExampleApiAction()
    const linkParams = useLinkParams()
    return (
        <>
            <Navbar title="FE Template" />
            <AppContainer>
                <div>Congrats, you started up the FE template.</div>
                <ExampleAction
                    buttonLabel="Trigger Example Action"
                    {...exampleActionProps}
                />
                <ExampleAction
                    buttonLabel="Trigger API Call"
                    {...exampleApiActionProps}
                />
                <Link {...linkParams} />
            </AppContainer>
        </>
    )
}

export default App
