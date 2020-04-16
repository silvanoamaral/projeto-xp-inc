import { fork, all } from 'redux-saga/effects'

import { watchfetchSearch } from './fetchSearch'

export default function* root() {
  yield all([
    fork(watchfetchSearch)
  ])
}