import React from 'react'
import { shallow } from 'enzyme'

import NotFound from './'

describe('<NotFound />', () => {
  const comp = (
    <NotFound />
  )

  const wrapper = shallow( comp )

  it('renders <NotFound />', () => {
    expect(wrapper.find('.not__found')).toHaveLength(1)
  })
})