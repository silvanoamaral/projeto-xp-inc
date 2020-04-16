import {call, put, takeEvery } from 'redux-saga/effects'

import history from '../../helpers/history'

import {
  SEARCH_FETCH_REQUEST,
  SEARCH_FETCH_SUCCEEDED,
  SEARCH_FETCH_FAILURE,
  SEARCH_SESSION_EXPIRES,
} from '../actions/actionTypes'

import { getSearch } from '../../services/getSearch'

function* fetchSearch(action) {
  try {
    const result = yield call(getSearch, action.token, action.query)

    if(result.status === 401) {
      yield put({ type: SEARCH_SESSION_EXPIRES, payload: {} })
      history.push(`/`)
    } else {
      yield put({ type: SEARCH_FETCH_SUCCEEDED, payload: result.playlists, query: action.query  })
    }
  } catch(e) {
    yield put({ type: SEARCH_FETCH_FAILURE, payload: {} })
  }
}

export function* watchfetchSearch() {
  yield takeEvery(SEARCH_FETCH_REQUEST, fetchSearch)
}