import React from 'react'
import { shallow } from 'enzyme'

import LoginButton from './'

describe('<LoginButton />', () => {
  const comp = (
    <LoginButton />
  )

  const wrapper = shallow( comp )

  it('renders <LoginButton />', () => {
    expect(wrapper.find('.loginApp')).toHaveLength(1)
  })
})