import {
  SEARCH_FETCH_REQUEST,
  ID_PLAYLIST_ALBUM,
} from '../actions/actionTypes'

export const searchReducer = (token, query) => ({
  type: SEARCH_FETCH_REQUEST,
  token,
  query
})

export const setIdPlayListReducer = (playlist_id, playlist_name) => ({
  type: ID_PLAYLIST_ALBUM,
  playlist_id,
  playlist_name
})