import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'

const mockStore = configureMockStore()

import SearchPlayList from './'

describe('<SearchPlayList />', () => {
  let store, component

  it('SearchPlayList Component', () => {
    const initialState = {
      searchReducer: {
        expires: true,
        text: 'test'
      }
    }
    store = mockStore(initialState)

    component = renderer.create(
      <Provider store={store}>
        <SearchPlayList />
      </Provider>
    ).root

    const element = component.findByType('form')
    expect(element.props.className.includes('search__form')).toBe(true)
  })

})