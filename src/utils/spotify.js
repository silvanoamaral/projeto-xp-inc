import loadJS from 'load-js'
let player = undefined

const initPlayer = () => {
  if (player) return Promise.resolve(player)

  player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: callback => {
      callback('BQD7gssaBFpBVntoOLzTBBkxNkUrUO3ijCKCJZkKhcINqqiZKYlTvgrehwM0sCyrgz_EmMgCMP4KWRESCgpFWyhrQq8Dv2H8X9BQyDdW8_uboMZeMTb8GN9QkMGk36AXdE3sNTavvKAR2y0VWU_UBprhFwN-PGxO1YK5QnqxpUqZ-S2MpLjhhgugR9uoea7-DZxFKHUhC4Kmt85eTo3tTV6Wb0h8WQbQT-zTBeFjddwM78n2RCkwVb21z-1HQKN1XIH3pYHpMLVgjIqYXZSuSl7rseFxeg6p6Q')
    },
    volume: .5
  })

  // Ready
  player.addListener('ready', ({device_id}) => {
    console.log('Ready with Device ID ----', device_id)
    return Promise.resolve(player)
  })
  // Playback status updates
  player.addListener('player_state_changed', state => {
    console.log('Playback status updates',state)
  })

  // Connect to the player!
  player.connect().then(success => {
    if (success) {
      console.log('The Web Playback SDK successfully connected to Spotify!')
    }
  })
}

const initSpotify = function() {
  // Define callback
  window.onSpotifyWebPlaybackSDKReady = initPlayer
  return loadJS(['https://sdk.scdn.co/spotify-player.js'])
}

export default () => {
  return initSpotify()
    .then(() => {
      return initPlayer()
    })
    .catch(e => console.warn(e))
}
