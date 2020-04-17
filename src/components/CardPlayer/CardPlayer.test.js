import React from 'react'
import { shallow } from 'enzyme'

import CardPlayer from './'

const dataMocks = {
  "items": [
    {
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/5CTHNQtDeDVCVbBGQjpPfP"
      },
      "href": "https://api.spotify.com/v1/playlists/5CTHNQtDeDVCVbBGQjpPfP",
      "id": "5CTHNQtDeDVCVbBGQjpPfP",
      "images": [
        {
          "height": 640,
          "url": "https://mosaic.scdn.co/640/ab67616d0000b2738cec0aa6e29f88c2ef88f0baab67616d0000b273a1b6edf474293ec2f0cab003ab67616d0000b273a4ebf2768e3aa3ef625dffe0ab67616d0000b273f7d36ea13ab351085f416c31",
          "width": 640
        }
      ],
      "name": "Exaltasamba Antigas ",
      "primary_color": null,
      "public": null,
      "snapshot_id": "MjAsMTU4YTgzZDE3NTBkMmRlMTgxYTYyZTYyZDdlMWI1ZWQ0MDUwMTYyOQ==",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/5CTHNQtDeDVCVbBGQjpPfP/tracks",
        "total": 16
      },
      "type": "playlist",
      "uri": "spotify:playlist:5CTHNQtDeDVCVbBGQjpPfP"
    }
  ]
}

describe('<CardPlayer />', () => {
  const comp = (
    <CardPlayer data={dataMocks} query="query test" />
  )

  const wrapper = shallow( comp )

  it('renders <CardPlayer />', () => {
    expect(wrapper.find('.card')).toHaveLength(1)
  })
})