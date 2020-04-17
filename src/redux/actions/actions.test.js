import { searchReducer, setIdPlayListReducer } from './'

describe('actions', () => {
  it('should dispatch SEARCH_FETCH_REQUEST action', () => {
    expect(searchReducer()).toEqual({ type: 'SEARCH_FETCH_REQUEST'})
  })
  it('should dispatch ID_PLAYLIST_ALBUM action', () => {
    expect(setIdPlayListReducer()).toEqual({ type: 'ID_PLAYLIST_ALBUM'})
  })
})