import { render } from '@testing-library/react'

import Loader from '.'

const defaultProps = {
    className: '',
    isStretchy: false,
}

const renderComponent = (props = {}) =>
    render(<Loader {...defaultProps} {...props} />)

describe('Loader', () => {
    it('Renders without crashing', () => {
        const { container } = renderComponent()
        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class=""
              >
                <div
                  aria-label="loader"
                  class="sc-bdvvtL hglvFB"
                />
              </div>
            </div>
        `)
    })

    it('Renders stretchy container styles when isStretchy true', () => {
        const { container } = renderComponent({ isStretchy: true })
        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="sc-gsDKAQ jeVTdU"
              >
                <div
                  aria-label="loader"
                  class="sc-bdvvtL hglvFB"
                />
              </div>
            </div>
        `)
    })
})
