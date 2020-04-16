import React from 'react'
import auth from '../../../app/auth/authPublicKey'

const LoginButton = props => {
  const clientId = auth.clientID
  const redirectUri = auth.redirectURI
  const scopes = [auth.scopes]

  return <a className='btn btn--loginApp-link'
    href={`https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true&scope=${encodeURIComponent(scopes)}`}
  >
    Login to Spotify
    {props.expires && <p>{props.text}</p>}
  </a>
}

export default LoginButton