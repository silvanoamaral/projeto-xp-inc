import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

const mockStore = configureMockStore()

import Home from './'

describe('<Home />', () => {
  let store, component 

  it('Home Component - expires="true"', () => {
    const initialState = {
      searchReducer: {
        expires: true,
        text: 'test'
      }
    }
    store = mockStore(initialState)

    component = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    ).root

    const element = component.findByType('div')
    expect(element.props.className.includes('content')).toBe(true)
  })

  it('Home Component - expires="false"', () => {
    const initialState = {
      searchReducer: {
        expires: false,
        text: 'test'
      }
    }
    store = mockStore(initialState)

    component = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    ).root

    const element = component.findByType('div')
    expect(element.props.className.includes('content')).toBe(true)
  })
})