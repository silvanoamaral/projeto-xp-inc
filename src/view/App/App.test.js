import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mount, shallow } from 'enzyme'

import Routes from '../../routes'
import App from './'
import Page1 from '../Page1'
import NotFound from '../NotFound'

describe('<App />', () => {
  it('should show Page1 component for / router', () => {
    const component = mount(<MemoryRouter initialEntries = {['/']} >
        <Routes/>
      </MemoryRouter>
    )
    expect(component.find(Page1)).toHaveLength(1)
  })

  it('NotFound router', () => {
    const component = mount( <MemoryRouter initialEntries = {['/error']} >
        <Routes/>
      </MemoryRouter>
    )
    expect(component.find(NotFound)).toHaveLength(1)
  })

  const comp = (
    <App />
  )
  const wrapper = shallow( comp )

  it('renders <App />', () => {
    expect(wrapper.find('.container')).toHaveLength(1)
  })
})