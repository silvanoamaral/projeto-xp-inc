import React from 'react'
import auth from '../../../app/auth/authPublicKey'

import './LoginButton.scss'

const LoginButton = props => {
  const clientId = auth.clientID
  const redirectUri = auth.redirectURI
  const scopes = [auth.scopes]

  return <a className='loginApp'
    href={`https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true&scope=${encodeURIComponent(scopes)}`}
  >
    {props.expires && <p>{props.text}</p>}
    Você precisa realizar o Login no Spotify.
  </a>
}

export default LoginButton