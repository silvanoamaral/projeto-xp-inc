import { combineReducers } from 'redux'

import searchReducer from './searchReducer'
import setIdPlayListReducer from './setIdPlayListReducer'

const rootReducer = combineReducers({
  setIdPlayListReducer,
  searchReducer
})

export default rootReducer