import {
  ID_PLAYLIST_ALBUM,
  DEVICE_PLAYER_ID,
} from '../actions/actionTypes'

const initialState = {
  playlist_id: null,
  playlist_name: '',
  playerReady: null,
  device_id: null
}

const setIdPlayListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ID_PLAYLIST_ALBUM:
      return {
        ...state,
        playlist_id: action.playlist_id,
        playlist_name: action.playlist_name,
        playerReady: null,
        device_id: null
      }
    case DEVICE_PLAYER_ID:
      return {
      ...state,
      playerReady: action.result.playerReady,
      device_id: action.result.device_id
    }
    default:
      return state
  }
}

export default setIdPlayListReducer