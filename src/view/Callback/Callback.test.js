import React from 'react'
import { shallow } from 'enzyme'

import Callback from './'

describe('<Callback />', () => {
  const comp = (
    <Callback />
  )

  const wrapper = shallow( comp )

  it('renders <Callback />', () => {
    //expect(wrapper.find(null)).toHaveLength(1)
  })
})