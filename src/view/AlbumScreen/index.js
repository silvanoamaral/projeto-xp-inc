import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { ScriptCache } from '../../utils/ScriptCache'

import './AlbumScreen.scss'

const AlbumScreen = props => {
  const {
    data,
    playlist_id,
    playlist_name,
    history,
    dispatch
  } = props

  if(!data) {
    history.push('/')
  }

  let spotifyPlayer

  const msConversion = ms => {
    const min = Math.floor((ms/1000/60) << 0)
    const sec = Math.floor((ms/1000) % 60)

    return `${min}:${sec}`
  }

  const [playlists, setPlaylists] = useState(null)
  const [spotifyDeviceId, setSpotifyDeviceId] = useState(null)
  const [spotifyPlayerReady, setSpotifyPlayerReady] = useState(null)
  const [playbackOn, setPlaybackOn] = useState(false)
  const [playbackPaused, setPlaybackPaused] = useState(false)

  const spotifyAccessToken = localStorage.getItem('spotifyAuthToken')

  const connectToPlayer = () => {
    let connectToPlayerTimeout
    if (spotifyPlayer) {
      clearTimeout(connectToPlayerTimeout)
      // Ready
      spotifyPlayer.addListener('ready', ({device_id}) => {
        setSpotifyDeviceId(device_id)
        setSpotifyPlayerReady(true)
      })

      // Not Ready
      spotifyPlayer.addListener('not_ready', ({device_id}) => {
        console.log('Device ID has gone offline', device_id)
      })

      spotifyPlayer.connect()
      .then(success  => {
        console.log('success ',success)
        console.log("connected to player")
      })
    } else {
      connectToPlayerTimeout = setTimeout(connectToPlayer(), 1000)
    }
  }

  const spotifySDKCallback = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      spotifyPlayer = new Spotify.Player({
        name: 'React Spotify Player',
        getOAuthToken: callback => {
          callback(localStorage.getItem('spotifyAuthToken'))
        }
      })

      // Playback status updates
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
    const token = localStorage.getItem('spotifyAuthToken')

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    await axios.get(urlBase, config)
    .then(res => {
      if(res.status === 401) {
        dispatch({type: 'SEARCH_SESSION_EXPIRES'})
      }

      console.log('initGetPlayList', res.data)
      setPlaylists(res.data)
      connectToPlayer()
    })
    .catch(() => {
      //dispatch({type: 'SEARCH_SESSION_EXPIRES'})
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

  const hideButton = e => {
    if(document.querySelector('.btn.active')) {
      document.querySelector('.btn.active').classList.remove('active')
    }
  }

  const showButton = e => {
    hideButton()
    e.target.parentElement.classList.add('active')
  }

  const startPlayback = (e, id, spotify_uri) => {
    showButton(e)

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${spotifyAccessToken}`
      }
    }).then(data => {
      if (data.status === 403) {
        console.log('loadingState: "you need to upgrade to premium for playback"')
      } else {
        console.log('progress_ms', data)
        setPlaybackOn(true)
        setPlaybackPaused(false)
      }
    }).catch(error => {
      console.log(error)
    }) 
  }

  const pauseTrack = (e) => {
    hideButton(e)    

    fetch("https://api.spotify.com/v1/me/player/pause?" +
      "device_id=" + spotifyDeviceId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${spotifyAccessToken}`
      },
    }).then(() => {
      setPlaybackPaused(true)
    })
  }

  const resumePlayback = () => {
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${spotifyAccessToken}`
      },
    }).then(() => {
      setPlaybackPaused(false)
    })
  }

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
                  startPlayback(e, spotifyDeviceId, play.track.uri)
                }}>
                  play
                </button>

                <button data-position={index} className="btn__pausa" onClick={(e) => pauseTrack(e)}>pausa</button>
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
  playlist_name: store.setIdPlayListReducer.playlist_name
})

export default connect(mapStateToProps)(AlbumScreen)