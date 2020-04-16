import React from 'react'

import history from '../../helpers/history'

const Callback = () => {
  const SPOTIFY_AUTH_TOKEN = "spotifyAuthToken"
  const SPOTIFY_ACCESS = "spotifyAccess"
  const SPOTIFY_TOKEN_EXPIRATION_TIME = "spotifyTokenExpirationTime"

  const setSpotifyAccess = access => {
    localStorage.setItem(SPOTIFY_ACCESS, access)
  }
  const setSpotifyAccessToken = token => {
    localStorage.setItem(SPOTIFY_AUTH_TOKEN, token)
  }
  const setSpotifyTokenExpirationTime = time => {
    const now = new Date()
    const expirationTime = now.getTime() + Number(time) * 1000
    localStorage.setItem(SPOTIFY_TOKEN_EXPIRATION_TIME, expirationTime + "")
  }
  const decodeHashParams = (str) =>{
    const hashParams = {}
    const a = /\+/g  // Regex for replacing addition symbol with a space
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
  console.log(hashParams)
  history.push('/')
  return <div>Callback</div>
}

export default Callback