import React, { Component } from 'react'
import { ScriptCache } from '../../utils/ScriptCache'

class Player extends Component {
  constructor(props) {
    super(props)

    new ScriptCache([{
      name: "https://sdk.scdn.co/spotify-player.js",
      callback: this.spotifySDKCallback
    }])

    window.addEventListener("load", this.connectToPlayer)

    const getSpotifyAccessToken = () => {
      return localStorage.getItem('spotifyAuthToken')
    }

    this.state = {
      loadingState: "loading scripts",
      spotifyAccessToken: getSpotifyAccessToken(),
      spotifyDeviceId: "",
      spotifyAuthorizationGranted: false,
      spotifyPlayerConnected: false,
      spotifyPlayerReady: false,
      spotifySDKLoaded: true,
      spotifyPlayer: undefined,
      spotifyAccess: "allowed",
      playbackOn: false,
      playbackPaused: false
    }
  }

  spotifySDKCallback = () => {
    console.log('spotifySDKCallback 1')
    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new Spotify.Player({
        name: 'React Spotify Player',
        getOAuthToken: callback => {
          callback(this.state.spotifyAccessToken)
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

      this.setState({
        loadingState: "spotify scripts loaded",
        spotifyPlayer
      })
    }
  }

  connectToPlayer = () => {
    let connectToPlayerTimeout
    if (this.state.spotifyPlayer) {
      clearTimeout(connectToPlayerTimeout)
      // Ready
      this.state.spotifyPlayer.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID', device_id)
        this.setState({
          loadingState: "spotify player ready",
          spotifyDeviceId: device_id,
          spotifyPlayerReady: true
        })
      })

      // Not Ready
      this.state.spotifyPlayer.addListener('not_ready', ({device_id}) => {
        console.log('Device ID has gone offline', device_id)
      })

      this.state.spotifyPlayer.connect()
      .then(success  => {
        console.log('success ',success)
        console.log("connected to player")
        this.setState({loadingState: "connected to player"})
      })
    } else {
      connectToPlayerTimeout = setTimeout(this.connectToPlayer.bind(this), 1000)
    }
  }

  startPlayback = (id, spotify_uri) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.spotifyAccessToken}`
      }
    }).then(data => {
      if (data.status === 403) {
        console.log('loadingState: "you need to upgrade to premium for playback"')
      } else {
        console.log('progress_ms', data)
        this.setState({
          loadingState: "playback started",
          playbackOn: true, playbackPaused: false
        })
      }
    }).catch(error => {
      console.log(error)
    }) 
  }

  resumePlayback = () => {
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.spotifyAccessToken}`
      },
    }).then((ev) => {
      this.setState({playbackPaused: false})
    })
    console.log("Started playback", this.state)
  }

  pauseTrack = () => {
    fetch("https://api.spotify.com/v1/me/player/pause?" +
      "device_id=" + this.state.spotifyDeviceId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.spotifyAccessToken}`
      },
    }).then((ev) => {
      this.setState({playbackPaused: true})
    })
  }

  render() {
    return <div>
      <button onClick={() => this.startPlayback(this.state.spotifyDeviceId, 'spotify:track:5Rg8SptHd3tESvn4fzAV3i')}>play/pause</button>
      <button onClick={() => this.resumePlayback(this.state.spotifyDeviceId)}>resumo</button>

      <div>
        {this.state.spotifyPlayerReady &&
        <div onClick={() => {
            if (!this.state.playbackOn) {
                this.startPlayback(this.state.spotifyDeviceId, 'spotify:track:5Rg8SptHd3tESvn4fzAV3i')
            } else {
                if (this.state.playbackPaused) {
                    this.resumePlayback()
                }
            }
        }}>
            play
        </div>}
        {this.state.spotifyPlayerReady && this.state.playbackOn &&
        <div onClick={() => {
            if (!this.state.playbackPaused) {
              this.pauseTrack()
            }
        }}>
            Pause
        </div>}
      </div>

    </div>
  }
}

export default Player