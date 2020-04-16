import React from 'react'
import { mount } from 'enzyme'

import Header from './'

describe('<Header /> Component', () => {
  const wrapper = mount(<Header />)

  it('renders', () => {
    expect(wrapper.length).toEqual(1)
  })
})