import React from 'react'
import { shallow } from 'enzyme'

import BackButton from './'

describe('<BackButton />', () => {
  const comp = (
    <BackButton />
  )

  const wrapper = shallow( comp )

  it('renders <BackButton />', () => {
    expect(wrapper.find('.btn__back')).toHaveLength(1)
  })
})