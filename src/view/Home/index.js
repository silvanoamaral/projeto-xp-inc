import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import SerachPlayList from '../SerachPlayList'

import auth from '../../../app/auth/authPublicKey'

export const authEndpoint = 'https://accounts.spotify.com/authorize'

const clientId = auth.clientID
const redirectUri = 'http://localhost:8002/callback'

const scopes = ["user-read-private user-read-email"]

const Home = props => {
  useEffect(() => {
    //props.findSessionReducer()
  },[])

  const getSpotifyTokenExpirationTime = () => {
    return Number(localStorage.getItem('spotifyTokenExpirationTime'))
  }

  return <div className='content'>
    {props.expires && (
      <a className='btn btn--loginApp-link'
       href={`https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&show_dialog=true&scope=${encodeURIComponent(scopes)}`}
      >
        Login to Spotify
        {props.expires &&
          <p>{props.text}</p>
        }
      </a>
    )}
    {!props.expires && (
      // Spotify Player Will Go Here In the Next Step
      <SerachPlayList token={props.token} />      
    )}
  </div>
}

const mapStateToProps = store => ({
  expires: store.searchReducer.expires,
  text: store.searchReducer.text
})

export default connect(mapStateToProps)(Home)