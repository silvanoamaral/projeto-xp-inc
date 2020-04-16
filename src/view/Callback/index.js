import React from 'react'

import history from '../../helpers/history'
import {
  setSpotifyAccessToken,
  setSpotifyTokenExpirationTime
} from '../../helpers/localStorageToken'

const Callback = () => {
  const decodeHashParams = (str) => {
    const hashParams = {}
    const a = /\+/g
    const r = /([^&=]+)=?([^&]*)/g
    const d = (s) => decodeURIComponent(s.replace(a, " "))
    let e

    while (e = r.exec(str)) {
      hashParams[d(e[1])] = d(e[2])
    }
    return hashParams
  }

  const hashStr = window.location.hash
  const hashParams = decodeHashParams(hashStr.slice(1, hashStr.length))

  setSpotifyAccessToken(hashParams.access_token)
  setSpotifyTokenExpirationTime(hashParams.expires_in)
  history.push('/')
  return <></>
}

export default Callback