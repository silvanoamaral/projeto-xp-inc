import React, { useState } from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderHook, act } from '@testing-library/react-hooks'

const mockStore = configureMockStore()

import AlbumScreen from './'

describe('<AlbumScreen />', () => {
  let store, component

  const initialState = {
    setIdPlayListReducer: {
      playlist_id: '123213123',
      device_id: '123456'
    },
    searchReducer: {
      data: {},
    }
  }
  store = mockStore(initialState)

  component = renderer.create(
    <Provider store={store}>
      <Router>
        <AlbumScreen />
      </Router>
    </Provider>
  ).root

  it('<AlbumScreen /> Component', () => {
    const element = component.findByType('div')
    expect(element.props.className.includes('playlists')).toBe(true)
  })

  it('onClick button back', () => {
    const handler = jest.fn(e => e.preventDefault())
    component.findByType('a').props.onClick(handler)
  })
})