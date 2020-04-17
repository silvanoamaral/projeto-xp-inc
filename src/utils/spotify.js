import { getSpotifyAuthToken } from '../helpers/localStorageToken'

export const connectToPlayer = (spotifyPlayer, dispatch) => {
    let connectToPlayerTimeout
  if (spotifyPlayer) {
    clearTimeout(connectToPlayerTimeout)
    // Ready
    spotifyPlayer.addListener('ready', ({device_id}) => {
      const result = {
        device_id,
        playerReady: true
      }

      dispatch({ type: 'DEVICE_PLAYER_ID', result})
    })

    // Not Ready
    spotifyPlayer.addListener('not_ready', ({device_id}) => {
      console.log('Device ID has gone offline', device_id)
    })

    spotifyPlayer.connect()
    .then(success  => {
      console.log('success ',success)
    })
  } else {
    connectToPlayerTimeout = setTimeout(connectToPlayer(), 1000)
  }
}

export const hideButton = () => {
  if(document.querySelector('.btn.active')) {
    document.querySelector('.btn.active').classList.remove('active')
  }
}

export const showButton = e => {
  hideButton()
  e.target.parentElement.classList.add('active')
}

export const startPlayback = (e, id, spotify_uri) => {
  showButton(e)

  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: [spotify_uri] }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getSpotifyAuthToken()}`
    }
  }).then(data => {
    if (data.status === 403) {
      console.log('loadingState: "you need to upgrade to premium for playback"')
    } else {
      //console.log(data)
    }
  }).catch(() => {
    //console.log(error)
  })
}

export const pauseTrack = (e, device_id) => {
  hideButton(e)    

  fetch("https://api.spotify.com/v1/me/player/pause?" +
    "device_id=" + device_id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getSpotifyAuthToken()}`
    },
  }).then(() => {
    //setPlaybackPaused(true)
  })
}

export const resumePlayback = () => {
  fetch("https://api.spotify.com/v1/me/player/play", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getSpotifyAuthToken()}`
    },
  }).then(() => {
    //setPlaybackPaused(false)
  })
}