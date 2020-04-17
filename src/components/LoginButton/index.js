import React from 'react'
import PropTypes from 'prop-types'

import auth from '../../../app/auth/authPublicKey'
import { getSpotifyAuthToken } from '../../helpers/localStorageToken'

import './LoginButton.scss'

const LoginButton = props => {
  const clientId = auth.clientID
  const redirectUri = location.href+'callback'
  const scopes = [auth.scopes]

  return <a className='loginApp'
    href={`https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true&scope=${encodeURIComponent(scopes)}`}
  >
    {getSpotifyAuthToken() ?
      <>{props.expires && <p>{props.text}</p>}</>
    :
      <></>
    }

    Você precisa realizar o Login no Spotify.
  </a>
}

export default LoginButton

LoginButton.propTypes = {
  expires: PropTypes.bool,
  text: PropTypes.string,
}