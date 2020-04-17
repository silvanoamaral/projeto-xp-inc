import React from 'react'
import { shallow } from 'enzyme'

import App from './'

describe('<App />', () => {
  const comp = (
    <App />
  )

  const wrapper = shallow( comp )

  it('renders <App />', () => {
    expect(wrapper.find('.container')).toHaveLength(1)
  })
})