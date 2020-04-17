import {
  SEARCH_FETCH_REQUEST,
  SEARCH_FETCH_SUCCEEDED,
  SEARCH_FETCH_FAILURE,
  SEARCH_SESSION_EXPIRES,
} from '../actions/actionTypes'

const initialState = {
  data: null,
  loading: false,
  expires: false,
  query: '',
  text: ''
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEARCH_FETCH_SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: action.payload,
        query: action.query
      }
    case SEARCH_FETCH_FAILURE:
      return {
        expires: false,
        loading: false
      }
    case SEARCH_SESSION_EXPIRES:
      return {
        ...state,
        expires: true,
        text: 'Sua sessão expirou,',
        loading: false
      }
    default:
      return state
  }
}

export default searchReducer