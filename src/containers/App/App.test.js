import { shallow } from 'enzyme'

import Button from 'components/Button'
import Navbar from 'components/Navbar'

import { AppContainer } from './App.styles'

import { UnwrappedApp as App } from '.'

const defaultProps = {
    hasTriggeredExample: false,
    exampleAction: () => {},
}

const renderComponent = (props = {}, method = shallow) =>
    method(<App {...defaultProps} {...props} />)

describe('App', () => {
    it('passes title to navbar', () => {
        const wrapper = renderComponent({})
        expect(wrapper.find(Navbar).exists()).toBe(true)
        expect(wrapper.find(Navbar).prop('title')).toBe('FE Template')
    })

    it('untriggered example matches snapshot', () => {
        const wrapper = renderComponent({
            hasTriggeredExample: false,
        })
        expect(wrapper.find(AppContainer).text()).toMatchSnapshot()
    })

    it('triggered example matches snapshot', () => {
        const wrapper = renderComponent({
            hasTriggeredExample: true,
        })
        expect(wrapper.find(AppContainer).text()).toMatchSnapshot()
    })

    it('calls exampleAction on button click', () => {
        const exampleActionSpy = jest.fn()
        const wrapper = renderComponent({
            exampleAction: exampleActionSpy,
        })
        wrapper.find(Button).simulate('click')
        expect(exampleActionSpy).toHaveBeenCalled()
    })
})
