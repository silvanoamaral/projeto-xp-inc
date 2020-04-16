import React from 'react'
import { mount } from 'enzyme'

import Footer from './'

describe('<Footer /> Component', () => {
  const wrapper = mount(<Footer />)

  it('renders', () => {
    expect(wrapper.length).toEqual(1)
  })
})