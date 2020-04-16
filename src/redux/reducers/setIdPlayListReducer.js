import {
  ID_PLAYLIST_ALBUM,
} from '../actions/actionTypes'

const initialState = {
  playlist_id: null,
  playlist_name: ''
}

const setIdPlayListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ID_PLAYLIST_ALBUM:
      return {
        ...state,
        playlist_id: action.playlist_id,
        playlist_name: action.playlist_name
      }
    default:
      return state
  }
}

export default setIdPlayListReducer