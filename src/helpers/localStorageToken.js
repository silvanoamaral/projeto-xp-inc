const SPOTIFY_AUTH_TOKEN = "spotifyAuthToken"
const SPOTIFY_ACCESS = "spotifyAccess"
const SPOTIFY_TOKEN_EXPIRATION_TIME = "spotifyTokenExpirationTime"

export const getSpotifyAuthToken = () => {
  return localStorage.getItem(SPOTIFY_AUTH_TOKEN)
}
export const getSpotifyTokenExpirationTime = () => {
  return Number(localStorage.getItem(SPOTIFY_TOKEN_EXPIRATION_TIME))
}
export const setSpotifyAccess = access => {
  localStorage.setItem(SPOTIFY_ACCESS, access)
}
export const setSpotifyAccessToken = token => {
  localStorage.setItem(SPOTIFY_AUTH_TOKEN, token)
}
export const setSpotifyTokenExpirationTime = time => {
  const now = new Date()
  const expirationTime = now.getTime() + Number(time) * 1000
  localStorage.setItem(SPOTIFY_TOKEN_EXPIRATION_TIME, expirationTime + "")
}