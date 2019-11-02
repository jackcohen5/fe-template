import React from 'react'
import { shallow } from 'enzyme'

import Navbar from 'src/components/Navbar'

import { UnwrappedApp as App } from '.'
import { AppButton, AppContainer } from './App.styles'

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
        expect(wrapper.find(Navbar).prop('title')).toBe('nametbd')
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
        wrapper.find(AppButton).simulate('click')
        expect(exampleActionSpy).toHaveBeenCalled()
    })
})
