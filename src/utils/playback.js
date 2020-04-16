/**
 * Usage:
 *
 * play({
 *   playerInstance: new Spotify.Player({ name: '...' }),
 *   spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
 * })
 */
export const play = ({ spotify_uri, playerInstance }) => {
  console.log(`playing ${spotify_uri} using ${playerInstance}`)

  const { getOAuthToken, id } = playerInstance._options

  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        //Authorization: `Bearer ${access_token}`
        Authorization: `Bearer BQBcJZ7Lu5d9UfwrG0sSus_JU1lfwC_i6aln24vn-g80Hq11Oy1jgfEamx-w-lMeO8zyKNCQi_WsElXOn7o`
      }
    })
  })
}


var spotify_uri = 'spotify:track:1ixxS8P9E0cpSpKD1ngoUD'
var spotifyDeviceId = '1ixxS8P9E0cpSpKD1ngoUD'
var spotifyAccessToken = 'BQAT6Tkv34dUVshksGQtq6SgzT4MoCmhwivRgBeIWk04ssLNa400X-o3vfpB7015mq12G8r-_hksw6dhXZ-vjCBuwtcfKYxyzmdL-30L5WelHp0sAOoaLKfELSTqIf90MdYSu6wd-pm0U1aJzQ0oWSMyHyJ1GG5VWR5SMKwssanKMVFhiTby2hg'

fetch("https://api.spotify.com/v1/me/player", {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${spotifyAccessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "device_ids": [spotifyDeviceId],
    "play": true,
  })
}).then((ev) => {
  console.log(ev);
  if (ev.status === 403) {
      console.log("you need to upgrade to premium for playback")
  } else {
      console.log("Started playback");
  }
}).catch((error) => {
  console.log("playback error: " + error)
})