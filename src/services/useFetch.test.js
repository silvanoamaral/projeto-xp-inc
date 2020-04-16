import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import useFetch from './useFetch'
describe('useFetch', () => {
  test('GET request', async () => {
    const initialValue = []

    const mock = new MockAdapter(axios)

    const mockData = 'response'
    const url = 'http://mock'
    mock.onGet(url).reply(200, mockData)

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url, initialValue)
    )

    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current.data).toEqual('response')
    expect(result.current.loading).toBeFalsy()
  })
})