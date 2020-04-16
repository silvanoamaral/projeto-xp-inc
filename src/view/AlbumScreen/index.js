import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { ScriptCache } from '../../utils/ScriptCache'
import { msConversion } from '../../utils/msConversion'
import { getSpotifyAuthToken } from '../../helpers/localStorageToken'
import {
  connectToPlayer,
  startPlayback,
  pauseTrack
} from '../../utils/spotify'

import './AlbumScreen.scss'

const AlbumScreen = props => {
  const {
    data,
    playlist_id,
    playlist_name,
    playerReady,
    device_id,
    history,
    dispatch
  } = props

  if(!data) {
    history.push('/')
  }

  let spotifyPlayer

  const [playlists, setPlaylists] = useState(null)

  const spotifySDKCallback = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      spotifyPlayer = new Spotify.Player({
        name: 'React Spotify Player',
        getOAuthToken: callback => {
          callback(localStorage.getItem('spotifyAuthToken'))
        }
      })

      spotifyPlayer.addListener('player_state_changed', ({
        position,
        duration,
        track_window: { current_track }
      }) => {
        console.log('Currently Playing', current_track)
        console.log('Position in Song', position)
        console.log('Duration of Song', duration)
      })
    }
  }

  const initGetPlayList = async id => {
    const urlBase = `https://api.spotify.com/v1/playlists/${id}/tracks?fields=items(added_by.id,track(duration_ms,uri,images,name,href,album(name,href)))&limit=20&offset=1`

    const config = {
      headers: { Authorization: `Bearer ${getSpotifyAuthToken()}` }
    }

    await axios.get(urlBase, config)
    .then(res => {
      if(res.status === 401) {
        dispatch({type: 'SEARCH_SESSION_EXPIRES'})
      }

      console.log('initGetPlayList', res.data)
      setPlaylists(res.data)

      connectToPlayer(spotifyPlayer, dispatch)
    })
    .catch(error => {
      if(error.response.status === 401) {
        dispatch({type: 'SEARCH_SESSION_EXPIRES'})
      }

      history.push('/')
    })
  }

  useEffect(() => {
    new ScriptCache([{
      name: "https://sdk.scdn.co/spotify-player.js",
      callback: spotifySDKCallback()
    }])

    if(playlist_id) {
      initGetPlayList(playlist_id)
    }
  },[])

  return (
    <>
      <h1>{playlist_name}</h1>

      {playlists && <>
        <ul>
          {playlists.items.map((play, index) => {
            return <li key={`${play.track.name}-${index}`}>
              <p><span>{index}.</span> <span>{play.track.name}</span></p>
              <p>Duration: {msConversion(play.track.duration_ms)}</p>

              <div className="btn">
                <button data-position={index} className="btn__player" onClick={(e) => {
                  startPlayback(e, device_id, play.track.uri)
                }}>
                  play
                </button>

                <button data-position={index} className="btn__pausa" onClick={(e) => pauseTrack(e, device_id)}>pausa</button>
              </div>
            </li>
          })}
        </ul>
      </>}
    </>
  )
}

const mapStateToProps = store => ({
  data: store.searchReducer.data,
  playlist_id: store.setIdPlayListReducer.playlist_id,
  playlist_name: store.setIdPlayListReducer.playlist_name,
  device_id: store.setIdPlayListReducer.device_id,
  playerReady: store.setIdPlayListReducer.playerReady,
})

export default connect(mapStateToProps)(AlbumScreen)